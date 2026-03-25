const fs = require('fs');

const buf = fs.readFileSync('services.html');
const marker = Buffer.from([0xc3, 0xb0]);
const str = buf.toString('utf8');

console.log('=== FINDING REMAINING CORRUPTIONS ===\n');

let idx = 0;
let count = 0;
let found = new Map();

// Find all marker instances
while ((idx = buf.indexOf(marker, idx)) > -1) {
    // Get surrounding context in UTF8
    const context = str.substring(
        Math.max(0, idx - 10),
        Math.min(str.length, idx + 30)
    );
    
    // Get the next 12 bytes for the pattern
    const patternBytes = [];
    for (let i = 0; i < 12 && idx + i < buf.length; i++) {
        patternBytes.push(buf[idx + i]);
    }
    const patternHex = patternBytes.map(b => '0x' + b.toString(16).padStart(2, '0')).join(', ');
    
    const key = patternHex;
    if (!found.has(key)) {
        found.set(key, context.replace(/\n/g, ' ').substring(0, 50));
        count++;
    }
    
    idx++;
}

console.log(`Found ${count} unique corrupted patterns:\n`);
found.forEach((context, bytes) => {
    console.log('Pattern: [' + bytes + ']');
    console.log('Context: ' + context);
    console.log('');
});
