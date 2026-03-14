# Firebase AI Chat Setup Guide

## What's Been Configured

✅ **Cloud Function** (`functions/index.js`) - `aiChatMessage`  
✅ **Chat Widget** (`ai-assistant.html`) - Full-featured assistant interface  
✅ **Floating Button** (`chat-widget.js`) - Easy access on all pages  
✅ **Main Page Integration** (`index.html`) - Chat button added  

## Setup Steps (5 minutes)

### 1. **Get Anthropic API Key**
- Go to [console.anthropic.com](https://console.anthropic.com)
- Create an account and generate an API key
- Copy the key (keep it secret)

### 2. **Set Firebase Environment Variable**
Run this command in your terminal to set the API key:

```bash
firebase functions:config:set anthropic.api_key="YOUR_API_KEY_HERE"
```

Replace `YOUR_API_KEY_HERE` with your actual Anthropic API key.

Verify it was set:
```bash
firebase functions:config:get
```

### 3. **Deploy Cloud Functions**

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

This deploys the `aiChatMessage` Cloud Function to Firebase.

### 4. **Update Firebase Config in Chat Page**

Edit `ai-assistant.html` and replace the Firebase config with your actual credentials:

```javascript
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
```

Find your credentials:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → Project Settings (⚙️)
3. Scroll to "Your apps" → Web app
4. Copy the config object

### 5. **Test Locally (Optional)**

```bash
npm start
# or
firebase serve
```

Visit `http://localhost:5000` and click the chat button in the bottom-right corner.

### 6. **Deploy to Firebase Hosting**

```bash
firebase deploy
```

## Features

### 📍 **Floating Chat Button**
- Appears bottom-right on all pages
- Click to open AI assistant
- Responds to Escape key (closes)
- Mobile-responsive

### 💬 **AI Assistant Features**
- Knows all your pricing, services, booking info
- Warm, expert local tone
- Quick reply buttons for common questions
- Typing indicator while thinking
- Full conversation history

### 🔒 **Security**
- API key stored securely on Firebase server
- Never exposed to client/browser
- All requests go through Cloud Function

## Customization

### Add Chat to Other Pages

Add this single line to any page `<head>` or before `</body>`:

```html
<script src="/chat-widget.js"></script>
```

### Update AI Behavior

Edit the `systemPrompt` in `functions/index.js` to:
- Change tone or personality
- Add new services/pricing
- Update service areas
- Modify response length

Then redeploy functions:
```bash
firebase deploy --only functions
```

### Styling

Edit `chat-widget.js` to customize:
- Button color/position
- Chat window size
- Mobile breakpoints
- Animations

## Troubleshooting

### Chat not responding?
1. Check browser console for errors
2. Verify API key is set: `firebase functions:config:get`
3. Check Cloud Function logs: `firebase functions:log`

### "AI service not configured"
- API key not set in Firebase environment
- Run: `firebase functions:config:set anthropic.api_key="YOUR_KEY"`
- Redeploy: `firebase deploy --only functions`

### Firebase config undefined?
- Update the `firebaseConfig` in `ai-assistant.html` with your credentials
- Verify you're using the correct project

### CORS errors?
- Built-in to Firebase Functions - no extra config needed
- Check that your Firebase hosting domain is correct

## Files Modified/Created

```
📁 hands-detail-shop/
├── ai-assistant.html          (Updated - Firebase integration)
├── chat-widget.js             (New - Floating button)
├── index.html                 (Updated - Added script tag)
└── 📁 functions/
    ├── index.js               (Updated - Added aiChatMessage)
    └── package.json           (Updated - Added node-fetch)
```

## Next Steps

1. ✅ Complete the 6 setup steps above
2. 📱 Test on desktop and mobile
3. 🎨 Optional: Customize AI behavior or styling
4. 📊 Monitor: Check Firebase logs for usage

## Support

If something breaks:
1. Check the Firebase Console for error messages
2. Review Cloud Function logs
3. Verify all config variables are set correctly
4. Clear browser cache and reload

Your AI assistant is now live! 🎉
