// react/Component.jsx
// Pattern: Text on Gradient — Color Contrast
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import GradientHero from './Component';
//   <GradientHero />

import React from 'react';

// All color values come from tokens.json in this pattern folder.
const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#f8fafc',
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  // FIXED: Gradient runs from #0f172a → #1e3a8a — dark throughout.
  // White text against lightest point (#1e3a8a) = 10.4:1 (AAA).
  // Rule: test the LIGHTEST gradient endpoint for white text contrast.
  // Was: #1e3a8a → #7dd3fc — white text on #7dd3fc = 1.75:1 (failed).
  hero: {
    maxWidth: '700px',
    width: '100%',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    borderRadius: '12px',
    padding: '4rem 3rem',
    color: '#ffffff',
  },

  content: {
    maxWidth: '520px',
  },

  eyebrow: {
    fontSize: '0.8125rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#ffffff',
    marginBottom: '1rem',
    display: 'block',
    opacity: 0.85,
    // 0.85 opacity on white over #0f172a ≈ still 16.6:1 — safe.
    // Never reduce opacity without re-verifying contrast.
  },

  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1.2',
    marginBottom: '1rem',
  },

  subtext: {
    fontSize: '1.0625rem',
    lineHeight: '1.7',
    color: '#ffffff',
    marginBottom: '2rem',
  },

  actions: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },

  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9375rem',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    lineHeight: '1',
    border: '2px solid transparent',
  },

  // FIXED: Flipped to light button on dark background.
  // #0f172a on #ffffff = 19.5:1 (AAA).
  // Was: white on #7dd3fc = 1.75:1 (failed).
  btnPrimary: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    borderColor: '#ffffff',
  },

  // FIXED: Ghost button with transparent bg + white text on dark hero.
  // White text on dark gradient = 10.4:1–19.5:1 (AAA throughout).
  // Was: white on #93c5fd = 1.80:1 (failed).
  btnGhost: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderColor: '#ffffff',
  },
};

export default function GradientHero() {
  return (
    <div style={styles.page}>
      <section style={styles.hero} aria-label="Promotional banner">
        <div style={styles.content}>
          <span style={styles.eyebrow}>New release</span>

          <h1 style={styles.heading}>
            Design systems that scale with your team
          </h1>

          <p style={styles.subtext}>
            Ship accessible, consistent UI faster. Built for product teams who
            can&apos;t afford to choose between speed and quality.
          </p>

          <div style={styles.actions}>
            <a href="#" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Start for free
            </a>
            <a href="#" style={{ ...styles.btn, ...styles.btnGhost }}>
              Watch demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
