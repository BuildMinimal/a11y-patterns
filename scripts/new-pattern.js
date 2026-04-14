#!/usr/bin/env node
/**
 * new-pattern.js
 *
 * Interactive CLI to scaffold a new a11y-patterns folder.
 * Run with: npm run new-pattern
 */

import {
  intro,
  outro,
  select,
  text,
  multiselect,
  confirm,
  isCancel,
  cancel,
  spinner,
  note,
} from '@clack/prompts';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Data ──────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: '01-color-contrast',       label: '01 — Color Contrast' },
  { value: '02-missing-alt-text',     label: '02 — Missing Alt Text' },
  { value: '03-form-labels',          label: '03 — Form Labels' },
  { value: '04-empty-links-buttons',  label: '04 — Empty Links & Buttons' },
  { value: '05-focus-management',     label: '05 — Focus Management' },
  { value: '06-keyboard-navigation',  label: '06 — Keyboard Navigation' },
];

const WCAG_CRITERIA = [
  { value: '1.1.1',  label: '1.1.1  Non-text Content (Level A)' },
  { value: '1.3.1',  label: '1.3.1  Info and Relationships (Level A)' },
  { value: '1.3.5',  label: '1.3.5  Identify Input Purpose (Level AA)' },
  { value: '1.4.1',  label: '1.4.1  Use of Color (Level A)' },
  { value: '1.4.3',  label: '1.4.3  Contrast Minimum (Level AA)' },
  { value: '1.4.11', label: '1.4.11 Non-text Contrast (Level AA)' },
  { value: '2.1.1',  label: '2.1.1  Keyboard (Level A)' },
  { value: '2.1.2',  label: '2.1.2  No Keyboard Trap (Level A)' },
  { value: '2.2.2',  label: '2.2.2  Pause, Stop, Hide (Level A)' },
  { value: '2.4.1',  label: '2.4.1  Bypass Blocks (Level A)' },
  { value: '2.4.3',  label: '2.4.3  Focus Order (Level A)' },
  { value: '2.4.4',  label: '2.4.4  Link Purpose in Context (Level A)' },
  { value: '2.4.9',  label: '2.4.9  Link Purpose Link Only (Level AAA)' },
  { value: '2.4.11', label: '2.4.11 Focus Appearance (Level AA, WCAG 2.2)' },
  { value: '3.3.1',  label: '3.3.1  Error Identification (Level A)' },
  { value: '3.3.2',  label: '3.3.2  Labels or Instructions (Level A)' },
  { value: '4.1.2',  label: '4.1.2  Name, Role, Value (Level A)' },
  { value: '4.1.3',  label: '4.1.3  Status Messages (Level AA)' },
];

// Maps criterion to the axe rule ID(s) to use in the test
const AXE_RULES = {
  '1.1.1':  ['image-alt', 'input-image-alt', 'aria-label'],
  '1.3.1':  ['label', 'aria-required-children', 'aria-required-parent'],
  '1.3.5':  ['autocomplete-valid'],
  '1.4.1':  ['link-in-text-block'],
  '1.4.3':  ['color-contrast'],
  '1.4.11': ['color-contrast-enhanced'],
  '2.1.1':  ['keyboard-navigable'],
  '2.1.2':  ['scrollable-region-focusable'],
  '2.4.1':  ['bypass'],
  '2.4.3':  ['focus-order-semantics'],
  '2.4.4':  ['link-name'],
  '2.4.11': ['focus-visible'],
  '3.3.1':  ['aria-errormessage'],
  '3.3.2':  ['label'],
  '4.1.2':  ['button-name', 'link-name', 'input-button-name'],
  '4.1.3':  ['aria-live-region-accessible'],
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function bail(value) {
  if (isCancel(value)) {
    cancel('Cancelled — no files were created.');
    process.exit(0);
  }
  return value;
}

function toTitleCase(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ─── File templates ────────────────────────────────────────────────────────

function beforeHtml(displayName) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayName} — Before (Broken)</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
    <!-- TODO: Add broken UI example here.
         This MUST produce at least one axe violation for the WCAG criterion
         this pattern covers. Run the axe test to confirm it fails. -->
    <p>TODO: Add broken example.</p>
  </main>
</body>
</html>
`;
}

function beforeCss() {
  return `/* before/styles.css
 *
 * This file intentionally contains the accessibility failure this pattern demonstrates.
 * DO NOT add explanatory comments here — the README and after/styles.css do that.
 */

/* TODO: Add styles that produce the violation */
`;
}

function afterHtml(displayName) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayName} — After (Fixed)</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
    <!-- TODO: Add fixed UI example here.
         Every change from before/ should have an inline comment explaining WHY.
         This MUST have zero axe violations. Run the axe test to confirm it passes. -->
    <p>TODO: Add fixed example.</p>
  </main>
</body>
</html>
`;
}

function afterCss() {
  return `/* after/styles.css
 *
 * Fixed version. Every property that differs from before/styles.css must have
 * an inline comment explaining WHY the change fixes the accessibility issue.
 *
 * Format:
 *   FIXED: [what changed] = [value]. Was: [old value].
 *   Reason: [one sentence on why this fixes the violation].
 */

/* TODO: Add corrected styles with inline comments */
`;
}

function reactComponent(displayName) {
  return `// react/Component.jsx
// ${displayName} — React port of the fixed (after/) version.
// Plain JSX — no TypeScript, no styling framework required.

import React from 'react';

// TODO: Replace this placeholder with the actual component.
// Match the structure of after/index.html.
// Include the same inline comments explaining accessibility decisions.

const styles = {
  // TODO: Add inline styles matching after/styles.css
};

export default function ${displayName.replace(/\s+/g, '')}() {
  return (
    <div>
      {/* TODO: Add accessible JSX */}
    </div>
  );
}
`;
}

function vueComponent(displayName) {
  return `<!-- vue/Component.vue -->
<!-- ${displayName} — Vue 3 port of the fixed (after/) version. -->
<!-- Uses <script setup> syntax. Plain .vue — no TypeScript. -->

<template>
  <!-- TODO: Add accessible template matching after/index.html -->
  <div>
    <!-- TODO: Add accessible markup -->
  </div>
</template>

<script setup>
// TODO: Add any reactive state or logic needed for this pattern
</script>

<style scoped>
/* TODO: Add scoped styles matching after/styles.css
 * Include the same inline comments explaining accessibility decisions. */
</style>
`;
}

function tokensJson(displayName) {
  return `{
  "_comment": "${displayName} — design tokens. All color values used in after/ must appear here.",
  "color": {
    "text": {
      "TODO-token-name": {
        "value": "#TODO",
        "contrast-on-white": "TODO:1",
        "wcag": "AA"
      }
    }
  }
}
`;
}

function axeTest(category, slug, criterionValue) {
  const rules = AXE_RULES[criterionValue] ?? ['color-contrast'];
  const rulesArray = JSON.stringify(rules);

  return `// tests/axe.test.js
// Automated axe tests for: ${category}/${slug}
//
// Two invariants this test enforces:
//   1. before/ has at least one violation — proves the "before" is genuinely broken
//   2. after/  has zero violations      — proves the fix actually works
//
// Run: npm test -- patterns/${category}/${slug}

import { test, expect } from 'vitest';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { pathToFileURL } from 'url';
import path from 'path';

const PATTERN_DIR = path.resolve('patterns/${category}/${slug}');

function fileUrl(relative) {
  return pathToFileURL(path.join(PATTERN_DIR, relative)).href;
}

test('before/ has violations for the pattern being demonstrated', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('before/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(${rulesArray})
    .analyze();

  // This MUST be > 0. If it's 0, your before/ isn't actually broken.
  expect(results.violations.length).toBeGreaterThan(0);

  await context.close();
  await browser.close();
});

test('after/ has no violations for the pattern being demonstrated', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(fileUrl('after/index.html'));

  const results = await new AxeBuilder({ page })
    .withRules(${rulesArray})
    .analyze();

  // This MUST be 0. If it's not, your after/ still has the violation.
  expect(results.violations.length).toBe(0);

  await context.close();
  await browser.close();
});
`;
}

function readmeTemplate(displayName, slug, categoryLabel, criterionValue) {
  const criterion = WCAG_CRITERIA.find(c => c.value === criterionValue);
  const criterionLabel = criterion ? criterion.label : criterionValue;

  return `# Pattern: ${displayName}

**Category:** ${categoryLabel}
**WCAG:** ${criterionLabel}

---

## What this pattern demonstrates

TODO: One sentence. What does the broken version do wrong and what does the fix do?

---

## Why it matters

TODO: Which users are affected. What breaks for them specifically.
(Screen reader users? Keyboard-only users? Low-vision users? Cognitive disability users?)

---

## WCAG Criterion

**${criterionLabel}**

TODO: Paste the relevant success criterion text here.
Source: https://www.w3.org/WAI/WCAG21/Understanding/

---

## The problem (before)

TODO: Describe what the broken code does wrong.

- What the code does
- Why this creates an accessibility barrier
- Specific metric: [e.g. contrast ratio 2.1:1 — fails the 4.5:1 minimum]

---

## The fix (after)

TODO: Describe what changed and why it works.

- What was changed
- Why this specific change fixes the violation
- Specific metric: [e.g. contrast ratio 7.2:1 — passes AA and AAA]

---

## Key rules

TODO: 2–4 specific, actionable rules. Not generic accessibility advice.

- Rule 1
- Rule 2

---

## Design tokens

| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| \`--TODO\` | \`#TODO\` | TODO | TODO:1 |

---

## Testing

\`\`\`bash
npm test -- patterns/TODO-category/${slug}
\`\`\`

---

## Resources

- [WCAG ${criterionValue} — Understanding document](https://www.w3.org/WAI/WCAG21/Understanding/)
- [WebAIM: relevant article](https://webaim.org/)
`;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  intro('a11y-patterns — New Pattern');

  // 1. Category
  const category = bail(await select({
    message: 'Which category does this pattern belong to?',
    options: CATEGORIES,
  }));

  // 2. Slug
  const slug = bail(await text({
    message: 'Pattern slug (kebab-case)',
    placeholder: 'e.g. missing-label-input',
    validate(value) {
      if (!value) return 'Slug is required.';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Use only lowercase letters, numbers, and hyphens.';
      const dest = path.join(ROOT, 'patterns', category, value);
      if (existsSync(dest)) return `Pattern already exists at patterns/${category}/${value}`;
    },
  }));

  // 3. Display name
  const displayName = bail(await text({
    message: 'Pattern display name',
    placeholder: `e.g. ${toTitleCase(slug)}`,
    initialValue: toTitleCase(slug),
    validate(value) {
      if (!value) return 'Display name is required.';
    },
  }));

  // 4. WCAG criterion
  const criterion = bail(await select({
    message: 'Primary WCAG criterion',
    options: WCAG_CRITERIA,
  }));

  // 5. Framework ports
  const ports = bail(await multiselect({
    message: 'Which framework ports to include?',
    options: [
      { value: 'react', label: 'React (JSX)' },
      { value: 'vue',   label: 'Vue 3 (Composition API)' },
    ],
    initialValues: ['react', 'vue'],
    required: false,
  }));

  // Confirm
  const categoryLabel = CATEGORIES.find(c => c.value === category)?.label ?? category;
  note(
    `  patterns/${category}/${slug}/\n` +
    `  WCAG: ${criterion}\n` +
    `  Ports: ${ports.length ? ports.join(', ') : 'none'}`,
    'About to create'
  );

  const confirmed = bail(await confirm({ message: 'Create this pattern?' }));
  if (!confirmed) {
    cancel('Cancelled — no files were created.');
    process.exit(0);
  }

  // Create files
  const s = spinner();
  s.start('Creating pattern files…');

  const base = path.join(ROOT, 'patterns', category, slug);

  try {
    await mkdir(path.join(base, 'before'),  { recursive: true });
    await mkdir(path.join(base, 'after'),   { recursive: true });
    await mkdir(path.join(base, 'tests'),   { recursive: true });

    if (ports.includes('react')) await mkdir(path.join(base, 'react'), { recursive: true });
    if (ports.includes('vue'))   await mkdir(path.join(base, 'vue'),   { recursive: true });

    await writeFile(path.join(base, 'before', 'index.html'), beforeHtml(displayName));
    await writeFile(path.join(base, 'before', 'styles.css'), beforeCss());
    await writeFile(path.join(base, 'after',  'index.html'), afterHtml(displayName));
    await writeFile(path.join(base, 'after',  'styles.css'), afterCss());
    await writeFile(path.join(base, 'tokens.json'), tokensJson(displayName));
    await writeFile(path.join(base, 'README.md'), readmeTemplate(displayName, slug, categoryLabel, criterion));
    await writeFile(path.join(base, 'tests', 'axe.test.js'), axeTest(category, slug, criterion));

    if (ports.includes('react')) {
      await writeFile(path.join(base, 'react', 'Component.jsx'), reactComponent(displayName));
    }
    if (ports.includes('vue')) {
      await writeFile(path.join(base, 'vue', 'Component.vue'), vueComponent(displayName));
    }

    s.stop('Done.');
  } catch (err) {
    s.stop('Failed.');
    console.error(err);
    process.exit(1);
  }

  outro(
    `Pattern created at patterns/${category}/${slug}/\n\n` +
    `Next steps:\n` +
    `  1. Add broken code to before/index.html and before/styles.css\n` +
    `  2. Add fixed code to after/index.html and after/styles.css (with inline comments)\n` +
    `  3. Fill in the TODO sections of README.md and tokens.json\n` +
    `  4. Run: npm test -- patterns/${category}/${slug}\n` +
    `  5. Confirm before/ fails and after/ passes before opening a PR`
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
