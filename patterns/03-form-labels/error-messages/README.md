---
title: "Error Messages — Form Labels"
wcag: "3.3.1 Error Identification, 4.1.3 Status Messages — Level A"
wcag-shorthand: "3.3.1, 4.1.3"
wcag-level: "A"
---

# Pattern: Error Messages — Form Labels

**Category:** Form Labels
**WCAG:** 3.3.1 Error Identification, 4.1.3 Status Messages — Level A

---

## What this pattern demonstrates

How to properly associate error messages with form inputs using `aria-describedby` and `role="alert"` — covering a registration form with validation errors for email, password, and confirm password fields.

---

## Why it matters

When users encounter form errors, they need to understand what went wrong and how to fix it. For screen reader users, error messages that are not programmatically associated with their corresponding inputs are difficult or impossible to locate.

The failure mode is concrete: a blind user submits a form with errors. The screen reader announces "form invalid" or "3 errors" but doesn't indicate which fields have errors or what the errors are. The user must navigate through every field to discover the problems, leading to frustration and potential abandonment.

Proper error messaging with `aria-describedby` and `role="alert"` ensures that screen readers announce errors when they appear and associate them with the relevant form fields. This benefits all users, including those with cognitive disabilities who benefit from clear error descriptions.

---

## WCAG Criterion

**3.3.1 Error Identification — Level A**

> If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.

**4.1.3 Status Messages — Level A**

> In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

Source: [Understanding Success Criterion 3.3.1](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html) | [Understanding Success Criterion 4.1.3](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)

---

## The problem (before)

The `before/` version shows a registration form where error messages are displayed but not programmatically associated with their corresponding inputs.

**Specific failures in `before/index.html`:**

| Element                | Issue                                            | Result                                           |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Email error message    | No `aria-describedby` on input, no `id` on error | Screen reader doesn't associate error with input |
| Password error message | No `aria-describedby` on input, no `id` on error | Screen reader doesn't associate error with input |
| Confirm password error | No `aria-describedby` on input, no `id` on error | Screen reader doesn't associate error with input |

Visually, the form shows error messages below invalid fields. But programmatically, there is no relationship between the error messages and their associated inputs.

---

## The fix (after)

The `after/` version properly associates error messages with their inputs using `aria-describedby` and `role="alert"`.

**Corrected structure in `after/index.html`:**

| Element                | Fix                                                                            | Result                                            |
| ---------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------- |
| Email input            | `aria-describedby="email-error"` + `<div id="email-error" role="alert">`       | Screen reader announces error when focusing input |
| Password input         | `aria-describedby="password-error"` + `<div id="password-error" role="alert">` | Screen reader announces error when focusing input |
| Confirm password input | `aria-describedby="confirm-error"` + `<div id="confirm-error" role="alert">`   | Screen reader announces error when focusing input |

The `aria-describedby` attribute on the input references the `id` of the error message element. The `role="alert"` ensures that screen readers announce the error message when it appears.

---

## Key rules

**1. Associate error messages with inputs using `aria-describedby`.**
The `aria-describedby` attribute on the input should reference the `id` of the error message element. This creates a programmatic relationship that assistive technologies can understand.

**2. Use `role="alert"` on error messages.**
The `role="alert"` attribute ensures that screen readers announce the error message when it appears, even if the user is not focused on that part of the page.

**3. Provide clear, actionable error messages.**
Error messages should describe what went wrong and how to fix it. Avoid generic messages like "Invalid input" — be specific like "Email must include @ symbol".

**4. Display errors visibly and programmatically.**
Error messages should be visually distinct (color, icon, positioning) and programmatically associated with their inputs. Don't rely on color alone to indicate errors.

---

## Design tokens

| Token                     | Value       | Usage                                 |
| ------------------------- | ----------- | ------------------------------------- |
| `spacing.form.gap`        | `1.5rem`    | Vertical spacing between form fields  |
| `spacing.label.bottom`    | `0.5rem`    | Space between label and input         |
| `spacing.error.top`       | `0.5rem`    | Space between input and error message |
| `color.text.label`        | `#1a1a1a`   | Label text color                      |
| `color.text.input`        | `#1a1a1a`   | Input text color                      |
| `color.text.error`        | `#dc2626`   | Error message text color              |
| `color.border.input`      | `#d1d5db`   | Input border color                    |
| `color.border.error`      | `#dc2626`   | Error input border color              |
| `color.bg.error`          | `#fef2f2`   | Error message background color        |
| `border.radius.input`     | `0.375rem`  | Input border radius                   |
| `typography.size.label`   | `0.875rem`  | Label font size                       |
| `typography.weight.label` | `500`       | Label font weight                     |
| `typography.size.error`   | `0.8125rem` | Error message font size               |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/03-form-labels/error-messages
```

Expected test output:

```
✓ before/ has error message violations
✓ after/ has no error message violations
```

You can also verify the pattern manually:

- Open the page in a screen reader (NVDA, JAWS, VoiceOver)
- Submit the form with errors
- Verify that error messages are announced
- Focus on each invalid input and verify that the error is announced

---

## Resources

- [WCAG 3.3.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html)
- [WCAG 4.1.3 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [MDN: aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [A11Y Project: Form Validation](https://www.a11yproject.com/posts/2013-05-11-forms-and-labels/)
