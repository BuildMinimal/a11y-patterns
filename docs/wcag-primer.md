# WCAG Quick Reference

A practical reference for the WCAG criteria that appear most often in this repo. Not a full spec — links to official understanding documents are at the bottom of each section.

---

## How WCAG is structured

**Principles → Guidelines → Success Criteria**

- **4 principles**: Perceivable, Operable, Understandable, Robust
- **13 guidelines**: Broad topics under each principle
- **78 success criteria**: Testable requirements, each with a level

**Levels:**
- **A** — The minimum. Failure means some users cannot use the content at all.
- **AA** — The legal and industry standard. Most accessibility laws reference AA.
- **AAA** — Enhanced. Worth pursuing where practical, not required in all contexts.

Most patterns in this repo target **AA compliance**. Some go to AAA where the effort is low and the benefit is high.

---

## Criterion quick reference

### 1.1.1 Non-text Content (Level A)

All non-text content has a text alternative that serves the equivalent purpose.

**What this means in practice:**
- `<img>` always needs `alt`. Decorative images get `alt=""`.
- SVG icons used as interactive controls need `aria-label` or `aria-labelledby`.
- CSS background images that convey meaning need alternative text (usually via a visually-hidden element).
- Charts and graphs need a text description of what they show, not just what they are.

**Common mistake:** `alt="image"` — this is not a text alternative, it's noise.

→ [Understanding 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

---

### 1.3.1 Info and Relationships (Level A)

Information conveyed visually is also conveyed in the structure or semantics of the markup.

**What this means in practice:**
- Form inputs have associated `<label>` elements (not just placeholder text).
- Related inputs are grouped with `<fieldset>` + `<legend>` (checkboxes, radios).
- Tables have `<th>` with `scope` attributes.
- Headings use `<h1>`–`<h6>`, not `<div class="heading">`.

**Common mistake:** Using CSS positioning to visually associate a label with an input when the HTML structure doesn't actually connect them.

→ [Understanding 1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)

---

### 1.4.3 Contrast Minimum (Level AA)

Text and images of text have a contrast ratio of at least 4.5:1. Large text (18pt/24px normal, or 14pt/18.67px bold) needs 3:1.

**What this means in practice:**
- Gray text on white backgrounds fails constantly. `#767676` on white is the AA minimum (4.54:1) — anything lighter fails.
- Placeholder text has no exemption — it must also pass 4.5:1.
- Disabled elements ARE exempt, but only when they are genuinely non-interactive.
- The rule applies to text over images — you must guarantee contrast across the entire text area.

**Common mistake:** Assuming your brand's light blue passes contrast. Most light blues fail on white (e.g. `#60a5fa` on white = 3.0:1, fails for normal text).

→ [Understanding 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

### 1.4.11 Non-text Contrast (Level AA)

Visual information required to identify UI components has a contrast ratio of at least 3:1 against adjacent colors.

**What this means in practice:**
- The border of a text input must be 3:1 against the page background.
- Icon-only buttons need their icon to be 3:1 against the button background.
- A checkbox's visible border must be 3:1 against the surrounding background.
- Focus indicators must be 3:1 (see also 2.4.11 in WCAG 2.2).

**Common mistake:** Light gray input borders (`#e5e7eb` on white = 1.17:1) — common in design systems and virtually always fails.

→ [Understanding 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

---

### 2.1.1 Keyboard (Level A)

All functionality is operable through a keyboard interface without requiring specific timing.

**What this means in practice:**
- Custom dropdowns, date pickers, tabs, sliders — all need keyboard operation.
- Follow WAI-ARIA Authoring Practices patterns for established widget types.
- `tabindex="0"` makes an element focusable; `tabindex="-1"` makes it programmatically focusable but not in the tab order.
- Never use `tabindex` > 0 — it creates an unpredictable tab order.

**Common mistake:** Attaching `onclick` handlers to `<div>` or `<span>` elements. These are not keyboard accessible.

→ [Understanding 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) | [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/)

---

### 2.4.1 Bypass Blocks (Level A)

A mechanism to skip repeated blocks of content (navigation, headers) is available.

**What this means in practice:**
- A "skip to main content" link is the standard implementation.
- It must be keyboard focusable and visible when focused (it can be visually hidden otherwise).
- `<main>` with `id="main"` is the target.

→ [Understanding 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)

---

### 2.4.3 Focus Order (Level A)

Focus moves in an order that preserves meaning and operability.

**What this means in practice:**
- When a modal opens, focus must move inside it.
- When a modal closes, focus must return to the trigger element.
- Dynamically inserted content (toast, inline error) that needs interaction must receive focus or announce itself.

→ [Understanding 2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html)

---

### 2.4.4 Link Purpose (Level A)

The purpose of each link can be determined from the link text alone, or from the link text and its context.

**What this means in practice:**
- "Read more" and "click here" are always failures when used alone.
- `aria-label` or visually-hidden text can add context without changing visual design.
- Icon-only links need `aria-label` or an adjacent `<span class="sr-only">`.

→ [Understanding 2.4.4](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)

---

### 2.4.11 Focus Appearance (Level AA, WCAG 2.2)

When a keyboard focus indicator is visible, it meets minimum size and contrast requirements.

**What this means in practice:**
- The focus indicator must have an area at least as large as a 2px perimeter around the unfocused component.
- It must have a contrast ratio of at least 3:1 between focused and unfocused states.
- `outline: none` without a replacement is always a failure.

**Common mistake:** Removing the default browser focus ring for visual reasons without providing an alternative.

→ [Understanding 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

---

### 4.1.2 Name, Role, Value (Level A)

UI components have accessible names, roles, and values that can be determined programmatically.

**What this means in practice:**
- `<button>` with only an icon child has no accessible name — add `aria-label`.
- Custom widgets built from `<div>` need `role` attributes.
- Interactive state (expanded, selected, checked) must be communicated via ARIA attributes, not just CSS.

→ [Understanding 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)

---

## Pattern README template

Use this template for every pattern README. All sections are required.

```markdown
# Pattern: [Display Name]

**Category:** [Category]
**WCAG:** [Criterion number and name — Level X]

---

## What this pattern demonstrates

One sentence. What does the broken version do wrong, and what does the fix do?

---

## Why it matters

Which users are affected. What breaks for them specifically.

---

## WCAG Criterion

**[X.X.X Name — Level X]**

> Paste the success criterion text here.

---

## The problem (before)

- What the code does
- Why this creates an accessibility barrier
- Specific metric (e.g. contrast ratio 2.1:1 — fails 4.5:1 minimum)

---

## The fix (after)

- What changed
- Why this specific change works
- Specific metric (e.g. contrast ratio 7.2:1 — passes AA and AAA)

---

## Key rules

- Rule 1 (specific, not generic)
- Rule 2

---

## Design tokens

| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--token-name` | `#value` | Usage description | X:1 |

---

## Testing

```bash
npm test -- patterns/[category]/[slug]
```

---

## Resources

- [WCAG X.X.X Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/)
```
