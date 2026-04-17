---
title: Data Table — Keyboard Navigation and Sorting
category: 06-keyboard-navigation
wcag: "2.1.1 Keyboard"
wcag-shorthand: "2.1.1"
wcag-level: "A"
wcag-criterion: Keyboard
axe-rule: button-name
status: complete
---

# Data Table — Keyboard Navigation and Sorting

## What the problem is

Sortable column headers built with `<span onclick>` are invisible to keyboard users. There is no way to Tab to the headers, no way to activate a sort, and no `aria-sort` attribute to communicate the current sort direction to screen readers.

### Before — broken pattern

```html
<!-- BROKEN: <span onclick> — not keyboard reachable, no aria-sort -->
<th>
  <span class="sort-trigger" onclick="sortBy('name')">
    Tool ↕
  </span>
</th>
```

Pressing Tab skips the entire table header row. Screen reader users receive no information about sort state.

## How to fix it

Replace each `<span>` sort trigger with a `<button>` inside the `<th>`. Add `aria-sort` to each `<th>` and an `aria-live` region to announce sort changes. Apply `role="grid"` to the table to enable arrow-key navigation between cells.

### After — fixed pattern

```html
<!-- FIX: aria-live announces sort changes -->
<p id="sort-status" class="sr-only" aria-live="polite" aria-atomic="true"></p>

<!-- FIX: role="grid" enables roving-tabindex arrow-key navigation -->
<table role="grid" aria-label="Accessibility tools — sortable, use arrow keys to navigate cells">
  <thead>
    <tr>
      <!-- FIX: aria-sort on <th>; <button> is the keyboard sort trigger -->
      <th scope="col" aria-sort="ascending" data-col="name">
        <button aria-label="Sort by Tool name, currently sorted ascending">
          Tool <span aria-hidden="true">↑</span>
        </button>
      </th>
      ...
    </tr>
  </thead>
  <tbody>
    <tr>
      <!-- FIX: role="gridcell" and tabindex for roving focus -->
      <td role="gridcell" tabindex="-1">NVDA</td>
      ...
    </tr>
  </tbody>
</table>
```

## Grid navigation (roving tabindex)

Only one cell in the grid has `tabindex="0"` at any time — the currently focused cell. All other cells have `tabindex="-1"`. Arrow keys move focus without changing the Tab order of the rest of the page:

| Key | Action |
|-----|--------|
| `Tab` | Enter the grid at the first sort button |
| `Arrow Right/Left` | Move one column |
| `Arrow Down/Up` | Move one row |
| `Home` | First cell in current row |
| `End` | Last cell in current row |
| `Ctrl+Home` | First cell in the table |
| `Ctrl+End` | Last cell in the table |
| `Enter` / `Space` | Activate sort (when a column header button is focused) |

## `aria-sort` on the `<th>`

`aria-sort` is valid on elements with `role="columnheader"` (which `<th scope="col">` provides natively). It communicates the current sort direction to screen readers. Values:

- `"none"` — column is not sorted
- `"ascending"` — sorted A→Z or lowest→highest
- `"descending"` — sorted Z→A or highest→lowest

Only one column header should have `aria-sort="ascending"` or `"descending"` at a time; all others remain `"none"`.

## Sort button accessible names

Each sort button carries a dynamic `aria-label` that describes the column and its current sort state:

```
"Sort by Tool name, currently sorted ascending"
"Sort by Category, currently unsorted"
```

This gives screen reader users immediate context without needing to inspect the `aria-sort` attribute.

## The `aria-live` announcement

Sorting re-renders the table body. The `aria-live="polite"` region announces what changed:

```
"Table sorted by Tool name, ascending."
```

The announcement is written before the DOM re-renders so the screen reader picks it up as a live region change rather than re-reading the entire table.

## `role="gridcell"` on `<td>`

When `role="grid"` is applied to a `<table>`, the `<td>` elements inside become grid cells. Adding `role="gridcell"` explicitly satisfies the required children constraint and prevents ambiguity in assistive technology implementations.

## WCAG success criteria

**2.1.1 Keyboard — Level A**: All functionality operable through a keyboard. `<span onclick>` sort triggers have zero keyboard operability.

**1.3.1 Info and Relationships — Level A**: `aria-sort` on `<th scope="col">` communicates the sort relationship structurally, not just visually.

## Related patterns

- `drag-and-drop-alt` — same aria-live announcement approach for state changes
- `custom-select-dropdown` — same roving tabindex pattern inside a listbox
