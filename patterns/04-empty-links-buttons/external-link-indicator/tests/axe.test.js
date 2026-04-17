import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/04-empty-links-buttons/external-link-indicator');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ external links have no new-tab warning for screen readers', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // axe link-name passes — links have text. The WCAG 2.4.4 failure is that
  // target="_blank" is undisclosed. Verify via DOM inspection.
  const externalLinks = page.locator('a[target="_blank"]');
  const count = await externalLinks.count();
  expect(count).toBe(5);

  for (let i = 0; i < count; i++) {
    const link = externalLinks.nth(i);

    // No sr-only disclosure text
    const srOnly = link.locator('.sr-only');
    const srOnlyCount = await srOnly.count();
    expect(srOnlyCount).toBe(0);

    // No aria-label containing "new tab"
    const ariaLabel = await link.getAttribute('aria-label');
    if (ariaLabel) {
      expect(ariaLabel.toLowerCase()).not.toContain('new tab');
    }

    // No rel="noopener" (security issue also absent)
    const rel = await link.getAttribute('rel');
    expect(rel).toBeNull();
  }

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

test('after/ each external link has new-tab disclosure, visible icon, and rel attribute', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const externalLinks = page.locator('a[target="_blank"]');
  const count = await externalLinks.count();
  expect(count).toBe(5);

  for (let i = 0; i < count; i++) {
    const link = externalLinks.nth(i);

    // Each link must have a .sr-only span with new-tab disclosure
    const srOnly = link.locator('.sr-only');
    const srOnlyCount = await srOnly.count();
    expect(srOnlyCount).toBe(1);
    const srText = await srOnly.innerText();
    expect(srText.toLowerCase()).toContain('new tab');

    // Each link must have a visible SVG icon (aria-hidden so it's decorative)
    const icon = link.locator('svg.ext-icon');
    const iconCount = await icon.count();
    expect(iconCount).toBe(1);
    const iconHidden = await icon.getAttribute('aria-hidden');
    expect(iconHidden).toBe('true');
    const iconFocusable = await icon.getAttribute('focusable');
    expect(iconFocusable).toBe('false');

    // rel must include noopener for security
    const rel = await link.getAttribute('rel');
    expect(rel).toBeTruthy();
    expect(rel).toContain('noopener');
  }

  await context.close();
  await browser.close();
});
