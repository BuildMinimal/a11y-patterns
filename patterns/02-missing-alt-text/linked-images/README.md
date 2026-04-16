---
title: "Linked Images — Alt Text"
wcag: "1.1.1 Non-text Content — Level A"
wcag-shorthand: "1.1.1"
wcag-level: "A"
---

# Pattern: Linked Images — Alt Text

**Category:** Alt Text
**WCAG:** 1.1.1 Non-text Content — Level A

---

## What this pattern demonstrates

How to write alt text for images that are also links — where the alt attribute becomes the accessible name of the link, and must describe the link destination rather than the image subject.

---

## Why it matters

When an `<img>` is the sole content of an `<a>`, the image's alt text is the only text the link has. It becomes the accessible name of the link itself.

A keyboard or screen reader user navigating between links hears the accessible name of each link, then "link". On a category page with four image-only links and no alt text, they hear:

> _"link … link … link … link"_

Four times. No destination, no context, no way to decide which to follow. They must open each link and navigate back — if they can determine there is anything to navigate to at all.

The harm is concrete: a screen reader user on an e-commerce homepage with an image-only logo link and image-only product category tiles cannot determine where the logo goes (homepage? account?), cannot distinguish categories, and may not be able to shop at all.

Compare the after/ experience:

> _"ProShop — return to homepage, link … Shop Electronics, link … Shop Clothing, link …"_

Every destination is clear before the link is activated.

---

## WCAG Criterion

**1.1.1 Non-text Content — Level A**

> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

For a linked image, "equivalent purpose" means describing where the link goes — because that is the purpose the image serves in context.

Source: [Understanding Success Criterion 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

## The problem (before)

The `before/` version shows a site header with a logo link and a four-tile category grid. Every link contains only an image — none have an `alt` attribute.

**Specific failures in `before/index.html`:**

| Element              | Class              | alt attribute | axe violations               |
| -------------------- | ------------------ | ------------- | ---------------------------- |
| Logo link            | `.site-logo`       | absent        | `image-alt`, `link-name`     |
| Electronics link     | `.img-electronics` | absent        | `image-alt`, `link-name`     |
| Clothing link        | `.img-clothing`    | absent        | `image-alt`, `link-name`     |
| Home and Garden link | `.img-home-garden` | absent        | `image-alt`, `link-name`     |
| Books link           | `.img-books`       | absent        | `image-alt`, `link-name`     |

Two axe rules fire for each image-only link with no alt:
- **`image-alt`** — the `<img>` has no alt attribute
- **`link-name`** — the `<a>` has no accessible name (which it would get from the alt text)

---

## The fix (after)

The `after/` version adds alt text to every linked image. Each alt describes the link destination, not the image.

**Corrected attributes in `after/index.html`:**

| Element              | Before    | After                                  | Why this wording                                         |
| -------------------- | --------- | -------------------------------------- | -------------------------------------------------------- |
| Logo link            | no `alt`  | `"ProShop — return to homepage"`       | Names the site; makes the destination explicit           |
| Electronics link     | no `alt`  | `"Shop Electronics"`                   | Describes the action and destination, not the icon       |
| Clothing link        | no `alt`  | `"Shop Clothing"`                      | Same pattern: action + destination                       |
| Home and Garden link | no `alt`  | `"Shop Home and Garden"`               | Same pattern                                             |
| Books link           | no `alt`  | `"Shop Books"`                         | Same pattern                                             |

---

## Key rules

**1. Alt text for a linked image describes the link destination, not the image subject.**
For a standalone informative image, alt text describes what the image shows. For a linked image where the image IS the link, alt text must describe where the link goes. These are different questions, and confusing them is the most common error with linked images.

| Context           | Wrong alt                 | Correct alt                         |
| ----------------- | ------------------------- | ----------------------------------- |
| Logo → homepage   | `"logo"`                  | `"ProShop — return to homepage"`   |
| Category tile     | `"monitor icon"`          | `"Shop Electronics"`                |
| Social icon → Twitter | `"Twitter bird logo"` | `"Follow us on Twitter"`            |

**2. `alt=""` on an image-only link creates a link with no accessible name — a different failure.**
`alt=""` signals "this image is decorative; skip it." When used on a linked image with no other text, the link becomes completely inaccessible: it exists in the focus order but has no name. Screen readers announce it as "link" with no label. This violates WCAG 2.4.6 (Headings and Labels) and 4.1.2 (Name, Role, Value).

**3. When an image link ALSO has visible text, `alt=""` is correct for the image.**
If the `<a>` contains both an `<img>` and visible text (e.g. a logo image + a site name in a `<span>`), the text already provides the accessible name of the link. Setting `alt=""` on the image prevents the link name from being announced twice. The visible text is the link label; the image is decorative in this context.

```html
<!-- Image + visible text: alt="" on the image to avoid repetition -->
<a href="/">
  <img src="logo.svg" alt="" />
  <span>ProShop</span>
</a>
<!-- Screen reader: "ProShop, link" — not "ProShop logo ProShop, link" -->
```

**4. For icon-only buttons, the same rule applies.**
A `<button>` that contains only a search icon `<img>` needs `alt="Search"` on the image. The alt text is the button label. This is covered separately in Category 04 (Links & Buttons → icon-button-no-label), but the principle is identical.

---

## Design tokens

| Token                           | Value     | Usage                                               |
| ------------------------------- | --------- | --------------------------------------------------- |
| `color.text.primary`            | `#1a1a1a` | Page title — 18.1:1 on white (AAA)                  |
| `color.text.secondary`          | `#4a5568` | Page intro text — 5.74:1 on white (AA)              |
| `color.brand.primary`           | `#1d4ed8` | Logo background, Electronics tile, focus outline    |
| `color.category.clothing-icon`  | `#db2777` | Clothing icon fill                                  |
| `color.category.home-garden-icon`| `#16a34a` | Home and Garden icon fill                          |
| `color.category.books-icon`     | `#d97706` | Books icon fill                                     |
| `color.surface.page`            | `#f8fafc` | Page background                                     |
| `color.surface.card`            | `#ffffff` | Header and category tile backgrounds                |
| `color.surface.card-border`     | `#e2e8f0` | Header border, category tile borders                |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/02-missing-alt-text/linked-images

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has image-alt and link-name violations — image links are missing alt attributes
✓ after/ has no violations — all image links have descriptive alt text
✓ after/ alt text describes link destinations, not just image subjects
```

**Manual screen reader test:**

1. Open `before/index.html` with NVDA or VoiceOver
2. Navigate by Tab — each link announces only "link" with no destination
3. Open `after/index.html` — each link announces its destination before "link": "Shop Electronics, link"

---

## Resources

- [WCAG 1.1.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [W3C Images Tutorial — Functional Images](https://www.w3.org/WAI/tutorials/images/functional/) — covers images used as links and buttons
- [W3C Alt Text Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) — step 1 asks "Does the image have a function?" — linked images always do
- [WebAIM: Alternative Text — Images as Links](https://webaim.org/techniques/alttext/#linked)
