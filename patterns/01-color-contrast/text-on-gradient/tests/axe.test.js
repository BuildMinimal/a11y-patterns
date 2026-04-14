// tests/axe.test.js
// Pattern: 01-color-contrast/text-on-gradient
//
// Two invariants enforced:
//   1. before/ has color-contrast violations  — proves the "before" is genuinely broken
//   2. after/  has zero color-contrast violations — proves the fix actually works
//
// The before/ version uses the light end of the gradient (#7dd3fc, #93c5fd) as
// solid button backgrounds with white text:
//   - .btn--primary: white on #7dd3fc = 1.75:1 (fails 4.5:1)
//   - .btn--ghost: white on #93c5fd = 1.80:1 (fails 4.5:1)
// axe detects solid background-color values reliably; gradient parsing is approximated
// but the button backgrounds are explicit solid colors, ensuring a definite violation.
//
// Run: npm test -- patterns/01-color-contrast/text-on-gradient

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/01-color-contrast/text-on-gradient');

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

  // This MUST be > 0. The before/ version has button backgrounds taken from
  // the light end of the gradient palette:
  //   - .btn--primary: white on #7dd3fc = 1.75:1 (fails 4.5:1)
  //   - .btn--ghost: white on #93c5fd = 1.80:1 (fails 4.5:1)
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
  //   - Gradient from #0f172a to #1e3a8a — dark throughout, white text passes everywhere
  //   - .btn--primary: #0f172a on #ffffff = 19.5:1 (AAA)
  //   - .btn--ghost: white text + transparent bg on dark gradient — passes
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
