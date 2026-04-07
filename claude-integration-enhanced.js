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
        keywords: ['vehicle type', 'what type', 'vehicle kind', 'sedan', 'suv', 'truck', 'van', 'coupe', 'car', 'automobile', 'crossover', 'minivan', 'pickup', 'exotic', 'luxury', 'sports car', 'convertible', 'have a', 'i have', 'my vehicle', 'my car', 'do you service', 'can you detail'],
        response: `🚗 **WHAT VEHICLE TYPE DO YOU HAVE?** I can help guide you to the perfect package!\n\n🔍 **PERSONAL VEHICLES** (Most Common):\n\n**SEDANS / COUPES / COMPACT CARS:**\n→ Pricing: Essential $65-85 | Executive $145-185 | Signature $325-425\n→ Examples: Honda Accord, Toyota Camry, BMW 3-Series, Mercedes C-Class, Nissan Altima\n→ Usually 4-5 hours for full detail\n\n**SUV / CROSSOVER / CUV / MINIVAN:**\n→ Pricing: Essential $75-95 | Executive $165-215 | Signature $375-475\n→ Examples: Toyota RAV4, Honda CR-V, Jeep Cherokee, Mazda CX-5, Dodge Caravan\n→ Usually 5-6 hours (larger interior/exterior area)\n\n**PICKUP TRUCKS / WORK TRUCKS:**\n→ Pricing: Essential $85-105 | Executive $185-235 | Signature $425-525\n→ Examples: Ford F-150, Chevy Silverado, Ram 1500, GMC Sierra\n→ Usually 5-7 hours depending on cab size and cargo area\n\n**LUXURY / EXOTIC / SPORTS CARS:**\n→ Pricing: Signature $325-425 | Presidential $650-850 | Ultimate Armor $1,285-1,685\n→ Examples: Tesla Model S, BMW M-series, Mercedes-AMG, Porsche, Lamborghini, Ferrari\n→ Recommend: Ultimate Armor with LIFETIME Ceramic Warranty!\n→ Usually 12-16 hours for top-tier protection\n\n**CONVERTIBLES / SOFT-TOPS:**\n→ Add +$65-95 for convertible top cleaning & conditioning\n→ All other pricing based on vehicle size (sedan or SUV level)\n\n⛵ **SPECIALTY VEHICLES** (We Service These Too!):\n\n**BOATS / YACHTS:**\n→ Small (up to 25ft): $285-385\n→ Medium (25-40ft): $585-885\n→ Large (41-60ft+): $885-1,485+\n→ Specialized: Salt spray removal, UV protection, marine-grade sealant\n\n🏠 **RV / MOTORHOME:**\n→ Class B: $285-500\n→ Class C: $600-1,200\n→ Luxury RV: $1,500-2,485+\n→ Includes: Roof treatment, slide-out care, rubber seal protection\n\n🏍️ **MOTORCYCLE / BIKE:**\n→ Road Ready: $85-105 (wash + wax)\n→ Chrome & Shine: $145-185 (chrome polishing + service)\n→ Show Bike: $245-295 (paint correction + ceramic)\n→ Handles: Sport bikes, cruisers, touring bikes, dirt bikes, vintage bikes\n\n✈️ **AIRCRAFT (General Aviation):**\n→ Pricing: $800-2,000+ (size/type dependent)\n→ Services: Oxidation removal, UV protection, cockpit detail\n→ Types: Cessna, Piper, Beechcraft, jets, helicopters\n\n🚛 **FLEET / COMMERCIAL (5+ Vehicles):**\n→ Cars: $45-155 (with 10-15% bulk discount)\n→ Vans/Trucks: $75-220 (with tiered discounts)\n→ Semi Trucks: $125-1,150 (custom pricing)\n→ Monthly Plans: $45-295/vehicle (recurring service)\n\n📍 **ISN'T SURE / MULTIPLE VEHICLES:**\nDescribe:\n• Car type: sedan, SUV, truck, van?\n• Vehicle color: Affects visible dirt/swirls\n• Condition: Clean, moderate dirt, heavy swirls?\n• Goal: Maintenance, restoration, luxury protection?\n\nTell me your vehicle type and I'll match you to the PERFECT package! 🎯`
    },
    {
        keywords: ['booking', 'schedule', 'reserve', 'book', 'appointment', 'when', 'available', 'hold', 'deposit'],
        response: `Perfect! Let's schedule you. Here's how simple it is:\n\n📅 BOOKING OPTIONS:\n1️⃣ Online: handsdetailshop.com/quote\n2️⃣ Phone: (412) 752-8684\n3️⃣ Text: (412) 752-8684 (fastest!)\n4️⃣ Here in chat with me!\n\n💰 DEPOSIT:\n→ Just $30 to secure your spot\n→ Applied to your final invoice\n→ Holds your preferred date/time\n\n⚡ SCHEDULING:\n→ Same-day service often available\n→ Best availability earlier in week\n→ Hours: Tues-Sun 8AM-6PM (Closed Monday)\n→ Open Tuesday through Sunday\n\n🎯 READY TO BOOK?\nTell me:\n• Your vehicle type (sedan, SUV, truck?)\n• Package interest (Essential, Executive, Premium?)\n• Preferred date/time\n• Your phone number\n\nI can get you on the calendar right now!`
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
        keywords: ['marine', 'yacht', 'boat', 'rv', 'motorhome', 'vessel', 'watercraft', 'ship', 'sailboat', 'speedboat', 'powerboat', 'fishing boat', 'pontoon', 'cabin cruiser', 'catamaran', 'sailboat', 'houseboat', 'jet ski', 'wakeboard', 'barge', 'tugboat'],
        response: `⛵ WE SPECIALIZE IN MARINE & RV DETAILING!\n\n🛥️ **YACHT & BOAT DETAILING:**\n• **Small Boat** (up to 25ft): $285-385\n  → Speedboats, fishing boats, center consoles\n• **Medium Yacht** (25-40ft): $585-885\n  → Cabin cruisers, express cruisers, day boats\n• **Large Yacht** (41-60ft+): $885-1,485+\n  → Luxury yachts, catamarans, raised pilothouse\n\n✓ Salt spray removal (critical!)\n✓ UV protection for teak/fiberglass\n✓ Marine-grade sealant application\n✓ Chrome hardware polishing\n✓ Interior cabin detailing available\n✓ Gel coat restoration\n✓ Hull cleaning & stain removal\n✓ Antifouling prep\n\n🏠 **RV & MOTORHOME DETAILING:**\n• **Class B RV** (Compact/Camper Van): $285-500\n• **Class C RV** (Mid-size Coach): $600-1,200\n• **Class A RV** (Large Luxury Coach): $900-1,500+\n• **Fifth Wheel / Travel Trailer**: $400-900\n• **Luxury RV**: $1,500-2,485+ (custom)\n\n✓ Full exterior restoration\n✓ Interior deep clean\n✓ Roof treatment & sealing\n✓ Slide-out care & lubrication\n✓ Rubber seal protection & dressing\n✓ Awning cleaning\n✓ Ceramic coating options available\n✓ Winterization detailing\n\n📍 **MOBILE SERVICE:**\n→ We come to your marina\n→ Storage facility\n→ Your home or destination\n→ Boat launch area\n→ RV park or storage lot\n→ Work around YOUR schedule\n\n💡 **UNIQUE MARINE CHALLENGES WE SOLVE:**\n✓ Salt water oxidation & corrosion\n✓ Algae growth on hulls\n✓ UV fading from sun exposure\n✓ Fresh water spots & mineral deposits\n✓ Oil/grease stains\n✓ Mildew & mold in cabins\n✓ Gel coat haziness\n✓ Winterization protective coating\n✓ Spring commissioning detailing\n\n🎯 **COMMON BOAT / RV TYPES WE SERVICE:**\n✓ Speedboats & performance boats\n✓ Fishing boats & center consoles\n✓ Sailboats & sailing yachts\n✓ Power yachts & luxury cruisers\n✓ Pontoon boats & deck boats\n✓ Cabin cruisers\n✓ Catamarans\n✓ Houseboats\n✓ Jet skis & personal watercraft\n✓ Wakeboard/ski boats\n✓ Class A, B, C motorhomes\n✓ Fifth wheels & travel trailers\n✓ Toy haulers\n✓ Pickup campers\n\n💰 **BOOKING & DEPOSIT:**\n→ $150 deposit secures your appointment\n→ Applied to your final invoice\n→ **📱 Pay deposit: https://square.link/u/x9N6BFTQ**\n→ Or call: (412) 752-8684\n\n🎯 EVERY VESSEL IS UNIQUE!\n→ Call for personalized quote: (412) 752-8684\n→ Email photos for better estimate\n→ We service entire 2-hour radius area\n→ Flexible scheduling for water season\n\nWhat type of boat or RV do you have? (size, age, primary water exposure?)`
    },
    {
        keywords: ['motorcycle', 'bike', 'sport', 'harley', 'cruiser', 'touring', 'dirt', 'street', 'sportster', 'dual-sport', 'adventure', 'retro', 'naked bike', 'crotch rocket', 'hog', 'off-road', 'atv', 'quad'],
        response: `🏍️ MOTORCYCLE SPECIALISTS - We handle ALL bikes!\n\n🎯 **OUR BIKE PACKAGES:**\n\n**Road Ready** - $85-105\n✓ Professional motorcycle wash\n✓ Premium hand wax\n✓ Tire shine application\n✓ Chain cleaning & lubrication\n✓ Fuel tank restoration\n✓ Perfect for: Regular maintenance & upkeep\n\n**Chrome & Shine** - $145-185 (POPULAR ⭐)\n✓ Everything in Road Ready, PLUS:\n✓ Chrome & metal polishing (pipes, guards, controls)\n✓ Extended chain service & conditioning\n✓ Seat conditioning & restoration\n✓ Detailed wheel cleaning & dressing\n✓ Engine case detailing\n✓ Perfect for: Performance riders & show prep\n\n**Show Bike** - $245-295 (TOP TIER 🏆)\n✓ Everything in Chrome & Shine, PLUS:\n✓ Paint correction & polishing\n✓ Professional ceramic coating (9H)\n✓ Show-ready concours finish\n✓ Glossy protective barriers\n✓ Engine bay deep detail\n✓ Perfect for: Show bikes, competitions, resale\n\n✨ **BIKE TYPES WE HANDLE:**\n✓ Sport bikes (Yamaha R1, Kawasaki Ninja, Suzuki GSX, Honda CBR)\n✓ Cruisers (Harley-Davidson, Indian, Triumph)\n✓ Touring bikes (Honda Goldwing, Harley Road Glide)\n✓ Dirt bikes & off-road (Honda CRF, Yamaha YZ)\n✓ Dual-sport & adventure bikes (Kawasaki Versys, BMW GS)\n✓ Retro / Classic / Vintage bikes\n✓ Naked bikes / Street fighters\n✓ Sportsters & commuter bikes\n✓ ATVs & quads\n✓ Custom builds & choppers\n✓ Scooters & mopeds\n\n🔧 **INCLUDED IN ALL PACKAGES:**\n✓ Professional washing (safe for sensitive parts)\n✓ Fuel tank restoration & polish\n✓ Fender & fairing detail\n✓ Engine case cleaning (water-safe)\n✓ Seat restoration & conditioning\n✓ Handlebar polishing\n✓ Wheel cleaning & tire shine\n✓ Brake & clutch lever shine\n✓ Exhaust pipe polish\n✓ Windscreen cleaning\n\n💡 **MEMBERSHIP AVAILABLE:**\n→ Biweekly motorcycle maintenance\n→ Save 20-30% vs one-time services\n→ Keep your bike show-ready year-round\n→ Priority scheduling\n\n🎯 **WHY PROFESSIONAL BIKE DETAIL:**\n→ Protects chrome from rust & corrosion\n→ Maintains resale value\n→ Makes washing/maintenance easier\n→ UV protection for paint & trim\n→ Safe for sensitive motorcyclecomponents\n→ Professional show-ready appearance\n\nWhat type of bike do you ride? (sportbike, cruiser, touring, dirt bike?)`
    },
    {
        keywords: ['aircraft', 'plane', 'hangar', 'cessna', 'piper', 'jet', 'wings', 'aviation', 'airplane', 'helicopter', 'turboprop', 'single-engine', 'twin-engine', 'experimental', 'float plane', 'bush plane'],
        response: `✈️ PROFESSIONAL AIRCRAFT DETAILING SERVICE\n\n🎯 **AIRCRAFT DETAILING EXPERTISE:**\n• Exterior detailing: $800-2,000+ (aircraft size-dependent)\n• Interior cabin: $300-600\n• Comprehensive quote: Custom pricing for specialty aircraft\n\n✨ **OUR SPECIALTY SERVICES:**\n✓ Oxidation removal (critical for aircraft)\n✓ High-altitude UV protection\n✓ Cockpit detailing & instruments\n✓ Windows & windscreen cleaning (Plexiglas-safe)\n✓ Fuel cap & ground handling areas\n✓ Specialized aviation sealants\n✓ Aluminum & composite polish\n✓ Anti-corrosion treatment\n✓ Propeller & spinner detailing\n✓ Underbelly cleaning\n\n🛩️ **AIRCRAFT TYPES WE SERVICE:**\nWe service ALL general aviation aircraft:\n\n**SINGLE-ENGINE PISTON:**\n✓ Cessna 172, 182, 206 (most common)\n✓ Piper Cherokee, Warrior, Arrow\n✓ Beechcraft Bonanza\n✓ Cirrus SR20 / SR22\n✓ Mooney M20 series\n→ Pricing: $800-1,200\n\n**TWIN-ENGINE / TURBOPROP:**\n✓ Cessna 310, 340, 414\n✓ Piper Aztec, Navajo\n✓ Beechcraft Baron, Duchess\n✓ King Air (all models)\n✓ Piper Mirage\n→ Pricing: $1,200-1,800+\n\n**LIGHT JETS:**\n✓ Cessna Citation (all models)\n✓ Beechcraft Learjet\n✓ Embraer Phenom\n✓ Cirrus Vision Jet\n→ Pricing: $1,500-2,000+\n\n**MEDIUM / LARGE JETS:**\n✓ Gulfstream series\n✓ Bombardier Challenger\n✓ Dassault Falcon\n✓ Citation X / Ultra\n→ Pricing: Call for custom quote\n\n**HELICOPTERS:**\n✓ Robinson R22 / R44 / R66\n✓ Sikorsky S-76\n✓ Airbus H125 / H145\n✓ Bell 407 / 429\n→ Pricing: $800-1,500+ (size-dependent)\n\n**EXPERIMENTAL / SPECIAL:**\n✓ Experimental (E-AB) aircraft\n✓ Float planes & amphibians\n✓ Bush planes\n✓ Vintage / classic aircraft\n✓ Custom builds\n→ Pricing: Custom quote\n\n🔒 **WHY PROFESSIONAL AIRCRAFT DETAIL:**\n→ Preserves paint & protective coatings\n→ Prevents corrosion & oxidation issues\n→ Maintains resale value (significant $$$)\n→ Professional appearance matters for business\n→ FAA-compliant service providers\n→ Insurance & warranty protection\n→ Extends aircraft longevity\n\n✅ **AIRCRAFT DETAILING BENEFITS:**\n✓ Improved aesthetics for business image\n✓ Extended paint protection\n✓ Easier maintenance between details\n✓ Corrosion prevention\n✓ UV damage prevention\n✓ Resale value maintenance\n✓ Professional inspection during service\n\n📍 **ON-SITE SERVICE:**\n→ We come to your hangar\n→ FBO (Fixed Base Operator)\n→ Private airstrip\n→ Your preferred location\n→ Flexible scheduling around flight ops\n\n📞 **AIRCRAFT DETAILING CONSULTATION:**\n→ Call directly: (412) 752-8684\n→ Describe aircraft type, model, year, condition\n→ Discuss specific concerns (oxidation, damage, etc.)\n→ Custom quote provided\n→ Flexible scheduling (understand aircraft operations)\n→ Mobile service to hangar\n\n💡 **WHAT TO EXPECT:**\n→ Professional air force-trained handlers\n→ Careful treatment of all components\n→ Interior & exterior expertise\n→ High-end materials & techniques\n→ Satisfaction guaranteed\n→ Post-service inspection\n\nWhat aircraft do you own/operate? (type, model, condition?)`
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
        keywords: ['add-on', 'add on', 'upgrade', 'enhancement', 'extra', 'correction', 'polish', 'protection', 'coating', 'ceramic', 'headlight', 'scratch', 'swirl', 'leather', 'odor', 'pet'],
        response: `✨ PREMIUM ADD-ON SERVICES - Enhance Any Detail!\n\n🎯 DETAILING ADD-ONS ($25-$100):\n\n**Interior Upgrades:**\n• Odor Elimination (ozone treatment): $55-$75\n• Pet Hair Removal: $35-$65\n• Carpet Shampoo & Hot Water Extract: $65-$95\n• Leather Deep Condition & Protect: $55\n• Interior Fabric Protection Spray: $45\n• Door Jamb Full Deep Clean: $25\n• Trunk Deep Clean & Shampoo: $40\n• Child / Booster Seat Detail (per seat): $25\n\n**Exterior Upgrades:**\n• Headlight Restoration (pair): $65\n• Engine Bay Clean & Degrease: $75-$100\n• Scratch & Swirl Polish (per panel): $45-$80\n• Rain-X Hydrophobic Glass Treatment: $30\n• Wheel Sealant / Coating: $45\n• Paint Decontamination (clay bar): $65-$90\n• Convertible Top Clean & Condition: $65-$95\n• Bug & Tar Removal: $35-$65\n\n💎 COMPOUNDING, CORRECTION & PROTECTION ($45-$575):\n\n**Wax & Sealants:**\n• Carnauba Hand Wax — Cars: $55 | SUV/Truck: $75\n• Paint Sealant Application — Cars: $85 | SUV/Truck: $110\n\n**Paint Correction:**\n• Compound Buff Only — Cars: $95 | SUV/Truck: $125\n• Machine Polish Only — Cars: $85 | SUV/Truck: $110\n• Single-Stage Correction — Cars: $195-$265 | SUV/Truck: $250-$345\n• Two-Stage Correction (heavy defects) — Cars: $325-$450 | SUV/Truck: $425-$575\n• Spot Correction (per panel): $55-$95\n\n**Premium Protection:**\n• Ceramic Coating — Cars (1yr): $295\n• Ceramic Coating — SUV/Truck: $375\n• Ceramic Coating — Motorcycle: $195\n• Ceramic Coating — Premium Multi-Layer (2-5yr): Call\n• Ceramic Interior Coating — Cars: $295 | SUV/Truck: $365\n\n⚠️ CERAMIC COATING PRO TIP:\n→ Paint Correction or Clay Bar MUST be done first!\n→ Ceramic locks in paint condition — if swirls/scratches exist, they're permanent\n→ The difference between $1,000 detail and $100 problem avoided!\n\n🎯 BEST ADD-ON COMBINATIONS:\n\n**BUDGET UPGRADE** ($45-$100):\n→ Add to Essential: Tire Sealant + Headlight Restoration\n→ Perfect: Keeps tires looking sharp + safe visibility\n\n**POPULAR UPGRADE** ($150-$250):\n→ Add to Executive: Scratch/Swirl Polish + Carnauba Wax\n→ Benefits: Improved shine + paint protection\n\n**PREMIUM PROTECTION** ($300-$475):\n→ Add to Signature: Single-Stage Correction + Ceramic Coating\n→ Result: Professional correction + 1-year protection!\n\n**ULTIMATE INVESTMENT** ($500+):\n→ Add to Presidential: Two-Stage Correction + Premium Ceramic\n→ Benefit: Multi-year protection with lifetime warranty option\n\n💡 CUSTOMIZE YOUR PACKAGE:\nTell me your priorities and I'll suggest the perfect add-ons:\n• Want better shine? → Polish/Wax services\n• Want long-term protection? → Ceramic coating\n• Want to fix imperfections? → Paint correction\n• Want interior refresh? → Odor/Pet/Shampooing\n\n📞 LIMITED ADD-ON CONSULTATION:\nCall: (412) 752-8684\nChat with me here for recommendations!\n\nWhat type of enhancement interests you?`
    },
    {
        keywords: ['first time', 'discount', 'coupon', 'promo', 'offer', 'new customer', 'deal', 'special'],
        response: `🎉 WELCOME TO HANDS DETAIL SHOP!\n\n✨ FIRST-TIME CUSTOMER SPECIAL:\n→ **15% OFF any package over $150**\n→ No code needed!\n→ Just mention it's your first visit\n→ Automatically applied\n\n💡 EXAMPLES OF FIRST-TIME SAVINGS:\n• Executive ($165): **$24.75 OFF** → just $140\n• Signature ($375): **$56.25 OFF** → just $318\n• Presidential ($750): **$112.50 OFF** → just $637\n• Ultimate Armor ($1,500): **$225 OFF** → just $1,275\n\n🌟 ALSO GET:\n✓ Satisfaction guarantee on all work\n✓ Professional Air Force-trained service\n✓ 16 years of expertise\n✓ 5,000+ satisfied customers\n✓ Mobile convenience\n✓ Transparent pricing\n\n🎯 HOW TO CLAIM:\n1. Book your service\n2. Tell us it's your first time\n3. Discount automatically applied\n4. Enjoy premium detailing!\n\n📞 READY TO EXPERIENCE THE DIFFERENCE?\nCall: (412) 752-8684\nText for booking: (412) 752-8684\nOnline: handsdetailshop.com/quote\n\nWhat package interests you?`
    },
    {
        keywords: ['how long', 'timeline', 'how fast', 'rush', 'urgent', 'emergency', 'today', 'quick', 'time'],
        response: `⏱️ SERVICE TIMELINE:\n\n🚀 STANDARD PACKAGES:\n• Essential Detail: 2-3 hours\n• Executive Detail: 4-5 hours\n• Premium Plus: 5-6 hours\n• Signature Package: 6-7 hours\n• Presidential Elite: 8-10 hours\n• Ultimate Armor: 12-14 hours (may need 1-2 days)\n\n⚡ SAME-DAY SERVICE:\n✓ Often available Tues-Sat\n✓ Call ASAP for availability\n✓ Better availability earlier in week\n✓ 3+ hour packages most likely to fit same-day\n✓ Shorter packages (Essential/Executive) easier to schedule same-day\n\n🚨 EMERGENCY DETAIL:\n✓ We can often accommodate rush requests\n✓ Call immediately: (412) 752-8684\n✓ May require appointment later that day or next available\n✓ Mobile service = flexible scheduling\n✓ Additional rush fee may apply for same-day requests\n\n📅 TYPICAL BOOKING:\n→ Tues-Wed: Best availability\n→ Thu-Fri: Good availability\n→ Sat: More limited\n→ Sun: By appointment only\n→ Monday: CLOSED (Sabbath)\n\n💡 PRO TIPS:\n✓ Book ahead for best times\n✓ Weekday bookings more flexible\n✓ Morning appointments get out faster\n✓ Shorter packages = more availability\n\n🤔 NEED QUICK SERVICE?\nConsider:\n• Essential Detail (2-3 hrs) for fast refresh\n• Executive Detail (4-5 hrs) for comprehensive quick detail\n\nWhen do you need the service done?`
    },
    {
        keywords: ['area', 'service area', 'location', 'where', 'distance', 'pennsylvania', 'ohio', 'maryland', 'west virginia', 'coverage'],
        response: `📍 SERVICE AREA:\n\n✅ PRIMARY SERVICE AREA:\n→ Pittsburgh, PA & immediate surroundings\n\n✅ EXTENDED SERVICE AREA:\n→ Within 2-hour radius from Pittsburgh\n→ Includes: Parts of PA, OH, WV, MD\n→ Custom locations available\n\n🗺️ COVERAGE INCLUDES:\n✓ Downtown Pittsburgh\n✓ North Shore & Strip District\n✓ South Hills areas\n✓ West End neighborhoods\n✓ North Hills suburbs\n✓ Eastern suburbs\n✓ Arnold, PA area (primary service hub)\n✓ All surrounding metro areas\n✓ Vacation/destination detailing available\n\n🚗 MOBILE SERVICE:\n→ We come to YOUR location\n→ Driveway, parking lot, office\n→ Marina for yacht/boat service\n→ Storage facility\n→ Hangar for aircraft\n→ Weather-friendly service areas preferred\n\n🌧️ WEATHER CONSIDERATIONS:\n→ Best results in dry conditions\n→ Can work in light rain with adjustments\n→ Covered areas help with winter service\n→ We adapt to your location's conditions\n\n📞 OUTSIDE OUR AREA?\n→ Call to discuss: (412) 752-8684\n→ May be possible for special requests\n→ Large commercial fleets: custom arrangements\n→ Corporate packages: location flexibility\n\n💡 NO DRIVE REQUIRED:\n→ Service comes to you\n→ No need to drop off car\n→ Stay home while we work\n→ Perfect for busy professionals\n\nWhere are you located?`
    },
    {
        keywords: ['contact', 'phone', 'call', 'text', 'email', 'hours', 'open', 'closed', 'facebook', 'instagram'],
        response: `📞 GET IN TOUCH - Multiple Ways to Reach Us!\n\n☎️ PHONE:\n→ **(412) 752-8684**\n→ Direct line to Nazir\n→ Tues-Sun 8AM-6PM (Closed Monday)\n→ Best for urgent questions\n\n💬 TEXT:\n→ **(412) 752-8684**\n→ Fast responses during hours\n→ Great for scheduling!\n→ Tues-Sun 8AM-6PM (Closed Monday)\n\n📧 EMAIL:\n→ **handsdetailshop@gmail.com**\n→ Detailed inquiries\n→ Respond within 24 hours\n→ Photos welcome for quotes\n\n🌐 ONLINE:\n→ **handsdetailshop.com**\n→ Booking portal: handsdetailshop.com/quote\n→ Instant quote request\n→ Gallery & testimonials\n\n📱 SOCIAL MEDIA:\n→ Instagram: @handsdetailshop\n→ Facebook: Hands Detail Shop\n→ See before/after photos\n→ Customer testimonials\n→ Service updates\n\n🕐 BUSINESS HOURS:\n→ **Tuesday-Sunday: 8AM-6PM**\n→ **Monday: Closed (Sabbath)** \n→ **Holidays: Call for hours**\n\n⏱️ RESPONSE TIMES:\n→ Phone/Text: Answered immediately during hours\n→ Email: Within 24 hours\n→ Online booking: Usually responded to within 2 hours\n→ After-hours: Callback next day\n\n🏪 LOCATION:\n→ Mobile service (come to you!)\n→ Service hub: Arnold, PA area\n→ 2-hour service radius from Pittsburgh\n\n💡 BEST WAY TO REACH US?\n✓ For quick scheduling: TEXT (412) 752-8684\n✓ For questions: CALL (412) 752-8684\n✓ For detailed inquiry: EMAIL handsdetailshop@gmail.com\n✓ To book online: Visit handsdetailshop.com/quote\n\nHow can we help you today?`y**\n→ **Holidays: Call for hours**\n\n⏱️ RESPONSE TIMES:\n→ Phone/Text: Answered immediately during hours\n→ Email: Within 24 hours\n→ Online booking: Usually responded to within 2 hours\n→ After-hours: Callback next day\n\n🏪 LOCATION:\n→ Mobile service (come to you!)\n→ Service hub: Arnold, PA area\n→ 2-hour service radius from Pittsburgh\n\n💡 BEST WAY TO REACH US?\n✓ For quick scheduling: TEXT (412) 752-8684\n✓ For questions: CALL (412) 752-8684\n✓ For detailed inquiry: EMAIL handsdetailshop@gmail.com\n✓ To book online: Visit handsdetailshop.com/quote\n\nHow can we help you today?`
    },
    {
        keywords: ['deposit', 'payment', 'method', 'pay', 'credit card', 'venmo', 'paypal', 'square', 'cash', 'financing'],
        response: `💰 DEPOSIT & PAYMENT OPTIONS\n\n💳 DEPOSIT TO SECURE APPOINTMENT:\n\n🚗 **PERSONAL VEHICLES & STANDARD SERVICES:**\n→ $30 deposit holds your spot\n→ Applied to your final invoice\n→ **Pay deposit here:** handsdetailshop.com/quote\n\n⛵ **MARINE & RV DETAILING:**\n→ $150 deposit secures your appointment\n→ Applied to your final invoice\n→ **Pay deposit here:** https://square.link/u/x9N6BFTQ\n\nℹ️ DEPOSIT INFORMATION:\n→ Deposits are NON-REFUNDABLE but fully credited\n→ Reschedule within 30 days: deposit stays valid\n→ Holds your preferred date/time\n\n✅ PAYMENT METHODS:\n• Cash (at service)\n• Venmo (secure mobile payment)\n• PayPal (online payment)\n• Square (card processing) ⭐\n• Apple Pay (at service)\n• Wire transfer (large fleet jobs)\n\n🎯 PAYMENT TIMING:\n→ Deposit due to confirm booking\n→ Final payment at service completion\n→ Can pay deposit + final payment day-of\n→ Or split into installments for large packages\n\n📊 PRICING NOTES:\n✓ All prices include mobile service\n✓ NO hidden fees\n✓ Transparent quotes provided\n✓ Weather impacts (rain) discussed upfront\n✓ Vehicle size affects pricing within ranges\n✓ First-time discount: 15% OFF packages over $150\n\n🏢 COMMERCIAL/FLEET TERMS:\n✓ Bulk discounts available\n✓ NET 30 payment terms possible\n✓ Invoice billing available\n✓ Monthly automated billing (memberships)\n✓ Custom payment plans for large contracts\n\n🤝 SATISFACTION GUARANTEE:\n→ If not satisfied: we make it right\n→ Your satisfaction is guaranteed\n→ Rework available if needed\n→ Professional service standard\n\n📞 PAYMENT QUESTIONS?\nCall: (412) 752-8684\nText: (412) 752-8684\nEmail: handsdetailshop@gmail.com\n\nReady to book with deposit?`
    },
    {
        keywords: ['upsell', 'upgrade', 'better package', 'next tier', 'add-on', 'loyalty', 'recommendation'],
        response: `✨ UPGRADE OPTIONS TO CONSIDER:\n\n🎯 IF YOU'RE CHOOSING ESSENTIAL ($65-85):\nConsider stepping up to **EXECUTIVE ($145-185)**:\n→ Only $70-100 more\n→ Adds leather conditioning (keeps interior pristine)\n→ Includes paint wax protection (lasts 1-2 months)\n→ Deep interior detailing\n→ Most owners' favorite choice!\n→ **Best value in our lineup**\n\n🎯 IF YOU'RE DOING EXECUTIVE (Most Popular):\nConsider **MEMBERSHIP PLAN** ($110/month):\n→ Do this every 2 weeks instead of one-time\n→ Saves you 20% vs one-off services\n→ Keeps vehicle in pristine condition\n→ Priority scheduling guaranteed\n→ Professional consistency\n\n🎯 IF YOU'RE DOING SIGNATURE ($325-425):\nConsider adding **CERAMIC COATING** upgrade:\n→ Jump to **PRESIDENTIAL** ($650-850)\n→ Gets you paint sealant + advanced protection\n→ 12-month warranty\n→ Better long-term value\n\n💎 IF YOU HAVE A LUXURY/NEW VEHICLE:\nRecommend **ULTIMATE ARMOR** ($1,285-1,685):\n→ Professional ceramic coating (9H)\n→ **LIFETIME WARRANTY**\n→ Protects paint investment for years\n→ Essentially insurance for your paint\n→ One-time investment, permanent protection\n→ Saves money long-term\n\n👨‍👩‍👧‍👦 IF YOU HAVE MULTIPLE VEHICLES:\nJoin **MULTI-CAR HOUSEHOLD PLAN**:\n→ Two-Car Premium: $190/month (save $30/month!)\n→ Three-Car Ultimate: $270/month (save $60/month!)\n→ All vehicles get biweekly service\n→ Same-day for all\n→ Best for families\n\n🎯 ALWAYS CONSIDER:\n→ Ceramic coating extends shine 10x longer\n→ Membership is best value for ongoing care\n→ Leather conditioning prevents cracking\n→ Paint sealant saves money long-term\n→ Multi-car discounts reward loyalty\n\nNothing pushy - just helping you get best value! What sounds interesting?`
    },
    {
        keywords: ['fleet', 'commercial', 'business', 'company vehicle', 'corporate', 'multiple vehicles', 'van', 'truck', 'semi', 'box truck', 'shuttle', 'bulk', 'volume', 'discount', 'tiered', 'sprinter', 'transit', 'work truck', 'cargo van', 'tractor trailer', 'tractor-trailer', 'trailer', '18-wheeler', 'rig', 'tow truck', 'delivery truck', 'dump truck', 'service vehicle'],
        response: `🚛 FLEET & COMMERCIAL DETAILING - Professional Volume Service!\n\n💼 **FLEET TIER DISCOUNT STRUCTURE:**\n• **TIER 1**: 2–5 Vehicles → Full Pricing\n• **TIER 2**: 6–15 Vehicles → **10% DISCOUNT**\n• **TIER 3**: 16+ Vehicles → **15% DISCOUNT**\n\n🚗 **FLEET VEHICLE PRICING BY TYPE:**\n\n**CARS / SEDANS / COUPES:**\n• Exterior Wash Only: $45\n• Interior Only: $50\n• Full Detail — Basic: $85\n• Full Detail — Standard: $115\n• Full Detail — Deep: $155\n\n**SUV / CROSSOVER / MINIVAN:**\n• Exterior Wash Only: $60\n• Interior Only: $65\n• Full Detail — Basic: $110\n• Full Detail — Standard: $145\n• Full Detail — Deep: $190\n\n**CARGO VAN / FULL-SIZE TRUCK / WORK VAN:**\n• Exterior Wash Only: $75\n• Interior Only (cab area): $75\n• Cargo Area Clean: $55\n• Full Detail — Basic: $130\n• Full Detail — Standard: $175\n• Full Detail — Deep: $220\n\n**BOX TRUCK / SPRINTER / TRANSIT / SHUTTLE BUS:**\n• Exterior Wash Only: $95\n• Interior Only (cab): $85\n• Passenger/Cargo Interior Detail: $120–$165\n• Full Detail — Basic: $165\n• Full Detail — Standard: $220\n• Full Detail — Deep: $275\n\n**SEMI TRUCK & TRACTOR-TRAILER (Most Comprehensive):**\n• Exterior Wash — Cab Only: $125–$165\n• Exterior Wash — Cab + Trailer (53ft): $225–$295\n• Interior Detail — Cab: $95–$135\n• Full Detail — Cab Only: $195–$275\n• Full Detail — Cab + Trailer: $325–$450\n• Aluminum/Chrome Polish — Cab: $175–$275\n• Aluminum/Chrome Polish — Full Rig: $350–$550\n\n**COMPOUND & OXIDATION REMOVAL — SEMI / TRAILER:**\n• Compound Buff — Cab Only: $275–$400\n• Compound Buff — Cab + Trailer: $475–$750\n• Machine Polish add-on — Cab: +$150–$225 | Full Rig: +$275–$425\n• Full Paint Correction — Cab: $400–$600 | Cab + Trailer: $725–$1,150\n\n📅 **FLEET MONTHLY RECURRING PLANS:**\n\n**1. Basic Wash Plan** — $45/vehicle/month (SUV: $60)\n→ 1 exterior wash per month + tire dressing\n\n**2. Interior Plan** — $50/vehicle/month (SUV: $65)\n→ 1 interior detail per month\n\n**3. Wash + Interior Plan** — $85/vehicle/month (SUV: $110)\n→ 2 visits: 1 wash + 1 interior per month\n\n**4. Standard Detail Plan** — $110/vehicle/month (SUV: $140)\n→ 1 full detail service per month\n\n**5. Bi-Weekly Wash Plan** — $80/vehicle/month (SUV: $105)\n→ 2 exterior washes per month\n\n**6. Full Care Plan** — $175/vehicle/month (SUV: $225)\n→ 2 washes + 1 comprehensive detail per month\n\n**7. Executive Fleet Plan** — $235/vehicle/month (SUV: $295)\n→ 4 washes + 1 deep detail per month\n\n💰 **FLEET ACCOUNT BENEFITS:**\n✓ Bulk volume discounts (save 10-15%!)\n✓ NET-15 invoicing available\n✓ Dedicated fleet coordinator\n✓ Priority scheduling\n✓ Flexible service dates\n✓ Monthly automated billing\n✓ Custom service contracts\n✓ Transparent per-vehicle reporting\n✓ Fleet inspection reports\n✓ 7-day cancellation notice on recurring plans\n\n🔧 **COMMON FLEET VEHICLE TYPES:**\n✓ Service vehicles (HVAC, plumbing, electrical)\n✓ Delivery trucks (DoorDash, Amazon, UPS)\n✓ Tow trucks & recovery vehicles\n✓ Dump trucks & construction vehicles\n✓ Box trucks (24ft, 26ft, moving trucks)\n✓ Sprinter vans & transit vans\n✓ Shuttle buses & mini-coaches\n✓ Semi trucks & tractor-trailers\n✓ Refrigerated trucks (reefer trailers)\n✓ Flatbed trucks\n✓ Tank trucks\n✓ Dump trailers\n✓ Enclosed trailers\n✓ Open car haulers\n\n🔧 **COMMERCIAL ADVANTAGES:**\n→ Mobile service (reduces downtime)\n→ Multiple vehicles same-day coordination\n→ Consistent professional appearance\n→ Extended vehicle life\n→ Professional fleet image = better business\n→ Bulk savings = profit margin improvement\n→ Integrated scheduling\n→ Maintenance tracking\n\n📞 **FLEET CONSULTATION:**\n→ Call directly: (412) 752-8684\n→ Email: handsdetailshop@gmail.com\n→ Describe: Fleet size, vehicle types, service goals\n→ We'll design custom fleet package\n→ Custom quote based on YOUR needs\n→ NET-15 invoicing available\n→ Flexible contract terms\n\nHow many vehicles are in your fleet? (types & sizes?)`
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