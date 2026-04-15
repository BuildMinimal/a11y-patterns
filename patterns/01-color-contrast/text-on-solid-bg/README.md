---
title: "Text on Solid Background — Color Contrast"
wcag: "1.4.3 Contrast Minimum — Level AA"
wcag-shorthand: "1.4.3"
wcag-level: "AA"
---

# Pattern: Text on Solid Background — Color Contrast

**Category:** Color Contrast
**WCAG:** 1.4.3 Contrast Minimum — Level AA

---

## What this pattern demonstrates

How to choose text colors that meet WCAG contrast requirements on white backgrounds — covering body text, supporting text, category tags, and button labels, all in one realistic article card UI.

---

## Why it matters

Approximately 8% of men and 0.5% of women have some form of color vision deficiency. A far larger group — estimated 2.2 billion people globally — have some form of vision impairment including low vision. For these users, low-contrast text is not hard to read: it is _impossible_ to read.

The failure mode is concrete: a user with low vision, or using their phone in bright sunlight, or on a display with poor color calibration, looks at the page and sees nothing where text should be. They don't experience it as "hard to read gray text." They experience it as missing content.

Low contrast also fails users in temporary situations: migraine, tired eyes, glare, aging-related vision decline. The contrast requirement is not a niche accommodation.

---

## WCAG Criterion

**1.4.3 Contrast (Minimum) — Level AA**

> The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:
>
> - **Large Text:** Large-scale text and images of large-scale text have a contrast ratio of at least 3:1.
> - **Incidental:** Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.
> - **Logotypes:** Text that is part of a logo or brand name has no contrast requirement.

Large text = 18pt (24px) or larger in normal weight, or 14pt (18.67px) or larger in bold weight.

Source: [Understanding Success Criterion 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## The problem (before)

The `before/` version shows a realistic article card where a developer has used design system grays and a light brand blue — colors that look fine on a calibrated display but fail WCAG by a wide margin.

**Specific failures in `before/styles.css`:**

| Element                            | Color     | Contrast on White | Result             |
| ---------------------------------- | --------- | ----------------- | ------------------ |
| `.card__tag` text                  | `#7ab3f0` | 2.85:1            | FAIL — needs 4.5:1 |
| `.card__meta` text                 | `#b0b7c3` | 1.96:1            | FAIL               |
| `.card__body` text                 | `#aaaaaa` | 2.32:1            | FAIL               |
| `.card__secondary` text            | `#aaaaaa` | 2.32:1            | FAIL               |
| `.btn--primary` white on `#93c5fd` | `#ffffff` | 2.45:1            | FAIL               |
| `.btn--ghost` text + border        | `#9ca3af` | 2.54:1            | FAIL               |

The heading (`#1a1a1a`) passes — which is common. Developers often apply contrast correctly to headings and overlook body copy, metadata, and interactive element text.

---

## The fix (after)

The `after/` version corrects every failing element using colors from the same hue families — the design language is preserved but contrast is repaired.

**Corrected values in `after/styles.css`:**

| Element                 | Was                | Now                    | Contrast | Result |
| ----------------------- | ------------------ | ---------------------- | -------- | ------ |
| `.card__tag` text       | `#7ab3f0` on white | `#1e40af` on `#dbeafe` | 7.16:1   | AAA    |
| `.card__meta` text      | `#b0b7c3`          | `#4a5568`              | 5.74:1   | AA     |
| `.card__body` text      | `#aaaaaa`          | `#1a1a1a`              | 18.1:1   | AAA    |
| `.card__secondary` text | `#aaaaaa`          | `#4a5568`              | 5.74:1   | AA     |
| `.btn--primary` text    | white on `#93c5fd` | white on `#1d4ed8`     | 7.22:1   | AAA    |
| `.btn--ghost` text      | `#9ca3af`          | `#1d4ed8`              | 7.22:1   | AAA    |

---

## Key rules

**1. "Muted" text is not exempt from contrast requirements.**
Any text that conveys information must meet 4.5:1. Metadata, captions, helper text, placeholder text — none of these have a contrast exemption just because they're secondary. The only true exemptions are decorative text, inactive UI component text, and logotypes.

**2. Never use a light brand color as text on white.**
Mid-range blues, greens, and purples (e.g. Tailwind's `-300` and `-400` shades) almost never pass 4.5:1 on white. Use the dark shade of the same hue for text, or use the light shade as a _background_ and pair it with the dark shade as text.

**3. Ghost buttons are not exempt.**
A ghost button's text and its border must both meet contrast thresholds — the text against the background, and the border against the surrounding background (WCAG 1.4.11). Light gray ghost buttons with light borders fail both.

**4. For body copy, target AAA (7:1) where possible.**
The 4.5:1 minimum is a floor, not a target. Reading effort compounds over long passages. `#1a1a1a` on white is an 18.1:1 ratio — use it for any paragraph text a user is expected to read.

---

## Design tokens

| Token                                  | Value     | Usage                      | Contrast                  |
| -------------------------------------- | --------- | -------------------------- | ------------------------- |
| `color.text.primary`                   | `#1a1a1a` | Body text, headings        | 18.1:1 on white (AAA)     |
| `color.text.secondary`                 | `#4a5568` | Metadata, supporting text  | 5.74:1 on white (AA)      |
| `color.tag.text`                       | `#1e40af` | Category tag text          | 7.16:1 on `#dbeafe` (AAA) |
| `color.tag.background`                 | `#dbeafe` | Category tag background    | —                         |
| `color.interactive.primary-background` | `#1d4ed8` | Primary button background  | —                         |
| `color.interactive.primary-text`       | `#ffffff` | White on primary button    | 7.22:1 on `#1d4ed8` (AAA) |
| `color.interactive.ghost-text`         | `#1d4ed8` | Ghost button text + border | 7.22:1 on white (AAA)     |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/01-color-contrast/text-on-solid-bg

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

---

## Resources

- [WCAG 1.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Who Can Use](https://www.whocanuse.com/) — simulates how different vision types experience your color choices
- [WebAIM Million 2024 Report](https://webaim.org/projects/million/) — low contrast is the #1 WCAG failure found on the web
