#!/usr/bin/env node

/**
 * Accessibility Validation Script
 * Tests all HTML pages for WCAG 2.1 AA compliance using pa11y
 */

const pa11y = require('pa11y');
const http = require('http');
const fs = require('fs');
const path = require('path');

const HTML_FILES = [
  { path: 'index.html', name: 'Home' },
  { path: 'services.html', name: 'Services' },
  { path: 'membership.html', name: 'Membership' },
  { path: 'reviews.html', name: 'Reviews' },
  { path: 'quote.html', name: 'Quote' },
  { path: 'contact.html', name: 'Contact' },
];

const PORT = 8888;

// Simple HTTP server to serve static files
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const filePath = path.join(process.cwd(), req.url === '/' ? 'index.html' : req.url);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const ext = path.extname(filePath);
        const contentType = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.webp': 'image/webp',
        }[ext] || 'text/plain';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`Test server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function testAccessibility(url, pageName) {
  try {
    const results = await pa11y(url, {
      standard: 'WCAG2AA',
      timeout: 30000,
      wait: 1000,
      chromeLaunchConfig: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    return {
      page: pageName,
      url: url,
      errors: results.issues.filter((i) => i.type === 'error'),
      warnings: results.issues.filter((i) => i.type === 'warning'),
      notices: results.issues.filter((i) => i.type === 'notice'),
    };
  } catch (error) {
    return {
      page: pageName,
      url: url,
      errors: [{ message: `Accessibility test failed: ${error.message}` }],
      warnings: [],
      notices: [],
    };
  }
}

async function main() {
  console.log('♿ Starting accessibility validation...\n');

  // Start local server
  const server = await startServer();

  let allPassed = true;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of HTML_FILES) {
    const url = `http://localhost:${PORT}/${file.path}`;

    console.log(`Testing ${file.name} (${file.path})...`);

    const result = await testAccessibility(url, file.name);

    if (result.errors.length === 0) {
      console.log(`✅ ${file.name} - WCAG 2.1 AA compliant`);
    } else {
      console.log(`❌ ${file.name} - ${result.errors.length} accessibility error(s)`);
      allPassed = false;
    }

    if (result.errors.length > 0) {
      console.log(`   Errors:`);
      result.errors.slice(0, 5).forEach((err) => {
        console.log(`     - ${err.message}`);
        if (err.selector) {
          console.log(`       Selector: ${err.selector}`);
        }
      });
      if (result.errors.length > 5) {
        console.log(`     ... and ${result.errors.length - 5} more errors`);
      }
    }

    if (result.warnings.length > 0) {
      console.log(`   Warnings: ${result.warnings.length}`);
    }

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;

    console.log('');
  }

  // Close server
  server.close();

  console.log('=====================================');
  console.log(`Total pages tested: ${HTML_FILES.length}`);
  console.log(`Total accessibility errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  console.log('=====================================\n');

  if (allPassed) {
    console.log('✅ All pages passed WCAG 2.1 AA compliance!');
    process.exit(0);
  } else {
    console.log('❌ Some pages have accessibility issues');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
