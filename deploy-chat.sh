#!/bin/bash
# Hands Detail Shop - Firebase Deployment Script
# Run this to deploy the AI Chat system to Firebase

set -e

echo "🚀 Hands Detail Shop - Firebase Deployment"
echo "=========================================="
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not installed."
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

echo "✓ Firebase CLI found"
echo ""

# Check if we're in the right directory
if [ ! -f "firebase.json" ]; then
    echo "❌ firebase.json not found. Make sure you're in the project root directory."
    exit 1
fi

echo "✓ Project structure verified"
echo ""

# Check for .firebaserc
if [ ! -f ".firebaserc" ]; then
    echo "⚠️  .firebaserc not found. You may need to initialize Firebase first:"
    echo "   firebase init"
    exit 1
fi

echo "✓ Firebase project initialized"
echo ""

# Prompt for API key
read -p "Enter your Anthropic API key (paste and press Enter): " API_KEY

if [ -z "$API_KEY" ]; then
    echo "❌ API key is required. Aborting."
    exit 1
fi

echo ""
echo "🔐 Setting Anthropic API key in Firebase environment..."
firebase functions:config:set anthropic.api_key="$API_KEY"

echo ""
echo "✓ API key configured"
echo ""

# Install dependencies
echo "📦 Installing Cloud Functions dependencies..."
cd functions
npm install
cd ..
echo "✓ Dependencies installed"
echo ""

# Deploy
echo "🚀 Deploying to Firebase..."
echo "   - Functions"
echo "   - Hosting"
echo ""

firebase deploy

echo ""
echo "=========================================="
echo "✅ Deployment complete!"
echo "=========================================="
echo ""
echo "Your AI Chat System is now live!"
echo ""
echo "📍 Access points:"
echo "   • Floating chat button on all pages (bottom-right)"
echo "   • Full chat page: https://handsdetailshop.com/ai-assistant.html"
echo ""
echo "📝 Next steps:"
echo "   1. Visit https://handsdetailshop.com"
echo "   2. Click the chat button (💬) in bottom-right corner"
echo "   3. Ask a question to test the AI"
echo ""
echo "🔗 Useful links:"
echo "   • Firebase Console: https://console.firebase.google.com"
echo "   • View Logs: firebase functions:log"
echo "   • Redeploy: firebase deploy"
echo ""
