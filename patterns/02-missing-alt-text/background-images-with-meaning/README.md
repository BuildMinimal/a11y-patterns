---
title: "Background Images with Meaning — Alt Text"
wcag: "1.1.1 Non-text Content — Level A"
wcag-shorthand: "1.1.1"
wcag-level: "A"
---

# Pattern: Background Images with Meaning — Alt Text

**Category:** Alt Text
**WCAG:** 1.1.1 Non-text Content — Level A

---

## What this pattern demonstrates

How to provide text alternatives for meaningful visual content delivered by CSS `background-image` — which unlike `<img>` has no `alt` attribute mechanism.

---

## Why it matters

CSS background images are invisible to assistive technology by design. This is correct behaviour when the image is decorative — it means you never need `alt=""` in CSS. But developers frequently use CSS background images for meaningful content: toolbar icons, status badges, rating stars, product category illustrations. When those images are the only label for an interactive element, the element becomes completely unlabelled.

The failure mode in this pattern is a toolbar with seven icon-only buttons. Each button's visual label IS the CSS background image. Without `aria-label` or visually-hidden text, a screen reader user hears:

> _"button … button … button … button … button … button … button"_

Seven times, no labels. The user cannot determine what any button does without activating it — and may not be able to find the right button at all using voice control software (Dragon NaturallySpeaking), which relies on visible or accessible labels to target controls.

---

## WCAG Criterion

**1.1.1 Non-text Content — Level A**

> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

A CSS background image is non-text content when it serves as the sole visual label of a control. The text alternative must be provided through HTML, not CSS.

Source: [Understanding Success Criterion 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

## The problem (before)

The `before/` version shows an article editor with a seven-button toolbar. Each button has only a CSS `background-image` icon — no text, no `aria-label`, no visually-hidden span.

**Specific failures in `before/index.html`:**

| Button       | CSS class              | Accessible name | axe violation  |
| ------------ | ---------------------- | --------------- | -------------- |
| Bold         | `.toolbar-btn--bold`   | none            | `button-name`  |
| Italic       | `.toolbar-btn--italic` | none            | `button-name`  |
| Underline    | `.toolbar-btn--underline` | none         | `button-name`  |
| Insert link  | `.toolbar-btn--link`   | none            | `button-name`  |
| Insert image | `.toolbar-btn--image`  | none            | `button-name`  |
| Ordered list | `.toolbar-btn--ol`     | none            | `button-name`  |
| Unordered list | `.toolbar-btn--ul`   | none            | `button-name`  |

axe rule violated: `button-name` — "Ensures buttons have discernible text".

Note: axe cannot detect the background images themselves — it detects the unlabelled button elements. This means CSS background images on non-interactive elements (decorative divs) are not caught by automated testing, even when they convey meaning. Those must be caught in code review and manual testing.

---

## The fix (after)

The `after/` version adds accessible names to all seven buttons. Two techniques are demonstrated side by side:

**Technique A — `aria-label` (formatting group)**

```html
<button type="button" class="toolbar-btn toolbar-btn--bold" aria-label="Bold"></button>
```

`aria-label` is applied directly to the button element. The value becomes the button's accessible name, overriding all other name sources. The background-image remains unchanged.

**Technique B — visually-hidden `<span>` (insert and list groups)**

```html
<button type="button" class="toolbar-btn toolbar-btn--link">
  <span class="sr-only">Insert link</span>
</button>
```

A `<span>` with `.sr-only` (position: absolute; width: 1px; height: 1px; overflow: hidden; clip: ...) is placed inside the button. The span is invisible to sighted users but read by screen readers. The button's accessible name is derived from its text content.

Both techniques produce identical screen reader output: `"Bold, button"`, `"Insert link, button"`.

**When to choose which technique:**

| Scenario                                      | Technique          |
| --------------------------------------------- | ------------------ |
| Simple icon button, full HTML control         | Either works       |
| Component library that prevents `aria-label`  | Technique B        |
| Need label visible on hover (tooltip)         | Combine: `aria-label` + tooltip triggered separately |
| Voice control users (Dragon) need visible label | Add a visible label or use `title` as a fallback |

---

## Key rules

**1. CSS `background-image` has no `alt` attribute — the text alternative must be in HTML.**
`background-image` in CSS is not an HTML attribute. You cannot write `background-image: url(...) alt="..."`. The text alternative must live in the HTML element: as `aria-label`, `aria-labelledby`, or element text content.

**2. An empty button (no text, no `aria-label`) is always a WCAG failure if the background image conveys its purpose.**
axe catches this with `button-name`. Voice control software cannot target the button. Screen readers announce "button" with no label.

**3. Purely decorative background images need no text alternative.**
A CSS `background-image` used for visual texture, pattern, or decoration — one where removing it would lose no information — requires no action. AT ignores it by default. This is the primary advantage of CSS backgrounds over `<img>` for decorative content.

**4. For non-interactive elements with meaningful background images, use `role="img"` + `aria-label`.**
If a `<div>` has a CSS background image that conveys information (e.g., a star rating rendered as background-image stars), add `role="img"` and `aria-label` to include it in the accessibility tree:

```html
<!-- Background-image star rating — made accessible with role="img" -->
<div
  class="star-rating star-rating--4"
  role="img"
  aria-label="4 out of 5 stars"
></div>
```

Without `role="img"`, the div is not in the accessibility tree and axe will not flag it. This is a case that automated tests will not catch — it requires code review discipline.

**5. The `.sr-only` pattern is a CSS class, not a technique unique to this pattern.**
Any element with visually-hidden text can serve as a label: `position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap`. This pattern is widely used across accessibility work and is sometimes named `.sr-only`, `.visually-hidden`, or `.screen-reader-only` depending on the project's conventions.

---

## Design tokens

| Token                      | Value     | Usage                                              |
| -------------------------- | --------- | -------------------------------------------------- |
| `color.text.primary`       | `#1a1a1a` | Page title, toolbar icon strokes and fills         |
| `color.brand.focus`        | `#1d4ed8` | Focus ring on buttons and textarea                 |
| `color.surface.page`       | `#f8fafc` | Page background                                    |
| `color.surface.card`       | `#ffffff` | Editor card background                             |
| `color.surface.card-border`| `#e2e8f0` | Card border, toolbar separator, textarea border    |
| `color.surface.toolbar`    | `#f1f5f9` | Toolbar background                                 |
| `color.surface.btn-hover`  | `#e2e8f0` | Toolbar button hover background                    |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/02-missing-alt-text/background-images-with-meaning

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has button-name violations — CSS background-image icon buttons have no accessible name
✓ after/ has no button-name violations — all icon buttons have accessible names
✓ after/ each toolbar button has a descriptive accessible name via aria-label or sr-only text
```

**Manual screen reader test:**

1. Open `before/index.html` with NVDA or VoiceOver
2. Tab through the toolbar — each button announces only "button" with no label
3. Open `after/index.html` — each button announces its label: "Bold, button", "Insert link, button"

---

## Resources

- [WCAG 1.1.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [W3C WAI — Labelling Controls](https://www.w3.org/WAI/tutorials/forms/labels/) — covers `aria-label` and associated techniques
- [WebAIM: CSS Background Images](https://webaim.org/techniques/css/invisiblecontent/) — covers the `.sr-only` / visually-hidden technique
- [MDN: `aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
