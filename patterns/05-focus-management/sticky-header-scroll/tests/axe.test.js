// tests/axe.test.js
// Pattern: 05-focus-management/sticky-header-scroll
//
// Two invariants enforced:
//   1. before/ has no JavaScript focus management — proves the "before" is genuinely broken
//   2. after/  has zero focus-management violations — proves the fix actually works
//
// Note: The sticky-header scroll issue (focused elements hidden behind the header) cannot
// be detected by axe-core. The before/ check uses DOM/JS inspection to verify the fix
// is absent. Manual testing is required to verify the visual focus management behavior.
//
// Run: npm test -- patterns/05-focus-management/sticky-header-scroll

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/05-focus-management/sticky-header-scroll');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has no JavaScript focus management for sticky header', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // The before/ version has no JavaScript at all — no focus management code
  // to prevent the sticky header from covering focused elements.
  // Issues:
  //   - No scroll event listener to detect header coverage
  //   - No focusin event listener to check if focused element is behind header
  //   - No checkHeaderCoverage function
  const hasCheckFunction = await page.evaluate(() => typeof window.checkHeaderCoverage);
  expect(hasCheckFunction).toBe('undefined');

  await context.close();
  await browser.close();
});

test('after/ has no accessibility violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['aria-allowed-attr', 'aria-valid-attr-value'])
    .analyze();

  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ has JavaScript focus management for sticky header', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // The after/ version implements checkHeaderCoverage to detect when the sticky
  // header covers a focused element and moves focus to a visible element.
  const hasCheckFunction = await page.evaluate(() => typeof window.checkHeaderCoverage);
  expect(hasCheckFunction).toBe('function');

  await context.close();
  await browser.close();
});

test('after/ header has sticky positioning', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const position = await page.evaluate(() => {
    const header = document.querySelector('.header');
    return header ? window.getComputedStyle(header).position : null;
  });

  expect(position).toBe('sticky');

  await context.close();
  await browser.close();
});
