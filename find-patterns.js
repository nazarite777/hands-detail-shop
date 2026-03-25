const fs = require('fs');
const buf = fs.readFileSync('services.html');

// Find all unique corrupted patterns
const patterns = new Map();
const prefix = Buffer.from([0xc3, 0xb0, 0xc5, 0xb8]);

let idx = buf.indexOf(prefix);
while (idx > -1) {
    // Get the next 10 bytes after the prefix to capture full pattern
    const endIdx = Math.min(idx + prefix.length + 10, buf.length);
    const fullPattern = buf.slice(idx, endIdx);
    const key = fullPattern.toString('hex');
    
    if (!patterns.has(key)) {
        const contextStr = buf.toString('utf8', idx - 5, Math.min(idx + 30, buf.length));
        patterns.set(key, contextStr.replace(/\n/g, ' ').substring(0, 50));
    }
    idx = buf.indexOf(prefix, idx + 1);
}

console.log('Unique corrupted patterns found:');
patterns.forEach((context, hex) => {
    console.log(`\nHex: ${hex}`);
    console.log(`Bytes: [${hex.match(/.{1,2}/g).map(b => '0x' + b).join(', ')}]`);
    console.log(`Context: ${context}`);
});
