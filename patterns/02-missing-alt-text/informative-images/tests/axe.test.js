// tests/axe.test.js
// Pattern: 02-missing-alt-text/informative-images
//
// Two invariants enforced:
//   1. before/ has image-alt violations — informative <img> elements are missing alt=""
//   2. after/  has no image-alt violations — all images have descriptive alt text
//
// The axe rule checked is:
//   image-alt — "Ensures <img> elements have alternate text or a role of none or presentation"
//
// Run: npm test -- patterns/02-missing-alt-text/informative-images

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/02-missing-alt-text/informative-images');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... not file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has image-alt violations — informative images are missing alt attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt'])
    .analyze();

  // before/ must fail — all three informative images have no alt attribute
  expect(results.violations.length).toBeGreaterThan(0);

  // Confirm each informative image is a violator via DOM attributes
  const productPhotoAlt = await page.locator('.product-photo').getAttribute('alt');
  const chartAlt = await page.locator('.chart-img').getAttribute('alt');
  const diagramAlt = await page.locator('.diagram-img').getAttribute('alt');

  expect(productPhotoAlt).toBeNull();   // No alt attribute → violation
  expect(chartAlt).toBeNull();          // No alt attribute → violation
  expect(diagramAlt).toBeNull();        // No alt attribute → violation

  await context.close();
  await browser.close();
});

test('after/ has no image-alt violations — all informative images have alt text', async () => {
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

test('after/ informative images have meaningful alt text describing their content', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const productPhotoAlt = await page.locator('.product-photo').getAttribute('alt');
  const chartAlt = await page.locator('.chart-img').getAttribute('alt');
  const diagramAlt = await page.locator('.diagram-img').getAttribute('alt');

  // All three must have non-empty alt text
  expect(productPhotoAlt).toBeTruthy();
  expect(chartAlt).toBeTruthy();
  expect(diagramAlt).toBeTruthy();

  // Alt text must be substantive — not a single word or file name
  expect(productPhotoAlt.length).toBeGreaterThan(20);
  expect(chartAlt.length).toBeGreaterThan(20);
  expect(diagramAlt.length).toBeGreaterThan(20);

  // Chart alt text must convey the actual data, not just describe the chart type
  expect(chartAlt).toMatch(/40/);           // ProSound X1 battery hours
  expect(chartAlt).toMatch(/30/);           // Brand A battery hours
  expect(chartAlt).toMatch(/22/);           // Brand B battery hours

  // Diagram alt text must convey the procedure steps
  expect(diagramAlt.toLowerCase()).toMatch(/step|hold|select|confirm/);

  await context.close();
  await browser.close();
});
