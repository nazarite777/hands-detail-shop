/**
 * Claude AI Integration for Hands Detail Shop - ENHANCED VERSION
 * Complete Business Knowledge + Deposit Collection + Natural Upselling
 * Provides chat widget + support bot across all pages
 */

// Cloud Function endpoint - API key stays secure on server
const API_ENDPOINT = 'https://us-central1-hands-detail.cloudfunctions.net/claudeAI';

// COMPREHENSIVE PACKAGE DATABASE
const packageDatabase = {
    personal: {
        'essential': {name: 'Essential Detail', price: '$65-85', time: '2-3 hrs', desc: 'Complete exterior wash & basic interior vacuum'},
        'executive': {name: 'Executive Detail', price: '$145-185', time: '4-5 hrs', desc: 'Full detail - MOST POPULAR - recommended for most owners'},
        'premium-plus': {name: 'Premium Plus', price: '$215-285', time: '5-6 hrs', desc: 'Enhanced restoration with paint correction'},
        'signature': {name: 'Signature Prestige', price: '$325-425', time: '6-7 hrs', desc: 'Professional restoration + paint sealant'},
        'presidential': {name: 'Presidential Elite', price: '$650-850', time: '8-10 hrs', desc: 'Elite concours-level detail with extended warranty'},
        'ultimate': {name: 'Ultimate Armor', price: '$1,285-1,685', time: '12-14 hrs', desc: 'Full ceramic coating + lifetime warranty - TOP PROTECTION'}
    },
    specialty: {
        'marine-small': {name: 'Small Yacht Detail', price: '$285-385', size: 'Up to 25ft', desc: 'Complete marine detailing'},
        'marine-medium': {name: 'Medium Yacht Detail', price: '$585-885', size: '25-40ft', desc: 'Premium yacht restoration'},
        'marine-large': {name: 'Large Yacht Detail', price: '$885-1,485+', size: '41-60ft', desc: 'Premium yacht with coating options'},
        'rv-class-b': {name: 'RV Class B Detail', price: '$285-500', size: 'Compact RV', desc: 'Complete RV freshening'},
        'rv-class-c': {name: 'RV Class C Detail', price: '$600-1,200', size: 'Mid-size RV', desc: 'Full restoration'},
        'rv-luxury': {name: 'Luxury RV Detail', price: '$1,500-2,485', size: 'Premium RV', desc: 'Elite RV restoration with coatings'},
        'motorcycle-road': {name: 'Road Ready', price: '$85-105', style: 'All bikes', desc: 'Wash, wax, tire shine'},
        'motorcycle-chrome': {name: 'Chrome & Shine', price: '$145-185', style: 'All bikes', desc: 'Chrome polishing + chain service'},
        'motorcycle-show': {name: 'Show Bike', price: '$245-295', style: 'All bikes', desc: 'Paint correction + show-ready ceramic'},
        'aircraft': {name: 'Aircraft Detail', price: '$800-2,000+', type: 'Size-dependent', desc: 'Professional aviation detailing'}
    },
    services: {
        'ceramic-only': {name: 'Ceramic Coating Only', price: '$400-600', desc: 'Professional 9H ceramic application'},
        'paint-correction': {name: 'Paint Correction Only', price: '$350-500', desc: 'Light to medium swirl removal'},
        'leather-restoration': {name: 'Leather Restoration', price: '$150-300', desc: 'Professional conditioning & protection'},
        'interior-shampooing': {name: 'Interior Shampooing', price: '$150-250', desc: 'Deep carpet & seat cleaning'},
        'engine-bay': {name: 'Engine Bay Detail', price: '$75-150', desc: 'Complete engine compartment detailing'},
        'headlight-restoration': {name: 'Headlight Restoration', price: '$75-150', desc: 'Clarity restoration & protective coating'},
        'mechanical-basic': {name: 'Basic Inspection', price: '$50', desc: 'Vehicle health check'},
        'mechanical-advanced': {name: 'Advanced Diagnostics', price: '$100', desc: 'Computer diagnostic scan'},
        'mechanical-labor': {name: 'Mechanical Work', price: '$75/hr', desc: 'Oil changes, repairs, maintenance'}
    },
    membership: {
        'essential': {name: 'Essential Maintain', price: '$75/month', benefit: 'Biweekly washing', desc: 'Perfect for budget-conscious owners'},
        'premium': {name: 'Premium Maintain', price: '$110/month', benefit: 'Biweekly with wax', desc: 'MOST POPULAR - best value'},
        'ultimate': {name: 'Ultimate Maintain', price: '$145/month', benefit: 'Elite service', desc: 'Covers 2 vehicles + premium services'}
    }
};

// EXTENDED FAQ DATABASE WITH COMPLETE BUSINESS KNOWLEDGE
const faqDatabase = [
    {
        keywords: ['package', 'pricing', 'cost', 'price', 'how much', 'affordable', 'expensive', 'worth', 'quotes'],
        response: `Great question! We have packages for every budget:\n\n🚗 PERSONAL VEHICLES:\n• **Essential Detail**: $65-85 (maintenance wash)\n• **Executive Detail**: $145-185 (MOST POPULAR - full detail)\n• **Premium Plus**: $215-285 (enhanced restoration)\n• **Signature Prestige**: $325-425 (professional restoration)\n• **Presidential Elite**: $650-850 (elite concours-level)\n• **Ultimate Armor**: $1,285-1,685 (ceramic + lifetime warranty)\n\n✨ FIRST-TIME BONUS: 15% OFF packages over $150!\n\n💡 TIP: Executive Detail ($145-185) is our BEST VALUE - most owners choose it!\n\nWhat vehicle type do you have? (sedan, SUV, truck, luxury?) I can give you exact pricing!\n\n📞 Free estimate: (412) 752-8684 or handsdetailshop.com/quote`
    },
    {
        keywords: ['booking', 'schedule', 'reserve', 'book', 'appointment', 'when', 'available', 'hold', 'deposit'],
        response: `Perfect! Let's schedule you. Here's how simple it is:\n\n📅 BOOKING OPTIONS:\n1️⃣ Online: handsdetailshop.com/quote\n2️⃣ Phone: (412) 752-8684\n3️⃣ Text: (412) 752-8684 (fastest!)\n4️⃣ Here in chat with me!\n\n💰 DEPOSIT:\n→ Just $30 to secure your spot\n→ Applied to your final invoice\n→ Holds your preferred date/time\n\n⚡ SCHEDULING:\n→ Same-day service often available\n→ Best availability earlier in week\n→ Hours: Mon-Sat 8AM-6PM\n→ Sunday by appointment\n\n🎯 READY TO BOOK?\nTell me:\n• Your vehicle type (sedan, SUV, truck?)\n• Package interest (Essential, Executive, Premium?)\n• Preferred date/time\n• Your phone number\n\nI can get you on the calendar right now!`
    },
    {
        keywords: ['ceramic', 'coating', 'protection', 'warranty', 'shine', 'hydrophobic', 'water repellent', 'gloss'],
        response: `🎯 CERAMIC COATING - Game-changing protection!\n\n✨ WHAT CERAMIC COATING DOES:\n→ Protects your paint for YEARS (not months!)\n→ Water beads off dramatically\n→ Hides micro-swirls and improves shine\n→ Makes washing MUCH easier\n→ UV protection prevents fading\n→ Resists chemical damage\n→ Creates that "wet look" permanently\n\n💎 CERAMIC COATING OPTIONS:\n\n1️⃣ **Ultimate Armor Package** - $1,285-1,685\n   • Full ceramic coating (9H hardness)\n   • Advanced paint correction\n   • **LIFETIME WARRANTY** ⭐\n   • Professional-grade protection\n   • Annual maintenance included!\n\n2️⃣ **Presidential Elite** - $650-850\n   • Ceramic prep + protection\n   • 12-month warranty\n   • Great for luxury vehicles\n\n3️⃣ **Ceramic-Only Service** - $400-600\n   • Add to any existing vehicle\n   • Perfect if you had recent repairs\n   • Professional application\n\n🤔 IS IT WORTH IT?\n✓ For new/valuable vehicles: YES! It's insurance for your paint\n✓ Daily drivers: YES! Protects long-term investment\n✓ Luxury/performance cars: Absolutely!\n✓ Older vehicles: Can still benefit!\n\n⏱️ MAINTENANCE WITH CERAMIC:\nEven with ceramic, we recommend:\n• Biweekly maintenance washing ($75-110/month with membership)\n• Annual ceramic inspection\n• Touch-ups if needed\n\n💡 BEST VALUE: Our **Premium Maintain membership** ($110/month) keeps ceramic-coated cars looking perfect!\n\nReady to protect your vehicle long-term?`
    },
    {
        keywords: ['marine', 'yacht', 'boat', 'rv', 'motorhome', 'vessel', 'watercraft', 'ship', 'sailboat'],
        response: `⛵ WE SPECIALIZE IN MARINE & RV DETAILING!\n\n🛥️ YACHT & BOAT DETAILING:\n• **Small Boat** (up to 25ft): $285-385\n• **Medium Yacht** (25-40ft): $585-885\n• **Large Yacht** (41-60ft): $885-1,485+\n\n✓ Salt spray removal (critical!)\n✓ UV protection for teak/fiberglass\n✓ Marine-grade sealant application\n✓ Chrome hardware polishing\n✓ Interior cabin detailing available\n\n🏠 RV & MOTORHOME DETAILING:\n• **Class B RV**: $285-500\n• **Class C RV**: $600-1,200\n• **Luxury RV**: $1,500-2,485+ (custom)\n\n✓ Full exterior restoration\n✓ Interior deep clean\n✓ Roof treatment & sealing\n✓ Slide-out care\n✓ Rubber seal protection\n✓ Ceramic coating options available\n\n📍 MOBILE SERVICE:\n→ We come to your marina\n→ Storage facility\n→ Your home or destination\n→ Work around YOUR schedule\n\n💡 UNIQUE MARINE CHALLENGES WE SOLVE:\n✓ Salt water oxidation\n✓ Algae growth on hulls\n✓ UV fading\n✓ Fresh water spot removal\n✓ Winterization detailing\n\n🎯 EVERY VESSEL IS UNIQUE!\n→ Call for personalized quote: (412) 752-8684\n→ Photos welcome for better estimate\n→ We service entire 2-hour radius area\n\nWhat size boat or RV do you have?`
    },
    {
        keywords: ['motorcycle', 'bike', 'sport', 'harley', 'cruiser', 'touring', 'dirt', 'street'],
        response: `🏍️ MOTORCYCLE SPECIALISTS - We handle all bikes!\n\n🎯 OUR BIKE PACKAGES:\n\n**Road Ready** - $85-105\n✓ Professional motorcycle wash\n✓ Premium hand wax\n✓ Tire shine application\n✓ Chain cleaning\n✓ Perfect for: Regular maintenance\n\n**Chrome & Shine** - $145-185 (POPULAR)\n✓ Everything in Road Ready, PLUS:\n✓ Chrome & metal polishing\n✓ Chain lubrication service\n✓ Seat conditioning\n✓ Detailed wheel cleaning\n✓ Perfect for: Performance riders\n\n**Show Bike** - $245-295 (TOP TIER)\n✓ Everything in Chrome & Shine, PLUS:\n✓ Paint correction & polishing\n✓ Professional ceramic coating\n✓ Show-ready finish\n✓ Glossy protective barriers\n✓ Perfect for: Show bikes, show prep\n\n✨ BIKE TYPES WE HANDLE:\n✓ Sport bikes (Yamaha R1, Kawasaki Ninja, etc.)\n✓ Cruisers (Harley, custom builds)\n✓ Touring bikes (Goldwing, etc.)\n✓ Dirt bikes & dual-sports\n✓ Vintage & classic motorcycles\n✓ Sportsters & street bikes\n\n🔧 INCLUDED IN ALL PACKAGES:\n✓ Professional washing (safe for sensitive parts)\n✓ Fuel tank restoration\n✓ Fender & fairing detail\n✓ Engine case cleaning\n✓ Seat restoration\n✓ Handlebar polishing\n\n💡 MEMBERSHIP AVAILABLE:\n→ Biweekly motorcycle maintenance\n→ Save on regular waxing\n→ Priority scheduling\n\nWhat type of bike do you ride?`
    },
    {
        keywords: ['aircraft', 'plane', 'hangar', 'cessna', 'piper', 'jet', 'wings', 'aviation'],
        response: `✈️ PROFESSIONAL AIRCRAFT DETAILING SERVICE\n\n🎯 AIRCRAFT DETAILING EXPERTISE:\n• Exterior detailing: $800-2,000+ (aircraft size-dependent)\n• Interior cabin: $300-600\n• Custom quotes for large/specialty aircraft\n\n✨ OUR SPECIALTY SERVICES:\n✓ Oxidation removal (critical for aircraft)\n✓ High-altitude UV protection\n✓ Cockpit detailing\n✓ Windows & windscreen cleaning\n✓ Fuel cap & ground handling areas\n✓ Specialized sealants for aviation needs\n✓ Professional polish application\n\n🛩️ AIRCRAFT TYPES:\nWe service all general aviation aircraft:\n✓ Cessna, Beechcraft, Piper singles\n✓ Twin-engine aircraft\n✓ Experimental/kit aircraft\n✓ Vintage aircraft restorations\n✓ Commercial aviation partnerships available\n\n🔒 WHY PROFESSIONAL AIRCRAFT DETAIL:\n→ Preserves paint & protective coatings\n→ Prevents corrosion issues\n→ Maintains resale value\n→ Professional appearance matters!\n→ FAA-conscious service providers\n\n📞 AIRCRAFT DETAILING CONSULTATION:\n→ Call directly: (412) 752-8684\n→ Describe aircraft type/size\n→ Discuss specific concerns\n→ Custom quote provided\n→ Flexible scheduling (understand aircraft storage needs)\n\nWhat aircraft do you own/operate?`
    },
    {
        keywords: ['membership', 'monthly', 'plan', 'subscribe', 'recurring', 'save', 'discount', 'annual', 'biweekly'],
        response: `💰 VIP MEMBERSHIP PLANS - Save 20-30%!\n\n🥉 **ESSENTIAL MAINTAIN** - $75/month\n✓ Biweekly hand wash & shine\n✓ Interior vacuum & wipe\n✓ Window cleaning\n✓ Tire dressing\n✓ Assigned service day (Mon-Thu)\n✓ 10% discount on add-ons\n✓ Priority scheduling\n\n🥈 **PREMIUM MAINTAIN** - $110/month ⭐ MOST POPULAR\n✓ Everything in Essential MAINTAIN, PLUS:\n✓ Premium carnauba wax application\n✓ Dashboard & console conditioning\n✓ Door jamb deep cleaning\n✓ 15% discount on major services\n✓ Free air freshener each visit!\n✓ BEST VALUE for regular owners\n\n🥇 **ULTIMATE MAINTAIN** - $145/month (ELITE)\n✓ Everything in Premium MAINTAIN, PLUS:\n✓ Paint sealant every 3 months\n✓ Leather conditioning (if applicable)\n✓ Spot stain removal service\n✓ Engine bay wipe down\n✓ Ceramic inspection/touch-ups\n✓ 20% discount on major services\n✓ **COVERS 2 VEHICLES!** (choose any 2)\n\n👨‍👩‍👧‍👦 MULTI-CAR HOUSEHOLD PLANS:\n• Two-Car Essential: $130/month ($65/vehicle)  → SAVE $20/month!\n• Two-Car Premium: $190/month ($95/vehicle)  → SAVE $30/month!\n• Three-Car Essential: $180/month ($60/vehicle) → SAVE $45/month!\n• Three-Car Premium: $270/month ($90/vehicle) → SAVE $60/month!\n• Family Fleet Plan: Contact for custom quote\n\n✨ ALL MEMBERSHIPS INCLUDE:\n✓ Biweekly professional service\n✓ Priority booking guarantee\n✓ Free estimates on upgrades\n✓ Annual vehicle inspection\n✓ Dedicated service day\n✓ 30-day satisfaction guarantee\n✓ Cancel anytime (NO long-term contracts!)\n✓ Service flexibility (reschedule as needed)\n\n🎯 MEMBERSHIP IS:\n→ CHEAPEST ongoing protection\n→ EASIEST maintenance routine\n→ BEST value for vehicle owners\n→ Perfect for professionals who want consistency\n\n💡 REAL SAVINGS EXAMPLE:\n• Premium Detail normally: $165/service\n• Doing it monthly: $1,980/year\n• Premium Membership: $1,320/year (+ ceramic maintenance!)\n→ SAVES YOU $660+/year!\n\n🤔 STILL DECIDING?\n→ Try one month risk-free!\n→ 30-day satisfaction guarantee\n→ Upgrade/downgrade anytime\n\nReady to join the membership program?\nCall: (412) 752-8684\nOnline: handsdetailshop.com/membership`
    },
    {
        keywords: ['gift', 'certificate', 'gift card', 'present', 'christmas', 'birthday', 'anniversary', 'corporate', 'give'],
        response: `🎁 PERFECT GIFT FOR CAR LOVERS!\n\n💝 GIFT CERTIFICATE AMOUNTS:\n\n**$50 Certificate** - Starter Detail\n→ Perfect for: Add-ons, partial services\n\n**$100 Certificate** - Essential or Executive Package\n→ Perfect for: Birthday gifts, first-time experience\n\n**$150 Certificate** - Executive or partial Signature\n→ Perfect for: Serious car enthusiasts\n\n**$250 Certificate** - Full Signature Package\n→ Perfect for: Premium gift for special person\n\n**$500+ Certificate** - Presidential or Ultimate Armor\n→ Perfect for: Ultimate gift, serious investment\n\n**CUSTOM AMOUNT** - Any value you choose\n→ Perfect for: Corporate gifts, specific budgets\n\n✅ GIFT CERTIFICATE BENEFITS:\n✓ Never expires (use anytime!)\n✓ Transferable (give to anyone)\n✓ Can be combined with offers\n✓ Digital delivery (instant email) OR\n✓ Physical card (shipped in 3-5 days)\n✓ Personalized message included\n✓ Beautiful presentation\n✓ Surprise value for car owners!\n\n🎯 PERFECT FOR:\n→ Birthday gifts\n→ Holiday presents\n→ Anniversary surprises\n→ Employee appreciation\n→ Corporate gifts\n→ Wedding gifts\n→ Thanking customers/clients\n→ Christmas stockers\n→ Housewarming gifts for car lovers!\n\n📧 HOW TO PURCHASE:\n→ Call: (412) 752-8684\n→ Email: handsdetailshop@gmail.com\n→ Online: handsdetailshop.com/gift-certificates\n→ Chat with me right here!\n\n💡 GIFT RECIPIENT GETS:\n✓ Premium professional detailing\n✓ Mobile service convenience\n✓ Air Force-trained precision\n✓ 16 years of expertise\n✓ Satisfaction guarantee\n\nReady to give an amazing gift?`
    },
    {
        keywords: ['mechanical', 'oil', 'repair', 'service', 'maintenance', 'engine', 'brake', 'battery', 'fluid', 'diagnostic'],
        response: `🔧 MECHANICAL SERVICES - Full Service Philosophy!\n\n🔍 DIAGNOSTIC SERVICES:\n• **Basic Vehicle Inspection**: $50\n  → Quick health check, basic assessment\n• **Advanced Computer Diagnostics**: $100\n  → Full system scan with computer readout\n• **Full System Analysis**: $150\n  → Deep inspection, detailed report\n\n🛠️ COMMON MECHANICAL WORK:\n\n**Routine Maintenance:**\n• Oil Change Service: $40-75\n• Filter Replacement: $25-60\n• Fluid Top-offs: $20-50\n• Tire Rotation & Balance: $50-100\n\n**Electrical Systems:**\n• Battery Service/Replacement: $75-200\n• Starter/Alternator Service: $150-300\n• Electrical diagnostics: $50-100\n\n**Cooling & Drivetrain:**\n• Coolant Flush: $75-150\n• Transmission Fluid Service: $100-200\n• Power Steering Service: $75-150\n\n**Braking System:**\n• Brake Service: $150-400\n• Brake Fluid Flush: $75-150\n• Pad Replacement: $100-250\n\n⚡ LABOR RATE:\n→ $75/hour for non-package mechanical work\n→ Flat rates for common services\n→ Transparent pricing upfront\n\n✅ MECHANICAL SERVICE FEATURES:\n✓ Mobile service (we come to you)\n✓ Professional diagnostics\n✓ ALL work requires your approval FIRST\n✓ No surprises - we quote before we fix\n✓ Professional & transparent service\n✓ Satisfaction guaranteed\n✓ Quality parts used\n\n🎯 HOW IT WORKS:\n1. Call or describe problem: (412) 752-8684\n2. We schedule diagnostic appointment\n3. Perform inspection at your location\n4. Report findings & quote repair\n5. YOU approve before any work\n6. Service completed professionally\n7. Full explanation of what was done\n\n💡 WANT BOTH?\n→ Combine Detailing + Mechanical\n→ One appointment, complete vehicle care\n→ We can detail while working on repairs\n\n📞 MECHANICAL CONSULTATION:\nCall: (412) 752-8684\nText: (412) 752-8684\nEmail: handsdetailshop@gmail.com\n\nWhat mechanical concern do you have?`
    },
    {
        keywords: ['first time', 'discount', 'coupon', 'promo', 'offer', 'new customer', 'deal', 'special'],
        response: `🎉 WELCOME TO HANDS DETAIL SHOP!\n\n✨ FIRST-TIME CUSTOMER SPECIAL:\n→ **15% OFF any package over $150**\n→ No code needed!\n→ Just mention it's your first visit\n→ Automatically applied\n\n💡 EXAMPLES OF FIRST-TIME SAVINGS:\n• Executive ($165): **$24.75 OFF** → just $140\n• Signature ($375): **$56.25 OFF** → just $318\n• Presidential ($750): **$112.50 OFF** → just $637\n• Ultimate Armor ($1,500): **$225 OFF** → just $1,275\n\n🌟 ALSO GET:\n✓ Satisfaction guarantee on all work\n✓ Professional Air Force-trained service\n✓ 16 years of expertise\n✓ 5,000+ satisfied customers\n✓ Mobile convenience\n✓ Transparent pricing\n\n🎯 HOW TO CLAIM:\n1. Book your service\n2. Tell us it's your first time\n3. Discount automatically applied\n4. Enjoy premium detailing!\n\n📞 READY TO EXPERIENCE THE DIFFERENCE?\nCall: (412) 752-8684\nText for booking: (412) 752-8684\nOnline: handsdetailshop.com/quote\n\nWhat package interests you?`
    },
    {
        keywords: ['how long', 'timeline', 'how fast', 'rush', 'urgent', 'emergency', 'today', 'quick', 'time'],
        response: `⏱️ SERVICE TIMELINE:\n\n🚀 STANDARD PACKAGES:\n• Essential Detail: 2-3 hours\n• Executive Detail: 4-5 hours\n• Premium Plus: 5-6 hours\n• Signature Package: 6-7 hours\n• Presidential Elite: 8-10 hours\n• Ultimate Armor: 12-14 hours (may need 1-2 days)\n\n⚡ SAME-DAY SERVICE:\n✓ Often available Mon-Sat\n✓ Call ASAP for availability\n✓ Better availability earlier in week\n✓ 3+ hour packages most likely to fit same-day\n✓ Shorter packages (Essential/Executive) easier to schedule same-day\n\n🚨 EMERGENCY DETAIL:\n✓ We can often accommodate rush requests\n✓ Call immediately: (412) 752-8684\n✓ May require appointment later that day or next available\n✓ Mobile service = flexible scheduling\n✓ Additional rush fee may apply for same-day requests\n\n📅 TYPICAL BOOKING:\n→ Mon-Tue: Best availability\n→ Wed-Thu: Good availability\n→ Fri-Sat: More limited\n→ Sunday: By appointment only\n\n💡 PRO TIPS:\n✓ Book ahead for best times\n✓ Weekday bookings more flexible\n✓ Morning appointments get out faster\n✓ Shorter packages = more availability\n\n🤔 NEED QUICK SERVICE?\nConsider:\n• Essential Detail (2-3 hrs) for fast refresh\n• Executive Detail (4-5 hrs) for comprehensive quick detail\n\nWhen do you need the service done?`
    },
    {
        keywords: ['area', 'service area', 'location', 'where', 'distance', 'pennsylvania', 'ohio', 'maryland', 'west virginia', 'coverage'],
        response: `📍 SERVICE AREA:\n\n✅ PRIMARY SERVICE AREA:\n→ Pittsburgh, PA & immediate surroundings\n\n✅ EXTENDED SERVICE AREA:\n→ Within 2-hour radius from Pittsburgh\n→ Includes: Parts of PA, OH, WV, MD\n→ Custom locations available\n\n🗺️ COVERAGE INCLUDES:\n✓ Downtown Pittsburgh\n✓ North Shore & Strip District\n✓ South Hills areas\n✓ West End neighborhoods\n✓ North Hills suburbs\n✓ Eastern suburbs\n✓ Arnold, PA area (primary service hub)\n✓ All surrounding metro areas\n✓ Vacation/destination detailing available\n\n🚗 MOBILE SERVICE:\n→ We come to YOUR location\n→ Driveway, parking lot, office\n→ Marina for yacht/boat service\n→ Storage facility\n→ Hangar for aircraft\n→ Weather-friendly service areas preferred\n\n🌧️ WEATHER CONSIDERATIONS:\n→ Best results in dry conditions\n→ Can work in light rain with adjustments\n→ Covered areas help with winter service\n→ We adapt to your location's conditions\n\n📞 OUTSIDE OUR AREA?\n→ Call to discuss: (412) 752-8684\n→ May be possible for special requests\n→ Large commercial fleets: custom arrangements\n→ Corporate packages: location flexibility\n\n💡 NO DRIVE REQUIRED:\n→ Service comes to you\n→ No need to drop off car\n→ Stay home while we work\n→ Perfect for busy professionals\n\nWhere are you located?`
    },
    {
        keywords: ['contact', 'phone', 'call', 'text', 'email', 'hours', 'open', 'closed', 'facebook', 'instagram'],
        response: `📞 GET IN TOUCH - Multiple Ways to Reach Us!\n\n☎️ PHONE:\n→ **(412) 752-8684**\n→ Direct line to Nazir\n→ Mon-Sat 8AM-6PM\n→ Best for urgent questions\n\n💬 TEXT:\n→ **(412) 752-8684**\n→ Fast responses during hours\n→ Great for scheduling!\n→ Mon-Sat 8AM-6PM\n\n📧 EMAIL:\n→ **handsdetailshop@gmail.com**\n→ Detailed inquiries\n→ Respond within 24 hours\n→ Photos welcome for quotes\n\n🌐 ONLINE:\n→ **handsdetailshop.com**\n→ Booking portal: handsdetailshop.com/quote\n→ Instant quote request\n→ Gallery & testimonials\n\n📱 SOCIAL MEDIA:\n→ Instagram: @handsdetailshop\n→ Facebook: Hands Detail Shop\n→ See before/after photos\n→ Customer testimonials\n→ Service updates\n\n🕐 BUSINESS HOURS:\n→ **Monday-Saturday: 8AM-6PM**\n→ **Sunday: By Appointment Only**\n→ **Holidays: Call for hours**\n\n⏱️ RESPONSE TIMES:\n→ Phone/Text: Answered immediately during hours\n→ Email: Within 24 hours\n→ Online booking: Usually responded to within 2 hours\n→ After-hours: Callback next day\n\n🏪 LOCATION:\n→ Mobile service (come to you!)\n→ Service hub: Arnold, PA area\n→ 2-hour service radius from Pittsburgh\n\n💡 BEST WAY TO REACH US?\n✓ For quick scheduling: TEXT (412) 752-8684\n✓ For questions: CALL (412) 752-8684\n✓ For detailed inquiry: EMAIL handsdetailshop@gmail.com\n✓ To book online: Visit handsdetailshop.com/quote\n\nHow can we help you today?`
    },
    {
        keywords: ['deposit', 'payment', 'method', 'pay', 'credit card', 'venmo', 'paypal', 'square', 'cash', 'financing'],
        response: `💰 DEPOSIT & PAYMENT OPTIONS\n\n💳 DEPOSIT TO SECURE APPOINTMENT:\n→ $30 deposit holds your spot\n→ Applied to your final invoice\n→ Deposits are NON-REFUNDABLE but credited\n→ Reschedule within 30 days: deposit stays valid\n\n✅ PAYMENT METHODS:\n• Cash (at service)\n• Venmo (secure mobile payment)\n• PayPal (online payment)\n• Square (card processing)\n• Apple Pay (at service)\n• Wire transfer (large fleet jobs)\n\n🎯 PAYMENT TIMING:\n→ Deposit due to confirm booking\n→ Final payment at service completion\n→ Can pay deposit + final payment day-of\n→ Or split into installments for large packages\n\n📊 PRICING NOTES:\n✓ All prices include mobile service\n✓ NO hidden fees\n✓ Transparent quotes provided\n✓ Weather impacts (rain) discussed upfront\n✓ Vehicle size affects pricing within ranges\n✓ First-time discount: 15% OFF packages over $150\n\n🏢 COMMERCIAL/FLEET TERMS:\n✓ Bulk discounts available\n✓ NET 30 payment terms possible\n✓ Invoice billing available\n✓ Monthly automated billing (memberships)\n✓ Custom payment plans for large contracts\n\n🤝 SATISFACTION GUARANTEE:\n→ If not satisfied: we make it right\n→ Your satisfaction is guaranteed\n→ Rework available if needed\n→ Professional service standard\n\n📞 PAYMENT QUESTIONS?\nCall: (412) 752-8684\nText: (412) 752-8684\nEmail: handsdetailshop@gmail.com\n\nReady to book with deposit?`
    },
    {
        keywords: ['upsell', 'upgrade', 'better package', 'next tier', 'add-on', 'loyalty', 'recommendation'],
        response: `✨ UPGRADE OPTIONS TO CONSIDER:\n\n🎯 IF YOU'RE CHOOSING ESSENTIAL ($65-85):\nConsider stepping up to **EXECUTIVE ($145-185)**:\n→ Only $70-100 more\n→ Adds leather conditioning (keeps interior pristine)\n→ Includes paint wax protection (lasts 1-2 months)\n→ Deep interior detailing\n→ Most owners' favorite choice!\n→ **Best value in our lineup**\n\n🎯 IF YOU'RE DOING EXECUTIVE (Most Popular):\nConsider **MEMBERSHIP PLAN** ($110/month):\n→ Do this every 2 weeks instead of one-time\n→ Saves you 20% vs one-off services\n→ Keeps vehicle in pristine condition\n→ Priority scheduling guaranteed\n→ Professional consistency\n\n🎯 IF YOU'RE DOING SIGNATURE ($325-425):\nConsider adding **CERAMIC COATING** upgrade:\n→ Jump to **PRESIDENTIAL** ($650-850)\n→ Gets you paint sealant + advanced protection\n→ 12-month warranty\n→ Better long-term value\n\n💎 IF YOU HAVE A LUXURY/NEW VEHICLE:\nRecommend **ULTIMATE ARMOR** ($1,285-1,685):\n→ Professional ceramic coating (9H)\n→ **LIFETIME WARRANTY**\n→ Protects paint investment for years\n→ Essentially insurance for your paint\n→ One-time investment, permanent protection\n→ Saves money long-term\n\n👨‍👩‍👧‍👦 IF YOU HAVE MULTIPLE VEHICLES:\nJoin **MULTI-CAR HOUSEHOLD PLAN**:\n→ Two-Car Premium: $190/month (save $30/month!)\n→ Three-Car Ultimate: $270/month (save $60/month!)\n→ All vehicles get biweekly service\n→ Same-day for all\n→ Best for families\n\n🎯 ALWAYS CONSIDER:\n→ Ceramic coating extends shine 10x longer\n→ Membership is best value for ongoing care\n→ Leather conditioning prevents cracking\n→ Paint sealant saves money long-term\n→ Multi-car discounts reward loyalty\n\nNothing pushy - just helping you get best value! What sounds interesting?`
    }
];

// Initialize Claude chat widget on page load
document.addEventListener('DOMContentLoaded', initializeClaudeWidget);

function initializeClaudeWidget() {
    // Create widget container if it doesn't exist
    if (!document.getElementById('claude-widget')) {
        createWidgetHTML();
    }
    
    attachEventListeners();
}

function createWidgetHTML() {
    const widgetHTML = `
    <!-- Claude AI Chat Widget -->
    <div id="claude-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        
        <!-- Chat Button -->
        <button id="chat-button" style="background: linear-gradient(135deg, #1565c0, #1e88e5); color: white; border: none; border-radius: 50%; width: 60px; height: 60px; font-size: 1.5rem; cursor: pointer; box-shadow: 0 5px 20px rgba(21, 101, 192, 0.4); transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;" title="Chat with Claude">
            💬
        </button>

        <!-- Chat Popup -->
        <div id="chat-popup" style="display: none; position: absolute; bottom: 100px; right: 0; width: 380px; height: 550px; background: #1a1a1a; border-radius: 15px; border: 1px solid rgba(66, 165, 245, 0.3); box-shadow: 0 10px 40px rgba(0,0,0,0.5); flex-direction: column; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1565c0, #1e88e5); color: white; padding: 20px; text-align: center; font-weight: 600; border-bottom: 1px solid rgba(66, 165, 245, 0.3);">
                Claude - Hands Detail Shop Expert
                <button id="close-btn" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">✕</button>
            </div>

            <!-- Messages Container -->
            <div id="messages-container" style="flex: 1; overflow-y: auto; padding: 20px; background: #0a0a0a;">
                <!-- Messages appear here -->
            </div>

            <!-- Quick Prompts -->
            <div id="quick-prompts" style="padding: 10px; background: rgba(30, 30, 30, 0.8); border-top: 1px solid rgba(66, 165, 245, 0.2); display: grid; grid-template-columns: 1fr; gap: 8px; max-height: 120px; overflow-y: auto;">
                <button onclick="sendPrompt('What packages do you offer?')" style="background: linear-gradient(135deg, #1565c0, #42a5f5); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 500;">📦 Packages & Pricing</button>
                <button onclick="sendPrompt('Tell me about your membership plans')" style="background: linear-gradient(135deg, #1565c0, #42a5f5); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 500;">🎁 Membership Plans</button>
                <button onclick="sendPrompt('How do I book an appointment?')" style="background: linear-gradient(135deg, #1565c0, #42a5f5); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 500;">📅 Book Service</button>
            </div>

            <!-- Input Area -->
            <div style="padding: 12px; background: #1a1a1a; border-top: 1px solid rgba(66, 165, 245, 0.2); display: flex; gap: 8px;">
                <input id="message-input" type="text" placeholder="Ask Claude anything..." style="flex: 1; padding: 10px 12px; background: #2a2a2a; border: 1px solid rgba(66, 165, 245, 0.3); color: #fff; border-radius: 6px; font-size: 0.9rem;" />
                <button id="send-btn" style="background: linear-gradient(135deg, #1565c0, #1e88e5); color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: 600;">Send</button>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
}

function attachEventListeners() {
    const chatButton = document.getElementById('chat-button');
   const closeBtn = document.getElementById('close-btn');
    const chatPopup = document.getElementById('chat-popup');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    // Toggle popup
    chatButton.addEventListener('click', () => {
        chatPopup.style.display = chatPopup.style.display === 'none' ? 'flex' : 'none';
        if (chatPopup.style.display === 'flex') messageInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatPopup.style.display = 'none';
    });

    // Send message on button click or Enter key
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message to display
    addMessageToChat(message, 'user');
    
    // Try FAQ match first (instant response)
    const faqMatch = findFAQMatch(message);
    if (faqMatch) {
        setTimeout(() => addMessageToChat(faqMatch, 'assistant'), 300);
    } else {
        // No FAQ match - call Claude API
        callClaudeAPI(message);
    }
    
    input.value = '';
}

function findFAQMatch(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const faq of faqDatabase) {
        for (const keyword of faq.keywords) {
            if (lowerMessage.includes(keyword.toLowerCase())) {
                return faq.response;
            }
        }
    }
    
    return null; // No match found
}

function addMessageToChat(text, sender) {
    const container = document.getElementById('messages-container');
    const messageDiv = document.createElement('div');
    
    messageDiv.style.marginBottom = '12px';
    messageDiv.style.display = 'flex';
    messageDiv.style.flexDirection = sender === 'user' ? 'row-reverse' : 'row';
    messageDiv.style.gap = '10px';
    
    const contentDiv = document.createElement('div');
    contentDiv.style.maxWidth = '70%';
    contentDiv.style.padding = '10px 12px';
    contentDiv.style.borderRadius = '8px';
    contentDiv.style.wordWrap = 'break-word';
    contentDiv.style.fontSize = '0.9rem';
    contentDiv.style.lineHeight = '1.4';
    
    if (sender === 'user') {
        contentDiv.style.background = 'linear-gradient(135deg, #1565c0, #1e88e5)';
        contentDiv.style.color = 'white';
        contentDiv.style.borderBottomRightRadius = '2px';
    } else {
        contentDiv.style.background = '#2a2a2a';
        contentDiv.style.color = '#c8c8c8';
        contentDiv.style.borderBottomLeftRadius = '2px';
        contentDiv.style.borderLeft = '3px solid #1565c0';
    }
    
    contentDiv.innerHTML = text.replace(/\n/g, '<br>');
    messageDiv.appendChild(contentDiv);
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function callClaudeAPI(message) {
    addMessageToChat('⏳ Thinking...', 'assistant');
    
    fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('messages-container');
        const lastMessage = container.lastChild;
        if (lastMessage && lastMessage.textContent.includes('Thinking')) {
            lastMessage.remove();
        }
        addMessageToChat(data.reply || 'Sorry, I encountered an error. Please try again.', 'assistant');
    })
    .catch(err => {
        console.error('Claude API Error:', err);
        const container = document.getElementById('messages-container');
        const lastMessage = container.lastChild;
        if (lastMessage && lastMessage.textContent.includes('Thinking')) {
            lastMessage.remove();
        }
        addMessageToChat('Sorry, I\'m currently unavailable. Call (412) 752-8684 to speak with our team.', 'assistant');
    });
}

function sendPrompt(promptText) {
    const input = document.getElementById('message-input');
    input.value = promptText;
    input.focus();
    sendMessage();
}