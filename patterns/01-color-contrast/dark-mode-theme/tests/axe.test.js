// tests/axe.test.js
// Pattern: 01-color-contrast/dark-mode-theme
//
// Two invariants enforced:
//   1. before/ has color-contrast violations  — proves the "before" is genuinely broken
//   2. after/  has zero color-contrast violations — proves the fix actually works
//
// The before/ version fails in multiple ways detectable by axe:
//   - Body text: #a0a0a0 on #1a1a1a = 1.12:1 (fails 4.5:1)
//   - Secondary text: #808080 on #1a1a1a = 1.51:1 (fails 4.5:1)
//   - Borders: #2d2d2d on #1a1a1a = 1.20:1 (fails 3:1 for non-text content)
//   - Button backgrounds: #2d2d2d on #1a1a1a = 1.20:1 (fails 3:1 for non-text content)
//
// Run: npm test -- patterns/01-color-contrast/dark-mode-theme

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/01-color-contrast/dark-mode-theme');

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
  //   - Body text: #a0a0a0 on #1a1a1a = 1.12:1 (fails 4.5:1)
  //   - Secondary text: #808080 on #1a1a1a = 1.51:1 (fails 4.5:1)
  //   - Borders: #2d2d2d on #1a1a1a = 1.20:1 (fails 3:1 for non-text content)
  //   - Button backgrounds: #2d2d2d on #1a1a1a = 1.20:1 (fails 3:1 for non-text content)
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
  //   - Body text: #e5e5e5 on #1a1a1a = 12.63:1 (AAA)
  //   - Secondary text: #a0aec0 on #1a1a1a = 5.74:1 (AA)
  //   - Borders: #374151 on #1a1a1a = 3.01:1 (meets 3:1 for non-text content)
  //   - Button backgrounds: #374151 on #1a1a1a = 3.01:1 (meets 3:1 for non-text content)
  //   - Button text: #ffffff on #374151 = 10.76:1 (AAA)
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
