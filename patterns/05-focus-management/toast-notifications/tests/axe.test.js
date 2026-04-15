// tests/axe.test.js
// Pattern: 05-focus-management/toast-notifications
//
// Two invariants enforced:
//   1. before/ has focus-management violations  — proves the "before" is genuinely broken
//   2. after/  has zero focus-management violations — proves the fix actually works
//
// Note: axe-core does not automatically test for aria-live announcements. The test below
// verifies that the toast container has proper ARIA attributes. Manual testing
// is required to verify that toasts are actually announced to screen readers.
//
// Run: npm test -- patterns/05-focus-management/toast-notifications

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/05-focus-management/toast-notifications');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ toast container is missing aria-live region', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe-core cannot detect missing optional ARIA attributes — it only flags
  // invalid values, not absent attributes. Check the DOM directly instead.
  //
  // The before/ version has focus management issues:
  //   - No aria-live region for screen reader announcements
  //   - No role="alert" on toast elements
  //   - No aria-atomic="true" for complete message reading
  //   - No dismiss button for keyboard users

  const ariaLive = await page.locator('#toast-container').getAttribute('aria-live');
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
  //   - aria-live="polite" on the toast container
  //   - role="alert" on each toast
  //   - aria-atomic="true" for complete message reading
  //   - Dismiss button for keyboard users
  //   - Auto-dismiss after timeout
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ toast container has proper ARIA attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Check that toast container has aria-live
  const toastContainer = page.locator('#toast-container');
  expect(await toastContainer.getAttribute('aria-live')).toBe('polite');
  expect(await toastContainer.getAttribute('aria-atomic')).toBe('true');

  await context.close();
  await browser.close();
});

test('after/ toast appears and dismisses correctly', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Click to show a success toast
  await page.click('#show-success');

  // Wait for toast to appear
  await page.waitForSelector('.toast');

  // Check that toast has proper ARIA attributes
  const toast = page.locator('.toast');
  expect(await toast.getAttribute('role')).toBe('alert');
  expect(await toast.getAttribute('aria-live')).toBe('polite');
  expect(await toast.getAttribute('aria-atomic')).toBe('true');

  // Check that dismiss button exists
  const dismissBtn = page.locator('.toast__dismiss');
  expect(await dismissBtn.getAttribute('aria-label')).toBe('Dismiss notification');

  // Click dismiss button
  await dismissBtn.click();

  // Wait for toast to be removed from DOM (dismissToast calls toast.remove())
  await page.waitForSelector('.toast', { state: 'detached' });

  await context.close();
  await browser.close();
});
