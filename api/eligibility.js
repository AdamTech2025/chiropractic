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

// Middleware function to handle multipart/form-data in serverless environment
const middleware = (req, res, next) => {
  upload.array('files')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload error.' });
    }
    next();
  });
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Apply multer middleware
  await new Promise((resolve, reject) => {
    middleware(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

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
      to: process.env.RECIPIENT_EMAIL || 'sibinarendran@gmail.com',
      subject: 'New Eligibility Check Request',
      text: emailContent,
      attachments
    });

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Eligibility check request submitted successfully' 
    });

  } catch (err) {
    console.error('Eligibility check error:', err);
    return res.status(500).json({ error: 'Error processing eligibility check request.' });
  }
} 