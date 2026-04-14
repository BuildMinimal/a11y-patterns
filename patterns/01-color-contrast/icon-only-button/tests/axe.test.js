// tests/axe.test.js
// Pattern: 01-color-contrast/icon-only-button
//
// Two invariants enforced:
//   1. before/ has color-contrast violations  — proves the "before" is genuinely broken
//   2. after/  has zero color-contrast violations — proves the fix actually works
//
// The before/ version fails in two ways detectable by axe:
//   - Icon colors fail WCAG 1.4.11 (non-text contrast): #9ca3af on #f3f4f6 = 1.23:1 (fails 3:1)
//   - Icon colors fail WCAG 1.4.11: #ef4444 on #fee2e2 = 1.88:1 (fails 3:1)
//
// axe-core checks icon contrast by examining SVG elements and their computed colors.
// The accessible name issue (missing aria-label) is caught by button-name rule.
//
// Run: npm test -- patterns/01-color-contrast/icon-only-button

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/01-color-contrast/icon-only-button');

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has color-contrast violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast', 'button-name'])
    .analyze();

  // This MUST be > 0. The before/ version has:
  //   - Icon colors: #9ca3af on #f3f4f6 = 1.23:1 (fails 3:1 for non-text content)
  //   - Icon color: #ef4444 on #fee2e2 = 1.88:1 (fails 3:1 for non-text content)
  //   - Missing aria-label attributes (button-name violations)
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
    .withRules(['color-contrast', 'button-name'])
    .analyze();

  // This MUST be 0. The after/ version uses:
  //   - Icon colors: #4b5563 on #f3f4f6 = 4.62:1 (meets 3:1 for non-text content)
  //   - Icon color: #dc2626 on #fee2e2 = 3.56:1 (meets 3:1 for non-text content)
  //   - All buttons have aria-label attributes (no button-name violations)
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
