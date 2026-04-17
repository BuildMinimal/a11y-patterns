// tests/axe.test.js
// Pattern: 06-keyboard-navigation/accordion-keyboard
//
// Three invariants enforced:
//   1. before/ headers are <div> elements — not keyboard-reachable, no ARIA state
//   2. after/  has no axe violations — ARIA structure is correct
//   3. after/  is keyboard navigable — Space toggles, Arrow moves between headers
//
// Run: npm test -- patterns/06-keyboard-navigation/accordion-keyboard

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/06-keyboard-navigation/accordion-keyboard');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ accordion headers are not keyboard-reachable and have no ARIA state', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // Headers are <div> — not natively focusable
  const headers = page.locator('.accordion-header');
  const firstTag = await headers.first().evaluate(el => el.tagName.toLowerCase());
  expect(firstTag).toBe('div');

  // No tabindex on any header
  const tabindices = await headers.evaluateAll(els =>
    els.map(el => el.getAttribute('tabindex'))
  );
  expect(tabindices.every(t => t === null)).toBe(true);

  // No aria-expanded — open/closed state invisible to AT
  const expandedAttrs = await headers.evaluateAll(els =>
    els.map(el => el.getAttribute('aria-expanded'))
  );
  expect(expandedAttrs.every(a => a === null)).toBe(true);

  // No aria-controls — no programmatic link to panels
  const controlsAttrs = await headers.evaluateAll(els =>
    els.map(el => el.getAttribute('aria-controls'))
  );
  expect(controlsAttrs.every(a => a === null)).toBe(true);

  // Tab through the page — accordion headers are never focused
  const focusedClasses = [];
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const cls = await page.evaluate(() => document.activeElement?.className ?? '');
    focusedClasses.push(cls);
  }
  expect(focusedClasses.every(c => !c.includes('accordion-header'))).toBe(true);

  await context.close();
  await browser.close();
});

test('after/ has no axe violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['aria-required-attr', 'aria-allowed-attr', 'button-name', 'region'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ accordion is fully keyboard navigable', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Tab to first trigger (first focusable element on the page)
  await page.keyboard.press('Tab');
  const firstFocused = await page.evaluate(() => document.activeElement?.id);
  expect(firstFocused).toBe('trigger-1');

  // All panels start closed
  expect(await page.locator('#trigger-1').getAttribute('aria-expanded')).toBe('false');
  expect(await page.locator('#panel-1').getAttribute('hidden')).not.toBeNull();

  // Space opens the first panel
  await page.keyboard.press('Space');
  expect(await page.locator('#trigger-1').getAttribute('aria-expanded')).toBe('true');
  expect(await page.locator('#panel-1').getAttribute('hidden')).toBeNull(); // hidden removed

  // ArrowDown moves focus to trigger-2 (without closing panel-1)
  await page.keyboard.press('ArrowDown');
  const secondFocused = await page.evaluate(() => document.activeElement?.id);
  expect(secondFocused).toBe('trigger-2');
  // panel-1 remains open — Arrow keys navigate, not toggle
  expect(await page.locator('#trigger-1').getAttribute('aria-expanded')).toBe('true');

  // ArrowDown again moves to trigger-3
  await page.keyboard.press('ArrowDown');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('trigger-3');

  // End jumps to last trigger
  await page.keyboard.press('End');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('trigger-4');

  // Home jumps back to first trigger
  await page.keyboard.press('Home');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('trigger-1');

  // Space on open panel closes it
  await page.keyboard.press('Space');
  expect(await page.locator('#trigger-1').getAttribute('aria-expanded')).toBe('false');
  expect(await page.locator('#panel-1').getAttribute('hidden')).not.toBeNull();

  // ArrowUp wraps from first to last
  await page.keyboard.press('ArrowUp');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('trigger-4');

  await context.close();
  await browser.close();
});
