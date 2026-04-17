import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/04-empty-links-buttons/skip-navigation-link');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has no skip link and no landmark regions for sighted keyboard users', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // axe bypass may pass because <h1> satisfies WCAG 2.4.1 technically.
  // The real failure is that sighted keyboard users cannot skip repeated nav —
  // headings only help screen reader users who can jump to them by landmark.
  // Verify the bypass mechanism for sighted keyboard users is absent.

  // No skip link in the DOM
  const skipLink = page.locator('a[href="#main-content"]');
  const skipCount = await skipLink.count();
  expect(skipCount).toBe(0);

  // No <main> landmark (screen reader landmark navigation also absent)
  const mainEl = page.locator('main');
  const mainCount = await mainEl.count();
  expect(mainCount).toBe(0);

  // No <nav> with aria-label (landmarks not properly exposed)
  const labelledNav = page.locator('nav[aria-label]');
  const navCount = await labelledNav.count();
  expect(navCount).toBe(0);

  // First Tab stop lands on a nav link, NOT a skip link
  await page.keyboard.press('Tab');
  const firstFocused = await page.evaluate(() => document.activeElement?.className ?? '');
  expect(firstFocused).not.toContain('skip-link');

  await context.close();
  await browser.close();
});

test('after/ has no bypass violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['bypass'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ skip link is first focusable element and targets main with tabindex=-1', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Skip link must exist and link to #main-content
  const skipLink = page.locator('a.skip-link');
  const skipCount = await skipLink.count();
  expect(skipCount).toBe(1);

  const href = await skipLink.getAttribute('href');
  expect(href).toBe('#main-content');

  // Skip link must be the FIRST focusable element — Tab once from body
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.className ?? '');
  expect(focused).toContain('skip-link');

  // Target <main> must have id="main-content" and tabindex="-1"
  const main = page.locator('main#main-content');
  const mainCount = await main.count();
  expect(mainCount).toBe(1);

  const tabindex = await main.getAttribute('tabindex');
  expect(tabindex).toBe('-1');

  // <nav> elements must have aria-label for landmark uniqueness
  const labelledNavs = page.locator('nav[aria-label]');
  const navCount = await labelledNavs.count();
  expect(navCount).toBeGreaterThanOrEqual(1);

  await context.close();
  await browser.close();
});
