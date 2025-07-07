import multer from 'multer';
import nodemailer from 'nodemailer';

// Multer setup for file uploads (store in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Email config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'techtitanadamtechnologies@gmail.com',
    pass: process.env.EMAIL_PASS || 'gzqx hcbs fyuq shqu'
  }
});

// Helper function to run multer in serverless environment
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Run multer middleware
    await runMiddleware(req, res, upload.array('files'));

    const userEmail = req.body.email;
    const notes = req.body.notes;
    const files = req.files;

    // Require email, and at least one of notes or files (notes must not be just whitespace)
    if (!userEmail || ((!notes || !notes.trim()) && (!files || files.length === 0))) {
      return res.status(400).json({ error: 'Email and at least one of notes or file are required.' });
    }

    // Prepare attachments
    const attachments = (files || []).map(file => ({
      filename: file.originalname,
      content: file.buffer
    }));

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'techtitanadamtechnologies@gmail.com',
      to: process.env.RECIPIENT_EMAIL || 'sibinarendran@gmail.com',
      subject: 'New Dental Coding Submission',
      text: `A new submission was received.\n\nUser email: ${userEmail}\n\nNotes/Scenario:\n${notes}`,
      attachments
    });

    // Return success response for React app
    res.status(200).json({ 
      success: true, 
      message: 'Submission received successfully' 
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error sending email.' });
  }
} 