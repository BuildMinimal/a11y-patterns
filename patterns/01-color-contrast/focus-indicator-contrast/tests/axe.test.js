// tests/axe.test.js
// Pattern: 01-color-contrast/focus-indicator-contrast
//
// Two invariants enforced:
//   1. before/ has color-contrast violations  — proves that "before" is genuinely broken
//   2. after/  has zero color-contrast violations — proves that the fix actually works
//
// The before/ version has two problems. Only one is auto-detectable by axe:
//   DETECTABLE:   Link text color #9ca3af on #ffffff = 2.54:1 (fails WCAG 1.4.3 — needs 4.5:1)
//   MANUAL ONLY:  outline: none on :focus — removes focus ring (fails WCAG 2.4.11)
//
// axe-core's color-contrast rule only checks TEXT contrast at rest — it does not trigger
// focus states on elements to evaluate focus ring colors. The missing focus ring (WCAG 2.4.11)
// must be caught through keyboard testing or a WCAG 2.4.11-specific audit tool.
//
// Run: npm test -- patterns/01-color-contrast/focus-indicator-contrast

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/01-color-contrast/focus-indicator-contrast');

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
  //   - Link text color: #9ca3af on #ffffff = 2.54:1 (fails 4.5:1 for normal text)
  // The missing focus ring (outline: none) fails WCAG 2.4.11 but requires manual testing —
  // axe does not trigger :focus states during its automated scan.
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
  //   - Focus indicators: #1d4ed8 on #ffffff = 6.70:1 (meets 3:1 for non-text content)
  //   - Input borders: #1d4ed8 on #ffffff = 6.70:1 (meets 3:1 for non-text content)
  //   - Button borders: #1d4ed8 on #ffffff = 6.70:1 (meets 3:1 for non-text content)
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
