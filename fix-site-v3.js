#!/usr/bin/env node
/**
 * fix-site-v3.js
 * Comprehensive emoji fix for all broken HTML files (literal ?? placeholders).
 * Run: node fix-site-v3.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// ─────────────────────────────────────────────────────────────────────────────
// Helper — safe replaceAll using split/join, normalises \r\n → \n first
// ─────────────────────────────────────────────────────────────────────────────
function fixFile(filename, replacements) {
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  File not found: ${filename}`);
    return;
  }
  // Normalise Windows line endings so multiline patterns match
  let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  let count = 0;
  for (const [from, to] of replacements) {
    if (from === to) continue; // skip no-ops
    if (typeof from === 'string') {
      const parts = content.split(from);
      if (parts.length > 1) {
        content = parts.join(to);
        count += parts.length - 1;
      }
    } else {
      // RegExp
      const before = content;
      content = content.replace(from, to);
      if (content !== before) count++;
    }
  }
  // Write back — keep \n (LF) line endings
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ ${filename} — ${count} replacement(s)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED NAV / FOOTER PATTERNS  (used across most files)
// ─────────────────────────────────────────────────────────────────────────────
const NAV_SHARED = [
  // Desktop nav bar
  ['<span class="hours-header">?? Mon-Sat 8AM-6PM</span>',   '<span class="hours-header">🕒 Mon-Sat 8AM-6PM</span>'],
  ['class="btn-call">?? Call</a>',                           'class="btn-call">📞 Call</a>'],
  ['class="btn-text">?? Text</a>',                           'class="btn-text">💬 Text</a>'],
  // Mobile nav call/text buttons
  ['class="mobile-call-btn">?? Call Now</a>',                'class="mobile-call-btn">📞 Call Now</a>'],
  ['class="mobile-text-btn">?? Text Now</a>',                'class="mobile-text-btn">💬 Text Now</a>'],
  // Mobile nav inline-styled call/text links
  ['background: linear-gradient(135deg, #1565c0, #1e88e5, #42a5f5); text-align: center; margin-top: 10px; border: 1px solid rgba(160,160,160,0.3);">?? Call Now</a>',
   'background: linear-gradient(135deg, #1565c0, #1e88e5, #42a5f5); text-align: center; margin-top: 10px; border: 1px solid rgba(160,160,160,0.3);">📞 Call Now</a>'],
  ['background: rgba(50,50,50,0.5); text-align: center; margin-top: 10px; border: 1px solid rgba(160,160,160,0.3);">?? Text Now</a>',
   'background: rgba(50,50,50,0.5); text-align: center; margin-top: 10px; border: 1px solid rgba(160,160,160,0.3);">💬 Text Now</a>'],

  // Services dropdown items
  ['class="dropdown-item">?? All Services Overview</a>',     'class="dropdown-item">📋 All Services Overview</a>'],
  ['class="dropdown-item">?? Personal Vehicles</a>',         'class="dropdown-item">🚗 Personal Vehicles</a>'],
  ['class="dropdown-item">?? RV & Motorhomes</a>',           'class="dropdown-item">🚐 RV & Motorhomes</a>'],
  ['class="dropdown-item">??? Yacht & RV</a>',               'class="dropdown-item">⛵ Yacht & RV</a>'],
  ['class="dropdown-item">?? Fleet & Commercial</a>',        'class="dropdown-item">🚛 Fleet & Commercial</a>'],
  ['class="dropdown-item">??? Motorcycle</a>',               'class="dropdown-item">🏍️ Motorcycle</a>'],
  ['class="dropdown-item">?? Aircraft</a>',                  'class="dropdown-item">✈️ Aircraft</a>'],
  ['class="dropdown-item">?? Mechanical Services</a>',       'class="dropdown-item">🔧 Mechanical Services</a>'],

  // Mobile nav links (bare anchors)
  ['>?? Personal Vehicles</a>',    '>🚗 Personal Vehicles</a>'],
  ['>?? RV & Motorhomes</a>',      '>🚐 RV & Motorhomes</a>'],
  ['>??? Yacht & RV</a>',          '>⛵ Yacht & RV</a>'],
  ['>?? Fleet & Commercial</a>',   '>🚛 Fleet & Commercial</a>'],
  ['>??? Motorcycle</a>',          '>🏍️ Motorcycle</a>'],
  ['>?? Motorcycle</a>',           '>🏍️ Motorcycle</a>'],
  ['>?? Aircraft</a>',             '>✈️ Aircraft</a>'],
  ['>?? Mechanical Services</a>',  '>🔧 Mechanical Services</a>'],

  // Promo banner
  ['| ?? (412) 752-8684',  '| 📞 (412) 752-8684'],

  // Footer
  ['<strong>?? Phone:</strong>',           '<strong>📞 Phone:</strong>'],
  ['<strong>?? Hours:</strong>',           '<strong>🕒 Hours:</strong>'],
  ['<strong>?? Email:</strong>',           '<strong>✉️ Email:</strong>'],
  ['<strong>?? Mobile Service:</strong>',  '<strong>🚗 Mobile Service:</strong>'],

  // Phone link in confirmation / footer context
  ['font-weight: 600;">?? (412) 752-8684</a>',  'font-weight: 600;">📞 (412) 752-8684</a>'],

  // Inline claude chat widget placeholder (fallback — pages that still have it)
  ["onclick=\"alert('Claude AI Assistant - Auto detailing tips')\">??</button>",
   "onclick=\"alert('Claude AI Assistant - Auto detailing tips')\">💬</button>"],
  ["onclick=\"alert('Claude AI Assistant - Available for your questions')\">??</button>",
   "onclick=\"alert('Claude AI Assistant - Available for your questions')\">💬</button>"],
  ["onclick=\"alert('Claude AI Assistant - Your questions answered')\">??</button>",
   "onclick=\"alert('Claude AI Assistant - Your questions answered')\">💬</button>"],
  ["onclick=\"alert('Claude AI Assistant - Membership plans')\">??</button>",
   "onclick=\"alert('Claude AI Assistant - Membership plans')\">💬</button>"],
];

// ─────────────────────────────────────────────────────────────────────────────
// gallery.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('gallery.html', [
  ...NAV_SHARED,
  // Promo banner (this file has the full banner broken)
  ['?? PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | ?? FREE Tire Shine with Any Package | ?? $30 Deposit Secures Your Appointment | ?? (412) 752-8684',
   '🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | 💳 $30 Deposit Secures Your Appointment | 📞 (412) 752-8684'],
  // Footer instagram
  ['>??</a>\n                    <a href="https://medium.com/@handsdetailshop"',
   '>📸</a>\n                    <a href="https://medium.com/@handsdetailshop"'],
  ['<strong>?? Phone:</strong> (412) 752-8684<br>',  '<strong>📞 Phone:</strong> (412) 752-8684<br>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// our-story.html  (most complex)
// ─────────────────────────────────────────────────────────────────────────────
fixFile('our-story.html', [
  ...NAV_SHARED,
  // Promo banner (full broken version)
  ['?? PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | ?? FREE Tire Shine with Any Package | ?? $30 Deposit Secures Your Appointment | ?? (412) 752-8684',
   '🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | 💳 $30 Deposit Secures Your Appointment | 📞 (412) 752-8684'],

  // ── Audio player ──────────────────────────────────────────────────────────
  // Play button initial state
  ['font-size: 2.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; flex-shrink: 0;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.boxShadow=\'0 10px 30px rgba(66, 165, 245, 0.6)\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.boxShadow=\'none\';"> ??\n',
   'font-size: 2.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; flex-shrink: 0;" onmouseover="this.style.transform=\'scale(1.1)\'; this.style.boxShadow=\'0 10px 30px rgba(66, 165, 245, 0.6)\';" onmouseout="this.style.transform=\'scale(1)\'; this.style.boxShadow=\'none\';">▶️\n'],
  // Fallback for play button
  ['>??\n                    </button>\n                    <div style="text-align: left;">\n                        <div style="color: #d4d4d4; font-weight: 700; font-size: 1.2rem; margin-bottom: 8px;">?? Sixteen Years',
   '>▶️\n                    </button>\n                    <div style="text-align: left;">\n                        <div style="color: #d4d4d4; font-weight: 700; font-size: 1.2rem; margin-bottom: 8px;">🎵 Sixteen Years'],
  // Track title label
  ['<div style="color: #d4d4d4; font-weight: 700; font-size: 1.2rem; margin-bottom: 8px;">?? Sixteen Years of Excellence</div>',
   '<div style="color: #d4d4d4; font-weight: 700; font-size: 1.2rem; margin-bottom: 8px;">🎵 Sixteen Years of Excellence</div>'],
  // Playlist label
  ['<div style="color: #e8cc80; font-weight: 600; font-size: 0.95rem;">?? Playlist</div>',
   '<div style="color: #e8cc80; font-weight: 600; font-size: 0.95rem;">🎶 Playlist</div>'],
  // Playlist buttons
  ['>?? Sixteen Years (Remastered)</button>',  '>🎵 Sixteen Years (Remastered)</button>'],
  ['>?? Theme Song</button>',                   '>🎵 Theme Song</button>'],
  // JS play/pause icon updates
  ["if (btn) btn.textContent = '??';\n            });\n            \n            audio.addEventListener('pause'",
   "if (btn) btn.textContent = '⏸️';\n            });\n            \n            audio.addEventListener('pause'"],
  ["if (btn) btn.textContent = '??';\n            });\n            \n            // Log any errors",
   "if (btn) btn.textContent = '▶️';\n            });\n            \n            // Log any errors"],

  // ── Timeline circles ──────────────────────────────────────────────────────
  // Timeline 1 — Baton Rouge Roots
  ['margin-left: auto; border: 3px solid #0a1929;">\n                        ??\n                    </div>\n                </div>\n                <div style="background: rgba(40, 40, 40, 0.5); padding: 30px; border-radius: 15px; border-left: 3px solid #1565c0;">\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 10px;">1990s - Baton Rouge',
   'margin-left: auto; border: 3px solid #0a1929;">🏠\n                    </div>\n                </div>\n                <div style="background: rgba(40, 40, 40, 0.5); padding: 30px; border-radius: 15px; border-left: 3px solid #1565c0;">\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 10px;">1990s - Baton Rouge'],
  // Timeline 2 — Katrina
  ['justify-content: center; font-size: 2rem; border: 3px solid #0a1929;">\n                        ??\n                    </div>\n                </div>\n            </div>\n\n            <!-- Timeline Item 3 -->',
   'justify-content: center; font-size: 2rem; border: 3px solid #0a1929;">🌪️\n                    </div>\n                </div>\n            </div>\n\n            <!-- Timeline Item 3 -->'],
  // Timeline 3 — Air Force
  ['margin-left: auto; border: 3px solid #0a1929;">\n                        ??\n                    </div>\n                </div>\n                <div style="background: rgba(40, 40, 40, 0.5); padding: 30px; border-radius: 15px; border-left: 3px solid #1565c0;">\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 10px;">2007-2011 - Air Force',
   'margin-left: auto; border: 3px solid #0a1929;">✈️\n                    </div>\n                </div>\n                <div style="background: rgba(40, 40, 40, 0.5); padding: 30px; border-radius: 15px; border-left: 3px solid #1565c0;">\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 10px;">2007-2011 - Air Force'],
  // Timeline 4 — 16 Years
  ['justify-content: center; font-size: 2rem; border: 3px solid #0a1929;">\n                        ??\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Values Section -->',
   'justify-content: center; font-size: 2rem; border: 3px solid #0a1929;">🏆\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- Values Section -->'],

  // ── Values section ────────────────────────────────────────────────────────
  // Precision
  ['<div style="font-size: 3rem; margin-bottom: 15px;">??</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Precision</h3>',
   '<div style="font-size: 3rem; margin-bottom: 15px;">🎯</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Precision</h3>'],
  // Resilience
  ['<div style="font-size: 3rem; margin-bottom: 15px;">??</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Resilience</h3>',
   '<div style="font-size: 3rem; margin-bottom: 15px;">💪</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Resilience</h3>'],
  // Passion
  ['<div style="font-size: 3rem; margin-bottom: 15px;">??</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Passion</h3>',
   '<div style="font-size: 3rem; margin-bottom: 15px;">❤️</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Passion</h3>'],
  // Connection
  ['<div style="font-size: 3rem; margin-bottom: 15px;">??</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Connection</h3>',
   '<div style="font-size: 3rem; margin-bottom: 15px;">🤝</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Connection</h3>'],
  // Excellence
  ['<div style="font-size: 3rem; margin-bottom: 15px;">??</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Excellence</h3>',
   '<div style="font-size: 3rem; margin-bottom: 15px;">⭐</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Excellence</h3>'],
  // Service (has ???? = 4 chars)
  ['<div style="font-size: 3rem; margin-bottom: 15px;">????</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Service</h3>',
   '<div style="font-size: 3rem; margin-bottom: 15px;">🎖️</div>\n                    <h3 style="color: #90caf9; font-size: 1.3rem; margin-bottom: 15px;">Service</h3>'],

  // ── Devil Fruit section ───────────────────────────────────────────────────
  ['<div class="df-fruit-icon">?</div>',  '<div class="df-fruit-icon">🖐️</div>'],
  // df-sub em-dash
  ['Tekuteku no Mi ? Awakened',  'Tekuteku no Mi — Awakened'],
  // df-cards
  ['<span class="df-card-icon">???</span>\n                    <div class="df-card-title">Detail Vision</div>',
   '<span class="df-card-icon">👁️</span>\n                    <div class="df-card-title">Detail Vision</div>'],
  // Restoration Revelation — single ?
  ['<span class="df-card-icon">?</span>\n                    <div class="df-card-title">Restoration Revelation</div>',
   '<span class="df-card-icon">✨</span>\n                    <div class="df-card-title">Restoration Revelation</div>'],
  ['<span class="df-card-icon">??</span>\n                    <div class="df-card-title">Mechanical Wisdom</div>',
   '<span class="df-card-icon">⚙️</span>\n                    <div class="df-card-title">Mechanical Wisdom</div>'],
  ['<span class="df-card-icon">??</span>\n                    <div class="df-card-title">Consciousness Touch</div>',
   '<span class="df-card-icon">🧠</span>\n                    <div class="df-card-title">Consciousness Touch</div>'],
  ['<span class="df-card-icon">??</span>\n                    <div class="df-card-title">Transformation Power</div>',
   '<span class="df-card-icon">⚡</span>\n                    <div class="df-card-title">Transformation Power</div>'],
  // 16-Year Legacy — single ?
  ['<span class="df-card-icon">?</span>\n                    <div class="df-card-title">16-Year Legacy</div>',
   '<span class="df-card-icon">⏳</span>\n                    <div class="df-card-title">16-Year Legacy</div>'],

  // Eden consciousness link trailing ?
  ["Visit Eden Consciousness Spiritual Temple ?</a>",
   "Visit Eden Consciousness Spiritual Temple 🌿</a>"],

  // ── CTA Section ───────────────────────────────────────────────────────────
  ['?? Book Your Detail\n                </a>',  '📅 Book Your Detail\n                </a>'],
  ['?? Get a Quote\n                </a>',       '💬 Get a Quote\n                </a>'],

  // ── Footer ────────────────────────────────────────────────────────────────
  ['<strong>?? Phone:</strong> (412) 752-8684<br>\n                    <strong>?? Email:</strong>',
   '<strong>📞 Phone:</strong> (412) 752-8684<br>\n                    <strong>✉️ Email:</strong>'],
  // Instagram social link (footer)
  ['"social-link">??\n                    <a href="https://handsdetailshop.medium.com"',
   '"social-link">📸\n                    <a href="https://handsdetailshop.medium.com"'],
  ['class="social-link">??</a>\n                    <a href="https://handsdetailshop.medium.com"',
   'class="social-link">📸</a>\n                    <a href="https://handsdetailshop.medium.com"'],
  ['<strong>?? Mobile Service:</strong>',  '<strong>🚗 Mobile Service:</strong>'],
  ['<strong>?? Hours:</strong>',           '<strong>🕒 Hours:</strong>'],

  // ── Encoding artifacts (em-dashes that survived as literal ?) ──────────────
  // Only apply patterns where ? is sandwiched between non-? chars (safe replacements)
  ["isn't just clean?it transforms",      "isn't just clean — it transforms"],
  ["second nature?something",             "second nature — something"],
  ["don't define you?how",               "don't define you — how"],
  ["cleaning?it",                         "cleaning — it"],
  ["Not through force?through",           "Not through force — through"],
  ["destination?it\u2019s",              "destination — it\u2019s"],
]);

// ─────────────────────────────────────────────────────────────────────────────
// services.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('services.html', [
  ...NAV_SHARED,
  // AI Chat nav link — fix dead link + emoji
  ['<a href="ai-assistant.html" class="nav-link">?? AI Chat</a>',
   '<a href="contact.html" class="nav-link">💬 AI Chat</a>'],
  // Promo banner
  ['?? PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers |\n      ?? FREE Tire Shine with Any Package | ?? $30 Deposit Secures Your Appointment | ?? (412)',
   '🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers |\n      💎 FREE Tire Shine with Any Package | 💳 $30 Deposit Secures Your Appointment | 📞 (412)'],
  // Service category icons
  ['<span class="service-icon">??</span>\n          <h3 class="service-title">Personal Vehicles</h3>',
   '<span class="service-icon">🚗</span>\n          <h3 class="service-title">Personal Vehicles</h3>'],
  ['<span class="service-icon">???</span>\n          <h3 class="service-title">Yacht & RV Detailing</h3>',
   '<span class="service-icon">⛵</span>\n          <h3 class="service-title">Yacht & RV Detailing</h3>'],
  ['<span class="service-icon">??</span>\n          <h3 class="service-title">Fleet & Commercial</h3>',
   '<span class="service-icon">🚛</span>\n          <h3 class="service-title">Fleet & Commercial</h3>'],
  ['<span class="service-icon">??</span>\n          <h3 class="service-title">Motorcycle Detailing</h3>',
   '<span class="service-icon">🏍️</span>\n          <h3 class="service-title">Motorcycle Detailing</h3>'],
  ['<span class="service-icon">??</span>\n          <h3 class="service-title">Monthly Plans</h3>',
   '<span class="service-icon">📅</span>\n          <h3 class="service-title">Monthly Plans</h3>'],
  // Spring deal
  ['<div class="featured-badge" style="background: #4caf50">?? SPRING SPECIAL</div>',
   '<div class="featured-badge" style="background: #4caf50">🌸 SPRING SPECIAL</div>'],
  ['>??\n          </span\n          >\n          <h3 class="service-title" style="color: #c8e6c9',
   '>🌸\n          </span\n          >\n          <h3 class="service-title" style="color: #c8e6c9'],
  ['<li>?? Spring freshness interior cleaning</li>',  '<li>🌿 Spring freshness interior cleaning</li>'],
  ['<li>?? Premium wax & sealant included</li>',      '<li>✨ Premium wax & sealant included</li>'],
  ['>?? Get Spring Fresh Now →</span',                '>🌸 Get Spring Fresh Now →</span'],
  // Service highlights list items
  ['<li>?? 5 premium package tiers</li>',             '<li>✈️ 5 premium package tiers</li>'],
  ['<li>?? Aerospace-grade detailing</li>',           '<li>🛡️ Aerospace-grade detailing</li>'],
  // Why choose us section
  ['<div style="font-size: 2.5rem; margin-bottom: 20px">??</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">Investment Protection</h3>',
   '<div style="font-size: 2.5rem; margin-bottom: 20px">💎</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">Investment Protection</h3>'],
  ['<div style="font-size: 2.5rem; margin-bottom: 20px">??</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">99.9% Sanitization</h3>',
   '<div style="font-size: 2.5rem; margin-bottom: 20px">🧪</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">99.9% Sanitization</h3>'],
  ['<div style="font-size: 2.5rem; margin-bottom: 20px">??</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">16+ Years of Expertise</h3>',
   '<div style="font-size: 2.5rem; margin-bottom: 20px">🏆</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">16+ Years of Expertise</h3>'],
  ['<div style="font-size: 2.5rem; margin-bottom: 20px">???</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">Protection Warranty</h3>',
   '<div style="font-size: 2.5rem; margin-bottom: 20px">🛡️</div>\n            <h3 style="color: #42a5f5; margin-bottom: 15px">Protection Warranty</h3>'],
  // Contact CTA buttons
  ['<a href="tel:4127528684" class="contact-btn">\n          <span>??</span>\n          <span>Call (412) 752-8684</span>',
   '<a href="tel:4127528684" class="contact-btn">\n          <span>📞</span>\n          <span>Call (412) 752-8684</span>'],
  ['<a href="quote.html" class="contact-btn">\n          <span>??</span>\n          <span>Get a Quote</span>',
   '<a href="quote.html" class="contact-btn">\n          <span>💬</span>\n          <span>Get a Quote</span>'],
  // Footer
  ['<strong>?? Phone:</strong> (412) 752-8684<br />',  '<strong>📞 Phone:</strong> (412) 752-8684<br />'],
  // Footer Instagram
  ['>??</a\n            >\n            <a href="https://medium.com/@handsdetailshop"',
   '>📸</a\n            >\n            <a href="https://medium.com/@handsdetailshop"'],
  // Footer mechanical services link
  ['<a href="under-the-hood.html" style="color: #81c784; font-weight: 600;">?? Mechanical Services</a>',
   '<a href="under-the-hood.html" style="color: #81c784; font-weight: 600;">🔧 Mechanical Services</a>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// contact.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('contact.html', [
  ...NAV_SHARED,
  // Promo banner
  ['🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | 💳 $30 Deposit Secures Your Appointment | ?? (412) 752-8684',
   '🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | 💳 $30 Deposit Secures Your Appointment | 📞 (412) 752-8684'],
  // Contact info headings
  ['<h4 style="color: #c8c8c8; margin-bottom: 20px; font-size: 1.3rem;">?? Phone</h4>',
   '<h4 style="color: #c8c8c8; margin-bottom: 20px; font-size: 1.3rem;">📞 Phone</h4>'],
  ['<h4 style="color: #c8c8c8; margin-bottom: 20px; font-size: 1.3rem;">?? Hours</h4>',
   '<h4 style="color: #c8c8c8; margin-bottom: 20px; font-size: 1.3rem;">🕒 Hours</h4>'],
  // Quick action call/text icon spans
  ['<span style="font-size: 2.5rem;">??</span>\n                            <div>\n                                <strong style="display: block; font-size: 1.2rem; margin-bottom: 5px;">Call Us Now</strong>',
   '<span style="font-size: 2.5rem;">📞</span>\n                            <div>\n                                <strong style="display: block; font-size: 1.2rem; margin-bottom: 5px;">Call Us Now</strong>'],
  ['<span style="font-size: 2.5rem;">??</span>\n                            <div>\n                                <strong style="display: block; font-size: 1.2rem; margin-bottom: 5px;">Text Us</strong>',
   '<span style="font-size: 2.5rem;">💬</span>\n                            <div>\n                                <strong style="display: block; font-size: 1.2rem; margin-bottom: 5px;">Text Us</strong>'],
  // Footer
  ['<strong>?? Phone:</strong> (412) 752-8684<br>',  '<strong>📞 Phone:</strong> (412) 752-8684<br>'],
  ['<strong>?? Hours:</strong>',                     '<strong>🕒 Hours:</strong>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// faq.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('faq.html', [
  ...NAV_SHARED,
  // Promo banner
  ['🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | ?? (412) 752-8684',
   '🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | 📞 (412) 752-8684'],
  // CTA section call/text button spans
  ['<a href="tel:4127528684" class="contact-btn">\n                <span>??</span>\n                <span>Call Us</span>',
   '<a href="tel:4127528684" class="contact-btn">\n                <span>📞</span>\n                <span>Call Us</span>'],
  ['<a href="sms:4127528684" class="contact-btn">\n                <span>??</span>\n                <span>Text Us</span>',
   '<a href="sms:4127528684" class="contact-btn">\n                <span>💬</span>\n                <span>Text Us</span>'],
  // Footer
  ['<strong>?? Phone:</strong> (412) 752-8684<br>',  '<strong>📞 Phone:</strong> (412) 752-8684<br>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// blog-auto-detailing-guide.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('blog-auto-detailing-guide.html', [
  ...NAV_SHARED,
  ['🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | ?? (412) 752-8684',
   '🎊 PRE-SPRING DETAIL: Prepare Your Vehicle for Warmer Weather | 15% OFF First-Time Customers | 💎 FREE Tire Shine with Any Package | 📞 (412) 752-8684'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// booking-confirmation.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('booking-confirmation.html', [
  ...NAV_SHARED,
  // "We'll Call You" step icon
  ['<div style="font-size: 2rem; margin-bottom: 10px;">??</div>\n                        <h3 style="color: #90caf9; margin-bottom: 8px;">We\'ll Call You</h3>',
   '<div style="font-size: 2rem; margin-bottom: 10px;">📞</div>\n                        <h3 style="color: #90caf9; margin-bottom: 8px;">We\'ll Call You</h3>'],
  // Footer
  ['<strong>?? Phone:</strong> (412) 752-8684<br>',  '<strong>📞 Phone:</strong> (412) 752-8684<br>'],
  ['<strong>?? Hours:</strong>',                     '<strong>🕒 Hours:</strong>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// careers.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('careers.html', [
  ...NAV_SHARED,
  ['💳 $30 Deposit Secures Your Appointment | ?? (412) 752-8684',
   '💳 $30 Deposit Secures Your Appointment | 📞 (412) 752-8684'],
  ['<strong>?? Phone:</strong> (412) 752-8684<br>',  '<strong>📞 Phone:</strong> (412) 752-8684<br>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// membership.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('membership.html', [
  ...NAV_SHARED,
  ['💳 $30 Deposit Secures Your Appointment | ?? (412) 752-8684',
   '💳 $30 Deposit Secures Your Appointment | 📞 (412) 752-8684'],
  ['<strong>?? Phone:</strong> (412) 752-8684<br>',  '<strong>📞 Phone:</strong> (412) 752-8684<br>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// gift-certificates.html
// ─────────────────────────────────────────────────────────────────────────────
fixFile('gift-certificates.html', [
  ...NAV_SHARED,
  // Call button
  ['<a href="tel:4127528684" class="contact-btn">\n                <span>??</span>\n                <span>Call Us</span>',
   '<a href="tel:4127528684" class="contact-btn">\n                <span>📞</span>\n                <span>Call Us</span>'],
  // Promo
  ['🎁 Perfect Gift for Car Enthusiasts | Never Expires | Digital & Physical Options | ?? (412) 752-8684',
   '🎁 Perfect Gift for Car Enthusiasts | Never Expires | Digital & Physical Options | 📞 (412) 752-8684'],
  // Footer
  ['<p><strong>?? Phone:</strong> (412) 752-8684<br>',  '<p><strong>📞 Phone:</strong> (412) 752-8684<br>'],
]);

// ─────────────────────────────────────────────────────────────────────────────
// booking.html  — trust row icons
// ─────────────────────────────────────────────────────────────────────────────
fixFile('booking.html', [
  ['<div class="trust-item">??<br>Secured by Square</div>',         '<div class="trust-item">🔒<br>Secured by Square</div>'],
  ['<div class="trust-item">??<br>Deposit applied to final bill</div>', '<div class="trust-item">💳<br>Deposit applied to final bill</div>'],
  ['<div class="trust-item">??<br>Nazir confirms personally</div>',  '<div class="trust-item">🤝<br>Nazir confirms personally</div>'],
]);

console.log('\n🎉 Done! Check files above for replacement counts.\n');
