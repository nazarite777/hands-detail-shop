const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Configuration - Load from Firebase Runtime Config
const getConfig = () => {
  try {
    return functions.config();
  } catch (e) {
    console.error('Error accessing Firebase config:', e);
    return {};
  }
};

const config = getConfig();
const gmailEmail = config?.gmail?.email || process.env.GMAIL_EMAIL;
const gmailPassword = config?.gmail?.password || process.env.GMAIL_PASSWORD;
const anthropicApiKey = config?.anthropic?.api_key || process.env.ANTHROPIC_API_KEY;

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
      to: gmailEmail,
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

    // Send email notification to admin
    try {
      if (gmailEmail && gmailPassword) {
        const emailBody = `
🌟 NEW REVIEW SUBMISSION - AWAITING YOUR APPROVAL 🌟

Customer Name: ${reviewData.name}
Rating: ${'⭐'.repeat(reviewData.rating)}
Customer Email: ${reviewData.email || 'Not provided'}

Review Text:
"${reviewData.comment}"

Submitted: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 MANAGE THIS REVIEW:
   Visit your Admin Panel: https://hands-detail.web.app/admin-pending-reviews.html
   
   ✅ APPROVE: Click "Approve & Publish" to add to live reviews
   ❌ REJECT: Click "Reject" to remove without publishing

📧 To Contact Customer:
   - Reply to this email or contact: ${reviewData.email || 'Email not provided'}
   - Thank them for their business!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim();

        await transporter.sendMail({
          from: gmailEmail,
          to: gmailEmail,
          subject: `New Review: ${reviewData.name} (${reviewData.rating}⭐)`,
          text: emailBody,
          html: emailBody.replace(/\n/g, '<br>'),
        });

        console.log('Review email sent to admin');
      } else {
        console.warn('Gmail not configured - email not sent');
      }
    } catch (emailError) {
      console.error('Error sending review email:', emailError);
      // Don't fail the review submission if email fails
    }

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
 * TEMPORARILY DISABLED: Firestore database not configured
 */
/*
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
*/

/**
 * Cloud Function to send 24-hour booking reminders
 * Runs every hour and sends reminder emails for upcoming bookings
 * TEMPORARILY DISABLED: Firestore database not configured
 */
/*
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
*/

/**
 * Cloud Function to cleanup old pending reviews
 * Runs daily and removes unapproved reviews older than 30 days
 * TEMPORARILY DISABLED: Firestore database not configured
 */
/*
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
*/

/**
 * Cloud Function to handle AI Assistant chat messages
 * Securely proxies requests to Anthropic API (API key never exposed to client)
 * 
 * Request body:
 * {
 *   messages: Array<{role: 'user'|'assistant', content: string}>
 * }
 */
exports.aiChatMessage = functions.https.onCall(async (data, context) => {
  console.log('aiChatMessage function called');
  console.log('Data received:', { messagesCount: data?.messages?.length || 0 });
  
  try {
    const { messages } = data;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid messages array');
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing or invalid messages array'
      );
    }

    console.log('Validated messages, count:', messages.length);

    // Get API key at invocation time (not module load time)
    let apiKey;
    try {
      const cfg = functions.config();
      apiKey = cfg?.anthropic?.api_key || process.env.ANTHROPIC_API_KEY;
      console.log('Config accessed, API key:', apiKey ? 'FOUND' : 'NOT FOUND');
    } catch (e) {
      console.error('Error accessing config:', e.message);
      apiKey = process.env.ANTHROPIC_API_KEY;
      console.log('Fallback to env var, API key:', apiKey ? 'FOUND' : 'NOT FOUND');
    }

    // Check if API key is configured
    if (!apiKey) {
      console.error('Anthropic API key not configured');
      throw new functions.https.HttpsError(
        'unavailable',
        'AI service not configured'
      );
    }

    const systemPrompt = `You are the official AI assistant for Hands Detail Shop, a premium mobile auto detailing business based in Arnold, Pennsylvania, serving Pittsburgh and a 2-hour radius including PA, OH, WV, and MD. You've been in business for 16 years with over 5,000 vehicles detailed. You are family owned, licensed, insured, and Air Force trained.

Your job is to help customers with:
1. Pricing & Packages
2. Booking appointments
3. Service descriptions
4. Service area
5. FAQs & policies

## PACKAGES & PRICING

**Personal Vehicle Packages:**
- Essential: $65–$85 — Full exterior hand wash, interior vacuum & wipe-down, window cleaning inside & out, tire shine & dressing, air freshener
- Executive: $145–$185 — Everything in Essential + deep interior cleaning, leather conditioning, clay bar treatment, hand wax & polish, engine bay wipe-down
- Signature: $285–$365 — Everything in Executive + single-stage paint correction, sealant application, trim & chrome restoration, headlight restoration, 30-day follow-up
- Presidential: $585–$785 — Premium full-detail package (multi-stage paint correction, ceramic coating prep)
- Ultimate Armor: $1,285–$1,685 — Top-tier protection package with ceramic coating

**Motorcycle Packages:**
- Road Ready: $85–$105
- Chrome & Shine: $145–$185
- Show Bike: $245–$295
- Seasonal Prep: $125–$155

**Monthly Membership / Residential Plans:**
- Single Car Monthly: $75/mo
- Two Car Monthly: $130/mo
- Three+ Cars Monthly: $180/mo

**Fleet & Commercial:** Custom pricing — contact for quote
**Yacht / Marine / RV:** Custom pricing — contact for quote
**Aircraft Detailing:** Available — contact for quote

**Mechanical Services (NEW):**
- Basic Diagnostic: $50
- Advanced Diagnostic: $100
- Labor Rate: $75/hr
- Services: brakes, engine, transmission, electrical, and more
- No work starts without customer approval

**Current Promotion:** 15% OFF for first-time customers. FREE tire shine with any package.

## BOOKING
- $30 deposit secures the appointment
- Book online at handsdetailshop.com/booking.html
- Call or text: (412) 752-8684
- Hours: Monday–Saturday 8AM–6PM, Sunday by appointment
- Free estimates available

## SERVICE AREA
Mobile service — we come to you. 2-hour radius from Pittsburgh:
- Pennsylvania: Pittsburgh, Arnold, Fox Chapel, Sewickley Heights, Upper St. Clair, Penn Hills, Mt. Lebanon
- Ohio: Youngstown area
- West Virginia: Wheeling area
- Maryland: Hagerstown area

## TONE & STYLE
- Warm, confident, professional
- Speak like a trusted local expert, not a corporate chatbot
- Keep responses concise but complete
- Always offer to help them book or get a quote
- If you don't know something specific, direct them to call/text (412) 752-8684
- **IMPORTANT: When directing users to pages, use markdown links like [Visit Our Reviews](https://hands-detail.web.app/reviews.html) or [Book an Appointment](https://hands-detail.web.app/ai-scheduler.html)**

## KEY LINKS TO USE
- Booking AI Scheduler: https://hands-detail.web.app/ai-scheduler.html
- Reviews Page: https://hands-detail.web.app/reviews.html
- Services: https://hands-detail.web.app/services.html
- Membership: https://hands-detail.web.app/membership.html
- Contact: https://hands-detail.web.app/contact.html
- Quote Request: https://hands-detail.web.app/quote.html
- Our Story: https://hands-detail.web.app/our-story.html

Never make up pricing or services not listed above. If asked something you're not sure about, say "That's a great question — give us a call or text at (412) 752-8684 and we'll get you sorted out."`;

    console.log('Calling Anthropic API with', messages.length, 'messages');
    
    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages,
      }),
    });

    console.log('Anthropic response status:', response.status);
    const result = await response.json();
    console.log('Response parsed, has content:', !!result.content);

    if (!response.ok) {
      console.error('Anthropic API error status:', response.status);
      console.error('Anthropic API error body:', JSON.stringify(result).substring(0, 500));
      throw new functions.https.HttpsError(
        'internal',
        `Failed to process message: ${result.error?.message || 'Unknown error'}`
      );
    }

    const reply = result.content?.[0]?.text || null;
    console.log('Reply extracted, length:', reply?.length || 0);

    if (!reply) {
      throw new functions.https.HttpsError(
        'internal',
        'No response from AI service'
      );
    }

    console.log('aiChatMessage successful, returning reply');
    return {
      success: true,
      reply: reply,
    };
  } catch (error) {
    console.error('Error in aiChatMessage:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      `Failed to process message: ${error.message}`
    );
  }
});

/**
 * Cloud Function for AI-powered appointment scheduling
 * Helps customers book appointments using Claude AI
 * Sends confirmation via email and SMS
 */
exports.aiScheduleAppointment = functions.https.onCall(async (data, context) => {
  console.log('aiScheduleAppointment function called');
  
  try {
    const { customerInfo, conversationHistory, requestType } = data;

    if (!customerInfo || !conversationHistory) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required scheduling data'
      );
    }

    // Get API key at invocation time
    let apiKey;
    try {
      const cfg = functions.config();
      apiKey = cfg?.anthropic?.api_key || process.env.ANTHROPIC_API_KEY;
    } catch (e) {
      console.error('Error accessing config:', e.message);
      apiKey = process.env.ANTHROPIC_API_KEY;
    }

    if (!apiKey) {
      throw new functions.https.HttpsError(
        'internal',
        'API configuration missing'
      );
    }

    // System prompt for the scheduler
    const systemPrompt = `You are an intelligent appointment scheduler for Hands Detail Shop, a premium auto detailing service in Pittsburgh.

BUSINESS HOURS: Monday-Saturday, 8AM-6PM (closed Sunday)
SERVICE PACKAGES:
- Essential ($65-$95): Basic exterior wash & detail
- Executive ($145-$195): Full exterior & interior detail
- Premium Plus ($215-$285): Superior detailing with advanced treatments
- Signature ($285-$365): Premium restoration with 6-month protection
- Presidential ($650-$850): Elite concours-level detail
- Ultimate Armor ($1,400-$1,850): Maximum protection with 9H ceramic & PPF
- Interior Express ($85-$125): Interior cleaning for busy schedules
- Interior Deep Clean ($185-$265): Comprehensive interior restoration
- Interior Premium ($365-$485): Complete interior transformation
- Interior Ceramic Protection ($585-$785): Ultimate interior protection

SERVICE DURATION: 2-4 hours depending on package and vehicle size

YOUR RESPONSIBILITIES:
1. Understand customer needs (vehicle type, preferred time, service preference)
2. Ask clarifying questions if needed (vehicle size affects duration)
3. Suggest 3-4 available time slots that fit their needs
4. When customer confirms a time, provide appointment confirmation details
5. Be friendly, professional, and helpful

SUGGESTED TIME SLOTS based on customer preferences:
- Morning slots (8AM-11AM): Good for pickup services
- Midday slots (12PM-3PM): Standard appointments
- Afternoon slots (3PM-6PM): Popular for after-work pickups

When a customer agrees to book, you can confirm the appointment. Always be encouraging and highlight service benefits.`;

    // Prepare messages for Claude
    const messages = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add context about customer
    if (requestType === 'initial' && conversationHistory.length === 1) {
      messages[0].content = `Customer Details:
- Name: ${customerInfo.customerName}
- Phone: ${customerInfo.customerPhone}
- Email: ${customerInfo.customerEmail}
- Vehicle: ${customerInfo.vehicleInfo}
- Service Interest: ${customerInfo.serviceType}

${conversationHistory[0].content}`;
    }

    console.log('Calling Claude API with', messages.length, 'messages');

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Anthropic API error:', response.status, errorData);
      throw new functions.https.HttpsError(
        'internal',
        `Scheduling service error: ${response.status}`
      );
    }

    const result = await response.json();
    const aiResponse = result.content?.[0]?.text || null;

    if (!aiResponse) {
      throw new functions.https.HttpsError(
        'internal',
        'No response from scheduling AI'
      );
    }

    console.log('AI scheduler response generated');

    // Generate suggested times if this is initial request
    const suggestedTimes = requestType === 'initial' ? generateTimeSlots() : null;

    // Check if appointment is being confirmed
    const appointmentConfirmed = aiResponse.toLowerCase().includes('confirm') || 
                                 aiResponse.toLowerCase().includes('booked') ||
                                 aiResponse.toLowerCase().includes('scheduled');

    let appointmentDetails = null;
    if (appointmentConfirmed) {
      appointmentDetails = {
        date: extractDate(conversationHistory),
        time: extractTime(conversationHistory),
        service: customerInfo.serviceType,
        customerName: customerInfo.customerName,
        customerPhone: customerInfo.customerPhone,
        customerEmail: customerInfo.customerEmail,
        vehicle: customerInfo.vehicleInfo
      };

      // Send confirmation email
      if (customerInfo.customerEmail) {
        await sendSchedulingConfirmationEmail(customerInfo, appointmentDetails);
      }

      // Send confirmation SMS
      if (customerInfo.customerPhone) {
        await sendSchedulingConfirmationSMS(customerInfo, appointmentDetails);
      }

      // Store appointment in Firestore
      await storeScheduledAppointment(appointmentDetails);
    }

    return {
      success: true,
      message: aiResponse,
      suggestedTimes: suggestedTimes,
      appointmentConfirmed: appointmentConfirmed,
      appointmentDetails: appointmentDetails,
    };

  } catch (error) {
    console.error('Error in aiScheduleAppointment:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      `Scheduling failed: ${error.message}`
    );
  }
});

/**
 * Helper: Generate suggested appointment time slots
 */
function generateTimeSlots() {
  const slots = [];
  const times = ['8:00 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
  
  // Get next 3 business days
  const today = new Date();
  for (let d = 1; d <= 3; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const dayStr = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    
    times.forEach(time => {
      slots.push(`${dayStr} at ${time}`);
    });
  }
  
  return slots.slice(0, 4);
}

/**
 * Helper: Extract date from conversation
 */
function extractDate(conversationHistory) {
  const lastMessage = conversationHistory[conversationHistory.length - 1]?.content || '';
  const dateRegex = /(\w+day|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i;
  const match = lastMessage.match(dateRegex);
  return match ? match[0] : new Date().toLocaleDateString();
}

/**
 * Helper: Extract time from conversation
 */
function extractTime(conversationHistory) {
  const lastMessage = conversationHistory[conversationHistory.length - 1]?.content || '';
  const timeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/;
  const match = lastMessage.match(timeRegex);
  return match ? match[0] : '2:00 PM';
}

/**
 * Helper: Send scheduling confirmation email
 */
async function sendSchedulingConfirmationEmail(customerInfo, appointmentDetails) {
  try {
    const emailContent = `
<h2>Your Appointment is Confirmed! ✅</h2>
<p>Hi ${customerInfo.customerName},</p>
<p>Your detailing appointment has been scheduled:</p>
<ul>
  <li><strong>Date & Time:</strong> ${appointmentDetails.date} at ${appointmentDetails.time}</li>
  <li><strong>Service:</strong> ${appointmentDetails.service.replace(/-/g, ' ')}</li>
  <li><strong>Vehicle:</strong> ${appointmentDetails.vehicle}</li>
  <li><strong>Location:</strong> We'll come to you in the greater Pittsburgh area</li>
</ul>
<p><strong>What to expect:</strong></p>
<ul>
  <li>Service duration: 2-4 hours depending on your selected package</li>
  <li>We provide professional mobile detailing at your location</li>
  <li>Payment can be made via card, check, or cash</li>
</ul>
<p>If you need to reschedule, just give us a call at <strong>(412) 752-8684</strong>.</p>
<p>Looking forward to making your vehicle shine!</p>
<p>Thanks,<br>Hands Detail Shop Team</p>
    `;

    await transporter.sendMail({
      from: gmailEmail,
      to: customerInfo.customerEmail,
      subject: `Appointment Confirmed - ${appointmentDetails.date} at ${appointmentDetails.time}`,
      html: emailContent,
    });

    console.log('Scheduling confirmation email sent to', customerInfo.customerEmail);
  } catch (error) {
    console.error('Error sending scheduling email:', error);
    // Don't throw - scheduling is still valid even if email fails
  }
}

/**
 * Helper: Send scheduling confirmation SMS
 */
async function sendSchedulingConfirmationSMS(customerInfo, appointmentDetails) {
  try {
    // Note: This is a placeholder. You would integrate with Twilio or similar service
    // For now, we'll just log it
    console.log(`SMS would be sent to ${customerInfo.customerPhone}: Your Hands Detail appointment is confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}. Call (412) 752-8684 to reschedule.`);
    
    // TODO: Integrate with Twilio API
    // const accountSid = config?.twilio?.account_sid;
    // const authToken = config?.twilio?.auth_token;
    // const client = require('twilio')(accountSid, authToken);
    // await client.messages.create({
    //   body: `Your Hands Detail appointment is confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}. Call (412) 752-8684 to reschedule.`,
    //   from: '+1...',
    //   to: customerInfo.customerPhone
    // });
  } catch (error) {
    console.error('Error with SMS notification:', error);
  }
}

/**
 * Helper: Store appointment in Firestore
 */
async function storeScheduledAppointment(appointmentDetails) {
  try {
    const db = admin.firestore();
    await db.collection('appointments').add({
      ...appointmentDetails,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'confirmed',
      reminderSent: false
    });
    console.log('Appointment stored in Firestore');
  } catch (error) {
    console.error('Error storing appointment:', error);
    // Don't throw - email confirmation is enough
  }
}

/**
 * Cloud Function to process appointment booking with Square payment
 * Takes $30 deposit via Square and creates appointment
 */
exports.bookAppointmentWithSquare = functions.https.onCall(async (data, context) => {
  console.log('bookAppointmentWithSquare function called');
  
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      vehicleInfo,
      serviceType,
      appointmentDate,
      appointmentTime,
      squareSourceId // Token from Square Web Payments SDK
    } = data;

    // Validate input
    if (!customerName || !customerEmail || !customerPhone || !appointmentDate || !appointmentTime || !squareSourceId) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required appointment information'
      );
    }

    // Get Square credentials from config
    let squareAccessToken, squareLocationId;
    try {
      const cfg = functions.config();
      squareAccessToken = cfg?.square?.access_token || process.env.SQUARE_ACCESS_TOKEN;
      squareLocationId = cfg?.square?.location_id || process.env.SQUARE_LOCATION_ID;
    } catch (e) {
      console.error('Error accessing Square config:', e.message);
    }

    if (!squareAccessToken || !squareLocationId) {
      throw new functions.https.HttpsError(
        'unavailable',
        'Square payment processing not configured'
      );
    }

    // Create payment via Square
    const squarePaymentUrl = 'https://connect.squareup.com/v2/payments';
    const paymentPayload = {
      source_id: squareSourceId,
      amount_money: {
        amount: 3000, // $30.00 in cents
        currency: 'USD'
      },
      idempotency_key: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      statement_descriptor_suffix: 'HANDS DETAIL APPOINTMENT',
      receipt_email: customerEmail,
      customer_id: customerEmail, // Use email as customer ID
      metadata: {
        appointmentDate,
        appointmentTime,
        serviceType,
        vehicleInfo
      }
    };

    console.log('Processing Square payment for', customerEmail);

    const paymentResponse = await fetch(squarePaymentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Square-Version': '2024-03-20',
        'Authorization': `Bearer ${squareAccessToken}`
      },
      body: JSON.stringify(paymentPayload)
    });

    const paymentResult = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error('Square payment error:', paymentResult);
      throw new functions.https.HttpsError(
        'internal',
        `Payment processing failed: ${paymentResult.errors?.[0]?.detail || 'Unknown error'}`
      );
    }

    console.log('Square payment successful:', paymentResult.payment?.id);

    // Store appointment in Firestore with payment info
    const db = admin.firestore();
    const appointmentData = {
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      vehicleInfo: vehicleInfo || '',
      serviceType,
      appointmentDate,
      appointmentTime,
      status: 'confirmed',
      paid: true,
      depositAmount: 30.00,
      squarePaymentId: paymentResult.payment?.id,
      squareReceiptUrl: paymentResult.payment?.receipt_url,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      reminderSent: false
    };

    const docRef = await db.collection('appointments').add(appointmentData);
    console.log('Appointment created:', docRef.id);

    // Send confirmation email with receipt
    const emailContent = `
<h2>✅ Appointment Confirmed & Payment Received!</h2>
<p>Hi ${customerName},</p>
<p>Thank you! Your appointment is confirmed and your $30 deposit has been processed.</p>

<h3>Appointment Details:</h3>
<ul>
  <li><strong>Date & Time:</strong> ${appointmentDate} at ${appointmentTime}</li>
  <li><strong>Service:</strong> ${serviceType.replace(/-/g, ' ')}</li>
  <li><strong>Vehicle:</strong> ${vehicleInfo || 'Not specified'}</li>
  <li><strong>Location:</strong> We'll come to you in the greater Pittsburgh area</li>
</ul>

<h3>Payment Confirmation:</h3>
<ul>
  <li><strong>Deposit Paid:</strong> $30.00</li>
  <li><strong>Remaining Balance:</strong> Due on service day</li>
  <li><strong>Receipt:</strong> <a href="${paymentResult.payment?.receipt_url}">View your receipt</a></li>
</ul>

<h3>What's Next?</h3>
<p>We'll contact you 24 hours before your appointment to confirm the time and location. 
If you need to reschedule or cancel, please call us at <strong>(412) 752-8684</strong> at least 24 hours in advance.</p>

<p><strong>Service Duration:</strong> 2-4 hours depending on your selected package</p>
<p><strong>Payment Methods:</strong> We accept card, check, or cash for the remaining balance</p>

<p>Thanks for choosing Hands Detail Shop!<br>
<strong>Team Hands Detail</strong><br>
📞 (412) 752-8684<br>
🌐 https://hands-detail.web.app</p>
    `.trim();

    await transporter.sendMail({
      from: gmailEmail,
      to: customerEmail,
      subject: `Appointment Confirmed - ${appointmentDate} at ${appointmentTime}`,
      html: emailContent,
    });

    console.log('Confirmation email sent to', customerEmail);

    return {
      success: true,
      message: 'Appointment booked successfully!',
      appointmentId: docRef.id,
      paymentId: paymentResult.payment?.id,
      receiptUrl: paymentResult.payment?.receipt_url
    };

  } catch (error) {
    console.error('Error in bookAppointmentWithSquare:', error);

    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    throw new functions.https.HttpsError(
      'internal',
      `Booking failed: ${error.message}`
    );
  }
});

