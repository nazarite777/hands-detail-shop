const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Firebase Admin
admin.initializeApp();

// Enable CORS
const corsHandler = cors({ origin: true });



// System prompt for Claude
const SYSTEM_PROMPT = `You are Claude, a helpful AI assistant for Hands Detail Shop, a premium mobile auto detailing service in the Pittsburgh area. You represent Nazir El's 16 years of Air Force-trained excellence in precision detailing.

BUSINESS CONTEXT:
- Owner: Nazir El (Air Force Veteran, 16 years professional experience, 5,000+ vehicles detailed)
- Service: Mobile auto detailing - we come to your location!
- Service Area: Pittsburgh PA and 2-hour radius (covers PA, OH, WV, MD)
- Hours: Monday-Saturday 8AM-6PM, Sunday by appointment
- Phone: (412) 752-8684 | Text: (412) 752-8684
- Email: handsdetailshop@gmail.com
- Website: handsdetailshop.com
- Booking: handsdetailshop.com/quote or handsdetailshop.com/booking

=== PERSONAL VEHICLES - CORE PACKAGES ===

1. ESSENTIAL DETAIL - $65-$85
   ✓ Full exterior wash with foam cannon
   ✓ Interior vacuum (carpets, seats, trunk)
   ✓ All window cleaning (interior & exterior)
   ✓ Tire shine application
   ✓ Air freshener
   ✓ Basic interior wipe-down
   Perfect for: Daily drivers, regular maintenance, budget-conscious customers
   Time: 2-3 hours | Best for: Sedans, small SUVs

2. EXECUTIVE DETAIL - $145-$185 (MOST POPULAR)
   ✓ Everything in Essential PLUS:
   ✓ Deep interior detailing (all crevices, vents)
   ✓ Leather conditioning & protection
   ✓ Clay bar treatment
   ✓ Hand wax application
   ✓ Engine bay wipe-down & shine
   ✓ Door jamb cleaning
   ✓ Undercarriage spray
   Perfect for: Owners who want comprehensive care
   Time: 4-5 hours | Best for: Most vehicles
   Expected Results: Showroom-quality finish, 1-2 month shine retention

3. SIGNATURE PRESTIGE - $285-$365
   ✓ Everything in Executive PLUS:
   ✓ Paint correction (light swirl removal)
   ✓ Paint sealant application (6-month protection)
   ✓ Trim restoration & protection
   ✓ Headlight restoration & sealant
   ✓ Carpet shampooing
   ✓ Premium air freshener
   ✓ Leather seat deep conditioning
   ✓ Dashboard treatment
   Perfect for: Vehicles needing restoration
   Time: 6-7 hours | Expected Results: Professional show-quality finish, better paint protection
   Warranty: 6-month paint protection guarantee

4. PRESIDENTIAL ELITE - $585-$785
   ✓ Everything in Signature PLUS:
   ✓ Advanced paint correction (multi-stage polishing)
   ✓ Multiple protective coatings
   ✓ Extended warranty (12 months)
   ✓ Nano-infused sealant
   ✓ Premium leather treatment
   ✓ Full ceramic prep
   ✓ Interior fabric protection
   ✓ Undercarriage ceramic treatment
   Perfect for: Premium/luxury vehicles, long-term protection seekers
   Time: 8-10 hours | Expected Results: Dealership-quality restoration, year-long durability
   Warranty: 12-month protection guarantee

5. ULTIMATE ARMOR - $1,285-$1,685
   ✓ Everything in Presidential PLUS:
   ✓ Full ceramic coating (9H hardness) - professional grade
   ✓ Advanced multi-stage correction
   ✓ Lifetime ceramic warranty
   ✓ Paint protection film preparation
   ✓ Executive interior protection
   ✓ Ceramic coated windows & trim
   ✓ Mechanical inspection included
   ✓ Annual maintenance plan included (1 year)
   Perfect for: New vehicles, daily drivers wanting ultimate protection
   Time: 12-14 hours (may span 1-2 days) | Expected Results: Ultimate protection, hydrophobic surfaces, long-term durability
   Warranty: Lifetime ceramic coating coverage

=== SPECIALTY SERVICES ===

MARINE & YACHT DETAILING:
- Professional boat exterior cleaning & wax: $400-$800 (boat size dependent)
- Interior cabin detailing: $300-$500
- Fiberglass restoration: $350+
- Includes: Salt spray removal, UV protection, marine-grade sealant

RV & MOTORHOME DETAILING:
- Exterior full detail: $500-$1,200 (based on size)
- Interior deep clean: $300-$600
- Roof treatment: $150-$250
- Special care for rubber seals & slide-outs

MOTORCYCLE DETAILING:
- Road Ready Package: $85-$105 (wash, wax, tire shine)
- Chrome & Shine Package: $145-$185 (road ready + chrome polish, chain service)
- Show Bike Package: $245-$295 (full correction, ceramic coating, show-ready)

AIRCRAFT DETAILING:
- Professional aircraft exterior: $800-$2,000 (based on aircraft size/condition)
- Interior cabin detailing: $300-$600
- Includes: Oxidation removal, high-altitude protection, specialized sealants

VEHICLE-SPECIFIC SERVICES:
- Ceramic Coating Only: $400-$600 (professional 9H application)
- Paint Correction Only: $350-$500 (single stage correction)
- Leather Restoration: $150-$300
- Interior Shampooing: $150-$250
- Engine Bay Detail: $75-$150
- Headlight Restoration: $75-$150
- Carpet Cleaning: $100-$200
- Odor Elimination: $150-$250
- Interior Protection Coating: $100-$200

MECHANICAL SERVICES:
✓ Diagnostics Available:
  - Basic Vehicle Inspection: $50
  - Advanced Computer Diagnostics: $100
  - Full System Analysis: $150
✓ Common Mechanical Work:
  - Oil Change Service: $40-$75
  - Filter Replacement: $25-$60
  - Fluid Top-offs: $20-$50
  - Battery Service/Replacement: $75-$200
  - Starter/Alternator Service: $150-$300
  - Transmission Fluid Service: $100-$200
  - Coolant Flush: $75-$150
  - Brake Service: $150-$400
  - Tire Rotation & Balance: $50-$100
✓ Important: All mechanical work requires customer approval before proceeding
✓ Labor Rate: $75/hour (for jobs exceeding service packages)
✓ Mobile Service: Available on-site at customer location

=== MEMBERSHIP PLANS - VIP BENEFITS ===

ESSENTIAL MAINTAIN - $75/month
✓ Biweekly exterior hand wash
✓ Interior vacuum & wipe down
✓ Window cleaning (inside/out)
✓ Tire dressing
✓ Assigned service day (Mon-Thu)
✓ Priority scheduling
✓ 10% discount on add-on services
Perfect for: Budget-conscious owners wanting regular maintenance

PREMIUM MAINTAIN - $110/month (MOST POPULAR)
✓ Everything in Essential MAINTAIN, PLUS:
✓ Premium carnauba wax application
✓ Dashboard & console conditioning
✓ Door jamb deep cleaning
✓ Priority scheduling guarantee
✓ 15% discount on major services
✓ Free air freshener each visit
Perfect for: Owners wanting comprehensive maintenance

ULTIMATE MAINTAIN - $145/month (ELITE)
✓ Everything in Premium MAINTAIN, PLUS:
✓ Paint sealant application (every 3 months)
✓ Leather conditioning (if applicable)
✓ Spot stain removal service
✓ Engine bay wipe down
✓ Annual ceramic prep inspection
✓ 20% discount on major services
✓ Membership coverage for 2 vehicles (choose 2)
Perfect for: Premium vehicle owners wanting elite service

MULTI-CAR HOUSEHOLD PLANS (Save 20-30%):
✓ Two-Car Essential: $130/month ($65/vehicle)
✓ Two-Car Premium: $190/month ($95/vehicle)
✓ Three-Car Essential: $180/month ($60/vehicle)
✓ Three-Car Premium: $270/month ($90/vehicle)
✓ Family Fleet Plan: Contact for quote (4+ vehicles)
All include: Same day service for all vehicles, dedicated service day

MEMBERSHIP BENEFITS INCLUDE:
→ Biweekly professional maintenance
→ Priority booking guarantee
→ Free estimates on upgrade services
→ Discounted major detailing packages
→ Annual vehicle health inspection
→ No long-term contracts (cancel anytime)
→ 30-day satisfaction guarantee

=== GIFT CERTIFICATES ===
Perfect for: Birthdays, holidays, corporate gifts, car enthusiasts
Options:
- $50 Gift Certificate: Starter detail or add-on services
- $100 Gift Certificate: Essential or Executive package
- $150 Gift Certificate: Executive or partial Signature
- $250 Gift Certificate: Full Signature package
- $500+ Gift Certificate: Presidential or Ultimate Armor
- Custom Amounts: Any amount customer chooses
✓ Digital delivery (instant email) or Physical card (3-5 days)
✓ Never expires
✓ Transferable
✓ Can be combined with other offers

=== PRICING & PAYMENT GUIDELINES ===
✓ All prices include mobile service (we come to you!)
✓ $30 deposit secures appointment (applied to final invoice)
✓ Payment methods: Cash, Venmo, PayPal, Square, Apple Pay
✓ Free estimates provided (no obligation, phone or email)
✓ Flexible scheduling: Same-day available in some cases
✓ Weather-dependent: Rain reduces effectiveness of exterior work
✓ Vehicle size may affect pricing within listed ranges
✓ First-time customers: 15% discount on packages over $150
✓ NET 30 payment terms available for fleet/commercial customers
✓ All work guaranteed to customer satisfaction

=== UPSELLING STRATEGY (NATURAL & HONEST) ===
When customer asks about basic service:
→ Recommend next tier with benefits: "Most customers love the Executive - adds leather conditioning and paint protection for just $70 more"

When customer books premium package:
→ Suggest membership: "With your Presidential package, memberships save you 20% on maintenance. That's about $30/month for biweekly care"

When customer has luxury/new vehicle:
→ Recommend Ultimate Armor: "For vehicles worth this much, ceramic coating is like insurance. Protects paint for years and actually saves money long-term"

When customer mentions regular details needed:
→ Lead with membership: "Save 30% with our membership! Same professional detail every 2 weeks, guaranteed"

=== COMMUNICATION STYLE ===
✓ Professional yet personable - represent Nazir's expertise confidently
✓ Air Force precision - mention military training as credibility
✓ Consultative - ask about vehicle needs before recommending
✓ Honest about additions - only upsell when genuinely beneficial
✓ Transparent pricing - no hidden fees, explain value clearly
✓ Problem-solving - help customers find right package for situation
✓ Relationship-focused - build trust for long-term business

=== DEPOSIT & SCHEDULING FLOW ===
When customer decides to book:
1. Confirm vehicle type & preferred package
2. Collect: Name, phone, email, address, vehicle info
3. Ask: "Preferred date/time?" and provide availability
4. Inform: "$30 deposit secures your appointment (applied to final invoice)"
5. Payment options: "We take Venmo, PayPal, Square, or cash at service"
6. Confirmation: Send summary with date/time/address/amount

=== CUSTOMER VALUE PROPOSITIONS ===
✓ Air Force trained precision - military-grade attention to detail
✓ 16 years of professional experience - 5,000+ vehicles detailed
✓ Mobile service convenience - we come to your location
✓ Comprehensive packages for every budget
✓ Specialized services: marine, aircraft, mechanical, motorcycle
✓ Licensed & insured - professional credibility
✓ Fast service - often same-day available
✓ Satisfaction guaranteed - or we make it right
✓ Competitive pricing with transparent quotes
✓ Family-owned business with community focus
✓ Transparent pricing - no hidden fees or surprise charges
✓ Mobile service - we come to your home, office, or preferred location
✓ Free estimates - zero pressure, no obligation
✓ Satisfaction guaranteed - we stand behind our work
✓ Flexible scheduling - we work with your schedule
✓ Quality products - professional-grade chemicals & equipment

=== COMMUNICATION GUIDELINES ===
1. ABOUT SERVICES: Provide detailed descriptions of what's included, expected results, and time required
2. ABOUT PRICING: Quote ranges based on vehicle type, explain what factors affect pricing
3. ABOUT BOOKING: Direct customers to handsdetailshop.com/quote, call (412) 752-8684, or text
4. ABOUT SERVICE AREA: Confirm if location is within 2-hour Pittsburgh radius; offer distance quote
5. ABOUT SPECIALTY SERVICES: Explain we can adapt any service for specific vehicle types
6. ABOUT MECHANICAL WORK: State diagnostics rates, labor rates, and emphasis on customer approval
7. ABOUT GUARANTEES: Mention warranties associated with packages selected

TONE: Friendly, professional, knowledgeable, confident. Show genuine care about the customer's vehicle. Always encourage booking or direct contact for detailed quotes. Be conversational and helpful - this is Nazir's 16 years of excellence speaking through you.`;

/**
 * Claude AI REST API - Cloud Function
 * Handles AI requests from the frontend without exposing the API key
 */
exports.claudeAI = functions.runWith({ secrets: ['ANTHROPIC_API_KEY'] }).https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      // Only allow POST requests
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const { message } = request.body;

      if (!message || typeof message !== 'string') {
        return response.status(400).json({ error: 'Message is required' });
      }

      // Input length validation to prevent abuse
      if (message.length > 2000) {
        return response.status(400).json({ error: 'Message too long (max 2000 characters)' });
      }

      console.log('🤖 Claude request received:', message.substring(0, 50) + '...');

      const apiKey = process.env.ANTHROPIC_API_KEY;
      
      if (!apiKey) {
        console.error('❌ API key not configured');
        return response.status(500).json({ error: 'API key not configured' });
      }

      console.log('🔑 Using API key starting with:', apiKey.substring(0, 20) + '...');

      // Call Anthropic API
      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-opus-4-1',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [{
            role: 'user',
            content: message
          }]
        })
      });

      if (!anthropicResponse.ok) {
        const errorData = await anthropicResponse.json();
        console.error('❌ Anthropic API error:', anthropicResponse.status, errorData);
        return response.status(anthropicResponse.status).json({
          error: 'API Error',
          details: errorData.error?.message || 'Unknown error'
        });
      }

      const data = await anthropicResponse.json();
      const assistantMessage = data.content[0].text;

      console.log('✅ Claude response sent');
      return response.status(200).json({
        reply: assistantMessage
      });

    } catch (error) {
      console.error('❌ Cloud Function error:', error);
      return response.status(500).json({
        error: 'Internal server error',
        details: error.message
      });
    }
  });
});

console.log('🚀 Claude AI Cloud Function loaded');

/**
 * Claude Chat - Chat endpoint for booking interface
 */
exports.claudeChat = functions.runWith({ secrets: ['ANTHROPIC_API_KEY'] }).https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      // Support both old format (message, history) and new format (model, messages, system, max_tokens)
      let messages = request.body.messages;
      let model = request.body.model || 'claude-opus-4-1';
      let maxTokens = Math.min(request.body.max_tokens || 400, 1500);
      let system = request.body.system || SYSTEM_PROMPT;

      // Fallback to old format if new format not provided
      if (!messages && request.body.message) {
        const history = request.body.history && Array.isArray(request.body.history) ? request.body.history : [];
        messages = [...history, { role: 'user', content: request.body.message }];
      }

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return response.status(400).json({ error: 'Messages required' });
      }

      // Limit conversation history to prevent abuse (keep last 20 messages)
      if (messages.length > 20) {
        messages = messages.slice(-20);
      }

      // Validate individual messages
      for (const msg of messages) {
        if (!msg.role || !msg.content || typeof msg.content !== 'string') {
          return response.status(400).json({ error: 'Invalid message format' });
        }
        if (msg.content.length > 2000) {
          return response.status(400).json({ error: 'Individual message too long (max 2000 characters)' });
        }
      }

      const apiKey = process.env.ANTHROPIC_API_KEY;
      
      if (!apiKey) {
        console.error('❌ API key not configured');
        return response.status(500).json({ error: 'API key not configured' });
      }

      console.log('🔑 Using API key starting with:', apiKey.substring(0, 20) + '...');

      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          max_tokens: maxTokens,
          system: system,
          messages: messages
        })
      });

      if (!anthropicResponse.ok) {
        const errorData = await anthropicResponse.json();
        return response.status(anthropicResponse.status).json({
          error: 'API Error',
          details: errorData.error?.message || 'Unknown error'
        });
      }

      const data = await anthropicResponse.json();
      const assistantMessage = data.content[0].text;

      return response.status(200).json({
        content: [{ text: assistantMessage }],
        reply: assistantMessage,
        message: assistantMessage
      });

    } catch (error) {
      console.error('❌ Claude Chat error:', error);
      return response.status(500).json({
        error: 'Internal server error',
        details: error.message
      });
    }
  });
});

/**
 * Process Booking - Handle Square payments and create bookings
 */
exports.processBooking = functions.runWith({ secrets: ['SQUARE_ACCESS_TOKEN', 'GMAIL_PASSWORD', 'GOOGLE_API_KEY'] }).https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      // Support both flat and nested payload formats from the frontend
      const body = request.body;
      const sourceId = body.sourceId;
      const amountCents = body.amountCents || (body.amount ? Math.round(body.amount * 100) : 3000);
      const customerName = (body.customer && body.customer.name) || body.customerName || '';
      const customerEmail = (body.customer && body.customer.email) || body.customerEmail || '';
      const customerPhone = (body.customer && body.customer.phone) || body.customerPhone || '';
      const customerVehicle = (body.customer && body.customer.vehicle) || body.customerVehicle || '';
      const customerAddress = (body.customer && body.customer.address) || body.customerAddress || '';
      const customerNotes = (body.customer && body.customer.notes) || body.customerNotes || '';
      const serviceType = (body.booking && body.booking.service) || body.serviceType || '';
      const servicePrice = (body.booking && body.booking.price) || body.servicePrice || '';
      const appointmentDate = (body.booking && body.booking.date) || body.appointmentDate || '';
      const appointmentTime = (body.booking && body.booking.time) || body.appointmentTime || '';

      if (!sourceId) {
        return response.status(400).json({ error: 'Payment source ID is required' });
      }
      if (!customerName || !customerPhone) {
        return response.status(400).json({ error: 'Customer name and phone are required' });
      }
      if (!serviceType || !appointmentDate || !appointmentTime) {
        return response.status(400).json({ error: 'Service, date, and time are required' });
      }

      // Get Square access token
      const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
      if (!squareAccessToken) {
        return response.status(500).json({ error: 'Square not configured' });
      }

      // Process payment with Square
      const { Client, Environment } = require('square');
      const squareClient = new Client({
        accessToken: squareAccessToken,
        environment: Environment.Production,
      });

      const paymentsApi = squareClient.paymentsApi;
      const result = await paymentsApi.createPayment({
        sourceId: sourceId,
        amountMoney: {
          amount: BigInt(amountCents),
          currency: 'USD'
        },
        idempotencyKey: require('crypto').randomUUID(),
        note: `Hands Detail - ${serviceType} on ${appointmentDate} at ${appointmentTime} for ${customerName}`,
      });

      if (!result.result.payment.id) {
        throw new Error('Payment failed');
      }

      // Save booking to Firestore
      const firestore = admin.firestore();
      const bookingRef = firestore.collection('bookings').doc();
      
      await bookingRef.set({
        id: bookingRef.id,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        customerVehicle: customerVehicle,
        customerAddress: customerAddress,
        customerNotes: customerNotes,
        serviceType: serviceType,
        servicePrice: servicePrice,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        paymentId: result.result.payment.id,
        amountCents: amountCents,
        status: 'confirmed',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Also save public version (city only, no email)
      await firestore.collection('public_schedule').add({
        service: serviceType,
        date: appointmentDate,
        status: 'booked'
      });

      // Send confirmation email (only if customer email provided and Gmail configured)
      if (customerEmail) {
        try {
          const gmailEmail = process.env.GMAIL_EMAIL || 'handsdetailshop@gmail.com';
          const gmailPassword = process.env.GMAIL_PASSWORD;

          if (gmailPassword) {
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: gmailEmail,
                pass: gmailPassword,
              }
            });

            await transporter.sendMail({
              from: gmailEmail,
              to: customerEmail,
              subject: `Booking Confirmation - ${serviceType} Service`,
              html: `
                <h2>Your Booking is Confirmed!</h2>
                <p>Hi ${customerName},</p>
                <p><strong>Service:</strong> ${serviceType} (${servicePrice})</p>
                <p><strong>Date:</strong> ${appointmentDate}</p>
                <p><strong>Time:</strong> ${appointmentTime}</p>
                <p><strong>Location:</strong> ${customerAddress}</p>
                <p><strong>Vehicle:</strong> ${customerVehicle}</p>
                <p><strong>Deposit Paid:</strong> $${(amountCents / 100).toFixed(2)}</p>
                <p>Nazir will reach out to confirm your appointment window.</p>
                <p>Questions? Call or text <strong>(412) 752-8684</strong></p>
                <p>Thank you for choosing Hands Detail Shop!</p>
              `
            });

            // Also notify the business owner
            await transporter.sendMail({
              from: gmailEmail,
              to: gmailEmail,
              subject: `New Booking: ${serviceType} - ${customerName}`,
              html: `
                <h2>New Booking Received!</h2>
                <p><strong>Customer:</strong> ${customerName}</p>
                <p><strong>Phone:</strong> ${customerPhone}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p><strong>Service:</strong> ${serviceType} (${servicePrice})</p>
                <p><strong>Date:</strong> ${appointmentDate}</p>
                <p><strong>Time:</strong> ${appointmentTime}</p>
                <p><strong>Location:</strong> ${customerAddress}</p>
                <p><strong>Vehicle:</strong> ${customerVehicle}</p>
                <p><strong>Notes:</strong> ${customerNotes || 'None'}</p>
                <p><strong>Deposit:</strong> $${(amountCents / 100).toFixed(2)}</p>
                <p><strong>Payment ID:</strong> ${result.result.payment.id}</p>
                <p><strong>Booking ID:</strong> ${bookingRef.id}</p>
              `
            });
          } else {
            console.warn('Gmail password not configured - skipping email');
          }
        } catch (emailError) {
          console.warn('Email sending failed (non-blocking):', emailError.message);
        }
      }

      // Add to Google Calendar if credentials available
      const googleCalendarId = process.env.GOOGLE_CALENDAR_ID;
      const googleApiKey = process.env.GOOGLE_API_KEY;

      if (googleCalendarId && googleApiKey) {
        try {
          const eventDate = new Date(`${appointmentDate}T${appointmentTime}:00`);
          const endTime = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

          const eventPayload = {
            summary: `${serviceType} - ${customerName}`,
            description: `Booking ID: ${bookingRef.id}\nCustomer: ${customerName}\nEmail: ${customerEmail}`,
            start: { dateTime: eventDate.toISOString() },
            end: { dateTime: endTime.toISOString() },
            reminders: {
              useDefault: true,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 60 }
              ]
            }
          };

          const calendarResponse = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(googleCalendarId)}/events?key=${googleApiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventPayload)
          });

          if (!calendarResponse.ok) {
            console.warn('Calendar sync warning:', calendarResponse.status);
          }
        } catch (calendarError) {
          console.warn('Calendar sync failed:', calendarError.message);
        }
      }

      return response.status(200).json({
        success: true,
        bookingId: bookingRef.id,
        paymentId: result.result.payment.id,
        message: 'Booking confirmed!'
      });

    } catch (error) {
      console.error('❌ Booking error:', error);
      return response.status(500).json({
        error: 'Booking failed',
        details: error.message
      });
    }
  });
});

/**
 * Submit Review - Save customer review to Firestore pending_reviews collection
 * Notifies business owner by email. Reviews require manual approval before display.
 */
exports.submitReview = functions.runWith({ secrets: ['GMAIL_PASSWORD'] }).https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const { name, rating, text, email, area } = request.body;

      // Validate required fields
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return response.status(400).json({ error: 'Valid name is required (min 2 characters)' });
      }
      if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
        return response.status(400).json({ error: 'Rating must be 1–5' });
      }
      if (!text || typeof text !== 'string' || text.trim().length < 10) {
        return response.status(400).json({ error: 'Review text must be at least 10 characters' });
      }
      // Input length guards
      if (name.trim().length > 100) return response.status(400).json({ error: 'Name too long' });
      if (text.trim().length > 2000) return response.status(400).json({ error: 'Review text too long (max 2000 chars)' });
      if (email && email.length > 200) return response.status(400).json({ error: 'Email too long' });
      if (area && area.length > 100) return response.status(400).json({ error: 'Area too long' });

      // Save to Firestore pending_reviews (requires admin approval before display)
      const firestore = admin.firestore();
      const reviewRef = firestore.collection('pending_reviews').doc();
      await reviewRef.set({
        id: reviewRef.id,
        name: name.trim(),
        rating: rating,
        text: text.trim(),
        email: (email || '').trim(),
        area: (area || '').trim(),
        approved: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log('✅ Review saved:', reviewRef.id, 'from', name.trim());

      // Notify business owner by email
      const gmailEmail = process.env.GMAIL_EMAIL || 'handsdetailshop@gmail.com';
      const gmailPassword = process.env.GMAIL_PASSWORD;
      if (gmailPassword) {
        try {
          const nodemailer = require('nodemailer');
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: gmailEmail, pass: gmailPassword },
          });
          const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
          await transporter.sendMail({
            from: gmailEmail,
            to: gmailEmail,
            subject: `New Review Submitted: ${stars} from ${name.trim()}`,
            html: `
              <h2>New Customer Review — Pending Approval</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Rating:</strong> ${stars} (${rating}/5)</p>
              <p><strong>Area:</strong> ${area || 'Not provided'}</p>
              <p><strong>Email:</strong> ${email || 'Not provided'}</p>
              <p><strong>Review:</strong></p>
              <blockquote style="border-left:4px solid #1e88e5;padding-left:12px;color:#333;">${text.trim()}</blockquote>
              <p><strong>Review ID:</strong> ${reviewRef.id}</p>
              <p style="color:#888;font-size:0.9em;">Log in to Firebase Console to approve this review for public display.</p>
            `,
          });
        } catch (emailErr) {
          console.warn('Email notification failed (non-blocking):', emailErr.message);
        }
      }

      return response.status(200).json({
        success: true,
        message: 'Review submitted successfully and is pending approval.',
      });

    } catch (error) {
      console.error('❌ submitReview error:', error);
      return response.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// submitContact — saves contact form to Firestore and emails the business
// ─────────────────────────────────────────────────────────────────────────────
exports.submitContact = functions.runWith({ secrets: ['GMAIL_PASSWORD'] }).https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const { name, email, phone, subject, message } = request.body;

      // Validate required fields
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return response.status(400).json({ error: 'Valid name is required (min 2 characters)' });
      }
      if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
        return response.status(400).json({ error: 'Valid email address is required' });
      }
      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return response.status(400).json({ error: 'Message must be at least 5 characters' });
      }
      // Input length guards
      if (name.trim().length > 100)    return response.status(400).json({ error: 'Name too long' });
      if (email.trim().length > 200)   return response.status(400).json({ error: 'Email too long' });
      if (phone && phone.length > 30)  return response.status(400).json({ error: 'Phone too long' });
      if (subject && subject.length > 200) return response.status(400).json({ error: 'Subject too long' });
      if (message.trim().length > 5000) return response.status(400).json({ error: 'Message too long (max 5000 chars)' });

      // Save to Firestore
      const firestore = admin.firestore();
      const docRef = firestore.collection('contact_submissions').doc();
      await docRef.set({
        id: docRef.id,
        name: name.trim(),
        email: email.trim(),
        phone: (phone || '').trim(),
        subject: (subject || '').trim(),
        message: message.trim(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log('✅ Contact form saved:', docRef.id, 'from', name.trim());

      // Email business owner
      const gmailEmail = process.env.GMAIL_EMAIL || 'handsdetailshop@gmail.com';
      const gmailPassword = process.env.GMAIL_PASSWORD;
      if (gmailPassword) {
        try {
          const nodemailer = require('nodemailer');
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: gmailEmail, pass: gmailPassword },
          });
          await transporter.sendMail({
            from: gmailEmail,
            to: gmailEmail,
            replyTo: email.trim(),
            subject: `New Contact Form: ${(subject || 'General Inquiry').trim()} — from ${name.trim()}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="border-left:4px solid #1e88e5;padding-left:12px;color:#333;white-space:pre-wrap;">${message.trim()}</blockquote>
              <p style="color:#888;font-size:0.9em;">Submission ID: ${docRef.id}</p>
            `,
          });
        } catch (emailErr) {
          console.warn('Email notification failed (non-blocking):', emailErr.message);
        }
      }

      return response.status(200).json({
        success: true,
        message: 'Message sent successfully! We will get back to you shortly.',
      });

    } catch (error) {
      console.error('❌ submitContact error:', error);
      return response.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
});
