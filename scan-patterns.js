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
        const hex = [];
        for (let i = 0; i < 12; i++) {
            hex.push(buf[idx + i].toString(16).padStart(2, '0'));
        }
        const hexStr = hex.join(' ');
        if (!allPatterns.has(hexStr)) {
            allPatterns.set(hexStr, { count: 0, char: str[idx+2] });
        }
        allPatterns.get(hexStr).count++;
        idx = str.indexOf('ðŸ', idx + 1);
    }
});

console.log('All remaining corrupted patterns:\n');
allPatterns.forEach((val, hex) => {
    console.log(hex + ' (' + val.count + 'x)');
});
