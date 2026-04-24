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
- Email: NazirEl@handsdetailshop.com
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

WAX & PAINT PROTECTION TIERS (PERSONAL VEHICLES):
- Tier 1: Wash Wax (wax-infused car soap)
  Included in: all auto wash packages
  Protection length: up to 2 weeks
  Upcharge: included
- Tier 2: Butter Wax
  Included in: packages with wax coat
  Protection length: 2-3 months
  Upcharge: included
- Tier 3: JetSeal
  Included in: add-on upgrade
  Protection length: up to 12 months
  Upcharge: +$75
- Tier 4: Ceramic Coating
  Included in: separate service
  Protection length: multi-year
  Upcharge: existing ceramic pricing

If asked where customers can view this on site: personal-vehicles.html in the Add-On Services section under "Wax & Paint Protection Tiers".

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
✓ $30 deposit secures appointment for most services (applied to final invoice)
✓ $150 deposit for Showroom Floor Detail, Fleet/Commercial, and RV/Yacht/Marine (applied to final invoice)
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
4. Inform: "A deposit secures your appointment (applied to final invoice) — $30 for most services, $150 for Showroom Floor Detail, Fleet/Commercial, and RV/Yacht/Marine jobs"
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
      const normalizeAppointmentTime = (timeValue) => {
        if (!timeValue) return '';

        const trimmed = String(timeValue).trim();
        if (/^\d{2}:\d{2}$/.test(trimmed)) {
          return trimmed;
        }

        const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
        if (!match) {
          return trimmed;
        }

        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const meridiem = match[3].toUpperCase();

        if (meridiem === 'PM' && hours !== 12) hours += 12;
        if (meridiem === 'AM' && hours === 12) hours = 0;

        return `${String(hours).padStart(2, '0')}:${minutes}`;
      };

      const formatDisplayTime = (timeValue) => {
        const normalized = normalizeAppointmentTime(timeValue);
        if (!normalized) return 'TBD';

        const [hours, minutes] = normalized.split(':');
        const parsedHours = parseInt(hours, 10);
        const displayHours = parsedHours % 12 || 12;
        const meridiem = parsedHours >= 12 ? 'PM' : 'AM';
        return `${displayHours}:${minutes} ${meridiem}`;
      };

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
      const appointmentTimeRaw = (body.booking && body.booking.time) || body.appointmentTime || '';
      const appointmentTime = normalizeAppointmentTime(appointmentTimeRaw);
      const appointmentTimeDisplay = formatDisplayTime(appointmentTime);

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
        note: `Hands Detail - ${serviceType} on ${appointmentDate} at ${appointmentTimeDisplay} for ${customerName}`,
      });

      if (!result.result.payment.id) {
        throw new Error('Payment failed');
      }

      // Save booking to Firestore
      const firestore = admin.firestore();
      const bookingRef = firestore.collection('bookings').doc();
      
      // Calculate service duration based on service type
      const serviceDurations = {
        'ESSENTIAL DETAIL': 2.5,
        'EXECUTIVE DETAIL': 4.5,
        'SIGNATURE PRESTIGE': 6.5,
        'PRESIDENTIAL ELITE': 9,
        'ULTIMATE ARMOR': 13,
      };
      const duration = serviceDurations[serviceType] || 4;
      
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
        duration: duration,
        paymentId: result.result.payment.id,
        amountCents: amountCents,
        status: 'confirmed',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Also save public version (time, city, service, duration — no personal info)
      const cityOnly = customerAddress ? customerAddress.split(',').slice(-2).join(',').trim() : customerAddress;
      await firestore.collection('public_schedule').add({
        service: serviceType,
        date: appointmentDate,
        time: appointmentTime,
        city: cityOnly,
        duration: duration,
        status: 'booked',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Send confirmation email (only if customer email provided and Gmail configured)
      if (customerEmail) {
        try {
          const gmailEmail = process.env.GMAIL_EMAIL || 'NazirEl@handsdetailshop.com';
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
                <p><strong>Time:</strong> ${appointmentTimeDisplay}</p>
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
                <p><strong>Time:</strong> ${appointmentTimeDisplay}</p>
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
      const gmailEmail = process.env.GMAIL_EMAIL || 'NazirEl@handsdetailshop.com';
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
      const gmailEmail = process.env.GMAIL_EMAIL || 'NazirEl@handsdetailshop.com';
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

// ─────────────────────────────────────────────────────────────────────────────
// processGiftCertificate — charge card and issue gift certificate
// ─────────────────────────────────────────────────────────────────────────────
exports.processGiftCertificate = functions.runWith({ secrets: ['SQUARE_ACCESS_TOKEN', 'GMAIL_PASSWORD'] }).https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const { sourceId, amountCents, purchaserName, purchaserEmail, recipientName, recipientEmail, giftMessage } = request.body;

      // Validate required fields
      if (!sourceId) return response.status(400).json({ error: 'Payment source required' });
      if (!amountCents || typeof amountCents !== 'number' || amountCents < 2500) {
        return response.status(400).json({ error: 'Minimum gift certificate amount is $25' });
      }
      if (!purchaserName || typeof purchaserName !== 'string' || purchaserName.trim().length < 2) {
        return response.status(400).json({ error: 'Your name is required' });
      }
      if (!purchaserEmail || typeof purchaserEmail !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(purchaserEmail.trim())) {
        return response.status(400).json({ error: 'Valid email is required to receive the certificate' });
      }
      if (!recipientName || typeof recipientName !== 'string' || recipientName.trim().length < 2) {
        return response.status(400).json({ error: 'Recipient name is required' });
      }
      // Length guards
      if (purchaserName.trim().length > 100) return response.status(400).json({ error: 'Name too long' });
      if (purchaserEmail.trim().length > 200) return response.status(400).json({ error: 'Email too long' });
      if (recipientName.trim().length > 100) return response.status(400).json({ error: 'Recipient name too long' });
      if (recipientEmail && recipientEmail.length > 200) return response.status(400).json({ error: 'Recipient email too long' });
      if (giftMessage && giftMessage.length > 500) return response.status(400).json({ error: 'Message too long (max 500 chars)' });

      const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
      if (!squareAccessToken) return response.status(500).json({ error: 'Payment not configured' });

      const { Client, Environment } = require('square');
      const squareClient = new Client({ accessToken: squareAccessToken, environment: Environment.Production });

      const payResult = await squareClient.paymentsApi.createPayment({
        sourceId,
        amountMoney: { amount: BigInt(amountCents), currency: 'USD' },
        idempotencyKey: require('crypto').randomUUID(),
        note: `Gift Cert $${(amountCents / 100).toFixed(2)} — for ${recipientName.trim()} from ${purchaserName.trim()}`,
      });

      if (!payResult.result.payment || !payResult.result.payment.id) {
        throw new Error('Payment failed');
      }

      // Generate unique certificate code
      const certCode = 'HDS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();

      // Save to Firestore
      const firestore = admin.firestore();
      const certRef = firestore.collection('gift_certificates').doc();
      await certRef.set({
        id: certRef.id,
        code: certCode,
        amountCents,
        purchaserName: purchaserName.trim(),
        purchaserEmail: purchaserEmail.trim(),
        recipientName: recipientName.trim(),
        recipientEmail: (recipientEmail || '').trim(),
        giftMessage: (giftMessage || '').trim(),
        paymentId: payResult.result.payment.id,
        redeemed: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log('✅ Gift certificate issued:', certCode, 'for', recipientName.trim());

      // Send emails
      const gmailEmail = process.env.GMAIL_EMAIL || 'NazirEl@handsdetailshop.com';
      const gmailPassword = process.env.GMAIL_PASSWORD;
      if (gmailPassword) {
        try {
          const nodemailer = require('nodemailer');
          const transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: gmailEmail, pass: gmailPassword } });

          const certHtml = `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#0A0A08;padding:30px;text-align:center;border-radius:12px 12px 0 0;">
                <h1 style="color:#C9A84C;margin:0;font-size:1.8rem;">🎁 Gift Certificate</h1>
                <h2 style="color:#E8E0CC;margin:8px 0 0;font-size:1.2rem;letter-spacing:0.1em;">HANDS DETAIL SHOP</h2>
              </div>
              <div style="background:#111110;padding:35px;text-align:center;border:2px solid #C9A84C;">
                <div style="font-size:3.5rem;font-weight:800;color:#C9A84C;">$${(amountCents / 100).toFixed(2)}</div>
                <div style="color:#a0a0a0;margin:8px 0;">Certificate Code</div>
                <div style="background:#1A1A18;border:1px solid #C9A84C;padding:12px 24px;border-radius:8px;display:inline-block;margin:10px 0;">
                  <span style="font-family:monospace;font-size:1.4rem;font-weight:700;color:#C9A84C;letter-spacing:0.15em;">${certCode}</span>
                </div>
                <div style="color:#E8E0CC;margin-top:15px;font-size:1.1rem;">For: <strong>${recipientName.trim()}</strong></div>
                ${giftMessage ? `<div style="color:#c0c0c0;font-style:italic;margin:20px 0;padding:15px;border-left:3px solid #C9A84C;text-align:left;">"${giftMessage.trim()}"</div>` : ''}
                <div style="color:#5A5A52;margin-top:25px;font-size:0.85rem;line-height:1.6;">
                  Valid for any Hands Detail Shop service. Never expires.<br>
                  To redeem, mention this code when booking:<br>
                  <a href="https://handsdetailshop.com/booking.html" style="color:#C9A84C;">handsdetailshop.com/booking</a>
                </div>
              </div>
              <div style="background:#0A0A08;padding:15px;text-align:center;border-radius:0 0 12px 12px;color:#5A5A52;font-size:0.8rem;">
                Hands Detail Shop &nbsp;|&nbsp; (412) 752-8684 &nbsp;|&nbsp; NazirEl@handsdetailshop.com
              </div>
            </div>`;

          // Email to purchaser
          await transporter.sendMail({
            from: gmailEmail,
            to: purchaserEmail.trim(),
            subject: `🎁 Your Gift Certificate for ${recipientName.trim()} — Hands Detail Shop`,
            html: certHtml,
          });

          // Email to recipient if provided
          if (recipientEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(recipientEmail.trim())) {
            await transporter.sendMail({
              from: gmailEmail,
              to: recipientEmail.trim(),
              subject: `You received a gift from ${purchaserName.trim()}! 🎁 Hands Detail Shop`,
              html: certHtml,
            });
          }

          // Notify business owner
          await transporter.sendMail({
            from: gmailEmail,
            to: gmailEmail,
            subject: `New Gift Certificate Sold: $${(amountCents / 100).toFixed(2)} — ${purchaserName.trim()}`,
            html: `
              <h2>New Gift Certificate Purchase</h2>
              <p><strong>Purchaser:</strong> ${purchaserName.trim()} (${purchaserEmail.trim()})</p>
              <p><strong>Recipient:</strong> ${recipientName.trim()} (${recipientEmail || 'no email'})</p>
              <p><strong>Amount:</strong> $${(amountCents / 100).toFixed(2)}</p>
              <p><strong>Certificate Code:</strong> <strong style="color:#c9a84c;">${certCode}</strong></p>
              <p><strong>Payment ID:</strong> ${payResult.result.payment.id}</p>
              ${giftMessage ? `<p><strong>Message:</strong> "${giftMessage.trim()}"</p>` : ''}`,
          });
        } catch (emailErr) {
          console.warn('Gift cert email failed (non-blocking):', emailErr.message);
        }
      }

      return response.status(200).json({
        success: true,
        certCode,
        message: 'Gift certificate purchased successfully!',
      });

    } catch (error) {
      console.error('❌ processGiftCertificate error:', error);
      return response.status(500).json({ error: 'Purchase failed', details: error.message });
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// processMembership — charge initial membership payment (restoration + first month)
// ─────────────────────────────────────────────────────────────────────────────
exports.processMembership = functions.runWith({ secrets: ['SQUARE_ACCESS_TOKEN', 'GMAIL_PASSWORD'] }).https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const { sourceId, amountCents, customerName, customerEmail, customerPhone, vehicleType, membershipTier, hasCeramic, monthlyAmountCents, serviceAddress } = request.body;

      // Validate required fields
      if (!sourceId) return response.status(400).json({ error: 'Payment source required' });
      if (!amountCents || typeof amountCents !== 'number' || amountCents < 7500) {
        return response.status(400).json({ error: 'Invalid payment amount' });
      }
      if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
        return response.status(400).json({ error: 'Name is required' });
      }
      if (!customerPhone || typeof customerPhone !== 'string' || customerPhone.trim().length < 7) {
        return response.status(400).json({ error: 'Phone number is required' });
      }
      if (!vehicleType) return response.status(400).json({ error: 'Vehicle type is required' });
      if (!membershipTier) return response.status(400).json({ error: 'Membership tier is required' });
      // Length guards
      if (customerName.trim().length > 100) return response.status(400).json({ error: 'Name too long' });
      if (customerEmail && customerEmail.length > 200) return response.status(400).json({ error: 'Email too long' });
      if (customerPhone.trim().length > 30) return response.status(400).json({ error: 'Phone too long' });
      if (serviceAddress && serviceAddress.length > 300) return response.status(400).json({ error: 'Address too long' });

      const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
      if (!squareAccessToken) return response.status(500).json({ error: 'Payment not configured' });

      const { Client, Environment } = require('square');
      const squareClient = new Client({ accessToken: squareAccessToken, environment: Environment.Production });

      const payResult = await squareClient.paymentsApi.createPayment({
        sourceId,
        amountMoney: { amount: BigInt(amountCents), currency: 'USD' },
        idempotencyKey: require('crypto').randomUUID(),
        note: `Membership: ${membershipTier} | ${vehicleType}${hasCeramic ? ' + Ceramic' : ''} | ${customerName.trim()}`,
      });

      if (!payResult.result.payment || !payResult.result.payment.id) {
        throw new Error('Payment failed');
      }

      // Save to Firestore
      const firestore = admin.firestore();
      const memberRef = firestore.collection('memberships').doc();
      await memberRef.set({
        id: memberRef.id,
        customerName: customerName.trim(),
        customerEmail: (customerEmail || '').trim(),
        customerPhone: customerPhone.trim(),
        serviceAddress: (serviceAddress || '').trim(),
        vehicleType,
        membershipTier,
        hasCeramic: !!hasCeramic,
        amountCents,
        monthlyAmountCents: monthlyAmountCents || 0,
        paymentId: payResult.result.payment.id,
        status: 'active',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log('✅ Membership enrolled:', memberRef.id, 'for', customerName.trim());

      // Send emails
      const gmailEmail = process.env.GMAIL_EMAIL || 'NazirEl@handsdetailshop.com';
      const gmailPassword = process.env.GMAIL_PASSWORD;
      if (gmailPassword) {
        try {
          const nodemailer = require('nodemailer');
          const transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: gmailEmail, pass: gmailPassword } });

          if (customerEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customerEmail.trim())) {
            await transporter.sendMail({
              from: gmailEmail,
              to: customerEmail.trim(),
              subject: `Welcome to Hands Detail Shop — ${membershipTier} Membership Activated!`,
              html: `
                <h2>Welcome to the Hands Detail Shop Family, ${customerName.trim()}!</h2>
                <p>Your <strong>${membershipTier}</strong> membership is now active.</p>
                <p><strong>Vehicle Type:</strong> ${vehicleType}${hasCeramic ? ' with Ceramic Coating' : ''}</p>
                <p><strong>Monthly Rate:</strong> $${(monthlyAmountCents / 100).toFixed(2)}/month (biweekly service)</p>
                <p><strong>Initial Payment:</strong> $${(amountCents / 100).toFixed(2)}</p>
                <p>Nazir will reach out within 24 hours to schedule your first detail and assign your biweekly service day.</p>
                <p>Questions? Call or text <strong>(412) 752-8684</strong></p>
                <p>Thank you for joining — we'll keep your vehicle looking its best!</p>`,
            });
          }

          // Notify business owner
          await transporter.sendMail({
            from: gmailEmail,
            to: gmailEmail,
            subject: `New Membership Enrollment: ${membershipTier} — ${customerName.trim()}`,
            html: `
              <h2>New Membership Enrollment</h2>
              <p><strong>Customer:</strong> ${customerName.trim()}</p>
              <p><strong>Phone:</strong> ${customerPhone.trim()}</p>
              <p><strong>Email:</strong> ${customerEmail || 'not provided'}</p>
              <p><strong>Address:</strong> ${serviceAddress || 'not provided'}</p>
              <p><strong>Tier:</strong> ${membershipTier} @ $${(monthlyAmountCents / 100).toFixed(2)}/mo</p>
              <p><strong>Vehicle:</strong> ${vehicleType}${hasCeramic ? ' + Ceramic Coating' : ''}</p>
              <p><strong>Initial Payment:</strong> $${(amountCents / 100).toFixed(2)}</p>
              <p><strong>Payment ID:</strong> ${payResult.result.payment.id}</p>`,
          });
        } catch (emailErr) {
          console.warn('Membership email failed (non-blocking):', emailErr.message);
        }
      }

      return response.status(200).json({
        success: true,
        memberId: memberRef.id,
        message: 'Membership activated!',
      });

    } catch (error) {
      console.error('❌ processMembership error:', error);
      return response.status(500).json({ error: 'Enrollment failed', details: error.message });
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getBookings — fetch bookings from Firestore for calendar/schedule display
// ─────────────────────────────────────────────────────────────────────────────
exports.getBookings = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
      }

      const firestore = admin.firestore();
      
      // Get all confirmed bookings from the past 30 days and next 90 days
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const pastDate = new Date(today);
      pastDate.setDate(pastDate.getDate() - 30);
      
      const futureDate = new Date(today);
      futureDate.setDate(futureDate.getDate() + 90);

      const query = firestore.collection('bookings')
        .where('status', '==', 'confirmed')
        .orderBy('appointmentDate', 'asc');

      const snapshot = await query.get();
      const bookings = [];

      snapshot.forEach(doc => {
        const booking = doc.data();
        const bookingDate = new Date(booking.appointmentDate);
        
        // Filter to only include bookings within our date range
        if (bookingDate >= pastDate && bookingDate <= futureDate) {
          // Return all info for schedule display
          bookings.push({
            id: doc.id,
            date: booking.appointmentDate,
            time: booking.appointmentTime,
            service: booking.serviceType,
            duration: booking.duration || 4, // Default to 4 hours if not specified
            customerName: booking.customerName,
            customerPhone: booking.customerPhone,
            customerEmail: booking.customerEmail,
            customerVehicle: booking.customerVehicle,
            customerAddress: booking.customerAddress,
            status: booking.status,
            createdAt: booking.createdAt
          });
        }
      });

      return response.status(200).json({
        success: true,
        count: bookings.length,
        bookings: bookings
      });

    } catch (error) {
      console.error('❌ getBookings error:', error);
      return response.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// addTestBookings — Add test bookings to Firestore (for development/demo)
// ─────────────────────────────────────────────────────────────────────────────
exports.addTestBookings = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      // Simple auth check - only allow from known sources
      const authHeader = request.headers['authorization'] || '';
      if (!authHeader.includes('Bearer test-key-')) {
        return response.status(403).json({ error: 'Unauthorized' });
      }

      const firestore = admin.firestore();
      
      const testBookings = [
        { customerName: 'Client', customerPhone: '(412) 555-0001', customerAddress: 'Aliquippa, PA', serviceType: 'EXECUTIVE DETAIL', appointmentDate: '2026-04-24', appointmentTime: '09:00', duration: 4.5, status: 'confirmed', paymentId: 'test_001' },
        { customerName: 'Client', customerPhone: '(412) 555-0002', customerAddress: 'Pittsburgh, PA', serviceType: 'SIGNATURE PRESTIGE', appointmentDate: '2026-04-25', appointmentTime: '09:00', duration: 6.5, status: 'confirmed', paymentId: 'test_002' },
        { customerName: 'Client A', customerPhone: '(412) 555-0003', customerAddress: 'Gibsonia, PA', serviceType: 'EXECUTIVE DETAIL', appointmentDate: '2026-04-29', appointmentTime: '08:00', duration: 4.5, status: 'confirmed', paymentId: 'test_003' },
        { customerName: 'Client B', customerPhone: '(412) 555-0004', customerAddress: 'Gibsonia, PA', serviceType: 'EXECUTIVE DETAIL', appointmentDate: '2026-04-29', appointmentTime: '13:00', duration: 4.5, status: 'confirmed', paymentId: 'test_004' },
        { customerName: 'Client', customerPhone: '(412) 555-0005', customerAddress: 'Aliquippa, PA', serviceType: 'EXECUTIVE DETAIL', appointmentDate: '2026-05-01', appointmentTime: '10:00', duration: 4.5, status: 'confirmed', paymentId: 'test_005' },
        { customerName: 'Client', customerPhone: '(412) 555-0006', customerAddress: 'Pittsburgh, PA', serviceType: 'SIGNATURE PRESTIGE', appointmentDate: '2026-05-21', appointmentTime: '09:00', duration: 6.5, status: 'confirmed', paymentId: 'test_006' },
      ];

      let added = 0;
      for (const booking of testBookings) {
        // Save to private bookings collection (full details)
        await firestore.collection('bookings').add({
          ...booking,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        // Save to public_schedule (no personal info)
        await firestore.collection('public_schedule').add({
          service: booking.serviceType,
          date: booking.appointmentDate,
          time: booking.appointmentTime,
          city: booking.customerAddress,
          duration: booking.duration,
          status: 'booked',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        added++;
      }

      return response.status(200).json({
        success: true,
        message: `Added ${added} test bookings`,
        count: added
      });

    } catch (error) {
      console.error('❌ addTestBookings error:', error);
      return response.status(500).json({ error: 'Failed to add test bookings', details: error.message });
    }
  });
});
