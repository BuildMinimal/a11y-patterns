# Pattern: Disabled State Contrast — Color Contrast

**Category:** Color Contrast
**WCAG:** 1.4.3 Contrast Minimum — Level AA

---

## What this pattern demonstrates

The difference between CSS-only "disabled" states (which axe checks for contrast failures) and natively disabled controls using the HTML `disabled` attribute (which WCAG explicitly exempts from contrast requirements) — plus why you should still use readable colors either way.

---

## Why it matters

There are two distinct failure modes here, and most developers encounter one or the other:

**Failure 1: CSS-only disabled states.** Some developers apply a `.btn--disabled` or `.input--disabled` class without the HTML `disabled` attribute, either because they want to prevent submission in JavaScript or because they're building a custom widget. Without the `disabled` attribute, WCAG's exemption doesn't apply — axe checks these elements for contrast, and they fail.

**Failure 2: Native disabled with invisible styling.** Even when the `disabled` attribute is present (making the element WCAG-exempt), many implementations use colors so light (`#c0c0c0` on `#f3f4f6` = 1.66:1) that low-vision users can't read the field's current value. The spec exempts it, but the user can't understand the form.

Both failure modes can exist simultaneously. The `before/` in this pattern focuses on Failure 1 because it produces a measurable test. The `after/` shows both: correct native disabled attribute usage, and readable visual styling even when the spec doesn't require it.

---

## WCAG Criterion

**1.4.3 Contrast (Minimum) — Level AA**

> Text or images of text that are part of an **inactive user interface component** … have no contrast requirement.

An "inactive user interface component" is one that has the HTML `disabled` attribute (or equivalent native mechanism). `aria-disabled="true"` alone does NOT satisfy this — the WCAG exemption applies to native disabled state, not ARIA-described disabled state.

Source: [Understanding Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## The problem (before)

The `before/` version applies a `.field__input--disabled` and `.btn--disabled` CSS class to create a visually "disabled" appearance, but does NOT include the HTML `disabled` attribute. Because the elements are still active in the accessibility tree, WCAG's exemption does not apply.

**Specific failures in `before/styles.css`:**

| Element | Color | Background | Contrast | Result |
|---------|-------|------------|----------|--------|
| `.field__input--disabled` text | `#c0c0c0` | `#f3f4f6` | 1.66:1 | FAIL — needs 4.5:1 |
| `.btn--disabled` text | `#c0c0c0` | `#f3f4f6` | 1.66:1 | FAIL |

---

## The fix (after)

The `after/` version adds the HTML `disabled` attribute to all disabled elements, making WCAG's exemption apply. axe skips contrast checks for natively disabled controls.

The visual styling is also improved: `#6b7280` on `#f3f4f6` = 3.39:1, which is below the 4.5:1 AA threshold but visible enough for users to read the field's value (understanding the form state).

**What changes in `after/`:**

| Change | Why |
|--------|-----|
| Added `disabled` attribute to inputs | Triggers WCAG's inactive-UI exemption |
| Added `disabled` attribute to button | Same |
| Removed `.field__input--disabled` class | No longer needed — `:disabled` CSS pseudo-class handles styling |
| Text color: `#c0c0c0` → `#6b7280` | More readable, even though spec-exempt |

---

## The `aria-disabled` case

If you are building a custom widget where the native `disabled` attribute isn't appropriate (e.g., a custom button that needs to remain focusable), use `aria-disabled="true"`. **However, this does NOT trigger WCAG's contrast exemption.** You must ensure the element's colors meet 4.5:1.

For a visually "muted but passing" look with `aria-disabled`:

```css
[aria-disabled="true"] {
  color: #767676; /* 4.54:1 on white — just meets AA */
  background-color: #f9fafb;
  cursor: not-allowed;
}
```

---

## Key rules

**1. The WCAG contrast exemption requires the native `disabled` attribute.**
`aria-disabled`, `.disabled` CSS class, `pointer-events: none`, and `readonly` do not qualify. Only the HTML `disabled` attribute (or equivalent native disabled mechanism for non-HTML technologies) triggers the exemption.

**2. Exempt ≠ invisible.**
Even if you're technically exempt, disabled fields that show user data should be readable. A user might need to see their locked username or their current plan to understand what they're filling out. `#6b7280` on `#f3f4f6` (3.39:1) is a workable minimum.

**3. Use `:disabled` pseudo-class, not utility classes.**
Targeting `input:disabled` and `button:disabled` in CSS means the visual styling automatically tracks the HTML attribute, eliminating the class-vs-attribute sync bug.

---

## Design tokens

| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `color.disabled.text` | `#6b7280` | Disabled field text, disabled button text | 3.39:1 on `#f3f4f6` (WCAG-exempt) |
| `color.disabled.background` | `#f3f4f6` | Disabled field/button background | — |
| `color.text.primary` | `#1a1a1a` | Active input text | 18.1:1 on white (AAA) |
| `color.interactive.primary-background` | `#1d4ed8` | Active primary button | — |

---

## Testing

```bash
npm test -- patterns/01-color-contrast/disabled-state-contrast
```

Expected test output:
```
✓ before/ has color-contrast violations
✓ after/ has no color-contrast violations
```

---

## Resources

- [WCAG 1.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [HTML spec: disabled attribute](https://html.spec.whatwg.org/multipage/form-elements.html#enabling-and-disabling-form-controls:-the-disabled-attribute)
- [Deque: Disabled and ARIA-disabled](https://www.deque.com/blog/aria-in-html/) — explains the ARIA vs native disabled distinction
