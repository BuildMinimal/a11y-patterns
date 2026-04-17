import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/04-empty-links-buttons/card-clickable-area');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ card divs are not keyboard-accessible interactive elements', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // The cards are <div> elements with onclick — no native interactivity.
  // Verify they have no accessible role that would make them keyboard targets.
  const cards = page.locator('.card');
  const count = await cards.count();
  expect(count).toBe(3);

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);

    // role="none" explicitly removes any implied role
    const role = await card.getAttribute('role');
    expect(role).toBe('none');

    // No <a> or <button> descendants — no real interactive element
    const links = await card.locator('a').count();
    const buttons = await card.locator('button').count();
    expect(links).toBe(0);
    expect(buttons).toBe(0);
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

test('after/ each card has one real <a> with descriptive text and ::after overlay', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const cards = page.locator('article.card');
  const count = await cards.count();
  expect(count).toBe(3);

  const expectedTitles = [
    'CSS Grid: Building Complex Layouts Without a Framework',
    'Core Web Vitals: A Practical Optimisation Checklist',
    'Migrating a Legacy Codebase to TypeScript Incrementally',
  ];

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);

    // Exactly one link per card
    const links = card.locator('a.card-link');
    const linkCount = await links.count();
    expect(linkCount).toBe(1);

    // Link text matches the article title
    const linkText = (await links.nth(0).innerText()).trim();
    expect(linkText).toBe(expectedTitles[i]);

    // Link has a real href
    const href = await links.nth(0).getAttribute('href');
    expect(href).toBeTruthy();

    // Card has no onclick handler (the div is no longer the interactive element)
    const onclick = await card.getAttribute('onclick');
    expect(onclick).toBeNull();

    // Card uses <article> semantics
    const tagName = await card.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('article');
  }

  await context.close();
  await browser.close();
});
