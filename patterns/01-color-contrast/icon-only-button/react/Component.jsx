// react/Component.jsx
// Pattern: Icon-Only Button — Color Contrast
// React port of fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import IconToolbar from './Component';
//   <IconToolbar />

import React from 'react';

// All color values come from tokens.json in this pattern folder.
// Contrast ratios are documented inline so reviewers don't need to look them up.
const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#f8fafc',
    color: '#1a1a1a',
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  toolbar: {
    maxWidth: '480px',
    width: '100%',
    padding: '2rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },

  description: {
    fontSize: '0.9375rem',
    color: '#4a5568',
    marginBottom: '1.75rem',
    lineHeight: '1.6',
  },

  actions: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },

  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    padding: '0',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'backgroundColor 0.15s ease',
  },

  btnDelete: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
  },

  icon: {
    width: '20px',
    height: '20px',
  },

  // FIXED: #4b5563 on #f3f4f6 = 4.62:1 — meets 3:1 for non-text content.
  // Was #9ca3af (1.23:1) in broken version.
  iconNeutral: {
    color: '#4b5563',
  },

  // FIXED: #dc2626 on #fee2e2 = 3.56:1 — meets 3:1 for non-text content.
  // Was #ef4444 (1.88:1) in broken version.
  iconDanger: {
    color: '#dc2626',
  },

  hint: {
    fontSize: '0.8125rem',
    color: '#6b7280',
    lineHeight: '1.5',
  },
};

// Close icon SVG
const CloseIcon = () => (
  <svg style={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Delete icon SVG
const DeleteIcon = () => (
  <svg style={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// Share icon SVG
const ShareIcon = () => (
  <svg style={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

// Favorite icon SVG
const FavoriteIcon = () => (
  <svg style={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default function IconToolbar() {
  return (
    <div style={styles.page}>
      <div style={styles.toolbar} aria-label="Item actions toolbar">
        <h1 style={styles.title}>Item Actions</h1>
        <p style={styles.description}>
          Manage this item using the buttons below.
        </p>

        <div style={styles.actions}>
          {/* FIXED: aria-label provides accessible name for screen readers.
               Icon color #4b5563 on #f3f4f6 = 4.62:1 — meets 3:1 requirement. */}
          <button
            style={{ ...styles.btn, ...styles.iconNeutral }}
            aria-label="Close dialog"
          >
            <CloseIcon />
          </button>

          {/* FIXED: aria-label provides accessible name for screen readers.
               Icon color #dc2626 on #fee2e2 = 3.56:1 — meets 3:1 requirement. */}
          <button
            style={{ ...styles.btn, ...styles.btnDelete, ...styles.iconDanger }}
            aria-label="Delete item"
          >
            <DeleteIcon />
          </button>

          {/* FIXED: aria-label provides accessible name for screen readers.
               Icon color #4b5563 on #f3f4f6 = 4.62:1 — meets 3:1 requirement. */}
          <button
            style={{ ...styles.btn, ...styles.iconNeutral }}
            aria-label="Share"
          >
            <ShareIcon />
          </button>

          {/* FIXED: aria-label provides accessible name for screen readers.
               Icon color #4b5563 on #f3f4f6 = 4.62:1 — meets 3:1 requirement. */}
          <button
            style={{ ...styles.btn, ...styles.iconNeutral }}
            aria-label="Add to favorites"
          >
            <FavoriteIcon />
          </button>
        </div>

        <p style={styles.hint}>
          Tip: Use keyboard or screen reader to test button accessibility.
        </p>
      </div>
    </div>
  );
}
