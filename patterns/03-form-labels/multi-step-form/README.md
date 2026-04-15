---
title: "Multi-Step Form — Form Labels"
wcag: "2.4.3 Focus Order, 4.1.3 Status Messages — Level A"
wcag-shorthand: "2.4.3, 4.1.3"
wcag-level: "A"
---

# Pattern: Multi-Step Form — Form Labels

**Category:** Form Labels
**WCAG:** 2.4.3 Focus Order, 4.1.3 Status Messages — Level A

---

## What this pattern demonstrates

How to provide proper progress indication in multi-step forms — covering a checkout process with clear step indicators, current step highlighting, and progress announcements for screen reader users.

---

## Why it matters

Multi-step forms break complex processes into manageable chunks, but without proper progress indication, users can lose context about where they are in the process and how much remains. This is especially challenging for screen reader users and users with cognitive disabilities.

The failure mode is concrete: a blind user navigates through a multi-step checkout form. They complete step 1 and are taken to step 2, but there's no indication that they've moved to a new step or what step they're on. They have no way of knowing how many steps remain or if they've made progress.

Proper progress indication with step numbers, visual highlighting, and ARIA announcements ensures all users understand their position in the process and can track their progress.

---

## WCAG Criterion

**2.4.3 Focus Order — Level A**

> If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.

**4.1.3 Status Messages — Level A**

> In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to user by assistive technologies without receiving focus.

Source: [Understanding Success Criterion 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html) | [Understanding Success Criterion 4.1.3](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)

---

## The problem (before)

The `before/` version shows a multi-step form where there's no clear indication of current step, progress, or how many steps remain.

**Specific failures in `before/index.html`:**

| Element         | Issue                                                | Result                                     |
| --------------- | ---------------------------------------------------- | ------------------------------------------ |
| Step indicators | No visual or programmatic indication of current step | Users can't tell which step is active      |
| Progress bar    | No indication of overall progress                    | Users can't see how far they've come       |
| Step changes    | No ARIA announcement when moving between steps       | Screen readers don't announce step changes |

Visually, the form appears to have multiple steps, but there's no way for users to understand their position in the process or track their progress.

---

## The fix (after)

The `after/` version provides clear step indicators, progress tracking, and ARIA announcements for step changes.

**Corrected structure in `after/index.html`:**

| Element         | Fix                                                    | Result                                   |
| --------------- | ------------------------------------------------------ | ---------------------------------------- |
| Step indicators | Numbered steps with current/complete/incomplete states | Users can see which step is active       |
| Progress bar    | Visual indicator of overall progress                   | Users can see how far they've come       |
| Step changes    | `aria-live` region announces changes                   | Screen readers announce step transitions |

The step indicators use `aria-current="step"` to mark the active step, and `aria-live` regions announce when users move between steps.

---

## Key rules

**1. Provide clear step indicators for multi-step forms.**
Use numbered steps or progress bars to show users where they are in the process. Make the current step visually distinct from completed and upcoming steps.

**2. Use `aria-current="step"` to indicate the active step.**
The `aria-current="step"` attribute on the active step indicator helps screen readers understand which step is currently active.

**3. Use `aria-live` regions to announce step changes.**
When users move between steps, use an `aria-live` region to announce the change to screen readers. This ensures users are informed of progress without losing focus.

**4. Provide a progress bar or percentage indicator.**
Show users how far they've come in the process. This helps users with cognitive disabilities understand the scope of the task and track their progress.

---

## Design tokens

| Token                      | Value      | Usage                                  |
| -------------------------- | ---------- | -------------------------------------- |
| `spacing.form.gap`         | `2rem`     | Vertical spacing between form sections |
| `spacing.step.gap`         | `1rem`     | Spacing between step indicators        |
| `color.text.step`          | `#1a1a1a`  | Step text color                        |
| `color.text.step-inactive` | `#6b7280`  | Inactive step text color               |
| `color.bg.step-active`     | `#1d4ed8`  | Active step background color           |
| `color.bg.step-complete`   | `#10b981`  | Complete step background color         |
| `color.bg.progress`        | `#e5e7eb`  | Progress bar background color          |
| `color.bg.progress-fill`   | `#1d4ed8`  | Progress bar fill color                |
| `border.radius.step`       | `0.5rem`   | Step indicator border radius           |
| `typography.size.step`     | `0.875rem` | Step font size                         |
| `typography.weight.step`   | `500`      | Step font weight                       |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/03-form-labels/multi-step-form
```

Expected test output:

```
✓ before/ has multi-step form violations
✓ after/ has no multi-step form violations
```

You can also verify the pattern manually:

- Open the page in a screen reader (NVDA, JAWS, VoiceOver)
- Navigate through the form steps
- Verify that step changes are announced
- Verify that the current step is visually distinct

---

## Resources

- [WCAG 2.4.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)
- [WCAG 4.1.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [MDN: aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
- [MDN: aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [A11Y Project: Multi-Step Forms](https://www.a11yproject.com/posts/2013-05-11-forms-and-labels/)
