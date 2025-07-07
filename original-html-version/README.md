# Dental Coding Upload Website

A simple web application for uploading dental coding files and scenarios with email notifications.

## Features

- File upload functionality
- Email notifications with attachments
- Responsive design
- Serverless deployment ready

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open `http://localhost:3000` in your browser

## Deployment to Vercel

### Prerequisites

1. Create a [Vercel account](https://vercel.com)
2. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

### Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect the configuration

3. **Set Environment Variables:**
   In your Vercel dashboard, go to Settings > Environment Variables and add:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   RECIPIENT_EMAIL=recipient@example.com
   ```

4. **Deploy:**
   - Click "Deploy" in Vercel dashboard, or
   - Use CLI: `vercel --prod`

### Environment Variables Setup

For Gmail SMTP:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS`

### File Structure

```
project/
├── api/
│   └── upload.js          # Serverless function for file upload
├── public/
│   ├── index.html         # Main form page
│   └── thankyou.html      # Thank you page
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies
└── server.js              # Original Express server (for local dev)
```

### Vercel Configuration

The `vercel.json` file configures:
- Serverless function routing
- Static file serving
- Function timeout settings

### Notes

- Maximum file upload size is limited by Vercel (usually 4.5MB for Hobby plan)
- Function timeout is set to 30 seconds
- Files are processed in memory (not stored permanently)
- All uploads are emailed as attachments

### Troubleshooting

1. **Email not sending:** Check environment variables are set correctly in Vercel
2. **File upload issues:** Ensure files are under size limits
3. **Function timeout:** Large files may cause timeouts; consider file size limits

## Support

For issues or questions, please check the Vercel documentation or create an issue in this repository. 