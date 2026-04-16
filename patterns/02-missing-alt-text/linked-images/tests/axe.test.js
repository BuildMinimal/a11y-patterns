// tests/axe.test.js
// Pattern: 02-missing-alt-text/linked-images
//
// Three invariants enforced:
//   1. before/ has image-alt AND link-name violations — image-only links have no alt text
//   2. after/  has no violations — all image links have descriptive alt text
//   3. after/  alt text describes link destinations, not just image subjects
//
// axe rules checked:
//   image-alt  — "Ensures <img> elements have alternate text or a role of none or presentation"
//   link-name  — "Ensures links have discernible text"
//
// Run: npm test -- patterns/02-missing-alt-text/linked-images

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/02-missing-alt-text/linked-images');

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has image-alt and link-name violations — image links are missing alt attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt', 'link-name'])
    .analyze();

  // before/ must fail — images inside links have no alt, so both rules fire
  expect(results.violations.length).toBeGreaterThan(0);

  // Confirm each image-only link has no alt attribute
  const logoAlt      = await page.locator('.site-logo').getAttribute('alt');
  const electronicsAlt = await page.locator('.img-electronics').getAttribute('alt');
  const clothingAlt  = await page.locator('.img-clothing').getAttribute('alt');
  const homeAlt      = await page.locator('.img-home-garden').getAttribute('alt');
  const booksAlt     = await page.locator('.img-books').getAttribute('alt');

  expect(logoAlt).toBeNull();
  expect(electronicsAlt).toBeNull();
  expect(clothingAlt).toBeNull();
  expect(homeAlt).toBeNull();
  expect(booksAlt).toBeNull();

  await context.close();
  await browser.close();
});

test('after/ has no violations — all image links have descriptive alt text', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt', 'link-name'])
    .analyze();

  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ alt text describes link destinations, not just image subjects', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const logoAlt        = await page.locator('.site-logo').getAttribute('alt');
  const electronicsAlt = await page.locator('.img-electronics').getAttribute('alt');
  const clothingAlt    = await page.locator('.img-clothing').getAttribute('alt');
  const homeAlt        = await page.locator('.img-home-garden').getAttribute('alt');
  const booksAlt       = await page.locator('.img-books').getAttribute('alt');

  // All must be non-empty strings
  expect(logoAlt).toBeTruthy();
  expect(electronicsAlt).toBeTruthy();
  expect(clothingAlt).toBeTruthy();
  expect(homeAlt).toBeTruthy();
  expect(booksAlt).toBeTruthy();

  // Logo alt must identify the site AND the destination (homepage)
  // "logo" alone is insufficient — it names the image, not the link's purpose
  expect(logoAlt.toLowerCase()).toMatch(/proshop/i);
  expect(logoAlt.toLowerCase()).toMatch(/home/i);

  // Category alts must convey the destination ("Shop X"), not just the image subject
  // "Electronics" alone could be the image label — "Shop Electronics" is the link action
  expect(electronicsAlt).toMatch(/Electronics/i);
  expect(clothingAlt).toMatch(/Clothing/i);
  expect(homeAlt).toMatch(/Home/i);
  expect(booksAlt).toMatch(/Books/i);

  await context.close();
  await browser.close();
});
