---
title: Social Share Buttons — No Accessible Label
category: 04-empty-links-buttons
wcag: "4.1.2 Name, Role, Value"
wcag-shorthand: "4.1.2"
wcag-level: "A"
wcag-criterion: Name, Role, Value
axe-rule: button-name
status: complete
---

# Social Share Buttons — No Accessible Label

## What the problem is

Social share buttons are almost always icon-only. Without an accessible name, every button is announced as "button" with no context. A screen reader user navigating the share bar hears: "button, button, button, button" — four identical, indistinguishable controls.

### Before — broken pattern

```html
<button class="share-btn share-btn--x">
  <svg aria-hidden="true">...</svg>
</button>
```

axe `button-name` violation: button has no discernible text.

## How to fix it

Add `aria-label` to each button naming the action and the platform. The SVGs stay `aria-hidden="true"` — the button's `aria-label` is the sole accessible name source.

### After — fixed pattern

```html
<button class="share-btn share-btn--x" aria-label="Share on X">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

Screen reader announces: **"Share on X, button"**

## Group label for context

Wrap the buttons in a `role="group"` container with `aria-label="Share this article"`. This gives screen reader users an orientation landmark before they encounter the individual buttons.

```html
<div role="group" aria-label="Share this article">
  <button aria-label="Share on X">...</button>
  <button aria-label="Share on Facebook">...</button>
  <button aria-label="Share on LinkedIn">...</button>
  <button aria-label="Copy link">...</button>
</div>
```

The "Share:" visible label should use `aria-hidden="true"` — the group's `aria-label` already provides this context, and without `aria-hidden` the visual label may be read twice.

## Why `focusable="false"` on the SVG

Internet Explorer and older Edge treat inline SVGs as focusable by default. `focusable="false"` prevents the SVG from becoming an independent tab stop inside the button. This is a belt-and-suspenders fix alongside `aria-hidden="true"`.

## Naming conventions

| Button | Label |
|--------|-------|
| X (Twitter) | `Share on X` |
| Facebook | `Share on Facebook` |
| LinkedIn | `Share on LinkedIn` |
| Copy URL | `Copy link` |

Avoid labels like "Twitter" alone — the action (share, copy) is essential context. Avoid "Tweet this" — the platform has been renamed.

## WCAG success criterion

**4.1.2 Name, Role, Value — Level A**: For all user interface components, the name and role can be programmatically determined. Icon-only buttons with no `aria-label` fail the "name" requirement.
