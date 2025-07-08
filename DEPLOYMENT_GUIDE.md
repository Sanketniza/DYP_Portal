# Vercel Deployment Instructions for DYP Portal

## Prerequisites
1. Make sure your GitHub repository is up to date
2. Ensure your Vercel account is connected to GitHub

## Deployment Steps

### Step 1: Push changes to GitHub
cd d:\DYP_Portal
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository "DYP_Portal"
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: cd frontend && npm run build
   - Output Directory: frontend/dist
   - Install Command: cd frontend && npm install

### Step 3: Set Environment Variables in Vercel
In your Vercel project settings, add these environment variables:
- NODE_ENV = production
- MONGO_URI = your_mongodb_connection_string
- JWT_SECRET = your_jwt_secret
- CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
- CLOUDINARY_API_KEY = your_cloudinary_api_key
- CLOUDINARY_API_SECRET = your_cloudinary_api_secret

### Step 4: After deployment
1. Update the CORS origin in backend/index.js with your actual Vercel domain
2. Update frontend/.env.production with your actual backend URL

## Important Notes
- The backend will be accessible at: https://your-domain.vercel.app/api
- The frontend will be accessible at: https://your-domain.vercel.app
- Make sure to update CORS settings after getting your Vercel domain
