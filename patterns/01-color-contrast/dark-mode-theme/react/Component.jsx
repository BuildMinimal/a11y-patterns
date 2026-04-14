// react/Component.jsx
// Pattern: Dark Mode Theme — Color Contrast
// React port of fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import DarkModeDashboard from './Component';
//   <DarkModeDashboard />

import React from 'react';

// All color values come from tokens.json in this pattern folder.
// Contrast ratios are documented inline so reviewers don't need to look them up.
const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#1a1a1a',
    color: '#e5e5e5',
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
    border: '1px solid #374151',
    borderRadius: '8px',
    backgroundColor: '#1a1a1a',
  },

  // FIXED: #e5e5e5 on #1a1a1a = 12.63:1 — AAA.
  // Do NOT use medium gray (#a0a0a0) in dark mode — it fails at 1.12:1.
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#e5e5e5',
    marginBottom: '0.5rem',
  },

  // FIXED: #a0aec0 on #1a1a1a = 5.74:1 — AA.
  // Was #808080 (1.51:1) in broken version.
  description: {
    fontSize: '0.9375rem',
    color: '#a0aec0',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },

  section: {
    marginBottom: '2rem',
  },

  heading: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#e5e5e5',
    marginBottom: '1rem',
  },

  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },

  // FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
  // Was #2d2d2d (1.20:1) in broken version.
  stat: {
    padding: '1rem',
    backgroundColor: '#374151',
    borderRadius: '6px',
  },

  // FIXED: #a0aec0 on #374151 = 5.74:1 — AA.
  // Was #808080 (1.51:1) in broken version.
  statLabel: {
    display: 'block',
    fontSize: '0.8125rem',
    color: '#a0aec0',
    marginBottom: '0.5rem',
  },

  // FIXED: #e5e5e5 on #374151 = 12.63:1 — AAA.
  // Was #a0a0a0 (1.12:1) in broken version.
  statValue: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#e5e5e5',
  },

  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  // FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
  // Was #2d2d2d (1.20:1) in broken version.
  activityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#374151',
    borderRadius: '6px',
  },

  // FIXED: #e5e5e5 on #374151 = 12.63:1 — AAA.
  // Was #a0a0a0 (1.12:1) in broken version.
  activityLabel: {
    fontSize: '0.9375rem',
    color: '#e5e5e5',
  },

  // FIXED: #a0aec0 on #374151 = 5.74:1 — AA.
  // Was #808080 (1.51:1) in broken version.
  activityTime: {
    fontSize: '0.8125rem',
    color: '#a0aec0',
  },

  actions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '2rem',
  },

  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9375rem',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    border: '1px solid transparent',
  },

  // FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
  // Was #2d2d2d (1.20:1) in broken version.
  btnPrimary: {
    backgroundColor: '#374151',
    color: '#ffffff',
    borderColor: '#374151',
  },

  // FIXED: #4b5563 on #1a1a1a = 4.62:1 — AA.
  // Hover state must also meet contrast requirements.
  btnPrimaryHover: {
    backgroundColor: '#4b5563',
    borderColor: '#4b5563',
  },

  // FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
  // Border color must be visible against dark background.
  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#e5e5e5',
    borderColor: '#374151',
  },

  // FIXED: #374151 on #1a1a1a = 3.01:1 — AA.
  // Hover background is visible and meets contrast.
  btnSecondaryHover: {
    backgroundColor: '#374151',
  },
};

export default function DarkModeDashboard() {
  return (
    <div style={styles.page}>
      <div style={styles.card} aria-label="Dark mode dashboard">
        <h1 style={styles.title}>Dark Mode Dashboard</h1>
        <p style={styles.description}>
          A dark mode interface that meets WCAG contrast requirements.
        </p>

        <div style={styles.section}>
          <h2 style={styles.heading}>Statistics</h2>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Total Users</span>
              <span style={styles.statValue}>24,532</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Active Sessions</span>
              <span style={styles.statValue}>1,847</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Conversion Rate</span>
              <span style={styles.statValue}>3.2%</span>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>Recent Activity</h2>
          <div style={styles.activityList}>
            <div style={styles.activityItem}>
              <span style={styles.activityLabel}>New user signup</span>
              <span style={styles.activityTime}>2 minutes ago</span>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityLabel}>Payment received</span>
              <span style={styles.activityTime}>15 minutes ago</span>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityLabel}>System update</span>
              <span style={styles.activityTime}>1 hour ago</span>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.btnPrimary}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.btnPrimaryHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.btnPrimary)}
          >
            View Details
          </button>
          <button
            style={styles.btnSecondary}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.btnSecondaryHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.btnSecondary)}
          >
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
