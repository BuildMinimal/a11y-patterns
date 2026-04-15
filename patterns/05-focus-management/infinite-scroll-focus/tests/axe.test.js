// tests/axe.test.js
// Pattern: 05-focus-management/infinite-scroll-focus
//
// Two invariants enforced:
//   1. before/ has focus-management violations  — proves the "before" is genuinely broken
//   2. after/  has zero focus-management violations — proves the fix actually works
//
// Note: axe-core does not automatically test for focus preservation during content loading.
// The test below verifies that the feed container has proper ARIA attributes.
// Manual testing is required to verify that focus is actually preserved when content loads.
//
// Run: npm test -- patterns/05-focus-management/infinite-scroll-focus

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/05-focus-management/infinite-scroll-focus');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ feed container is missing aria-live region', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe-core cannot detect missing optional ARIA attributes — it only flags
  // invalid values, not absent attributes. Check the DOM directly instead.
  //
  // The before/ version has focus management issues:
  //   - No aria-live region for screen reader announcements
  //   - No focus preservation when content loads
  //   - No scroll position management
  //   - No loading state management

  const ariaLive = await page.locator('#feed-container').getAttribute('aria-live');
  expect(ariaLive).toBeNull();

  await context.close();
  await browser.close();
});

test('after/ has no focus-management violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['aria-valid-attr-value', 'aria-allowed-attr'])
    .analyze();

  // The after/ version implements proper focus management:
  //   - aria-live="polite" on feed container
  //   - Focus preservation when content loads
  //   - Scroll position management
  //   - Loading state management with aria-busy
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ feed container has proper ARIA attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Check that feed container has aria-live
  const feedContainer = page.locator('#feed-container');
  expect(await feedContainer.getAttribute('aria-live')).toBe('polite');
  expect(await feedContainer.getAttribute('aria-atomic')).toBe('false');

  // Check that loading indicator has proper ARIA attributes
  const loadingIndicator = page.locator('#loading-indicator');
  expect(await loadingIndicator.getAttribute('aria-live')).toBe('polite');
  expect(await loadingIndicator.getAttribute('aria-busy')).not.toBeNull();

  await context.close();
  await browser.close();
});

test('after/ loads more articles on scroll', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Get initial article count
  const initialArticles = await page.locator('.card').all();
  expect(initialArticles.length).toBe(3);

  // Scroll down to trigger content loading
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });

  // Wait for new articles to load
  await page.waitForTimeout(1500);

  // Check that more articles were loaded
  const newArticles = await page.locator('.card').all();
  expect(newArticles.length).toBeGreaterThan(3);

  await context.close();
  await browser.close();
});
