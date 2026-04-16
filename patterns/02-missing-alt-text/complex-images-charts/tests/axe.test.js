// tests/axe.test.js
// Pattern: 02-missing-alt-text/complex-images-charts
//
// Three invariants enforced:
//   1. before/ has image-alt violations — complex charts have no alt attribute
//   2. after/  has no violations — charts have brief alt + aria-describedby
//   3. after/  verifies the two-layer approach:
//        - Brief alt text is present (topic + headline finding)
//        - aria-describedby points to an existing element
//        - The referenced element contains substantial text (the long description)
//
// axe rule checked:
//   image-alt — "Ensures <img> elements have alternate text"
//
// Note: axe cannot verify that a long description is *adequate* — it only
// confirms that an accessible name exists. The quality of alt and aria-describedby
// content must be reviewed by humans.
//
// Run: npm test -- patterns/02-missing-alt-text/complex-images-charts

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/02-missing-alt-text/complex-images-charts');

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has image-alt violations — complex chart images have no alt attribute', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt'])
    .analyze();

  expect(results.violations.length).toBeGreaterThan(0);

  // Confirm neither chart has an alt attribute
  const revenueAlt    = await page.locator('#revenue-chart').getAttribute('alt');
  const engagementAlt = await page.locator('#engagement-chart').getAttribute('alt');

  expect(revenueAlt).toBeNull();
  expect(engagementAlt).toBeNull();

  // Neither has aria-describedby either — long description is entirely absent
  const revenueDesc    = await page.locator('#revenue-chart').getAttribute('aria-describedby');
  const engagementDesc = await page.locator('#engagement-chart').getAttribute('aria-describedby');

  expect(revenueDesc).toBeNull();
  expect(engagementDesc).toBeNull();

  await context.close();
  await browser.close();
});

test('after/ has no image-alt violations — complex charts have alt + aria-describedby', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt'])
    .analyze();

  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ charts have brief alt text and aria-describedby pointing to substantial long descriptions', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // ── Revenue chart: Technique 1 — visible figcaption ──

  const revenueAlt  = await page.locator('#revenue-chart').getAttribute('alt');
  const revenueDescId = await page.locator('#revenue-chart').getAttribute('aria-describedby');

  // Brief alt must be present and substantive
  expect(revenueAlt).toBeTruthy();
  expect(revenueAlt.length).toBeGreaterThan(20);

  // aria-describedby must point to an existing element with content
  expect(revenueDescId).toBeTruthy();
  const revenueDescEl = page.locator(`#${revenueDescId}`);
  const revenueDescCount = await revenueDescEl.count();
  expect(revenueDescCount).toBe(1);

  // Long description must contain actual data values
  const revenueDescText = await revenueDescEl.innerText();
  expect(revenueDescText.length).toBeGreaterThan(80);  // not a stub
  expect(revenueDescText).toMatch(/Q1|Q2|Q3|Q4/);       // mentions quarters
  expect(revenueDescText).toMatch(/\$[\d.]+M|\d+%/);    // contains data values

  // ── Engagement chart: Technique 2 — <details> data table ──

  const engagementAlt    = await page.locator('#engagement-chart').getAttribute('alt');
  const engagementDescId = await page.locator('#engagement-chart').getAttribute('aria-describedby');

  expect(engagementAlt).toBeTruthy();
  expect(engagementAlt.length).toBeGreaterThan(20);

  expect(engagementDescId).toBeTruthy();
  const engagementDescEl = await page.locator(`#${engagementDescId}`);

  // The <details> element exists in DOM (may be collapsed but still accessible)
  const detailsCount = await engagementDescEl.count();
  expect(detailsCount).toBe(1);

  // Data table inside details must have monthly rows
  const tableRows = await page.locator(`#${engagementDescId} table tbody tr`).count();
  expect(tableRows).toBe(6);  // 6 months of data

  await context.close();
  await browser.close();
});
