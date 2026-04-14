# Design Tokens Guide

How to use the global token set in `tokens/` — importing, exporting to different formats, and understanding the token structure.

---

## What's in `tokens/`

| File | Contents |
|------|----------|
| `colors.json` | Full accessible color palette with documented contrast ratios |
| `typography.json` | Font sizes, weights, line heights, letter spacing |
| `spacing.json` | Spacing scale, touch target sizes, focus ring measurements |
| `motion.json` | Animation durations, easings, reduced-motion values |
| `dark-mode.json` | Dark mode palette — all values meet AA on their respective backgrounds |

Each `tokens.json` inside a pattern folder covers only the tokens that pattern specifically uses.

---

## Token structure

All tokens follow this shape:

```json
{
  "category": {
    "group": {
      "name": {
        "value": "#1a1a1a",
        "contrast-on-white": "18.1:1",
        "wcag": "AAA",
        "note": "Optional description"
      }
    }
  }
}
```

The `wcag` field is machine-readable — `npm run validate-tokens` checks it against the actual calculated contrast ratio. Valid values: `"AAA"`, `"AA"`, `"AA-large"`, `"non-text"`, `"FAIL"`.

---

## Using tokens as CSS custom properties

The simplest approach — copy the values you need into your CSS:

```css
:root {
  /* From tokens/colors.json */
  --color-text-primary:   #1a1a1a;  /* 18.1:1 on white — AAA */
  --color-text-secondary: #4a5568;  /* 5.74:1 on white — AA  */
  --color-text-muted:     #718096;  /* 4.55:1 on white — AA  */
  --color-link:           #1d4ed8;  /* 7.22:1 on white — AAA */

  /* From tokens/spacing.json */
  --touch-target-min:  2.75rem;  /* 44px — WCAG 2.5.5 AAA */
  --focus-ring-width:  2px;
  --focus-ring-offset: 2px;

  /* From tokens/motion.json */
  --duration-fast:   100ms;
  --duration-normal: 200ms;
  --duration-slow:   300ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast:   0.01ms;
    --duration-normal: 0.01ms;
    --duration-slow:   0.01ms;
  }
}
```

---

## Exporting with Style Dictionary

[Style Dictionary](https://amzn.github.io/style-dictionary/) can convert the JSON token files to any output format automatically.

### Install

```bash
npm install --save-dev style-dictionary
```

### Config file (`sd.config.js`)

```javascript
export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'a11y',
      buildPath: 'dist/tokens/',
      files: [{ destination: 'variables.css', format: 'css/variables' }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }],
    },
  },
};
```

### Run

```bash
npx style-dictionary build --config sd.config.js
```

This produces `dist/tokens/variables.css` with all tokens as `--a11y-*` CSS custom properties, and `dist/tokens/tokens.js` as named ES module exports.

---

## Exporting to Tailwind

To use the color tokens in a Tailwind project:

```javascript
// tailwind.config.js
import colors from './tokens/colors.json';

function flattenColors(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (val && typeof val === 'object' && 'value' in val) {
      acc[prefix + key] = val.value;
    } else if (val && typeof val === 'object') {
      Object.assign(acc, flattenColors(val, prefix + key + '-'));
    }
    return acc;
  }, {});
}

export default {
  theme: {
    extend: {
      colors: {
        a11y: flattenColors(colors.color),
      },
    },
  },
};
```

This gives you Tailwind classes like `text-a11y-text-primary`, `bg-a11y-surface-page`, etc.

---

## Dark mode tokens

The dark mode token file (`tokens/dark-mode.json`) is structured identically to `colors.json` but with values optimized for dark backgrounds.

### Implementation with CSS

```css
/* Light mode (default) */
:root {
  --color-bg:          #ffffff;
  --color-text:        #1a1a1a;
  --color-text-muted:  #718096;
  --color-link:        #1d4ed8;
}

/* Dark mode — system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:          #0f1117;
    --color-text:        #f0f4f8;
    --color-text-muted:  #7e94ae;
    --color-link:        #7eb3ff;
  }
}

/* Dark mode — manual toggle */
[data-theme="dark"] {
  --color-bg:          #0f1117;
  --color-text:        #f0f4f8;
  --color-text-muted:  #7e94ae;
  --color-link:        #7eb3ff;
}
```

**Important:** Always support both `prefers-color-scheme` and a manual toggle. System preference is not always the user's current preference (e.g., they may have a dark OS but want a light site, or vice versa).

---

## Adding new tokens

When you add a new pattern, add any new color tokens to the pattern's `tokens.json`. If the token is generally useful beyond the pattern (e.g. a new semantic text color), add it to `tokens/colors.json` too.

Every color token that has a `"wcag"` field must pass `npm run validate-tokens`. Run this before committing.

```bash
npm run validate-tokens
```

If a token is expected to fail contrast (for demonstration purposes in a `before/` example), set `"wcag": "FAIL"` — the validator will confirm it actually fails.
