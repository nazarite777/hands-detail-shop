const functions = require('firebase-functions');
const cors = require('cors')({ origin: ['https://handsdetailshop.com', 'https://hands-detail.web.app', 'http://localhost'] });
const Anthropic = require('@anthropic-ai/sdk');

// ============================================================
// NEW CHAT WIDGET ENDPOINT
// ============================================================
exports.claudeChat = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { messages, model, max_tokens, system } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'messages array required' });
      }

      const client = new Anthropic({
        apiKey: functions.config().anthropic.key,
      });

      const response = await client.messages.create({
        model: model || 'claude-sonnet-4-20250514',
        max_tokens: max_tokens || 400,
        system: system || '',
        messages: messages,
      });

      return res.status(200).json(response);

    } catch (err) {
      console.error('Claude API error:', err);
      return res.status(500).json({
        error: 'Internal error',
        content: [{ text: "I'm having trouble right now. Please call (412) 752-8684!" }]
      });
    }
  });
});

// ============================================================
// LEGACY ENDPOINT (for backward compatibility)
// ============================================================
exports.claudeAI = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { prompt } = req.body;
      if (!prompt) {
        res.status(400).json({ error: 'prompt required' });
        return;
      }

      const client = new Anthropic({
        apiKey: functions.config().anthropic.key,
      });

      const response = await client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      res.status(200).json({ response: response.content[0].text });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal error' });
    }
  });
});
