// react/Component.jsx
// Pattern: Text on Solid Background — Color Contrast
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import ArticleCard from './Component';
//   <ArticleCard />

import React from 'react';

// All color values come from tokens.json in this pattern folder.
// Contrast ratios are documented inline so reviewers don't need to look them up.
const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  card: {
    maxWidth: '600px',
    width: '100%',
    padding: '2rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },

  // FIXED: #1e40af on #dbeafe = 7.16:1 — AAA.
  // Do NOT use the raw brand color (#7ab3f0) as text on white — it fails at 2.85:1.
  tag: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#1e40af',
    backgroundColor: '#dbeafe',
    padding: '0.2em 0.6em',
    borderRadius: '4px',
    marginBottom: '0.75rem',
  },

  // Unchanged — #1a1a1a on white = 18.1:1 (AAA). Already correct.
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1.3',
    marginBottom: '0.5rem',
  },

  // FIXED: #4a5568 on white = 5.74:1 — AA.
  // Was #b0b7c3 (1.96:1) in the broken version.
  meta: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '1.25rem',
  },

  metaLink: {
    color: '#4a5568',
    textDecoration: 'underline',
  },

  // FIXED: #1a1a1a on white = 18.1:1 — AAA.
  // Was #aaaaaa (2.32:1) in the broken version.
  body: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#1a1a1a',
    marginBottom: '1rem',
  },

  // FIXED: #4a5568 on white = 5.74:1 — AA.
  // Secondary text is lighter than primary to create hierarchy, but still passes.
  secondary: {
    fontSize: '0.9375rem',
    lineHeight: '1.6',
    color: '#4a5568',
    marginBottom: '1.5rem',
  },

  footer: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },

  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.625rem 1.25rem',
    fontSize: '0.9375rem',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    lineHeight: '1',
    border: '2px solid transparent',
  },

  // FIXED: white on #1d4ed8 = 7.22:1 — AAA.
  // Was white on #93c5fd (2.45:1) in the broken version.
  btnPrimary: {
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
    borderColor: '#1d4ed8',
  },

  // FIXED: #1d4ed8 on white = 7.22:1 — AAA.
  // Was #9ca3af text + border on white (2.54:1) in the broken version.
  // Ghost buttons are NOT exempt from contrast requirements.
  btnGhost: {
    backgroundColor: 'transparent',
    color: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
};

export default function ArticleCard() {
  return (
    <div style={styles.page}>
      <article style={styles.card} aria-label="Article preview">
        <span style={styles.tag}>Accessibility</span>

        <h1 style={styles.title}>Getting Started with Web Accessibility</h1>

        <p style={styles.meta}>
          By{' '}
          <a href="#" style={styles.metaLink}>
            Sarah Chen
          </a>
          {' \u00b7 '}March 12, 2024{' \u00b7 '}8 min read
        </p>

        <p style={styles.body}>
          Web accessibility ensures that people with disabilities can use, understand,
          and interact with your website. Starting with the basics is easier than you
          think — and the improvements benefit every user, not just those with disabilities.
        </p>

        <p style={styles.secondary}>
          This article covers the fundamentals of WCAG 2.1, practical implementation
          tips, and tools you can use to audit your own sites today without expensive software.
        </p>

        <div style={styles.footer}>
          <a href="#" style={{ ...styles.btn, ...styles.btnPrimary }}>
            Read article
          </a>
          <a href="#" style={{ ...styles.btn, ...styles.btnGhost }}>
            Save for later
          </a>
        </div>
      </article>
    </div>
  );
}
