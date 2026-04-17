---
title: Icon Button — No Accessible Label
category: 04-empty-links-buttons
wcag: "4.1.2 Name, Role, Value"
wcag-shorthand: "4.1.2"
wcag-level: "A"
wcag-criterion: Name, Role, Value
axe-rule: button-name
status: complete
---

# Icon Button — No Accessible Label

## What the problem is

A button that contains only an icon image and no visible text gives screen reader users no indication of what the button does. When the image uses `alt=""` (marking it as decorative), the button is left with **no accessible name at all**, causing axe to flag a `button-name` violation.

This is one of the most common accessibility mistakes with icon buttons: the developer knows the image is decorative *in isolation*, but forgets that when the image is the button's only content, removing its text alternative also removes the button's only accessible name.

### Before — broken pattern

```html
<!-- 9 violations: button-name -->
<button>
  <img src="delete-icon.svg" alt="">
</button>
```

`alt=""` is correct HTML for a decorative image, but here it silently removes the button's accessible name. A screen reader announces this as "button" with no further context. With multiple identical unlabelled buttons on the page, keyboard and AT users cannot distinguish between them.

## How to fix it

Add `aria-label` to each `<button>` describing the action **and** its target. Keep `alt=""` on the image — once the button has its own accessible name, the image truly is decorative.

### After — fixed pattern

```html
<!-- No violations -->
<button aria-label="Delete: Write keyboard navigation tests">
  <img src="delete-icon.svg" alt="">
</button>
```

### Why keep alt="" on the image?

The image is decorative *in the context of the button*. The button's `aria-label` already communicates everything the AT user needs. If the image also had a non-empty `alt`, the name would be announced twice or concatenated in confusing ways. `alt=""` + `aria-label` on the button is the correct, clean combination.

## The two-part accessible name rule for icon buttons

| Element          | Has accessible name? | Why                          |
|------------------|----------------------|------------------------------|
| `<img alt="">`   | No (intentional)     | Marked decorative             |
| `<button>` only  | **No (violation)**   | No other name source          |
| `<button aria-label="...">` | **Yes** | `aria-label` provides name   |

## Context-specific labels matter

Avoid generic labels like `aria-label="Delete"`. When a page has multiple rows of icon buttons, screen reader users navigating by element type will encounter a list of identically-named "Delete" buttons with no way to tell which row they act on.

Prefer: `aria-label="Delete: Update colour contrast tokens"` — action plus target.

## Alternative technique: visually hidden text

If you need the label to be part of the DOM (e.g., for translation or testing), use a `.sr-only` span instead of `aria-label`:

```html
<button>
  <img src="delete-icon.svg" alt="">
  <span class="sr-only">Delete: Update colour contrast tokens</span>
</button>
```

The `.sr-only` class hides the text visually while keeping it available to assistive technology. Either approach satisfies WCAG 4.1.2.

## WCAG success criterion

**4.1.2 Name, Role, Value (Level A)** — For all user interface components, the name and role can be programmatically determined. A `<button>` with no accessible name fails this criterion.

## Related patterns

- `background-images-with-meaning` — same `button-name` violation but caused by CSS background-image rather than `<img alt="">`
- `social-share-buttons` — icon buttons in a social sharing context
