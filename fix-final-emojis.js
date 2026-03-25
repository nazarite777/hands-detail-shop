const fs = require('fs');

const files = ['services.html', 'personal-vehicles.html', 'marine-services.html', 
               'fleet-services.html', 'motorcycle-services.html', 'aircraft-services.html', 'reviews.html'];

const finalReplacements = [
    // Last 2 patterns found in comprehensive scan
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xa6, 0xc2, 0xa0]), replacement: Buffer.from([0xf0, 0x9f, 0x8e, 0xa6]), emoji: '🎦' },
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc5, 0xbd, 0xc2, 0xaf]), replacement: Buffer.from([0xf0, 0x9f, 0x8e, 0x8e]), emoji: '🎎' },
];

let totalFixes = 0;

files.forEach(filename => {
    if (!fs.existsSync(filename)) return;
    
    let buffer = fs.readFileSync(filename);
    const originalSize = buffer.length;
    let fixes = 0;
    
    finalReplacements.forEach(({ pattern, replacement, emoji }) => {
        let index;
        while ((index = buffer.indexOf(pattern)) !== -1) {
            const newBuffer = Buffer.alloc(buffer.length - pattern.length + replacement.length);
            buffer.copy(newBuffer, 0, 0, index);
            replacement.copy(newBuffer, index);
            buffer.copy(newBuffer, index + replacement.length, index + pattern.length);
            buffer = newBuffer;
            fixes++;
        }
    });
    
    if (fixes > 0) {
        fs.writeFileSync(filename, buffer);
        totalFixes += fixes;
        console.log(`✓ ${filename.padEnd(30)} ${fixes} final fixes (${originalSize} → ${buffer.length} bytes)`);
    }
});

console.log(`\n✅ Final emoji fixes: ${totalFixes}`);
