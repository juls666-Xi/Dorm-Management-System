# Deploy to Vercel - Complete Guide

## Quick Start (3 Steps)

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/Dorm-Management-System.git
git push -u origin main
```

### Step 2: Create Vercel Account & Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Select your repository: `Dorm-Management-System`
5. Click "Import"

### Step 3: Configure Environment Variables
In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dorm-management
   FRONTEND_URL=https://your-app.vercel.app
   PORT=3000
   NODE_ENV=production
   ```

3. Click "Save"

The deployment will **auto-start** when you push to GitHub!

---

## Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster set up (or any MongoDB cloud service)
- [ ] MongoDB URI copied to environment variables
- [ ] `.env.local` added to `.gitignore` (don't commit secrets)
- [ ] All dependencies installed: `npm run install:all`
- [ ] Client builds successfully: `npm run build --prefix client`
- [ ] No hardcoded API URLs in code (use relative paths like `/api/...`)

---

## Full Deployment Steps

### 1. **Setup MongoDB (Free Tier Available)**

**Option A: MongoDB Atlas (Recommended)**
- Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Create free account
- Create cluster (M0 free tier)
- Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

**Option B: MongoDB Community Server**
- Use MongoDB Atlas (easiest for production)

### 2. **Prepare Your Project**

```bash
# Install all dependencies
npm run install:all

# Create .env.local file (NOT committed to git)
cat > .env.local << EOF
MONGODB_URI=your_mongodb_connection_string_here
FRONTEND_URL=https://your-domain.vercel.app
NODE_ENV=production
EOF

# Add to .gitignore
echo ".env.local" >> .gitignore
git add .gitignore
```

### 3. **Setup GitHub Repository**

```bash
git init
git add .
git commit -m "Setup Dorm Management System for Vercel deployment"
git remote add origin https://github.com/YOUR_USERNAME/Dorm-Management-System.git
git branch -M main
git push -u origin main
```

### 4. **Deploy to Vercel**

**Option A: Using Vercel CLI (Recommended for Advanced Users)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (answer the prompts)
vercel

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard (Easiest)**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect settings
5. Click "Deploy"

### 5. **Add Environment Variables**

In Vercel Dashboard:
1. Click your project
2. Go to **Settings** → **Environment Variables**
3. Add all variables from `.env.example`
4. Click "Save"

### 6. **Monitor & Debug**

After deployment:
- Check **Deployments** tab for logs
- Click on a deployment to see build output
- Check **Functions** tab to see serverless API logs
- Visit `https://your-app.vercel.app/api/health/status` to test backend

---

## Troubleshooting

### Build Fails with "nodemon: not found"
✅ **Fixed** - We removed nodemon from production build

### MongoDB Connection Error
```
Check:
1. MongoDB URI is correct in environment variables
2. IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
3. Database name matches URI
```

### CORS Errors
```
Solution: Ensure FRONTEND_URL in environment variables matches your Vercel domain
```

### API Returns 404
```
Check:
1. Backend is running (visit /api/health/status)
2. Routes are correctly imported in api/index.js
3. Vercel functions are deployed (check Functions tab)
```

---

## Project Structure After Setup

```
Dorm-Management-System/
├── api/                 # Serverless functions (Express app)
│   └── index.js        # Main API handler
├── client/             # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/             # Backend source code
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── server.js
│   └── package.json
├── vercel.json         # Vercel configuration
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── package.json        # Root package.json
```

---

## Environment Variables Reference

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `FRONTEND_URL` | Your Vercel production domain | `https://my-app.vercel.app` |
| `NODE_ENV` | Environment type | `production` |
| `PORT` | API port | `3000` |

---

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Install all packages
npm run install:all

# Deploy with Vercel CLI
vercel --prod

# Check Vercel status
vercel status
```

---

## Next Steps

1. ✅ Create MongoDB account
2. ✅ Push code to GitHub
3. ✅ Deploy to Vercel
4. ✅ Add environment variables
5. ✅ Test your deployment
6. ✅ Share your URL!

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Vite**: https://vitejs.dev
- **React**: https://react.dev
