import React from 'react';

const NAV_LINKS = ['Getting Started', 'WCAG Guidelines', 'Patterns', 'Testing', 'Resources', 'About'];
const SIDEBAR_LINKS = ['What is WCAG 2.4.1?', 'Who benefits?', 'Implementation', 'Testing checklist', 'Related patterns'];

const styles = {
  page: { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', margin: 0 },
  /*
    Skip link: hidden off-screen by default, appears on focus.
    In React we handle the visible-on-focus state via CSS class + onFocus/onBlur,
    or rely on a stylesheet with .skip-link:focus { transform: translateY(0) }.
  */
  skipLink: {
    position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 9999,
    padding: '0.625rem 1rem', background: '#2563eb', color: '#ffffff',
    fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none', borderRadius: 6,
  },
  nav: { background: '#1a1a1a', padding: '0 2rem' },
  navInner: { maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', height: 56 },
  navLogo: { fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', textDecoration: 'none', marginRight: 'auto' },
  navList: { listStyle: 'none', display: 'flex', padding: 0 },
  navLink: { display: 'block', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, color: '#d1d5db', textDecoration: 'none' },
  pageContent: { maxWidth: 900, margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 260px', gap: '2rem' },
  sidebar: { order: 2 },
  sidebarHeading: { fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4a5568', marginBottom: '0.75rem' },
  sidebarList: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  sidebarLink: { display: 'block', fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none', padding: '0.25rem 0' },
  article: { order: 1 },
  articleTitle: { fontSize: '1.625rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' },
  articleMeta: { fontSize: '0.875rem', color: '#4a5568', marginBottom: '1.25rem' },
  articleBody: { fontSize: '1rem', lineHeight: 1.75 },
};

export default function A11yDocs() {
  return (
    <div style={styles.page}>
      {/*
        FIX: Skip link is the first element rendered — therefore the first Tab stop.
        Uses CSS transform to hide off-screen and reveal on :focus.
        Include the .skip-link CSS class in your stylesheet for the focus animation.
      */}
      <a href="#main-content" className="skip-link" style={styles.skipLink}>
        Skip to main content
      </a>

      <nav style={styles.nav} aria-label="Site navigation">
        <div style={styles.navInner}>
          <a href="#" style={styles.navLogo}>A11y Docs</a>
          <ul style={styles.navList}>
            {NAV_LINKS.map(label => (
              <li key={label}><a href="#" style={styles.navLink}>{label}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      <div style={styles.pageContent}>
        <nav style={styles.sidebar} aria-label="Page contents">
          <p style={styles.sidebarHeading} aria-hidden="true">On this page</p>
          <ul style={styles.sidebarList}>
            {SIDEBAR_LINKS.map(label => (
              <li key={label}><a href="#" style={styles.sidebarLink}>{label}</a></li>
            ))}
          </ul>
        </nav>

        {/*
          FIX: <main id="main-content" tabindex="-1">
          tabindex="-1" allows programmatic focus from the skip link without
          making the element a manual Tab stop.
        */}
        <main style={styles.article} id="main-content" tabIndex={-1}>
          <h1 style={styles.articleTitle}>WCAG 2.4.1 — Bypass Blocks</h1>
          <p style={styles.articleMeta}>Category: Navigable · Level: A</p>
          <div style={styles.articleBody}>
            <p>A mechanism is available to bypass blocks of content that are repeated on multiple web pages. For keyboard-only users, navigating past a large navigation menu on every page visit is a significant burden.</p>
            <p style={{ marginTop: '1rem' }}>Screen reader users have their own bypass mechanisms — heading navigation, landmark regions, links list. But sighted keyboard users have none of these unless the page explicitly provides a skip link.</p>
          </div>
        </main>
      </div>

      {/* Skip link focus animation — include this in your global stylesheet */}
      <style>{`
        .skip-link { transform: translateY(calc(-100% - 1rem)); transition: transform 0.15s; }
        .skip-link:focus { transform: translateY(0); }
      `}</style>
    </div>
  );
}
