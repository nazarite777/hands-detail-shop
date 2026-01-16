const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Phone number replacements
const replacements = [
  { old: /\(412\) 752-8684/g, new: '(412) 752-8684' },
  { old: /412-752-8684/g, new: '412-947-6098' },
  { old: /4127528684/g, new: '4127528684' },
  { old: /\+14127528684/g, new: '+14127528684' },
  { old: /412 752 8684/g, new: '412 947 6098' },
  { old: /412\.752\.8684/g, new: '412.947.6098' },
];

// Files to update
const filesToUpdate = [
  'index.html',
  'services.html',
  'booking.html',
  'contact.html',
  'membership.html',
  'gallery.html',
  'reviews.html',
  'faq.html',
  'quote.html',
  'portal.html',
  'rewards.html',
  'gift-certificates.html',
  'main.js',
  'email-integration.js',
  '__tests__/main.test.js',
  'README.md',
  'CONTRIBUTING.md',
  'NEW_FEATURES.md'
];

let totalReplacements = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(rootDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;

  replacements.forEach(({ old, new: newValue }) => {
    const matches = content.match(old);
    if (matches) {
      fileReplacements += matches.length;
      content = content.replace(old, newValue);
    }
  });

  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${file} (${fileReplacements} replacements)`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`ℹ No changes needed for ${file}`);
  }
});

console.log(`\n🎉 Complete! Updated phone number in ${totalReplacements} locations across ${filesToUpdate.length} files.`);
console.log('Old number: (412) 752-8684');
console.log('New number: (412) 752-8684');
