---
title: "Text on Gradient — Color Contrast"
wcag: "1.4.3 Contrast Minimum — Level AA"
wcag-shorthand: "1.4.3"
wcag-level: "AA"
---

# Pattern: Text on Gradient — Color Contrast

**Category:** Color Contrast
**WCAG:** 1.4.3 Contrast Minimum — Level AA

---

## What this pattern demonstrates

How gradient backgrounds create hidden contrast failures — and two strategies to fix them: keeping gradients entirely within the dark half of a hue family, and using an overlay technique.

---

## Why it matters

Gradient hero banners are everywhere. The typical failure: a designer creates a gradient from a dark brand blue to a lighter sky blue, places white text on it, checks contrast at the center, and ships it. The center might pass. The light end doesn't.

Because gradients vary continuously, there's no single background color to check. The rule is: **test white text against the lightest point of the gradient**. If it fails there, it fails — regardless of how well it passes at the dark end.

This is one of the few contrast failures that's genuinely difficult to spot with the naked eye. The dark end looks fine. The contrast degrades gradually. It takes a tool or deliberate spot-checking to catch.

---

## WCAG Criterion

**1.4.3 Contrast (Minimum) — Level AA**

> The visual presentation of text and images of text has a contrast ratio of at least 4.5:1.

There is no special gradient exception in WCAG. Text on a gradient must meet contrast at every point where text actually appears.

Source: [Understanding Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## The problem (before)

The `before/` version shows a hero banner with a gradient from `#1e3a8a` (deep blue) to `#7dd3fc` (sky blue). White text is used throughout — it passes at the dark end but fails completely at the light end.

The CTA buttons use the light gradient colors as solid backgrounds with white text, making the failures reliably detectable by axe.

**Specific failures in `before/styles.css`:**

| Element                                 | Color                 | Contrast | Result             |
| --------------------------------------- | --------------------- | -------- | ------------------ |
| `.btn--primary` white text on `#7dd3fc` | `#ffffff` / `#7dd3fc` | 1.75:1   | FAIL — needs 4.5:1 |
| `.btn--ghost` white text on `#93c5fd`   | `#ffffff` / `#93c5fd` | 1.80:1   | FAIL               |
| All text on light gradient end          | `#ffffff` / `#7dd3fc` | 1.75:1   | FAIL               |

---

## The fix (after)

**Strategy: Constrain the gradient to the dark half of the hue.**

The `after/` version changes the gradient from `#0f172a → #1e3a8a`. Every point along this gradient is dark enough for white text:

| Gradient point                  | White text contrast | Result |
| ------------------------------- | ------------------- | ------ |
| `#0f172a` (start)               | 19.5:1              | AAA    |
| `#1e3a8a` (end, lightest point) | 10.4:1              | AAA    |

The primary CTA button is flipped: white background with dark navy text (`#0f172a`), creating strong contrast against the dark hero while also passing internal text contrast at 19.5:1.

**Alternative strategy (not shown in code but worth knowing):**

A semi-transparent dark overlay (`background: rgba(0,0,0,0.5)` on a `::before` pseudo-element) can also make light gradients safe for white text. This works when you need to preserve the original gradient colors. The overlay must be dark enough to bring the effective combined background below the failing threshold — and you should verify the result in a contrast tool, not just estimate.

---

## Key rules

**1. Test contrast at the lightest gradient endpoint, not the average.**
If white text fails at any point the user can read it, it fails. Pick the lightest color stop and check white text against it. If it fails there, either darken the gradient or use dark text on the light end.

**2. Gradient color stops are not safe text colors.**
The fact that `#7dd3fc` is "part of your brand gradient" does not make it a safe background for white text. Most light-to-mid palette blues fail white text contrast.

**3. Opacity compounds gradient failures.**
Applying `opacity` to text on a gradient reduces effective contrast further. An element with 50% opacity on a gradient that just barely passes can fail after the opacity is applied.

**4. axe cannot fully audit gradient contrast automatically.**
axe's color-contrast rule uses an approximation for gradient backgrounds. It catches solid background-color values reliably. Always verify gradient contrast manually at the endpoints using a tool like the WebAIM Contrast Checker or Colour Contrast Analyser.

---

## Design tokens

| Token                             | Value     | Usage                       | Contrast                |
| --------------------------------- | --------- | --------------------------- | ----------------------- |
| `color.gradient.start`            | `#0f172a` | Gradient dark end           | White text 19.5:1 (AAA) |
| `color.gradient.end`              | `#1e3a8a` | Gradient light end          | White text 10.4:1 (AAA) |
| `color.button.primary-background` | `#ffffff` | Primary button on dark hero | —                       |
| `color.button.primary-text`       | `#0f172a` | Dark text on white button   | 19.5:1 (AAA)            |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/01-color-contrast/text-on-gradient

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has color-contrast violations
✓ after/ has no color-contrast violations
```

---

## Resources

- [WCAG 1.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) — desktop app, use the eyedropper on your actual rendered gradient
- [Who Can Use](https://www.whocanuse.com/) — shows how different vision types experience your color combinations
