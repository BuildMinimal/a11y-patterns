// tests/axe.test.js
// Pattern: 06-keyboard-navigation/drag-and-drop-alt
//
// Three invariants enforced:
//   1. before/ has draggable items but no keyboard alternative (no move buttons)
//   2. after/  has no axe violations — button names are correct
//   3. after/  keyboard move buttons reorder the list and announce via aria-live
//
// Run: npm test -- patterns/06-keyboard-navigation/drag-and-drop-alt

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/06-keyboard-navigation/drag-and-drop-alt');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ items are only draggable — no keyboard reorder mechanism exists', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // Items are draggable
  const draggableItems = page.locator('[draggable="true"]');
  expect(await draggableItems.count()).toBeGreaterThan(0);

  // No keyboard move buttons
  expect(await page.locator('button[aria-label*="Move"]').count()).toBe(0);
  expect(await page.locator('button[aria-label*="up"]').count()).toBe(0);
  expect(await page.locator('button[aria-label*="down"]').count()).toBe(0);

  // No aria-live region — screen readers get no feedback
  expect(await page.locator('[aria-live]').count()).toBe(0);

  // Tab through the page — task items are never focused (no interactive children)
  const focused = [];
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    focused.push(await page.evaluate(() => document.activeElement?.className ?? ''));
  }
  expect(focused.every(c => !c.includes('task-item') && !c.includes('task-btn'))).toBe(true);

  await context.close();
  await browser.close();
});

test('after/ has no axe violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['button-name', 'aria-allowed-attr', 'aria-required-attr'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ move buttons reorder tasks and announce via aria-live', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Record initial order
  const initialOrder = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.task-text')).map(el => el.textContent)
  );
  expect(initialOrder).toHaveLength(5);

  // Tab to first focusable button — item 0's "Move up" is disabled, so first is item 0's "Move down"
  await page.keyboard.press('Tab');
  const firstFocusedLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(firstFocusedLabel).toContain('down');
  expect(firstFocusedLabel).toContain(initialOrder[0]);

  // Space moves item 0 down to position 2
  await page.keyboard.press('Space');

  const afterMoveOrder = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.task-text')).map(el => el.textContent)
  );

  // First task moved to position 2 (index 1)
  expect(afterMoveOrder[1]).toBe(initialOrder[0]);
  // Second task moved up to position 1 (index 0)
  expect(afterMoveOrder[0]).toBe(initialOrder[1]);

  // aria-live region announces the new position
  const statusText = await page.locator('#reorder-status').textContent();
  expect(statusText).toMatch(/position 2 of 5/);
  expect(statusText).toContain(initialOrder[0]);

  // Focus follows the moved item — now at index 1, "Move down" still focused
  const focusedAfterMove = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(focusedAfterMove).toContain('down');
  expect(focusedAfterMove).toContain(initialOrder[0]);

  // Space again: item moves from position 2 to position 3
  await page.keyboard.press('Space');
  const afterSecondMove = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.task-text')).map(el => el.textContent)
  );
  expect(afterSecondMove[2]).toBe(initialOrder[0]);

  const statusAfter2 = await page.locator('#reorder-status').textContent();
  expect(statusAfter2).toMatch(/position 3 of 5/);

  await context.close();
  await browser.close();
});
