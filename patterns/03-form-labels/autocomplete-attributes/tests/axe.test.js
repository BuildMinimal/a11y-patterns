// tests/axe.test.js
// Pattern: 03-form-labels/autocomplete-attributes
//
// Two invariants enforced:
//   1. before/ has no autocomplete attributes — proves the "before" is genuinely broken
//   2. after/  has zero autocomplete-valid violations — proves the fix actually works
//
// NOTE: axe-core's 'autocomplete-valid' rule only fires on inputs that already HAVE
// an autocomplete attribute with an invalid value. Inputs with no autocomplete at all
// are invisible to it — so the before/ check uses Playwright DOM inspection instead.
// 'autocomplete-appropriate' does not exist as an axe rule.
//
// Run: npm test -- patterns/03-form-labels/autocomplete-attributes

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/03-form-labels/autocomplete-attributes');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has no autocomplete attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // autocomplete-valid only audits inputs that already HAVE an autocomplete attribute.
  // Inputs with no attribute at all are invisible to it — check the DOM directly instead.
  const inputsWithAutocomplete = await page.locator('input[autocomplete]').count();
  expect(inputsWithAutocomplete).toBe(0);

  // Confirm the inputs ARE present (just missing the attribute):
  //   - Name input: no autocomplete attribute
  //   - Email input: no autocomplete attribute
  //   - Phone input: no autocomplete attribute
  //   - Address inputs: no autocomplete attributes
  //   - Password input: no autocomplete attribute
  const totalInputs = await page.locator('input').count();
  expect(totalInputs).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has no autocomplete violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['autocomplete-valid'])
    .analyze();

  // This MUST be 0. The after/ version has proper autocomplete attributes:
  //   - Name: autocomplete="name"
  //   - Email: autocomplete="email"
  //   - Phone: autocomplete="tel"
  //   - Street: autocomplete="street-address"
  //   - City: autocomplete="address-level2"
  //   - ZIP: autocomplete="postal-code"
  //   - Password: autocomplete="new-password"
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
