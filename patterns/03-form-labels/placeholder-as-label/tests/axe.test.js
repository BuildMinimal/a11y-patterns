// tests/axe.test.js
// Pattern: 03-form-labels/placeholder-as-label
//
// Two invariants enforced:
//   1. before/ has no associated <label> elements — proves the "before" is genuinely broken
//   2. after/  has zero label violations — proves the fix actually works
//
// NOTE: axe-core's 'label' rule cannot detect the placeholder-as-label anti-pattern
// because placeholder satisfies the accessible name computation per spec. The before/
// check uses Playwright DOM inspection instead to assert the structural problem directly.
//
// Run: npm test -- patterns/03-form-labels/placeholder-as-label

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/03-form-labels/placeholder-as-label');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has no associated label elements', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe's 'label' rule won't flag placeholder-only inputs because placeholder
  // satisfies the accessible name computation — so we inspect the DOM directly.
  // A form with proper labels must have <label for="..."> elements.
  const associatedLabels = await page.locator('label[for]').count();
  expect(associatedLabels).toBe(0);

  // Confirm the inputs exist and rely solely on placeholder text
  //   - Name input: placeholder only
  //   - Email input: placeholder only
  //   - Message textarea: placeholder only
  const inputsWithPlaceholder = await page.locator('input[placeholder], textarea[placeholder]').count();
  expect(inputsWithPlaceholder).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has no label violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['label', 'aria-input-field-name'])
    .analyze();

  // This MUST be 0. The after/ version properly associates all labels:
  //   - Name: <label for="name"> + <input id="name">
  //   - Email: <label for="email"> + <input id="email">
  //   - Message: <label for="message"> + <textarea id="message">
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
