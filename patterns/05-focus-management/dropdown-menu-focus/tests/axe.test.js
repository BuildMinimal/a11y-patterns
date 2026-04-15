// tests/axe.test.js
// Pattern: 05-focus-management/dropdown-menu-focus
//
// Two invariants enforced:
//   1. before/ has focus-management violations  — proves the "before" is genuinely broken
//   2. after/  has zero focus-management violations — proves the fix actually works
//
// Note: axe-core does not automatically test for keyboard navigation behavior. The test below
// verifies that the dropdown has proper ARIA attributes and structure. Manual testing
// is required to verify the full keyboard navigation (Arrow keys, Enter/Space, Escape, etc.).
//
// Run: npm test -- patterns/05-focus-management/dropdown-menu-focus

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/05-focus-management/dropdown-menu-focus');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ is missing ARIA menu attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe-core cannot detect missing optional ARIA attributes — it only flags
  // invalid values, not absent attributes. Check the DOM directly instead.
  //
  // The before/ version has focus management issues:
  //   - No aria-haspopup on trigger button
  //   - No aria-expanded to indicate menu state
  //   - No role="menu" on the menu container
  //   - No role="menuitem" on menu items
  //   - No keyboard navigation (Arrow keys, Enter/Space, Escape)

  const ariaHasPopup = await page.locator('#dropdown-trigger').getAttribute('aria-haspopup');
  expect(ariaHasPopup).toBeNull();

  const menuRole = await page.locator('#dropdown-menu').getAttribute('role');
  expect(menuRole).toBeNull();

  await context.close();
  await browser.close();
});

test('after/ has no focus-management violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['focus-order-semantics', 'aria-valid-attr-value'])
    .analyze();

  // The after/ version implements proper focus management:
  //   - aria-haspopup="menu" on trigger button
  //   - aria-expanded="true/false" to indicate menu state
  //   - role="menu" on the menu container
  //   - role="menuitem" on each menu item
  //   - role="separator" on visual separator
  //   - Complete keyboard navigation via JavaScript
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ dropdown opens with proper ARIA attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Get the dropdown trigger and menu
  const trigger = page.locator('#dropdown-trigger');
  const menu = page.locator('#dropdown-menu');

  // Check initial state
  expect(await trigger.getAttribute('aria-haspopup')).toBe('menu');
  expect(await trigger.getAttribute('aria-expanded')).toBe('false');
  expect(await menu.getAttribute('role')).toBe('menu');
  expect(await menu.getAttribute('aria-labelledby')).toBe('dropdown-trigger');

  // Check menu items have proper roles
  const menuItems = await page.locator('.dropdown__item').all();
  for (const item of menuItems) {
    expect(await item.getAttribute('role')).toBe('menuitem');
    expect(await item.getAttribute('tabindex')).toBe('-1');
  }

  // Check separator has proper role
  const separator = page.locator('.dropdown__separator');
  expect(await separator.getAttribute('role')).toBe('separator');
  expect(await separator.getAttribute('aria-orientation')).toBe('horizontal');

  await context.close();
  await browser.close();
});

test('after/ dropdown opens and closes with keyboard', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Get the dropdown trigger and menu
  const trigger = page.locator('#dropdown-trigger');
  const menu = page.locator('#dropdown-menu');

  // Focus the trigger
  await trigger.focus();

  // Press Enter to open the dropdown
  await page.keyboard.press('Enter');

  // Wait for menu to open
  await page.waitForSelector('.dropdown__menu--open');

  // Check that aria-expanded is now true
  expect(await trigger.getAttribute('aria-expanded')).toBe('true');

  // Check that menu is visible
  expect(await menu.isVisible()).toBe(true);

  // Press Escape to close the dropdown
  await page.keyboard.press('Escape');

  // Wait for menu to close
  await page.waitForSelector('.dropdown__menu--open', { state: 'hidden' });

  // Check that aria-expanded is now false
  expect(await trigger.getAttribute('aria-expanded')).toBe('false');

  // Check that focus is back on the trigger
  expect(await trigger.evaluate(el => el === document.activeElement)).toBe(true);

  await context.close();
  await browser.close();
});
