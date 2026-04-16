---
title: "SVG Icons — Alt Text"
wcag: "1.1.1 Non-text Content — Level A"
wcag-shorthand: "1.1.1"
wcag-level: "A"
---

# Pattern: SVG Icons — Alt Text

**Category:** Alt Text
**WCAG:** 1.1.1 Non-text Content — Level A

---

## What this pattern demonstrates

How to handle inline `<svg>` icons correctly — using `role="img"` + `aria-label` for informative standalone SVGs, and `aria-hidden="true"` + `focusable="false"` for decorative SVGs inside labelled elements.

---

## Why it matters

Inline SVG is in the DOM. Unlike `<img>`, it has no built-in semantics that AT understands consistently. Without explicit ARIA, screen readers may:
- Announce the SVG's child nodes one by one ("group … path … circle …")
- Silently skip the SVG entirely
- Announce "image" with no label

Neither is correct. The right behaviour depends on whether the SVG is informative or decorative — and that distinction must be made explicit in HTML.

A system alerts panel with severity icons and dismiss buttons:

**Before (broken):** A screen reader user hears  
> _"image … Critical: Database connection failed … button … image … Warning: Disk usage above 80% … button"_

Every "image" is the severity icon — no severity type is communicated. Every "button" is a dismiss action — no context about what will be dismissed.

**After (fixed):** The same user hears  
> _"Error, image … Critical: Database connection failed … Dismiss critical alert, button … Warning, image … Warning: Disk usage above 80% … Dismiss warning alert, button"_

Severity and action are both clear.

---

## WCAG Criterion

**1.1.1 Non-text Content — Level A**

> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

Source: [Understanding Success Criterion 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

## The problem (before)

The `before/` version has two violations per alert row.

**Specific failures in `before/index.html`:**

| Element                    | Class            | Issue                            | axe violation  |
| -------------------------- | ---------------- | -------------------------------- | -------------- |
| Error severity SVG         | `.severity-icon` | `role="img"` without `aria-label`| `image-alt`    |
| Warning severity SVG       | `.severity-icon` | `role="img"` without `aria-label`| `image-alt`    |
| Info severity SVG          | `.severity-icon` | `role="img"` without `aria-label`| `image-alt`    |
| Dismiss button (error row) | `.btn-dismiss`   | No accessible name               | `button-name`  |
| Dismiss button (warning)   | `.btn-dismiss`   | No accessible name               | `button-name`  |
| Dismiss button (info)      | `.btn-dismiss`   | No accessible name               | `button-name`  |

---

## The fix (after)

Two distinct strategies, applied to the right elements.

### Strategy 1 — Informative standalone SVG

The severity icon IS the content. It conveys the alert type. Apply `role="img"` + `aria-label`:

```html
<!-- BEFORE: role="img" with no name → image-alt violation -->
<svg role="img" class="severity-icon" ...>
  <circle .../>
  <line .../>
</svg>

<!-- AFTER: role="img" + aria-label + <title> (belt-and-suspenders) -->
<svg role="img" aria-label="Error" class="severity-icon" ...>
  <title>Error</title>
  <circle .../>
  <line .../>
</svg>
```

`aria-label` provides the accessible name. `<title>` is belt-and-suspenders: it is the SVG-native accessible name mechanism and improves support in older AT and PDF/SVG viewers that do not honour ARIA.

### Strategy 2 — Decorative SVG inside a labelled control

The dismiss button has an `aria-label`. The SVG icon inside it is decoration — it reinforces the visual but the label on the button provides all the information AT needs. Apply `aria-hidden="true"` + `focusable="false"`:

```html
<!-- BEFORE: icon-only button, SVG has no title → button-name violation -->
<button type="button" class="btn-dismiss">
  <svg ...>
    <line .../>
    <line .../>
  </svg>
</button>

<!-- AFTER: label on button, SVG hidden from AT -->
<button type="button" class="btn-dismiss" aria-label="Dismiss critical alert">
  <svg aria-hidden="true" focusable="false" ...>
    <line .../>
    <line .../>
  </svg>
</button>
```

`aria-hidden="true"` removes the SVG from the accessibility tree.  
`focusable="false"` is the IE/Edge fix: in those browsers, inline SVGs can receive keyboard focus independently, creating ghost tab stops. Modern browsers do not need this but it is harmless and still recommended as defence-in-depth.

### Decorative SVG in a text button

The action buttons ("Download Report", "Share") have visible text labels — the accessible name comes from the text. The SVG icon is decoration. Same treatment:

```html
<button type="button" class="btn-action">
  <svg aria-hidden="true" focusable="false" ...>...</svg>
  Download Report
</button>
<!-- Screen reader: "Download Report, button" — no SVG noise -->
```

---

## Key rules

**1. An inline SVG that conveys information needs `role="img"` and an accessible name.**
Without `role="img"`, AT does not know the SVG is intended as an image. Without an accessible name, even `role="img"` is a violation (`image-alt`). Both are required together.

**2. Accessible name sources for `role="img"` SVG, in priority order:**
1. `aria-labelledby` — references an external element by id
2. `aria-label` — direct string on the SVG element (recommended for simple labels)
3. `<title>` as first child — SVG-native mechanism (use alongside `aria-label` for safety)

**3. Decorative SVGs inside labelled controls must have `aria-hidden="true"`.**
Without it, some AT reads out the SVG's internal children: "image group path line line, Dismiss critical alert, button." The label is still there, but preceded by noise.

**4. Never put `aria-hidden="true"` on an SVG that is the only label for its parent.**
If a button's only content is an SVG with `aria-hidden="true"` — and the button has no `aria-label` — the button has no accessible name. This is worse than the original problem. `aria-hidden` on the SVG only works when the parent element has a label from another source.

**5. `focusable="false"` targets IE/Edge legacy SVG behaviour.**
Modern Chrome, Firefox, and Safari do not make SVGs independently focusable. Keep the attribute — it is a one-time cost with no downside and protects against legacy browser issues.

---

## Design tokens

| Token                       | Value     | Usage                                             |
| --------------------------- | --------- | ------------------------------------------------- |
| `color.severity.error-icon` | `#dc2626` | Error icon stroke, dismiss button                 |
| `color.severity.error-bg`   | `#fee2e2` | Error badge background                            |
| `color.severity.warning-icon`| `#d97706` | Warning icon stroke, dismiss button              |
| `color.severity.warning-bg` | `#fef3c7` | Warning badge background                          |
| `color.severity.info-icon`  | `#2563eb` | Info icon stroke, dismiss button                  |
| `color.severity.info-bg`    | `#dbeafe` | Info badge background                             |
| `color.brand.focus`         | `#1d4ed8` | Focus ring                                        |
| `color.surface.page`        | `#f8fafc` | Page background                                   |
| `color.surface.card`        | `#ffffff` | Alert list background                             |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/02-missing-alt-text/svg-icons

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has image-alt and button-name violations — SVG icons lack accessible names
✓ after/ has no violations — informative SVGs labelled, decorative SVGs hidden
✓ after/ SVG icons use correct strategy: role+label for informative, aria-hidden for decorative
```

**Manual screen reader test:**

1. Open `before/index.html` with NVDA or VoiceOver
2. Navigate by element — severity icons announce as "image" (no severity), dismiss buttons announce as "button" (no action)
3. Open `after/index.html` — severity icons announce as "Error/Warning/Informational, image"; dismiss buttons announce as "Dismiss critical/warning/informational alert, button"

---

## Resources

- [WCAG 1.1.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [W3C WAI — SVG Images](https://www.w3.org/WAI/tutorials/images/complex/) — guidance on complex images including SVG
- [CSS-Tricks: Accessible SVGs](https://css-tricks.com/accessible-svgs/) — comprehensive guide to the role/title/aria-label strategies
- [WebAIM: SVG Accessibility](https://webaim.org/techniques/svg/) — covers focusable, aria-hidden, and role approaches
- [MDN: SVG `<title>` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title)
