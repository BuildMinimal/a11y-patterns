---
title: Date Picker — Keyboard Navigation
category: 06-keyboard-navigation
wcag: "2.1.1 Keyboard"
wcag-shorthand: "2.1.1"
wcag-level: "A"
wcag-criterion: Keyboard
axe-rule: aria-required-children
status: complete
---

# Date Picker — Keyboard Navigation

## What the problem is

A custom date picker built from `<div>` elements fails on every axis of keyboard accessibility:

1. The calendar toggle (`<div>`) is not in the Tab order — keyboard users cannot open the calendar.
2. The day cells (`<div>`) have no `tabindex` — keyboard users cannot reach any date.
3. No Arrow key navigation — even if a cell were focused, there is no way to move between days.
4. No `role="grid"` or `role="gridcell"` — screen readers have no context about the grid structure.
5. No `aria-current="date"`, `aria-selected`, or accessible labels on day cells.

### Before — broken pattern

```html
<!-- Toggle: <div> — not keyboard-reachable -->
<div class="calendar-toggle" onclick="toggleCalendar()">📅</div>

<!-- Grid: <div> cells — no tabindex, no role, no keyboard navigation -->
<div class="cal-cell" onclick="selectDate(...)">17</div>
```

## How to fix it

Use native `<button>` for all interactive controls. Use `<table role="grid">` for the calendar grid with `<td role="gridcell">` for day cells. Implement roving `tabindex` to manage focus. Wire Arrow key navigation.

### After — fixed pattern

```html
<!-- FIX: Native <button> with ARIA state -->
<button id="calendar-toggle" aria-label="Open date picker" aria-haspopup="grid" aria-expanded="false">
  📅
</button>

<!-- FIX: role="dialog" wraps the calendar popup -->
<div id="calendar" role="dialog" aria-label="Date picker" aria-modal="true" hidden>
  <table role="grid" aria-labelledby="cal-heading">
    <thead>
      <tr role="row">
        <th scope="col" abbr="Sunday">Su</th>
        ...
      </tr>
    </thead>
    <tbody>
      <tr role="row">
        <!-- FIX: role="gridcell" with roving tabindex and accessible label -->
        <td role="gridcell" tabindex="-1"
            data-date="2026-04-01"
            aria-label="Wednesday, 1 April 2026">1</td>
        <!-- Only one cell has tabindex="0" — the focused date -->
        <td role="gridcell" tabindex="0"
            data-date="2026-04-17"
            aria-current="date"
            aria-label="Friday, 17 April 2026">17</td>
        ...
      </tr>
    </tbody>
  </table>
</div>
```

## The complete keyboard interaction model

| Key | Action |
|-----|--------|
| `Tab` | Move to the calendar toggle button |
| `Enter` / `Space` | Open the calendar; or select focused date when calendar is open |
| `Arrow Right` | Move focus to next day |
| `Arrow Left` | Move focus to previous day |
| `Arrow Down` | Move focus to same day next week |
| `Arrow Up` | Move focus to same day previous week |
| `Home` | Move focus to Sunday of the current week |
| `End` | Move focus to Saturday of the current week |
| `Page Down` | Move focus to same day next month |
| `Page Up` | Move focus to same day previous month |
| `Escape` | Close calendar without selecting; return focus to toggle button |

## Roving tabindex explained

The calendar grid has up to 35 cells. Making them all `tabindex="0"` would force users to Tab through every date to escape the widget. The roving tabindex pattern solves this:

- Only the **focused date** has `tabindex="0"` — it is reachable from outside the calendar via `Tab`
- All other cells have `tabindex="-1"` — they are focusable by script but skipped by `Tab`
- When the user presses an Arrow key, the script sets `tabindex="-1"` on the current cell, sets `tabindex="0"` on the new cell, and calls `.focus()` on the new cell

This means `Tab` enters the grid at exactly one point, and the user navigates within the grid using Arrow keys — a familiar pattern for any grid-based widget.

## ARIA attributes on day cells

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role="gridcell"` | — | Identifies the cell as a grid item |
| `tabindex="0\|-1"` | roving | Controls which cell is reachable via Tab |
| `data-date` | `YYYY-MM-DD` | Machine-readable date for navigation logic |
| `aria-label` | "Friday, 17 April 2026" | Full date announced by screen readers (overrides the "17" text content which lacks month/year context) |
| `aria-current="date"` | — | Marks today's date |
| `aria-selected="true"` | — | Marks the currently selected date |

## Why `aria-label` on every day cell

The visible text "17" is ambiguous without month and year context. Screen readers announce only what's in the cell — just "17". The `aria-label` attribute replaces the announced content with the full date string: "Friday, 17 April 2026". This gives non-visual users complete information on every cell, not just the focused one.

## WCAG success criterion

**2.1.1 Keyboard — Level A**: All functionality of the content is operable through a keyboard interface. A `<div>`-based calendar with no `tabindex` provides no keyboard mechanism whatsoever.

## Related patterns

- `custom-select-dropdown` — same roving tabindex and Arrow key pattern for a simpler list
- `combobox-autocomplete` — extends the grid approach with a text input for filtering
