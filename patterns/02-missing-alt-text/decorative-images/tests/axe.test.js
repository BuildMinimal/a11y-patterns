// tests/axe.test.js
// Pattern: 02-missing-alt-text/decorative-images
//
// Two invariants enforced:
//   1. before/ has image-alt violations — decorative <img> elements are missing alt=""
//   2. after/  has no image-alt violations — all images have appropriate alt attributes
//
// The axe rule checked is:
//   image-alt — "Ensures <img> elements have alternate text or a role of none or presentation"
//
// Run: npm test -- patterns/02-missing-alt-text/decorative-images

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/02-missing-alt-text/decorative-images');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... not file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has image-alt violations — decorative images are missing alt attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt'])
    .analyze();

  // before/ must fail — the three decorative images have no alt attribute
  expect(results.violations.length).toBeGreaterThan(0);

  // Confirm the specific decorative images are the violators (via DOM, not axe HTML snippets)
  const heroBannerAlt = await page.locator('.hero__banner').getAttribute('alt');
  const dividerAlt = await page.locator('.section-divider').getAttribute('alt');
  const ornamentAlt = await page.locator('.ornament').getAttribute('alt');

  expect(heroBannerAlt).toBeNull();   // No alt attribute → violation
  expect(dividerAlt).toBeNull();      // No alt attribute → violation
  expect(ornamentAlt).toBeNull();     // No alt attribute → violation

  // The informative photo has proper alt text and must NOT be in violations
  const photoAlt = await page.locator('.article__photo').getAttribute('alt');
  expect(photoAlt).toBeTruthy();
  expect(photoAlt.length).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has no image-alt violations — all images have appropriate alt attributes', async () => {
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

test('after/ decorative images have alt="" and informative image has meaningful alt text', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // All three decorative images must have alt="" (empty string, not absent)
  const heroBannerAlt = await page.locator('.hero__banner').getAttribute('alt');
  const dividerAlt = await page.locator('.section-divider').getAttribute('alt');
  const ornamentAlt = await page.locator('.ornament').getAttribute('alt');

  expect(heroBannerAlt).toBe('');   // Present and empty → decorative
  expect(dividerAlt).toBe('');      // Present and empty → decorative
  expect(ornamentAlt).toBe('');     // Present and empty → decorative

  // The informative photo must have non-empty, meaningful alt text
  const photoAlt = await page.locator('.article__photo').getAttribute('alt');
  expect(photoAlt).toBeTruthy();
  expect(photoAlt.length).toBeGreaterThan(10);  // Meaningful, not a single word

  // Hero banner should also have role="presentation" (belt-and-suspenders)
  const heroBannerRole = await page.locator('.hero__banner').getAttribute('role');
  expect(heroBannerRole).toBe('presentation');

  await context.close();
  await browser.close();
});
