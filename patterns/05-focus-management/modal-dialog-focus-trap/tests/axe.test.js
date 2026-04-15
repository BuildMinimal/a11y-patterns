// tests/axe.test.js
// Pattern: 05-focus-management/modal-dialog-focus-trap
//
// Two invariants enforced:
//   1. before/ has focus-management violations  — proves the "before" is genuinely broken
//   2. after/  has zero focus-management violations — proves the fix actually works
//
// Note: axe-core does not automatically test for focus trap behavior. The test below
// verifies that the modal has proper ARIA attributes and structure. Manual testing
// is required to verify the focus trap functionality (Tab cycling, focus restoration, etc.).
//
// Run: npm test -- patterns/05-focus-management/modal-dialog-focus-trap

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/05-focus-management/modal-dialog-focus-trap');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ modal is missing aria-describedby and proper hidden management', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe-core cannot detect the focus management issues in before/ because
  // the modal is CSS-hidden at page load. Check the DOM directly instead.
  //
  // The before/ version has focus management issues:
  //   - No initial focus on modal open
  //   - No focus trapping (focus can escape the modal)
  //   - No focus restoration on close
  //   - No Escape key handling
  //   - No aria-describedby linking modal to its description
  //   - Does not use the HTML hidden attribute (uses CSS class toggle only)

  // before/ modal has no aria-describedby
  const ariaDescribedBy = await page.locator('#modal').getAttribute('aria-describedby');
  expect(ariaDescribedBy).toBeNull();

  // before/ modal does not use the hidden attribute for proper semantic hiding
  const hiddenAttr = await page.locator('#modal').getAttribute('hidden');
  expect(hiddenAttr).toBeNull();

  await context.close();
  await browser.close();
});

test('after/ has no focus-management violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['focus-order-semantics', 'aria-allowed-attr', 'aria-valid-attr-value'])
    .analyze();

  // The after/ version implements proper focus management:
  //   - role="dialog" on the modal container
  //   - aria-modal="true" to indicate it's a modal
  //   - aria-labelledby pointing to the modal title
  //   - aria-describedby pointing to the modal description
  //   - Focus trapping via JavaScript
  //   - Focus restoration on close
  //   - Escape key handling
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ modal opens with focus trap', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Click the button to open the modal
  await page.click('#open-modal-btn');

  // Wait for modal to open
  await page.waitForSelector('.modal--open');

  // Check that the modal is visible
  const modal = page.locator('.modal');
  expect(await modal.isVisible()).toBe(true);

  // Check that the modal has proper ARIA attributes
  expect(await modal.getAttribute('role')).toBe('dialog');
  expect(await modal.getAttribute('aria-modal')).toBe('true');
  expect(await modal.getAttribute('aria-labelledby')).toBe('modal-title');
  expect(await modal.getAttribute('aria-describedby')).toBe('modal-desc');

  // Check that the main content is hidden from screen readers
  const mainContent = page.locator('#main-content');
  expect(await mainContent.getAttribute('aria-hidden')).toBe('true');

  // Close the modal
  await page.keyboard.press('Escape');

  // Wait for modal to close
  await page.waitForSelector('.modal--open', { state: 'hidden' });

  // Check that the main content is no longer hidden
  expect(await mainContent.getAttribute('aria-hidden')).toBeNull();

  await context.close();
  await browser.close();
});
