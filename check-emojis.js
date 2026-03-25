const fs = require('fs');

// Check if the bytes we're trying to fix actually exist in services.html
const buf = fs.readFileSync('services.html');
const str = buf.toString('utf8');

console.log('=== CHECKING CORRUPTION STATUS ===\n');

// Check if corrupted display pattern exists
const corruptedDisplay = 'ðŸ';
if (str.includes(corruptedDisplay)) {
    console.log('✗ Corrupted display pattern "ðŸ" STILL EXISTS');
    const idx = str.indexOf(corruptedDisplay);
    console.log('First occurrence at character:', idx);
    const context = str.substring(idx - 10, idx + 20);
    console.log('Context:', context.replace(/\n/g, ' '));
    
    // Show bytes around it
    console.log('\nBytes around corruption:');
    for (let i = 0; i < 20; i++) {
        process.stdout.write(buf[idx + i].toString(16).padStart(2, '0') + ' ');
        if ((i + 1) % 10 === 0) console.log('');
    }
    console.log('\n');
} else {
    console.log('✓ No corrupted "ðŸ" pattern found!');
}

// Check for correct emojis
const correctEmojis = ['🎊', '💎', '💳', '🏍️', '🛥️', '🚛', '🚗', '🏆', '📅', '🌱'];
console.log('\n=== CHECKING FOR CORRECT EMOJIS ===');
correctEmojis.forEach(emoji => {
    const found = str.includes(emoji);
    console.log((found ? '✓' : '✗') + ' ' + emoji + ': ' + (found ? 'FOUND' : 'NOT FOUND'));
});

// Count remaining corruptions
let corruptCount = 0;
let idx = buf.indexOf(Buffer.from([0xc3, 0xb0]));
while (idx > -1) {
    corruptCount++;
    idx = buf.indexOf(Buffer.from([0xc3, 0xb0]), idx + 1);
}
console.log('\nRemaining corruption markers (0xc3 0xb0):', corruptCount);
