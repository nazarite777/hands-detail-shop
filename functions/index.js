const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Gmail configuration - Load from Firebase Runtime Config
const gmailEmail = process.env.GMAIL_EMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;

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
exports.sendReviewEmail = functions.https.onCall(async (data, context) => {
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
exports.sendContactEmail = functions.https.onCall(async (data, context) => {
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

/**
 * Cloud Function to submit review with server-side timestamp
 * Ensures all timestamps are synced to Firebase server time
 */
exports.submitReviewWithServerTime = functions.https.onCall(async (data, context) => {
  try {
    const { name, rating, comment, email } = data;

    // Validate input
    if (!name || !rating || !comment) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required fields: name, rating, comment'
      );
    }

    // Get Firestore reference
    const db = admin.firestore();

    // Create review with server timestamp
    const reviewData = {
      name: name.trim(),
      rating: parseInt(rating),
      comment: comment.trim(),
      email: email ? email.trim() : '',
      verified: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      approvedAt: null,
      status: 'pending',
    };

    // Save to Firestore (temporary collection for admin approval)
    const docRef = await db.collection('pendingReviews').add(reviewData);

    console.log('Review saved with server timestamp:', docRef.id);

    return {
      success: true,
      reviewId: docRef.id,
      message: 'Review submitted successfully with server timestamp!',
    };
  } catch (error) {
    console.error('Error submitting review with server timestamp:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      `Failed to submit review: ${error.message}`
    );
  }
});

/**
 * Cloud Function triggered when a booking is created
 * Sends confirmation email to customer and admin notification
 */
exports.sendBookingConfirmation = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    try {
      const booking = snap.data();

      if (!gmailEmail || !gmailPassword) {
        console.error('Gmail not configured');
        return;
      }

      // Format the booking date
      const bookingDate = booking.date instanceof admin.firestore.Timestamp
        ? booking.date.toDate()
        : new Date(booking.date);

      const customerEmailBody = `
✨ BOOKING CONFIRMATION ✨

Dear ${booking.userName},

Your appointment has been confirmed! Here are the details:

📅 Date: ${bookingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
⏰ Time: ${booking.time}
🔧 Service: ${booking.service}
🚗 Vehicle: ${booking.vehicle?.year} ${booking.vehicle?.make} ${booking.vehicle?.model}
💰 Price: $${booking.price?.toFixed(2) || 'TBD'}
⏱️ Duration: ${booking.duration || 2} hours

${booking.specialRequests ? `📝 Special Requests:\n${booking.specialRequests}\n` : ''}

📍 We look forward to serving you!
If you need to reschedule, please contact us at least 24 hours in advance.

Best regards,
Hands Detail Shop Team
      `.trim();

      const adminEmailBody = `
🔔 NEW BOOKING CONFIRMATION

Customer: ${booking.userName}
Email: ${booking.userEmail}
Phone: ${booking.userPhone}

Service: ${booking.service}
Date: ${bookingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${booking.time}
Vehicle: ${booking.vehicle?.year} ${booking.vehicle?.make} ${booking.vehicle?.model} (${booking.vehicle?.color || 'N/A'})
Price: $${booking.price?.toFixed(2) || 'TBD'}

Status: ${booking.status}
Booking ID: ${context.params.bookingId}
      `.trim();

      // Send confirmation to customer
      await transporter.sendMail({
        from: gmailEmail,
        to: booking.userEmail,
        subject: 'Booking Confirmation - Hands Detail Shop',
        text: customerEmailBody,
        html: customerEmailBody.replace(/\n/g, '<br>'),
      });

      // Send notification to admin
      await transporter.sendMail({
        from: gmailEmail,
        to: 'handsdetailshop@gmail.com',
        subject: `New Booking: ${booking.userName} - ${booking.service}`,
        text: adminEmailBody,
        html: adminEmailBody.replace(/\n/g, '<br>'),
      });

      console.log('Booking confirmation emails sent successfully');
    } catch (error) {
      console.error('Error sending booking confirmation emails:', error);
    }
  });

/**
 * Cloud Function to send 24-hour booking reminders
 * Runs every hour and sends reminder emails for upcoming bookings
 */
exports.sendBookingReminders = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    try {
      const db = admin.firestore();

      // Calculate time window: 23.5 to 24.5 hours from now
      const now = new Date();
      const reminderWindowStart = new Date(now.getTime() + 23.5 * 60 * 60 * 1000);
      const reminderWindowEnd = new Date(now.getTime() + 24.5 * 60 * 60 * 1000);

      // Query bookings in reminder window
      const snapshot = await db.collection('bookings')
        .where('date', '>=', admin.firestore.Timestamp.fromDate(reminderWindowStart))
        .where('date', '<=', admin.firestore.Timestamp.fromDate(reminderWindowEnd))
        .where('status', 'in', ['pending', 'confirmed'])
        .get();

      const sendEmailPromises = [];

      snapshot.forEach((doc) => {
        const booking = doc.data();

        const bookingDate = booking.date instanceof admin.firestore.Timestamp
          ? booking.date.toDate()
          : new Date(booking.date);

        const remainderEmailBody = `
⏰ APPOINTMENT REMINDER ⏰

Dear ${booking.userName},

This is a friendly reminder about your upcoming appointment with Hands Detail Shop!

📅 Tomorrow at ${booking.time}
🚗 Vehicle: ${booking.vehicle?.year} ${booking.vehicle?.make} ${booking.vehicle?.model}
🔧 Service: ${booking.service}
⏱️ Duration: ${booking.duration || 2} hours

📍 Please arrive 10 minutes early
💰 Price: $${booking.price?.toFixed(2) || 'TBD'}

If you need to reschedule or cancel, please contact us as soon as possible.

See you soon!
Hands Detail Shop Team
        `.trim();

        if (gmailEmail && gmailPassword) {
          sendEmailPromises.push(
            transporter.sendMail({
              from: gmailEmail,
              to: booking.userEmail,
              subject: `Reminder: Your appointment tomorrow at ${booking.time}`,
              text: remainderEmailBody,
              html: remainderEmailBody.replace(/\n/g, '<br>'),
            }).catch((error) => {
              console.error(`Error sending reminder to ${booking.userEmail}:`, error);
            })
          );
        }
      });

      await Promise.all(sendEmailPromises);

      console.log(`Sent ${sendEmailPromises.length} booking reminders`);
      return null;
    } catch (error) {
      console.error('Error in sendBookingReminders:', error);
      return null;
    }
  });

/**
 * Cloud Function to cleanup old pending reviews
 * Runs daily and removes unapproved reviews older than 30 days
 */
exports.cleanupOldPendingReviews = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    try {
      const db = admin.firestore();

      // Calculate 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Query old pending reviews
      const snapshot = await db.collection('pendingReviews')
        .where('status', '==', 'pending')
        .where('createdAt', '<', admin.firestore.Timestamp.fromDate(thirtyDaysAgo))
        .get();

      const deletePromises = [];

      snapshot.forEach((doc) => {
        deletePromises.push(doc.ref.delete());
      });

      await Promise.all(deletePromises);

      console.log(`Cleaned up ${deletePromises.length} old pending reviews`);

      return {
        deletedCount: deletePromises.length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error in cleanupOldPendingReviews:', error);
      return null;
    }
  });
