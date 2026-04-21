/**
 * Fix mojibake (double-encoded UTF-8) in all HTML files.
 *
 * Root cause: files were read as Windows-1252/Latin-1 and re-saved as UTF-8,
 * so every multi-byte UTF-8 sequence got mangled.
 *
 * Fix: match runs of non-ASCII characters, try encoding each run back to the
 * original bytes via cp1252, then decode as UTF-8.  Use iconv-lite if
 * available; fall back to a manual cp1252 lookup table otherwise.
 */

const fs = require('fs');
const path = require('path');

// ----- Windows-1252 byte → Unicode codepoint table -----
// Standard Latin-1 (0x00–0xFF) is the base; Windows-1252 overrides 0x80–0x9F.
const CP1252_OVERRIDES = {
  0x80: 0x20AC, // €
  0x82: 0x201A, // ‚
  0x83: 0x0192, // ƒ
  0x84: 0x201E, // „
  0x85: 0x2026, // …
  0x86: 0x2020, // †
  0x87: 0x2021, // ‡
  0x88: 0x02C6, // ˆ
  0x89: 0x2030, // ‰
  0x8A: 0x0160, // Š
  0x8B: 0x2039, // ‹
  0x8C: 0x0152, // Œ
  0x8E: 0x017D, // Ž
  0x91: 0x2018, // '
  0x92: 0x2019, // '
  0x93: 0x201C, // "
  0x94: 0x201D, // "
  0x95: 0x2022, // •
  0x96: 0x2013, // –
  0x97: 0x2014, // —
  0x98: 0x02DC, // ˜
  0x99: 0x2122, // ™
  0x9A: 0x0161, // š
  0x9B: 0x203A, // ›
  0x9C: 0x0153, // œ
  0x9E: 0x017E, // ž
  0x9F: 0x0178, // Ÿ
};

// Build reverse map: Unicode codepoint → cp1252 byte
const CP1252_REVERSE = {};
for (let b = 0; b < 256; b++) {
  const cp = CP1252_OVERRIDES[b] ?? b;  // override or identity
  CP1252_REVERSE[cp] = b;
}

/**
 * Try to decode a string as if each character was originally a cp1252 byte.
 * Returns the fixed string, or null if it can't be decoded as valid UTF-8.
 */
function tryFixMojibake(str) {
  // Build the original byte buffer
  const bytes = [];
  for (const ch of str) {
    const cp = ch.codePointAt(0);
    const byte = CP1252_REVERSE[cp];
    if (byte === undefined) return null;  // char is not cp1252-encodable
    bytes.push(byte);
  }
  // Try to decode as UTF-8
  const buf = Buffer.from(bytes);
  try {
    const decoded = buf.toString('utf8');
    // Validate the decode didn't produce replacement chars
    if (decoded.includes('\uFFFD')) return null;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Fix all mojibake runs in a string.
 * A "run" is a maximal sequence of non-ASCII characters.
 */
function fixMojibake(content) {
  // Match runs of non-ASCII chars (codepoint > 0x7F)
  return content.replace(/[^\x00-\x7F]+/gu, (run) => {
    const fixed = tryFixMojibake(run);
    // Accept the fix only if:
    //  1. decoding succeeded
    //  2. the result is different (otherwise it's already valid text)
    //  3. the result is shorter (multi-byte → fewer chars) — this confirms we
    //     actually combined bytes into real multi-byte chars
    if (fixed !== null && fixed !== run && fixed.length < run.length) {
      return fixed;
    }
    return run;  // leave unchanged
  });
}

// ----- Main: process all HTML files -----
const dir = path.join(__dirname);
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let totalFixed = 0;
for (const file of htmlFiles) {
  const filepath = path.join(dir, file);
  const original = fs.readFileSync(filepath, 'utf8');
  const fixed = fixMojibake(original);
  if (fixed !== original) {
    fs.writeFileSync(filepath, fixed, 'utf8');
    // Count how many replacements happened
    const runs = (original.match(/[^\x00-\x7F]+/gu) || []).length;
    const unchanged = (fixed.match(/[^\x00-\x7F]+/gu) || []).length;
    console.log(`  Fixed: ${file}`);
    totalFixed++;
  }
}
console.log(`\nDone. Fixed ${totalFixed} files.`);
