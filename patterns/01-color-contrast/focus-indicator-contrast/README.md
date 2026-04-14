# Pattern: Focus Indicator Contrast — Color Contrast

**Category:** Color Contrast
**WCAG:** 2.4.11 Focus Appearance — Level AA

---

## What this pattern demonstrates

How to create focus indicators (focus rings, outlines, borders) that meet WCAG contrast requirements — ensuring keyboard users can always see which element has focus.

---

## Why it matters

Focus indicators are the only way keyboard users know where they are on the page. When you navigate with Tab, Shift+Tab, Arrow keys, or other keyboard commands, you rely on seeing which element is currently focused.

The failure mode is concrete: a keyboard user tabs through a page and has no visual indication of where they are. They press Enter or Space to activate something, but they don't know what they're activating. This is not just frustrating — it makes the interface completely unusable.

Focus indicators are also essential for screen reader users who also use a keyboard, and for users who use voice control, switch devices, or any alternative input method.

---

## WCAG Criterion

**2.4.11 Focus Appearance — Level AA**

> The focus indicator of all interactive components is visible and operation is clearly discernible.

The focus indicator must have at least a 3:1 contrast ratio against the surrounding background. This applies to the indicator itself (the ring, outline, or border), not the focused element's content.

Source: [Understanding Success Criterion 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

---

## The problem (before)

The `before/` version shows a form with focus indicators that are too subtle to meet the 3:1 contrast requirement.

**Specific failures in `before/styles.css`:**

| Element      | Focus Indicator     | Background | Contrast | Result           |
| ------------ | ------------------- | ---------- | -------- | ---------------- |
| Input fields | `#d1d5db` outline   | `#ffffff`  | 1.51:1   | FAIL — needs 3:1 |
| Buttons      | `#d1d5db` outline   | `#ffffff`  | 1.51:1   | FAIL             |
| Links        | `#d1d5db` underline | `#ffffff`  | 1.51:1   | FAIL             |
| Checkboxes   | `#d1d5db` border    | `#ffffff`  | 1.51:1   | FAIL             |

The focus indicators use a light blue-gray that's barely visible on white, especially for users with low vision or in bright lighting conditions.

---

## The fix (after)

The `after/` version uses focus indicators with proper contrast ratios.

**Corrected values in `after/styles.css`:**

| Element      | Was                    | Now                    | Contrast | Result |
| ------------ | ---------------------- | ---------------------- | -------- | ------ |
| Input fields | `#d1d5db` on `#ffffff` | `#1d4ed8` on `#ffffff` | 6.70:1   | AA     |
| Buttons      | `#d1d5db` on `#ffffff` | `#1d4ed8` on `#ffffff` | 6.70:1   | AA     |
| Links        | `#d1d5db` on `#ffffff` | `#1d4ed8` on `#ffffff` | 6.70:1   | AA     |
| Checkboxes   | `#d1d5db` on `#ffffff` | `#1d4ed8` on `#ffffff` | 6.70:1   | AA     |

---

## Key rules

**1. Focus indicators must have 3:1 contrast against the background.**
This is a lower threshold than text (4.5:1) because focus indicators are simpler shapes, but many designs still fail it. Test your focus colors with a contrast checker.

**2. Use `:focus-visible` instead of `:focus`.**
The `:focus-visible` pseudo-class only applies when the user is navigating with keyboard or other non-pointer device. This prevents focus indicators from appearing for mouse users who don't need them, reducing visual noise while preserving accessibility.

**3. Focus indicators must be clearly visible, not just "subtle".**
A focus indicator that's barely visible is worse than none — it creates the illusion of accessibility without providing actual benefit. Make focus indicators bold and obvious.

**4. Test focus indicators on all interactive elements.**
Don't forget links, checkboxes, radio buttons, dropdowns, and any custom components. Every keyboard-navigable element needs a visible focus state.

---

## Design tokens

| Token                     | Value     | Usage                    | Contrast             |
| ------------------------- | --------- | ------------------------ | -------------------- |
| `color.focus.ring`        | `#1d4ed8` | Focus ring/outline color | 6.70:1 on white (AA) |
| `color.focus.ring-offset` | `2px`     | Offset from element      | —                    |
| `color.focus.ring-width`  | `2px`     | Width of focus ring      | —                    |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/01-color-contrast/focus-indicator-contrast

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has color-contrast violations
✓ after/ has no color-contrast violations
```

**Manual keyboard testing:**

1. Open `after/index.html` in a browser
2. Use Tab to navigate through all interactive elements
3. Verify each element has a clearly visible focus indicator
4. Check focus indicators on inputs, buttons, links, and checkboxes
5. Test in both bright and dim lighting conditions

**Note:** axe-core doesn't have a specific rule for focus indicator contrast. This pattern's test checks for general color-contrast violations that would include focus indicators.

---

## Resources

- [WCAG 2.4.11 Understanding document](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [CSS `:focus-visible` pseudo-class — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
- [Focus Styles Are Not Optional — A11y Project](https://www.a11yproject.com/posts/focus-styles-are-not-optional/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
