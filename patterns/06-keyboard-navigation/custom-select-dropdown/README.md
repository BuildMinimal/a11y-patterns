---
title: Custom Select Dropdown — Keyboard Navigation
category: 06-keyboard-navigation
wcag: "2.1.1 Keyboard"
wcag-shorthand: "2.1.1"
wcag-level: "A"
wcag-criterion: Keyboard
axe-rule: aria-required-attr
status: complete
---

# Custom Select Dropdown — Keyboard Navigation

## What the problem is

A custom dropdown built with `<div>` elements and `onclick` handlers is invisible to keyboard-only users. Because `<div>` is not natively focusable and has no `tabindex`, the Tab key skips past it. There is no keyboard mechanism to open the list, navigate the options, or make a selection.

Mouse users see no difference — the dropdown looks and works fine for them. Keyboard users encounter a silent gap in the UI.

### Before — broken pattern

```html
<!-- Trigger is a <div> — Tab skips it entirely -->
<div class="select-trigger" onclick="toggleDropdown(this)">
  <span class="select-value">Most recent</span>
</div>
<div class="select-menu">
  <div class="select-option" onclick="selectOption(this, 'Most recent')">Most recent</div>
  <div class="select-option" onclick="selectOption(this, 'Most popular')">Most popular</div>
</div>
```

No `tabindex`, no `role`, no `aria-expanded`, no keyboard handler. WCAG 2.1.1 requires all functionality to be operable via keyboard.

## How to fix it: the ARIA listbox pattern

Replace the `<div>` trigger with a native `<button>`. Add the ARIA listbox widget roles and attributes. Wire keyboard events on the listbox container.

### After — fixed pattern

```html
<!-- FIX: Native <button> + ARIA listbox pattern -->
<button
  type="button"
  id="sort-trigger"
  aria-haspopup="listbox"
  aria-expanded="false"
  aria-labelledby="sort-label sort-value"
>
  <span id="sort-value">Most recent</span>
</button>

<ul
  id="sort-listbox"
  role="listbox"
  aria-labelledby="sort-label"
  tabindex="-1"
>
  <li role="option" id="option-0" aria-selected="true"  data-value="Most recent">Most recent</li>
  <li role="option" id="option-1" aria-selected="false" data-value="Most popular">Most popular</li>
  <li role="option" id="option-2" aria-selected="false" data-value="Highest rated">Highest rated</li>
  <li role="option" id="option-3" aria-selected="false" data-value="Alphabetical">Alphabetical</li>
</ul>
```

## The complete keyboard interaction model

| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the trigger button |
| `Space` / `Enter` | Opens the dropdown, moves focus to listbox |
| `Arrow Down` | Moves highlight to next option |
| `Arrow Up` | Moves highlight to previous option |
| `Enter` / `Space` (listbox) | Selects highlighted option, closes, returns focus to trigger |
| `Escape` | Closes without selecting, returns focus to trigger |
| `Home` | Moves highlight to first option |
| `End` | Moves highlight to last option |

## ARIA roles and attributes explained

| Attribute | Where | Purpose |
|-----------|-------|---------|
| `aria-haspopup="listbox"` | `<button>` | Tells AT this button opens a listbox widget |
| `aria-expanded="false\|true"` | `<button>` | Communicates open/closed state |
| `aria-labelledby="label-id value-id"` | `<button>` | Reads as "Sort by: Most recent" |
| `role="listbox"` | `<ul>` | Identifies the options container |
| `tabindex="-1"` | `<ul>` | Allows programmatic focus without entering Tab order |
| `aria-activedescendant` | `<ul>` | Points to the currently highlighted option's id |
| `role="option"` | `<li>` | Each selectable item |
| `aria-selected="true\|false"` | `<li>` | Which option is currently selected |

## Two distinct visual states

The pattern uses two CSS classes with different meanings:

- **`select-option--selected`** — the currently *chosen* value (blue background). Persists when the dropdown is closed.
- **`select-option--active`** — the keyboard-highlighted item during navigation (outlined). Changes as the user presses Arrow keys. Does not change the selected value until Enter is pressed.

Keeping these visually distinct prevents confusion when a user navigates to an option without selecting it.

## Why `tabindex="-1"` on the listbox

The listbox receives programmatic focus via `listbox.focus()` when the dropdown opens. `tabindex="-1"` makes it focusable by script without adding it to the natural Tab sequence — users Tab to the trigger button, not directly to the list.

Without `tabindex="-1"`, Safari will not allow `focus()` to work on a non-interactive element.

## Why `aria-activedescendant` instead of moving focus between options

The roving `tabindex` pattern moves DOM focus to each `<li>` as the user arrows through. `aria-activedescendant` keeps DOM focus on the listbox container and updates a pointer attribute. Both approaches satisfy WCAG, but `aria-activedescendant` is preferred for listboxes because:

- It avoids scroll-jumping caused by repeated `focus()` calls on list items
- It keeps all keyboard events in one handler on the listbox
- It is the pattern used by native `<select>` in accessibility tree terms

## WCAG success criterion

**2.1.1 Keyboard — Level A**: All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes. A custom dropdown with no keyboard access fails this criterion entirely.

## Related patterns

- `combobox-autocomplete` — extends the listbox pattern with a text input for filtering
- `accordion-keyboard` — similar Enter/Space/Escape model for disclosure widgets
