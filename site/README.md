# A11y Patterns Site

This directory contains the static HTML/CSS/JS site for the A11y Patterns GitHub Pages deployment.

## Structure

- `index.html` - Main page with pattern listing and filtering
- `pattern.html` - Individual pattern detail page template
- `styles.css` - Global styles for the site
- `pattern.css` - Styles specific to pattern detail pages
- `app.js` - JavaScript for the main page (filtering, pattern cards)
- `pattern.js` - JavaScript for pattern detail pages (iframes, code snippets, copy buttons)

## Building

The site is built using the `npm run build` command, which:

1. Scans the `patterns/` directory for all patterns
2. Extracts metadata from each pattern's `README.md`
3. Generates `patterns-data.json` with pattern information
4. Copies site files and patterns to the `dist/` directory

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when pushing to the `main` branch. See `.github/workflows/deploy.yml` for the deployment configuration.

## Features

- **Pattern Listing**: All patterns displayed with category, WCAG level, and description
- **Filtering**: Filter patterns by category and WCAG level
- **Pattern Details**: Individual pattern pages with:
  - Before/after side-by-side comparison in iframes
  - Copy buttons for HTML, React, and Vue code snippets
  - Key rules and explanations
  - WCAG criteria information

## Local Development

To test the site locally:

```bash
npm run build
npx serve dist
```

Then open `http://localhost:3000` in your browser.
