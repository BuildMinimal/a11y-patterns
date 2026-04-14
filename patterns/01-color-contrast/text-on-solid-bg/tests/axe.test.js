// tests/axe.test.js
// Pattern: 01-color-contrast/text-on-solid-bg
//
// Two invariants enforced:
//   1. before/ has color-contrast violations  — proves the "before" is genuinely broken
//   2. after/  has zero color-contrast violations — proves the fix actually works
//
// Uses .withRules(['color-contrast']) to target only this pattern's specific rule.
// Running a full axe audit would catch unrelated violations in before/ that would
// obscure what this pattern is demonstrating.
//
// Run: npm test -- patterns/01-color-contrast/text-on-solid-bg

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/01-color-contrast/text-on-solid-bg');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
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

  // This MUST be > 0. The before/ version has multiple failing elements:
  //   - .card__tag text: #7ab3f0 on white = 2.85:1 (fails 4.5:1)
  //   - .card__meta text: #b0b7c3 on white = 1.96:1 (fails)
  //   - .card__body text: #aaaaaa on white = 2.32:1 (fails)
  //   - .card__secondary text: #aaaaaa on white = 2.32:1 (fails)
  //   - .btn--primary: white on #93c5fd = 2.45:1 (fails)
  //   - .btn--ghost: #9ca3af on white = 2.54:1 (fails)
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
  //   - .card__tag: #1e40af on #dbeafe = 7.16:1 (AAA)
  //   - .card__meta: #4a5568 on white = 5.74:1 (AA)
  //   - .card__body: #1a1a1a on white = 18.1:1 (AAA)
  //   - .card__secondary: #4a5568 on white = 5.74:1 (AA)
  //   - .btn--primary: white on #1d4ed8 = 7.22:1 (AAA)
  //   - .btn--ghost: #1d4ed8 on white = 7.22:1 (AAA)
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
