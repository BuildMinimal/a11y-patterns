// tests/axe.test.js
// Pattern: 01-color-contrast/disabled-state-contrast
//
// Two invariants enforced:
//   1. before/ has color-contrast violations  — proves the "before" is genuinely broken
//   2. after/  has zero color-contrast violations — proves the fix actually works
//
// The before/ version uses CSS-class-only "disabled" states (no native `disabled` attribute).
// Because the HTML `disabled` attribute is absent, WCAG's exemption for inactive UI
// components does NOT apply — axe checks contrast and flags the failures:
//   - .field__input--disabled: #c0c0c0 on #f3f4f6 = 1.66:1 (fails 4.5:1)
//   - .btn--disabled: #c0c0c0 on #f3f4f6 = 1.66:1 (fails 4.5:1)
//
// The after/ version uses the native `disabled` attribute. WCAG 1.4.3 exempts
// "inactive user interface components" — axe skips contrast checks for these elements.
//
// Run: npm test -- patterns/01-color-contrast/disabled-state-contrast

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/01-color-contrast/disabled-state-contrast');

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

  // This MUST be > 0. The before/ version has CSS-only disabled states (no disabled attr):
  //   - .field__input--disabled: #c0c0c0 on #f3f4f6 = 1.66:1 (fails 4.5:1)
  //   - .btn--disabled: #c0c0c0 on #f3f4f6 = 1.66:1 (fails 4.5:1)
  // Without the native `disabled` attribute, axe checks and flags these.
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

  // This MUST be 0. The after/ version uses native `disabled` attributes.
  // WCAG 1.4.3 exempts inactive UI components — axe skips disabled elements.
  // Active elements (email input, primary button) use passing contrast:
  //   - Email input: #1a1a1a on #ffffff = 18.1:1 (AAA)
  //   - Primary button: #ffffff on #1d4ed8 = 6.70:1 (AA)
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
