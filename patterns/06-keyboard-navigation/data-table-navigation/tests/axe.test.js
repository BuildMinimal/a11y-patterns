// tests/axe.test.js
// Pattern: 06-keyboard-navigation/data-table-navigation
//
// Three invariants enforced:
//   1. before/ has <span onclick> sort triggers — no keyboard sort mechanism
//   2. after/  has no axe violations — button names and aria-sort are correct
//   3. after/  arrow keys navigate cells and sort buttons change aria-sort
//
// Run: npm test -- patterns/06-keyboard-navigation/data-table-navigation

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/06-keyboard-navigation/data-table-navigation');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ sort triggers are spans — no keyboard sort mechanism exists', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // Sort triggers are <span> elements, not <button>
  const sortSpans = page.locator('thead .sort-trigger');
  expect(await sortSpans.count()).toBeGreaterThan(0);

  // No <button> elements in thead
  expect(await page.locator('thead button').count()).toBe(0);

  // No aria-sort on any <th>
  const thWithSort = page.locator('th[aria-sort]');
  expect(await thWithSort.count()).toBe(0);

  // No aria-live region
  expect(await page.locator('[aria-live]').count()).toBe(0);

  // Tab through the page — nothing in the table receives focus
  const focused = [];
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    focused.push(await page.evaluate(() => document.activeElement?.className ?? ''));
  }
  expect(focused.every(c => !c.includes('sort-trigger') && !c.includes('sort-btn'))).toBe(true);

  await context.close();
  await browser.close();
});

test('after/ has no axe violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['button-name', 'aria-allowed-attr', 'aria-required-attr', 'scope-attr-valid'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ arrow keys navigate cells and sort buttons update aria-sort', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Tab → first sort button (Tool column header)
  await page.keyboard.press('Tab');
  const firstLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(firstLabel).toContain('Tool name');

  // ArrowRight → Category sort button
  await page.keyboard.press('ArrowRight');
  const categoryLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(categoryLabel).toContain('Category');

  // ArrowRight → Cost sort button
  await page.keyboard.press('ArrowRight');
  const costLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(costLabel).toContain('Cost');

  // ArrowLeft → back to Category
  await page.keyboard.press('ArrowLeft');
  const backLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(backLabel).toContain('Category');

  // ArrowDown → first data row, col 1 (Category cell)
  await page.keyboard.press('ArrowDown');
  const cellTag = await page.evaluate(() => document.activeElement?.tagName);
  expect(cellTag).toBe('TD');

  // ArrowLeft → first data row, col 0 (Tool name cell)
  await page.keyboard.press('ArrowLeft');
  const firstCellText = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(firstCellText).toBeTruthy(); // some tool name

  // ArrowUp → back to header row, col 0 (Tool sort button)
  await page.keyboard.press('ArrowUp');
  const backInHeader = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(backInHeader).toContain('Tool name');

  // Enter on Tool sort button → sorted ascending
  await page.keyboard.press('Enter');

  const sortDirAfterFirst = await page.evaluate(() =>
    document.querySelector('thead th[data-col="name"]')?.getAttribute('aria-sort')
  );
  expect(sortDirAfterFirst).toBe('ascending');

  // aria-live region announces the sort
  const statusAfterFirst = await page.locator('#sort-status').textContent();
  expect(statusAfterFirst).toContain('Tool name');
  expect(statusAfterFirst).toContain('ascending');

  // Focus stays on Tool sort button after sort
  const focusedAfterSort = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(focusedAfterSort).toContain('Tool name');

  // Enter again → sorted descending
  await page.keyboard.press('Enter');

  const sortDirAfterSecond = await page.evaluate(() =>
    document.querySelector('thead th[data-col="name"]')?.getAttribute('aria-sort')
  );
  expect(sortDirAfterSecond).toBe('descending');

  const statusAfterSecond = await page.locator('#sort-status').textContent();
  expect(statusAfterSecond).toContain('descending');

  // Ctrl+Home → back to first cell [0,0]
  await page.keyboard.press('Control+Home');
  const ctrlHomeLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  expect(ctrlHomeLabel).toContain('Tool name');

  // Ctrl+End → last cell in last row
  await page.keyboard.press('Control+End');
  const lastCellTag = await page.evaluate(() => document.activeElement?.tagName);
  expect(lastCellTag).toBe('TD');

  await context.close();
  await browser.close();
});
