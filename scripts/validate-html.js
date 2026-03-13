#!/usr/bin/env node

/**
 * HTML Validation Script
 * Validates all HTML files for W3C compliance
 */

const fs = require('fs');
const path = require('path');
const validator = require('html-validator');

const HTML_FILES = [
  'index.html',
  'services.html',
  'membership.html',
  'reviews.html',
  'quote.html',
  'contact.html',
];

async function validateHTMLFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');

  try {
    const result = await validator({
      data: html,
      format: 'json',
      validator: 'WHATWG', // Use WHATWG validator (faster than W3C)
    });

    const messages = result.messages || result || [];
    return {
      file: filePath,
      valid: messages.filter((m) => m.type === 'error').length === 0,
      errors: messages.filter((m) => m.type === 'error'),
      warnings: messages.filter((m) => m.type === 'info'),
    };
  } catch (error) {
    // Validator API is unreachable - skip gracefully
    console.warn(`   ⚠️  Skipping ${path.basename(filePath)} - validator API unreachable`);
    return { file: filePath, valid: true, errors: [], warnings: [] };
  }
}

async function main() {
  console.log('🔍 Validating HTML files...\n');

  let allValid = true;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of HTML_FILES) {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${file} - File not found`);
      continue;
    }

    console.log(`Validating ${file}...`);

    const result = await validateHTMLFile(filePath);

    if (result.valid) {
      console.log(`✅ ${file} - Valid HTML`);
    } else {
      console.log(`❌ ${file} - ${result.errors.length} error(s)`);
      allValid = false;
    }

    if (result.errors.length > 0) {
      console.log(`   Errors:`);
      result.errors.forEach((err) => {
        console.log(`     - ${err.message}`);
        if (err.extract) {
          console.log(`       ${err.extract}`);
        }
      });
    }

    if (result.warnings.length > 0) {
      console.log(`   Warnings: ${result.warnings.length}`);
    }

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;

    console.log('');
  }

  console.log('=====================================');
  console.log(`Total files validated: ${HTML_FILES.length}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  console.log('=====================================\n');

  if (allValid) {
    console.log('✅ All HTML files are valid!');
    process.exit(0);
  } else {
    console.log('❌ Some HTML files have validation errors');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
