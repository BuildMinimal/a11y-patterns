---
title: "Toast Notifications — Focus Management"
wcag: "4.1.3 Status Messages — Level A"
wcag-shorthand: "4.1.3"
wcag-level: "A"
---

# Pattern: Toast Notifications — Focus Management

**Category:** Focus Management
**WCAG:** 4.1.3 Status Messages — Level A

---

## What this pattern demonstrates

How to implement non-blocking toast notifications that announce their content to screen readers using `aria-live` regions without stealing focus from the user.

---

## Why it matters

Toast notifications are a common pattern for displaying brief, non-critical messages (success messages, errors, warnings). When implemented incorrectly, they can be completely invisible to screen reader users or can steal focus, disrupting the user's workflow.

Screen readers rely on `aria-live` regions to announce dynamic content changes. Without `aria-live`, a toast notification will never be announced to screen reader users, making them unaware of important information.

Additionally, toast notifications should never steal focus. They are non-blocking by design — the user should be able to continue their current task without interruption. If a toast steals focus, it breaks the user's flow and can be frustrating.

---

## WCAG Criterion

**4.1.3 Status Messages — Level A**

> In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user without receiving focus.

Source: [Understanding Success Criterion 4.1.3](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)

---

## The problem (before)

The `before/` version shows a toast notification that appears but does not announce to screen readers. The issues include:

1. **No `aria-live` region** — Screen readers cannot announce the toast
2. **No `role="alert"`** — No semantic indication that this is an alert message
3. **No `aria-atomic="true"`** — Screen readers may not read the complete message
4. **No auto-dismiss** — Toast stays on screen indefinitely
5. **No focus management** — Toast may steal focus when appearing

This creates an experience where screen reader users never know the toast appeared.

---

## The fix (after)

The `after/` version implements proper toast announcements:

1. **`aria-live="polite"`** — Announces toast when user is idle
2. **`role="alert"`** — Indicates this is an alert message
3. **`aria-atomic="true"`** — Ensures complete message is read
4. **Auto-dismiss** — Toast automatically disappears after a timeout
5. **No focus stealing** — Toast never steals focus from the user
6. **Manual dismiss option** — User can dismiss toast with a button

---

## Key rules

**1. Use `aria-live` for dynamic content.**
Use `aria-live="polite"` for non-critical messages that can wait until the user is idle. Use `aria-live="assertive"` for critical messages that need immediate attention.

**2. Never steal focus.**
Toast notifications should never receive focus. They are non-blocking by design. If a user needs to interact with the toast, provide a dismiss button that can be reached via Tab navigation.

**3. Use `aria-atomic="true"` for complete messages.**
This ensures that screen readers read the entire message as a unit, not character by character as it appears.

**4. Use `role="alert"` for alert messages.**
This provides semantic meaning to assistive technologies and helps screen readers understand the purpose of the content.

**5. Provide a way to dismiss the toast.**
Include a dismiss button that users can activate with keyboard (Enter/Space) or mouse. Also provide auto-dismiss after a reasonable timeout.

**6. Consider `aria-live="assertive"` for critical messages.**
For errors or other critical information that needs immediate attention, use `aria-live="assertive"` instead of `"polite"`.

---

## Design tokens

| Token                            | Value     | Usage                              |
| -------------------------------- | --------- | ---------------------------------- |
| `color.toast.background`         | `#1a1a1a` | Toast background (dark)            |
| `color.toast.text`               | `#ffffff` | Toast text color (18.1:1 on dark)  |
| `color.toast.success.background` | `#059669` | Success toast background           |
| `color.toast.error.background`   | `#dc2626` | Error toast background             |
| `color.toast.warning.background` | `#d97706` | Warning toast background           |
| `color.toast.info.background`    | `#2563eb` | Info toast background              |
| `color.focus.ring`               | `#1d4ed8` | Focus ring color (7.22:1 on white) |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/05-focus-management/toast-notifications
```

Expected test output:

```
✓ before/ has focus-management violations
✓ after/ has no focus-management violations
```

### Manual testing checklist:

- [ ] Trigger a toast notification
- [ ] Verify toast appears on screen
- [ ] Verify focus does NOT move to the toast
- [ ] Use a screen reader — verify toast content is announced
- [ ] Press Tab — verify you can navigate to the dismiss button
- [ ] Press Enter/Space on dismiss button — verify toast closes
- [ ] Wait for auto-dismiss — verify toast disappears after timeout
- [ ] Trigger multiple toasts — verify they stack properly
- [ ] Verify toasts don't steal focus from the main content

---

## Resources

- [WCAG 4.1.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [MDN: aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live)
