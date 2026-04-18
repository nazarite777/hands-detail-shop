/**
 * Hands Detail Shop — AI Chat Widget
 * Custom Claude-powered AI assistant for customer support.
 *
 * Configuration (set before loading this script):
 *   window.HANDS_CHAT_API_KEY  — Anthropic API key (server-side proxy recommended for production)
 *   window.HANDS_CHAT_ENDPOINT — Override API endpoint (e.g. a Firebase Function proxy URL)
 */
(function () {
  'use strict';

  // ── Inject Google Fonts ──────────────────────────────────────────────────
  if (!document.querySelector('link[href*="Playfair+Display"]')) {
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap';
    document.head.appendChild(fontLink);
  }

  // ── CSS ──────────────────────────────────────────────────────────────────
  var css = `
  #hds-chat-widget * { box-sizing: border-box; margin: 0; padding: 0; }
  #hds-chat-widget {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 99999;
    font-family: 'DM Sans', sans-serif;
  }
  /* Launcher button */
  #hds-launcher {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, #C9A84C 0%, #8a6f2e 100%);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 24px rgba(201,168,76,0.45), 0 2px 8px rgba(0,0,0,0.6);
    transition: transform 0.2s, box-shadow 0.2s;
    font-size: 24px;
    position: relative;
  }
  #hds-launcher:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(201,168,76,0.55), 0 4px 12px rgba(0,0,0,0.6);
  }
  #hds-launcher .hds-badge {
    position: absolute; top: -4px; right: -4px;
    width: 18px; height: 18px;
    background: #4ade80;
    border-radius: 50%;
    border: 2px solid #0a0a0a;
    animation: hds-pulse 2s infinite;
  }
  @keyframes hds-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  /* Panel */
  #hds-panel {
    position: absolute;
    bottom: 68px;
    right: 0;
    width: 380px;
    max-width: calc(100vw - 48px);
    height: 560px;
    max-height: calc(100vh - 100px);
    background: #111111;
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 16px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(201,168,76,0.05),
      0 24px 80px rgba(0,0,0,0.85),
      0 0 60px rgba(201,168,76,0.05);
    display: none;
    flex-direction: column;
    animation: hds-slideUp 0.25s ease;
  }
  #hds-panel.hds-open {
    display: flex;
  }
  @keyframes hds-slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  /* Header */
  .hds-header {
    background: linear-gradient(135deg, #1a1a1a 0%, #161408 100%);
    border-bottom: 1px solid rgba(201,168,76,0.2);
    padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    flex-shrink: 0;
  }
  .hds-header-avatar {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, #C9A84C 0%, #8a6f2e 100%);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
    box-shadow: 0 0 16px rgba(201,168,76,0.3);
  }
  .hds-header-info { flex: 1; }
  .hds-header-name {
    font-family: 'Playfair Display', serif;
    font-size: 14px; font-weight: 600;
    color: #E8C96D; letter-spacing: 0.3px;
  }
  .hds-header-status {
    font-size: 10px; color: #888;
    display: flex; align-items: center; gap: 4px;
    margin-top: 2px;
  }
  .hds-status-dot {
    width: 6px; height: 6px;
    background: #4ade80; border-radius: 50%;
    animation: hds-pulse 2s infinite;
  }
  .hds-header-badge {
    font-size: 9px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; color: #8a6f2e;
    background: rgba(201,168,76,0.08);
    padding: 3px 8px; border-radius: 20px;
    border: 1px solid rgba(201,168,76,0.15);
  }
  .hds-close-btn {
    background: none; border: none; cursor: pointer;
    color: #555; font-size: 18px; line-height: 1;
    padding: 2px 4px; transition: color 0.15s;
    flex-shrink: 0;
  }
  .hds-close-btn:hover { color: #C9A84C; }
  /* Messages */
  .hds-messages {
    flex: 1; overflow-y: auto;
    padding: 16px 14px;
    display: flex; flex-direction: column; gap: 12px;
    scroll-behavior: smooth;
  }
  .hds-messages::-webkit-scrollbar { width: 3px; }
  .hds-messages::-webkit-scrollbar-track { background: transparent; }
  .hds-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 2px; }
  .hds-welcome-card {
    background: linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 100%);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 10px;
    padding: 12px 14px;
  }
  .hds-welcome-title {
    font-family: 'Playfair Display', serif;
    font-size: 13px; font-weight: 600;
    color: #E8C96D; margin-bottom: 5px;
  }
  .hds-welcome-text {
    font-size: 12px; color: #888; line-height: 1.5;
  }
  .hds-msg {
    display: flex; gap: 8px;
    animation: hds-fadeUp 0.25s ease;
  }
  @keyframes hds-fadeUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hds-msg.hds-user { flex-direction: row-reverse; }
  .hds-msg-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; flex-shrink: 0; margin-top: 2px;
  }
  .hds-msg.hds-assistant .hds-msg-avatar {
    background: linear-gradient(135deg, #C9A84C 0%, #8a6f2e 100%);
    box-shadow: 0 0 8px rgba(201,168,76,0.2);
  }
  .hds-msg.hds-user .hds-msg-avatar {
    background: #242424;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .hds-msg-bubble {
    max-width: 82%;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 13px; line-height: 1.55;
  }
  .hds-msg.hds-assistant .hds-msg-bubble {
    background: #1a1a1a;
    border: 1px solid rgba(201,168,76,0.2);
    color: #e8e8e8;
    border-bottom-left-radius: 4px;
  }
  .hds-msg.hds-user .hds-msg-bubble {
    background: linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.08) 100%);
    border: 1px solid rgba(201,168,76,0.25);
    color: #e8e8e8;
    border-bottom-right-radius: 4px;
  }
  /* Typing */
  .hds-typing {
    display: flex; gap: 4px; align-items: center;
    padding: 10px 12px;
  }
  .hds-typing-dot {
    width: 6px; height: 6px;
    background: #8a6f2e; border-radius: 50%;
    animation: hds-typing 1.2s infinite;
  }
  .hds-typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .hds-typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes hds-typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
  }
  /* Quick replies */
  .hds-quick-replies {
    padding: 0 14px 10px;
    display: flex; flex-wrap: wrap; gap: 6px;
    flex-shrink: 0;
  }
  .hds-quick-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 500;
    color: #C9A84C;
    background: rgba(201,168,76,0.06);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 5px 10px; border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .hds-quick-btn:hover {
    background: rgba(201,168,76,0.14);
    border-color: rgba(201,168,76,0.4);
    transform: translateY(-1px);
  }
  /* Input */
  .hds-input-area {
    padding: 10px 12px 12px;
    border-top: 1px solid rgba(201,168,76,0.2);
    background: #1a1a1a;
    flex-shrink: 0;
  }
  .hds-input-row {
    display: flex; gap: 8px; align-items: flex-end;
  }
  .hds-textarea {
    flex: 1;
    background: #242424;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 9px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #e8e8e8;
    outline: none;
    resize: none;
    min-height: 38px;
    max-height: 90px;
    line-height: 1.4;
    transition: border-color 0.2s;
  }
  .hds-textarea::placeholder { color: #555; }
  .hds-textarea:focus { border-color: rgba(201,168,76,0.35); }
  .hds-send-btn {
    width: 38px; height: 38px; border-radius: 10px;
    background: linear-gradient(135deg, #C9A84C 0%, #8a6f2e 100%);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(201,168,76,0.25);
  }
  .hds-send-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(201,168,76,0.35); }
  .hds-send-btn:active { transform: translateY(0); }
  .hds-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .hds-send-icon { width: 15px; height: 15px; fill: #0a0a0a; }
  .hds-input-footer {
    text-align: center; margin-top: 6px;
    font-size: 9px; color: rgba(136,136,136,0.45);
    letter-spacing: 0.5px;
  }
  @media (max-width: 420px) {
    #hds-panel { width: calc(100vw - 32px); right: -8px; }
    #hds-chat-widget { right: 16px; bottom: 16px; }
  }
  `;

  var styleEl = document.createElement('style');
  styleEl.id = 'hds-chat-widget-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── System Prompt ────────────────────────────────────────────────────────
  var SYSTEM_PROMPT = `You are the official AI assistant for Hands Detail Shop, a premium mobile auto detailing business based in Arnold, Pennsylvania, serving Pittsburgh and a 2-hour radius including PA, OH, WV, and MD. You've been in business for 16 years with over 5,000 vehicles detailed. You are family owned, licensed, insured, and Air Force trained.
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
Never make up pricing or services not listed above. If asked something you're not sure about, say "That's a great question — give us a call or text at (412) 752-8684 and we'll get you sorted out."`;

  // ── HTML ─────────────────────────────────────────────────────────────────
  var widgetHTML = `
  <button id="hds-launcher" aria-label="Open Hands Detail chat assistant">
    🖐️
    <div class="hds-badge"></div>
  </button>
  <div id="hds-panel" role="dialog" aria-label="Hands Detail AI Assistant">
    <div class="hds-header">
      <div class="hds-header-avatar">🖐️</div>
      <div class="hds-header-info">
        <div class="hds-header-name">Hands Detail Assistant</div>
        <div class="hds-header-status">
          <div class="hds-status-dot"></div>
          Available now · Replies instantly
        </div>
      </div>
      <div class="hds-header-badge">AI</div>
      <button class="hds-close-btn" id="hds-close" aria-label="Close chat">✕</button>
    </div>
    <div class="hds-messages" id="hds-messages">
      <div class="hds-welcome-card">
        <div class="hds-welcome-title">Welcome to Hands Detail Shop 👋</div>
        <div class="hds-welcome-text">Ask me anything — pricing, services, booking, service area. I'm here to help you get your vehicle looking its best.</div>
      </div>
      <div class="hds-msg hds-assistant">
        <div class="hds-msg-avatar">🖐️</div>
        <div class="hds-msg-bubble">Hey! I'm the Hands Detail assistant. We've been serving Pittsburgh and the surrounding area for 16 years — over 5,000 vehicles detailed. What can I help you with today?</div>
      </div>
    </div>
    <div class="hds-quick-replies" id="hds-quick-replies">
      <button class="hds-quick-btn" data-q="What packages do you offer?">📋 Packages & Pricing</button>
      <button class="hds-quick-btn" data-q="How do I book an appointment?">📅 Book Now</button>
      <button class="hds-quick-btn" data-q="What areas do you serve?">📍 Service Area</button>
      <button class="hds-quick-btn" data-q="Do you detail fleets?">🚛 Fleet Services</button>
    </div>
    <div class="hds-input-area">
      <div class="hds-input-row">
        <textarea class="hds-textarea" id="hds-input" placeholder="Ask about pricing, booking, services..." rows="1"></textarea>
        <button class="hds-send-btn" id="hds-send" aria-label="Send message">
          <svg class="hds-send-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </button>
      </div>
      <div class="hds-input-footer">Powered by Claude AI · Hands Detail Shop</div>
    </div>
  </div>
  `;

  var container = document.createElement('div');
  container.id = 'hds-chat-widget';
  container.innerHTML = widgetHTML;
  document.body.appendChild(container);

  // ── State ────────────────────────────────────────────────────────────────
  var history = [];
  var isLoading = false;
  var panelOpen = false;

  var launcher = document.getElementById('hds-launcher');
  var panel = document.getElementById('hds-panel');
  var closeBtn = document.getElementById('hds-close');
  var messagesEl = document.getElementById('hds-messages');
  var inputEl = document.getElementById('hds-input');
  var sendBtn = document.getElementById('hds-send');
  var quickReplies = document.getElementById('hds-quick-replies');

  // ── Toggle panel ─────────────────────────────────────────────────────────
  function openPanel() {
    panelOpen = true;
    panel.classList.add('hds-open');
    inputEl.focus();
  }
  function closePanel() {
    panelOpen = false;
    panel.classList.remove('hds-open');
  }

  launcher.addEventListener('click', function () {
    panelOpen ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  // ── Quick replies ────────────────────────────────────────────────────────
  quickReplies.addEventListener('click', function (e) {
    var btn = e.target.closest('.hds-quick-btn');
    if (!btn) return;
    inputEl.value = btn.getAttribute('data-q');
    quickReplies.style.display = 'none';
    sendMessage();
  });

  // ── Auto-resize textarea ─────────────────────────────────────────────────
  inputEl.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 90) + 'px';
  });

  // ── Send on Enter ────────────────────────────────────────────────────────
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  sendBtn.addEventListener('click', sendMessage);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function addMessage(role, text) {
    var div = document.createElement('div');
    div.className = 'hds-msg hds-' + role;

    var avatar = document.createElement('div');
    avatar.className = 'hds-msg-avatar';
    avatar.textContent = role === 'assistant' ? '🖐️' : '👤';

    var bubble = document.createElement('div');
    bubble.className = 'hds-msg-bubble';
    bubble.textContent = text;

    div.appendChild(avatar);
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'hds-msg hds-assistant';
    div.id = 'hds-typing';

    var avatar = document.createElement('div');
    avatar.className = 'hds-msg-avatar';
    avatar.textContent = '🖐️';

    var bubble = document.createElement('div');
    bubble.className = 'hds-msg-bubble';
    bubble.innerHTML = '<div class="hds-typing"><div class="hds-typing-dot"></div><div class="hds-typing-dot"></div><div class="hds-typing-dot"></div></div>';

    div.appendChild(avatar);
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    var t = document.getElementById('hds-typing');
    if (t) t.remove();
  }

  // ── Send message ─────────────────────────────────────────────────────────
  function sendMessage() {
    if (isLoading) return;

    var text = inputEl.value.trim();
    if (!text || text.length > 2000) return;

    inputEl.value = '';
    inputEl.style.height = 'auto';
    quickReplies.style.display = 'none';

    addMessage('user', text);
    history.push({ role: 'user', content: text });

    isLoading = true;
    sendBtn.disabled = true;
    showTyping();

    // Always route through secure Cloud Function — never expose API key in browser
    var endpoint = window.HANDS_CHAT_ENDPOINT || 'https://us-central1-hands-detail.cloudfunctions.net/claudeChat';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history,
        system: SYSTEM_PROMPT,
        max_tokens: 1000
      })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var reply =
          (data.content && data.content[0] && data.content[0].text) ||
          data.reply ||
          data.message ||
          "I'm having a moment — please call or text us at (412) 752-8684 and we'll help you right away!";
        removeTyping();
        addMessage('assistant', reply);
        history.push({ role: 'assistant', content: reply });
      })
      .catch(function () {
        removeTyping();
        addMessage(
          'assistant',
          "Sorry, I'm having trouble connecting. Please call or text us directly at (412) 752-8684!"
        );
      })
      .finally(function () {
        isLoading = false;
        sendBtn.disabled = false;
        inputEl.focus();
      });
  }
})();
