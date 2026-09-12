const { Resend } = require('resend');

const defaultRecipient = 'rahulde937@gmail.com';
const maxLengths = {
  name: 100,
  email: 254,
  message: 5000
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return {};
    }
  }

  if (req.readable && typeof req.readable === 'boolean') {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const rawBody = Buffer.concat(chunks).toString('utf8');
    if (!rawBody) {
      return {};
    }

    try {
      return JSON.parse(rawBody);
    } catch (error) {
      return {};
    }
  }

  return {};
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let body = {};

  try {
    body = await readJsonBody(req);
  } catch (error) {
    console.error('Unable to parse request body:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(400).json({ error: 'Invalid request payload.' });
  }

  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const message = cleanText(body.message);
  const honeypot = cleanText(body.website);

  if (honeypot) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  if (!name || !email || !message || name.length > maxLengths.name || email.length > maxLengths.email || message.length > maxLengths.message) {
    return res.status(400).json({ error: 'Please provide valid contact details and a message.' });
  }

  if (!isValidEmail(email) || /[\u0000-\u001f\u007f]/.test(name + email + message)) {
    return res.status(400).json({ error: 'Please provide valid contact details and a message.' });
  }

  const apiKey = cleanText(process.env.RESEND_API_KEY);
  const recipient = cleanText(process.env.RESEND_TO_EMAIL || defaultRecipient);
  const fromAddress = cleanText(process.env.RESEND_FROM_EMAIL);

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured for this deployment.');
    return res.status(500).json({ error: 'The email service is not configured yet. Please add the required Vercel environment variables.' });
  }

  if (!fromAddress) {
    console.error('RESEND_FROM_EMAIL is not configured for this deployment.');
    return res.status(500).json({ error: 'The email sender address is not configured. Add RESEND_FROM_EMAIL in Vercel.' });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [recipient],
      replyTo: email,
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Visitor Name: ${name}\nVisitor Email: ${email}\n\nVisitor Message:\n${message}`
    });

    if (error) {
      console.error('Resend request failed:', error.message || error.name || 'Unknown error');
      return res.status(502).json({ error: 'Unable to send the message right now. Please try again in a moment.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email error:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'Unable to send the message right now. Please try again in a moment.' });
  }
};
