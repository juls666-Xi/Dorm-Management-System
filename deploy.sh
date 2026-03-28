#!/bin/bash

echo "🚀 Dorm Management System - Vercel Deployment Setup"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "⚠️  .env.local not found!"
    echo "📝 Please create .env.local with your environment variables:"
    echo ""
    echo "   MONGODB_URI=your_mongodb_connection_string"
    echo "   FRONTEND_URL=https://your-domain.vercel.app"
    echo "   NODE_ENV=production"
    echo ""
else
    echo "✅ .env.local exists"
fi

# Install Vercel CLI
echo ""
echo "📥 Installing Vercel CLI..."
npm install -g vercel 2>/dev/null || echo "⚠️  Could not install Vercel CLI globally (needs admin)"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1️⃣  Configure .env.local with your MongoDB URI"
echo "2️⃣  Push to GitHub:"
echo "    git add ."
echo "    git commit -m 'Setup Dorm Management System for Vercel'"
echo "    git push"
echo ""
echo "3️⃣  Deploy with one of these commands:"
echo "    vercel --prod        # Using Vercel CLI"
echo "    OR visit https://vercel.com and import from GitHub"
echo ""
echo "📖 Full guide: VERCEL_DEPLOYMENT.md"
