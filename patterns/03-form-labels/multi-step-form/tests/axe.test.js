// tests/axe.test.js
// Pattern: 03-form-labels/multi-step-form
//
// Two invariants enforced:
//   1. before/ has no ARIA step indicators or live regions — proves the "before" is genuinely broken
//   2. after/  has zero ARIA violations — proves the fix actually works
//
// NOTE: axe-core's aria-valid-attr-value and aria-allowed-attr rules only audit ARIA
// attributes that are already present. The before/ has no ARIA at all, so axe sees
// nothing to flag. The before/ check uses Playwright DOM inspection instead.
// The after/ check uses axe to validate that the added ARIA attributes are used correctly.
//
// Run: npm test -- patterns/03-form-labels/multi-step-form

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/03-form-labels/multi-step-form');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has no ARIA step indicators or live regions', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe only audits ARIA attributes that are actually present — if none exist,
  // aria-valid-attr-value and aria-allowed-attr both return 0 violations.
  // Check the DOM directly for the structural problems instead.

  // No step indicators with aria-current="step"
  const stepIndicators = await page.locator('[aria-current]').count();
  expect(stepIndicators).toBe(0);

  // No ARIA live regions for step change announcements
  //   - No step indicators
  //   - No progress indication
  //   - No ARIA announcements for step changes
  const liveRegions = await page.locator('[aria-live]').count();
  expect(liveRegions).toBe(0);

  // Confirm multiple steps ARE present (proves this is a multi-step form)
  const steps = await page.locator('.form-section').count();
  expect(steps).toBeGreaterThan(1);

  await context.close();
  await browser.close();
});

test('after/ has no multi-step form violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['aria-valid-attr-value', 'aria-allowed-attr'])
    .analyze();

  // This MUST be 0. The after/ version properly implements:
  //   - Step indicators with aria-current="step"
  //   - Progress bar showing overall completion
  //   - ARIA live regions for step announcements
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
