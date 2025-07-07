const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (for the HTML form)
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Multer setup for file uploads (store in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Email config using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/upload', upload.array('files'), async (req, res) => {
  const userEmail = req.body.email;
  const notes = req.body.notes;
  const files = req.files;

  // Require email, and at least one of notes or files (notes must not be just whitespace)
  if (!userEmail || ((!notes || !notes.trim()) && (!files || files.length === 0))) {
    return res.status(400).send('Email and at least one of notes or file are required.');
  }

  // Prepare attachments
  const attachments = (files || []).map(file => ({
    filename: file.originalname,
    content: file.buffer
  }));

  // Send email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      cc: process.env.CC_EMAIL,
      subject: 'New Dental Coding Submission',
      text: `A new submission was received.\n\nUser email: ${userEmail}\n\nNotes/Scenario:\n${notes}`,
      attachments
    });
    res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 