---
title: "Placeholder as Label — Form Labels"
wcag: "1.3.1 Info and Relationships, 3.3.2 Labels or Instructions — Level A"
wcag-shorthand: "1.3.1, 3.3.2"
wcag-level: "A"
---

# Pattern: Placeholder as Label — Form Labels

**Category:** Form Labels
**WCAG:** 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions — Level A

---

## What this pattern demonstrates

Why placeholder text cannot substitute for proper labels — covering text inputs, email fields, and password fields in a realistic contact form.

---

## Why it matters

Placeholder text disappears when the user starts typing. For screen reader users, placeholder text is not announced as a label — it's announced as "placeholder" or "hint" text, which is secondary and can be easily missed or forgotten.

The failure mode is concrete: a blind user navigates to a form field with only placeholder text. The screen reader announces "edit blank" or "email edit blank" with no indication of what information is expected. If the user starts typing, the placeholder disappears, and they have no way to remember what was supposed to go there.

Placeholder text also fails users with cognitive disabilities who rely on persistent labels, users with low vision who may not see the placeholder text clearly, and users who navigate forms by jumping from label to label.

---

## WCAG Criterion

**1.3.1 Info and Relationships — Level A**

> Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.

**3.3.2 Labels or Instructions — Level A**

> Labels or instructions are provided when content requires user input.

Source: [Understanding Success Criterion 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html) | [Understanding Success Criterion 3.3.2](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)

---

## The problem (before)

The `before/` version shows a contact form where the developer has used placeholder text as the only indication of what each input expects, with no proper labels.

**Specific failures in `before/index.html`:**

| Element          | Issue                      | Result                               |
| ---------------- | -------------------------- | ------------------------------------ |
| Name input       | No label, only placeholder | Screen reader announces "edit blank" |
| Email input      | No label, only placeholder | Screen reader announces "edit blank" |
| Message textarea | No label, only placeholder | Screen reader announces "edit blank" |

Visually, the form appears complete with placeholder text in each field. But programmatically, there are no labels associated with the inputs.

---

## The fix (after)

The `after/` version adds proper labels while keeping placeholder text as supplementary helper text.

**Corrected structure in `after/index.html`:**

| Element       | Fix                                                 | Result                                            |
| ------------- | --------------------------------------------------- | ------------------------------------------------- |
| Name label    | `<label for="name">` + `<input id="name">`          | Screen reader announces "Name, edit text"         |
| Email label   | `<label for="email">` + `<input id="email">`        | Screen reader announces "Email, edit text"        |
| Message label | `<label for="message">` + `<textarea id="message">` | Screen reader announces "Message, edit multiline" |

The placeholder text remains as helpful context, but it's no longer the only indication of what the input expects.

---

## Key rules

**1. Never use placeholder text as the only label.**
Placeholder text is temporary and disappears when the user starts typing. It should only be used as supplementary helper text, never as the primary label.

**2. Every form input must have a visible, persistent label.**
Labels should remain visible even when the input has content. This helps users remember what information is expected, especially when navigating back to a field they've already filled.

**3. Labels must be programmatically associated with inputs.**
Use matching `for` and `id` attributes on `<label>` and `<input>` elements. This creates a programmatic relationship that assistive technologies can understand.

**4. Placeholder text is for examples, not labels.**
Use placeholder text to show examples of the expected format (e.g., "john@example.com" for email), not to describe what the input is for.

---

## Design tokens

| Token                     | Value      | Usage                                |
| ------------------------- | ---------- | ------------------------------------ |
| `spacing.form.gap`        | `1.5rem`   | Vertical spacing between form fields |
| `spacing.label.bottom`    | `0.5rem`   | Space between label and input        |
| `color.text.label`        | `#1a1a1a`  | Label text color                     |
| `color.text.input`        | `#1a1a1a`  | Input text color                     |
| `color.text.placeholder`  | `#9ca3af`  | Placeholder text color               |
| `color.border.input`      | `#d1d5db`  | Input border color                   |
| `color.border.focus`      | `#1d4ed8`  | Input focus border color             |
| `border.radius.input`     | `0.375rem` | Input border radius                  |
| `typography.size.label`   | `0.875rem` | Label font size                      |
| `typography.weight.label` | `500`      | Label font weight                    |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/03-form-labels/placeholder-as-label
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
- Start typing in an input and verify that the label remains visible

---

## Resources

- [WCAG 1.3.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [WCAG 3.3.2 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [MDN: The label element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [A11Y Project: Form Labels](https://www.a11yproject.com/posts/2013-05-11-forms-and-labels/)
