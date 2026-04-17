// tests/axe.test.js
// Pattern: 06-keyboard-navigation/combobox-autocomplete
//
// Three invariants enforced:
//   1. before/ has a plain <input> — no role="combobox", suggestions are <div>s
//   2. after/  has no axe violations when the listbox is open
//   3. after/  keyboard navigation: ArrowDown highlights options, Enter selects,
//              Escape closes without selecting
//
// Run: npm test -- patterns/06-keyboard-navigation/combobox-autocomplete

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/06-keyboard-navigation/combobox-autocomplete');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ input has no combobox role and suggestions are not keyboard reachable', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('before/index.html'));

  // Input has no role="combobox"
  const role = await page.locator('#fw-input').getAttribute('role');
  expect(role).toBeNull();

  // Input has no aria-expanded
  const expanded = await page.locator('#fw-input').getAttribute('aria-expanded');
  expect(expanded).toBeNull();

  // No role="listbox" on the page
  expect(await page.locator('[role="listbox"]').count()).toBe(0);

  // Type "r" — suggestions appear as <div> elements, not <li role="option">
  await page.locator('#fw-input').fill('r');
  await page.locator('#fw-input').dispatchEvent('input');

  const suggestionDivs = page.locator('#suggestions .suggestion-item');
  expect(await suggestionDivs.count()).toBeGreaterThan(0);

  // No role="option" elements
  expect(await page.locator('[role="option"]').count()).toBe(0);

  // ArrowDown does not set aria-activedescendant (no keyboard navigation in suggestions)
  await page.locator('#fw-input').press('ArrowDown');
  const activeDesc = await page.locator('#fw-input').getAttribute('aria-activedescendant');
  expect(activeDesc).toBeNull();

  // Tab moves focus out of the input, not into the suggestion list
  await page.keyboard.press('Tab');
  const focusedClass = await page.evaluate(() => document.activeElement?.className ?? '');
  expect(focusedClass).not.toContain('suggestion-item');

  await context.close();
  await browser.close();
});

test('after/ has no axe violations with listbox open', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Open the listbox so options are visible before axe runs
  await page.locator('#fw-input').fill('r');
  await page.locator('#fw-input').dispatchEvent('input');
  await page.waitForSelector('[role="option"]');

  const results = await new AxeBuilder({ page })
    .withRules(['aria-required-attr', 'aria-allowed-attr', 'aria-required-children', 'label'])
    .analyze();

  expect(results.violations).toHaveLength(0);

  await context.close();
  await browser.close();
});

test('after/ ArrowDown navigates options, Enter selects, Escape closes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  // Tab → input focused
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe('fw-input');

  // Type "r" → listbox opens, React and Remix appear
  await page.keyboard.type('r');
  await page.waitForSelector('[role="option"]');

  const isExpanded = await page.locator('#fw-input').getAttribute('aria-expanded');
  expect(isExpanded).toBe('true');

  const optionCount = await page.locator('[role="option"]').count();
  expect(optionCount).toBeGreaterThan(0);

  // ArrowDown → first option active
  await page.keyboard.press('ArrowDown');
  const activeId1 = await page.locator('#fw-input').getAttribute('aria-activedescendant');
  expect(activeId1).toBeTruthy();
  expect(activeId1).toBe('fw-opt-0');

  const opt0Text = await page.locator('#fw-opt-0').textContent();
  expect(opt0Text?.trim()).toBe('React');

  // ArrowDown → second option active
  await page.keyboard.press('ArrowDown');
  const activeId2 = await page.locator('#fw-input').getAttribute('aria-activedescendant');
  expect(activeId2).toBe('fw-opt-1');

  const opt1Text = await page.locator('#fw-opt-1').textContent();
  expect(opt1Text?.trim()).toBe('Remix');

  // Enter → selects Remix, listbox closes, input value = "Remix"
  await page.keyboard.press('Enter');

  const inputValue = await page.locator('#fw-input').inputValue();
  expect(inputValue).toBe('Remix');

  const expandedAfterSelect = await page.locator('#fw-input').getAttribute('aria-expanded');
  expect(expandedAfterSelect).toBe('false');

  const listboxHidden = await page.locator('#fw-listbox').getAttribute('hidden');
  expect(listboxHidden).not.toBeNull();

  // Clear input, type "s" → Solid and Svelte appear
  await page.locator('#fw-input').fill('');
  await page.keyboard.type('s');
  await page.waitForSelector('[role="option"]');

  const sOptions = await page.locator('[role="option"]').allTextContents();
  expect(sOptions.some(t => t.includes('Solid'))).toBe(true);
  expect(sOptions.some(t => t.includes('Svelte'))).toBe(true);

  // Escape → listbox closes without selecting
  await page.keyboard.press('Escape');

  const expandedAfterEsc = await page.locator('#fw-input').getAttribute('aria-expanded');
  expect(expandedAfterEsc).toBe('false');

  // Input retains typed value "s" (Escape only closes, doesn't clear)
  const valueAfterEsc = await page.locator('#fw-input').inputValue();
  expect(valueAfterEsc).toBe('s');

  // End key moves to last option when listbox is open
  await page.keyboard.type('v'); // "sv" — no matches; clear and type "v" alone
  await page.locator('#fw-input').fill('v');
  await page.locator('#fw-input').dispatchEvent('input');
  await page.waitForSelector('[role="option"]');

  await page.keyboard.press('End');
  const activeIdEnd = await page.locator('#fw-input').getAttribute('aria-activedescendant');
  const endOptText = activeIdEnd
    ? await page.locator(`#${activeIdEnd}`).textContent()
    : null;
  expect(endOptText?.trim()).toBe('Vue');

  await context.close();
  await browser.close();
});
