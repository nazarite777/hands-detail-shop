const fs = require('fs');
const path = require('path');

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

// Map of corrupted patterns to proper emojis
const replacements = [
    { corrupted: 'ðŸ•'', proper: '🕒' },  // clock
    { corrupted: 'ðŸ"ž', proper: '📞' },  // phone  
    { corrupted: 'ðŸ'¬', proper: '💬' },  // chat bubble
    { corrupted: 'ðŸ'Ž', proper: '💎' },  // gem
    { corrupted: 'ðŸ'³', proper: '💳' },  // credit card
    { corrupted: 'ðŸ"', proper: '📍' },   // location pin
    { corrupted: 'ðŸš—', proper: '🚗' },  // car
    { corrupted: 'ðŸ'', proper: '✨' },   // sparkles
];

console.log('Starting emoji corruption fix...\n');

files.forEach(filename => {
    if (!fs.existsSync(filename)) {
        console.log(`✗ File not found: ${filename}`);
        return;
    }

    try {
        let content = fs.readFileSync(filename, 'utf8');
        const originalLength = content.length;
        
        // Apply all replacements
        replacements.forEach(({ corrupted, proper }) => {
            const globalRegex = new RegExp(corrupted, 'g');
            content = content.replace(globalRegex, proper);
        });
        
        // Write back
        fs.writeFileSync(filename, content, 'utf8');
        
        const newLength = content.length;
        console.log(`✓ Fixed ${filename} (${originalLength} → ${newLength})`);
        
    } catch (error) {
        console.log(`✗ Error processing ${filename}: ${error.message}`);
    }
});

console.log('\nEmoji corruption fix complete!');
