// tests/axe.test.js
// Pattern: 06-keyboard-navigation/custom-select-dropdown
//
// Three invariants enforced:
//   1. before/ trigger is a <div> — not keyboard-reachable, no ARIA roles
//   2. after/  has no ARIA violations — listbox/option structure is correct
//   3. after/  is keyboard navigable — Space opens, Arrow moves, Enter selects, Escape closes
//
// Run: npm test -- patterns/06-keyboard-navigation/custom-select-dropdown

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/06-keyboard-navigation/custom-select-dropdown');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ trigger is not keyboard-reachable and has no ARIA roles', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // Trigger is a <div> — not a button, not focusable
  const trigger = page.locator('.select-trigger');
  const tagName = await trigger.evaluate(el => el.tagName.toLowerCase());
  expect(tagName).toBe('div');

  // No tabindex — trigger is not in the Tab order
  const tabindex = await trigger.getAttribute('tabindex');
  expect(tabindex).toBeNull();

  // No aria-expanded — state is invisible to assistive technology
  const expanded = await trigger.getAttribute('aria-expanded');
  expect(expanded).toBeNull();

  // No ARIA listbox/option pattern
  expect(await page.locator('[role="listbox"]').count()).toBe(0);
  expect(await page.locator('[role="option"]').count()).toBe(0);

  // Tab through the page — the trigger div is never focused
  const focused = [];
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => ({
      tag: document.activeElement?.tagName?.toLowerCase() ?? '',
      cls: document.activeElement?.className ?? '',
    }));
    focused.push(info);
  }
  expect(focused.every(f => !f.cls.includes('select-trigger'))).toBe(true);

  await context.close();
  await browser.close();
});

test('after/ has no ARIA violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['aria-required-attr', 'aria-required-children', 'aria-allowed-attr', 'button-name'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ dropdown is fully keyboard navigable', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Tab once — trigger button is the first focusable element
  await page.keyboard.press('Tab');
  const focusedId = await page.evaluate(() => document.activeElement?.id);
  expect(focusedId).toBe('sort-trigger');

  // Trigger starts closed
  expect(await page.locator('#sort-trigger').getAttribute('aria-expanded')).toBe('false');

  // Space opens the dropdown
  await page.keyboard.press('Space');
  expect(await page.locator('#sort-trigger').getAttribute('aria-expanded')).toBe('true');

  // Focus moves programmatically to the listbox
  const listboxFocused = await page.evaluate(() => document.activeElement?.id);
  expect(listboxFocused).toBe('sort-listbox');

  // ArrowDown moves highlight to option-1 ("Most popular")
  await page.keyboard.press('ArrowDown');
  const activeDescendant = await page.locator('#sort-listbox').getAttribute('aria-activedescendant');
  expect(activeDescendant).toBe('option-1');

  // Enter selects "Most popular" and closes
  await page.keyboard.press('Enter');
  expect(await page.locator('#sort-value').textContent()).toBe('Most popular');
  expect(await page.locator('#sort-trigger').getAttribute('aria-expanded')).toBe('false');

  // Focus returns to the trigger after selection
  const returnedFocus = await page.evaluate(() => document.activeElement?.id);
  expect(returnedFocus).toBe('sort-trigger');

  // Open again and press Escape — closes without changing value
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown'); // move to option-2
  await page.keyboard.press('Escape');
  expect(await page.locator('#sort-trigger').getAttribute('aria-expanded')).toBe('false');
  expect(await page.locator('#sort-value').textContent()).toBe('Most popular'); // unchanged

  await context.close();
  await browser.close();
});
