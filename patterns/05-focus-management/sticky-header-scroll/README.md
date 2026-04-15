---
title: "Sticky Header Scroll — Focus Management"
wcag: "2.4.11 Focus Appearance — Level AA"
wcag-shorthand: "2.4.11"
wcag-level: "AA"
---

# Pattern: Sticky Header Scroll — Focus Management

**Category:** Focus Management
**WCAG:** 2.4.11 Focus Appearance — Level AA

---

## What this pattern demonstrates

How to handle focus management when a sticky header covers content, ensuring that focus doesn't jump behind the header when the page scrolls.

---

## Why it matters

Sticky headers are a common pattern for navigation, but they create a significant accessibility problem when not implemented correctly. When a user scrolls down the page, the sticky header covers content, and if a user was focused on an element that's now behind the header, their focus becomes invisible.

For keyboard users, this is particularly problematic. If a user is Tabbing through links in the main content and the sticky header covers them, they may not realize their focus is now hidden. They might continue pressing Tab, thinking they're still navigating through the page, when in reality they're no longer interacting with visible elements.

Screen reader users are also affected. When the sticky header covers focused content, screen readers may announce the header again, interrupting the user's flow and causing confusion.

---

## WCAG Criterion

**2.4.11 Focus Appearance — Level AA**

> A keyboard focus indicator must be visible and have a contrast ratio of at least 3:1 against the adjacent background.

**2.4.3 Focus Order — Level A**

> If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.

Source: [Understanding Success Criterion 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

---

## The problem (before)

The `before/` version shows a sticky header that covers content without managing focus. The issues include:

1. **No scroll position adjustment** — Focus can jump behind the sticky header
2. **No focus restoration** — Focus is not returned to visible element
3. **No header padding** — Content is hidden behind the header
4. **No `scroll-margin-top`** — Browser doesn't account for sticky header

This creates a broken experience where keyboard users lose focus when content is covered by the sticky header.

---

## The fix (after)

The `after/` version implements proper focus management for sticky headers:

1. **`scroll-margin-top`** — Reserves space for the sticky header
2. **Focus restoration** — Focus is moved to a visible element when covered
3. **Header padding** — Ensures content is not hidden behind the header
4. **`scroll-padding-top`** — Alternative approach with CSS padding
5. **Focus trap in header** — Header focus doesn't escape to covered content

---

## Key rules

**1. Use `scroll-margin-top` or `scroll-padding-top`.**
When a sticky header is used, add `scroll-margin-top` to the main content or `scroll-padding-top` to the sticky header. This reserves space for the header so it doesn't cover content.

**2. Monitor scroll position and adjust focus.**
When the sticky header covers a focused element, move focus to a visible element. This can be done with JavaScript or CSS scroll-driven focus management.

**3. Use `position: sticky` correctly.**
The sticky element should have `position: sticky` and a defined `top` value. This ensures the browser knows when the element becomes sticky.

**4. Consider `scroll-driven` focus management.**
For simple cases, CSS `scroll-padding-top` can be sufficient. For complex cases, JavaScript-based focus management may be more reliable.

**5. Test with keyboard navigation.**
Tab through the page and verify that focus never becomes invisible. When the sticky header covers content, focus should move to a visible element.

**6. Ensure focus indicators remain visible.**
Focus indicators must have sufficient contrast against both the sticky header background and any content that appears behind it.

---

## Design tokens

| Token                     | Value     | Usage                               |
| ------------------------- | --------- | ----------------------------------- |
| `color.header.background` | `#ffffff` | Header background                   |
| `color.header.text`       | `#1a1a1a` | Header text color (18.1:1 on white) |
| `color.header.border`     | `#e5e7eb` | Header border color                 |
| `color.focus.ring`        | `#1d4ed8` | Focus ring color (7.22:1 on white)  |
| `spacing.header.height`   | `64px`    | Header height                       |
| `spacing.header.padding`  | `1rem`    | Header padding                      |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/05-focus-management/sticky-header-scroll
```

Expected test output:

```
✓ before/ has focus-management violations
✓ after/ has no focus-management violations
```

### Manual testing checklist:

- [ ] Scroll down the page — verify content doesn't jump behind header
- [ ] Tab through links — verify focus remains visible
- [ ] Focus on a link near the bottom — verify focus doesn't get covered
- [ ] Scroll back up — verify previously focused element is still accessible
- [ ] Use a screen reader — verify focus announcements are correct
- [ ] Test with different viewport heights — verify behavior is consistent

---

## Resources

- [WCAG 2.4.11 Understanding document](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
- [MDN: CSS Scroll-Driven Focus](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_focus)
- [Adrian Roselli: Sticky Headers and Focus](https://adrianroselli.com/2023/scroll-driven-focus-fix/)
