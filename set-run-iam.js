// Script to grant allUsers Cloud Run invoker permission (needed for 1st gen functions)
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');

const PROJECT = 'hands-detail';
const REGION = 'us-central1';
const FUNCTIONS = ['getBookings', 'addTestBookings'];

const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const ACCESS_TOKEN = config.tokens.access_token;

async function makeRequest(options, body) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: data }));
        });
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

async function grantCloudRunInvoker(funcName) {
    // Cloud Run service name for a 1st gen Cloud Function
    const serviceName = `projects/${PROJECT}/locations/${REGION}/services/${funcName}`;
    
    console.log(`\n📌 Cloud Run IAM for: ${funcName}`);
    
    // Get current policy
    const getRes = await makeRequest({
        hostname: 'run.googleapis.com',
        path: `/v1/${serviceName}:getIamPolicy`,
        method: 'GET',
        headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
    });
    
    console.log(`  GET Cloud Run IAM: ${getRes.status}`);
    
    if (getRes.status === 404) {
        console.log(`  Service not found as Cloud Run service. Skipping.`);
        return;
    }
    
    let policy = {};
    try { policy = JSON.parse(getRes.body); } catch(e) {}
    
    const bindings = policy.bindings || [];
    const invokerIdx = bindings.findIndex(b => b.role === 'roles/run.invoker');
    
    if (invokerIdx >= 0) {
        if (!bindings[invokerIdx].members.includes('allUsers')) {
            bindings[invokerIdx].members.push('allUsers');
        }
    } else {
        bindings.push({ role: 'roles/run.invoker', members: ['allUsers'] });
    }
    
    const body = JSON.stringify({ policy: { ...policy, bindings } });
    
    const setRes = await makeRequest({
        hostname: 'run.googleapis.com',
        path: `/v1/${serviceName}:setIamPolicy`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    }, body);
    
    console.log(`  SET Cloud Run IAM: ${setRes.status}`);
    if (setRes.status >= 200 && setRes.status < 300) {
        console.log(`  ✅ Cloud Run invoker granted!`);
    } else {
        console.log(`  Response: ${setRes.body.substring(0, 300)}`);
    }
}

async function testFunction(funcName, headers = {}) {
    const res = await makeRequest({
        hostname: 'us-central1-hands-detail.cloudfunctions.net',
        path: `/${funcName}`,
        method: funcName === 'addTestBookings' ? 'POST' : 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    }, funcName === 'addTestBookings' ? '{}' : undefined);
    
    return res;
}

async function main() {
    console.log('🔑 Setting Cloud Run IAM policies...\n');
    
    for (const fn of FUNCTIONS) {
        await grantCloudRunInvoker(fn);
    }
    
    console.log('\n⏳ Waiting 5 seconds...');
    await new Promise(r => setTimeout(r, 5000));
    
    console.log('\n🧪 Testing addTestBookings (with auth header)...');
    const testRes = await testFunction('addTestBookings', {
        'Authorization': 'Bearer test-key-hands-detail-2024'
    });
    
    console.log(`  Status: ${testRes.status}`);
    console.log(`  Body: ${testRes.body.substring(0, 500)}`);
}

main().catch(console.error);
