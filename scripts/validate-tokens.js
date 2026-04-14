#!/usr/bin/env node
/**
 * validate-tokens.js
 *
 * Reads every tokens.json in the repo, finds color tokens with documented
 * WCAG levels, recalculates the actual contrast ratio against white (#ffffff),
 * and fails if the claimed level doesn't match reality.
 *
 * Run with: npm run validate-tokens
 */

import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── WCAG contrast math ────────────────────────────────────────────────────

function hexToRgb(hex) {
  const cleaned = hex.replace(/^#/, '');
  if (cleaned.length !== 6) throw new Error(`Invalid hex color: ${hex}`);
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

function linearize(channel) {
  const v = channel / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance({ r, g, b }) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── WCAG thresholds ───────────────────────────────────────────────────────

// Minimum contrast ratios for normal text on a solid background.
// "AA-large" and "non-text" thresholds (3:1) are not validated here
// because tokens.json doesn't carry enough context to determine text size.
// Use "AA-large" or "non-text" in the wcag field if you want 3:1 checking.
const THRESHOLDS = {
  'AAA':       7.0,
  'AA':        4.5,
  'AA-large':  3.0,
  'non-text':  3.0,
  'FAIL':      null,  // Expected to fail — verified to be < 4.5:1
};

// ─── Token walker ──────────────────────────────────────────────────────────

/**
 * Recursively walks a token object and yields every leaf that has both
 * a "value" (hex color) and a "wcag" level.
 */
function* walkTokens(obj, path = []) {
  if (typeof obj !== 'object' || obj === null) return;

  if ('value' in obj && 'wcag' in obj) {
    yield { path: path.join('.'), value: obj.value, wcag: obj.wcag, contrastOnWhite: obj['contrast-on-white'] };
    return;
  }

  for (const [key, child] of Object.entries(obj)) {
    if (key.startsWith('_')) continue;  // Skip comment keys
    yield* walkTokens(child, [...path, key]);
  }
}

// ─── File finder ───────────────────────────────────────────────────────────

async function findTokenFiles() {
  const files = [];

  // Root-level tokens/
  const rootTokenDir = path.join(ROOT, 'tokens');
  try {
    const entries = await import('fs').then(m =>
      m.promises.readdir(rootTokenDir, { withFileTypes: true })
    );
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.json')) {
        files.push(path.join(rootTokenDir, entry.name));
      }
    }
  } catch {
    // tokens/ directory may not exist in all environments
  }

  // Pattern-level tokens.json files
  const patternsDir = path.join(ROOT, 'patterns');
  try {
    await findJsonRecursive(patternsDir, 'tokens.json', files);
  } catch {
    // patterns/ may be empty
  }

  return files;
}

async function findJsonRecursive(dir, filename, results) {
  const { readdir } = await import('fs/promises');
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await findJsonRecursive(fullPath, filename, results);
    } else if (entry.isFile() && entry.name === filename) {
      results.push(fullPath);
    }
  }
}

// ─── Validation ────────────────────────────────────────────────────────────

async function validateFile(filePath) {
  const relative = path.relative(ROOT, filePath);
  let raw;
  try {
    raw = await readFile(filePath, 'utf-8');
  } catch (err) {
    return [{ file: relative, error: `Could not read file: ${err.message}` }];
  }

  let tokens;
  try {
    tokens = JSON.parse(raw);
  } catch (err) {
    return [{ file: relative, error: `Invalid JSON: ${err.message}` }];
  }

  const failures = [];

  for (const token of walkTokens(tokens)) {
    const { path: tokenPath, value, wcag } = token;

    // Only validate hex color values
    if (!/^#[0-9a-fA-F]{6}$/.test(value)) continue;

    const threshold = THRESHOLDS[wcag];
    if (threshold === undefined) {
      failures.push({
        file: relative,
        token: tokenPath,
        error: `Unknown wcag level "${wcag}". Valid values: ${Object.keys(THRESHOLDS).join(', ')}`,
      });
      continue;
    }

    let ratio;
    try {
      ratio = contrastRatio(value, '#ffffff');
    } catch (err) {
      failures.push({ file: relative, token: tokenPath, error: err.message });
      continue;
    }

    const ratioStr = ratio.toFixed(2);

    if (wcag === 'FAIL') {
      // FAIL tokens should actually fail (contrast < 4.5:1 for normal text)
      if (ratio >= 4.5) {
        failures.push({
          file: relative,
          token: tokenPath,
          error: `Marked "FAIL" but ${value} has contrast ${ratioStr}:1 on white, which passes AA (≥ 4.5:1).`,
        });
      }
    } else {
      // All other tokens should meet their claimed threshold
      if (ratio < threshold) {
        failures.push({
          file: relative,
          token: tokenPath,
          error: `Claims "${wcag}" but ${value} has contrast ${ratioStr}:1 on white (needs ≥ ${threshold}:1).`,
        });
      }
    }
  }

  return failures;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const files = await findTokenFiles();

  if (files.length === 0) {
    console.log('No token files found. Nothing to validate.');
    process.exit(0);
  }

  console.log(`Validating ${files.length} token file(s)…\n`);

  const allFailures = [];
  let checkedTokens = 0;

  for (const file of files) {
    const failures = await validateFile(file);
    const relative = path.relative(ROOT, file);

    // Count tokens in this file to give feedback
    let raw;
    try {
      raw = JSON.parse(await readFile(file, 'utf-8'));
      checkedTokens += [...walkTokens(raw)].filter(t => /^#[0-9a-fA-F]{6}$/.test(t.value)).length;
    } catch {
      // Ignore parse errors — already reported in failures
    }

    if (failures.length === 0) {
      console.log(`  ✓  ${relative}`);
    } else {
      console.log(`  ✗  ${relative}`);
      for (const f of failures) {
        const location = f.token ? `  ${f.token}: ` : '  ';
        console.log(`       ${location}${f.error}`);
      }
      allFailures.push(...failures);
    }
  }

  console.log(`\n${checkedTokens} color token(s) checked across ${files.length} file(s).`);

  if (allFailures.length > 0) {
    console.log(`\n${allFailures.length} failure(s) found. Fix the tokens above before merging.\n`);
    process.exit(1);
  } else {
    console.log('\nAll token contrast ratios are correct.\n');
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
