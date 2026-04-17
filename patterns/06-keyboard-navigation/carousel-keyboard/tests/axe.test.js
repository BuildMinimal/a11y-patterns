// tests/axe.test.js
// Pattern: 06-keyboard-navigation/carousel-keyboard
//
// Three invariants enforced:
//   1. before/ controls are <div> — not keyboard-reachable; no pause mechanism
//   2. after/  has no axe violations — button names are correct
//   3. after/  is keyboard accessible — pause stops auto-advance, prev/next navigate slides
//
// WCAG 2.1.1: keyboard operability  |  WCAG 2.2.2: auto-advance pause mechanism
//
// Run: npm test -- patterns/06-keyboard-navigation/carousel-keyboard

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/06-keyboard-navigation/carousel-keyboard');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ carousel controls are not keyboard-reachable and have no pause mechanism', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // Nav controls are <div> — not natively focusable
  const prevBtn = page.locator('.carousel-btn--prev');
  const nextBtn = page.locator('.carousel-btn--next');
  expect(await prevBtn.evaluate(el => el.tagName.toLowerCase())).toBe('div');
  expect(await nextBtn.evaluate(el => el.tagName.toLowerCase())).toBe('div');

  // No tabindex on the controls
  expect(await prevBtn.getAttribute('tabindex')).toBeNull();
  expect(await nextBtn.getAttribute('tabindex')).toBeNull();

  // No aria-label on controls — purpose is invisible to AT
  expect(await prevBtn.getAttribute('aria-label')).toBeNull();
  expect(await nextBtn.getAttribute('aria-label')).toBeNull();

  // No pause button anywhere — WCAG 2.2.2 mechanism absent
  const pauseButton = page.locator('button[aria-label*="ause"]');
  expect(await pauseButton.count()).toBe(0);

  // Tab through the page — carousel controls are never focused
  const focusedClasses = [];
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    focusedClasses.push(await page.evaluate(() => document.activeElement?.className ?? ''));
  }
  expect(focusedClasses.every(c => !c.includes('carousel-btn'))).toBe(true);

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

test('after/ pause button stops auto-advance and prev/next navigate slides', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Tab to pause button (first focusable element).
  // focusin fires stopAutoAdvance() — label changes to "Play slideshow".
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('pause-btn');
  expect(await page.locator('#pause-btn').getAttribute('aria-label')).toBe('Play slideshow');

  // Space restarts auto-advance
  await page.keyboard.press('Space');
  expect(await page.locator('#pause-btn').getAttribute('aria-label')).toBe('Pause slideshow');

  // Space again pauses it
  await page.keyboard.press('Space');
  expect(await page.locator('#pause-btn').getAttribute('aria-label')).toBe('Play slideshow');

  // Tab to prev button
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('prev-btn');
  expect(await page.locator('#prev-btn').getAttribute('aria-label')).toBe('Previous slide');

  // Tab to next button
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('next-btn');
  expect(await page.locator('#next-btn').getAttribute('aria-label')).toBe('Next slide');

  // Space on next button — slide 1 should become active (index 1)
  const initialIndex = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.carousel-slide')).findIndex(s => s.classList.contains('active'))
  );
  expect(initialIndex).toBe(0);

  await page.keyboard.press('Space');

  const newIndex = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.carousel-slide')).findIndex(s => s.classList.contains('active'))
  );
  expect(newIndex).toBe(1);

  // Prev button focuses and navigates back to slide 0
  await page.locator('#prev-btn').focus();
  await page.keyboard.press('Space');
  const backIndex = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.carousel-slide')).findIndex(s => s.classList.contains('active'))
  );
  expect(backIndex).toBe(0);

  await context.close();
  await browser.close();
});
