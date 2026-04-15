// tests/axe.test.js
// Pattern: 03-form-labels/required-fields
//
// Two invariants enforced:
//   1. before/ has required field violations  — proves the "before" is genuinely broken
//   2. after/  has zero required field violations — proves the fix actually works
//
// Uses .withRules(['color-contrast', 'label']) to target only this pattern's specific rules.
// Running a full axe audit would catch unrelated violations in before/ that would
// obscure what this pattern is demonstrating.
//
// Run: npm test -- patterns/03-form-labels/required-fields

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/03-form-labels/required-fields');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has required field violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast', 'label'])
    .analyze();

  // This MUST be > 0. The before/ version has multiple failing fields:
  //   - Required fields indicated only by color (fails WCAG 1.4.1)
  //   - No required attribute on inputs
  expect(results.violations.length).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has no required field violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast', 'label'])
    .analyze();

  // This MUST be 0. The after/ version properly indicates required fields:
  //   - Required fields have asterisk symbol
  //   - Required fields have required attribute
  //   - Form explains required indicator
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
