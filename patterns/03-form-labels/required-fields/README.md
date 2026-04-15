---
title: "Required Fields — Form Labels"
wcag: "1.3.1 Info and Relationships, 1.4.1 Use of Color — Level A"
wcag-shorthand: "1.3.1, 1.4.1"
wcag-level: "A"
---

# Pattern: Required Fields — Form Labels

**Category:** Form Labels
**WCAG:** 1.3.1 Info and Relationships, 1.4.1 Use of Color — Level A

---

## What this pattern demonstrates

How to communicate required form fields beyond color alone — covering a registration form with required fields indicated by asterisk, ARIA attributes, and descriptive text.

---

## Why it matters

Users with color vision deficiencies cannot rely on color alone to identify required fields. When required fields are indicated only by red text, borders, or asterisks that are the same color as other text, these users may miss important requirements.

The failure mode is concrete: a user with red-green color blindness encounters a form where required fields are marked with red labels. To them, all labels appear the same color, so they have no way of knowing which fields are required until they submit the form and receive errors.

Required field indicators must be distinguishable by more than just color — using symbols, text, positioning, or other visual cues that work regardless of color perception.

---

## WCAG Criterion

**1.3.1 Info and Relationships — Level A**

> Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.

**1.4.1 Use of Color — Level A**

> Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

Source: [Understanding Success Criterion 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html) | [Understanding Success Criterion 1.4.1](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)

---

## The problem (before)

The `before/` version shows a registration form where required fields are indicated only by red color, with no programmatic indication or alternative visual cues.

**Specific failures in `before/index.html`:**

| Element           | Issue                                | Result                                             |
| ----------------- | ------------------------------------ | -------------------------------------------------- |
| Required label    | Only red color, no asterisk          | Colorblind users can't distinguish required fields |
| Required input    | No `required` attribute              | Screen readers don't announce as required          |
| Form instructions | No explanation of required indicator | Users don't know what red means                    |

Visually, the form shows required fields with red labels. But programmatically, there is no indication of which fields are required, and colorblind users cannot perceive the difference.

---

## The fix (after)

The `after/` version properly communicates required fields using asterisk, `required` attribute, and descriptive text.

**Corrected structure in `after/index.html`:**

| Element           | Fix                         | Result                             |
| ----------------- | --------------------------- | ---------------------------------- |
| Required label    | Red color + asterisk symbol | Colorblind users see the asterisk  |
| Required input    | `required` attribute        | Screen readers announce "required" |
| Form instructions | Explains asterisk meaning   | All users understand the indicator |

The `required` attribute on inputs provides programmatic indication that assistive technologies can announce. The asterisk symbol provides a visual indicator that works regardless of color perception.

---

## Key rules

**1. Never use color alone to indicate required fields.**
Always provide an additional visual indicator like an asterisk (\*), "required" text, or icon. Colorblind users cannot perceive color-only indicators.

**2. Use the `required` attribute on inputs.**
The `required` attribute provides programmatic indication that screen readers can announce. It also enables browser validation before form submission.

**3. Explain the required indicator.**
Include a note at the top of the form explaining what the required indicator means (e.g., "\* Required fields"). This ensures all users understand the convention.

**4. Place the required indicator consistently.**
Put the asterisk or required text in the same position for all required fields (e.g., always after the label). Consistency helps users quickly scan and understand the form.

---

## Design tokens

| Token                      | Value       | Usage                                |
| -------------------------- | ----------- | ------------------------------------ |
| `spacing.form.gap`         | `1.5rem`    | Vertical spacing between form fields |
| `spacing.label.bottom`     | `0.5rem`    | Space between label and input        |
| `color.text.label`         | `#1a1a1a`   | Label text color                     |
| `color.text.required`      | `#dc2626`   | Required field indicator color       |
| `color.text.input`         | `#1a1a1a`   | Input text color                     |
| `color.border.input`       | `#d1d5db`   | Input border color                   |
| `color.border.focus`       | `#1d4ed8`   | Input focus border color             |
| `border.radius.input`      | `0.375rem`  | Input border radius                  |
| `typography.size.label`    | `0.875rem`  | Label font size                      |
| `typography.weight.label`  | `500`       | Label font weight                    |
| `typography.size.required` | `0.8125rem` | Required note font size              |

---

## Testing

```bash
# Run the axe tests for this pattern
npm test -- patterns/03-form-labels/required-fields
```

Expected test output:

```
✓ before/ has required field violations
✓ after/ has no required field violations
```

You can also verify the pattern manually:

- Open the page in a screen reader (NVDA, JAWS, VoiceOver)
- Navigate through the form
- Verify that required fields are announced as "required"
- Verify that the asterisk is visible and positioned consistently

---

## Resources

- [WCAG 1.3.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [WCAG 1.4.1 Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
- [MDN: The required attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
- [WebAIM: Creating Accessible Forms](https://webaim.org/techniques/forms/)
- [A11Y Project: Form Labels](https://www.a11yproject.com/posts/2013-05-11-forms-and-labels/)
