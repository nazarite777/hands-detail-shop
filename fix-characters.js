const fs = require('fs');
const path = require('path');

const replacements = [
  { old: 'â˜…', new: '⭐' },
  { old: 'ðŸ•'', new: '🕐' },
  { old: 'ðŸ"ž', new: '📞' },
  { old: 'ðŸ'¬', new: '💬' },
  { old: 'ðŸŽŠ', new: '🎊' },
  { old: 'ðŸ'Ž', new: '💎' },
  { old: 'ðŸ'³', new: '💳' },
  { old: 'ðŸ"', new: '📍' },
  { old: 'ðŸŒŠ', new: '🌊' },
  { old: 'âœ‰ï¸', new: '✉️' },
  { old: 'ðŸ"§', new: '🔧' },
  { old: 'ðŸ"©', new: '📩' },
  { old: 'â€"', new: '–' }
];

function getAllHtmlFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getAllHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const rootDir = 'c:\\users\\cbevv\\hands-detail-shop';
const htmlFiles = getAllHtmlFiles(rootDir);

console.log(`Found ${htmlFiles.length} HTML files\n`);

let fixedCount = 0;

for (const file of htmlFiles) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    for (const rep of replacements) {
      content = content.replaceAll(rep.old, rep.new);
    }
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      const relPath = path.relative(rootDir, file);
      console.log(`✓ ${relPath}`);
      fixedCount++;
    }
  } catch (err) {
    console.log(`✗ Error: ${file}`);
  }
}

console.log(`\nDone! Fixed ${fixedCount} files.`);
