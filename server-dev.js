import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware for multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 10MB per file allowed.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum 10 files allowed.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field.' });
    }
    return res.status(400).json({ error: 'File upload error: ' + error.message });
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
});

// Multer setup for file uploads (store in memory)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10 // Maximum 10 files per request
  },
  fileFilter: (req, file, cb) => {
    // Check file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, PNG, DOC, and DOCX files are allowed.'), false);
    }
  }
});

// Email config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'techtitanadamtechnologies@gmail.com',
    pass: process.env.EMAIL_PASS || 'gzqx hcbs fyuq shqu'
  }
});

// API route for file upload
app.post('/api/upload', (req, res) => {
  upload.array('files')(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size too large. Maximum 10MB per file allowed.' });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({ error: 'Too many files. Maximum 10 files allowed.' });
        }
        return res.status(400).json({ error: 'File upload error: ' + err.message });
      }
      if (err.message.includes('Invalid file type')) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'File upload failed.' });
    }

    try {
      const userEmail = req.body.email;
      const notes = req.body.notes;
      const files = req.files;

      console.log('Received submission:', {
        email: userEmail,
        notes: notes ? notes.substring(0, 50) + '...' : 'No notes',
        filesCount: files ? files.length : 0
      });

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
        to: process.env.RECIPIENT_EMAIL || 'yugandhardeveloper@gmail.com',
        cc: process.env.CC_EMAIL || 'techtitanadamtechnologies@gmail.com',
        subject: 'New Dental Coding Submission',
        text: `A new submission was received.\n\nUser email: ${userEmail}\n\nNotes/Scenario:\n${notes}`,
        attachments
      });

      console.log('Email sent successfully');

      // Return success response for React app
      res.status(200).json({ 
        success: true, 
        message: 'Submission received successfully' 
      });

    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Error sending email.' });
    }
  });
});

// API route for eligibility check
app.post('/api/eligibility', (req, res) => {
  upload.array('files')(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'File size too large. Maximum 10MB per file allowed.' });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({ error: 'Too many files. Maximum 10 files allowed.' });
        }
        return res.status(400).json({ error: 'File upload error: ' + err.message });
      }
      if (err.message.includes('Invalid file type')) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'File upload failed.' });
    }

    try {
      const { 
        email, 
        patientName, 
        dateOfBirth,
        dobMonth,
        dobDay,
        dobYear,
        groupNPI,
        groupTaxId,
        providerNPI,
        providerTaxId,
        memberId, 
        insuranceName, 
        notes 
      } = req.body;
      
      const files = req.files;

      console.log('Received eligibility check:', {
        email: email,
        patientName: patientName || 'Not provided',
        dateOfBirth: dateOfBirth || 'Not provided',
        dobMonth: dobMonth || 'Not provided',
        dobDay: dobDay || 'Not provided',
        dobYear: dobYear || 'Not provided',
        groupNPI: groupNPI || 'Not provided',
        groupTaxId: groupTaxId || 'Not provided',
        providerNPI: providerNPI || 'Not provided',
        providerTaxId: providerTaxId || 'Not provided',
        memberId: memberId || 'Not provided',
        insuranceName: insuranceName || 'Not provided',
        notes: notes ? notes.substring(0, 50) + '...' : 'No notes',
        filesCount: files ? files.length : 0
      });

      // Validate required fields
      if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
      }

      // Require at least some patient information, notes, or files
      const hasPatientInfo = patientName?.trim() || dateOfBirth?.trim() || dobMonth?.trim() || dobDay?.trim() || dobYear?.trim() || groupNPI?.trim() || groupTaxId?.trim() || providerNPI?.trim() || providerTaxId?.trim() || memberId?.trim() || insuranceName?.trim();
      const hasNotes = notes?.trim();
      const hasFiles = files && files.length > 0;

      if (!hasPatientInfo && !hasNotes && !hasFiles) {
        return res.status(400).json({ error: 'Please provide patient information, notes, or upload files.' });
      }

      // Prepare attachments
      const attachments = (files || []).map(file => ({
        filename: file.originalname,
        content: file.buffer
      }));

      // Create email content
      let emailContent = `A new eligibility check request was received.\n\n`;
      emailContent += `Submitted by: ${email}\n\n`;
      
      if (hasPatientInfo) {
        emailContent += `PATIENT INFORMATION:\n`;
        if (patientName?.trim()) emailContent += `Patient Name: ${patientName}\n`;
        if (dateOfBirth?.trim()) emailContent += `Date of Birth: ${dateOfBirth}\n`;
        if (dobMonth?.trim() || dobDay?.trim() || dobYear?.trim()) {
          emailContent += `Date Components: Month: ${dobMonth || 'N/A'}, Day: ${dobDay || 'N/A'}, Year: ${dobYear || 'N/A'}\n`;
        }
        if (memberId?.trim()) emailContent += `Member ID: ${memberId}\n`;
        if (insuranceName?.trim()) emailContent += `Insurance: ${insuranceName}\n`;
        if (groupNPI?.trim()) emailContent += `Group NPI: ${groupNPI}\n`;
        if (groupTaxId?.trim()) emailContent += `Group Tax ID: ${groupTaxId}\n`;
        if (providerNPI?.trim()) emailContent += `Provider NPI: ${providerNPI}\n`;
        if (providerTaxId?.trim()) emailContent += `Provider Tax ID: ${providerTaxId}\n`;
        emailContent += `\n`;
      }
      
      if (hasNotes) {
        emailContent += `ADDITIONAL NOTES:\n${notes}\n\n`;
      }
      
      if (hasFiles) {
        emailContent += `ATTACHMENTS: ${files.length} file(s) attached\n`;
      }

      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'techtitanadamtechnologies@gmail.com',
        to: process.env.RECIPIENT_EMAIL || 'yugandhardeveloper@gmail.com',
        cc: process.env.CC_EMAIL || 'techtitanadamtechnologies@gmail.com',
        subject: 'New Eligibility Check Request',
        text: emailContent,
        attachments
      });

      console.log('Eligibility check email sent successfully');

      // Return success response for React app
      res.status(200).json({ 
        success: true, 
        message: 'Eligibility check request submitted successfully' 
      });

    } catch (err) {
      console.error('Eligibility check error:', err);
      res.status(500).json({ error: 'Error processing eligibility check request.' });
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Development API server is running' });
});

app.listen(PORT, () => {
  console.log(`Development API server running on http://localhost:${PORT}`);
  console.log('Make sure to update your React app to use http://localhost:3001/api/upload');
}); 