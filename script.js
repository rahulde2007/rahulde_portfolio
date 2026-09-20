const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const progressBar = document.querySelector('.scroll-progress span');
const sections = [...document.querySelectorAll('main section[id]')];

function setTheme(theme) {
  const isLight = theme === 'light';
  body.classList.toggle('light-theme', isLight);
  if (themeIcon) themeIcon.textContent = isLight ? '☾' : '☼';
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }
  localStorage.setItem('rahul-theme', theme);
}

setTheme(localStorage.getItem('rahul-theme') || 'dark');
if (themeToggle) {
  themeToggle.addEventListener('click', () => setTheme(body.classList.contains('light-theme') ? 'dark' : 'light'));
}

function initRahulAi() {
  const form = document.getElementById('rahulAiForm');
  const input = document.getElementById('rahulAiInput');
  const messages = document.getElementById('rahulAiMessages');
  const clearButton = document.getElementById('rahulAiClear');
  const status = document.getElementById('rahulAiStatus');
  const composerButton = form?.querySelector('button');
  const suggestionButtons = document.querySelectorAll('[data-question]');
  const suggestions = document.querySelector('.rahul-ai-suggestions');

  if (!form || !input || !messages || !clearButton || !status || !composerButton) return;

  const fallback = "I'm Rahul AI, Rahul De's portfolio assistant. I mainly answer questions about Rahul, his education, skills, projects and experience.";
  const unavailable = "I don't have that information in Rahul's portfolio.";
  const rahulKnowledge = {
    name: "My name is Rahul De.",
    who: "I'm Rahul De, a first-year CSE student at Future Institute of Engineering and Management (FIEM) under MAKAUT.",
    identity: "I'm Rahul De, a first-year CSE student at Future Institute of Engineering and Management (FIEM) under MAKAUT. I'm interested in coding, technology, AI, problem solving and continuous learning.",
    education: "Rahul studies Computer Science and Engineering (CSE) at Future Institute of Engineering and Management (FIEM) under MAKAUT. He is pursuing a B.Tech and is currently in the first year.",
    college: "Rahul studies Computer Science and Engineering at Future Institute of Engineering and Management under MAKAUT.",
    school: "Rahul studied at Rohini C.R.D High School.",
    university: "Rahul's university is MAKAUT.",
    branch: "Rahul's branch is Computer Science and Engineering (CSE).",
    semester: "Rahul is currently in the 1st semester.",
    subjects: "Rahul's current subjects include Mathematics, Basic Electrical Engineering, Engineering Physics and English Communication.",
    skills: "Rahul knows C, C++, Python, HTML, SQL, DBMS and Computer Networking. He also works with VS Code, Antigravity, Git and GitHub.",
    languages: "Rahul's favourite programming languages are C++ and Python. He also works with C, HTML, SQL and other technologies listed in his portfolio.",
    learning: "Rahul is currently strengthening C++ and plans to learn Data Structures and Algorithms (DSA) next.",
    web: "Rahul's web technology is HTML.",
    database: "Rahul works with SQL and DBMS.",
    projects: "Rahul is currently building a technical foundation through coursework, practice and hands-on experimentation.",
    certificates: "Rahul has a First Commit certificate with practical exposure to Git, GitHub and version control.",
    achievements: "Rahul has started his CSE journey and continues strengthening his programming fundamentals.",
    interests: "Rahul is interested in coding, competitive programming, technology, AI, problem solving, learning and the Army.",
    hobbies: "Rahul enjoys coding, competitive programming, exploring technology and learning. He is also interested in becoming an Army Officer.",
    goal: "Rahul's career goal is to become an Army Officer while continuing to grow as a skilled software developer.",
    subject: "Rahul's favourite subject is Mathematics.",
    strongestSubject: "Rahul's strongest subject is Mathematics.",
    weakestSubject: "Rahul's weakest subject is Basic Electrical Engineering.",
    subjectReason: "Mathematics is Rahul's strongest and favourite subject.",
    technology: "Rahul's favourite technology is Artificial Intelligence (AI) and Machine Learning.",
    hometown: "Rahul is from Ragra, Jhargram, West Bengal, India.",
    currentLocation: "Rahul is currently based in Kolkata, West Bengal, India.",
    journey: "Rahul's learning journey began with curiosity about how technology works. He is building fundamentals, strengthening C++ and learning through coursework, practice and hands-on experimentation.",
    examSchedule: "I don't have Rahul's upcoming exam schedule yet.",
    examPreparation: "Rahul is preparing by strengthening his programming fundamentals and learning consistently through coursework and practice.",
    academics: "Rahul is focused on improving his coding and programming fundamentals while building a strong academic foundation.",
    academicGoal: "Rahul's academic goal is to improve his coding and programming skills and build strong fundamentals.",
    strengths: "Rahul's strengths include consistent learning, willingness to experiment, interest in technology, problem solving and discipline.",
    improving: "Rahul is improving advanced programming, C++, Data Structures and Algorithms, practical development skills and his understanding of computer science.",
    motivation: "Rahul is motivated by learning new things, hands-on experimentation and progressing toward his long-term goals.",
    inspiration: "Rahul is inspired by technology, problem solving, continuous improvement and the discipline associated with the Army.",
    personality: "Rahul's portfolio describes him as curious, consistent and disciplined.",
    proud: "Rahul is proud of starting his CSE journey and continuously developing his technical skills.",
    learningExperience: "Rahul's biggest learning experience is that strong fundamentals, consistent learning and real projects matter when becoming a capable developer.",
    army: "Rahul has expressed an interest in becoming an Army Officer and is drawn to the discipline and values associated with the Army.",
    dream: "Rahul's dream is to become an Army Officer. He also hopes to work toward a future at Amazon.",
    dreamRole: "Rahul hasn't specified a particular role at Amazon yet.",
    armyReason: "Rahul hasn't shared a specific reason yet.",
    favouriteFood: "Rahul's favourite fast food is Momo.",
    favouriteFruit: "Rahul's favourite fruit is Mango.",
    favouriteColour: "Rahul's favourite colours are White and Black.",
    favouriteSport: "Rahul's favourite sport is Cricket.",
    favouriteGame: "Rahul's favourite game is Clash of Clans.",
    favouriteMovie: "Rahul's favourite movie is Vanvaas.",
    favouriteArtist: "Rahul's favourite music artist is Arijit Singh.",
    favouriteBook: "Rahul's favourite book is Balidan.",
    favouriteApp: "Rahul's favourite app is LinkedIn.",
    favouriteDrink: "Rahul's favourite drink is a cold drink.",
    favouritePlace: "Rahul's favourite place is Kedarnath.",
    favouriteCity: "Rahul's favourite city is Scotland.",
    favouriteCountry: "Rahul's favourite country is Jaipur.",
    favouriteAnimal: "Rahul's favourite animal is a Dog.",
    codingPlatform: "Rahul uses YouTube as a coding and learning platform.",
    github: "Rahul's public GitHub profile is https://github.com/rahulde2007",
    linkedin: "Rahul's public LinkedIn profile is https://www.linkedin.com/in/rahul-de-r6294520571",
    contact: "You can contact Rahul at rahulde937@gmail.com. His GitHub is https://github.com/rahulde2007 and his LinkedIn is https://www.linkedin.com/in/rahul-de-r6294520571.",
    resume: "Rahul's resume is available here: ./RAHUL_DE_Resume.pdf",
    experience: "Rahul is at the beginning of his development journey and is gaining experience through coursework, practice and hands-on experimentation.",
    latestProject: "Rahul has not completed a major personal project yet. He plans to build and showcase meaningful projects as he gains more experience.",
    portfolio: "Rahul's portfolio is this website.",
    roll: "Rahul's roll/registration number is 26CSE137."
  };
  let lastTopic = null;
  let lastLanguage = 'en';
  let responseTimer = null;

  const intents = [
    ['name', /what(?: is|s) your name|tell me your name|what should i call you|(?:rahul|your)(?:'s)?\s+(?:full\s+)?name/],
    ['who', /who are you|who am i talking to/],
    ['identity', /tell me about yourself|introduc(?:e|tion)|who is rahul|full name/],
    ['everything', /tell me everything|tell me all about|full profile|complete profile|who exactly is rahul/],
    ['roll', /roll|registration number|student id|id number/],
    ['school', /school/],
    ['university', /which university|what university|university are|under which university/],
    ['branch', /branch|department|course|what do you study|what are you studying|degree|ki niye pore|ki niye porashona/],
    ['college', /which college|what college|college does|where do you study|where are you studying|where did you study|which clg|kon college e pore|kon college/],
    ['education', /education|academic|what is he studying|what does rahul study|rahul ki porche|রাহুল কী পড়ে|কোন কলেজে পড়ে|राहुल कहाँ पढ़ता|किस कॉलेज में पढ़ता|राहुल क्या पढ़ता/],
    ['semester', /semester|academic year|what year|batch/],
    ['subjects', /subjects?|what do you have|studying this semester|academic subjects/],
    ['strongestSubject', /strongest subject/],
    ['weakestSubject', /weakest subject|difficult subject/],
    ['subject', /favourite subject|favorite subject|math subject/],
    ['examSchedule', /exam|upcoming test|exam date|exam schedule/],
    ['examPreparation', /prepar(?:e|ing) for exam|how.*prepar|study for exam/],
    ['academics', /how.*academically|academic progress|doing in studies/],
    ['learning', /currently learning|what are you learning|what do you learn|learning these days|learning now|next learning|ekhon ki shikhche/],
    ['languages', /programming language|coding language|favourite language|favorite language|which language|language.*code|know.*language|ki ki language jane/],
    ['web', /web technolog|frontend|website technolog/],
    ['database', /database|sql|dbms/],
    ['technology', /favourite technolog|favorite technolog|favourite tech|favorite tech|machine learning/],
    ['skills', /skill|tech stack|technical|know c\+\+|know python/],
    ['projects', /project|built|build|made|developed|portfolio work/],
    ['latestProject', /latest project|most recent project|newest project/],
    ['certificates', /certificate|certification|first commit/],
    ['achievements', /achievement|milestone|accomplishment|participated|proud/],
    ['currentLocation', /where (?:does|is) rahul (?:currently )?(?:live|stay|based)|where do you live|where are you based|current location|currently live|currently based|kothay thak(?:e|o)|কোথায় থাকে|বর্তমানে কোথায়/],
    ['hometown', /where (?:are you|is rahul) from|where is rahul(?:'s)? (?:hometown|home)|where are you originally from|hometown|from ragra|from jhargram|rahul(?:'s| er|er)? bari|bari kothay|বাড়ি|বাড়ি|কোথায় থেকে|কোথায় থেকে/],
    ['favouriteFood', /food|eat|eating|fast food|fav food|favourite food/],
    ['favouriteFruit', /fruit/],
    ['favouriteColour', /colou?r|prefer.*colour|prefer.*color/],
    ['favouriteSport', /sport/],
    ['favouriteGame', /game|play/],
    ['favouriteMovie', /movie|film/],
    ['favouriteArtist', /singer|artist|song|music/],
    ['favouriteBook', /book/],
    ['favouriteApp', /app/],
    ['favouriteDrink', /drink/],
    ['favouritePlace', /favourite place|favorite place/],
    ['favouriteCity', /city/],
    ['favouriteCountry', /country/],
    ['favouriteAnimal', /animal/],
    ['codingPlatform', /coding platform|learning platform|where do you learn|youtube/],
    ['interests', /interest|what are you into|what is your thing|what are you passionate about/],
    ['hobbies', /hobb|free time|favourite activity|favorite activity|what do you enjoy|what does rahul enjoy/],
    ['strengths', /strength|good at/],
    ['improving', /improv|working on|develop/],
    ['motivation', /motivat|makes you happy/],
    ['inspiration', /inspir/],
    ['personality', /personality|three words|describe yourself/],
    ['learningExperience', /biggest learning|lesson learned|learning experience/],
    ['proud', /proud of/],
    ['armyReason', /why.*army|why.*join|attract.*army|admire.*army/],
    ['army', /army|discipline|values/],
    ['dreamRole', /role.*amazon|position.*amazon/],
    ['academicGoal', /academic goal|study goal/],
    ['dream', /dream|want to become|become|career|goal|profession|working toward|future e ki hote chai/],
    ['github', /github/],
    ['linkedin', /linkedin/],
    ['contact', /contact|email|e-mail|যোগাযোগ/],
    ['resume', /resume|cv/],
    ['experience', /experience|worked|work history/],
    ['portfolio', /portfolio url|portfolio link|website link/],
    ['journey', /journey|beginning|biograph/],
    ['education', /rahul ki porche/],
    ['favouriteFood', /rahul er .*food ki/],
    ['goal', /why army|rahul future e ki hote chai/],
    ['subject', /rahul er favourite subject ki/],
    ['subjectReason', /subject reason/],
    ['name', /তোমার নাম|নাম কী|तुम्हारा नाम|आपका नाम/],
    ['education', /রাহুল কী পড়ে|কোন কলেজে পড়ে|राहुल कहाँ पढ़ता|किस कॉलेज में पढ़ता|राहुल क्या पढ़ता/],
    ['favouriteFood', /রাহুলের প্রিয় খাবার|পছন্দের খাবার|पसंदीदा खाना|खाने को पसंद/],
    ['learning', /এখন কী শিখছে|अभी क्या सीख रहा|अभी क्या सीखती|abhi kya seekh/],
    ['goal', /ভবিষ্যতে কী হতে চায়|क्या बनना चाहता|future mein kya banna/],
    ['languages', /কী কী language জানে|कौन सी language|कौन सी भाष/]
  ].map(([topic, pattern]) => ({ topic, pattern, answer: rahulKnowledge[topic] }));

  const localizedAnswers = {
    bn: {
      name: 'আমার নাম Rahul De।', who: 'আমি Rahul De, FIEM-এর অধীনে MAKAUT-এর প্রথম বর্ষের CSE student।',
      identity: 'আমি Rahul De, FIEM-এর অধীনে MAKAUT-এর প্রথম বর্ষের CSE student। আমি coding, technology, AI, problem solving এবং continuous learning-এ আগ্রহী।',
      education: 'Rahul Future Institute of Engineering and Management (FIEM)-এ Computer Science and Engineering (CSE) পড়ে, MAKAUT-এর অধীনে। সে B.Tech-এর প্রথম বর্ষে পড়ছে.',
      college: 'Rahul Future Institute of Engineering and Management-এ CSE পড়ে, MAKAUT-এর অধীনে।',
      school: 'Rahul Rohini C.R.D High School-এ পড়াশোনা করেছে।', university: 'Rahul-এর university হলো MAKAUT।',
      branch: 'Rahul-এর branch হলো Computer Science and Engineering (CSE)।', semester: 'Rahul এখন 1st semester-এ আছে।',
      subjects: 'Rahul-এর current subjects হলো Mathematics, Basic Electrical Engineering, Engineering Physics এবং English Communication।',
      strongestSubject: 'Rahul-এর strongest subject হলো Mathematics।', weakestSubject: 'Rahul-এর weakest subject হলো Basic Electrical Engineering।',
      subject: 'Rahul-এর favourite subject হলো Mathematics।', academics: 'Rahul coding এবং programming fundamentals শক্ত করার দিকে মন দিচ্ছে।',
      academicGoal: 'Rahul-এর academic goal হলো coding ও programming skills উন্নত করা এবং strong fundamentals তৈরি করা।',
      examSchedule: 'Rahul-এর upcoming exam schedule-এর তথ্য আমার কাছে এখনও নেই।',
      examPreparation: 'Rahul programming fundamentals শক্ত করছে, নিয়মিত শিখছে এবং practical projects তৈরি করছে।',
      learning: 'Rahul এখন C++ শিখছে এবং পরের লক্ষ্য DSA শেখা।', languages: 'Rahul C++ এবং Python পছন্দ করে; সে C, HTML, SQL এবং আরও কিছু technology-তেও কাজ করে।',
      web: 'Rahul-এর web technology হলো HTML।', database: 'Rahul SQL এবং DBMS নিয়ে কাজ করে।', technology: 'Rahul-এর favourite technology হলো Artificial Intelligence (AI) এবং Machine Learning।',
      skills: 'Rahul C, C++, Python, HTML, SQL, DBMS এবং Computer Networking জানে। সে VS Code, Antigravity, Git এবং GitHub-ও ব্যবহার করে।',
      projects: 'Rahul এখন first-year student হিসেবে technical foundation শক্ত করা, programming skills উন্নত করা এবং technology-এর বিভিন্ন area explore করার দিকে focused। সে coursework, practice এবং hands-on experimentation-এর মাধ্যমে শিখছে এবং experience বাড়ার সঙ্গে meaningful project তৈরি করার পরিকল্পনা করছে।',
      certificates: 'Rahul-এর First Commit Certificate আছে।',
      achievements: 'Rahul CSE journey শুরু করেছে, তিনটি practical project তৈরি করেছে এবং programming fundamentals শক্ত করছে।',
      hometown: 'Rahul-er bari Ragra, Jhargram, West Bengal, India।', currentLocation: 'Rahul এখন Kolkata, West Bengal, India-তে থাকে।', interests: 'Rahul coding, competitive programming, technology, AI, problem solving, learning এবং Army-তে আগ্রহী।',
      hobbies: 'Rahul coding, competitive programming, technology explore করা এবং learning উপভোগ করে। Army Officer হওয়ার প্রতিও তার আগ্রহ আছে।',
      goal: 'Rahul-এর career goal হলো Army Officer হওয়া এবং একই সঙ্গে skilled software developer হিসেবে বেড়ে ওঠা।',
      strengths: 'Rahul-এর strengths হলো consistent learning, experiment করার আগ্রহ, practical projects তৈরি করা, technology-তে interest, problem solving এবং discipline।',
      improving: 'Rahul advanced programming, C++, DSA, practical development skills এবং computer science-এর deeper understanding উন্নত করছে।',
      motivation: 'নতুন কিছু শেখা, project তৈরি করা এবং long-term goal-এর দিকে এগোনো Rahul-কে motivate করে।',
      inspiration: 'Technology, problem solving, continuous improvement এবং Army-এর discipline Rahul-কে inspire করে।', personality: 'Rahul একজন curious, consistent এবং disciplined learner।',
      learningExperience: 'Rahul শিখেছে যে strong fundamentals, consistent learning এবং real projects একজন capable developer হওয়ার জন্য গুরুত্বপূর্ণ।', proud: 'Rahul তার CSE journey শুরু করা, practical projects তৈরি করা এবং technical skills উন্নত করার জন্য proud।',
      army: 'Rahul Army Officer হতে আগ্রহী এবং Army-এর discipline ও values-এর প্রতি আকৃষ্ট।', armyReason: 'Rahul Army-তে যোগ দেওয়ার নির্দিষ্ট কারণ এখনও শেয়ার করেনি।',
      dream: 'Rahul-এর dream হলো Army Officer হওয়া; ভবিষ্যতে Amazon-এ কাজ করারও ইচ্ছা আছে।', dreamRole: 'Amazon-এ Rahul কোন নির্দিষ্ট role চান তা এখনও জানাননি।',
      favouriteFood: 'Rahul-এর favourite fast food হলো Momo।', favouriteFruit: 'Rahul-এর favourite fruit হলো Mango।', favouriteColour: 'Rahul-এর favourite colours হলো White এবং Black।', subjectReason: 'কারণ Mathematics Rahul-এর strongest এবং favourite subject।',
      favouriteSport: 'Rahul-এর favourite sport হলো Cricket।', favouriteGame: 'Rahul-এর favourite game হলো Clash of Clans।', favouriteMovie: 'Rahul-এর favourite movie হলো Vanvaas।',
      favouriteArtist: 'Rahul-এর favourite music artist হলো Arijit Singh।', favouriteBook: 'Rahul-এর favourite book হলো Balidan।', favouriteApp: 'Rahul-এর favourite app হলো LinkedIn।',
      favouriteDrink: 'Rahul-এর favourite drink হলো cold drink।', favouritePlace: 'Rahul-এর favourite place হলো Kedarnath।', favouriteCity: 'Rahul-এর favourite city হলো Scotland।',
      favouriteCountry: 'Rahul-এর favourite country হলো Jaipur।', favouriteAnimal: 'Rahul-এর favourite animal হলো Dog।', codingPlatform: 'Rahul coding ও learning-এর জন্য YouTube ব্যবহার করে।',
      github: "Rahul-এর public GitHub profile হলো https://github.com/rahulde2007", linkedin: "Rahul-এর public LinkedIn profile হলো https://www.linkedin.com/in/rahul-de-r6294520571", contact: 'Rahul-এর সঙ্গে যোগাযোগের জন্য rahulde937@gmail.com-এ email করতে পারেন।', resume: 'Rahul-এর resume এখানে আছে: ./RAHUL_DE_Resume.pdf', experience: 'Rahul coursework, practice এবং hands-on experimentation-এর মাধ্যমে development experience তৈরি করছে।',
      portfolio: 'Rahul-এর portfolio হলো এই website।', roll: 'Rahul-এর roll/registration number হলো 26CSE137।', journey: 'Rahul-এর learning journey curiosity দিয়ে শুরু হয়েছে। সে fundamentals তৈরি করছে, C++ শক্ত করছে এবং practical projects বানিয়ে শিখছে।'
    },
    hi: {
      name: 'मेरा नाम Rahul De है।', who: 'मैं Rahul De हूँ, FIEM के अंतर्गत MAKAUT का प्रथम वर्ष का CSE student।',
      identity: 'मैं Rahul De हूँ, FIEM के अंतर्गत MAKAUT का प्रथम वर्ष का CSE student। मुझे coding, technology, AI, problem solving और continuous learning में रुचि है।',
      education: 'Rahul Future Institute of Engineering and Management (FIEM) में Computer Science and Engineering (CSE) पढ़ता है, MAKAUT के अंतर्गत। वह B.Tech के प्रथम वर्ष में है।', college: 'Rahul Future Institute of Engineering and Management में CSE पढ़ता है, MAKAUT के अंतर्गत।',
      school: 'Rahul ने Rohini C.R.D High School में पढ़ाई की है।', university: 'Rahul की university MAKAUT है।', branch: 'Rahul की branch Computer Science and Engineering (CSE) है।',
      semester: 'Rahul अभी 1st semester में है।', subjects: 'Rahul के current subjects Mathematics, Basic Electrical Engineering, Engineering Physics और English Communication हैं।',
      strongestSubject: 'Rahul का strongest subject Mathematics है।', weakestSubject: 'Rahul का weakest subject Basic Electrical Engineering है।', subject: 'Rahul का favourite subject Mathematics है।', subjectReason: 'क्योंकि Mathematics Rahul का strongest और favourite subject है।',
      academics: 'Rahul coding और programming fundamentals मजबूत करने पर ध्यान दे रहा है।', academicGoal: 'Rahul का academic goal coding और programming skills सुधारना तथा strong fundamentals बनाना है।',
      examSchedule: 'Rahul के upcoming exam schedule की जानकारी मेरे पास अभी उपलब्ध नहीं है।', examPreparation: 'Rahul programming fundamentals मजबूत कर रहा है, नियमित सीख रहा है और practical projects बना रहा है।',
      learning: 'Rahul अभी C++ सीख रहा है और अगला लक्ष्य DSA सीखना है।', languages: 'Rahul C++ और Python पसंद करता है; वह C, HTML, SQL और अन्य technologies पर भी काम करता है।', web: 'Rahul की web technology HTML है।', database: 'Rahul SQL और DBMS पर काम करता है।',
      technology: 'Rahul की favourite technology Artificial Intelligence (AI) और Machine Learning है।', skills: 'Rahul C, C++, Python, HTML, SQL, DBMS और Computer Networking जानता है। वह VS Code, Antigravity, Git और GitHub भी इस्तेमाल करता है।',
      projects: 'Rahul अभी first-year student के रूप में अपनी technical foundation मजबूत करने, programming skills विकसित करने और technology के अलग-अलग क्षेत्रों को explore करने पर focused है। वह coursework, practice और hands-on experimentation के माध्यम से सीख रहा है और experience बढ़ने पर meaningful projects बनाने की योजना रखता है।', certificates: 'Rahul के पास First Commit Certificate है।',
      achievements: 'Rahul ने अपनी CSE journey शुरू की है, तीन practical projects बनाए हैं और programming fundamentals मजबूत कर रहा है।', hometown: 'Rahul Ragra, Jhargram, West Bengal, India से है।',
      interests: 'Rahul को coding, competitive programming, technology, AI, problem solving, learning और Army में रुचि है।', hobbies: 'Rahul coding, technology explore करना और learning पसंद करता है। उसे Army Officer बनने में भी रुचि है।',
      goal: 'Rahul का career goal Army Officer बनना और साथ में skilled software developer के रूप में आगे बढ़ना है।', strengths: 'Rahul की strengths consistent learning, experiment करने की इच्छा, practical projects, technology में interest, problem solving और discipline हैं।',
      improving: 'Rahul advanced programming, C++, DSA, practical development skills और computer science की बेहतर समझ सुधार रहा है।', motivation: 'नई चीजें सीखना, projects बनाना और long-term goals की ओर बढ़ना Rahul को motivate करता है।', inspiration: 'Technology, problem solving, continuous improvement और Army का discipline Rahul को inspire करता है।', personality: 'Rahul एक curious, consistent और disciplined learner है।',
      learningExperience: 'Rahul ने सीखा है कि strong fundamentals, consistent learning और real projects एक capable developer बनने के लिए जरूरी हैं।', proud: 'Rahul अपनी CSE journey, practical projects और technical skills के विकास पर proud है।',
      army: 'Rahul Army Officer बनने में रुचि रखता है और Army के discipline तथा values से आकर्षित है।', armyReason: 'Rahul ने Army join करने का कोई specific reason अभी share नहीं किया है।', dream: 'Rahul का dream Army Officer बनना है; वह भविष्य में Amazon में काम करने की भी आशा रखता है।', dreamRole: 'Amazon में Rahul ने कोई particular role अभी specify नहीं किया है।',
      favouriteFood: 'Rahul का favourite fast food Momo है।', favouriteFruit: 'Rahul का favourite fruit Mango है।', favouriteColour: 'Rahul के favourite colours White और Black हैं।', favouriteSport: 'Rahul का favourite sport Cricket है।', favouriteGame: 'Rahul का favourite game Clash of Clans है।',
      favouriteMovie: 'Rahul की favourite movie Vanvaas है।', favouriteArtist: 'Rahul के favourite music artist Arijit Singh हैं।', favouriteBook: 'Rahul की favourite book Balidan है।', favouriteApp: 'Rahul का favourite app LinkedIn है।', favouriteDrink: 'Rahul का favourite drink cold drink है।', favouritePlace: 'Rahul की favourite place Kedarnath है।', favouriteCity: 'Rahul का favourite city Scotland है।', favouriteCountry: 'Rahul का favourite country Jaipur है।', favouriteAnimal: 'Rahul का favourite animal Dog है।', codingPlatform: 'Rahul coding और learning के लिए YouTube इस्तेमाल करता है।',
      hometown: 'Rahul Ragra, Jhargram, West Bengal, India से है।', currentLocation: 'Rahul अभी Kolkata, West Bengal, India में रहता है।', github: 'Rahul की public GitHub profile https://github.com/rahulde2007 है।', linkedin: 'Rahul की public LinkedIn profile https://www.linkedin.com/in/rahul-de-r6294520571 है।', contact: 'Rahul से संपर्क करने के लिए rahulde937@gmail.com पर email कर सकते हैं।', resume: 'Rahul का resume यहाँ है: ./RAHUL_DE_Resume.pdf', experience: 'Rahul coursework, practice और hands-on experimentation के माध्यम से development experience बना रहा है।', portfolio: 'Rahul का portfolio यही website है।', roll: 'Rahul का roll/registration number 26CSE137 है।', journey: 'Rahul की learning journey curiosity से शुरू हुई। वह fundamentals बना रहा है, C++ मजबूत कर रहा है और coursework तथा practice के माध्यम से सीख रहा है।'
    }
  };

  function normalizeQuestion(question) {
    return question.toLowerCase()
      .replace(/[?!.,،।]/g, ' ')
      .replace(/[’']/g, '')
      .replace(/[-_]/g, ' ')
      .replace(/\bfav\b/g, 'favourite')
      .replace(/\bclg\b/g, 'college')
      .replace(/\blang\b/g, 'language')
      .replace(/\bstuding\b/g, 'studying')
      .replace(/\bmathamatics\b/g, 'mathematics')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function detectLanguage(normalized) {
    if (/[\u0980-\u09FF]/.test(normalized)) return 'bn';
    if (/[\u0900-\u097F]/.test(normalized)) return 'hi';
    if (/\b(ka|kya|kaha|padhta|mein|abhi|seekh|banna chahta|uska|pasandida|hai)\b/.test(normalized)) return 'hi';
    if (/\b(er|pore|porche|kon|ekhon|shikhche|hote chai|jane|tar|ki|bari|kothay|thake)\b/.test(normalized)) return 'bn';
    if (/\b(what|where|which|who|how|your|you|tell|about|does|is|are|the|my|name|college|skills|projects)\b/.test(normalized)) return 'en';
    return null;
  };

  const localizedFallbacks = {
    en: fallback,
    bn: 'আমি Rahul De-এর personal portfolio assistant। Rahul-এর education, skills, projects, achievements, interests এবং journey সম্পর্কে প্রশ্নের উত্তর দিতে পারি।',
    hi: 'मैं Rahul De का personal portfolio assistant हूँ। मैं Rahul की education, skills, projects, achievements, interests और journey के बारे में सवालों के जवाब दे सकता हूँ।'
  };

  const localizedUnavailable = {
    en: unavailable,
    bn: 'এই তথ্যটা Rahul সম্পর্কে আমার কাছে এখনও নেই।',
    hi: 'यह जानकारी Rahul के बारे में मेरे पास अभी उपलब्ध नहीं है।'
  }

  function isRahulContext(normalized) {
    return /\b(rahul|he|his|him|you|your|yourself|student|college|school|portfolio|career|cse|fiem|makaut)\b/.test(normalized);
  }

  function getIntentTopics(normalized) {
    const topics = intents.filter((intent) => intent.pattern.test(normalized)).map((intent) => intent.topic);
    if (topics.length) {
      const uniqueTopics = [...new Set(topics)];
      if (uniqueTopics.includes('examPreparation')) return uniqueTopics.filter((topic) => topic !== 'examSchedule');
      if (uniqueTopics.includes('improving')) return uniqueTopics.filter((topic) => topic !== 'learning');
      if (uniqueTopics.includes('armyReason')) return uniqueTopics.filter((topic) => topic !== 'army');
      if (uniqueTopics.includes('academicGoal')) return uniqueTopics.filter((topic) => topic !== 'dream');
      if (uniqueTopics.includes('goal') && uniqueTopics.includes('dream')) return uniqueTopics.filter((topic) => topic !== 'dream');
      if (uniqueTopics.some((topic) => ['subject', 'strongestSubject', 'weakestSubject'].includes(topic))) {
        return uniqueTopics.filter((topic) => topic !== 'subjects');
      }
      return uniqueTopics;
    }

    if (lastTopic && /^(where|what|who|how|and|which|what about|why)\b/.test(normalized)) {
      const followUps = {
        education: ['education'],
        college: ['college'],
        university: ['university'],
        branch: ['branch'],
        semester: ['semester'],
        subjects: ['subjects'],
        favouriteSport: ['favouriteGame'],
        favouriteGame: ['favouriteGame'],
        favouriteFood: ['favouriteFood']
      };
      if (normalized === 'where' && (lastTopic === 'education' || lastTopic === 'hometown')) return [lastTopic];
      if (/what about game|games/.test(normalized)) return ['favouriteGame'];
      if (lastTopic === 'projects' && /latest|most recent|newest|more about (?:it|that)/.test(normalized)) return ['latestProject'];
      if (normalized === 'why' && lastTopic === 'subject') return ['subjectReason'];
      if (normalized === 'why') return [];
      return followUps[lastTopic] || [];
    }
    return [];
  }

  function answerTopics(topics, language) {
    if (topics.includes('everything')) {
      if (language === 'bn') return ['ABOUT RAHUL\n- Rahul একজন curious, consistent এবং disciplined first-year CSE student।\n\nEDUCATION\n- School: Rohini C.R.D High School\n- College: Future Institute of Engineering and Management (FIEM)\n- Department: CSE\n- University: MAKAUT\n- Degree: B.Tech\n\nCURRENT ACADEMICS\n- 1st semester; Mathematics, Basic Electrical Engineering, Engineering Physics এবং English Communication\n\nPROGRAMMING & TECHNOLOGY\n- C, C++, Python, HTML, SQL, DBMS এবং Computer Networking\n- Tools: VS Code, Antigravity, Git এবং GitHub\n- Currently learning: C++; next goal: DSA\n\nPROJECTS\n- Rahul is currently building his technical foundation through coursework, practice and hands-on experimentation.\n\nCERTIFICATES\n- First Commit Certificate\n\nACHIEVEMENTS\n- CSE journey শুরু করেছে এবং programming fundamentals শক্ত করছে।\n\nINTERESTS & HOBBIES\n- Coding, competitive programming, technology, AI, problem solving, learning এবং Army\n\nCAREER GOALS\n- Army Officer হওয়া এবং skilled software developer হিসেবে বেড়ে ওঠা।'];
      if (language === 'hi') return ['ABOUT RAHUL\n- Rahul एक curious, consistent और disciplined first-year CSE student है।\n\nEDUCATION\n- School: Rohini C.R.D High School\n- College: Future Institute of Engineering and Management (FIEM)\n- Department: CSE\n- University: MAKAUT\n- Degree: B.Tech\n\nCURRENT ACADEMICS\n- 1st semester; Mathematics, Basic Electrical Engineering, Engineering Physics और English Communication\n\nPROGRAMMING & TECHNOLOGY\n- C, C++, Python, HTML, SQL, DBMS और Computer Networking\n- Tools: VS Code, Antigravity, Git और GitHub\n- Currently learning: C++; next goal: DSA\n\nPROJECTS\n- Rahul अपनी technical foundation को coursework, practice और hands-on experimentation के माध्यम से मजबूत कर रहा है।\n\nCERTIFICATES\n- First Commit Certificate\n\nACHIEVEMENTS\n- CSE journey शुरू की और programming fundamentals मजबूत कर रहा है।\n\nINTERESTS & HOBBIES\n- Coding, competitive programming, technology, AI, problem solving, learning और Army\n\nCAREER GOALS\n- Army Officer बनना और skilled software developer के रूप में आगे बढ़ना।'];
      return [
        `ABOUT RAHUL\n- Rahul De is a curious, consistent and disciplined first-year CSE student.\n\nEDUCATION\n- School: Rohini C.R.D High School\n- College: Future Institute of Engineering and Management (FIEM)\n- Department: Computer Science and Engineering (CSE)\n- University: MAKAUT\n- Degree: B.Tech\n\nCURRENT ACADEMICS\n- 1st semester\n- Mathematics, Basic Electrical Engineering, Engineering Physics and English Communication\n\nPROGRAMMING & TECHNOLOGY\n- C, C++, Python, HTML, SQL, DBMS and Computer Networking\n- Tools: VS Code, Antigravity, Git and GitHub\n- Currently learning C++; next goal: DSA\n\nPROJECTS\n- Currently building a technical foundation through coursework, practice and hands-on experimentation\n\nCERTIFICATES\n- First Commit Certificate\n\nACHIEVEMENTS\n- Started his CSE journey and continues strengthening his programming fundamentals.\n\nINTERESTS & HOBBIES\n- Coding, competitive programming, technology, AI, problem solving, learning and the Army\n- Favourite sport: Cricket; favourite game: Clash of Clans\n\nFAVOURITE THINGS\n- Food: Momo; fruit: Mango; colours: White and Black\n- Movie: Vanvaas; artist: Arijit Singh; book: Balidan\n\nPERSONALITY\n- Curious, consistent and disciplined; motivated by learning, building and improvement.\n\nCAREER GOALS\n- Army Officer, with a long-term interest in growing as a software developer.\n\nARMY INTEREST\n- Drawn to the discipline and values associated with the Army.`
      ];
    }
    const answers = topics.map((topic) => localizedAnswers[language]?.[topic] || intents.find((intent) => intent.topic === topic)?.answer).filter(Boolean);
    return answers.length > 1 ? answers.map((answer) => `- ${answer}`) : answers;
  }

  function getAnswer(question) {
    const normalized = normalizeQuestion(question);
    if (!normalized) return 'Please ask a question about Rahul De.';

    const detectedLanguage = detectLanguage(normalized);
    if (detectedLanguage) lastLanguage = detectedLanguage;
    const language = detectedLanguage || lastLanguage;

    const conversationalReplies = [
      [/^(hi|hii|namaste)\b/, { en: "Hi! 👋 I'm Rahul AI. Ask me anything about Rahul De.", bn: 'হাই! 👋 আমি Rahul AI। Rahul De সম্পর্কে আমাকে জিজ্ঞাসা করুন।', hi: 'नमस्ते! 👋 मैं Rahul AI हूँ। Rahul De के बारे में पूछिए।' }],
      [/^hello\b/, { en: "Hello! 👋 What would you like to know about Rahul?", bn: 'হ্যালো! 👋 Rahul সম্পর্কে কী জানতে চান?', hi: 'नमस्ते! 👋 आप Rahul के बारे में क्या जानना चाहेंगे?' }],
      [/^hey\b/, { en: "Hey! 👋 Feel free to ask me anything about Rahul De.", bn: 'হেই! 👋 Rahul De সম্পর্কে যা জানতে চান জিজ্ঞাসা করুন।', hi: 'हे! 👋 Rahul De के बारे में कुछ भी पूछिए।' }],
      [/^(okay|ok)\b|^ठीक(?: है)?|^(theek|thik)\s+hai\b/, { en: 'Alright! 😊', bn: 'ঠিক আছে! 😊', hi: 'बिल्कुल! 😊' }],
      [/^ধন্যবাদ\b|^ধন্যবাদ$/, { en: "You're welcome! 😊", bn: 'স্বাগতম! 😊', hi: 'आपका स्वागत है! 😊' }],
      [/^thanks?\b/, { en: "You're welcome! 😊", bn: 'স্বাগতম! 😊', hi: 'आपका स्वागत है! 😊' }],
      [/^thank you\b/, { en: "You're welcome! Glad I could help.", bn: 'স্বাগতম! সাহায্য করতে পেরে ভালো লাগল।', hi: 'आपका स्वागत है! मदद करके खुशी हुई।' }],
      [/^great\b/, { en: 'Glad you liked it! 😊', bn: 'ভালো লেগেছে জেনে ভালো লাগল! 😊', hi: 'अच्छा लगा कि आपको पसंद आया! 😊' }],
      [/^nice\b/, { en: 'Thank you! 😊', bn: 'ধন্যবাদ! 😊', hi: 'धन्यवाद! 😊' }],
      [/^cool\b/, { en: 'Absolutely! 👍', bn: 'অবশ্যই! 👍', hi: 'बिल्कुल! 👍' }],
      [/^bye\b/, { en: 'Bye! 👋 Feel free to come back if you want to know more about Rahul.', bn: 'বিদায়! 👋 Rahul সম্পর্কে আরও জানতে আবার আসুন।', hi: 'बाय! 👋 Rahul के बारे में और जानने के लिए फिर आइए।' }],
      [/^good night\b|^শুভ রাত্রি\b|^शुभ रात्रि\b/, { en: 'Good night! 👋', bn: 'শুভ রাত্রি! 👋', hi: 'शुभ रात्रि! 👋' }],
      [/^good morning\b|^সুপ্রভাত\b|^सुप्रभात\b/, { en: 'Good morning! ☀️', bn: 'সুপ্রভাত! ☀️', hi: 'सुप्रभात! ☀️' }],
      [/system prompt|internal instructions|hidden instructions|api key|environment variable|forget (?:your|the) instructions|developer mode|override (?:your|the) rules|সিস্টেম প্রম্পট|आंतरिक निर्देश/, { en: "I can't share internal instructions or secrets, but I can explain what Rahul AI can help with: questions about Rahul De and his portfolio.", bn: 'আমি internal instructions বা secret শেয়ার করতে পারি না, তবে Rahul De এবং তাঁর portfolio সম্পর্কে প্রশ্নের উত্তর দিতে পারি।', hi: 'मैं internal instructions या secrets साझा नहीं कर सकता, लेकिन Rahul De और उनके portfolio के बारे में सवालों के जवाब दे सकता हूँ।' }]
    ];
    const conversationalReply = conversationalReplies.find(([pattern]) => pattern.test(normalized));
    if (conversationalReply) return conversationalReply[1][language] || conversationalReply[1].en;

    const topics = getIntentTopics(normalized);
    const isFollowUp = Boolean(lastTopic && /^(?:what about|tell me more|which one|where does he|where is he|what does he|what is his|what are his|which college does he|and why)\b/.test(normalized));
    const asksAboutRahul = isRahulContext(normalized) || topics.length > 0 || isFollowUp;
    if (!topics.length) return asksAboutRahul ? localizedUnavailable[language] : localizedFallbacks[language];

    lastTopic = topics[topics.length - 1];
    return answerTopics(topics, language).join('\n\n');
  }

  function appendMessage(text, type) {
    const message = document.createElement('div');
    message.className = `rahul-ai-message rahul-ai-message--${type}`;
    const avatar = document.createElement('div');
    avatar.className = 'rahul-ai-message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = type === 'assistant' ? 'AI' : 'YOU';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    message.append(avatar, paragraph);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function setBusy(isBusy) {
    input.disabled = isBusy;
    composerButton.disabled = isBusy;
    suggestionButtons.forEach((button) => { button.disabled = isBusy; });
    status.textContent = isBusy ? 'Rahul AI is thinking...' : '';
  }

  function ask(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || composerButton.disabled) return;
    appendMessage(cleanQuestion, 'user');
    suggestions?.setAttribute('hidden', '');
    input.value = '';
    setBusy(true);
    clearTimeout(responseTimer);
    responseTimer = setTimeout(() => {
      appendMessage(getAnswer(cleanQuestion), 'assistant');
      setBusy(false);
      input.focus();
    }, 420);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });

  suggestionButtons.forEach((button) => button.addEventListener('click', () => ask(button.dataset.question || '')));

  clearButton.addEventListener('click', () => {
    clearTimeout(responseTimer);
    lastTopic = null;
    setBusy(false);
    messages.innerHTML = '<div class="rahul-ai-message rahul-ai-message--assistant"><div class="rahul-ai-message-avatar" aria-hidden="true">AI</div><p>Hi! I\'m Rahul AI 👋<br>Ask me anything about Rahul De.</p></div>';
    suggestions?.removeAttribute('hidden');
    status.textContent = '';
    input.value = '';
    input.focus();
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (siteNav.classList.contains('open') && !siteNav.contains(e.target) && !menuToggle.contains(e.target)) {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

function updateScrollState() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollAmount = pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${scrollAmount}%`;

  let currentSection = 'home';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) currentSection = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`));
}

window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('resize', updateScrollState);
updateScrollState();

const revealItems = document.querySelectorAll('.reveal');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const collegeIdCard = document.querySelector('.college-id-card');
if (collegeIdCard) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  let pointerActive = false;
  let pointerId = null;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  function updateCardTransform() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    const rotateY = clamp((currentX / 18) * 7, -12, 12);
    const rotateX = clamp((-currentY / 18) * 7, -12, 12);
    const shadowX = currentX * 0.22;
    const shadowY = currentY * 0.22;

    collegeIdCard.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    collegeIdCard.style.boxShadow = `0 22px 70px rgba(4, 9, 20, 0.56), ${shadowX}px ${shadowY}px 38px rgba(14, 57, 89, 0.2), 0 0 0 1px rgba(123, 182, 255, 0.08)`;
    requestAnimationFrame(updateCardTransform);
  }

  function setPointerTarget(event) {
    const rect = collegeIdCard.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    targetX = clamp(relX * 100, -60, 60);
    targetY = clamp(relY * 80, -50, 50);
  }

  collegeIdCard.addEventListener('pointerdown', (event) => {
    pointerActive = true;
    pointerId = event.pointerId;
    collegeIdCard.setPointerCapture(pointerId);
    collegeIdCard.style.transition = 'none';
    setPointerTarget(event);
  });

  collegeIdCard.addEventListener('pointermove', (event) => {
    if (!pointerActive) {
      const rect = collegeIdCard.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = clamp(relX * 36, -30, 30);
      targetY = clamp(relY * 28, -22, 22);
      return;
    }

    setPointerTarget(event);
  });

  function resetCardPosition() {
    pointerActive = false;
    pointerId = null;
    targetX = 0;
    targetY = 0;
    collegeIdCard.style.transition = 'box-shadow 0.28s ease, border-color 0.28s ease';
  }

  collegeIdCard.addEventListener('pointerup', resetCardPosition);
  collegeIdCard.addEventListener('pointerleave', () => {
    if (!pointerActive) {
      targetX = 0;
      targetY = 0;
    }
  });
  collegeIdCard.addEventListener('pointercancel', resetCardPosition);

  requestAnimationFrame(updateCardTransform);
}

/* ==========================================================================
   FUTURISTIC 3D ANIMATED CANVAS BACKGROUND
   Engine: Full Desktop (1366x768, 1440x900, 1920x1080) & Mobile Compatibility
   ========================================================================== */
function initFuturisticBackground() {
  let canvas = document.getElementById('futuristic-bg') || document.getElementById('cyber-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'futuristic-bg';
    canvas.className = 'futuristic-bg cyber-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animationFrameId = null;
  let isRunning = false;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let lastTime = 0;

  // Mouse coordinates with smooth lerping
  const mouse = {
    x: 0.5,
    y: 0.5,
    tx: 0.5,
    ty: 0.5,
    active: false,
    hoverRadius: 140
  };

  // Ambient glowing light areas (3 soft breathing cosmic blobs)
  const ambientBlobs = [
    { bx: 0.20, by: 0.25, r: 0.45, hue: 190, phase: 0.0, speed: 0.00020 },
    { bx: 0.80, by: 0.65, r: 0.40, hue: 190, phase: 2.1, speed: 0.00025 },
    { bx: 0.50, by: 0.85, r: 0.38, hue: 190, phase: 4.2, speed: 0.00018 }
  ];

  // Particles & Traveling Pulses
  let particles = [];
  let dataPulses = [];

  function getParticleCount() {
    if (width >= 1024) return 75; // 60–80 particles on desktop
    if (width >= 640) return 40;  // 30–50 particles on tablet
    return 25;                    // 20–30 particles on mobile
  }

  function initParticles() {
    particles = [];
    const count = getParticleCount();
    const isDesktop = width >= 1024;
    for (let i = 0; i < count; i++) {
      const z = 0.15 + Math.random() * 0.85; // Depth factor: 0.15 (far) to 1.0 (near)
      const rand = Math.random();
      // Keep the ambient motion inside the portfolio's existing lime accent family.
      const hue = 190;
      const baseRadius = (isDesktop ? 1.4 : 1.0) + z * (isDesktop ? 2.4 : 1.8);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: z,
        vx: (Math.random() - 0.5) * (isDesktop ? 0.35 : 0.28) * z,
        vy: (Math.random() - 0.5) * (isDesktop ? 0.26 : 0.20) * z,
        baseRadius: baseRadius,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        hue: hue,
        connections: 0
      });
    }

    dataPulses = [
      { fromIdx: 0, toIdx: 1, progress: 0, speed: 0.007, active: false },
      { fromIdx: 2, toIdx: 3, progress: 0, speed: 0.009, active: false },
      { fromIdx: 4, toIdx: 5, progress: 0, speed: 0.008, active: false }
    ];
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = document.documentElement.clientWidth || window.innerWidth || document.body.clientWidth;
    height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function isLightMode() {
    return document.body.classList.contains('light-theme');
  }

  // 1. Draw Glowing Ambient Light Areas
  function drawAmbientBlobs(t) {
    const isLight = isLightMode();
    const maxDim = Math.max(width, height);

    for (let i = 0; i < ambientBlobs.length; i++) {
      const b = ambientBlobs[i];
      const cx = (b.bx + 0.06 * Math.sin(t * b.speed * 1000 + b.phase)) * width;
      const cy = (b.by + 0.06 * Math.cos(t * b.speed * 1000 + b.phase * 0.8)) * height;
      const radius = b.r * maxDim;
      const alpha = isLight ? 0.08 : 0.15;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `hsla(${b.hue}, 95%, 60%, ${alpha.toFixed(3)})`);
      grad.addColorStop(0.5, `hsla(${b.hue}, 90%, 55%, ${(alpha * 0.45).toFixed(3)})`);
      grad.addColorStop(1, `hsla(${b.hue}, 90%, 50%, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Draw 3D Perspective Glowing Grid (Desktop, Laptop, Tablet & Mobile)
  function drawPerspectiveGrid(t, camDriftX, camDriftY, mouseOffX, mouseOffY) {
    const isLight = isLightMode();
    const isDesktop = width >= 1024;
    const isTablet = width >= 640 && width < 1024;

    const horizonY = height * 0.52 + mouseOffY * 0.35 + camDriftY * 0.5;
    const vpX = width * 0.5 + mouseOffX * 0.45 + camDriftX * 0.8;
    const floorBottom = height + 40;
    const floorHeight = floorBottom - horizonY;
    if (floorHeight <= 20) return;

    // Desktop: 26 lines, 20 rows; Tablet: 18 lines, 14 rows; Mobile: 10 lines, 10 rows
    const lineCount = isDesktop ? 26 : (isTablet ? 18 : 10);
    const rowCount = isDesktop ? 20 : (isTablet ? 14 : 10);
    const gridHue = 190;
    const baseAlpha = isLight ? 0.25 : 0.55;

    ctx.save();

    // Soft glowing horizon line
    const horizonGrad = ctx.createLinearGradient(vpX - width * 0.7, horizonY, vpX + width * 0.7, horizonY);
    horizonGrad.addColorStop(0, `hsla(${gridHue}, 100%, 70%, 0)`);
    horizonGrad.addColorStop(0.5, `hsla(${gridHue}, 100%, 70%, ${(baseAlpha * 0.75).toFixed(3)})`);
    horizonGrad.addColorStop(1, `hsla(${gridHue}, 100%, 70%, 0)`);
    ctx.strokeStyle = horizonGrad;
    ctx.lineWidth = isDesktop ? 1.4 : 1.0;
    ctx.beginPath();
    ctx.moveTo(vpX - width * 0.7, horizonY);
    ctx.lineTo(vpX + width * 0.7, horizonY);
    ctx.stroke();

    // Longitudinal Convergence Lines (radiating to floor bottom)
    const bottomSpread = width * (isDesktop ? 1.8 : 1.4);
    for (let i = 0; i <= lineCount; i++) {
      const frac = i / lineCount;
      const bottomX = vpX - bottomSpread * 0.5 + frac * bottomSpread;
      const centerDist = Math.abs(frac - 0.5) * 2;
      const lineAlpha = baseAlpha * (1 - centerDist * 0.35);

      const grad = ctx.createLinearGradient(vpX, horizonY, bottomX, floorBottom);
      grad.addColorStop(0, `hsla(${gridHue}, 95%, 65%, 0)`);
      grad.addColorStop(0.25, `hsla(${gridHue}, 95%, 65%, ${(lineAlpha * 0.55).toFixed(3)})`);
      grad.addColorStop(1, `hsla(${gridHue}, 95%, 65%, ${lineAlpha.toFixed(3)})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = isDesktop ? 1.1 : 0.8;
      ctx.beginPath();
      ctx.moveTo(vpX, horizonY);
      ctx.lineTo(bottomX, floorBottom);
      ctx.stroke();
    }

    // Transverse Horizontal Rows (Perspective-correct, moving toward viewer)
    const scrollSpeed = 0.00015;
    const scrollFrac = (t * scrollSpeed) % 1;

    for (let r = 0; r <= rowCount; r++) {
      const rawFrac = (r + scrollFrac) / rowCount;
      const wrappedFrac = rawFrac % 1;
      const perspecT = Math.pow(wrappedFrac, 2.2);
      const rowY = horizonY + floorHeight * perspecT;

      if (rowY < horizonY + 3 || rowY > floorBottom) continue;

      const horizonDistRatio = Math.min(1, (rowY - horizonY) / (floorHeight * 0.25));
      const bottomFadeRatio = rowY > height - 10 ? Math.max(0, (floorBottom - rowY) / 50) : 1;
      const rowAlpha = baseAlpha * horizonDistRatio * bottomFadeRatio * 1.15;

      const halfSpan = (bottomSpread * 0.5) * perspecT;
      const leftX = vpX - halfSpan;
      const rightX = vpX + halfSpan;

      const grad = ctx.createLinearGradient(leftX, rowY, rightX, rowY);
      grad.addColorStop(0, `hsla(${gridHue}, 95%, 65%, 0)`);
      grad.addColorStop(0.15, `hsla(${gridHue}, 95%, 65%, ${rowAlpha.toFixed(3)})`);
      grad.addColorStop(0.85, `hsla(${gridHue}, 95%, 65%, ${rowAlpha.toFixed(3)})`);
      grad.addColorStop(1, `hsla(${gridHue}, 95%, 65%, 0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = isDesktop ? 1.1 : 0.8;
      ctx.beginPath();
      ctx.moveTo(leftX, rowY);
      ctx.lineTo(rightX, rowY);
      ctx.stroke();
    }

    ctx.restore();
  }

  // 3. Draw 3D Floating Particles, Connecting Lines & Traveling Pulses
  function drawParticlesAndNetwork(t, camDriftX, camDriftY, mouseOffX, mouseOffY) {
    const isLight = isLightMode();
    const isDesktop = width >= 1024;
    const isMobile = width < 640;
    const maxLinkDist = isDesktop ? 155 : (isMobile ? 85 : 120);
    const maxConnectionsPerParticle = 3;

    for (let i = 0; i < particles.length; i++) {
      particles[i].connections = 0;
    }

    const cursorX = mouse.x * width;
    const cursorY = mouse.y * height;

    const projected = new Array(particles.length);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.pulseSpeed;

      // Screen edge wrapping
      if (p.x < -30) p.x = width + 30;
      if (p.x > width + 30) p.x = -30;
      if (p.y < -30) p.y = height + 30;
      if (p.y > height + 30) p.y = -30;

      // 3D Parallax offset based on depth (z)
      let projX = p.x + mouseOffX * p.z + camDriftX * p.z * 0.7;
      let projY = p.y + mouseOffY * p.z + camDriftY * p.z * 0.7;

      // Desktop interactive hover deflection
      if (!isMobile && mouse.active) {
        const dx = cursorX - projX;
        const dy = cursorY - projY;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.hoverRadius && dist > 0) {
          const force = (1 - dist / mouse.hoverRadius) * 6.0 * p.z;
          projX -= (dx / dist) * force;
          projY -= (dy / dist) * force;
        }
      }

      projected[i] = { x: projX, y: projY, z: p.z, hue: p.hue, baseRadius: p.baseRadius, phase: p.phase };
    }

    // Connecting Lines
    ctx.save();
    for (let i = 0; i < particles.length; i++) {
      const pi = projected[i];
      if (particles[i].connections >= maxConnectionsPerParticle) continue;

      for (let j = i + 1; j < particles.length; j++) {
        if (particles[i].connections >= maxConnectionsPerParticle) break;
        if (particles[j].connections >= maxConnectionsPerParticle) continue;

        const pj = projected[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxLinkDist) {
          particles[i].connections++;
          particles[j].connections++;

          const proxRatio = 1 - dist / maxLinkDist;
          const avgZ = (pi.z + pj.z) * 0.5;
          const lineAlpha = isLight
            ? proxRatio * avgZ * 0.22
            : proxRatio * avgZ * 0.48;

          const linkHue = (pi.hue + pj.hue) * 0.5;
          ctx.strokeStyle = `hsla(${linkHue}, 90%, 65%, ${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = (isDesktop ? 0.7 : 0.5) * avgZ + 0.35;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.stroke();

          // Trigger traveling data pulses
          for (let pIdx = 0; pIdx < dataPulses.length; pIdx++) {
            if (!dataPulses[pIdx].active && Math.random() < 0.005) {
              dataPulses[pIdx].fromIdx = i;
              dataPulses[pIdx].toIdx = j;
              dataPulses[pIdx].progress = 0;
              dataPulses[pIdx].active = true;
              break;
            }
          }
        }
      }
    }
    ctx.restore();

    // Traveling Data Pulses
    for (let k = 0; k < dataPulses.length; k++) {
      const dp = dataPulses[k];
      if (dp.active) {
        dp.progress += dp.speed;
        if (dp.progress >= 1) {
          dp.active = false;
          continue;
        }
        const pA = projected[dp.fromIdx];
        const pB = projected[dp.toIdx];
        if (pA && pB) {
          const pulseX = pA.x + (pB.x - pA.x) * dp.progress;
          const pulseY = pA.y + (pB.y - pA.y) * dp.progress;
          const pulseAlpha = Math.sin(dp.progress * Math.PI) * (isLight ? 0.6 : 0.9);
          ctx.fillStyle = `hsla(190, 100%, 75%, ${pulseAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, isDesktop ? 2.5 : 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 3D Depth Particles
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const pulse = 0.5 + 0.5 * Math.sin(p.phase);
      const radius = p.baseRadius * (0.85 + 0.15 * pulse);

      const baseAlpha = isLight
        ? p.z * 0.6 * (0.8 + 0.2 * pulse)
        : p.z * 0.9 * (0.8 + 0.2 * pulse);

      // Glowing outer halo for depth >= 0.35
      if (p.z > 0.35 && !isLight) {
        const glowRadius = radius * (isDesktop ? 4.5 : 3.8);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 68%, ${(baseAlpha * 0.6).toFixed(3)})`);
        grad.addColorStop(1, `hsla(${p.hue}, 95%, 68%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Core particle
      ctx.fillStyle = `hsla(${p.hue}, 95%, 65%, ${baseAlpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 4. Static Render for Prefers-Reduced-Motion
  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    const isLight = isLightMode();
    const color = isLight ? 'rgba(37, 99, 235, 0.12)' : 'rgba(0, 217, 255, 0.2)';
    ctx.fillStyle = color;
    for (let i = 0; i < 50; i++) {
      const sx = (i * 137 + 40) % width;
      const sy = (i * 179 + 60) % height;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Main Animation Loop
  function animate(timestamp) {
    if (!isRunning) return;
    animationFrameId = requestAnimationFrame(animate);

    if (timestamp - lastTime < 16) return;
    lastTime = timestamp;

    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;

    const camDriftX = Math.sin(timestamp * 0.00007) * 22 + Math.cos(timestamp * 0.00013) * 10;
    const camDriftY = Math.cos(timestamp * 0.00008) * 12 + Math.sin(timestamp * 0.00011) * 6;

    const mouseOffX = (mouse.x - 0.5) * 45;
    const mouseOffY = (mouse.y - 0.5) * 25;

    ctx.clearRect(0, 0, width, height);

    drawAmbientBlobs(timestamp);
    drawParticlesAndNetwork(timestamp, camDriftX, camDriftY, mouseOffX, mouseOffY);
  }

  // Lifecycle
  function start() {
    if (prefersReducedMotion.matches) {
      drawStatic();
      return;
    }
    if (!isRunning) {
      isRunning = true;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  function stop() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // Pointer listeners with passive performance
  let mouseThrottle = 0;
  window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - mouseThrottle < 16) return;
    mouseThrottle = now;
    mouse.tx = e.clientX / Math.max(window.innerWidth, 1);
    mouse.ty = e.clientY / Math.max(window.innerHeight, 1);
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    mouse.active = false;
    mouse.tx = 0.5;
    mouse.ty = 0.5;
  }, { passive: true });

  resize();
  start();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (prefersReducedMotion.matches) drawStatic();
    }, 150);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!prefersReducedMotion.matches) start();
  });

  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      stop();
      drawStatic();
    } else {
      start();
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFuturisticBackground);
} else {
  initFuturisticBackground();
}

/* ==========================================================================
   SKILLS ORBIT ANIMATION
   Reads skills from existing DOM, builds orbit nodes dynamically
   ========================================================================== */
function initSkillsOrbit() {
  const container = document.getElementById('skillsOrbitContainer');
  const skillsGrid = document.querySelector('.skills-grid');
  if (!container || !skillsGrid) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // Keep static grid for accessibility

  // Gather all skill items from the existing grid
  const skillNodes = [];
  skillsGrid.querySelectorAll('.skill').forEach((skillEl) => {
    const h3 = skillEl.querySelector('h3');
    const items = skillEl.querySelectorAll('.skill-list > span');
    items.forEach((item) => {
      const svg = item.querySelector('svg');
      const b = item.querySelector('b');
      // Clone item to extract only the skill name text without inner badge, text icon or svg text.
      const clone = item.cloneNode(true);
      clone.querySelectorAll('svg, b, .skill-text-icon').forEach((el) => el.remove());
      const text = clone.textContent.trim();
      const rawBadge = b ? b.textContent.trim() : '';
      const ignoredBadges = new Set([
        'basic', 'exploring', 'tool', 'learning', 'beginner', 'intermediate', 'advanced',
        'novice', 'proficient', 'expert', 'starter', 'junior', 'senior'
      ]);
      const badge = rawBadge && !ignoredBadges.has(rawBadge.toLowerCase()) ? rawBadge : '';

      // Skip empty, invalid or incomplete duplicate labels (e.g. standalone "J" or "JS")
      if (!text || text === 'J' || text === 'JS') return;

      skillNodes.push({
        text,
        badge,
        svgHTML: svg ? svg.outerHTML : '',
        category: h3 ? h3.textContent.trim() : ''
      });
    });
  });

  if (skillNodes.length === 0) return;

  // Hide the original grid, show orbit container
  skillsGrid.classList.add('orbit-active');

  // Distribute the existing skills across three orbital layers.
  const orbitLayers = [[], [], []];
  skillNodes.forEach((skill, i) => orbitLayers[i % orbitLayers.length].push(skill));

  // Compute radii based on container size with mobile-safe fallback
  function getRadii() {
    const size = container.offsetWidth || container.getBoundingClientRect().width || Math.min(window.innerWidth * 0.9, 520);
    const isMobile = window.innerWidth <= 480;
    const isSmallMobile = window.innerWidth <= 360;

    if (isSmallMobile) {
      return {
        inner: size * 0.22,
        middle: size * 0.33,
        outer: size * 0.43
      };
    }
    if (isMobile) {
      return {
        inner: size * 0.23,
        middle: size * 0.34,
        outer: size * 0.44
      };
    }
    return {
      inner: size * 0.25,
      middle: size * 0.34,
      outer: size * 0.42
    };
  }

  // Build orbit nodes
  function buildNodes(skills, radiusKey, durationBase, directionFactor) {
    skills.forEach((skill, i) => {
      const angle = (360 / skills.length) * i;
      const node = document.createElement('div');
      node.className = 'skill-orbit-node';
      node.setAttribute('aria-label', skill.text + (skill.badge ? ' — ' + skill.badge : ''));

      const label = document.createElement('div');
      label.className = 'skill-orbit-label';
      if (skill.svgHTML) {
        const svgWrap = document.createElement('span');
        svgWrap.innerHTML = skill.svgHTML;
        const svgEl = svgWrap.querySelector('svg');
        if (svgEl) { svgEl.setAttribute('width', '14'); svgEl.setAttribute('height', '14'); label.appendChild(svgEl); }
      }
      const textSpan = document.createElement('span');
      textSpan.textContent = skill.text;
      label.appendChild(textSpan);
      if (skill.badge) {
        const b = document.createElement('b');
        b.textContent = skill.badge;
        label.appendChild(b);
      }

      node.appendChild(label);
      container.appendChild(node);

      // Hover: pause
      node.addEventListener('mouseenter', () => node.classList.add('paused'));
      node.addEventListener('mouseleave', () => node.classList.remove('paused'));
      node.addEventListener('touchstart', () => node.classList.toggle('paused'), { passive: true });

      // Store for dynamic radius update
      node._skillData = { angle, radiusKey, durationBase, directionFactor, index: i, total: skills.length };
    });
  }

  buildNodes(orbitLayers[0], 'inner', 22, 1);
  buildNodes(orbitLayers[1], 'middle', 31, -1);
  buildNodes(orbitLayers[2], 'outer', 42, 1);

  // Apply CSS custom properties for animation
  function applyRadii() {
    const { inner, middle, outer } = getRadii();
    const isMobile = window.innerWidth <= 480;

    container.querySelectorAll('.skill-orbit-node').forEach((node) => {
      const d = node._skillData;
      if (!d) return;
      const r = d.radiusKey === 'inner' ? inner : (d.radiusKey === 'middle' ? middle : outer);
      const dir = d.directionFactor;
      const angleStart = d.angle;
      const duration = (d.durationBase + d.index * 2.5) * (d.total > 4 ? 1 : 1.3);
      const depth = 0.78 + ((d.index * 0.19) % 0.42);
      const tilt = isMobile
        ? (d.radiusKey === 'inner' ? -8 : (d.radiusKey === 'middle' ? 5 : 12))
        : (d.radiusKey === 'inner' ? -14 : (d.radiusKey === 'middle' ? 8 : 22));

      node.style.cssText = `
        --orbit-start: ${angleStart}deg;
        --orbit-radius: ${r}px;
        --orbit-duration: ${duration}s;
        --orbit-depth: ${depth.toFixed(2)};
        --orbit-tilt: ${tilt}deg;
        animation-duration: ${duration}s;
        animation-direction: ${dir === -1 ? 'reverse' : 'normal'};
      `;
    });
  }

  applyRadii();

  // Re-apply on resize, orientation change, and window load
  let orbitResizeTimer;
  const triggerRadiiUpdate = () => {
    clearTimeout(orbitResizeTimer);
    orbitResizeTimer = setTimeout(applyRadii, 100);
  };

  window.addEventListener('resize', triggerRadiiUpdate, { passive: true });
  window.addEventListener('orientationchange', triggerRadiiUpdate, { passive: true });
  window.addEventListener('load', applyRadii, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkillsOrbit);
} else {
  initSkillsOrbit();
}

/* ==========================================================================
   PHOTO ORBIT DOT — Dynamic radius based on actual photo frame size
   ========================================================================== */
function initPhotoOrbitDot() {
  const frame = document.querySelector('.hero-photo-frame');
  const dot = document.querySelector('.photo-orbit-dot');
  if (!frame || !dot) return;

  function updateOrbitRadius() {
    const r = frame.offsetWidth / 2;
    dot.style.setProperty('--orbit-r', r + 'px');
  }

  updateOrbitRadius();
  window.addEventListener('resize', updateOrbitRadius, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhotoOrbitDot);
} else {
  initPhotoOrbitDot();
}

/* ========================================================================== 
  Contact form
  ========================================================================== */
(function initContactForm() {
  const sendBtn = document.getElementById('contactSendBtn');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const textarea = document.getElementById('contactMsg');
  const status = document.getElementById('contactFormStatus');

  if (!sendBtn || !nameInput || !emailInput || !textarea || !status) return;

  let isSubmitting = false;

  function setStatus(message, type) {
    status.className = 'contact-form-status';
    if (type) {
      status.classList.add(type);
    }
    status.textContent = message;
  }

  async function submitForm() {
    if (isSubmitting) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = textarea.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !msg || name.length > 100 || email.length > 254 || msg.length > 5000) {
      setStatus('Please complete your name, email, and message.', 'is-error');
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus('Please enter a valid email address.', 'is-error');
      return;
    }

    isSubmitting = true;
    sendBtn.disabled = true;
    sendBtn.setAttribute('aria-busy', 'true');
    setStatus('Sending your message...', 'is-loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Contact request failed');
      }

      nameInput.value = '';
      emailInput.value = '';
      textarea.value = '';
      setStatus('Thanks! Your message has been sent successfully.', 'is-success');
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : 'Something went wrong. Please try again.';
      setStatus(message, 'is-error');
    } finally {
      isSubmitting = false;
      sendBtn.disabled = false;
      sendBtn.removeAttribute('aria-busy');
    }
  }

  sendBtn.addEventListener('click', submitForm);
})();

