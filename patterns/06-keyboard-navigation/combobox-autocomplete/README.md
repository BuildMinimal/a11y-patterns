---
title: Combobox Autocomplete
category: 06-keyboard-navigation
wcag: "4.1.2 Name, Role, Value"
wcag-shorthand: "4.1.2"
wcag-level: "A"
wcag-criterion: Name, Role, Value
axe-rule: aria-required-attr
status: complete
---

# Combobox Autocomplete

## What the problem is

An autocomplete built from a plain `<input>` and a `<div>` suggestion list has no keyboard navigation. Keyboard users can type and trigger the suggestion list, but they cannot move through the options or select one — the suggestions are `<div>` elements with no tabindex and no ARIA semantics. Screen readers also receive no information about whether the popup is open or which option is highlighted.

### Before — broken pattern

```html
<!-- BROKEN: no role, no aria-expanded, no aria-controls -->
<input type="text" id="fw-input" />
<!-- BROKEN: <div> options — not keyboard reachable, no ARIA semantics -->
<div id="suggestions">
  <div class="suggestion-item" onclick="select('React')">React</div>
</div>
```

## How to fix it

Apply the WAI-ARIA combobox pattern: add `role="combobox"` to the input with `aria-expanded`, `aria-controls`, and `aria-activedescendant`. Render options as `<li role="option">` inside a `<ul role="listbox">`. Wire Arrow keys, Enter, and Escape to navigate and select.

### After — fixed pattern

```html
<!-- FIX: role="combobox" + required ARIA attributes -->
<input
  role="combobox"
  aria-autocomplete="list"
  aria-expanded="false"
  aria-controls="fw-listbox"
  aria-activedescendant=""
/>

<!-- FIX: role="listbox" popup with role="option" children -->
<ul id="fw-listbox" role="listbox" aria-label="Framework suggestions" hidden>
  <li role="option" id="fw-opt-0" aria-selected="false">React</li>
  <li role="option" id="fw-opt-1" aria-selected="false">Remix</li>
</ul>
```

## ARIA attributes in detail

| Attribute | Where | Purpose |
|-----------|-------|---------|
| `role="combobox"` | `<input>` | Announces the widget type |
| `aria-expanded` | `<input>` | `"true"` when listbox is visible |
| `aria-autocomplete="list"` | `<input>` | Indicates that a filtered list of suggestions appears |
| `aria-controls` | `<input>` | Points to the listbox `id` |
| `aria-activedescendant` | `<input>` | ID of the currently highlighted option; empty when none |
| `role="listbox"` | `<ul>` | Marks the popup as a selectable list |
| `role="option"` | `<li>` | Marks each item as a selectable option |
| `aria-selected` | `<li>` | `"true"` on the previously confirmed value |

## Keyboard interaction

| Key | Action |
|-----|--------|
| `ArrowDown` | Open listbox (if closed) and move to next option |
| `ArrowUp` | Move to previous option |
| `Enter` | Confirm the active option; close listbox |
| `Escape` | Close listbox without confirming |
| `Home` | Move to first option |
| `End` | Move to last option |
| `Tab` | Move focus out of the combobox (listbox closes) |

## `aria-activedescendant` vs. moving DOM focus

DOM focus stays on the `<input>` throughout keyboard navigation. `aria-activedescendant` tells screen readers which option is currently highlighted, without removing focus from the input. This keeps the user typing in the input while AT announces the active option.

This is the correct approach for comboboxes — moving focus to `<li>` elements would disconnect the user from the input and break the typing flow.

## Why `mousedown.prevent` on options

Option click handlers use `mousedown` (not `click`) with `event.preventDefault()`. This prevents the input's `blur` event from firing before the selection completes — if `blur` fired first, the listbox would close and the click would miss its target.

## WCAG success criteria

**4.1.2 Name, Role, Value — Level A**: Custom interface components must expose their name, role, and value programmatically. A plain `<div>` suggestion list has no role and no state — screen readers receive nothing.

**2.1.1 Keyboard — Level A**: All functionality operable through a keyboard. Without ARIA keyboard handling, the suggestions are mouse-only.

## Related patterns

- `custom-select-dropdown` — same `role="listbox"` / `role="option"` pattern for a non-editable select
- `data-table-navigation` — same `aria-activedescendant`-style focus pattern applied to a grid
