---
title: "Modal Dialog Focus Trap — Focus Management"
wcag: "2.4.3 Focus Order — Level A"
wcag-shorthand: "2.4.3"
wcag-level: "A"
---

# Pattern: Modal Dialog Focus Trap — Focus Management

**Category:** Focus Management
**WCAG:** 2.4.3 Focus Order — Level A

---

## What this pattern demonstrates

How to implement a modal dialog that traps keyboard focus within the dialog while open, returns focus to the trigger element when closed, and manages focus restoration for keyboard-only users.

---

## Why it matters

When a modal opens, keyboard users expect to interact with it and then return to where they were. Without a focus trap, pressing Tab can move focus behind the modal to elements that are visually obscured or functionally disabled. This creates a confusing experience where users cannot interact with the modal and cannot return to the page content.

Screen reader users are especially affected. When focus escapes a modal, they may not realize the modal is still open, leading to disorientation. A proper focus trap ensures they can complete the modal's task and return to the context they came from.

---

## WCAG Criterion

**2.4.3 Focus Order — Level A**

> If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.

**2.1.2 No Keyboard Trap — Level A**

> If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab key or other standard exit methods, the user is advised of the method for moving focus away.

Source: [Understanding Success Criterion 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)

---

## The problem (before)

The `before/` version shows a modal that opens but does not implement a focus trap. The issues include:

1. **No focus trapping** — Tab key can move focus to elements behind the modal
2. **No focus restoration** — When the modal closes, focus is not returned to the trigger button
3. **No initial focus** — When the modal opens, focus is not moved to the modal
4. **No escape key handling** — Pressing Escape does not close the modal

This creates a broken experience where keyboard users cannot properly interact with the modal or return to the page content.

---

## The fix (after)

The `after/` version implements a complete focus trap with:

1. **Focus trapping** — Tab cycles focus within the modal, Shift+Tab cycles backward
2. **Focus restoration** — When the modal closes, focus returns to the trigger button
3. **Initial focus** — When the modal opens, focus moves to the first focusable element
4. **Escape key handling** — Pressing Escape closes the modal
5. **Background inert** — The page behind the modal is marked with `aria-hidden="true"`

---

## Key rules

**1. Always trap focus in a modal.**
When a modal is open, Tab and Shift+Tab must cycle focus only within the modal. Focus must never escape to elements behind the modal.

**2. Return focus to the trigger on close.**
Store the element that opened the modal and return focus to it when the modal closes. This preserves the user's context.

**3. Set initial focus on modal open.**
When a modal opens, move focus to the first focusable element (usually the close button, cancel button, or first input). If the modal is purely informational, focus the modal container itself.

**4. Handle the Escape key.**
Pressing Escape should close the modal. This is a standard pattern that users expect.

**5. Mark the background as inert.**
Add `aria-hidden="true"` to the page content behind the modal so screen readers don't announce it while the modal is open.

**6. Use the correct ARIA attributes.**

- `role="dialog"` on the modal container
- `aria-modal="true"` to indicate it's a modal
- `aria-labelledby` pointing to the modal title
- `aria-describedby` pointing to the modal description (if present)

---

## Design tokens

| Token                    | Value                | Usage                              |
| ------------------------ | -------------------- | ---------------------------------- |
| `color.modal.overlay`    | `rgba(0, 0, 0, 0.5)` | Modal backdrop background          |
| `color.modal.background` | `#ffffff`            | Modal container background         |
| `color.modal.text`       | `#1a1a1a`            | Modal text color (18.1:1 on white) |
| `color.modal.border`     | `#e5e7eb`            | Modal border color                 |
| `color.focus.ring`       | `#1d4ed8`            | Focus ring color (7.22:1 on white) |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/05-focus-management/modal-dialog-focus-trap
```

Expected test output:

```
✓ before/ has focus-management violations
✓ after/ has no focus-management violations
```

### Manual testing checklist:

- [ ] Press Tab to move to the "Open Modal" button
- [ ] Press Enter or Space to open the modal
- [ ] Verify focus moves to the first focusable element in the modal
- [ ] Press Tab repeatedly — focus should cycle within the modal only
- [ ] Press Shift+Tab repeatedly — focus should cycle backward within the modal only
- [ ] Press Escape — modal should close
- [ ] Verify focus returns to the "Open Modal" button
- [ ] Use a screen reader — verify only modal content is announced when open

---

## Resources

- [WCAG 2.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [WAI-ARIA Authoring Practices: Dialog Modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/)
- [MDN: Focus Management](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)
- [focus-trap library](https://github.com/focus-trap/focus-trap) — Production-ready focus trap implementation
