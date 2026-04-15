// tests/axe.test.js
// Pattern: 05-focus-management/tab-panel-focus
//
// Two invariants enforced:
//   1. before/ has focus-management violations  — proves the "before" is genuinely broken
//   2. after/  has zero focus-management violations — proves the fix actually works
//
// Note: axe-core does not automatically test for keyboard navigation behavior. The test below
// verifies that the tabs have proper ARIA attributes and structure. Manual testing
// is required to verify the full keyboard navigation (Arrow keys, Tab key, etc.).
//
// Run: npm test -- patterns/05-focus-management/tab-panel-focus

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/05-focus-management/tab-panel-focus');

function fileUrl(relative) {
  // pathToFileURL handles Windows paths correctly (file:///D:/... instead of file://D:\...)
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ is missing ARIA tab roles and attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  // axe-core cannot detect missing optional ARIA roles/attributes. Check the DOM directly.
  //
  // The before/ version has focus management issues:
  //   - No role="tablist" on the tab container
  //   - No role="tab" on tab buttons
  //   - No role="tabpanel" on panel containers
  //   - No aria-selected to indicate active tab
  //   - No aria-controls linking tabs to panels
  //   - No aria-labelledby linking panels to tabs
  //   - No keyboard navigation (Arrow keys, Tab key)

  const listRole = await page.locator('.tabs__list').getAttribute('role');
  expect(listRole).toBeNull();

  const tabRole = await page.locator('.tabs__tab').first().getAttribute('role');
  expect(tabRole).toBeNull();

  await context.close();
  await browser.close();
});

test('after/ has no focus-management violations', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['focus-order-semantics', 'aria-valid-attr-value', 'aria-allowed-attr'])
    .analyze();

  // The after/ version implements proper focus management:
  //   - role="tablist" on the tab container
  //   - role="tab" on each tab button
  //   - role="tabpanel" on each panel container
  //   - aria-selected="true/false" to indicate active tab
  //   - aria-controls linking tabs to their panels
  //   - aria-labelledby linking panels to their tabs
  //   - Complete keyboard navigation via JavaScript
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ tabs have proper ARIA attributes', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Get the tab list and tabs
  const tabList = page.locator('.tabs__list');
  const tabs = await page.locator('.tabs__tab').all();
  const panels = await page.locator('.tabs__panel').all();

  // Check tab list has proper role
  expect(await tabList.getAttribute('role')).toBe('tablist');
  expect(await tabList.getAttribute('aria-label')).toBe('Product information tabs');

  // Check tabs have proper roles and attributes
  for (let i = 0; i < tabs.length; i++) {
    expect(await tabs[i].getAttribute('role')).toBe('tab');
    expect(await tabs[i].getAttribute('aria-controls')).not.toBeNull();
    expect(await tabs[i].getAttribute('tabindex')).not.toBeNull();

    // First tab should be selected
    if (i === 0) {
      expect(await tabs[i].getAttribute('aria-selected')).toBe('true');
      expect(await tabs[i].getAttribute('tabindex')).toBe('0');
    } else {
      expect(await tabs[i].getAttribute('aria-selected')).toBe('false');
      expect(await tabs[i].getAttribute('tabindex')).toBe('-1');
    }
  }

  // Check panels have proper roles and attributes
  for (let i = 0; i < panels.length; i++) {
    expect(await panels[i].getAttribute('role')).toBe('tabpanel');
    expect(await panels[i].getAttribute('aria-labelledby')).not.toBeNull();
    expect(await panels[i].getAttribute('tabindex')).not.toBeNull();

    // First panel should be visible and focusable
    if (i === 0) {
      expect(await panels[i].getAttribute('hidden')).toBeNull();
      expect(await panels[i].getAttribute('tabindex')).toBe('0');
    } else {
      expect(await panels[i].getAttribute('hidden')).not.toBeNull();
      expect(await panels[i].getAttribute('tabindex')).toBe('0');
    }
  }

  await context.close();
  await browser.close();
});

test('after/ tabs switch with keyboard', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Get the tabs
  const tabs = await page.locator('.tabs__tab').all();
  const panels = await page.locator('.tabs__panel').all();

  // Focus on the first tab
  await tabs[0].focus();
  expect(await tabs[0].evaluate(el => el === document.activeElement)).toBe(true);

  // Press ArrowRight to move to next tab
  await page.keyboard.press('ArrowRight');
  expect(await tabs[1].evaluate(el => el === document.activeElement)).toBe(true);
  expect(await tabs[1].getAttribute('aria-selected')).toBe('true');
  expect(await tabs[0].getAttribute('aria-selected')).toBe('false');

  // Check that second panel is now visible
  expect(await panels[1].getAttribute('hidden')).toBeNull();
  expect(await panels[0].getAttribute('hidden')).not.toBeNull();

  // Press Tab to move focus into the panel
  await page.keyboard.press('Tab');
  expect(await panels[1].evaluate(el => el === document.activeElement)).toBe(true);

  await context.close();
  await browser.close();
});
