# Deployment Guide - Dental Coding Website

## 🚀 Deployment Overview

This React Vite application uses a **dual-server architecture**:
- **Development**: Separate Express server (port 3001) + Vite dev server (port 5173/5174)
- **Production**: Single deployment on Vercel with serverless API functions

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Make sure you have the correct email credentials in your `.env` file:
```env
EMAIL_USER=techtitanadamtechnologies@gmail.com
EMAIL_PASS=gzqx hcbs fyuq shqu
RECIPIENT_EMAIL=sibinarendran@gmail.com
```

### 2. Build Test
Ensure the build works locally:
```bash
npm run build
```

### 3. Git Status
Make sure all changes are committed:
```bash
git status
git add .
git commit -m "Ready for deployment"
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```
Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N** (if first time)
- Project name: `dental-coding-website` (or your preferred name)
- Directory: `.` (current directory)
- Override settings? **N**

4. **Set Environment Variables** in Vercel dashboard:
- Go to your project settings
- Add environment variables:
  - `EMAIL_USER`: `techtitanadamtechnologies@gmail.com`
  - `EMAIL_PASS`: `gzqx hcbs fyuq shqu`
  - `RECIPIENT_EMAIL`: `sibinarendran@gmail.com`

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**:
```bash
git push origin main
```

2. **Connect to Vercel**:
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Configure:
  - Framework Preset: **Vite**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

3. **Add Environment Variables** in project settings

## 🔧 How Deployment Works

### Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| **Frontend** | Vite dev server (localhost:5174) | Static files served by Vercel |
| **API** | Express server (localhost:3001) | Vercel serverless functions |
| **API Endpoint** | `http://localhost:3001/api/upload` | `https://your-domain.vercel.app/api/upload` |
| **File Handling** | `server-dev.js` | `api/upload.js` |

### Smart API Routing
The React app automatically detects the environment:
```javascript
// In src/components/DentalForm.jsx
const apiUrl = import.meta.env.DEV 
  ? 'http://localhost:3001/api/upload'  // Development
  : '/api/upload'                       // Production
```

## 📁 Files Used in Deployment

### Included in Deployment:
- ✅ `src/` - React components
- ✅ `api/upload.js` - Serverless API function
- ✅ `dist/` - Built React app
- ✅ `vercel.json` - Deployment configuration
- ✅ `package.json` - Dependencies
- ✅ `tailwind.config.js` - Styling
- ✅ Environment variables (set in Vercel)

### NOT Included in Deployment:
- ❌ `server-dev.js` - Development only
- ❌ `node_modules/` - Rebuilt on Vercel
- ❌ `.env` - Replaced by Vercel environment variables

## 🧪 Testing Deployment

1. **Build locally**:
```bash
npm run build
npm run preview
```

2. **Test API endpoint** (after deployment):
```bash
curl -X POST https://your-domain.vercel.app/api/upload \
  -F "email=test@example.com" \
  -F "notes=Test deployment"
```

## 🔍 Troubleshooting

### Common Issues:

1. **Email not sending**:
   - Check environment variables in Vercel dashboard
   - Verify Gmail app password is correct
   - Check function logs in Vercel dashboard

2. **Build fails**:
   - Run `npm run build` locally first
   - Check for any TypeScript/ESLint errors
   - Ensure all dependencies are in `package.json`

3. **API 404 errors**:
   - Verify `vercel.json` routes configuration
   - Check that `api/upload.js` exists
   - Ensure serverless function syntax is correct

### Vercel Function Logs:
- Go to Vercel dashboard → Your project → Functions tab
- Click on `/api/upload` to see logs and invocations

## 🎯 Post-Deployment

### Verify Everything Works:
1. ✅ Website loads at your Vercel URL
2. ✅ Form submission works (Step 1 → Step 2)
3. ✅ File uploads work
4. ✅ Email gets sent successfully
5. ✅ Success page displays
6. ✅ Analytics tracking works

### Custom Domain (Optional):
1. Go to Vercel project settings
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate will be automatically provisioned

## 📊 Monitoring

- **Analytics**: Vercel Analytics automatically tracks page views
- **Function Logs**: Monitor API calls in Vercel dashboard
- **Error Tracking**: Check function logs for any email sending issues
- **Performance**: Vercel provides Core Web Vitals metrics

---

## 🚀 Quick Deploy Commands

```bash
# Test build locally
npm run build

# Deploy to Vercel
vercel

# Deploy to production (if already set up)
vercel --prod
```

Your dental coding website will be live at: `https://your-project-name.vercel.app` 