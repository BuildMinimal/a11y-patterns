# a11y-patterns

**Copy-paste accessible UI patterns. Before/after code. Real WCAG context. No framework lock-in.**

Every entry in this repository is a single, self-contained accessible UI pattern — not a full component library, not a design system, not an audit tool. Each pattern ships with a broken `before/` version that demonstrably fails axe, a fixed `after/` version that demonstrably passes, annotated code explaining _why_ each change matters, design tokens, and React + Vue ports.

CI enforces correctness on every PR: `before/` must fail axe. `after/` must pass. There are no unchecked claims here.

---

## Why this exists

Existing resources give you one of two things:

- **Rules** — W3C specs, WCAG criteria, audit checklists. Correct but not actionable.
- **Unstyled primitives** — Radix UI, Headless UI. Accessible but impossible to learn from.

Nobody gives you annotated, explained, copy-paste-ready examples organized around the failures that actually kill developers in production. That's what this is.

The patterns here are organized around the [WebAIM Million](https://webaim.org/projects/million/) — the annual accessibility audit of the top 1 million websites. These are the failures that appear on real sites at scale.

---

## Quick start

Every `before/index.html` and `after/index.html` opens directly in a browser — no build step, no install. That's intentional.

```bash
# Clone and install dev tools (only needed for running tests)
git clone https://github.com/YOUR-USERNAME/a11y-patterns.git
cd a11y-patterns
npm install
npx playwright install chromium

# Run all axe tests
npm test

# Scaffold a new pattern interactively
npm run new-pattern

# Validate all token contrast ratios
npm run validate-tokens
```

---

## Pattern categories

Organized around the six most common WebAIM Million failure types:

| # | Category | Patterns | WCAG Criteria |
|---|----------|----------|---------------|
| 01 | [Color Contrast](patterns/01-color-contrast/) | 7 | 1.4.3, 1.4.11, 2.4.11 |
| 02 | [Missing Alt Text](patterns/02-missing-alt-text/) | 6 | 1.1.1 |
| 03 | [Form Labels](patterns/03-form-labels/) | 7 | 1.3.1, 3.3.1, 3.3.2, 4.1.3 |
| 04 | [Empty Links & Buttons](patterns/04-empty-links-buttons/) | 6 | 2.4.1, 2.4.4, 4.1.2 |
| 05 | [Focus Management](patterns/05-focus-management/) | 6 | 2.1.2, 2.4.3, 2.4.11, 4.1.3 |
| 06 | [Keyboard Navigation](patterns/06-keyboard-navigation/) | 7 | 2.1.1, 1.3.1 |

---

## How to use a pattern

Each pattern folder is self-contained. Pick the file you need:

```
patterns/01-color-contrast/text-on-solid-bg/
├── README.md          ← What the pattern demonstrates, WCAG reference, key rules
├── before/
│   ├── index.html     ← Broken example — open in browser to see the failure
│   └── styles.css
├── after/
│   ├── index.html     ← Fixed example — inline comments explain every change
│   └── styles.css
├── react/
│   └── Component.jsx  ← React port (no styling framework required)
├── vue/
│   └── Component.vue  ← Vue 3 Composition API port
├── tokens.json        ← Design tokens with documented contrast ratios
└── tests/
    └── axe.test.js    ← Proves before/ fails and after/ passes
```

**Copy what you need.** If you only want the HTML pattern, take `after/index.html` and `after/styles.css`. If you're on React, take `react/Component.jsx`. The files have no dependencies on each other.

---

## Design tokens

The `tokens/` directory at the root contains a full accessible design token set — a complete color palette, typography scale, spacing scale, motion values, and dark mode palette, all with documented WCAG contrast ratios.

These are [Style Dictionary](https://amzn.github.io/style-dictionary/) compatible and can be exported to CSS custom properties, Tailwind config, SCSS variables, or JS constants without manual conversion.

See [docs/design-tokens-guide.md](docs/design-tokens-guide.md) for usage.

---

## Testing

Every pattern has an `axe.test.js` that verifies two things:

1. The `before/` version **has** the violation it claims to demonstrate
2. The `after/` version has **zero** violations for that rule

```bash
# Test a specific pattern
npm test -- --reporter=verbose patterns/01-color-contrast/text-on-solid-bg

# Test everything
npm test
```

Tests use [axe-core](https://github.com/dequelabs/axe-core) via `@axe-core/playwright` — the same engine that powers browser devtools accessibility audits and the axe browser extension.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide on adding a pattern.

The short version: run `npm run new-pattern` to scaffold the folder structure, write real broken code in `before/` and real fixed code in `after/`, write the axe test, and open a PR. CI will verify your claims.

---

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Pattern HTML | Vanilla HTML5 + CSS custom properties | Zero dependencies, works in every browser |
| Framework ports | React (JSX), Vue 3 (Composition API) | Covers 80%+ of enterprise frontend use |
| Design tokens | Style Dictionary-compatible JSON | Machine-readable, exportable to any format |
| Testing | axe-core + Playwright | Industry standard, catches real WCAG failures |
| Test runner | Vitest | Fast, native ESM, minimal config |
| CI/CD | GitHub Actions | Free, native GitHub integration |
| Live demos | GitHub Pages | No external dependency, auto-deploys from `main` |

No Tailwind. No CSS preprocessors. No bundler. Pattern consumers need none of these.

---

## License

**Code** (HTML, CSS, JS, JSX, Vue): [MIT](LICENSE)

**Documentation** (READMEs, guides, annotations): [CC BY 4.0](LICENSE)

The split matters. MIT on code means you can drop these patterns into commercial products without legal friction. CC BY 4.0 on documentation means training companies and course creators must credit the source.
