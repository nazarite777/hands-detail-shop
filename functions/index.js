import functions from 'firebase-functions';
import admin from 'firebase-admin';
import nodemailer from 'nodemailer';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Gmail configuration - IMPORTANT: You need to set these environment variables
// Run: firebase functions:config:set gmail.email="your-email@gmail.com" gmail.password="your-app-password"
// See: https://support.google.com/accounts/answer/185833 (Generate App Password)

const gmailEmail = process.env.GMAIL_EMAIL || process.env.gmail_email;
const gmailPassword = process.env.GMAIL_PASSWORD || process.env.gmail_password;

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

/**
 * Cloud Function to send review submission email to admin
 * Called when a customer submits a review
 * 
 * Request body:
 * {
 *   name: string,
 *   email: string,
 *   rating: number,
 *   comment: string,
 *   createdAt: ISO string
 * }
 */
export const sendReviewEmail = functions.https.onCall(async (data, context) => {
  try {
    const { name, email, rating, comment, createdAt } = data;

    // Validate input
    if (!name || !rating || !comment) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields: name, rating, comment'
      );
    }

    // Check if Gmail is configured
    if (!gmailEmail || !gmailPassword) {
      console.error('Gmail not configured in environment variables');
      throw new functions.https.HttpsError(
        'unavailable',
        'Email service not configured. Admin has not set up email notifications.'
      );
    }

    // Format the email body
    const emailBody = `
🌟 NEW REVIEW SUBMISSION - AWAITING YOUR APPROVAL 🌟

Customer Name: ${name}
Rating: ${'⭐'.repeat(rating)}
Customer Email: ${email || 'Not provided'}

Review Text:
"${comment}"

Submitted: ${new Date(createdAt).toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 MANAGE THIS REVIEW:
   Visit your Admin Panel: https://hands-detail.web.app/admin-pending-reviews.html
   
   ✅ APPROVE: Click "Approve & Publish" to add to live reviews
   ❌ REJECT: Click "Reject" to remove without publishing

📧 To Contact Customer:
   - Reply to this email or contact: ${email || 'Email not provided'}
   - Thank them for their business!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Send email to admin
    const mailOptions = {
      from: gmailEmail,
      to: 'handsdetailshop@gmail.com',
      subject: `New Review: ${name} (${rating}⭐)`,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
    };

    const response = await transporter.sendMail(mailOptions);

    console.log('Review email sent successfully:', response.messageId);

    return {
      success: true,
      messageId: response.messageId,
      message: 'Review submitted successfully! Email notification sent.',
    };
  } catch (error) {
    console.error('Error sending review email:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      `Failed to send email: ${error.message}`
    );
  }
});

/**
 * Cloud Function to send contact form emails
 * Called when customer submits contact form
 */
export const sendContactEmail = functions.https.onCall(async (data, context) => {
  try {
    const { name, email, phone, message } = data;

    // Validate input
    if (!name || !email || !message) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields: name, email, message'
      );
    }

    // Check if Gmail is configured
    if (!gmailEmail || !gmailPassword) {
      throw new functions.https.HttpsError(
        'unavailable',
        'Email service not configured.'
      );
    }

    const emailBody = `
📧 NEW CONTACT FORM SUBMISSION

From: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
    `.trim();

    const mailOptions = {
      from: gmailEmail,
      to: 'handsdetailshop@gmail.com',
      subject: `New Contact Form: ${name}`,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
      replyTo: email,
    };

    const response = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: response.messageId,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Error sending contact email:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      `Failed to send email: ${error.message}`
    );
  }
});
