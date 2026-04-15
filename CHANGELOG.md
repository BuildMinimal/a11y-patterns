# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project uses [semantic versioning](https://semver.org/).

---

## [0.1.0] — 2026-04-15

### Added

- Pattern: `03-form-labels/autocomplete-attributes` — autocomplete attribute patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `03-form-labels/checkbox-radio-labels` — checkbox and radio label patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `03-form-labels/error-messages` — accessible error message patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `03-form-labels/missing-label-input` — missing label input patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `03-form-labels/multi-step-form` — multi-step form patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `03-form-labels/placeholder-as-label` — placeholder-as-label anti-pattern with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `03-form-labels/required-fields` — required field indication patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- GitHub Pages site (`site/`) with pattern index, before/after live previews, and a build script (`scripts/build-site.js`)
- GitHub Actions deploy workflow for automated GitHub Pages publishing
- Site auto-discovers patterns from the directory structure — no manual registration needed
- GeistPixel-Square font added to the site for display headings

### Changed

- Site icons swapped from previous set to Google Icons; key rules list updated on pattern pages
- Site UI overhauled: improved layout, spacing, typography, and dark mode styling across `styles.css` and `pattern.css`
- `build-site.js` updated to parse README markdown for correct code block rendering and WCAG value display

### Fixed

- Dark theme visual inconsistencies on the site corrected
- WCAG value display on index and pattern pages fixed
- Markdown parsing in README files: code blocks and WCAG values now render correctly
- CI build error resolved; all workflows upgraded to Node.js 24

---

## [Released]

### Added

- Initial repository scaffolding (Phase 0)
- Pattern: `01-color-contrast/text-on-solid-bg` — first complete end-to-end pattern with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `01-color-contrast/dark-mode-theme` — dark mode color contrast patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `01-color-contrast/disabled-state-contrast` — disabled state contrast patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `01-color-contrast/focus-indicator-contrast` — focus indicator contrast patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `01-color-contrast/icon-only-button` — icon-only button contrast patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `01-color-contrast/placeholder-text` — placeholder text contrast patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Pattern: `01-color-contrast/text-on-gradient` — text on gradient background contrast patterns with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Global design token set (`tokens/`) covering colors, typography, spacing, motion, and dark mode
- CI workflows: axe test runner, PR preview, token contrast validator
- Pattern scaffolding CLI (`scripts/new-pattern.js`) using `@clack/prompts`
- Token contrast validation script (`scripts/validate-tokens.js`)
- Docs: WCAG primer, testing guide, design tokens guide, screen reader guide

