## Pattern: [name]

**Category:** [e.g. Color Contrast]
**WCAG Criterion:** [e.g. 1.4.3 Contrast Minimum — Level AA]
**Pattern slug:** [e.g. text-on-solid-bg]

Closes #[issue number]

---

## What this pattern demonstrates

One sentence. What does the `before/` get wrong and what does `after/` fix?

---

## Checklist

### Code

- [ ] `before/index.html` and `before/styles.css` demonstrate a real, common failure
- [ ] `after/index.html` and `after/styles.css` fix the failure with inline comments explaining each change
- [ ] `react/Component.jsx` — plain JSX port of the fixed version
- [ ] `vue/Component.vue` — Vue 3 Composition API port of the fixed version

### Tests

- [ ] `tests/axe.test.js` is included
- [ ] Tests pass locally: `npm test`
- [ ] `before/` has at least one axe violation (CI confirms)
- [ ] `after/` has zero axe violations (CI confirms)

### Tokens & docs

- [ ] `tokens.json` includes all color values used in `after/`, with contrast ratios
- [ ] Token check passes locally: `npm run validate-tokens`
- [ ] `README.md` follows the pattern README template (all sections filled in)

### HTML quality

- [ ] `after/index.html` validates at [validator.w3.org](https://validator.w3.org/)
- [ ] Semantic HTML used throughout (no `<div>` where `<button>`, `<nav>`, etc. belong)
- [ ] `lang` attribute on `<html>`, `charset` meta, `viewport` meta present

---

## Screenshots

| Before             | After              |
| ------------------ | ------------------ |
| [paste screenshot] | [paste screenshot] |

---

## Testing notes

Anything a reviewer should know about testing this pattern — specific screen readers to check, browser quirks, known axe limitations, etc.
