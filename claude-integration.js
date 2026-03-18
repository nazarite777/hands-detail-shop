/**
 * Claude AI Integration for Hands Detail Shop
 * Provides chat widget + support bot across all pages
 */

const CLAUDE_API_KEY = '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';
const CLAUDE_MODEL = 'claude-3-5-sonnet-20241022';
const API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

/**
 * System prompt for Claude - trains it on your business context
 */
const SYSTEM_PROMPT = `You are Claude, a helpful AI assistant for Hands Detail Shop, a premium mobile auto detailing service in the Pittsburgh area. 

BUSINESS CONTEXT:
- Owner: Nazir El (Air Force Veteran, 16 years experience)
- Service: Mobile auto detailing - we come to you!
- Service Area: Pittsburgh PA and 2-hour radius (PA, OH, WV, MD)
- Hours: Monday-Saturday 8AM-6PM, Sunday by appointment
- Phone: (412) 752-8684
- Email: contact@handsdetailshop.com

POPULAR PACKAGES:
1. Essential ($65-85): Full exterior wash, interior vacuum, window cleaning, tire shine, air freshener
2. Executive ($145-185): Everything in Essential + deep interior cleaning, leather conditioning, clay bar, hand wax, engine bay wipe-down
3. Signature ($285-365): Everything in Executive + paint correction, sealant, trim restoration, headlight restoration
4. Presidential ($585-785): Everything in Signature + advanced paint correction, multiple coatings, extended warranty
5. Ultimate Armor ($1,285-1,685): Full ceramic coating protection, multi-stage correction, lifetime guarantee

SPECIALTY SERVICES:
- Ceramic Coating: Professional 9H application ($500)
- Paint Correction: Multi-stage polishing ($350+)
- Monthly Memberships: $75-180/month for regular maintenance
- Yacht/Marine Detailing: Professional boat cleaning
- RV/Motorhome Detailing: Large vehicle specialist
- Aircraft Detailing: Premium aircraft cleaning
- Motorcycle Detailing: Show-quality bike detailing
- Mechanical Services: Diagnostics ($50-100), repairs at $75/hr

KEY FEATURES:
✓ Mobile service (we come to your location)
✓ Licensed & Insured
✓ Family-owned for 16 years
✓ Air Force trained precision
✓ Free estimates
✓ $30 deposit holds appointment
✓ Transparent pricing, no hidden fees

BOOKING INFORMATION:
- Get Quote: handsdetailshop.com/quote
- Book Direct: handsdetailshop.com/booking
- Call: (412) 752-8684
- Text: (412) 752-8684

When customers ask:
1. About services: Describe what's included and why it's valuable
2. About booking: Direct them to the quote form or call/text
3. About pricing: Give range, explain what's included
4. About service area: Confirm if their location is within 2-hour radius of Pittsburgh
5. About mechanical work: Explain we offer diagnostics and repairs by appointment

Be friendly, professional, and always encourage booking or contacting directly. Keep responses concise but helpful.`;

/**
 * FAQ Database for quick responses
 */
const SERVICE_FAQ = {
    'what services do you offer': 'We offer comprehensive mobile auto detailing including Essential, Executive, Signature, and Presidential packages. We also provide ceramic coating, paint correction, monthly memberships, and specialty services for yachts, RVs, aircraft, and motorcycles. Plus mechanical diagnostics and repairs!',
    'how much does detailing cost': 'Pricing ranges from $65 (Essential) to $1,685 (Ultimate Armor). Most popular is the Executive package at $145-185. We provide free estimates!',
    'do you come to my location': 'Yes! We\'re a fully mobile service. We come directly to your home, office, or preferred location within our 2-hour service radius from Pittsburgh.',
    'where do you serve': 'We serve Pittsburgh PA and a 2-hour radius including parts of Ohio, West Virginia, and Maryland. Call (412) 752-8684 to confirm your location.',
    'how do i book': 'You can get a free quote at handsdetailshop.com/quote, call us at (412) 752-8684, or text to schedule. We require a $30 deposit to hold your appointment.',
    'what is your experience': 'We have 16 years of professional experience! Owner Nazir El is an Air Force Veteran trained in precision mechanics. We\'re family-owned, licensed, and insured.',
    'do you offer mechanical services': 'Yes! We now offer mechanical diagnostics starting at $50, advanced diagnostics at $100, and labor at $75/hr. No work begins without your approval.',
    'what about motorcycle detailing': 'We specialize in show-quality motorcycle detailing with packages like Road Ready ($85-105), Chrome & Shine ($145-185), and Show Bike ($245-295).',
    'how much is ceramic coating': 'Professional 9H ceramic coating is $500 and provides long-term paint protection. It\'s a great investment for your vehicle\'s longevity.',
    'do you offer payment plans': 'We accept cash, credit cards, debit cards, and Square. Contact us to discuss flexible payment options for larger packages.',
};

/**
 * Initialize Claude Chat Widget
 */
function initializeClaudeWidget() {
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
                background: linear-gradient(135deg, #1565c0, #42a5f5);
                border: 3px solid #0d1b2a;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                box-shadow: 0 6px 20px rgba(21, 101, 192, 0.4);
                z-index: 9999;
                transition: all 0.3s ease;
                user-select: none;
            }
            #claude-chat-button:hover {
                transform: scale(1.12);
                box-shadow: 0 8px 28px rgba(21, 101, 192, 0.5);
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
                border: 2px solid rgba(66, 165, 245, 0.3);
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(21, 101, 192, 0.3);
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
                border-bottom: 2px solid rgba(66, 165, 245, 0.2);
                background: linear-gradient(135deg, rgba(21, 101, 192, 0.2), rgba(30, 136, 229, 0.1));
            }
            .claude-popup-header h3 {
                margin: 0 0 5px 0;
                color: #e0e0e0;
                font-size: 1.1rem;
                font-weight: 700;
            }
            .claude-popup-header p {
                margin: 0;
                color: #90caf9;
                font-size: 0.85rem;
            }
            .claude-popup-close {
                position: absolute;
                top: 12px;
                right: 12px;
                background: none;
                border: none;
                color: #64b5f6;
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
                background: rgba(21, 101, 192, 0.15);
                border-left: 3px solid #42a5f5;
                color: #b0bec5;
            }
            .claude-message.user .claude-message-content {
                background: linear-gradient(135deg, #1565c0, #1e88e5);
                color: white;
                border-radius: 12px 2px 12px 12px;
            }
            .claude-popup-footer {
                padding: 15px;
                border-top: 2px solid rgba(66, 165, 245, 0.2);
                display: flex;
                gap: 10px;
            }
            #claude-input {
                flex: 1;
                background: rgba(30, 40, 60, 0.8);
                border: 1px solid rgba(66, 165, 245, 0.25);
                color: #e0e0e0;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 0.9rem;
                font-family: inherit;
                transition: all 0.2s ease;
            }
            #claude-input:focus {
                outline: none;
                border-color: rgba(66, 165, 245, 0.6);
                background: rgba(30, 40, 60, 0.95);
                box-shadow: 0 0 8px rgba(66, 165, 245, 0.2);
            }
            #claude-input::placeholder {
                color: #757575;
            }
            .claude-send-btn {
                background: linear-gradient(135deg, #1565c0, #1e88e5);
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
                box-shadow: 0 4px 12px rgba(21, 101, 192, 0.3);
            }
            .claude-send-btn:active {
                transform: translateY(0);
            }
            .claude-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
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
                background: #64b5f6;
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
}

/**
 * Toggle chat popup visibility
 */
function toggleChatPopup() {
    const popup = document.getElementById('claude-chat-popup');
    popup.classList.toggle('active');
    if (popup.classList.contains('active')) {
        document.getElementById('claude-input').focus();
        // Add welcome message if first time
        if (document.getElementById('claude-messages').children.length === 0) {
            addMessage('Welcome to Hands Detail Shop! 👋 I\'m Claude, your AI assistant. How can I help you today? You can ask about our services, pricing, booking, or anything else!', 'assistant');
        }
    }
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
            loadingEl.remove();
            addMessage(faqMatch, 'assistant');
            input.disabled = false;
            document.getElementById('claude-send-btn').disabled = false;
            return;
        }
        
        // Otherwise call Claude API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: 1024,
                system: SYSTEM_PROMPT,
                messages: [{
                    role: 'user',
                    content: message
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        const assistantMessage = data.content[0].text;
        
        loadingEl.remove();
        addMessage(assistantMessage, 'assistant');
    } catch (error) {
        loadingEl.remove();
        addMessage(`Sorry, I encountered an error: ${error.message}. Please try again or call us at (412) 752-8684.`, 'assistant');
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
