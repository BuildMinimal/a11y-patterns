---
title: Accordion — Keyboard Navigation
category: 06-keyboard-navigation
wcag: "2.1.1 Keyboard"
wcag-shorthand: "2.1.1"
wcag-level: "A"
wcag-criterion: Keyboard
axe-rule: aria-required-attr
status: complete
---

# Accordion — Keyboard Navigation

## What the problem is

An accordion built with `<div>` headers and `onclick` handlers works for mouse users but is completely opaque to keyboard users. `<div>` elements are not natively focusable — `Tab` skips every header. There is also no `aria-expanded`, so screen reader users cannot tell whether a panel is open or closed.

### Before — broken pattern

```html
<!-- BUG: <div> trigger is not keyboard-reachable -->
<div class="accordion-header" onclick="togglePanel(this)">
  <span>What is WCAG and who maintains it?</span>
  <span aria-hidden="true">+</span>
</div>
<div class="accordion-panel">...</div>
```

No `tabindex`, no `role`, no `aria-expanded`, no `aria-controls`. Screen readers announce the header text as plain text, not as an interactive control.

## How to fix it

Replace the `<div>` header with a native `<button>`. Add `aria-expanded` and `aria-controls`. Wrap the button in an `<h2>` for semantic heading structure. Mark the panel with `role="region"` and `aria-labelledby`. Wire Arrow key navigation between headers.

### After — fixed pattern

```html
<h2>
  <button
    id="trigger-1"
    aria-expanded="false"
    aria-controls="panel-1"
  >
    What is WCAG and who maintains it?
    <span aria-hidden="true">+</span>
  </button>
</h2>
<div
  id="panel-1"
  role="region"
  aria-labelledby="trigger-1"
  hidden
>
  <p>WCAG is published by the W3C's WAI...</p>
</div>
```

## The complete keyboard interaction model

| Key | Action |
|-----|--------|
| `Tab` / `Shift+Tab` | Move focus to the next/previous accordion header |
| `Enter` / `Space` | Toggle the focused panel open or closed |
| `Arrow Down` | Move focus to the next header (wraps to first) |
| `Arrow Up` | Move focus to the previous header (wraps to last) |
| `Home` | Move focus to the first header |
| `End` | Move focus to the last header |

`Enter` and `Space` are handled automatically by native `<button>` click behaviour — no extra `keydown` handler needed for those keys.

## ARIA attributes explained

| Attribute | Where | Purpose |
|-----------|-------|---------|
| `aria-expanded="false\|true"` | `<button>` | Communicates open/closed state — screen reader announces "collapsed" or "expanded" |
| `aria-controls="panel-id"` | `<button>` | Programmatic link to the controlled panel |
| `role="region"` | panel `<div>` | Creates a named landmark region for screen readers to jump to |
| `aria-labelledby="trigger-id"` | panel `<div>` | Names the region after its heading button |
| `hidden` | panel `<div>` | Removes panel from both visual rendering AND the accessibility tree when closed |

## Why `hidden` instead of `display: none` via CSS

Both achieve the same visual result, but the HTML `hidden` attribute is the cleanest semantic signal. It tells the browser explicitly that the element is not currently relevant — browsers, AT, and search engines all interpret it consistently. A CSS `display: none` class is equally valid, but requires the CSS rule to be present.

Do not use `visibility: hidden` alone — it hides the element visually but may not remove it from the accessibility tree in all browsers.

## Why wrap the button in `<h2>`

The button is the interactive element; the `<h2>` provides document structure. This lets screen reader users navigate headings to jump between sections, and lets sighted users visually scan the headings hierarchy — without turning the heading itself into a button.

## Why `role="region"` on the panel

`role="region"` is optional for simple accordions, but it creates a named landmark when the panel is open. Screen reader users navigating by landmarks can jump directly to "What is WCAG, region" without tabbing through all headers. Use it when panels contain substantial content.

## WCAG success criterion

**2.1.1 Keyboard — Level A**: All functionality must be operable via keyboard. A `<div onclick>` accordion provides no keyboard mechanism — users cannot reach, open, or close any panel without a mouse.

## Related patterns

- `custom-select-dropdown` — similar `<div>` → `<button>` + ARIA keyboard pattern
- `tab-panel-focus` (Category 05) — Tab panels use `role="tablist"/"tab"/"tabpanel"` instead of `role="region"`, and Arrow keys switch tabs rather than toggle
