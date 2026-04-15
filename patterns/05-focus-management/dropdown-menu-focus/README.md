---
title: "Dropdown Menu Focus — Focus Management"
wcag: "2.1.1 Keyboard — Level A"
wcag-shorthand: "2.1.1"
wcag-level: "A"
---

# Pattern: Dropdown Menu Focus — Focus Management

**Category:** Focus Management
**WCAG:** 2.1.1 Keyboard — Level A

---

## What this pattern demonstrates

How to implement a custom dropdown menu with proper keyboard navigation, including Arrow key navigation, Enter/Space to activate items, and Escape to close.

---

## Why it matters

Custom dropdown menus are a common pattern in modern web applications, but they are frequently inaccessible to keyboard users. When a dropdown is opened with a keyboard, users expect to navigate through the menu items using Arrow keys, activate items with Enter or Space, and close the menu with Escape.

Without proper keyboard navigation, keyboard users cannot access the dropdown's functionality at all. They may be able to open the menu, but they cannot select items or navigate through options. This is a complete failure of the component's purpose for keyboard-only users.

Screen reader users are also affected. Without proper ARIA attributes and focus management, screen readers may not announce the menu items correctly, or may not indicate that a menu is open at all.

---

## WCAG Criterion

**2.1.1 Keyboard — Level A**

> All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.

**2.4.3 Focus Order — Level A**

> If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.

Source: [Understanding Success Criterion 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)

---

## The problem (before)

The `before/` version shows a dropdown menu that opens but does not implement proper keyboard navigation. The issues include:

1. **No Arrow key navigation** — Arrow keys do not move focus between menu items
2. **No Enter/Space activation** — Pressing Enter or Space does not activate menu items
3. **No Escape key handling** — Pressing Escape does not close the dropdown
4. **No focus trapping** — Tab can move focus out of the dropdown while it's open
5. **Missing ARIA attributes** — No `aria-expanded`, `aria-haspopup`, or menu roles

This creates a broken experience where keyboard users can open the menu but cannot interact with it.

---

## The fix (after)

The `after/` version implements complete keyboard navigation for the dropdown:

1. **Arrow key navigation** — ArrowDown/ArrowUp moves focus through menu items
2. **Enter/Space activation** — Pressing Enter or Space activates the selected item
3. **Escape key handling** — Pressing Escape closes the dropdown and returns focus to trigger
4. **Focus trapping** — Tab cycles within the dropdown while open
5. **Proper ARIA attributes** — `aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`

---

## Key rules

**1. Use Arrow keys for menu navigation.**
When a menu is open, ArrowDown should move to the next item, and ArrowUp should move to the previous item. Home/End should jump to the first/last item.

**2. Allow Enter or Space to activate items.**
Both Enter and Space should activate the currently focused menu item. This is consistent with standard button behavior.

**3. Handle Escape to close the menu.**
Pressing Escape should close the menu and return focus to the trigger button.

**4. Trap focus within the menu while open.**
While the menu is open, Tab should cycle focus within the menu items, not escape to other page elements.

**5. Use proper ARIA attributes.**

- `aria-haspopup="menu"` on the trigger button
- `aria-expanded="true/false"` to indicate menu state
- `role="menu"` on the menu container
- `role="menuitem"` on each menu item
- `role="separator"` for visual separators (if present)

**6. Return focus to the trigger on close.**
When the menu closes, focus should return to the trigger button so the user can continue from where they started.

---

## Design tokens

| Token                       | Value     | Usage                                 |
| --------------------------- | --------- | ------------------------------------- |
| `color.dropdown.background` | `#ffffff` | Dropdown menu background              |
| `color.dropdown.border`     | `#e5e7eb` | Dropdown menu border                  |
| `color.dropdown.text`       | `#1a1a1a` | Dropdown text color (18.1:1 on white) |
| `color.dropdown.hover`      | `#f3f4f6` | Dropdown hover background             |
| `color.focus.ring`          | `#1d4ed8` | Focus ring color (7.22:1 on white)    |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/05-focus-management/dropdown-menu-focus
```

Expected test output:

```
✓ before/ has focus-management violations
✓ after/ has no focus-management violations
```

### Manual testing checklist:

- [ ] Press Tab to move to the dropdown trigger button
- [ ] Press Enter, Space, or ArrowDown to open the dropdown
- [ ] Verify focus moves to the first menu item
- [ ] Press ArrowDown — focus should move to the next item
- [ ] Press ArrowUp — focus should move to the previous item
- [ ] Press Home — focus should move to the first item
- [ ] Press End — focus should move to the last item
- [ ] Press Enter or Space — the focused item should activate
- [ ] Press Escape — dropdown should close and focus should return to trigger
- [ ] Use a screen reader — verify menu items are announced correctly

---

## Resources

- [WCAG 2.1.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WAI-ARIA Authoring Practices: Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/)
- [MDN: Keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)
