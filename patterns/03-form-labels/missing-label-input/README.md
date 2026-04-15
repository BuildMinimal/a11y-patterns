---
title: "Missing Label Input — Form Labels"
wcag: "1.3.1 Info and Relationships, 3.3.2 Labels or Instructions — Level A"
wcag-shorthand: "1.3.1, 3.3.2"
wcag-level: "A"
---

# Pattern: Missing Label Input — Form Labels

**Category:** Form Labels
**WCAG:** 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions — Level A

---

## What this pattern demonstrates

How to properly associate labels with form inputs using the `for` and `id` attributes — covering text inputs, email fields, and password fields in a realistic login form.

---

## Why it matters

Screen reader users navigate forms by jumping from one label to the next. When an input has no associated label, the screen reader announces "edit blank" or "password edit blank" with no context about what information is being requested.

The failure mode is concrete: a blind user lands on a login form and encounters three unlabeled inputs. They have no way of knowing which input expects their username, which expects their email, and which expects their password. They may guess, but guessing leads to errors and frustration.

Missing labels also fail users with cognitive disabilities who rely on visual labels to understand form context, and users of voice control software who must speak the label to focus an input.

---

## WCAG Criterion

**1.3.1 Info and Relationships — Level A**

> Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.

**3.3.2 Labels or Instructions — Level A**

> Labels or instructions are provided when content requires user input.

Source: [Understanding Success Criterion 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html) | [Understanding Success Criterion 3.3.2](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)

---

## The problem (before)

The `before/` version shows a login form where the developer has used visual labels as separate `<div>` elements, but there is no programmatic connection between the labels and their corresponding inputs.

**Specific failures in `before/index.html`:**

| Element        | Issue                                           | Result                                        |
| -------------- | ----------------------------------------------- | --------------------------------------------- |
| Username input | No `id` attribute, label has no `for` attribute | Screen reader announces "edit blank"          |
| Email input    | No `id` attribute, label has no `for` attribute | Screen reader announces "edit blank"          |
| Password input | No `id` attribute, label has no `for` attribute | Screen reader announces "password edit blank" |

Visually, the form appears complete with labels above each input. But programmatically, there is no relationship between the label text and the input field.

---

## The fix (after)

The `after/` version properly associates each label with its input using matching `for` and `id` attributes.

**Corrected structure in `after/index.html`:**

| Element        | Fix                                                | Result                                            |
| -------------- | -------------------------------------------------- | ------------------------------------------------- |
| Username label | `<label for="username">` + `<input id="username">` | Screen reader announces "Username, edit text"     |
| Email label    | `<label for="email">` + `<input id="email">`       | Screen reader announces "Email, edit text"        |
| Password label | `<label for="password">` + `<input id="password">` | Screen reader announces "Password, edit password" |

The `for` attribute on the `<label>` must exactly match the `id` attribute on the `<input>`. This creates a programmatic relationship that assistive technologies can understand.

---

## Key rules

**1. Every form input must have an associated label.**
This includes text inputs, email fields, password fields, textareas, select dropdowns, and any other form control. The only exceptions are buttons (which have their own accessible name from their text content) and inputs with `aria-label` or `aria-labelledby` (used in specific cases).

**2. Use matching `for` and `id` attributes.**
The `for` attribute on the `<label>` and the `id` attribute on the `<input>` must be identical. This is the most reliable way to associate labels with inputs and works across all assistive technologies.

**3. Never use placeholder text as a substitute for a label.**
Placeholder text disappears when the user starts typing and is not announced by screen readers as a label. It should only be used as supplementary helper text, never as the primary label.

**4. Labels must be visible to all users.**
Don't hide labels with CSS (e.g., `position: absolute; left: -9999px`) unless you have a very specific reason and have provided an alternative accessible name. Labels should be visible to sighted users as well as screen reader users.

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
npm test -- patterns/03-form-labels/missing-label-input
```

Expected test output:

```
✓ before/ has label violations
✓ after/ has no label violations
```

You can also verify the pattern manually:

- Open the page in a screen reader (NVDA, JAWS, VoiceOver)
- Navigate through the form
- Verify that each input is announced with its label
- Click on a label and verify that focus moves to its associated input

---

## Resources

- [WCAG 1.3.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [WCAG 3.3.2 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [MDN: The label element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [A11Y Project: Form Labels](https://www.a11yproject.com/posts/2013-05-11-forms-and-labels/)
