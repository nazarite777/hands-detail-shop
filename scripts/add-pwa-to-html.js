const fs = require('fs');
const path = require('path');

// PWA meta tags to insert after theme-color
const PWA_META_TAGS = `
    <!-- PWA Meta Tags -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Hands Detail">

    <!-- PWA Icons -->
    <link rel="apple-touch-icon" href="/20200723_030424~2.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/20200723_030424~2.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/20200723_030424~2.png">

    <!-- Web App Manifest -->
    <link rel="manifest" href="/manifest.json">
`;

// PWA installer script
const PWA_SCRIPT = '    <script src="pwa-installer.js"></script>\n';

// Get all HTML files in the root directory
const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir)
  .filter(file => file.endsWith('.html') && file !== 'index.html'); // Skip index.html as it's already updated

console.log(`Found ${htmlFiles.length} HTML files to update (excluding index.html)`);

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add PWA meta tags after theme-color if not already present
  if (!content.includes('<!-- PWA Meta Tags -->')) {
    const themeColorPattern = /(<meta name="msapplication-TileColor" content="#1565c0">)/;
    if (themeColorPattern.test(content)) {
      content = content.replace(
        themeColorPattern,
        `$1${PWA_META_TAGS}`
      );
      modified = true;
      console.log(`✓ Added PWA meta tags to ${file}`);
    } else {
      console.log(`⚠ Could not find theme-color meta tag in ${file}`);
    }
  }

  // Add PWA installer script before closing body tag if not already present
  if (!content.includes('pwa-installer.js')) {
    // Look for main.js script tag
    const mainJsPattern = /(<script src="main\.js"><\/script>)/;
    if (mainJsPattern.test(content)) {
      content = content.replace(
        mainJsPattern,
        `$1\n${PWA_SCRIPT}`
      );
      modified = true;
      console.log(`✓ Added PWA installer script to ${file}`);
    } else {
      // If main.js not found, add before closing body tag
      const bodyPattern = /(    <\/body>)/;
      if (bodyPattern.test(content)) {
        content = content.replace(
          bodyPattern,
          `${PWA_SCRIPT}\n$1`
        );
        modified = true;
        console.log(`✓ Added PWA installer script before </body> in ${file}`);
      } else {
        console.log(`⚠ Could not find suitable location for script in ${file}`);
      }
    }
  }

  // Write the modified content back to the file
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Successfully updated ${file}\n`);
  } else {
    console.log(`ℹ No changes needed for ${file}\n`);
  }
});

console.log('PWA setup complete for all HTML files!');
