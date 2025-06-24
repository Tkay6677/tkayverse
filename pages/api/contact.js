import clientPromise from '../../lib/mongodb';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Persist contact in MongoDB
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  await db.collection('contacts').insertOne({ name, email, message, createdAt: new Date() });

  // List of ASCII art designs
  const asciiArtList = [
    `
      /\\_/\\  
     ( o.o )  "Purr-severe!"
      > ^ <
    `,
    `
       /\\
      /  \\   "To infinity and beyond!"
     /====\\
     |    |
     |NASA|
     |    |
     |____|
    `,
    `
      (\\   )
       ) (
      (   )  "Code, Coffee, Repeat."
       ) (
      (___)
    `,
    `
        .-.
       (   ) "Bright ideas!"
        \\ /
         '
    `,
    `
     _______
    /      /, "Keep learning."
   /______//
  (______(/
    `,
    `
     .____________.
     | Hello,     | "Stay curious."
     |   World!   |
     |____________|
      /_/  \\_\\
    `,
    `
     .--.
    (o  o) "Be Happy!"
    / V \\
   /(   )\\
    ^^ ^^
    `,
    `
   .--------------.
   | "Keep it up" |
   '--------------'
    `,
    `
    _____
   /     \\ "Smile :)"
  |  o o  |
  |   ^   |
   \\_____/
    `,
    `
         /\\
        /**\\  "Climb high."
       /****\\
      /******\\
     /________\\
    `,
    `
    $$$$$$\\
   $$  __$$\\
   $$ /  $$ | "Greed corrupts; code is law, but the law is flawed."
   $$ |  $$ |
   $$ |  $$ |
   $$$$$$$  |
   \\_______/
  `,
  `
    .--------------------------------.
    |   "No bugs, just features!"    |
    '--------------------------------'
  `,
  `
    (>'-')>  "Keep coding!"
    <('-'<)
    ^('-')^
  `,
    `
      {^_^} "Debug is life."
    `,
    `
      >_ "sudo make dreams"
    `,
    `
      /\\
     /  \\  "Launch ideas."
    /++++\\
    |    |
    |____|
    `,
    `
      [::] "Beep boop innovate."
    `,
    `
       ,-. 
      (   ) "Spark creativity."
       '-'
    `,
    `
       /\\
      /  \\ 
     /____\\  "Peak productivity."
    `,
    `
      ~~~~~ "Flow with code."
    `,
    `
      [===] "Read, Write, Execute."
    `,
    `
      _  _    
     ( \\\/ ) "Love what you build."
      \\  /
       \\/
    `,
    `
      (o) "Keep turning."
    `,
  ];

  // Pick a random ASCII art
  const asciiArt = asciiArtList[Math.floor(Math.random() * asciiArtList.length)];

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Email to you (Tkay)
    await transporter.sendMail({
      from: `"Tkayverse" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Thank-you email to sender with random ASCII art
    await transporter.sendMail({
      from: `"Tkayverse" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for Reaching Out, ${name}!`,
      text: `
        Hello ${name}! Thanks for reaching out.
        Here's your random ASCII surprise:

        ${asciiArt}

        I'll get back to you soon!
        - Tkay
      `,
      html: `
        <h2>Hello ${name}!</h2>
        <p>Thanks for reaching out. Here's your random ASCII surprise:</p>
        <pre style="font-family: monospace;">
          ${asciiArt}
        </pre>
        <p>I'll get back to you soon!</p>
        <p>- Tkay</p>
      `,
    });

    return res.status(200).json({ message: 'Message sent!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}