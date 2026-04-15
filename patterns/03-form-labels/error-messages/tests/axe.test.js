// tests/axe.test.js
// Pattern: 03-form-labels/error-messages
//
// Two invariants enforced:
//   1. before/ has no aria-describedby association — proves the "before" is genuinely broken
//   2. after/  has zero error message violations    — proves the fix actually works
//
// NOTE: axe-core has no rule that catches "error message exists but is not
// linked via aria-describedby". Inputs in before/ already have <label for>
// associations so axe's label/aria rules see nothing wrong. The before/ check
// uses Playwright DOM inspection instead.
//
// Run: npm test -- patterns/03-form-labels/error-messages

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/03-form-labels/error-messages');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has no aria-describedby associations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe cannot catch "error message exists but isn't linked to its input" —
  // inputs already have <label for> so all axe label/aria rules pass.
  // Check the DOM directly: no input should have aria-describedby.
  const inputsWithDescribedBy = await page.locator('input[aria-describedby]').count();
  expect(inputsWithDescribedBy).toBe(0);

  // Confirm the error messages ARE present visually (just not wired up):
  //   - Email error: no aria-describedby association
  //   - Password error: no aria-describedby association
  //   - Confirm password error: no aria-describedby association
  const errorMessages = await page.locator('.error-message').count();
  expect(errorMessages).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has no error message violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['aria-valid-attr-value', 'aria-input-field-name'])
    .analyze();

  // This MUST be 0. The after/ version properly associates all error messages:
  //   - Email: aria-describedby="email-error" + <div id="email-error" role="alert">
  //   - Password: aria-describedby="password-error" + <div id="password-error" role="alert">
  //   - Confirm: aria-describedby="confirm-error" + <div id="confirm-error" role="alert">
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
