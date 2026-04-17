---
title: Drag and Drop — Keyboard Alternative
category: 06-keyboard-navigation
wcag: "2.1.1 Keyboard"
wcag-shorthand: "2.1.1"
wcag-level: "A"
wcag-criterion: Keyboard
axe-rule: button-name
status: complete
---

# Drag and Drop — Keyboard Alternative

## What the problem is

Drag-and-drop is an entirely pointer-based interaction. The HTML `draggable="true"` attribute signals that an element can be dragged, but it creates no keyboard mechanism whatsoever. Keyboard users cannot initiate a drag, move an item, or drop it — the reordering functionality simply does not exist for them.

### Before — broken pattern

```html
<!-- draggable="true" creates NO keyboard mechanism -->
<li class="task-item" draggable="true">
  Review accessibility audit report
</li>
```

Pressing Tab moves through the page without ever reaching a draggable item. There is no keyboard equivalent to drag, no feedback for screen reader users, and no ARIA attributes communicating the draggable state.

## How to fix it

Keep drag-and-drop working for pointer users. Add visible "Move up" / "Move down" buttons to each item as the keyboard alternative. Announce reorder events via an `aria-live` region.

### After — fixed pattern

```html
<!-- FIX: aria-live announces moves to screen reader users -->
<p id="reorder-status" class="sr-only" aria-live="polite" aria-atomic="true"></p>

<ul aria-label="Task priority list — use arrow buttons to reorder">
  <li draggable="true" data-index="0">
    <span aria-hidden="true">⠿</span>
    Review accessibility audit report
    <!-- FIX: role="group" pairs the two controls, aria-label names the group -->
    <div role="group" aria-label="Reorder Review accessibility audit report">
      <button aria-label="Move 'Review accessibility audit report' up" disabled>↑</button>
      <button aria-label="Move 'Review accessibility audit report' down">↓</button>
    </div>
  </li>
  ...
</ul>
```

When a user activates "Move down" on item 1:
1. The tasks array is updated
2. The list re-renders with the new order
3. The `aria-live` region announces: "Review accessibility audit report moved to position 2 of 5."
4. Focus moves to the same-direction button on the moved item — so the user can keep pressing it without re-navigating.

## Focus management after a move

After activating "Move down" on an item, focus jumps to that item's new position and stays on the "Move down" button. This allows the user to move the same item multiple positions with repeated Space/Enter presses.

If the item reaches the last position (where "Move down" is disabled), focus shifts to "Move up" instead — the user is never stranded on a disabled button.

## Why `disabled` (not `aria-disabled`)

The "Move up" button on the first item and the "Move down" button on the last item have the HTML `disabled` attribute. This:
- Removes them from the Tab order — users do not waste Tab presses on inoperable buttons
- Prevents accidental activation — no need to swallow the click in JavaScript
- Signals the boundary visually (reduced opacity)

`aria-disabled="true"` keeps the element in the Tab order, which is useful when you want to explain *why* an action is unavailable (e.g., via `aria-description`). For boundary buttons with no explanation needed, `disabled` is correct.

## The `aria-live` announcement

The status element uses `aria-live="polite"` (waits for the current utterance to finish) and `aria-atomic="true"` (reads the full text, not just the changed part). The announcement is written before re-rendering the DOM so the screen reader picks it up as a live region change.

## Drag-and-drop still works

The keyboard alternative does not replace drag-and-drop — it supplements it. The `draggable="true"` attribute and drag event handlers remain in the after/ pattern. Pointer users still get the drag experience; keyboard and AT users get the button mechanism.

## WCAG success criterion

**2.1.1 Keyboard — Level A**: All functionality of the content is operable through a keyboard interface. Drag-and-drop with no alternative provides zero keyboard operability for list reordering.

## Related patterns

- `carousel-keyboard` — similar aria-live announcement for state changes
- `accordion-keyboard` — same button-based keyboard interaction for a different component
