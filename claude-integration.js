/**
 * Claude AI Integration for Hands Detail Shop
 * Provides chat widget + support bot across all pages
 * Uses Firebase Cloud Function for secure API proxying
 */

// Cloud Function endpoint - API key stays secure on server
const API_ENDPOINT = 'https://us-central1-hands-detail.cloudfunctions.net/claudeAI';

/**
 * System prompt for Claude - trains it on your business context
 */
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

MECHANICAL SERVICES (NEW):
- Basic Diagnostics: $50
- Advanced Diagnostics: $100
- Labor Rate: $75/hour (flat rate for all mechanical work)
- Common Services: Oil changes, filter replacements, fluid top-offs, battery service
- Available by appointment | No work proceeds without customer approval

=== MEMBERSHIP PLANS ===

MONTHLY MEMBERSHIPS:
- Bronze Tier: $75/month - Essential detail quarterly
- Silver Tier: $120/month - Executive detail every 2 months
- Gold Tier: $180/month - Signature detail monthly
- Benefits: Priority scheduling, discounted add-ons, free check-ups

=== PRICING NOTES ===
- All prices include mobile service (we come to you!)
- $30 deposit holds appointment
- Free estimates provided (no obligation)
- Flexible scheduling: Same-day available in some cases
- Weather-dependent: Rain reduces effectiveness of some services
- Vehicle size may affect pricing within listed ranges
- First-time customers: 15% discount on packages over $150

=== CUSTOMER VALUE PROPOSITIONS ===
✓ Air Force trained precision - military-grade attention to detail
✓ 16 years of professional experience - 5,000+ vehicles detailed
✓ Licensed & insured - professional credibility
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
 * FAQ Database for quick responses - comprehensive detailing knowledge base
 */
const SERVICE_FAQ = {
    'what services do you offer': 'We specialize in comprehensive mobile auto detailing with 5 personal vehicle packages (Essential $65-85 to Ultimate Armor $1,285-1,685), plus specialty services for yachts ($400-$800), RVs ($500-$1,200), motorcycles ($85-$295), and aircraft ($800-$2,000). We also offer ceramic coating ($400-$600), paint correction ($350-$500), and new mechanical diagnostics ($50-$100) with labor at $75/hr. All services come to your location!',
    
    'what\'s included in the executive package': 'The Executive Detail ($145-$185, 4-5 hours) includes: exterior wash, interior vacuum, window cleaning, tire shine, engine bay detail, clay bar (removes contaminants), hand wax (1-2 month shine), leather conditioning, door jamb cleaning, undercarriage spray, and air freshener. It\'s our most popular package - perfect for owners wanting comprehensive care with showroom-quality results!',
    
    'what\'s the difference between packages': 'Essential ($65-85) = basic wash & vacuum. Executive ($145-185) = adds deep cleaning, wax & leather. Signature ($285-365) = adds paint correction & 6-month warranty. Presidential ($585-785) = adds advanced correction & 12-month warranty. Ultimate Armor ($1,285-1,685) = full ceramic coating with lifetime warranty. Each level builds on the previous with more protection and durability.',
    
    'how much does detailing cost': 'Pricing ranges from $65 (Essential) to $1,685 (Ultimate Armor with ceramic coating & lifetime warranty). Most popular: Executive at $145-185. Mid-range: Signature at $285-365. For specialty vehicles like yachts/RVs, pricing is $400-$1,200+. All include mobile service to your location. We provide FREE estimates - no obligation!',
    
    'what is ceramic coating': 'Ceramic coating is a professional-grade protective layer that bonds to your paint. Our 9H ceramic ($400-$600) creates a hydrophobic surface that repels water, dirt, and UV damage. It lasts 2-5 years, dramatically reduces washing, and is included in our Ultimate Armor package ($1,285-$1,685). Best investment for long-term vehicle protection.',
    
    'do you come to my location': 'Yes! We\'re 100% mobile service. We come to your home, office, driveway, or anywhere in Pittsburgh and our 2-hour service radius. No need to drop off your vehicle - we detail it where it sits. This is one of our biggest advantages!',
    
    'where do you serve': 'We serve Pittsburgh PA and a 2-hour radius covering parts of Ohio, West Virginia, and Maryland. Call (412) 752-8684 to confirm your specific location is in our service area. We can also discuss pricing for locations at the edge of our radius.',
    
    'how do i book an appointment': 'Three easy ways: (1) Online quote form at handsdetailshop.com/quote, (2) Call us at (412) 752-8684, or (3) Text (412) 752-8684. A $30 deposit holds your appointment. We offer Monday-Saturday 8AM-6PM, plus Sunday by appointment. Same-day scheduling sometimes available!',
    
    'what is your experience': 'Nazir El, owner, has 16 years of professional detailing experience with 5,000+ vehicles detailed. He\'s an Air Force Veteran trained in precision mechanics. We\'re family-owned, licensed, insured, and built on military-grade attention to detail. Every vehicle gets treated like it\'s his own.',
    
    'do you offer mechanical services': 'Yes! New mechanical offerings: Basic diagnostics ($50), advanced diagnostics ($100), and labor at $75/hr. Services include oil changes, filter replacements, fluid top-offs, battery service. All work requires customer approval before proceeding. Available by appointment.',
    
    'what about motorcycle detailing': 'We specialize in show-quality motorcycle detailing! Road Ready ($85-105) = wash & shine. Chrome & Shine ($145-185) = road ready + chrome polish + chain service. Show Bike ($245-295) = full correction + ceramic coating + show-ready results. Perfect for riders who take pride in their bikes.',
    
    'do you service yachts and boats': 'Absolutely! Marine detailing is one of our specialties. We offer boat exterior cleaning & wax ($400-$800 depending on size), interior cabin detailing ($300-$500), and fiberglass restoration ($350+). All services include salt spray removal, UV protection, and marine-grade sealants. Perfect for keeping your vessel immaculate.',
    
    'how much is rv and motorhome detailing': 'RV detailing ranges from $500-$1,200 for full exterior detail (depends on size), interior deep clean ($300-$600), and roof treatment ($150-$250). We give special care to rubber seals and slide-outs. Perfect before road trips or storage. Call for size-specific quote.',
    
    'how much is aircraft detailing': 'Professional aircraft detailing ranges from $800-$2,000 for exterior (depends on aircraft size), plus $300-$600 for interior cabin. Services include oxidation removal, high-altitude protection, and specialized sealants designed for aircraft needs. Contact us for specific aircraft quote.',
    
    'do you offer payment plans': 'We accept cash, credit cards, debit cards, and Square for maximum flexibility. Contact us at (412) 752-8684 to discuss payment options for larger packages like Ultimate Armor ($1,285+). We\'re happy to work with you on terms.',
    
    'what\'s your warranty or guarantee': 'Absolutely! Our warranties vary: Signature Detail includes 6-month paint protection warranty. Presidential Elite includes 12-month protection. Ultimate Armor includes LIFETIME ceramic coating warranty. We stand behind our work 100%.',
    
    'how long does detailing take': 'Time varies by package: Essential = 2-3 hours. Executive = 4-5 hours. Signature = 6-7 hours. Presidential = 8-10 hours. Ultimate Armor = 12-14 hours (may require 2 days). All times depend on vehicle condition and size. We\'ll give you precise timing during your free estimate.',
    
    'what\'s the difference between essential and executive': 'Essential ($65-85, 2-3 hrs) = wash, vacuum, windows, tire shine. Executive ($145-185, 4-5 hrs) = everything in Essential PLUS deep interior cleaning, leather conditioning, clay bar treatment, hand wax, engine bay detail, door jamb cleaning. Executive is worth it for better protection and longer-lasting shine (1-2 months vs no wax protection).',
    
    'are you insured and licensed': 'Yes! We\'re fully licensed and insured. Nazir El is an Air Force Veteran with 16 years professional experience. Every detail is performed to professional standards with quality products and meticulous attention.',
    
    'do you offer first-time customer discounts': 'Yes! First-time customers get 15% off any package over $150. That means Executive ($145-185) becomes around $123-157, or Signature ($285-365) becomes around $242-310. Perfect time to experience the Hands Detail difference!',
    
    'what happens if i\'m not satisfied': 'Customer satisfaction is our #1 priority. If you\'re not happy with any detail, contact us immediately. We\'ll discuss your concerns and make it right. Our reputation is built on 16 years of satisfied customers. You\'ll love your vehicle.',
    
    'can i get a free quote': 'Absolutely! Free estimates are always available with zero obligation. Visit handsdetailshop.com/quote, call (412) 752-8684, or text us. We\'ll assess your vehicle and provide exact pricing for your needs. No pressure, no surprises.',
    
    'how often should i detail my vehicle': 'For protection: Executive detail every 3-4 months maintains shine and protection. For luxury/preserve value: Executive monthly or Signature quarterly. For maximum protection: Ultimate Armor yearly maintenance after initial application. We offer monthly membership plans ($75-$180) if you detail regularly.',
    
    'what is paint correction': 'Paint correction removes swirls, scratches, and oxidation through multi-stage polishing. Signature Detail ($285-365) includes light correction. Presidential ($585-785) includes advanced multi-stage correction. Standalone paint correction is $350-$500. Results: Professional show-quality finish that looks new again.',
};

/**
 * Initialize Claude Chat Widget
 */
function initializeClaudeWidget() {
    // Debug: Log that widget is initializing
    console.log('🤖 Claude AI Widget Initializing...');
    
    // Create container
    const container = document.createElement('div');
    container.id = 'claude-widget-container';
    container.innerHTML = `
        <style>
            #claude-chat-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background: linear-gradient(135deg, #c9a84c, #e8cc80);
                border: 3px solid #0d1b2a;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                box-shadow: 0 6px 20px rgba(201, 168, 76, 0.4);
                z-index: 9999;
                transition: all 0.3s ease;
                user-select: none;
            }
            #claude-chat-button:hover {
                transform: scale(1.12);
                box-shadow: 0 8px 28px rgba(201, 168, 76, 0.5);
            }
            #claude-chat-button:active {
                transform: scale(0.95);
            }
            #claude-chat-popup {
                position: fixed;
                bottom: 100px;
                right: 20px;
                width: 420px;
                height: 600px;
                background: linear-gradient(135deg, #0d1b2a, #1a2942);
                border: 2px solid rgba(201, 168, 76, 0.3);
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(201, 168, 76, 0.3);
                display: none;
                flex-direction: column;
                z-index: 9998;
                animation: slideUp 0.3s ease;
            }
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            #claude-chat-popup.active {
                display: flex;
            }
            .claude-popup-header {
                padding: 20px;
                border-bottom: 2px solid rgba(201, 168, 76, 0.2);
                background: linear-gradient(135deg, rgba(201, 168, 76, 0.1), rgba(232, 204, 128, 0.05));
            }
            .claude-popup-header h3 {
                margin: 0 0 5px 0;
                color: #e8cc80;
                font-size: 1.1rem;
                font-weight: 700;
            }
            .claude-popup-header p {
                margin: 0;
                color: #c9a84c;
                font-size: 0.85rem;
            }
            .claude-popup-close {
                position: absolute;
                top: 12px;
                right: 12px;
                background: none;
                border: none;
                color: #e8cc80;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .claude-popup-close:hover {
                color: white;
                transform: rotate(90deg);
            }
            #claude-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .claude-message {
                display: flex;
                gap: 10px;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .claude-message.user {
                justify-content: flex-end;
            }
            .claude-message-content {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 12px;
                word-wrap: break-word;
                font-size: 0.9rem;
                line-height: 1.5;
            }
            .claude-message.assistant .claude-message-content {
                background: rgba(201, 168, 76, 0.1);
                border-left: 3px solid #e8cc80;
                color: #b0bec5;
            }
            .claude-message.user .claude-message-content {
                background: linear-gradient(135deg, #c9a84c, #d4b860);
                color: white;
                border-radius: 12px 2px 12px 12px;
            }
            .claude-popup-footer {
                padding: 15px;
                border-top: 2px solid rgba(201, 168, 76, 0.2);
                display: flex;
                gap: 10px;
            }
            #claude-input {
                flex: 1;
                background: rgba(30, 40, 60, 0.8);
                border: 1px solid rgba(201, 168, 76, 0.25);
                color: #e0e0e0;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 0.9rem;
                font-family: inherit;
                transition: all 0.2s ease;
            }
            #claude-input:focus {
                outline: none;
                border-color: rgba(201, 168, 76, 0.6);
                background: rgba(30, 40, 60, 0.95);
                box-shadow: 0 0 8px rgba(201, 168, 76, 0.2);
            }
            #claude-input::placeholder {
                color: #757575;
            }
            .claude-send-btn {
                background: linear-gradient(135deg, #c9a84c, #d4b860);
                border: none;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 700;
                transition: all 0.2s ease;
                font-size: 1rem;
            }
            .claude-send-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
            }
            .claude-send-btn:active {
                transform: translateY(0);
            }
            .claude-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .claude-prompt-btn {
                background: rgba(201, 168, 76, 0.2);
                border: 1px solid rgba(201, 168, 76, 0.4);
                color: #e8cc80;
                padding: 8px 14px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.85rem;
                font-weight: 600;
                transition: all 0.2s ease;
                display: inline-block;
                white-space: nowrap;
            }
            .claude-prompt-btn:hover {
                background: rgba(201, 168, 76, 0.35);
                border-color: rgba(232, 204, 128, 0.7);
                color: #f0f0f0;
            }
            .claude-prompt-btn:active {
                transform: scale(0.97);
            }
            .claude-loading {
                display: inline-flex;
                gap: 4px;
                align-items: center;
            }
            .claude-loading span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #e8cc80;
                animation: pulse 1.4s infinite;
            }
            .claude-loading span:nth-child(2) {
                animation-delay: 0.2s;
            }
            .claude-loading span:nth-child(3) {
                animation-delay: 0.4s;
            }
            @keyframes pulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
            @media (max-width: 500px) {
                #claude-chat-popup {
                    width: calc(100vw - 40px);
                    height: 70vh;
                }
            }
        </style>
        <button id="claude-chat-button" title="Chat with Claude AI">💬</button>
        <div id="claude-chat-popup">
            <div class="claude-popup-header">
                <button class="claude-popup-close" id="claude-close-btn">×</button>
                <h3>Hands Detail Shop Assistant</h3>
                <p>Ask about our services, pricing, or book an appointment</p>
            </div>
            <div id="claude-messages"></div>
            <div id="claude-suggested-prompts" style="padding: 15px; border-top: 1px solid rgba(201, 168, 76, 0.1); display: none; flex-wrap: wrap; gap: 8px; justify-content: center;">
                <button class="claude-prompt-btn" onclick="sendPrompt('What packages do you offer?')">📋 Packages</button>
                <button class="claude-prompt-btn" onclick="sendPrompt('How much does detailing cost?')">💰 Pricing</button>
                <button class="claude-prompt-btn" onclick="sendPrompt('How do I book an appointment?')">📅 Book</button>
                <button class="claude-prompt-btn" onclick="sendPrompt('Do you service my area?')">📍 Service Area</button>
                <button class="claude-prompt-btn" onclick="sendPrompt('Tell me about ceramic coating')">🛡️ Ceramic</button>
                <button class="claude-prompt-btn" onclick="sendPrompt('Do you offer specialty services?')">🏎️ Specialty</button>
            </div>
            <div class="claude-popup-footer">
                <input type="text" id="claude-input" placeholder="Type your question..." />
                <button class="claude-send-btn" id="claude-send-btn">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);
    
    // Attach event listeners
    document.getElementById('claude-chat-button').addEventListener('click', toggleChatPopup);
    document.getElementById('claude-close-btn').addEventListener('click', closeChatPopup);
    document.getElementById('claude-send-btn').addEventListener('click', sendMessage);
    document.getElementById('claude-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    console.log('✅ Claude AI Widget Ready! (button in bottom-right corner)');
}

/**
 * Toggle chat popup visibility
 */
function toggleChatPopup() {
    const popup = document.getElementById('claude-chat-popup');
    popup.classList.toggle('active');
    if (popup.classList.contains('active')) {
        document.getElementById('claude-input').focus();
        // Add welcome message and show prompts if first time
        if (document.getElementById('claude-messages').children.length === 0) {
            addMessage('Welcome to Hands Detail Shop! 👋 I\'m Claude, your AI assistant. How can I help you today? Click any prompt below or type your question!', 'assistant');
            document.getElementById('claude-suggested-prompts').style.display = 'flex';
        }
    }
}

/**
 * Send a prompt button click
 */
function sendPrompt(prompt) {
    document.getElementById('claude-input').value = prompt;
    // Hide prompts after user clicks one
    document.getElementById('claude-suggested-prompts').style.display = 'none';
    sendMessage();
}

/**
 * Close chat popup
 */
function closeChatPopup() {
    document.getElementById('claude-chat-popup').classList.remove('active');
}

/**
 * Add message to chat
 */
function addMessage(text, sender) {
    const messagesDiv = document.getElementById('claude-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `claude-message ${sender}`;
    messageEl.innerHTML = `<div class="claude-message-content">${escapeHtml(text)}</div>`;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Send message to Claude API
 */
async function sendMessage() {
    const input = document.getElementById('claude-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Disable input while processing
    input.disabled = true;
    document.getElementById('claude-send-btn').disabled = true;
    
    // Add user message to chat
    addMessage(message, 'user');
    input.value = '';
    
    // Show loading indicator
    const messagesDiv = document.getElementById('claude-messages');
    const loadingEl = document.createElement('div');
    loadingEl.className = 'claude-message assistant';
    loadingEl.innerHTML = `<div class="claude-message-content"><span class="claude-loading"><span></span><span></span><span></span></span></div>`;
    messagesDiv.appendChild(loadingEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    try {
        // Check if it matches FAQ first for instant response
        const faqMatch = matchFAQ(message);
        if (faqMatch) {
            console.log('✅ FAQ match found');
            loadingEl.remove();
            addMessage(faqMatch, 'assistant');
            input.disabled = false;
            document.getElementById('claude-send-btn').disabled = false;
            return;
        }
        
        console.log('📤 Calling Cloud Function...');
        
        // Call Cloud Function (API key stays secure on server)
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                message: message
            })
        });
        
        console.log('📥 Cloud Function Response Status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('❌ Cloud Function Error:', response.status, errorData);
            throw new Error(`API error: ${response.status} - ${errorData.error?.details || 'Unknown error'}`);
        }
        
        const data = await response.json();
        const assistantMessage = data.reply;
        
        console.log('✅ Claude response received');
        loadingEl.remove();
        addMessage(assistantMessage, 'assistant');
    } catch (error) {
        console.error('❌ Error:', error);
        loadingEl.remove();
        addMessage(`Sorry, I encountered an error: ${error.message}. Please call us at (412) 752-8684 for immediate assistance.`, 'assistant');
    }
    
    input.disabled = false;
    document.getElementById('claude-send-btn').disabled = false;
    input.focus();
}

/**
 * Match user message against FAQ database
 */
function matchFAQ(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const [question, answer] of Object.entries(SERVICE_FAQ)) {
        if (lowercaseMessage.includes(question) || question.includes(lowercaseMessage.split(' ')[0])) {
            return answer;
        }
    }
    
    return null;
}

/**
 * Initialize on page load
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClaudeWidget);
} else {
    initializeClaudeWidget();
}
