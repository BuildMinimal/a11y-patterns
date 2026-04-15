# Pattern: Autocomplete Attributes — Form Labels

**Category:** Form Labels
**WCAG:** 1.3.5 Identify Input Purpose — Level AA

---

## What this pattern demonstrates

How to use the `autocomplete` attribute to help users fill out forms more efficiently — covering a registration form with personal information fields like name, email, phone, and address.

---

## Why it matters

The `autocomplete` attribute helps users with motor disabilities, cognitive disabilities, and anyone who wants to fill out forms more quickly. When browsers and password managers can understand what information each field expects, they can auto-fill data, reducing typing and cognitive load.

The failure mode is concrete: a user with limited hand mobility encounters a registration form with no autocomplete attributes. They must manually type every field, including their full name, email, phone number, and address — a slow and painful process. With proper autocomplete attributes, their browser can fill all fields with a single action.

Autocomplete also helps users with cognitive disabilities who may struggle to remember information, and users with dyslexia who benefit from reduced typing.

---

## WCAG Criterion

**1.3.5 Identify Input Purpose — Level AA**

> The purpose of each input field collecting information about the user can be programmatically determined when:
>
> - The input field serves a purpose identified in the Input Purposes for User Interface Components section; and
> - The content is implemented using technologies with support for identifying the expected meaning for form input data.

Source: [Understanding Success Criterion 1.3.5](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html)

---

## The problem (before)

The `before/` version shows a registration form where personal information fields have no `autocomplete` attributes, making it difficult for browsers and password managers to understand what information is expected.

**Specific failures in `before/index.html`:**

| Element        | Issue             | Result                          |
| -------------- | ----------------- | ------------------------------- |
| Name input     | No `autocomplete` | Browser can't auto-fill name    |
| Email input    | No `autocomplete` | Browser can't auto-fill email   |
| Phone input    | No `autocomplete` | Browser can't auto-fill phone   |
| Address inputs | No `autocomplete` | Browser can't auto-fill address |

Visually, the form appears complete. But programmatically, there's no indication of what type of information each field expects.

---

## The fix (after)

The `after/` version adds appropriate `autocomplete` attributes to help browsers and password managers understand what information is expected.

**Corrected structure in `after/index.html`:**

| Element      | Fix                             | Result                            |
| ------------ | ------------------------------- | --------------------------------- |
| Name input   | `autocomplete="name"`           | Browser can auto-fill name        |
| Email input  | `autocomplete="email"`          | Browser can auto-fill email       |
| Phone input  | `autocomplete="tel"`            | Browser can auto-fill phone       |
| Street input | `autocomplete="street-address"` | Browser can auto-fill address     |
| City input   | `autocomplete="address-level2"` | Browser can auto-fill city        |
| ZIP input    | `autocomplete="postal-code"`    | Browser can auto-fill postal code |

The `autocomplete` attribute provides a standardized way to indicate what type of information each field expects, enabling browsers, password managers, and assistive technologies to help users fill out forms more efficiently.

---

## Key rules

**1. Use appropriate `autocomplete` values for personal information fields.**
The HTML specification defines a list of standard autocomplete values for common field types like name, email, phone, and address. Use these values to help browsers understand what information is expected.

**2. Use `autocomplete="cc-*"` values for payment fields.**
For credit card fields, use values like `cc-name`, `cc-number`, `cc-exp`, and `cc-csc` to help browsers and password managers auto-fill payment information.

**3. Use `autocomplete="current-*"` and `autocomplete="new-*"` for password fields.**
For password fields, use `autocomplete="current-password"` for existing passwords and `autocomplete="new-password"` for new passwords to help password managers distinguish between them.

**4. Don't use autocomplete for sensitive information that shouldn't be saved.**
For fields like security questions or one-time codes, use `autocomplete="off"` to prevent browsers from saving this information.

---

## Design tokens

| Token                     | Value      | Usage                                |
| ------------------------- | ---------- | ------------------------------------ |
| `spacing.form.gap`        | `1.5rem`   | Vertical spacing between form fields |
| `spacing.label.bottom`    | `0.5rem`   | Space between label and input        |
| `color.text.label`        | `#1a1a1a`  | Label text color                     |
| `color.text.input`        | `#1a1a1a`  | Input text color                     |
| `color.border.input`      | `#d1d5db`  | Input border color                   |
| `color.border.focus`      | `#1d4ed8`  | Input focus border color             |
| `border.radius.input`     | `0.375rem` | Input border radius                  |
| `typography.size.label`   | `0.875rem` | Label font size                      |
| `typography.weight.label` | `500`      | Label font weight                    |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/03-form-labels/autocomplete-attributes
```

Expected test output:

```
✓ before/ has autocomplete violations
✓ after/ has no autocomplete violations
```

You can also verify the pattern manually:

- Open the page in a browser with saved form data
- Click on each field and verify that the browser suggests appropriate auto-fill values
- Verify that the browser can fill all fields with a single action

---

## Resources

- [WCAG 1.3.5 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html)
- [MDN: The autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
- [HTML5 autocomplete values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [A11Y Project: Form Autocomplete](https://www.a11yproject.com/posts/2013-05-11-forms-and-labels/)
