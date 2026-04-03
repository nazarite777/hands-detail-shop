#!/usr/bin/env python3
# Generate the new marine-services.html file

html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Marine Detailing Services — Hands Detail Shop | Pittsburgh</title>
<meta name="description" content="Premium marine detailing for yachts, boats, RVs. Professional packages from Rinse Down to Full Restoration. Mobile service PA, OH, WV, MD.">
<link rel="canonical" href="https://handsdetailshop.com/marine-services.html">
<meta property="og:type" content="website"><meta property="og:url" content="https://handsdetailshop.com/marine-services.html">
<meta property="og:title" content="Marine Detailing Services — Hands Detail Shop">
<meta property="og:description" content="Premium marine detailing from bow to stern.">
<link rel="stylesheet" href="styles.css">
<style>
:root { --navy: #0a1628; --deep: #0d1f3c; --ice: #4fa8d5; --gold: #c9963a; --gold-light: #e8b84b; --white: #f0f4f8; --muted: #7a9ab8; --steel: #2d6a9f; --hull: #1c3352; }
.marine-container { max-width: 1100px; margin: 0 auto; }
.marine-hero { text-align: center; padding: 40px 0; }
.marine-hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: 72px; letter-spacing: 2px; margin-bottom: 10px; }
.marine-hero h1 span { color: var(--ice); display: block; }
.packages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 60px 0; }
.pkg-card { background: var(--deep); border: 1px solid rgba(45,106,159,0.3); padding: 32px; position: relative; }
.pkg-card.featured { border-color: var(--gold); }
.pkg-name { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 1px; margin: 10px 0; }
.price-range { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--gold-light); }
.services-list { list-style: none; }
.services-list li { font-size: 13px; margin: 8px 0; display: flex; gap: 8px; }
.services-list li:before { content: "—"; color: var(--ice); flex-shrink: 0; }
.addon-item { background: var(--hull); border: 1px solid rgba(45,106,159,0.2); padding: 20px; }
.pricing-note { background: var(--hull); border-left: 4px solid var(--ice); padding: 24px; margin: 40px 0; }
@media (max-width: 600px) { .marine-hero h1 { font-size: 42px; } .packages-grid { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<header id="header"><div class="nav-container"><div class="logo-section"><a href="index.html" style="display: flex; align-items: center; text-decoration: none;"><img src="20200723_030424~2.png" alt="Hands Detail Shop Logo" class="logo-img"><div style="display: none; font-size: 1.5rem; font-weight: 800; color: #c0c0c0;">HANDS DETAIL</div></a></div><nav class="nav-menu"><a href="index.html" class="nav-link">Home</a><a href="our-story.html" class="nav-link">Our Story</a><div class="services-dropdown"><button class="services-dropdown-btn nav-link" onclick="toggleServicesDropdown(this)">Services</button><div class="dropdown-menu"><a href="services.html" class="dropdown-item">📋 All Services</a><a href="personal-vehicles.html" class="dropdown-item">🚗 Personal</a><a href="marine-services.html" class="dropdown-item">🛥️ Marine</a><a href="fleet-services.html" class="dropdown-item">🚛 Fleet</a><a href="motorcycle-services.html" class="dropdown-item">🏍 Motorcycle</a><a href="aircraft-services.html" class="dropdown-item">✈️ Aircraft</a></div></div><a href="membership.html" class="nav-link">Membership</a><a href="gallery.html" class="nav-link">Gallery</a><a href="quote.html" class="nav-link">Quote</a><a href="contact.html" class="nav-link">Contact</a><div class="contact-header"><span class="hours-header">🕒 Mon-Sat 8AM-6PM</span><a href="tel:4127528684" class="btn-call">📞 Call</a><a href="sms:4127528684" class="btn-text">💬 Text</a><a href="#" onclick="openBookingModal(); return false;" class="cta-header">Book</a></div></nav></div></header>
<div class="promo-banner" style="margin-top: 70px;">🎊 SPRING MARINE: Prepare Your Vessel | 15% OFF First-Times | 💎 FREE Sealant | 💳 $30 Deposit Books | 📞 (412) 752-8684</div>
<section style="background: #0a1628; color: #f0f4f8; padding: 60px 24px;">
<div class="marine-container">
<div class="marine-hero"><div style="color: var(--gold); font-size: 11px; letter-spacing: 4px; text-transform: uppercase;">Hands Detail Shop · Marine Division</div><h1>MARINE<span>DETAILING</span></h1><p style="color: var(--muted); font-size: 18px;">From personal watercraft to luxury yachts</p></div>
<div class="packages-grid">
<div class="pkg-card"><div style="width: 40px; height: 3px; background: #4fa8d5; margin-bottom: 20px;"></div><div style="color: var(--muted); font-size: 10px; text-transform: uppercase;">Package 01</div><div class="pkg-name" style="color: #4fa8d5;">RINSE DOWN</div><p style="color: var(--muted); font-size: 13px;">Quick maintenance wash</p><div style="padding: 16px 0; border-top: 1px solid rgba(45,106,159,0.3); border-bottom: 1px solid rgba(45,106,159,0.3);"><div style="color: var(--muted); font-size: 9px;">Starting At</div><div class="price-range">$3–$6 / ft</div></div><ul class="services-list"><li>Fresh water rinse</li><li>Deck rinse & gutter</li><li>Glass wipe</li><li>Scum line removal</li></ul></div>
<div class="pkg-card"><div style="width: 40px; height: 3px; background: #2d6a9f; margin-bottom: 20px;"></div><div style="color: var(--muted); font-size: 10px; text-transform: uppercase;">Package 02</div><div class="pkg-name" style="color: #a8d8ea;">WASH & PROTECT</div><p style="color: var(--muted); font-size: 13px;">Maintenance detail</p><div style="padding: 16px 0; border-top: 1px solid rgba(45,106,159,0.3); border-bottom: 1px solid rgba(45,106,159,0.3);"><div style="color: var(--muted); font-size: 9px;">Starting At</div><div class="price-range">$10–$16 / ft</div></div><ul class="services-list"><li>Hull wash</li><li>Deck scrub</li><li>Stainless polish</li><li>Light sealant</li></ul></div>
<div class="pkg-card featured"><div style="position: absolute; top: 16px; right: -24px; background: var(--gold); color: var(--navy); font-size: 9px; font-weight: 700; letter-spacing: 2px; padding: 5px 36px; transform: rotate(35deg);">POPULAR</div><div style="width: 40px; height: 3px; background: #c9963a; margin-bottom: 20px;"></div><div style="color: var(--muted); font-size: 10px; text-transform: uppercase;">Package 03</div><div class="pkg-name" style="color: #e8b84b;">WASH + WAX</div><p style="color: var(--muted); font-size: 13px;">Seasonal detail</p><div style="padding: 16px 0; border-top: 1px solid rgba(45,106,159,0.3); border-bottom: 1px solid rgba(45,106,159,0.3);"><div style="color: var(--muted); font-size: 9px;">Starting At</div><div class="price-range">$20–$25 / ft</div></div><ul class="services-list"><li>Full wash & protect</li><li>Polymer wax</li><li>3-month protection</li><li>Brightwork polish</li></ul></div>
<div class="pkg-card"><div style="width: 40px; height: 3px; background: #7ec8a0; margin-bottom: 20px;"></div><div style="color: var(--muted); font-size: 10px; text-transform: uppercase;">Package 04</div><div class="pkg-name" style="color: #7ec8a0;">FULL DETAIL</div><p style="color: var(--muted); font-size: 13px;">Interior + exterior</p><div style="padding: 16px 0; border-top: 1px solid rgba(45,106,159,0.3); border-bottom: 1px solid rgba(45,106,159,0.3);"><div style="color: var(--muted); font-size: 9px;">Starting At</div><div class="price-range">$25–$35 / ft</div></div><ul class="services-list"><li>Everything in Wash+Wax</li><li>Cockpit detail</li><li>Vinyl cleaning</li><li>Canvas treatment</li></ul></div>
<div class="pkg-card"><div style="width: 40px; height: 3px; background: #e8b84b; margin-bottom: 20px;"></div><div style="color: var(--muted); font-size: 10px; text-transform: uppercase;">Package 05</div><div class="pkg-name" style="color: #e8b84b;">COMPOUND + WAX</div><p style="color: var(--muted); font-size: 13px;">Oxidation removal</p><div style="padding: 16px 0; border-top: 1px solid rgba(45,106,159,0.3); border-bottom: 1px solid rgba(45,106,159,0.3);"><div style="color: var(--muted); font-size: 9px;">Starting At</div><div class="price-range">$35–$50 / ft</div></div><ul class="services-list"><li>Heavy-cut compound</li><li>Machine polish</li><li>Polymer wax</li><li>3–4 months protection</li></ul></div>
<div class="pkg-card"><div style="width: 40px; height: 3px; background: linear-gradient(90deg,#c9963a,#4fa8d5); margin-bottom: 20px;"></div><div style="color: var(--muted); font-size: 10px; text-transform: uppercase;">Package 06</div><div class="pkg-name">YARD RESTORATION</div><p style="color: var(--muted); font-size: 13px;">Full vessel overhaul</p><div style="padding: 16px 0; border-top: 1px solid rgba(45,106,159,0.3); border-bottom: 1px solid rgba(45,106,159,0.3);"><div style="color: var(--muted); font-size: 9px;">Starting At</div><div class="price-range">$55–$125 / ft</div></div><ul class="services-list"><li>Everything + multi-pass</li><li>Full interior deep clean</li><li>Teak treatment</li><li>10–11 month ceramic</li></ul></div>
</div>

<div style="margin: 60px 0; padding: 20px 0; border-top: 2px solid var(--steel); border-bottom: 2px solid var(--steel);"><h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 2px; margin-bottom: 24px;">ADD-ONS & À LA CARTE</h2>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
<div class="addon-item"><div style="color: white; font-weight: bold;">Ceramic Coating</div><div style="color: var(--gold-light);">$75–$125 / ft</div><div style="font-size: 12px; color: var(--muted);">12–24 months UV protection</div></div>
<div class="addon-item"><div style="color: white; font-weight: bold;">Teak Treatment</div><div style="color: var(--gold-light);">$8–$15 / ft</div><div style="font-size: 12px; color: var(--muted);">Clean, sand, and oil</div></div>
<div class="addon-item"><div style="color: white; font-weight: bold;">Barnacle Removal</div><div style="color: var(--gold-light);">$1–$5 / ft</div><div style="font-size: 12px; color: var(--muted);">Mechanical removal</div></div>
<div class="addon-item"><div style="color: white; font-weight: bold;">Canvas & Bimini</div><div style="color: var(--gold-light);">$75–$200 flat</div><div style="font-size: 12px; color: var(--muted);">UV protectant applied</div></div>
<div class="addon-item"><div style="color: white; font-weight: bold;">Metal Polish</div><div style="color: var(--gold-light);">$50–$150 flat</div><div style="font-size: 12px; color: var(--muted);">Mirror finish</div></div>
<div class="addon-item"><div style="color: white; font-weight: bold;">Wet Sanding</div><div style="color: var(--gold-light);">$15–$25 / ft</div><div style="font-size: 12px; color: var(--muted);">Per pass, severe damage</div></div>
</div>
</div>

<div class="pricing-note"><strong style="color: var(--ice);">PRICING NOTES:</strong> Priced per linear foot. Starting prices — final quote based on condition, complexity, location. Flybridges/towers higher. 30+ ft interior: $100–$125/hr. Barnacle removal, wet sanding, bilge cleaning are add-on only. All boats assessed on-site.</div>

<div style="background: var(--hull); padding: 40px; text-align: center; margin: 40px -24px 0 -24px;">
<h2 style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; margin-bottom: 16px;">Ready to Detail Your Vessel?</h2>
<p style="color: var(--muted); margin-bottom: 24px;">Send photos and specs for a free quote.</p>
<div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
<a href="#" onclick="openBookingModal(); return false;" style="background: linear-gradient(135deg, #4fa8d5, #2d6a9f); color: white; padding: 12px 28px; text-decoration: none; font-weight: 700;">📅 BOOK NOW</a>
<a href="quote.html" style="background: transparent; color: var(--gold-light); border: 2px solid var(--gold-light); padding: 10px 26px; text-decoration: none; font-weight: 700;">📝 GET QUOTE</a>
<a href="tel:4127528684" style="background: transparent; color: var(--ice); border: 2px solid var(--ice); padding: 10px 26px; text-decoration: none; font-weight: 700;">📞 CALL</a>
</div>
</div>
</div>
</section>
<footer class="footer" style="background: #0a1628; border-top: 1px solid var(--steel); padding: 40px 24px; text-align: center;"><p style="color: #7a9ab8; margin-bottom: 10px;">© 2026 Hands Detail Shop. All rights reserved.</p><p style="color: #7a9ab8; font-size: 14px;">Veteran owned · Air Force trained · PA · OH · WV · MD</p></footer>
<script src="main.js"></script>
</body>
</html>'''

with open('marine-services.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ marine-services.html updated successfully!")
