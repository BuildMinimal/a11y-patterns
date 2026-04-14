# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project uses [semantic versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Initial repository scaffolding (Phase 0)
- Pattern: `01-color-contrast/text-on-solid-bg` — first complete end-to-end pattern with before/after HTML, React port, Vue port, design tokens, and automated axe tests
- Global design token set (`tokens/`) covering colors, typography, spacing, motion, and dark mode
- CI workflows: axe test runner, PR preview, token contrast validator
- Pattern scaffolding CLI (`scripts/new-pattern.js`) using `@clack/prompts`
- Token contrast validation script (`scripts/validate-tokens.js`)
- Docs: WCAG primer, testing guide, design tokens guide, screen reader guide

---

## [0.1.0] — Forthcoming

Initial public release. Minimum viable launch: Phase 0 + Phase 1 (color contrast) + Phase 2 (form labels) complete.
