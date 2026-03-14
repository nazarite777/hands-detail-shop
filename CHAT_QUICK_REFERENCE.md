# AI Chat - Quick Reference Card

## 🚀 Deploy (Do This First!)

**Windows Users:**
```
Double-click: deploy-chat.bat
```

**Mac/Linux Users:**
```
bash deploy-chat.sh
```

When prompted, paste your Anthropic API key (get from console.anthropic.com)

---

## ✅ What Gets Deployed

- ✅ Cloud Function for secure API calls
- ✅ Chat widget on all pages
- ✅ Floating button (bottom-right corner)
- ✅ Full chat page at `/ai-assistant.html`
- ✅ Firebase hosting updates

---

## 📋 What The Chat Can Do

**Answer Questions About:**
- Pricing & packages
- How to book
- Service descriptions
- Service areas
- Contact info & hours
- Fleet services
- Memberships
- Special offers

**Examples to Try:**
- "What packages do you offer?"
- "How do I book an appointment?"
- "Do you serve my area?"
- "What's the price of the Executive package?"
- "Can you detail a motorcycle?"

---

## 🎮 How Users Access It

### Floating Button (Easiest)
- Appears on all pages
- Bottom-right corner
- Says "💬" not always visible
- Click to open/close

### Direct Link
- `https://handsdetailshop.com/ai-assistant.html`
- Full-screen chat experience
- Share this with customers

### Mobile
- Responsive design
- Works on phones & tablets
- Opens as app-like interface

---

## ⚙️ Common Tasks

### Check If It's Working
```bash
firebase functions:log
```
Should show messages about incoming requests.

### Update AI Behavior
1. Edit `functions/index.js`
2. Find `const systemPrompt = ...`
3. Change pricing, services, tone, etc.
4. Save and run:
   ```bash
   firebase deploy --only functions
   ```

### Add Chat to a New Page
Add to that page's `</body>`:
```html
<script src="/chat-widget.js"></script>
```

### Reset API Key
```bash
firebase functions:config:set anthropic.api_key="YOUR_NEW_KEY"
firebase deploy --only functions
```

### View All Config
```bash
firebase functions:config:get
```

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Chat button doesn't show | Clear browser cache, refresh page |
| "AI service not configured" | Set API key again, redeploy functions |
| Slow responses | Check system prompt isn't too long |
| Function errors | Run `firebase functions:log` |
| Mobile chat broken | Refresh, clear cache, check viewport |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `ai-assistant.html` | Chat interface |
| `chat-widget.js` | Floating button code |
| `functions/index.js` | Server-side code |
| `AI_CHAT_SETUP.md` | Full setup guide |
| `CHAT_SETUP_COMPLETE.md` | This project summary |

---

## 🔐 Security Reminders

✅ API key is stored on Firebase servers  
✅ Never exposed to users  
✅ CORS protected  
✅ User messages aren't logged (by default)  
✅ Conversation is NOT saved across sessions  

---

## 📊 Useful Commands

```bash
# View logs
firebase functions:log

# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting

# Configure environment
firebase functions:config:set anthropic.api_key="KEY"

# View all configuration
firebase functions:config:get

# Serve locally (test before deploying)
firebase serve
```

---

## 📞 Need Help?

1. **Check Setup Guide:** `AI_CHAT_SETUP.md`
2. **View Function Logs:** `firebase functions:log`
3. **Check Firebase Console:** https://console.firebase.google.com
4. **Anthropic Docs:** https://docs.anthropic.com/

---

## ✨ Pro Tips

💡 Test on mobile before showing customers  
💡 Update pricing regularly in `systemPrompt`  
💡 Monitor logs for errors and usage  
💡 Keep API key secure - don't share it  
💡 Chat works offline (shows stored messages only)  
💡 Each user's chat is independent session  

---

**Status:** ✅ Ready to Deploy  
**Updated:** March 14, 2026
