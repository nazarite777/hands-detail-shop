const fs = require('fs');

// All HTML files to check and fix
const files = [
    'services.html',
    'personal-vehicles.html',
    'marine-services.html',
    'fleet-services.html',
    'motorcycle-services.html',
    'aircraft-services.html',
    'reviews.html'
];

// Comprehensive emoji fix patterns
const replacements = [
    // Party/Celebration
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc5, 0x8a]), replacement: Buffer.from([0xf0, 0x9f, 0x8e, 0x8a]) },  // 🎊
    
    // Diamond/Gem
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0x8e]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0x8e]) },  // 💎
    
    // Credit Card  
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x98, 0xc2, 0xb3]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0xb3]) },  // 💳
    
    // Lightbulb
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x99, 0xc2, 0xa1]), replacement: Buffer.from([0xf0, 0x9f, 0x92, 0xa1]) },  // 💡
    
    // Car/Sedan
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xb7, 0xe2, 0x80, 0x94]), replacement: Buffer.from([0xf0, 0x9f, 0x9a, 0x97]) },  // 🚗
    
    // SUV
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xb7, 0xe2, 0x80, 0x99]), replacement: Buffer.from([0xf0, 0x9f, 0x9a, 0x99]) },  // 🚙
    
    // Taxi/Car
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xb7, 0xe2, 0x80, 0xa2]), replacement: Buffer.from([0xf0, 0x9f, 0x9a, 0x95]) },  // 🚕
    
    // Checkmark
    { pattern: Buffer.from([0xc3, 0xa2, 0xcb, 0x9c, 0xef, 0xb8, 0x8f]), replacement: Buffer.from([0xe2, 0x9c, 0x93]) },  // ✓
    { pattern: Buffer.from([0xc3, 0xa2, 0xcb, 0x9c, 0x20]), replacement: Buffer.from([0xe2, 0x9c, 0x93, 0x20]) },  // ✓ (with space)
    
    // Sparkles
    { pattern: Buffer.from([0xc3, 0xa2, 0xcb, 0x9c, 0xc2, 0xa8]), replacement: Buffer.from([0xe2, 0x9c, 0xa8]) },  // ✨
    
    // Chart/Bar graph
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x9c, 0xca, 0x8a]), replacement: Buffer.from([0xf0, 0x9f, 0x93, 0x8a]) },  // 📊
    
    // Promo banner variations
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc5, 0x8a, 0x20]), replacement: Buffer.from([0xf0, 0x9f, 0x8e, 0x8a, 0x20]) },  // 🎊 
    
    // Car (other variant)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xe2, 0x80, 0x99, 0xc2, 0xb7]), replacement: Buffer.from([0xf0, 0x9f, 0x9a, 0x97]) },  // 🚗
    
    // Truck/Van (already defined but including alt variant)
    { pattern: Buffer.from([0xc3, 0xb0, 0xc5, 0xb8, 0xc2, 0xb7, 0xc2, 0x9b]), replacement: Buffer.from([0xf0, 0x9f, 0x9a, 0x9b]) },  // 🚛
];

console.log('Fixing hero section emojis in service pages and reviews...\n');

let totalReplacements = 0;

files.forEach(filename => {
    if (!fs.existsSync(filename)) {
        console.log(`⊘ ${filename} not found`);
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
            console.log(`✓ ${filename.padEnd(28)} ${replacementCount} fixes (${originalLength} → ${newLength} bytes)`);
            totalReplacements += replacementCount;
        }

    } catch (error) {
        console.log(`✗ Error with ${filename}: ${error.message}`);
    }
});

console.log(`\n✅ Total emoji fixes: ${totalReplacements}`);
console.log('Hero section emoji corruption fix complete!');
