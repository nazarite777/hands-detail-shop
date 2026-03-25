const fs = require('fs');

const files = [
    'services.html', 'booking.html', 'booking-confirmation.html',
    'contact.html', 'careers.html', 'faq.html', 'gallery.html',
    'membership.html', 'portal.html', 'rewards.html',
    'reviews.html', 'aircraft-services.html', 'blog-auto-detailing-guide.html',
    'fleet-services.html', 'marine-services.html', 'motorcycle-services.html',
    'personal-vehicles.html', 'gift-certificates.html'
];

// Extended list of corrupted patterns with proper replacements
const replacements = [
    // Original patterns (already fixed versions exist but checking again)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0xa2, 0xe2, 0x80, 0x99]), replacement: Buffer.from([0xf0, 0x9f, 0x95, 0x92]) },
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x9c, 0xc5, 0xbe]), replacement: Buffer.from([0xf0, 0x9f, 0x93, 0x9e]) },
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x99, 0xc2, 0xac]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0xac]) },
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0x8e]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0x8e]) },
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0xb3]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0xb3]) },
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x9c, 0x20]), replacement: Buffer.from([0xf0, 0x9f, 0x93, 0x8d, 0x20]) },
    
    // Additional patterns from dropdown
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x9c, 0xcb, 0x8b]), replacement: Buffer.from([0xf0, 0x9f, 0x93, 0x8b]) },  // 📋
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xb7, 0xe2, 0x80, 0x94]), replacement: Buffer.from([0xf0, 0x9f, 0x9a, 0x97]) },  // 🚗
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x9b, 0xc2, 0xa5, 0xef, 0xb8, 0x8f]), replacement: Buffer.from([0xf0, 0x9f, 0x9b, 0xa5, 0xef, 0xb8, 0x8f]) },  // 🛥️
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xb7, 0xc2, 0x9b]), replacement: Buffer.from([0xf0, 0x9f, 0x9a, 0x9b]) },  // 🚛
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xcf, 0x8f, 0x20]), replacement: Buffer.from([0xf0, 0x9f, 0x8f, 0x8d, 0x20]) },  // 🏍️
    { pattern: Buffer.from([0xc3, 0xa2, 0xcb, 0x9c, 0xef, 0xb8, 0x8f]), replacement: Buffer.from([0xe2, 0x9c, 0x88, 0xef, 0xb8, 0x8f]) },  // ✈️
    { pattern: Buffer.from([0xc3, 0xa2, 0xcb, 0x99, 0xef, 0xb8, 0x8f]), replacement: Buffer.from([0xe2, 0x9a, 0x99, 0xef, 0xb8, 0x8f]) },  // ⚙️
];

console.log('Comprehensive emoji fix - scanning all HTML files...\n');

let totalReplacements = 0;

files.forEach(filename => {
    if (!fs.existsSync(filename)) {
        return;
    }

    try {
        let buffer = fs.readFileSync(filename);
        const originalLength = buffer.length;
        let replacementCount = 0;

        // Apply all replacements
        replacements.forEach(({ pattern, replacement }) => {
            let index;
            while ((index = buffer.indexOf(pattern)) !== -1) {
                const newBuffer = Buffer.alloc(buffer.length - pattern.length + replacement.length);
                buffer.copy(newBuffer, 0, 0, index);
                replacement.copy(newBuffer, index);
                buffer.copy(newBuffer, index + replacement.length, index + pattern.length);
                buffer = newBuffer;
                replacementCount++;
            }
        });

        if (replacementCount > 0) {
            fs.writeFileSync(filename, buffer);
            const newLength = buffer.length;
            console.log(`✓ ${filename} (${replacementCount} fixes, ${originalLength} → ${newLength} bytes)`);
            totalReplacements += replacementCount;
        }

    } catch (error) {
        console.log(`✗ Error with ${filename}: ${error.message}`);
    }
});

console.log(`\n✅ Total replacements: ${totalReplacements}`);
console.log('Emoji corruption fix complete!');
