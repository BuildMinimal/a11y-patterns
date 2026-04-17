---
title: Card Clickable Area — div onclick Anti-Pattern
category: 04-empty-links-buttons
wcag: "4.1.2 Name, Role, Value, Keyboard"
wcag-shorthand: "4.1.2"
wcag-level: "A"
wcag-criterion: Name, Role, Value
wcag-also: "2.1.1"
wcag-also-level: "A"
wcag-also-criterion: Keyboard
axe-rule: link-name
status: complete
---

# Card Clickable Area — div onclick Anti-Pattern

## What the problem is

Making an entire card clickable by attaching `onclick` to a `<div>` is one of the most common interactive element anti-patterns. The card looks clickable to mouse users via `cursor: pointer`, but:

- **Keyboard users** — `Tab` skips it entirely; there is no native focus or activation mechanism.
- **Screen reader users** — the div is not announced as a link or button; its purpose is invisible.
- **WCAG 4.1.2** — name, role, and value cannot be programmatically determined for a plain div.
- **WCAG 2.1.1** — `onclick` without a keyboard equivalent (`onkeydown`/`onkeypress`) fails the keyboard criterion.

### Before — broken pattern

```html
<div class="card" onclick="window.location='#article-1'" role="none">
  <img ... />
  <h2>CSS Grid: Building Complex Layouts</h2>
  <p>Stop fighting with float hacks...</p>
</div>
```

Even adding `tabindex="0"` and `role="link"` to the div is a workaround — native elements are always preferred.

## How to fix it: the stretched-link technique

Place a real `<a>` element on the card title. Use a CSS `::after` pseudo-element (`position: absolute; inset: 0`) to extend the link's hit area over the entire card. The card container needs `position: relative` to establish the stacking context.

### After — fixed pattern

```html
<article class="card">
  <!-- position: relative -->
  <img ... />
  <h2>
    <a href="#article-1" class="card-link">
      CSS Grid: Building Complex Layouts
    </a>
    <!-- ::after covers the card -->
  </h2>
  <p>Stop fighting with float hacks...</p>
</article>
```

```css
.card {
  position: relative;
}
.card-link::after {
  content: "";
  position: absolute;
  inset: 0; /* shorthand for top/right/bottom/left: 0 */
}
```

## Why this technique works

| Concern         | Result                                                  |
| --------------- | ------------------------------------------------------- |
| Keyboard access | `Tab` reaches the `<a>`; `Enter` activates it           |
| Screen reader   | Announced as "CSS Grid: Building Complex Layouts, link" |
| Right-click     | "Open in new tab", "Copy link" work as expected         |
| Accessible name | Derived from the visible title text                     |
| Role            | Native `link` — no ARIA needed                          |
| WCAG 4.1.2      | Name ✓, Role ✓, Value (href) ✓                          |

## Focus ring on the card

Because the `::after` overlay sits above the card's padding/border area, the default focus outline on the `<a>` may be clipped. Move the focus indicator to the card container using `:has()`:

```css
.card-link:focus-visible {
  outline: none;
}
.card:has(.card-link:focus-visible) {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

This requires `:has()` support (all modern browsers since 2023). For older browser support, use a JavaScript focus class instead.

## What about wrapping the whole card in `<a>`?

```html
<!-- Avoid this -->
<a href="#article-1">
  <article>
    <img alt="..." />
    <h2>CSS Grid...</h2>
    <p>Stop fighting...</p>
  </article>
</a>
```

This works but creates a very long accessible name (the entire card text concatenated) and prevents adding any other interactive elements (buttons, secondary links) inside the card later. The stretched-link technique keeps the accessible name concise and the structure flexible.

## WCAG success criteria

- **4.1.2 Name, Role, Value — Level A**: All interactive components must expose a programmatically determinable name and role. A plain `<div onclick>` fails both.
- **2.1.1 Keyboard — Level A**: All functionality must be operable via keyboard. `onclick` on a non-focusable element has no keyboard equivalent.
