#!/usr/bin/env node

// Direct deployment helper
const { execSync } = require('child_process');

console.log('🚀 Attempting Firebase hosting deploy with extended timeout...\n');

try {
  process.env.FIRESTORE_EMULATOR_HOST = undefined;
  
  const result = execSync('firebase deploy --only hosting --token=$FIREBASE_TOKEN', {
    stdio: 'inherit',
    timeout: 600000, // 10 minutes
    shell: true
  });
  
  console.log('\n✅ Deploy completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Deploy failed:', error.message);
  process.exit(1);
}
