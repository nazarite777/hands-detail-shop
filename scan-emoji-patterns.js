const fs = require('fs');

const files = [
    'reviews.html',
    'aircraft-services.html', 
    'blog-auto-detailing-guide.html',
    'fleet-services.html',
    'marine-services.html',
    'motorcycle-services.html',
    'personal-vehicles.html',
    'gift-certificates.html'
];

const allPatterns = new Map();

files.forEach(filename => {
    if (!fs.existsSync(filename)) return;
    
    const buf = fs.readFileSync(filename);
    const str = buf.toString('utf8');
    
    let idx = str.indexOf('ðŸ');
    while (idx > -1) {
        // Get the bytes starting from ðŸ
        const hex = [];
        for (let i = 0; i < 12; i++) {
            hex.push(buf[idx + i].toString(16).padStart(2, '0'));
        }
        // Only store if it starts with c3 b0 c5 b8 (the ðŸ prefix)
        if (hex[0] === 'c3' && hex[1] === 'b0' && hex[2] === 'c5' && hex[3] === 'b8') {
            const hexStr = hex.slice(0, 10).join(' ');
            if (!allPatterns.has(hexStr)) {
                allPatterns.set(hexStr, 0);
            }
            allPatterns.set(hexStr, allPatterns.get(hexStr) + 1);
        }
        idx = str.indexOf('ðŸ', idx + 1);
    }
});

console.log('Remaining ðŸ-prefix patterns:\n');
[...allPatterns.entries()].sort((a, b) => b[1] - a[1]).forEach(([hex, count]) => {
    console.log('c3 b0 c5 b8 ' + hex + ' (' + count + 'x)');
});
