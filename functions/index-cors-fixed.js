const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Anthropic = require('@anthropic-ai/sdk');

// Initialize Firebase Admin
admin.initializeApp();

// CORS helper function
function applyCors(response) {
  response.set('Access-Control-Allow-Origin', 'https://hands-detail.web.app');
  response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.set('Access-Control-Max-Age', '3600');
  response.set('Access-Control-Allow-Credentials', 'true');
}

// System prompt for Claude
const SYSTEM_PROMPT = `You are Claude, a helpful AI assistant for Hands Detail Shop, a premium mobile auto detailing service in the Pittsburgh area. You represent Nazir El's 16 years of Air Force-trained excellence in precision detailing.

BUSINESS CONTEXT:
- Owner: Nazir El (Air Force Veteran, 16 years professional experience, 5,000+ vehicles detailed)
- Service: Mobile auto detailing - we come to your location!
- Service Area: Pittsburgh PA and 2-hour radius (covers PA, OH, WV, MD)
- Hours: Monday-Saturday 8AM-6PM, Sunday by appointment
- Phone: (412) 752-8684 | Text: (412) 752-8684
- Website: handsdetailshop.com
- Booking: handsdetailshop.com/quote

PACKAGES & PRICING:
ESSENTIAL - $65-$95: Wash, dry, wheels, interior vacuum, windows, tire shine
EXECUTIVE - $145-$195: +clay bar, wax, leather conditioning, door jambs, engine bay (POPULAR)
PREMIUM PLUS - $215-$285: +paint correction, carpet shampooing, headlight cleaning, trim restoration
SIGNATURE - $325-$425: +multi-stage paint correction, full engine detail, carpet extraction, headlight restoration
PRESIDENTIAL - $650-$850: +ceramic coating, premium leather treatment, chrome polish, 6-month warranty
ULTIMATE ARMOR - $1,400-$1,850: +9H ceramic coating (5-yr warranty), PPF, wheel ceramic, undercarriage detail

MEMBERSHIPS (Biweekly):
SINGLE CAR: Essential Maintain $75/mo | Premium $110/mo | Ultimate $145/mo
TWO-CAR: Essential $130/mo | Premium $190/mo | Ultimate $250/mo
THREE-CAR: Essential $180/mo | Premium $265/mo | Ultimate $350/mo

SPECIALTY SERVICES:
- Motorcycle: Road Ready $85-105 | Chrome & Shine $145-185 | Show Bike $245-295
- Marine/RV: Custom quotes
- Fleet/Commercial: Custom plans with volume discounts
- Aircraft: Custom quotes
- Mechanical: Diagnostics + labor $75/hr

GIFT CERTIFICATES: Available in any amount

TONE: Friendly, professional, knowledgeable. Show genuine care. Be conversational. Encourage booking at handsdetailshop.com/quote or calling (412) 752-8684.`;

/**
 * claudeChat - New endpoint for chat widget
 * Accepts: { messages: [{ role, content }], model, max_tokens, system }
 * Returns: Full Claude API response including content array
 */
exports.claudeChat = functions.https.onRequest(async (request, response) => {
  // Apply CORS headers FIRST (before any response/logic)
  applyCors(response);
  
  // Handle OPTIONS preflight request
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { messages, model, max_tokens, system } = request.body;

    // Validation
    if (!messages || !Array.isArray(messages)) {
      return response.status(400).json({ error: 'messages array is required' });
    }

    if (messages.length === 0) {
      return response.status(400).json({ error: 'messages array cannot be empty' });
    }

    console.log('🤖 claudeChat request:', {
      messageCount: messages.length,
      model: model || 'claude-sonnet-4-20250514',
      hasSystem: !!system
    });

    // Initialize Anthropic client
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not set');
      return response.status(500).json({ error: 'Server configuration error' });
    }

    const client = new Anthropic({ apiKey });

    // Make request to Claude
    const claudeResponse = await client.messages.create({
      model: model || 'claude-sonnet-4-20250514',
      max_tokens: max_tokens || 400,
      system: system || SYSTEM_PROMPT,
      messages: messages
    });

    console.log('✓ Claude response successful');

    // Return full response
    return response.status(200).json(claudeResponse);

  } catch (error) {
    console.error('❌ Claude API Error:', error.message);
    
    if (error.message && error.message.includes('API request failed')) {
      return response.status(503).json({
        error: 'Claude API temporarily unavailable',
        content: [{ type: 'text', text: "I'm having trouble connecting. Please call (412) 752-8684!" }]
      });
    }

    return response.status(500).json({
      error: 'Internal server error',
      content: [{ type: 'text', text: "I'm having trouble right now. Please call (412) 752-8684!" }]
    });
  }
});

/**
 * claudeAI - Legacy endpoint (preserved for backward compatibility)
 * Accepts: { message: string }
 * Returns: Claude response text
 */
exports.claudeAI = functions.https.onRequest(async (request, response) => {
  // Apply CORS headers
  applyCors(response);

  // Handle OPTIONS preflight
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = request.body;

    if (!message || typeof message !== 'string') {
      return response.status(400).json({ error: 'message is required' });
    }

    console.log('📝 claudeAI legacy request:', message.substring(0, 50) + '...');

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return response.status(500).json({ error: 'Server configuration error' });
    }

    const client = new Anthropic({ apiKey });

    const claudeResponse = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }]
    });

    console.log('✓ Legacy response successful');

    // Return text content
    const text = claudeResponse.content[0]?.text || 'No response';
    return response.status(200).json({ text, fullResponse: claudeResponse });

  } catch (error) {
    console.error('❌ Legacy API Error:', error.message);
    return response.status(500).json({
      error: 'Internal server error',
      text: "I'm having trouble right now. Please call (412) 752-8684!"
    });
  }
});
