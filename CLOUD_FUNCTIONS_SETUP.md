# Firebase Cloud Functions Email Setup Guide

## Overview
Your review submission system now uses Firebase Cloud Functions to send emails via Gmail. This guide walks through the setup process.

## Step 1: Install Dependencies for Cloud Functions

```bash
cd functions
npm install
```

This installs:
- `firebase-functions` - Firebase Cloud Functions SDK
- `firebase-admin` - Firebase Admin SDK for server-side operations
- `nodemailer` - Email library for sending via Gmail

## Step 2: Set Up Gmail App Password

Firebase Cloud Functions needs a Gmail app password to send emails. Follow these steps:

### A. Enable 2-Step Verification (if not already enabled)
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** on the left
3. Under "How you sign in to Google", enable **2-Step Verification**

### B. Generate App Password
1. Go back to Security settings
2. Under "App passwords" (only visible if 2-Step Verification is enabled)
3. Select **Mail** and **Windows Computer** (or your device)
4. Google will generate a 16-character password
5. **Copy this password** - you'll use it in Step 3

### C. Add to Firebase Environment Variables
Run this command in your `functions` directory:

```bash
firebase functions:config:set gmail.email="handsdetailshop@gmail.com" gmail.password="YOUR_16_CHAR_APP_PASSWORD"
```

Replace `YOUR_16_CHAR_APP_PASSWORD` with the password you generated above.

## Step 3: Deploy Cloud Functions

```bash
firebase deploy --only functions
```

This will:
1. Compile and validate your function code
2. Deploy `sendReviewEmail` to Firebase
3. Show you the deployed function URL/endpoint

Watch for: `✓ functions deployed successfully`

## Step 4: Test the Review Form

1. Go to `https://hands-detail.web.app/reviews.html`
2. Submit a test review
3. Check `handsdetailshop@gmail.com` inbox for the review notification email
4. Check browser console (F12) for any error messages

## Troubleshooting

### Email not sending?
- **Check Cloud Function logs**:
  ```bash
  firebase functions:log
  ```
- **Verify Gmail credentials**: Account might have locked the login due to suspicious activity
- **Check email**: Gmail might have sent a warning email - approve the Firebase login attempt

### "Service not configured" error?
- You skipped Step 2 - Gmail credentials weren't set in environment variables
- Run the `firebase functions:config:set` command from Step 2C

### Function is not callable from website?
- Make sure Firebase SDK is loaded in reviews.html (check browser console)
- Verify the function name is exactly `sendReviewEmail`
- Check browser console Network tab for failed requests

## Production Notes

**Security Best Practices:**
- ✅ App passwords are safer than your main Gmail password
- ✅ Environment variables are encrypted in Firebase
- ✅ Cloud Functions run in Google's secure infrastructure
- ✅ Emails sent are logged (check Firebase console)

**Monitoring:**
- Monitor function invocations in Firebase Console → Functions
- Check billing (Cloud Functions free tier includes 2M invocations/month)
- Review function logs for any errors: `firebase functions:log`

## Next Steps (Optional)

### Store reviews in Firestore
Currently reviews are stored in localStorage (browser storage). For persistent storage:

```javascript
// In your Cloud Function, you could also save to Firestore:
await admin.firestore().collection('reviews').add({
  name, email, rating, comment, createdAt, status: 'pending'
});
```

### Set up SendGrid instead of Gmail
If you prefer SendGrid:
1. Create account at sendgrid.com
2. Get API key
3. Replace Nodemailer config with SendGrid's library

---

**Questions?** Check Firebase documentation: [firebase.google.com/docs](https://firebase.google.com/docs)
