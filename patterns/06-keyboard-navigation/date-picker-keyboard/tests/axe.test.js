// tests/axe.test.js
// Pattern: 06-keyboard-navigation/date-picker-keyboard
//
// Three invariants enforced:
//   1. before/ calendar grid uses <div> — no roles, no keyboard access
//   2. after/  has no axe violations when calendar is open
//   3. after/  is keyboard navigable — Arrow moves focus, Enter selects, Escape closes
//
// Run: npm test -- patterns/06-keyboard-navigation/date-picker-keyboard

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/06-keyboard-navigation/date-picker-keyboard');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ calendar grid has no ARIA roles and is not keyboard-navigable', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // Toggle is a <div> — not keyboard-reachable
  const toggle = page.locator('.calendar-toggle');
  expect(await toggle.evaluate(el => el.tagName.toLowerCase())).toBe('div');
  expect(await toggle.getAttribute('tabindex')).toBeNull();

  // Open the calendar via mouse click
  await toggle.click();

  // Day cells are <div> — no role="gridcell", no tabindex
  expect(await page.locator('[role="grid"]').count()).toBe(0);
  expect(await page.locator('[role="gridcell"]').count()).toBe(0);

  const firstDay = page.locator('.cal-cell').first();
  expect(await firstDay.evaluate(el => el.tagName.toLowerCase())).toBe('div');
  expect(await firstDay.getAttribute('tabindex')).toBeNull();

  // Nav buttons are <div> — keyboard-inaccessible
  const navBtns = page.locator('.cal-nav');
  expect(await navBtns.first().evaluate(el => el.tagName.toLowerCase())).toBe('div');

  await context.close();
  await browser.close();
});

test('after/ calendar has no axe violations when open', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Open the calendar
  await page.locator('#calendar-toggle').click();
  expect(await page.locator('#calendar').getAttribute('hidden')).toBeNull();

  const results = await new AxeBuilder({ page })
    .withRules(['aria-required-children', 'aria-required-attr', 'aria-allowed-attr', 'button-name'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ date picker is fully keyboard navigable', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Calendar starts closed
  expect(await page.locator('#calendar').getAttribute('hidden')).not.toBeNull();

  // Click toggle to open calendar
  await page.locator('#calendar-toggle').click();
  expect(await page.locator('#calendar').getAttribute('hidden')).toBeNull();

  // A gridcell has tabindex="0" (the focused date)
  const initialFocusedCell = page.locator('[role="gridcell"][tabindex="0"]');
  expect(await initialFocusedCell.count()).toBe(1);

  const initialDate = await initialFocusedCell.getAttribute('data-date');
  expect(initialDate).toBeTruthy();

  // ArrowRight moves focus to the next day
  await page.keyboard.press('ArrowRight');
  const afterRightDate = await page.locator('[role="gridcell"][tabindex="0"]').getAttribute('data-date');
  expect(afterRightDate).not.toBe(initialDate);

  // Verify it is exactly 1 day later
  const d1 = new Date(initialDate);
  const d2 = new Date(afterRightDate);
  expect((d2 - d1) / 86400000).toBe(1);

  // ArrowLeft returns to the original date
  await page.keyboard.press('ArrowLeft');
  expect(await page.locator('[role="gridcell"][tabindex="0"]').getAttribute('data-date')).toBe(initialDate);

  // ArrowDown moves 7 days forward
  await page.keyboard.press('ArrowDown');
  const afterDownDate = await page.locator('[role="gridcell"][tabindex="0"]').getAttribute('data-date');
  const d3 = new Date(afterDownDate);
  expect((d3 - d1) / 86400000).toBe(7);

  // Enter selects the focused date and closes the calendar
  await page.keyboard.press('Enter');
  expect(await page.locator('#calendar').getAttribute('hidden')).not.toBeNull();
  const inputVal = await page.locator('#date-input').inputValue();
  expect(inputVal).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);

  // Re-open and press Escape — closes without changing value
  await page.locator('#calendar-toggle').click();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  expect(await page.locator('#calendar').getAttribute('hidden')).not.toBeNull();
  expect(await page.locator('#date-input').inputValue()).toBe(inputVal); // unchanged

  await context.close();
  await browser.close();
});
