// tests/axe.test.js
// Pattern: 03-form-labels/missing-label-input
//
// Two invariants enforced:
//   1. before/ has label violations  — proves the "before" is genuinely broken
//   2. after/  has zero label violations — proves the fix actually works
//
// Uses .withRules(['label']) to target only this pattern's specific rule.
// Running a full axe audit would catch unrelated violations in before/ that would
// obscure what this pattern is demonstrating.
//
// Run: npm test -- patterns/03-form-labels/missing-label-input

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/03-form-labels/missing-label-input');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has label violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['label', 'aria-input-field-name'])
    .analyze();

  // This MUST be > 0. The before/ version has multiple failing inputs:
  //   - Username input: no label association
  //   - Email input: no label association
  //   - Password input: no label association
  expect(results.violations.length).toBeGreaterThan(0);

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
  //   - Username: <label for="username"> + <input id="username">
  //   - Email: <label for="email"> + <input id="email">
  //   - Password: <label for="password"> + <input id="password">
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
