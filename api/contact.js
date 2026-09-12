const { Resend } = require('resend');

const recipient = 'rahulde937@gmail.com';
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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = req.body || {};
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

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipient],
      replyTo: email,
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Visitor Name: ${name}\nVisitor Email: ${email}\n\nVisitor Message:\n${message}`
    });

    if (error) {
      console.error('Resend request failed:', error.message || error.name || 'Unknown error');
      return res.status(502).json({ error: 'Something went wrong. Please try again.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email error:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
