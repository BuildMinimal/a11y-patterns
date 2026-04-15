---
title: "Checkbox Radio Labels — Form Labels"
wcag: "1.3.1 Info and Relationships — Level A"
wcag-shorthand: "1.3.1"
wcag-level: "A"
---

# Pattern: Checkbox Radio Labels — Form Labels

**Category:** Form Labels
**WCAG:** 1.3.1 Info and Relationships — Level A

---

## What this pattern demonstrates

How to properly group checkboxes and radio buttons using `<fieldset>` and `<legend>` elements — covering a newsletter preferences form with checkbox groups and a delivery preference form with radio button groups.

---

## Why it matters

Checkboxes and radio buttons are often presented as groups where each option relates to a common question (e.g., "Which newsletters do you want to receive?" or "What is your preferred delivery method?"). Without proper grouping, screen reader users cannot understand the relationship between the options and the question they're answering.

The failure mode is concrete: a blind user navigates to a form with multiple checkboxes or radio buttons. The screen reader announces each option individually ("checkbox checked", "radio button not checked") with no indication of what question these options are answering. The user has no way to know what they're being asked to choose.

Proper grouping with `<fieldset>` and `<legend>` provides context for all users, including those with cognitive disabilities who benefit from visual grouping, and keyboard users who can navigate between related options more efficiently.

---

## WCAG Criterion

**1.3.1 Info and Relationships — Level A**

> Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.

Source: [Understanding Success Criterion 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)

---

## The problem (before)

The `before/` version shows a preferences form where checkboxes and radio buttons are not grouped with `<fieldset>` and `<legend>`, making it unclear what question each group of options is answering.

**Specific failures in `before/index.html`:**

| Element                | Issue                       | Result                                                    |
| ---------------------- | --------------------------- | --------------------------------------------------------- |
| Newsletter checkboxes  | No fieldset/legend grouping | Screen reader announces each checkbox without context     |
| Delivery radio buttons | No fieldset/legend grouping | Screen reader announces each radio button without context |

Visually, the form appears complete with labels for each option. But programmatically, there is no grouping structure to indicate that these options are related.

---

## The fix (after)

The `after/` version properly groups related checkboxes and radio buttons using `<fieldset>` and `<legend>` elements.

**Corrected structure in `after/index.html`:**

| Element                | Fix                          | Result                                                                                  |
| ---------------------- | ---------------------------- | --------------------------------------------------------------------------------------- |
| Newsletter checkboxes  | `<fieldset>` with `<legend>` | Screen reader announces "Newsletter preferences, group" then each checkbox with context |
| Delivery radio buttons | `<fieldset>` with `<legend>` | Screen reader announces "Delivery method, group" then each radio button with context    |

The `<fieldset>` element groups related form controls, and the `<legend>` element provides a caption for the group. This creates a programmatic relationship that assistive technologies can understand.

---

## Key rules

**1. Group related checkboxes and radio buttons with `<fieldset>`.**
Use `<fieldset>` to wrap all checkboxes or radio buttons that answer the same question. This creates a programmatic group that assistive technologies can navigate and announce as a unit.

**2. Provide a `<legend>` for each `<fieldset>`.**
The `<legend>` element should contain the question or description that applies to all options in the group. It's announced by screen readers before the individual options, providing essential context.

**3. Each checkbox/radio button must have its own label.**
Even though they're grouped, each individual checkbox or radio button must have its own `<label>` element with a matching `for` and `id` attribute pair.

**4. Use radio buttons for mutually exclusive choices, checkboxes for multiple selections.**
Radio buttons allow only one option to be selected, while checkboxes allow multiple selections. Choose the appropriate control type based on the user's needs.

---

## Design tokens

| Token                      | Value       | Usage                                  |
| -------------------------- | ----------- | -------------------------------------- |
| `spacing.form.gap`         | `1.5rem`    | Vertical spacing between form sections |
| `spacing.fieldset.gap`     | `1rem`      | Vertical spacing within fieldset       |
| `spacing.option.bottom`    | `0.5rem`    | Space between checkbox/radio options   |
| `color.text.legend`        | `#1a1a1a`   | Legend text color                      |
| `color.text.label`         | `#1a1a1a`   | Label text color                       |
| `color.border.fieldset`    | `#d1d5db`   | Fieldset border color                  |
| `border.radius.fieldset`   | `0.5rem`    | Fieldset border radius                 |
| `typography.size.legend`   | `1rem`      | Legend font size                       |
| `typography.weight.legend` | `600`       | Legend font weight                     |
| `typography.size.label`    | `0.9375rem` | Label font size                        |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/03-form-labels/checkbox-radio-labels
```

Expected test output:

```
✓ before/ has fieldset violations
✓ after/ has no fieldset violations
```

You can also verify the pattern manually:

- Open the page in a screen reader (NVDA, JAWS, VoiceOver)
- Navigate through the form
- Verify that each group is announced with its legend
- Verify that each checkbox/radio button is announced with its label

---

## Resources

- [WCAG 1.3.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [MDN: The fieldset element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
- [MDN: The legend element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [A11Y Project: Grouping Form Elements](https://www.a11yproject.com/posts/2013-05-11-forms-and-labels/)
