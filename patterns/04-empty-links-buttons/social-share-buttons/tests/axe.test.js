import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/04-empty-links-buttons/social-share-buttons');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has button-name violations for all 4 icon-only share buttons', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['button-name'])
    .analyze();

  expect(results.violations.length).toBeGreaterThan(0);

  const violation = results.violations.find(v => v.id === 'button-name');
  expect(violation).toBeDefined();
  expect(violation.nodes.length).toBe(4);

  await context.close();
  await browser.close();
});

test('after/ has no button-name violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['button-name'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ each share button has a descriptive aria-label and hidden SVG', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const expectedLabels = ['Share on X', 'Share on Facebook', 'Share on LinkedIn', 'Copy link'];

  for (const label of expectedLabels) {
    const btn = page.locator(`button[aria-label="${label}"]`);
    const count = await btn.count();
    expect(count).toBe(1);

    // SVG inside must be aria-hidden so it doesn't pollute the accessible name
    const svg = btn.locator('svg');
    const svgHidden = await svg.getAttribute('aria-hidden');
    expect(svgHidden).toBe('true');
  }

  // Share group has a group label for screen reader context
  const group = page.locator('[role="group"][aria-label="Share this article"]');
  const groupCount = await group.count();
  expect(groupCount).toBe(1);

  await context.close();
  await browser.close();
});
