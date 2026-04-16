---
title: "Decorative Images — Alt Text"
wcag: "1.1.1 Non-text Content — Level A"
wcag-shorthand: "1.1.1"
wcag-level: "A"
---

# Pattern: Decorative Images — Alt Text

**Category:** Alt Text
**WCAG:** 1.1.1 Non-text Content — Level A

---

## What this pattern demonstrates

How to mark purely decorative images so screen readers skip them entirely — using `alt=""` on `<img>` elements that convey no information.

---

## Why it matters

Screen readers announce every `<img>` element that lacks an empty alt attribute. When a decorative image has no `alt` at all, the screen reader falls back to the filename or the `src` URL:

> _"image, data colon image slash svg plus xml percent 3C svg…"_

This is noise. It interrupts the reading flow, adds zero information, and forces the user to process a meaningless string before they can continue with actual content. On a page with several decorative images, this noise compounds quickly.

The harm is concrete: a screen reader user navigating an article with decorative banners and dividers must wade through a string of unintelligible announcements before reaching a sentence of real content. This is not a minor inconvenience — it is equivalent to inserting random characters into every paragraph a sighted user reads.

Users affected: blind and low-vision users who rely on screen readers (NVDA, JAWS, VoiceOver, TalkBack). Estimated at 7.6 million people in the US alone who have difficulty seeing.

---

## WCAG Criterion

**1.1.1 Non-text Content — Level A**

> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except in the following situations:
>
> **Decoration, Formatting, Invisible:** If non-text content is pure decoration, is used only for visual formatting, or is not presented to users, then it is implemented in a way that it can be ignored by assistive technology.

For `<img>` elements, "implemented in a way that it can be ignored" means `alt=""`.

Source: [Understanding Success Criterion 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

## The problem (before)

The `before/` version shows a realistic article page with three decorative images — a hero banner, a section divider, and an end ornament — none of which have an `alt` attribute.

**Specific failures in `before/index.html`:**

| Element              | Class              | alt attribute | axe violation |
| -------------------- | ------------------ | ------------- | ------------- |
| Hero banner          | `.hero__banner`    | absent        | `image-alt`   |
| Section divider      | `.section-divider` | absent        | `image-alt`   |
| End ornament         | `.ornament`        | absent        | `image-alt`   |
| Article photo        | `.article__photo`  | present ✓     | none          |

The article photo demonstrates the contrast: it has meaningful alt text because it conveys content. The decorative images do not — but because they have no `alt` attribute at all, axe cannot distinguish between "forgot to write alt text" and "intentionally decorative." Both look the same: a missing `alt` attribute is always a violation.

---

## The fix (after)

The `after/` version adds `alt=""` to all three decorative images. The informative article photo is unchanged.

**Corrected attributes in `after/index.html`:**

| Element         | Before            | After                             |
| --------------- | ----------------- | --------------------------------- |
| Hero banner     | no `alt`          | `alt=""` + `role="presentation"`  |
| Section divider | no `alt`          | `alt=""`                          |
| End ornament    | no `alt`          | `alt=""`                          |
| Article photo   | meaningful `alt`  | unchanged                         |

`alt=""` (an empty string, not the absence of the attribute) is the signal to the browser and assistive technology: _this image has no informational content, skip it_.

`role="presentation"` on the hero banner is belt-and-suspenders — redundant for modern AT, but provides an extra layer of protection against older screen readers that do not fully honour `alt=""` on its own.

---

## Key rules

**1. An absent `alt` attribute is never correct for a decorative image.**
The distinction is between `alt=""` (explicitly decorative — screen reader skips it) and no `alt` at all (ambiguous — screen reader announces the src URL). The absence of `alt` is always a WCAG 1.1.1 failure; `alt=""` is the explicit declaration of intent.

**2. The test is: would removing this image lose information?**
If yes → the image is informative → write alt text that conveys the same information.
If no → the image is decorative → use `alt=""`.
Edge cases: icons that reinforce adjacent text (decorative), icons that are the only label (informative).

**3. Do not write `alt="decorative"` or `alt="ornament"` on decorative images.**
These are not empty alt text — they are meaningless descriptions. `alt="decorative"` causes a screen reader to announce "decorative, image" which is exactly the noise you are trying to eliminate. Only `alt=""` removes the element from the accessibility tree.

**4. CSS background images have no `alt` attribute — use them for decorative images when possible.**
An image set via `background-image` in CSS is automatically ignored by assistive technology. When a purely decorative image can be expressed as a CSS background, that is often simpler than managing `alt=""` in markup. But if the image is in an `<img>` tag, `alt=""` is mandatory.

**5. `role="presentation"` is belt-and-suspenders, not a replacement.**
`alt=""` is the primary mechanism. `role="presentation"` may help with older AT that does not fully honour `alt=""`, but should not be used _instead of_ `alt=""`.

---

## Design tokens

| Token                           | Value     | Usage                                             |
| ------------------------------- | --------- | ------------------------------------------------- |
| `color.text.primary`            | `#1a1a1a` | Body text, headings — 18.1:1 on white (AAA)       |
| `color.text.secondary`          | `#4a5568` | Metadata, captions — 5.74:1 on white (AA)         |
| `color.decorative.banner-fill`  | `#1d4ed8` | Decorative banner fill — no contrast req (exempt) |
| `color.decorative.divider-fill` | `#e0e7ff` | Decorative wave divider fill                      |
| `color.surface.page`            | `#ffffff` | Page background                                   |

Note: decorative elements with `alt=""` are exempt from WCAG 1.4.11 (Non-text Contrast) because they are not part of the UI — they have been explicitly removed from the accessibility tree.

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/02-missing-alt-text/decorative-images

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has image-alt violations — decorative images are missing alt attributes
✓ after/ has no image-alt violations — all images have appropriate alt attributes
✓ after/ decorative images have alt="" and informative image has meaningful alt text
```

**Manual screen reader test:**

1. Open `before/index.html` with NVDA or VoiceOver
2. Navigate by element (Tab or arrow keys) — the screen reader will announce the src URL of each decorative image: meaningless noise
3. Open `after/index.html` — the decorative images are completely silent; only the informative photo is announced with its description

---

## Resources

- [WCAG 1.1.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [W3C Alt Text Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) — a four-step flowchart to decide what alt text to write
- [WebAIM: Alternative Text](https://webaim.org/techniques/alttext/) — comprehensive guide to alt text best practices
- [WebAIM Million 2024 Report](https://webaim.org/projects/million/) — missing alt text is the #1 WCAG failure on the web
