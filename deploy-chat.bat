@echo off
REM Hands Detail Shop - Firebase Deployment Script (Windows)
REM Run this to deploy the AI Chat system to Firebase

setlocal enabledelayedexpansion

echo.
echo 🚀 Hands Detail Shop - Firebase Deployment
echo ==========================================
echo.

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI not installed.
    echo Install it with: npm install -g firebase-tools
    pause
    exit /b 1
)

echo ✓ Firebase CLI found
echo.

REM Check if we're in the right directory
if not exist "firebase.json" (
    echo ❌ firebase.json not found. Make sure you're in the project root directory.
    pause
    exit /b 1
)

echo ✓ Project structure verified
echo.

REM Check for .firebaserc
if not exist ".firebaserc" (
    echo ⚠️  .firebaserc not found. You may need to initialize Firebase first:
    echo    firebase init
    pause
    exit /b 1
)

echo ✓ Firebase project initialized
echo.

REM Prompt for API key
set /p API_KEY="Enter your Anthropic API key (paste and press Enter): "

if "!API_KEY!"=="" (
    echo ❌ API key is required. Aborting.
    pause
    exit /b 1
)

echo.
echo 🔐 Setting Anthropic API key in Firebase environment...
call firebase functions:config:set anthropic.api_key="!API_KEY!"

echo.
echo ✓ API key configured
echo.

REM Install dependencies
echo 📦 Installing Cloud Functions dependencies...
cd functions
call npm install
cd ..
echo ✓ Dependencies installed
echo.

REM Deploy
echo 🚀 Deploying to Firebase...
echo    - Functions
echo    - Hosting
echo.

call firebase deploy

echo.
echo ==========================================
echo ✅ Deployment complete!
echo ==========================================
echo.
echo Your AI Chat System is now live!
echo.
echo 📍 Access points:
echo    • Floating chat button on all pages (bottom-right)
echo    • Full chat page: https://handsdetailshop.com/ai-assistant.html
echo.
echo 📝 Next steps:
echo    1. Visit https://handsdetailshop.com
echo    2. Click the chat button (💬) in bottom-right corner
echo    3. Ask a question to test the AI
echo.
echo 🔗 Useful links:
echo    • Firebase Console: https://console.firebase.google.com
echo    • View Logs: firebase functions:log
echo    • Redeploy: firebase deploy
echo.
pause
