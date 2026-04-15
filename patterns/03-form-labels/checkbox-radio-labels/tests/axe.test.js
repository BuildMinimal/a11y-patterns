// tests/axe.test.js
// Pattern: 03-form-labels/checkbox-radio-labels
//
// Two invariants enforced:
//   1. before/ has no fieldset grouping  — proves the "before" is genuinely broken
//   2. after/  has proper fieldset/legend grouping — proves the fix actually works
//
// NOTE: axe-core has no 'fieldset' or 'fieldset-legend' rules. Individual inputs
// wrapped in <label> already satisfy axe's 'label' rule, so axe sees no violation
// even without fieldset/legend grouping. Both checks use Playwright DOM inspection
// to assert the structural requirement directly.
//
// Run: npm test -- patterns/03-form-labels/checkbox-radio-labels

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/03-form-labels/checkbox-radio-labels');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has no fieldset grouping', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe has no rule for missing fieldset/legend — individual inputs already have
  // <label> wrappers so axe's 'label' rule passes. Check the DOM directly instead.
  const fieldsets = await page.locator('fieldset').count();
  expect(fieldsets).toBe(0);

  // Confirm the ungrouped radio/checkbox inputs are actually present
  //   - Newsletter checkboxes: no fieldset/legend grouping
  //   - Delivery radio buttons: no fieldset/legend grouping
  const ungroupedInputs = await page.locator('input[type="checkbox"], input[type="radio"]').count();
  expect(ungroupedInputs).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has proper fieldset/legend grouping', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Every group must be wrapped in a <fieldset> with a <legend>
  //   - Newsletter checkboxes: <fieldset> with <legend>
  //   - Delivery radio buttons: <fieldset> with <legend>
  const fieldsets = await page.locator('fieldset').count();
  expect(fieldsets).toBeGreaterThan(0);

  const legends = await page.locator('fieldset > legend').count();
  expect(legends).toBe(fieldsets);

  // axe confirms no label violations were introduced by the fix
  const results = await new AxeBuilder({ page })
    .withRules(['label'])
    .analyze();
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
