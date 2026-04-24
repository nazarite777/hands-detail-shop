// Script to grant allUsers invoker permission to Firebase Cloud Functions
const https = require('https');

const PROJECT = 'hands-detail';
const REGION = 'us-central1';
const FUNCTIONS = ['getBookings', 'addTestBookings'];

// Read access token from firebase-tools config
const fs = require('fs');
const os = require('os');
const path = require('path');
const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const ACCESS_TOKEN = config.tokens.access_token;

async function setIAMPolicy(funcName) {
    return new Promise((resolve, reject) => {
        // First get current IAM policy
        const resourceName = `projects/${PROJECT}/locations/${REGION}/functions/${funcName}`;
        const getOptions = {
            hostname: 'cloudfunctions.googleapis.com',
            path: `/v2/${resourceName}:getIamPolicy`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const getReq = https.request(getOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    console.log(`  GET IAM status: ${res.statusCode}`);
                    const policy = JSON.parse(data);
                    
                    if (res.statusCode === 404) {
                        // Function doesn't exist or use v1 API
                        setIAMPolicyV1(funcName).then(resolve).catch(reject);
                        return;
                    }
                    
                    // Add allUsers invoker binding
                    const bindings = policy.bindings || [];
                    const invokerBinding = bindings.find(b => b.role === 'roles/cloudfunctions.invoker');
                    
                    if (invokerBinding) {
                        if (!invokerBinding.members.includes('allUsers')) {
                            invokerBinding.members.push('allUsers');
                        }
                    } else {
                        bindings.push({
                            role: 'roles/cloudfunctions.invoker',
                            members: ['allUsers']
                        });
                    }

                    const body = JSON.stringify({ policy: { ...policy, bindings } });
                    
                    const setOptions = {
                        hostname: 'cloudfunctions.googleapis.com',
                        path: `/v2/${resourceName}:setIamPolicy`,
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${ACCESS_TOKEN}`,
                            'Content-Type': 'application/json',
                            'Content-Length': Buffer.byteLength(body)
                        }
                    };

                    const setReq = https.request(setOptions, (setRes) => {
                        let setData = '';
                        setRes.on('data', chunk => setData += chunk);
                        setRes.on('end', () => {
                            console.log(`  SET IAM status: ${setRes.statusCode}`);
                            if (setRes.statusCode >= 200 && setRes.statusCode < 300) {
                                console.log(`  ✅ Granted allUsers invoker permission`);
                                resolve();
                            } else {
                                console.log(`  Response: ${setData.substring(0, 200)}`);
                                // Try V1 API
                                setIAMPolicyV1(funcName).then(resolve).catch(reject);
                            }
                        });
                    });

                    setReq.on('error', () => setIAMPolicyV1(funcName).then(resolve).catch(reject));
                    setReq.write(body);
                    setReq.end();
                    
                } catch (e) {
                    console.log(`  Parse error, trying v1...`);
                    setIAMPolicyV1(funcName).then(resolve).catch(reject);
                }
            });
        });

        getReq.on('error', () => setIAMPolicyV1(funcName).then(resolve).catch(reject));
        getReq.end();
    });
}

async function setIAMPolicyV1(funcName) {
    return new Promise((resolve, reject) => {
        const resourceName = `projects/${PROJECT}/locations/${REGION}/functions/${funcName}`;
        
        // Get current policy first
        const getOptions = {
            hostname: 'cloudfunctions.googleapis.com',
            path: `/v1/${resourceName}:getIamPolicy`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const getReq = https.request(getOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`  GET v1 IAM status: ${res.statusCode}`);
                
                let policy = {};
                try { policy = JSON.parse(data); } catch(e) {}
                
                const bindings = policy.bindings || [];
                const invokerBinding = bindings.find(b => b.role === 'roles/cloudfunctions.invoker');
                
                if (invokerBinding) {
                    if (!invokerBinding.members.includes('allUsers')) {
                        invokerBinding.members.push('allUsers');
                    }
                } else {
                    bindings.push({
                        role: 'roles/cloudfunctions.invoker',
                        members: ['allUsers']
                    });
                }

                const body = JSON.stringify({ policy: { ...policy, bindings } });
                
                const setOptions = {
                    hostname: 'cloudfunctions.googleapis.com',
                    path: `/v1/${resourceName}:setIamPolicy`,
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`,
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(body)
                    }
                };

                const setReq = https.request(setOptions, (setRes) => {
                    let setData = '';
                    setRes.on('data', chunk => setData += chunk);
                    setRes.on('end', () => {
                        console.log(`  SET v1 IAM status: ${setRes.statusCode}`);
                        if (setRes.statusCode >= 200 && setRes.statusCode < 300) {
                            console.log(`  ✅ v1 permission granted!`);
                            resolve();
                        } else {
                            console.log(`  Response: ${setData.substring(0, 300)}`);
                            reject(new Error(`Failed: ${setRes.statusCode}`));
                        }
                    });
                });

                setReq.on('error', reject);
                setReq.write(body);
                setReq.end();
            });
        });

        getReq.on('error', reject);
        getReq.end();
    });
}

async function main() {
    console.log('🔑 Setting IAM policies for Cloud Functions...\n');
    
    for (const funcName of FUNCTIONS) {
        console.log(`\n📌 Processing: ${funcName}`);
        try {
            await setIAMPolicy(funcName);
        } catch (e) {
            console.error(`  ❌ Error: ${e.message}`);
        }
    }
    
    console.log('\n⏳ Waiting 5 seconds then testing...');
    await new Promise(r => setTimeout(r, 5000));
    
    // Test
    console.log('\n🧪 Testing getBookings...');
    const test = await new Promise((resolve) => {
        const req = https.request({
            hostname: 'us-central1-hands-detail.cloudfunctions.net',
            path: '/getBookings',
            method: 'GET'
        }, (res) => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve({ status: res.statusCode, data: d.substring(0, 200) }));
        });
        req.on('error', e => resolve({ error: e.message }));
        req.end();
    });
    
    console.log(`  Status: ${test.status}`);
    if (test.status === 200) {
        console.log('  ✅ getBookings is now publicly accessible!');
    } else {
        console.log('  Response:', test.data || test.error);
    }
}

main().catch(console.error);
