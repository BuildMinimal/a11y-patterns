// tests/axe.test.js
// Pattern: 01-color-contrast/placeholder-text
//
// Two invariants enforced:
//   1. before/ has color-contrast violations  — proves the "before" is genuinely broken
//   2. after/  has zero color-contrast violations — proves the fix actually works
//
// The before/ version fails in two ways detectable by axe:
//   - ::placeholder color: #aaaaaa on #ffffff = 2.32:1 (fails 4.5:1)
//   - .form__helper text: #aaaaaa on #ffffff = 2.32:1 (fails 4.5:1)
//
// axe-core checks placeholder contrast by examining the input's placeholder attribute
// and the computed ::placeholder pseudo-element color. The .form__helper is a regular
// text node that axe always checks.
//
// Run: npm test -- patterns/01-color-contrast/placeholder-text

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/01-color-contrast/placeholder-text');

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has color-contrast violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast'])
    .analyze();

  // This MUST be > 0. The before/ version has:
  //   - .form__helper text: #aaaaaa on #ffffff = 2.32:1 (fails 4.5:1)
  //   - ::placeholder: #aaaaaa on #ffffff = 2.32:1 (fails 4.5:1)
  expect(results.violations.length).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has no color-contrast violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast'])
    .analyze();

  // This MUST be 0. The after/ version uses:
  //   - .field__label: #374151 on #ffffff = 8.59:1 (AAA)
  //   - ::placeholder: #767676 on #ffffff = 4.54:1 (AA — exactly at threshold)
  //   - .form__helper: #4a5568 on #ffffff = 5.74:1 (AA)
  //   - .btn--primary: #ffffff on #1d4ed8 = 6.70:1 (AA)
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
