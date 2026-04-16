---
title: "Complex Images / Charts — Alt Text"
wcag: "1.1.1 Non-text Content — Level A"
wcag-shorthand: "1.1.1"
wcag-level: "A"
---

# Pattern: Complex Images / Charts — Alt Text

**Category:** Alt Text
**WCAG:** 1.1.1 Non-text Content — Level A

---

## What this pattern demonstrates

How to provide accessible text alternatives for complex images — charts, graphs, and data visualisations — that contain too much information for a single `alt` attribute. Two techniques are shown: a visible `<figcaption>` and a collapsible `<details>` data table, both linked via `aria-describedby`.

---

## Why it matters

A brief `alt` attribute can describe a simple image completely. A bar chart showing quarterly revenue across four quarters with trend data cannot be reduced to a sentence. A screen reader user who needs that data for their work is completely excluded if only `alt="Bar chart of quarterly revenue"` is provided.

The missing data is not a minor inconvenience — it is the entire content of the chart. For a financial analyst, an investor, or a business user making decisions from this dashboard, the inaccessibility of chart data is equivalent to showing sighted users only the chart title and hiding all the bars.

The two-layer approach solves this:

1. **Brief alt** — announces the chart topic and headline finding when the image is encountered. Equivalent to a caption under a photo in a newspaper.
2. **Long description via `aria-describedby`** — provides the full data. Screen reader users can navigate to it; sighted users benefit from it too.

---

## WCAG Criterion

**1.1.1 Non-text Content — Level A**

> All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

For complex images, "equivalent purpose" means the text alternative must convey the same data, conclusions, and relationships the visual encodes. A brief alt does not meet this bar for charts with multiple data series or trends.

Source: [Understanding Success Criterion 1.1.1 — Complex Images](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

## The problem (before)

The `before/` version shows two chart images with no `alt` attribute. Both the topic and all data are invisible to screen reader users.

**Specific failures in `before/index.html`:**

| Element          | ID                  | alt      | aria-describedby | axe violation |
| ---------------- | ------------------- | -------- | ---------------- | ------------- |
| Revenue chart    | `#revenue-chart`    | absent   | absent           | `image-alt`   |
| Engagement chart | `#engagement-chart` | absent   | absent           | `image-alt`   |

---

## The fix (after)

**Layer 1** — `alt` attribute provides the brief accessible name. It states the chart type, topic, and the key finding in one sentence:

```html
alt="Bar chart: quarterly revenue grew each quarter in 2023, from $4.3M in Q1 to $6.1M in Q4"
```

This is enough for a user to decide whether they need the detail. It is not enough to replace the chart.

**Layer 2** — `aria-describedby` links the image to the long description. Two techniques:

### Technique 1 — Visible `<figcaption>`

```html
<figure>
  <img
    src="..."
    alt="Bar chart: quarterly revenue grew each quarter in 2023, from $4.3M in Q1 to $6.1M in Q4"
    aria-describedby="revenue-chart-desc"
  />
  <figcaption id="revenue-chart-desc">
    Total quarterly revenue increased steadily throughout 2023:
    Q1 $4.3M, Q2 $4.6M (+7%), Q3 $5.4M (+17%), Q4 $6.1M (+13%).
    Full-year revenue was $20.4M, up 42% compared to $14.3M in 2022.
  </figcaption>
</figure>
```

**When to use:** When the long description adds value for all users — an executive summary, a key finding, or the data in prose form. The description is always visible.

### Technique 2 — Collapsible `<details>` with a data table

```html
<figure>
  <img
    src="..."
    alt="Line chart: monthly active users grew 83% in H1 2023, from 12,000 in January to 22,000 in June"
    aria-describedby="engagement-chart-desc"
  />
  <details id="engagement-chart-desc">
    <summary>View monthly active users data as table</summary>
    <table>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Active Users</th>
          <th scope="col">Month-over-Month Change</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>January</td><td>12,000</td><td>—</td></tr>
        <!-- … -->
      </tbody>
    </table>
  </details>
</figure>
```

**When to use:** When the data is extensive (many rows or columns) and would be visually disruptive as a permanent block. The table is collapsed for sighted users but always accessible via `aria-describedby` regardless of the `open` state.

**Important:** `aria-describedby` works on collapsed `<details>` — AT reads the entire subtree of the referenced element even when it is not expanded. The `<details>` approach is for *visual* elegance, not AT access.

---

## Key rules

**1. Complex images need two layers: brief alt + long description.**
`alt` alone is insufficient for a chart with multiple series, trends, or comparative data. The alt announces the chart; the long description delivers the data.

**2. The brief alt states the topic and the headline finding — not just the chart type.**
`alt="Bar chart"` is worse than useless — it names the container, not the content. `alt="Bar chart: revenue grew 42% year-over-year"` tells the user what to expect from the detail.

**3. The long description must convey the data, not re-describe the visual.**
"The blue bars are taller on the right" is a visual description — it tells the user about the chart. "Revenue grew from $4.3M in Q1 to $6.1M in Q4" is a data description — it conveys the information the chart encodes. Use the latter.

**4. A data table is the most structured and navigable form of long description for chart data.**
A screen reader user can navigate a table by row and column. They can jump between headers and cells. A prose description requires linear reading. For complex charts with many data points, a table is significantly more accessible than prose.

**5. `longdesc` is obsolete — do not use it.**
The `longdesc` attribute was removed from the HTML specification. No modern browser supports it and axe flags it as obsolete. Use `aria-describedby` instead.

---

## Design tokens

| Token                        | Value     | Usage                                                 |
| ---------------------------- | --------- | ----------------------------------------------------- |
| `color.text.primary`         | `#1a1a1a` | Page title, section headings, chart data labels       |
| `color.text.secondary`       | `#4a5568` | Long description text, chart axis tick labels         |
| `color.text.muted`           | `#6b7280` | Chart y-axis labels                                   |
| `color.chart.primary`        | `#1d4ed8` | Bar fill, line stroke                                 |
| `color.brand.link`           | `#1d4ed8` | Details summary text                                  |
| `color.surface.page`         | `#f8fafc` | Page background                                       |
| `color.surface.card`         | `#ffffff` | Chart background                                      |
| `color.surface.card-border`  | `#e2e8f0` | Chart border, details border, table row dividers      |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/02-missing-alt-text/complex-images-charts

# Validate token contrast ratios
npm run validate-tokens
```

Expected test output:

```
✓ before/ has image-alt violations — complex chart images have no alt attribute
✓ after/ has no image-alt violations — complex charts have alt + aria-describedby
✓ after/ charts have brief alt text and aria-describedby pointing to substantial long descriptions
```

**Manual screen reader test:**

1. Open `before/index.html` with NVDA or VoiceOver — both charts announce the src URL; all data is inaccessible
2. Open `after/index.html`:
   - Revenue chart announces the brief alt, then the figcaption description is available via the description virtual buffer
   - Engagement chart announces the brief alt; navigating to the `<details>` element reveals the data table, navigable by row and column

---

## Resources

- [WCAG 1.1.1 Understanding document — Complex Images](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [W3C WAI — Complex Images Tutorial](https://www.w3.org/WAI/tutorials/images/complex/) — definitive guidance on long descriptions
- [W3C WAI — Charts & Graphs](https://www.w3.org/WAI/tutorials/images/complex/#charts-and-graphs) — specific patterns for data visualisations
- [WebAIM: Alternative Text — Complex Images](https://webaim.org/techniques/alttext/#complex)
