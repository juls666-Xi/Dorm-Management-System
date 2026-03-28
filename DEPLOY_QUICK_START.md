# 🚀 Deploy to Vercel - Quick Start

## 3-Step Deployment Guide

### Step 1: Get MongoDB Connection String
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create a cluster
4. Get your connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dorm-management`

### Step 2: Push Code to GitHub
```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

### Step 3: Deploy to Vercel

**Choose one:**

#### Option A: Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Select `Dorm-Management-System` repo
5. Click "Import"
6. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `FRONTEND_URL` = your Vercel domain (auto-filled)
7. Click "Deploy"
8. ✅ Done! Your app is live in ~2-3 minutes

#### Option B: Vercel CLI (Advanced)
```bash
npm install -g vercel
vercel --prod
# Follow prompts and enter environment variables
```

---

## After Deployment

✅ Visit: `https://your-app.vercel.app`
✅ Test API: `https://your-app.vercel.app/api/health/status`
✅ Login with test credentials (see VERCEL_DEPLOYMENT.md)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm run install:all` locally first |
| MongoDB connection fails | Check MONGODB_URI in Environment Variables |
| CORS errors | Verify FRONTEND_URL matches your Vercel domain |
| API returns 404 | Check Functions tab in Vercel Dashboard |

---

📖 **Full Documentation**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
