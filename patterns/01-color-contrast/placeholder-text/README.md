# Pattern: Placeholder Text — Color Contrast

**Category:** Color Contrast
**WCAG:** 1.4.3 Contrast Minimum — Level AA

---

## What this pattern demonstrates

How placeholder text fails WCAG contrast requirements — and why the correct fix is a visible `<label>` element, not just a darker placeholder color.

---

## Why it matters

Placeholder text is everywhere. It's also almost universally wrong. There are two separate problems:

**Problem 1: No label, just placeholder.** When placeholder text is the only label, it disappears the moment the user starts typing. On a long form, a user who tabbed past several fields may not remember what they were filling in. Screen readers may announce the placeholder as the accessible name — but once the field has a value, that name is gone. This is a labeling failure (WCAG 1.3.1 / 3.3.2), not just a contrast issue.

**Problem 2: Placeholder color fails contrast.** WCAG 1.4.3 does not exempt placeholder text. Placeholder is rendered text that conveys information — it must meet 4.5:1 on its background. Most design systems use a gray in the `#999`–`#bbb` range for placeholder, all of which fail.

The fix addresses both: add a visible `<label>`, and set `::placeholder { color: #767676 }` — the exact AA minimum on white backgrounds.

---

## WCAG Criterion

**1.4.3 Contrast (Minimum) — Level AA**

> The visual presentation of text and images of text has a contrast ratio of at least 4.5:1.

Placeholder text is "visual presentation of text" — it is not incidental, not decorative, not part of an inactive UI component. It carries information about what to enter. It must meet 4.5:1.

Additionally, inputs that rely solely on placeholder for labeling fail:

**1.3.1 Info and Relationships** — form controls must have a programmatic label.
**3.3.2 Labels or Instructions** — users must be able to understand what a field requires.

Source: [Understanding Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## The problem (before)

The `before/` version shows a contact form with placeholder-only labeling and a failing placeholder color.

**Specific failures in `before/styles.css`:**

| Element | Color | Contrast on White | Result |
|---------|-------|-------------------|--------|
| `::placeholder` | `#aaaaaa` | 2.32:1 | FAIL — needs 4.5:1 |
| `.form__helper` text | `#aaaaaa` | 2.32:1 | FAIL |
| All inputs | (no `<label>`) | — | FAIL — 1.3.1 / 3.3.2 |

---

## The fix (after)

**Two changes required:**

1. **Add a `<label>` element** to every field, associated via `for`/`id`. The label is persistent and always visible. The placeholder becomes a supplementary example, not the primary label.

2. **Change `::placeholder` color** to `#767676` (4.54:1 on white). This is the exact minimum for AA compliance — any lighter and it fails.

**Result in `after/`:**

| Element | Was | Now | Contrast | Result |
|---------|-----|-----|----------|--------|
| `::placeholder` | `#aaaaaa` | `#767676` | 4.54:1 | AA |
| `.form__helper` | `#aaaaaa` | `#4a5568` | 5.74:1 | AA |
| Field labels | (none) | `#374151` | 8.59:1 | AAA |

---

## Key rules

**1. Placeholders are not labels.**
A `<label>` and a placeholder serve different purposes. Labels are permanent identifiers for form controls. Placeholders are ephemeral hints about format or expected input. Use both — but always have the label.

**2. `#767676` is the minimum for placeholder text on white.**
This specific value (4.54:1) sits exactly at the AA threshold. Use it as-is, or darken it. Never go lighter.

**3. Helper text has the same requirements.**
"Terms and conditions" text, "optional field" markers, hint text — all of it must meet 4.5:1. Being smaller or less prominent doesn't grant an exemption.

**4. The input's typed text should be clearly darker than the placeholder.**
If your placeholder is `#767676` (4.54:1), use at least `#374151` for typed values to maintain a visible distinction. Using `#1a1a1a` (18.1:1) as typed text is even better.

---

## Design tokens

| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `color.placeholder` | `#767676` | `::placeholder` color | 4.54:1 on white (AA) |
| `color.text.primary` | `#1a1a1a` | Typed text in inputs | 18.1:1 on white (AAA) |
| `color.text.label` | `#374151` | Field labels | 8.59:1 on white (AAA) |
| `color.text.secondary` | `#4a5568` | Helper text | 5.74:1 on white (AA) |

---

## Testing

```bash
npm test -- patterns/01-color-contrast/placeholder-text
```

Expected test output:
```
✓ before/ has color-contrast violations
✓ after/ has no color-contrast violations
```

---

## Resources

- [WCAG 1.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [WebAIM: Placeholder Text](https://webaim.org/articles/contrast/#placeholder)
- [HTML spec: placeholder attribute](https://html.spec.whatwg.org/multipage/form-elements.html#the-placeholder-attribute)
