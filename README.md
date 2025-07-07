# Chiropractic Practice Website

A modern React application built with Vite for chiropractic practice management. Patients can upload treatment notes and files to receive accurate billing codes and treatment plans via email.

## Features

- 🏥 **Modern UI**: Clean, responsive design with Tailwind CSS
- 📁 **File Upload**: Support for multiple file types (PDFs, documents, voice notes, X-rays)
- 📧 **Email Integration**: Automated email sending with Nodemailer
- 📊 **Analytics**: Comprehensive tracking with Vercel Analytics
- 🔒 **Privacy First**: HIPAA-compliant workflow with secure file handling
- ⚡ **Fast**: Built with Vite for optimal performance
- 📱 **Responsive**: Mobile-first design that works on all devices

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Analytics**: Vercel Analytics with custom event tracking
- **Email**: Nodemailer with Gmail SMTP
- **File Handling**: Multer for multipart form data
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Gmail account for email sending

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chiropractic-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=recipient@example.com
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Gmail address for sending emails | Yes |
| `EMAIL_PASS` | Gmail app password (not regular password) | Yes |
| `RECIPIENT_EMAIL` | Email address to receive submissions | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
```

The `dist` folder contains the production build.

## API Endpoints

### POST /api/upload

Handles form submissions with files and email sending for patient consultations.

**Request:**
- `files`: Multiple files (optional) - X-rays, medical records, etc.
- `notes`: Treatment notes or symptoms (optional)
- `email`: Patient email (required)

**Response:**
- Success: Redirects to thank you page
- Error: JSON error message

## Analytics Events

The application tracks the following custom events:

- `File Uploaded` - When patients upload files
- `File Removed` - When patients remove files
- `Step 1 Completed` - When patients complete the first step
- `Reached Step 2` - When patients progress to email step
- `Form Validation Error` - When validation fails
- `Form Submission Started` - When form submission begins
- `Form Submitted Successfully` - When submission succeeds
- `Form Submission Error` - When server errors occur
- `Form Submission Failed` - When client errors occur
- `Form Completed` - When patients reach thank you page

## Project Structure

```
chiropractic-website/
├── api/
│   └── upload.js          # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── ChiropracticForm.jsx # Main patient form component
│   │   ├── FileUpload.jsx # File upload handler
│   │   ├── Testimonials.jsx # Patient testimonials
│   │   ├── PrivacySection.jsx # HIPAA privacy information
│   │   └── ThankYou.jsx   # Success page
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Tailwind CSS imports
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in `src/components/`
2. Add analytics tracking with `track()` function
3. Update API endpoints in `api/` directory
4. Test thoroughly before deployment

## Security

- All file uploads are stored in memory temporarily
- Files are permanently deleted after email sending
- No PHI (Protected Health Information) is stored
- HIPAA-compliant workflow implementation
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support, email support@chiropracticpractice.com or create an issue in the repository.
