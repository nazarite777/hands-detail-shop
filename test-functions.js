// Test script to call addTestBookings and getBookings functions
const https = require('https');

async function callFunction(path, method = 'GET', authHeader = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'us-central1-hands-detail.cloudfunctions.net',
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (authHeader) {
      options.headers['Authorization'] = authHeader;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.end(method === 'POST' ? '{}' : undefined);
  });
}

async function main() {
  console.log('Testing Cloud Functions deployment...\n');

  try {
    // Test getBookings
    console.log('1️⃣  Testing getBookings...');
    const bookingsRes = await callFunction('/getBookings', 'GET');
    console.log(`   Status: ${bookingsRes.status}`);
    console.log(`   Response:`, JSON.stringify(bookingsRes.data, null, 2).substring(0, 200));
    
    // Test addTestBookings
    console.log('\n2️⃣  Testing addTestBookings...');
    const addRes = await callFunction('/addTestBookings', 'POST', 'Bearer test-key-demo');
    console.log(`   Status: ${addRes.status}`);
    console.log(`   Response:`, JSON.stringify(addRes.data, null, 2));

    if (addRes.status === 200) {
      console.log('\n✅ Test bookings added successfully!');
      // Now check bookings again
      console.log('\n3️⃣  Checking getBookings again...');
      const bookingsRes2 = await callFunction('/getBookings', 'GET');
      console.log(`   Status: ${bookingsRes2.status}`);
      console.log(`   Bookings count:`, bookingsRes2.data.count);
      console.log(`   First booking:`, bookingsRes2.data.bookings?.[0]);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
