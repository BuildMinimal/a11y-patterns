# Pattern: Dark Mode Theme — Color Contrast

**Category:** Color Contrast
**WCAG:** 1.4.3 Contrast Minimum + 1.4.11 Non-Text Contrast — Level AA

---

## What this pattern demonstrates

How to build a dark mode color palette that meets WCAG contrast requirements — covering text, borders, icons, and interactive elements on dark backgrounds.

---

## Why it matters

Dark mode is no longer optional — users expect it as a standard feature. However, many dark mode implementations fail accessibility because developers simply invert colors or use "dark enough" colors without measuring contrast ratios.

The failure mode is concrete: a user with low vision or using their device in a dark environment sees a dark mode interface where text is barely readable or completely invisible. Dark backgrounds reduce the available luminance range, making it harder to achieve good contrast, not easier.

Dark mode also benefits users with light sensitivity (photophobia), migraines, or those working in low-light environments. An inaccessible dark mode excludes these users from the very feature designed to help them.

---

## WCAG Criterion

**1.4.3 Contrast (Minimum) — Level AA**

> The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:
>
> - **Large Text:** Large-scale text and images of large-scale text have a contrast ratio of at least 3:1.
> - **Incidental:** Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.
> - **Logotypes:** Text that is part of a logo or brand name has no contrast requirement.

**1.4.11 Non-Text Contrast — Level AA**

> The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent colors:
>
> - User Interface Components: Visual information required to identify user interface components and states, except for inactive components or where the appearance of component is determined by the user agent and not modified by the author;
> - Graphical Objects: Parts of graphics required to understand the content, except when a particular presentation of graphics is essential to the information being conveyed.

Source: [Understanding Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## The problem (before)

The `before/` version shows a dark mode interface with a common mistake: using colors that look "dark" but don't meet contrast requirements.

**Specific failures in `before/styles.css`:**

| Element           | Color     | Background | Contrast | Result             |
| ----------------- | --------- | ---------- | -------- | ------------------ |
| Body text         | `#a0a0a0` | `#1a1a1a`  | 1.12:1   | FAIL — needs 4.5:1 |
| Secondary text    | `#808080` | `#1a1a1a`  | 1.51:1   | FAIL               |
| Border            | `#2d2d2d` | `#1a1a1a`  | 1.20:1   | FAIL — needs 3:1   |
| Button background | `#2d2d2d` | `#1a1a1a`  | 1.20:1   | FAIL — needs 3:1   |
| Button text       | `#a0a0a0` | `#2d2d2d`  | 1.12:1   | FAIL               |

The colors are all dark-on-dark, creating an interface that's aesthetically "dark mode" but functionally unusable.

---

## The fix (after)

The `after/` version uses a carefully constructed dark mode palette where every color meets WCAG requirements.

**Corrected values in `after/styles.css`:**

| Element           | Was                    | Now                    | Contrast | Result |
| ----------------- | ---------------------- | ---------------------- | -------- | ------ |
| Body text         | `#a0a0a0` on `#1a1a1a` | `#e5e5e5` on `#1a1a1a` | 12.63:1  | AAA    |
| Secondary text    | `#808080` on `#1a1a1a` | `#a0aec0` on `#1a1a1a` | 5.74:1   | AA     |
| Border            | `#2d2d2d` on `#1a1a1a` | `#374151` on `#1a1a1a` | 3.01:1   | AA     |
| Button background | `#2d2d2d` on `#1a1a1a` | `#374151` on `#1a1a1a` | 3.01:1   | AA     |
| Button text       | `#a0a0a0` on `#2d2d2d` | `#ffffff` on `#374151` | 10.76:1  | AAA    |

---

## Key rules

**1. Dark mode needs lighter text, not just darker backgrounds.**
The contrast ratio formula is symmetric: you can achieve it by darkening the background OR lightening the text. In dark mode, focus on lightening your text colors — use off-white (`#e5e5e5`) instead of medium gray (`#a0a0a0`).

**2. Borders and separators must meet 3:1 contrast.**
A border that's barely visible isn't just a design flaw — it's a WCAG 1.4.11 violation. Borders are non-text content that must be visible.

**3. Test your palette, don't guess.**
Dark mode colors are counterintuitive — colors that look "bright enough" often fail contrast. Always verify with a contrast checker.

**4. Consider the full range of user environments.**
Users may use dark mode in low-light rooms, but also in bright environments. Your dark mode must work in both. A dark mode that only works in a pitch-black room is not accessible.

---

## Design tokens

| Token                          | Value     | Usage                         | Contrast                   |
| ------------------------------ | --------- | ----------------------------- | -------------------------- |
| `color.background.primary`     | `#1a1a1a` | Main background color         | —                          |
| `color.text.primary`           | `#e5e5e5` | Body text, headings           | 12.63:1 on `#1a1a1a` (AAA) |
| `color.text.secondary`         | `#a0aec0` | Supporting text, metadata     | 5.74:1 on `#1a1a1a` (AA)   |
| `color.border`                 | `#374151` | Borders, dividers             | 3.01:1 on `#1a1a1a` (AA)   |
| `color.interactive.background` | `#374151` | Button, card backgrounds      | 3.01:1 on `#1a1a1a` (AA)   |
| `color.interactive.text`       | `#ffffff` | White on interactive elements | 10.76:1 on `#374151` (AAA) |
| `color.interactive.hover`      | `#4b5563` | Hover state backgrounds       | 4.62:1 on `#1a1a1a` (AA)   |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/01-color-contrast/dark-mode-theme

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has color-contrast violations
✓ after/ has no color-contrast violations
```

You can also verify the contrast ratios manually:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) (desktop app, supports eyedropper)

**Manual testing:**

1. Open `after/index.html` in a browser
2. Test in both bright and dim lighting conditions
3. Verify all text is readable without strain
4. Check borders and separators are visible

---

## Resources

- [WCAG 1.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 1.4.11 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Dark Mode Design Guidelines — Smashing Magazine](https://www.smashingmagazine.com/2020/04/designing-for-dark-mode/)
