// tests/axe.test.js
// Pattern: 02-missing-alt-text/background-images-with-meaning
//
// Three invariants enforced:
//   1. before/ has button-name violations — icon buttons with CSS background images
//      have no accessible name (aria-label absent, no text content)
//   2. after/  has no violations — all buttons have accessible names via aria-label
//      or visually-hidden <span> text
//   3. after/  each button has a non-empty, descriptive accessible name
//
// axe rule checked:
//   button-name — "Ensures buttons have discernible text"
//
// Note: CSS background images themselves are invisible to axe — they have no
// alt attribute mechanism. The violation fires on the *button* element that lacks
// an accessible name, not on the background image directly.
//
// Run: npm test -- patterns/02-missing-alt-text/background-images-with-meaning

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve(
  'patterns/02-missing-alt-text/background-images-with-meaning'
);

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has button-name violations — CSS background-image icon buttons have no accessible name', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['button-name'])
    .analyze();

  // All 7 toolbar buttons have CSS background-image icons but no label
  expect(results.violations.length).toBeGreaterThan(0);

  // Confirm each button has no accessible name in the before/ version
  const buttons = await page.locator('.toolbar-btn').all();
  expect(buttons.length).toBe(7);

  for (const btn of buttons) {
    const ariaLabel = await btn.getAttribute('aria-label');
    const innerText = (await btn.innerText()).trim();
    // Neither technique is present in before/
    expect(ariaLabel).toBeNull();
    expect(innerText).toBe('');
  }

  await context.close();
  await browser.close();
});

test('after/ has no button-name violations — all icon buttons have accessible names', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['button-name'])
    .analyze();

  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ each toolbar button has a descriptive accessible name via aria-label or sr-only text', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Technique A: aria-label (formatting group)
  const boldLabel      = await page.locator('.toolbar-btn--bold').getAttribute('aria-label');
  const italicLabel    = await page.locator('.toolbar-btn--italic').getAttribute('aria-label');
  const underlineLabel = await page.locator('.toolbar-btn--underline').getAttribute('aria-label');

  expect(boldLabel).toBe('Bold');
  expect(italicLabel).toBe('Italic');
  expect(underlineLabel).toBe('Underline');

  // Technique B: visually-hidden .sr-only text (insert and list groups)
  // The button's accessible name comes from its text content
  const linkText  = await page.locator('.toolbar-btn--link .sr-only').innerText();
  const imageText = await page.locator('.toolbar-btn--image .sr-only').innerText();
  const olText    = await page.locator('.toolbar-btn--ol .sr-only').innerText();
  const ulText    = await page.locator('.toolbar-btn--ul .sr-only').innerText();

  expect(linkText.length).toBeGreaterThan(0);
  expect(imageText.length).toBeGreaterThan(0);
  expect(olText.length).toBeGreaterThan(0);
  expect(ulText.length).toBeGreaterThan(0);

  // Confirm total button count is unchanged
  const buttons = await page.locator('.toolbar-btn').all();
  expect(buttons.length).toBe(7);

  await context.close();
  await browser.close();
});
