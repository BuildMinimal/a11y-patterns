---
title: "Infinite Scroll Focus — Focus Management"
wcag: "2.4.3 Focus Order — Level A"
wcag-shorthand: "2.4.3"
wcag-level: "A"
---

# Pattern: Infinite Scroll Focus — Focus Management

**Category:** Focus Management
**WCAG:** 2.4.3 Focus Order — Level A

---

## What this pattern demonstrates

How to maintain focus context when new content is dynamically loaded via infinite scroll, ensuring keyboard users don't lose their place in the document.

---

## Why it matters

Infinite scroll is a common pattern for loading more content as the user scrolls. When new content is loaded above the current scroll position, the page height changes and focus can be lost or displaced.

For keyboard users, this is particularly problematic. If a user is focused on an element and new content loads above it, the focus may no longer be visible or may be pushed down the page. This breaks the user's workflow and can be disorienting.

Screen reader users are also affected. When new content is inserted into the DOM, screen readers may announce it, potentially interrupting the user's current reading context. Proper focus management ensures that new content is announced appropriately without disrupting the user's flow.

---

## WCAG Criterion

**2.4.3 Focus Order — Level A**

> If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.

Source: [Understanding Success Criterion 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)

---

## The problem (before)

The `before/` version shows an infinite scroll that loads content but does not manage focus. The issues include:

1. **No focus preservation** — Focus is lost when new content loads above the current position
2. **No focus restoration** — User cannot return to their previous focus after content loads
3. **No scroll position management** — Content loading causes scroll position to jump
4. **No announcement strategy** — Screen readers may not announce new content appropriately

This creates a broken experience where keyboard users lose their place in the document when new content loads.

---

## The fix (after)

The `after/` version implements proper focus management for infinite scroll:

1. **Focus preservation** — Focus is maintained when new content loads
2. **Scroll position preservation** — User's scroll position is maintained
3. **Optional focus restoration** — User can return to previous focus if desired
4. **Content announcement** — New content is announced to screen readers
5. **Loading indicator** — Visual indicator shows when content is loading

---

## Key rules

**1. Preserve focus when content loads.**
When new content is inserted into the DOM, the currently focused element should remain focused. Do not remove and re-add the focused element.

**2. Maintain scroll position.**
When new content loads above the current scroll position, the scroll position should be adjusted so the user's view remains stable.

**3. Use `aria-live` for content announcements.**
Add `aria-live="polite"` to the container where new content will be inserted. This announces new content to screen readers without interrupting.

**4. Provide a loading indicator.**
Show a visual indicator when content is loading so users understand what's happening.

**5. Consider focus restoration for content above.**
If new content loads above the currently focused element, consider moving focus to the nearest equivalent element in the new content.

**6. Use `aria-busy` for loading state.**
When content is loading, set `aria-busy="true"` on the container. Set it to `false"` when loading completes.

---

## Design tokens

| Token                      | Value     | Usage                                     |
| -------------------------- | --------- | ----------------------------------------- |
| `color.card.background`    | `#ffffff` | Card background                           |
| `color.card.text`          | `#1a1a1a` | Card text color (18.1:1 on white)         |
| `color.card.border`        | `#e5e7eb` | Card border color                         |
| `color.loading.background` | `#f3f4f6` | Loading indicator background              |
| `color.loading.text`       | `#4a5568` | Loading text color (5.74:1 on light gray) |
| `color.focus.ring`         | `#1d4ed8` | Focus ring color (7.22:1 on white)        |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/05-focus-management/infinite-scroll-focus
```

Expected test output:

```
✓ before/ has focus-management violations
✓ after/ has no focus-management violations
```

### Manual testing checklist:

- [ ] Scroll down to trigger content loading
- [ ] Verify focus is maintained when new content loads
- [ ] Verify scroll position is stable when new content loads
- [ ] Use a screen reader — verify new content is announced appropriately
- [ ] Verify loading indicator appears and disappears
- [ ] Tab through content — verify focus order is logical
- [ ] Scroll back up — verify previously focused element is still accessible

---

## Resources

- [WCAG 2.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [Infinite Scroll Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
