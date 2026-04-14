# Contributing to a11y-patterns

Thanks for wanting to contribute. This guide covers everything you need to add a pattern correctly.

The most important rule: **CI verifies your claims.** Every PR must prove that `before/` demonstrably fails axe and `after/` demonstrably passes. If you can't write that test, the pattern isn't ready.

---

## Before you start

1. Check the [open issues](https://github.com/YOUR-USERNAME/a11y-patterns/issues) to see if the pattern is already planned or in progress.
2. Search `patterns/` to confirm the pattern doesn't already exist.
3. If you're proposing something new, open a [New Pattern issue](https://github.com/YOUR-USERNAME/a11y-patterns/issues/new?template=new-pattern.yml) before building — get alignment on scope and category first.

---

## Scaffolding a new pattern

Run the interactive CLI:

```bash
npm run new-pattern
```

This prompts you for category, slug, display name, WCAG criterion, and which framework ports to include. It creates the full folder structure with placeholder files marked with `TODO` comments. Fill in those TODOs.

If you prefer to create the structure manually, follow the exact layout below.

---

## Pattern folder structure

Every pattern must follow this exact structure. No exceptions — consistency is what makes the repo navigable.

```
patterns/
└── 01-color-contrast/        ← Category folder (must use existing categories)
    └── text-on-solid-bg/     ← Pattern slug (kebab-case)
        ├── README.md
        ├── before/
        │   ├── index.html
        │   └── styles.css
        ├── after/
        │   ├── index.html
        │   └── styles.css
        ├── react/
        │   └── Component.jsx
        ├── vue/
        │   └── Component.vue
        ├── tokens.json
        └── tests/
            └── axe.test.js
```

---

## What goes in each file

### `before/index.html` and `before/styles.css`

This is the **broken** version. It must:

- Demonstrate a real, common mistake — not a contrived one
- Look like something a developer would actually ship (realistic UI, not just `<p style="color: gray">`)
- Contain at least one actual axe violation for the WCAG criterion this pattern covers
- Have no comments explaining what's wrong — the README does that

The axe test will confirm this file fails. If it doesn't fail, your `before/` isn't broken enough.

### `after/index.html` and `after/styles.css`

This is the **fixed** version. It must:

- Fix every violation present in `before/`
- Include inline comments on every line that changed, explaining *why* — not just *what*
- Pass axe with zero violations for the relevant rule(s)
- Look identical to `before/` in layout (same UI, corrected values only)

Example of a good inline comment in `after/styles.css`:

```css
/* FIXED: #1a1a1a on #ffffff = 18.1:1 contrast ratio — meets WCAG 1.4.3 AAA.
   Was: #aaaaaa on #ffffff = 2.32:1 — failed AA minimum of 4.5:1. */
color: #1a1a1a;
```

### `react/Component.jsx`

A React port of the `after/` fixed version. Requirements:

- Plain JSX — no TypeScript, no styling framework
- Self-contained — no imports beyond React itself
- Inline styles or a `<style>` block — contributors shouldn't need to know your CSS setup
- Includes the same inline comments as `after/styles.css` where relevant

### `vue/Component.vue`

A Vue 3 Composition API port of the `after/` fixed version. Requirements:

- Plain `.vue` file — no TypeScript
- Uses `<script setup>` syntax
- Scoped styles via `<style scoped>`
- Same inline comment standard as the React port

### `tokens.json`

Design tokens for this specific pattern. Minimum required structure:

```json
{
  "color": {
    "text": {
      "primary": {
        "value": "#1a1a1a",
        "contrast-on-white": "18.1:1",
        "wcag": "AAA"
      }
    }
  }
}
```

Every token used in `after/` must appear here. Every token with a documented `"wcag"` level must pass `npm run validate-tokens` — this is CI-enforced.

### `tests/axe.test.js`

The test file must include exactly two tests:

1. `before/` **has** the violation — `expect(results.violations.length).toBeGreaterThan(0)`
2. `after/` has **zero** violations — `expect(results.violations.length).toBe(0)`

Use `.withRules([])` to target only the rules this pattern covers. Don't run a full axe audit — you'll pick up unrelated violations in `before/` that obscure the one you're demonstrating.

See [docs/testing-guide.md](docs/testing-guide.md) for the full test template and how to run tests locally.

### `README.md`

Follow the pattern README template in [docs/wcag-primer.md](docs/wcag-primer.md). Every section is required. No skipping the "Why it matters" section — that's the part developers actually read.

---

## Code standards

**HTML**
- Valid HTML5. Run your `after/index.html` through the [W3C validator](https://validator.w3.org/) before submitting.
- Use semantic elements. Don't use `<div>` where `<button>`, `<nav>`, `<main>`, or `<article>` belong.
- `lang` attribute on `<html>`. `<meta charset="UTF-8">`. `<meta name="viewport">`.

**CSS**
- CSS custom properties for all color and spacing values used more than once.
- No `!important`.
- Comments on every value that was changed from `before/` to `after/`.

**JavaScript** (if a pattern requires it)
- Vanilla JS only in the HTML pattern. No framework dependencies in `before/` or `after/`.
- `const`/`let` only. No `var`.
- No minification — this is educational code, readability is the point.

---

## PR checklist

Before opening a PR, confirm every item:

- [ ] `before/` has at least one axe violation for the relevant rule (CI verifies this)
- [ ] `after/` has zero violations for the relevant rule (CI verifies this)
- [ ] `README.md` follows the template and all sections are filled in
- [ ] `tokens.json` contains all values used in `after/`, with contrast ratios documented
- [ ] `react/Component.jsx` is included and functional
- [ ] `vue/Component.vue` is included and functional
- [ ] Tests pass locally: `npm test`
- [ ] Token validation passes: `npm run validate-tokens`

---

## Running tests locally

```bash
# Install dependencies (first time only)
npm install
npx playwright install chromium

# Run all tests
npm test

# Run tests for a specific pattern
npm test -- patterns/01-color-contrast/text-on-solid-bg

# Validate token contrast ratios
npm run validate-tokens
```

---

## Questions

Open a [GitHub Discussion](https://github.com/YOUR-USERNAME/a11y-patterns/discussions) or comment on the relevant issue. Don't open a PR without prior alignment on scope — it's frustrating for everyone when a PR gets closed because the pattern duplicates existing work or doesn't fit the repo's structure.
