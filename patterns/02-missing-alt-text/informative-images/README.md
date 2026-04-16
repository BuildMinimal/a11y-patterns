---
title: "Informative Images — Alt Text"
wcag: "1.1.1 Non-text Content — Level A"
wcag-shorthand: "1.1.1"
wcag-level: "A"
---

# Pattern: Informative Images — Alt Text

**Category:** Alt Text
**WCAG:** 1.1.1 Non-text Content — Level A

---

## What this pattern demonstrates

How to write meaningful alt text for informative images — photographs, charts, diagrams, and illustrations that convey content a sighted user would need to understand the page.

---

## Why it matters

When an informative image has no alt attribute, a screen reader announces the src URL — noise that conveys nothing. When it has `alt=""`, the image is silently skipped — the content is simply gone. Either way, the screen reader user receives none of the information the image carries.

The harm is not abstract. Consider a product review page:

- **Product photo with no alt:** a blind user evaluating a purchase cannot tell whether the headphones are over-ear or in-ear, large or compact, premium-feeling or cheap-looking. A sighted user scans this in two seconds.
- **Battery chart with no alt:** the comparative data — 40 hours vs. 30 vs. 22 — is invisible. The user knows a chart exists but not what it says. They are making a purchase decision with less information than every sighted user.
- **Setup diagram with no alt:** the pairing procedure is a visual sequence. Without alt text, the screen reader user cannot follow the steps. They may be unable to use the product at all.

Users affected: blind and low-vision users who rely on screen readers (NVDA, JAWS, VoiceOver, TalkBack). Estimated at 7.6 million people in the US alone who have difficulty seeing.

---

## WCAG Criterion

**1.1.1 Non-text Content — Level A**

> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except in the following situations:
>
> **Decoration, Formatting, Invisible:** If non-text content is pure decoration, is used only for visual formatting, or is not presented to users, then it is implemented in a way that it can be ignored by assistive technology.

"Serves the equivalent purpose" is the key phrase. The alt text does not need to describe every pixel — it needs to convey the same information or function the image conveys to a sighted user.

Source: [Understanding Success Criterion 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

## The problem (before)

The `before/` version shows a product review page with three informative images — none of which have an `alt` attribute.

**Specific failures in `before/index.html`:**

| Element         | Class            | alt attribute | What is lost                            |
| --------------- | ---------------- | ------------- | --------------------------------------- |
| Product photo   | `.product-photo` | absent        | Physical appearance, form factor        |
| Battery chart   | `.chart-img`     | absent        | Comparative data (40h vs 30h vs 22h)   |
| Pairing diagram | `.diagram-img`   | absent        | The three-step pairing procedure        |

axe rule violated: `image-alt` — fires when an `<img>` element has no `alt` attribute and no `role="none/presentation"`.

---

## The fix (after)

The `after/` version adds descriptive alt text to all three images. The alt text conveys the same information the image conveys to a sighted user.

**Corrected attributes in `after/index.html`:**

| Element         | Before    | After                                                                                                   |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| Product photo   | no `alt`  | `alt="ProSound X1 over-ear headphones in midnight black with padded ear cups and adjustable headband"`  |
| Battery chart   | no `alt`  | `alt="Bar chart comparing wireless headphone battery life: ProSound X1 leads at 40 hours, Brand A at 30 hours, Brand B at 22 hours"` |
| Pairing diagram | no `alt`  | `alt="Three-step Bluetooth pairing guide: Step 1 hold the power button for 3 seconds, Step 2 select ProSound X1 from your device list, Step 3 confirm the pairing on your device"` |

---

## Key rules

**1. Ask: "What information would a sighted user get from this image?"**
Write alt text that conveys that information. If the image were replaced by the alt text, a screen reader user should have the same understanding as a sighted user.

**2. For charts and graphs, convey the data — not just the chart type.**
`alt="A bar chart"` is useless. `alt="A bar chart showing..."` with the actual values is the minimum. If the chart is complex, consider also providing a data table or text summary nearby, with the alt referencing it (`alt="Battery life comparison chart — see data table below"`).

**3. For diagrams and instructional images, convey the procedure or conclusion.**
A setup diagram alt text must describe what to do — the steps or the result — not merely that a diagram exists. `alt="Bluetooth pairing diagram"` fails; `alt="Three-step pairing: hold power, select device, confirm"` passes.

**4. For photographs, describe the relevant content — not every visual detail.**
Describe what a sighted user would notice and use. For a product photo, that means form factor, colour, and notable features. For a team photo in a bio, it means who is in the photo and the context. Irrelevant details waste the user's time.

**5. Do not start alt text with "Image of" or "Photo of".**
Screen readers announce the element type ("image") before reading the alt attribute. "Image of a developer..." becomes "image, image of a developer..." — redundant. Start directly with the subject: "A developer reviewing..."

**6. `alt=""` on an informative image is a WCAG failure — the same as no alt at all.**
`alt=""` explicitly signals "this image is decorative; skip it." Using it on an informative image causes the content to be completely ignored by assistive technology. The absence of information is silent and harder to detect than an announcement of a wrong URL.

---

## Design tokens

| Token                        | Value     | Usage                                                    |
| ---------------------------- | --------- | -------------------------------------------------------- |
| `color.text.primary`         | `#1a1a1a` | Body text, headings — 18.1:1 on white (AAA)              |
| `color.text.secondary`       | `#4a5568` | Review metadata, chart labels — 5.74:1 on white (AA)     |
| `color.brand.chart-primary`  | `#1d4ed8` | ProSound X1 bar, pairing step circles                    |
| `color.brand.chart-secondary`| `#6b7280` | Competitor bars (Brand A, Brand B)                       |
| `color.brand.chart-success`  | `#16a34a` | Step 3 completion circle in the pairing diagram          |
| `color.surface.page`         | `#ffffff` | Page background                                          |
| `color.surface.card-border`  | `#e2e8f0` | Step card borders, image borders                         |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/02-missing-alt-text/informative-images

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has image-alt violations — informative images are missing alt attributes
✓ after/ has no image-alt violations — all informative images have alt text
✓ after/ informative images have meaningful alt text describing their content
```

**Manual screen reader test:**

1. Open `before/index.html` with NVDA or VoiceOver
2. Navigate by element — the screen reader announces nothing useful for the three images (or announces the data URI noise)
3. Open `after/index.html` — the screen reader reads each image's alt text, giving the same information a sighted user gets from seeing the image

---

## Resources

- [WCAG 1.1.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [W3C Alt Text Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) — four-step flowchart for deciding what alt text to write
- [W3C Images Tutorial — Informative Images](https://www.w3.org/WAI/tutorials/images/informative/) — specific guidance for photographs, diagrams, and charts
- [WebAIM: Alternative Text](https://webaim.org/techniques/alttext/) — comprehensive guide including anti-patterns to avoid
- [WebAIM Million 2024 Report](https://webaim.org/projects/million/) — missing alt text is the #1 WCAG failure on the web
