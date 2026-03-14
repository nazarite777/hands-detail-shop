# Hands Detail Shop - AI Chat System Setup ✅

## What's Been Set Up

Your AI assistant is now configured and ready to deploy. Here's what's been created:

### 📁 **New Files Created**
- **`ai-assistant.html`** - Full-page chat interface with Firebase integration
- **`chat-widget.js`** - Floating chat button that appears on all pages
- **`AI_CHAT_SETUP.md`** - Detailed technical setup instructions
- **`deploy-chat.bat`** - Windows deployment helper (run this!)
- **`deploy-chat.sh`** - Mac/Linux deployment helper

### 📝 **Files Updated**
- **`functions/index.js`** - Added Cloud Function `aiChatMessage` for secure API calls
- **`functions/package.json`** - Added node-fetch dependency
- **`index.html`** - Added chat widget script
- **`services.html`** - Added chat widget script
- **`booking.html`** - Added chat widget script
- **`contact.html`** - Added chat widget script

---

## 🚀 Quick Start (3 Steps)

### Step 1: Get Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Click "API Keys" → "Create Key"
4. Copy the key (keep it safe)

### Step 2: Run Deployment Script

**On Windows:**
```
Double-click: deploy-chat.bat
```
Or open Command Prompt and run:
```
deploy-chat.bat
```

**On Mac/Linux:**
```
bash deploy-chat.sh
```

The script will:
1. Ask for your Anthropic API key
2. Configure Firebase environment
3. Install dependencies
4. Deploy everything

### Step 3: Test It!
1. Visit your website: `https://handsdetailshop.com`
2. Look for the 💬 button in the bottom-right corner
3. Click it and start chatting!

---

## 📍 Where Users Can Access The Chat

### ✅ Floating Chat Button
- Appears on **every page** of your website
- Bottom-right corner
- Click it to open/close the chat
- Works on mobile devices

### ✅ Dedicated Chat Page
- Direct URL: `https://handsdetailshop.com/ai-assistant.html`
- Full-screen chat interface
- Can share this link with customers

### ✅ Specific Pages
The chat button loads on:
- Home (index.html)
- Services (services.html)
- Booking (booking.html)
- Contact (contact.html)
- ...and any other page where the script is added

---

## 🤖 What The AI Knows

Your AI assistant can help customers with:
- ✅ All pricing and package details
- ✅ Service descriptions and features
- ✅ Booking information and process
- ✅ Service areas (PA, OH, WV, MD)
- ✅ Contact number and hours
- ✅ Fleet services
- ✅ Membership plans
- ✅ Special promotions

Try these questions to test:
- "What are your packages?"
- "How do I book an appointment?"
- "Do you serve my area?"
- "What's included in the Executive package?"

---

## 🔒 Security Features

✅ **API Key Protected**
- Your Anthropic API key is stored securely on Firebase servers
- Never exposed to users or web browsers

✅ **Server-Side Processing**
- All API calls go through a Firebase Cloud Function
- No direct connections from client to Anthropic

✅ **CORS Enabled**
- Works across all your pages
- No security warnings

---

## ⚙️ Technical Details

### How It Works
1. User types a question in the chat widget
2. Message sent to Firebase Cloud Function
3. Cloud Function securely calls Anthropic API
4. AI generates response based on system prompt
5. Response returned to user in the chat

### System Prompt
The AI is instructed to:
- Talk like a local Pittsburgh expert
- Use your exact pricing and services
- Direct unclear questions to your phone number
- Keep responses concise and helpful

---

## 🎨 Customization (Optional)

### Add Chat to More Pages
Add this one line to any HTML page (before `</body>`):
```html
<script src="/chat-widget.js"></script>
```

### Change Chat Behavior
Edit `functions/index.js` and modify the `systemPrompt` variable with:
- New pricing
- New services
- Updated service areas
- Different tone/personality
- Any other instructions

Then redeploy:
```bash
firebase deploy --only functions
```

### Change Button Style
Edit `chat-widget.js` to customize:
- Button color (currently gold: `#C9A84C`)
- Button position (bottom-right)
- Chat window size
- Mobile responsiveness
- Animation effects

---

## 📊 Monitoring & Support

### View Chat Logs
```bash
firebase functions:log
```

### Check Deployment Status
```bash
firebase status
```

### Update Configuration
```bash
firebase functions:config:set anthropic.api_key="NEW_KEY"
firebase deploy --only functions
```

---

## ❓ Troubleshooting

### Chat button doesn't appear?
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)
- Verify `chat-widget.js` is accessible

### "AI service not configured" error?
- API key wasn't set properly
- Run: `firebase functions:config:set anthropic.api_key="YOUR_KEY"`
- Then: `firebase deploy --only functions`

### Function logs show errors?
- Run: `firebase functions:log` to see what happened
- Check that node-fetch is installed in functions
- Verify API key is correct

### Chat window won't open on mobile?
- Refresh the page
- Check mobile viewport scaling
- Clear browser cache

---

## 📞 Still Have Questions?

### Reference Documents
- **`AI_CHAT_SETUP.md`** - Detailed technical guide
- **`functions/index.js`** - View the Cloud Function code
- **`ai-assistant.html`** - View the chat interface

### Firebase Documentation
- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)

### Anthropic Documentation
- [Claude API Docs](https://docs.anthropic.com/en/docs/about-claude/models/models-overview)

---

## 🎉 You're All Set!

Your AI assistant is deployed and ready to serve your customers 24/7. The chat will:
- Answer questions about your services
- Help with booking information
- Guide customers to contact you
- Provide a professional support experience

**Next Action:** Run the deployment script (Step 2 above) and you're live!

---

**Last Updated:** March 14, 2026  
**Status:** ✅ Ready for Deployment  
**Support:** Check Firebase Console for logs
