# Testing Guide

How to test accessibility patterns in this repo — automated tests, manual browser testing, and screen reader testing.

---

## Automated testing with axe

Every pattern has a `tests/axe.test.js` that uses axe-core via Playwright to run automated accessibility checks. This is not a substitute for manual testing, but it catches most WCAG 1.x and 4.x failures automatically.

### Running tests

```bash
# Run all axe tests
npm test

# Run tests for a specific pattern
npm test -- patterns/01-color-contrast/text-on-solid-bg

# Run in watch mode (reruns on file changes)
npm run test:watch
```

### Test structure

Every pattern test enforces two invariants:

```javascript
// 1. The broken before/ version MUST fail axe
test('before/ has violations', async () => {
  // ...
  expect(results.violations.length).toBeGreaterThan(0);
});

// 2. The fixed after/ version MUST pass axe
test('after/ has no violations', async () => {
  // ...
  expect(results.violations.length).toBe(0);
});
```

Tests use `.withRules(['rule-id'])` to target only the rules relevant to the pattern, not a full axe audit. This is intentional — a full audit of `before/` would catch unrelated violations and make it impossible to isolate what the pattern is demonstrating.

### Common axe rule IDs

| WCAG Criterion | axe Rule ID |
|----------------|-------------|
| 1.1.1 Alt text | `image-alt`, `input-image-alt` |
| 1.3.1 Form labels | `label`, `aria-required-children` |
| 1.4.3 Contrast | `color-contrast` |
| 1.4.11 Non-text contrast | `color-contrast-enhanced` |
| 2.4.4 Link purpose | `link-name` |
| 4.1.2 Name, role, value | `button-name`, `link-name` |

Full list: [axe-core rule descriptions](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

---

## Writing a test for a new pattern

Use this template for `tests/axe.test.js`:

```javascript
import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/CATEGORY/SLUG');

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has violations for [what this pattern demonstrates]', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['RULE-ID'])  // Target only the rule this pattern covers
    .analyze();

  expect(results.violations.length).toBeGreaterThan(0);

  await browser.close();
});

test('after/ has no violations for [what this pattern demonstrates]', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(['RULE-ID'])
    .analyze();

  expect(results.violations.length).toBe(0);

  await browser.close();
});
```

### Notes on file:// URLs and Windows

The test uses `pathToFileURL` from Node's `url` module to construct a `file://` URL. This handles Windows paths correctly (produces `file:///D:/coding/...` instead of `file://D:\coding\...`). Always use `pathToFileURL` — don't manually construct `file://` strings.

---

## Manual browser testing

Automated axe catches approximately 30–40% of WCAG issues. The rest require manual testing.

### Keyboard navigation

1. Open the `after/index.html` in a browser
2. Close your mouse
3. Use `Tab` to move through interactive elements — every interactive element must be reachable
4. Use `Shift+Tab` to move backwards
5. Use `Enter`/`Space` to activate buttons
6. Use `Arrow` keys for widget navigation (tabs, accordions, menus)
7. Use `Escape` to dismiss modals, dropdowns, tooltips
8. Verify focus is always visible — never hidden or clipped

### Zoom testing

1. Zoom the browser to 200% (`Ctrl+` or `Cmd+`)
2. Verify text reflows — no horizontal scrolling for single-column content
3. Verify no content is hidden or overlapping at 200%
4. Test at 400% too (WCAG 1.4.10 Reflow, AA)

### Color-only information

Manually verify that no information is conveyed by color alone:
- Error states: is there a text message in addition to red color?
- Required fields: is there a text indicator beyond color?
- Charts: do data series have distinct patterns or labels?

---

## Screen reader testing

### Recommended combinations

| Platform | Screen Reader | Browser | Why |
|----------|--------------|---------|-----|
| Windows | NVDA (free) | Firefox | Most common combination for desktop Windows users |
| Windows | JAWS | Chrome/Edge | Enterprise standard — requires license |
| macOS/iOS | VoiceOver (built-in) | Safari | Default for Apple devices — no install needed |
| Android | TalkBack (built-in) | Chrome | Default for Android devices |

**Start with NVDA + Firefox.** It's free, widely used, and closest to the average screen reader user's setup per WebAIM surveys.

### Getting NVDA

Download from [nvaccess.org](https://www.nvaccess.org/download/) — free, open source.

### Basic NVDA commands

| Action | Command |
|--------|---------|
| Start reading | `NVDA+Down` (Insert+Down) |
| Stop reading | `Control` |
| Move to next element | `Tab` |
| Read current line | `NVDA+Up` |
| List headings | `NVDA+F7`, select Headings |
| List links | `NVDA+F7`, select Links |
| Forms mode (type in inputs) | `Enter` when focused on a form element |

### What to test with a screen reader

1. **Open `after/index.html`** — never test the broken `before/` with a screen reader unless you're confirming a failure
2. **Tab through all interactive elements** — does every button and link have a meaningful name?
3. **Read the page from top to bottom** — does the reading order match the visual order?
4. **Fill out any forms** — is every input labeled? Are error messages announced?
5. **Trigger state changes** — does the screen reader announce expanded/collapsed, selected/unselected?

### What good screen reader output sounds like

For a button: _"Submit form, button"_
For a labeled input: _"Email address, edit"_
For an icon button with aria-label: _"Close dialog, button"_
For a navigation link: _"Home, link"_

What bad screen reader output sounds like:
- _"Button"_ (no name)
- _"Graphic"_ (image with no alt)
- _"Edit"_ (input with no label)
- _"Link"_ (link with no text)

---

## Token contrast validation

```bash
npm run validate-tokens
```

This reads every `tokens.json` in the repo, recalculates contrast ratios using the WCAG luminance formula, and fails if any token documented as `"wcag": "AA"` or `"wcag": "AAA"` doesn't meet its claimed threshold.

Run this before every PR. CI runs it automatically.
