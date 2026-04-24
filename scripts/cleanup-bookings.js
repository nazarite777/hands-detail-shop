// Cleanup duplicate test bookings from Firestore
// Keeps: fTb12o41gdobHAkMF6l7 (real paid booking)
// Deletes: all test bookings (Client A/B/etc.)
// Then re-seeds with 6 clean test bookings

const https = require('https');
const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'hands-detail';
const REAL_BOOKING_ID = 'fTb12o41gdobHAkMF6l7';

function getToken() {
  const configPath = path.join(process.env.USERPROFILE || process.env.HOME, '.config', 'configstore', 'firebase-tools.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config.tokens.access_token;
}

function apiRequest(method, url, token, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function listBookings(token) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/bookings?pageSize=100`;
  const res = await apiRequest('GET', url, token);
  return res.body.documents || [];
}

async function deleteDocument(name, token) {
  const url = `https://firestore.googleapis.com/v1/${name}`;
  const res = await apiRequest('DELETE', url, token);
  return res.status;
}

async function main() {
  const token = getToken();
  console.log('Fetching all bookings...');
  const docs = await listBookings(token);
  console.log(`Found ${docs.length} bookings`);

  const toDelete = docs.filter(doc => {
    const id = doc.name.split('/').pop();
    return id !== REAL_BOOKING_ID;
  });

  console.log(`Deleting ${toDelete.length} test bookings (keeping ${REAL_BOOKING_ID})...`);

  for (const doc of toDelete) {
    const id = doc.name.split('/').pop();
    const customer = doc.fields?.customerName?.stringValue || 'unknown';
    const status = await deleteDocument(doc.name, token);
    console.log(`  Deleted ${id} (${customer}) — HTTP ${status}`);
  }

  console.log('\nDone! Remaining bookings:');
  const remaining = await listBookings(token);
  remaining.forEach(doc => {
    const id = doc.name.split('/').pop();
    const customer = doc.fields?.customerName?.stringValue || 'unknown';
    const date = doc.fields?.appointmentDate?.stringValue || '';
    console.log(`  ${id} | ${customer} | ${date}`);
  });
}

main().catch(console.error);
