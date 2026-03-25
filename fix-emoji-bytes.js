const fs = require('fs');

const files = [
    'reviews.html',
    'aircraft-services.html',
    'blog-auto-detailing-guide.html',
    'fleet-services.html',
    'marine-services.html',
    'motorcycle-services.html',
    'personal-vehicles.html',
    'gift-certificates.html',
    'services.html',
    'booking.html',
    'booking-confirmation.html',
    'contact.html',
    'careers.html',
    'faq.html',
    'gallery.html',
    'membership.html',
    'portal.html',
    'rewards.html'
    // c3 b0 c5 b8 e2 80 9c c5 be (ðŸ"ž) → 📞 (F0 9F 93 9E)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x9c, 0xc5, 0xbe]), replacement: Buffer.from([0xf0, 0x9f, 0x93, 0x9e]) },
    
    // c3 b0 c5 b8 e2 80 99 c2 ac (ðŸ'¬) → 💬 (F0 9F 92 AC)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x99, 0xc2, 0xac]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0xac]) },
    
    // c3 b0 c5 b8 e2 80 98 c2 8e (ðŸ'Ž) → 💎 (F0 9F 92 8E)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0x8e]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0x8e]) },
    
    // c3 b0 c5 b8 e2 80 98 c2 b3 (ðŸ'³) → 💳 (F0 9F 92 B3)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0xb3]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0xb3]) },
    
    // c3 b0 c5 b8 e2 80 9c 20 (ðŸ" ) → 📍 (F0 9F 93 8D followed by space)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x9c, 0x20]), replacement: Buffer.from([0xf0, 0x9f, 0x93, 0x8d, 0x20]) },
];

console.log('Starting byte-level emoji fix...\n');

files.forEach(filename => {
    if (!fs.existsSync(filename)) {
        console.log(`✗ File not found: ${filename}`);
        return;
    }

    try {
        let buffer = fs.readFileSync(filename);
        const originalLength = buffer.length;
        let replacementCount = 0;

        // Apply replacements
        replacements.forEach(({ pattern, replacement }) => {
            let index ;
            while ((index = buffer.indexOf(pattern)) !== -1) {
                const newBuffer = Buffer.alloc(buffer.length - pattern.length + replacement.length);
                buffer.copy(newBuffer, 0, 0, index);
                replacement.copy(newBuffer, index);
                buffer.copy(newBuffer, index + replacement.length, index + pattern.length);
                buffer = newBuffer;
                replacementCount++;
            }
        });

        // Write back
        fs.writeFileSync(filename, buffer);

        const newLength = buffer.length;
        console.log(`✓ Fixed ${filename} (${replacementCount} replacements, ${originalLength} → ${newLength} bytes)`);

    } catch (error) {
        console.log(`✗ Error processing ${filename}: ${error.message}`);
    }
});

console.log('\nByte-level emoji fix complete!');
