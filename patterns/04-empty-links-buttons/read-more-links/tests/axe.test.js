import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/04-empty-links-buttons/read-more-links');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ read-more links have no accessible name beyond "Read more"', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // axe link-name passes — "Read more" IS text, so no automated violation.
  // The WCAG 2.4.4 failure is that every link has identical text with no
  // destination context. Verify this via DOM inspection.
  const links = page.locator('.read-more');
  const count = await links.count();
  expect(count).toBe(3);

  const linkTexts = new Set();
  for (let i = 0; i < count; i++) {
    const text = (await links.nth(i).innerText()).replace(/[→\s]/g, '').trim();
    linkTexts.add(text);
  }
  // All 3 links have the same visible text — zero context differentiation
  expect(linkTexts.size).toBe(1);
  expect([...linkTexts][0]).toBe('Readmore');

  // None of the links has a .sr-only child providing destination context
  const srOnly = page.locator('.read-more .sr-only');
  const srOnlyCount = await srOnly.count();
  expect(srOnlyCount).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ has no link-name violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['link-name'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ each read-more link has unique, destination-specific accessible text', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const links = page.locator('.read-more');
  const count = await links.count();
  expect(count).toBe(3);

  // Each link must have a .sr-only span providing destination context
  const srOnlySpans = page.locator('.read-more .sr-only');
  const srOnlyCount = await srOnlySpans.count();
  expect(srOnlyCount).toBe(3);

  // The sr-only text must be unique across all three links
  const srTexts = new Set();
  for (let i = 0; i < srOnlyCount; i++) {
    const text = await srOnlySpans.nth(i).innerText();
    expect(text.length).toBeGreaterThan(5);
    srTexts.add(text);
  }
  expect(srTexts.size).toBe(3); // all three are different

  // Verify each sr-only span references a real article title
  const expectedContexts = [
    'Mastering Focus Management in Single-Page Apps',
    'WCAG 3.0 Contrast: What Changes for Designers',
    'Accessible Error Messages: Beyond Red Text',
  ];
  for (const ctx of expectedContexts) {
    const matchingSpan = page.locator(`.read-more .sr-only`).filter({ hasText: ctx });
    const matchCount = await matchingSpan.count();
    expect(matchCount).toBe(1);
  }

  // Arrow spans must be aria-hidden so they don't pollute the accessible name
  const arrowSpans = page.locator('.read-more-arrow');
  const arrowCount = await arrowSpans.count();
  expect(arrowCount).toBe(3);
  for (let i = 0; i < arrowCount; i++) {
    const hidden = await arrowSpans.nth(i).getAttribute('aria-hidden');
    expect(hidden).toBe('true');
  }

  await context.close();
  await browser.close();
});
