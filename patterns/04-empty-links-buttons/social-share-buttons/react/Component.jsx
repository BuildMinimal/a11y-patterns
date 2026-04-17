import React from 'react';

const ARTICLE = {
  category: 'Accessibility',
  title: 'Why Colour Contrast Matters More Than You Think',
  meta: 'By Jordan Lee · 12 April 2026 · 5 min read',
};

const SHARE_BUTTONS = [
  {
    label: 'Share on X',
    className: 'share-btn--x',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Share on Facebook',
    className: 'share-btn--facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Share on LinkedIn',
    className: 'share-btn--linkedin',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Copy link',
    className: 'share-btn--copy',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
];

const styles = {
  body: { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', margin: 0 },
  main: { maxWidth: 720, margin: '0 auto', padding: '2rem' },
  header: { marginBottom: '1.5rem' },
  category: { fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2563eb', marginBottom: '0.5rem', display: 'block' },
  title: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem' },
  meta: { fontSize: '0.875rem', color: '#4a5568' },
  body: { fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' },
  shareBar: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' },
  shareLabel: { fontSize: '0.875rem', fontWeight: 600, color: '#4a5568', flexShrink: 0 },
  shareButtons: { display: 'flex', gap: '0.5rem' },
  btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, border: 'none', cursor: 'pointer', padding: 0 },
};

const platformStyles = {
  'share-btn--x':        { background: '#000000', color: '#ffffff' },
  'share-btn--facebook': { background: '#1877f2', color: '#ffffff' },
  'share-btn--linkedin': { background: '#0a66c2', color: '#ffffff' },
  'share-btn--copy':     { background: '#e2e8f0', color: '#1a1a1a' },
};

export default function DevBlogArticle() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', margin: 0 }}>
      <main style={styles.main}>
        <article>
          <header style={styles.header}>
            <span style={styles.category}>{ARTICLE.category}</span>
            <h1 style={styles.title}>{ARTICLE.title}</h1>
            <p style={styles.meta}>{ARTICLE.meta}</p>
          </header>

          <div style={{ fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            <p>Colour contrast is often treated as a checkbox — run the tool, hit 4.5:1, move on. But the real impact of poor contrast extends far beyond users with low vision.</p>
            <p style={{ marginTop: '1rem' }}>WCAG 2.2 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. These thresholds are derived from decades of vision science research.</p>
          </div>

          {/* FIX: aria-label on each button; SVGs are aria-hidden */}
          <div style={styles.shareBar}>
            <span style={styles.shareLabel} aria-hidden="true">Share:</span>
            <div style={styles.shareButtons} role="group" aria-label="Share this article">
              {SHARE_BUTTONS.map(({ label, className, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  style={{ ...styles.btn, ...platformStyles[className] }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
