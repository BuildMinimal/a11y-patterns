---
title: "Tab Panel Focus — Focus Management"
wcag: "2.4.3 Focus Order — Level A"
wcag-shorthand: "2.4.3"
wcag-level: "A"
---

# Pattern: Tab Panel Focus — Focus Management

**Category:** Focus Management
**WCAG:** 2.4.3 Focus Order — Level A

---

## What this pattern demonstrates

How to implement a tab component with proper keyboard navigation, including Arrow key navigation between tabs, Tab to move focus into the panel, and proper ARIA attributes for screen readers.

---

## Why it matters

Tab components are a common pattern for organizing content into separate views. However, they are frequently implemented without proper keyboard navigation, making them completely inaccessible to keyboard-only users.

When a keyboard user navigates to a tab list, they expect to use Arrow keys to move between tabs, not Tab. Tab should move focus from the tab list into the active panel's content. Without this behavior, users cannot efficiently navigate between tabs or access the panel content.

Screen reader users are also affected. Without proper ARIA attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`, and the appropriate `aria-selected`, `aria-controls`, and `aria-labelledby` relationships), screen readers cannot announce which tab is active or properly navigate between tabs and their associated panels.

---

## WCAG Criterion

**2.4.3 Focus Order — Level A**

> If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.

**1.3.1 Info and Relationships — Level A**

> Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.

Source: [Understanding Success Criterion 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)

---

## The problem (before)

The `before/` version shows a tab component that switches panels but does not implement proper keyboard navigation. The issues include:

1. **No Arrow key navigation** — Arrow keys do not move focus between tabs
2. **Tab moves to next tab instead of into panel** — Tab should move focus into the active panel
3. **Missing ARIA attributes** — No `role="tablist"`, `role="tab"`, `role="tabpanel"`
4. **No `aria-selected` state** — Screen readers cannot determine which tab is active
5. **No `aria-controls` relationship** — No link between tabs and their panels

This creates a broken experience where keyboard users cannot efficiently navigate between tabs.

---

## The fix (after)

The `after/` version implements complete keyboard navigation for tabs:

1. **Arrow key navigation** — ArrowLeft/ArrowRight moves focus between tabs
2. **Tab moves into panel** — Tab moves focus from tab list into the active panel
3. **Proper ARIA attributes** — `role="tablist"`, `role="tab"`, `role="tabpanel"`
4. **`aria-selected` state** — Indicates which tab is currently active
5. **`aria-controls` relationship** — Links tabs to their associated panels
6. **`aria-labelledby` relationship** — Links panels to their associated tabs

---

## Key rules

**1. Use Arrow keys for tab navigation.**
When focus is on a tab, ArrowLeft/ArrowRight should move focus to the previous/next tab. Home/End should jump to the first/last tab.

**2. Tab should move focus into the panel.**
When focus is on a tab, pressing Tab should move focus into the associated panel's content, not to the next tab.

**3. Use proper ARIA roles.**

- `role="tablist"` on the tab container
- `role="tab"` on each tab button
- `role="tabpanel"` on each panel container

**4. Maintain `aria-selected` state.**
The active tab should have `aria-selected="true"` and all other tabs should have `aria-selected="false"`.

**5. Link tabs to panels with `aria-controls`.**
Each tab should have an `aria-controls` attribute pointing to the ID of its associated panel.

**6. Link panels to tabs with `aria-labelledby`.**
Each panel should have an `aria-labelledby` attribute pointing to the ID of its associated tab.

---

## Design tokens

| Token                         | Value     | Usage                                   |
| ----------------------------- | --------- | --------------------------------------- |
| `color.tab.background`        | `#ffffff` | Tab button background                   |
| `color.tab.border`            | `#e5e7eb` | Tab button border                       |
| `color.tab.text`              | `#4a5568` | Tab button text color (5.74:1 on white) |
| `color.tab.active.background` | `#1d4ed8` | Active tab background                   |
| `color.tab.active.text`       | `#ffffff` | Active tab text color (7.22:1 on blue)  |
| `color.panel.background`      | `#ffffff` | Panel background                        |
| `color.focus.ring`            | `#1d4ed8` | Focus ring color (7.22:1 on white)      |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/05-focus-management/tab-panel-focus
```

Expected test output:

```
✓ before/ has focus-management violations
✓ after/ has no focus-management violations
```

### Manual testing checklist:

- [ ] Press Tab to move to the first tab
- [ ] Press ArrowRight — focus should move to the next tab
- [ ] Press ArrowLeft — focus should move to the previous tab
- [ ] Press Home — focus should move to the first tab
- [ ] Press End — focus should move to the last tab
- [ ] Press Enter or Space — the focused tab should become active
- [ ] Press Tab — focus should move into the active panel's content
- [ ] Press Shift+Tab from panel — focus should return to the active tab
- [ ] Use a screen reader — verify tab states and panel relationships are announced correctly

---

## Resources

- [WCAG 2.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [WAI-ARIA Authoring Practices: Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [MDN: Keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)
