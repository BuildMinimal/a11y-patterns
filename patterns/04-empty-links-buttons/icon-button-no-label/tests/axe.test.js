import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/04-links-and-buttons/icon-button-no-label');
function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has button-name violations for all 9 icon buttons', async () => {
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
  // 3 tasks × 3 buttons each = 9 violations
  expect(violation.nodes.length).toBe(9);

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

test('after/ buttons have aria-label that includes action and task name', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(fileUrl('after/index.html'));

  const buttons = page.locator('.task-actions button');
  const count = await buttons.count();
  expect(count).toBe(9);

  // Every button must have a non-empty aria-label
  for (let i = 0; i < count; i++) {
    const label = await buttons.nth(i).getAttribute('aria-label');
    expect(label).toBeTruthy();
    expect(label.length).toBeGreaterThan(0);
  }

  // Each task row must have Complete, Edit, and Delete labelled buttons
  const actions = ['Complete', 'Edit', 'Delete'];
  const tasks = [
    'Review accessibility audit report',
    'Update colour contrast tokens',
    'Write keyboard navigation tests',
  ];

  for (const task of tasks) {
    for (const action of actions) {
      const expectedLabel = `${action}: ${task}`;
      const btn = page.locator(`button[aria-label="${expectedLabel}"]`);
      const btnCount = await btn.count();
      expect(btnCount).toBe(1);
    }
  }

  // Images inside buttons must keep alt="" (decorative — button already labelled)
  const images = page.locator('.task-actions button img');
  const imgCount = await images.count();
  expect(imgCount).toBe(9);
  for (let i = 0; i < imgCount; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    expect(alt).toBe('');
  }

  await context.close();
  await browser.close();
});
