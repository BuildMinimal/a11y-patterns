// tests/axe.test.js
// Pattern: 02-missing-alt-text/svg-icons
//
// Three invariants enforced:
//   1. before/ has image-alt violations (SVG role="img" without accessible name)
//      AND button-name violations (icon-only buttons with no label)
//   2. after/  has no violations — both SVG strategies applied correctly
//   3. after/  verifies:
//        - Informative SVGs have role="img" + aria-label
//        - Dismiss buttons have aria-label on the <button>, not the SVG
//        - Dismiss SVGs have aria-hidden="true" (decorative within labelled button)
//        - Action button SVGs have aria-hidden="true" (decorative alongside text)
//
// axe rules checked:
//   image-alt   — SVG elements with role="img" must have an accessible name
//   button-name — Buttons must have discernible text
//
// Run: npm test -- patterns/02-missing-alt-text/svg-icons

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/02-missing-alt-text/svg-icons');

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has image-alt and button-name violations — SVG icons lack accessible names', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt', 'button-name'])
    .analyze();

  expect(results.violations.length).toBeGreaterThan(0);

  // Confirm severity SVGs have role="img" but no accessible name
  const severityIcons = await page.locator('.severity-icon').all();
  expect(severityIcons.length).toBe(3);

  for (const icon of severityIcons) {
    const role      = await icon.getAttribute('role');
    const ariaLabel = await icon.getAttribute('aria-label');
    const title     = await icon.locator('title').count();
    expect(role).toBe('img');    // role="img" is present
    expect(ariaLabel).toBeNull(); // but no aria-label → image-alt violation
    expect(title).toBe(0);        // and no <title> → no accessible name at all
  }

  // Confirm dismiss buttons have no accessible name
  const dismissBtns = await page.locator('.btn-dismiss').all();
  expect(dismissBtns.length).toBe(3);

  for (const btn of dismissBtns) {
    const ariaLabel = await btn.getAttribute('aria-label');
    const innerText = (await btn.innerText()).trim();
    expect(ariaLabel).toBeNull(); // no aria-label → button-name violation
    expect(innerText).toBe('');   // no text content
  }

  await context.close();
  await browser.close();
});

test('after/ has no violations — informative SVGs labelled, decorative SVGs hidden', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['image-alt', 'button-name'])
    .analyze();

  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});

test('after/ SVG icons use correct strategy: role+label for informative, aria-hidden for decorative', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  // Strategy 1: Informative standalone SVGs have role="img" + aria-label + <title>
  const severityIcons = await page.locator('.severity-icon').all();
  expect(severityIcons.length).toBe(3);

  for (const icon of severityIcons) {
    const role      = await icon.getAttribute('role');
    const ariaLabel = await icon.getAttribute('aria-label');
    const titleEl   = await icon.locator('title').count();
    expect(role).toBe('img');
    expect(ariaLabel).toBeTruthy();       // accessible name present
    expect(ariaLabel.length).toBeGreaterThan(0);
    expect(titleEl).toBe(1);              // <title> belt-and-suspenders
  }

  // Strategy 2: Dismiss buttons labelled on the <button>, SVG is aria-hidden
  const dismissBtns = await page.locator('.btn-dismiss').all();
  expect(dismissBtns.length).toBe(3);

  for (const btn of dismissBtns) {
    const btnLabel = await btn.getAttribute('aria-label');
    expect(btnLabel).toBeTruthy();        // button has accessible name

    const svg = btn.locator('svg');
    const svgHidden    = await svg.getAttribute('aria-hidden');
    const svgFocusable = await svg.getAttribute('focusable');
    expect(svgHidden).toBe('true');       // decorative SVG hidden from AT
    expect(svgFocusable).toBe('false');   // SVG not independently focusable
  }

  // Action button SVGs are aria-hidden (text label carries the accessible name)
  const actionBtns = await page.locator('.btn-action').all();
  for (const btn of actionBtns) {
    const svgHidden = await btn.locator('svg').getAttribute('aria-hidden');
    expect(svgHidden).toBe('true');
  }

  await context.close();
  await browser.close();
});
