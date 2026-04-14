// react/Component.jsx
// Pattern: Disabled State Contrast — Color Contrast
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import AccountSettings from './Component';
//   <AccountSettings />

import React from 'react';

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

  form: {
    maxWidth: '520px',
    width: '100%',
    padding: '2rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
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

  field: {
    marginBottom: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
  },

  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
  },

  input: {
    padding: '0.625rem 0.875rem',
    fontSize: '0.9375rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
  },

  // FIXED: React applies `disabled` as a boolean prop, which sets the HTML disabled attribute.
  // WCAG 1.4.3 exempts natively disabled controls — axe skips contrast checks for them.
  // We still use readable colors as usability best practice:
  //   #6b7280 on #f3f4f6 = 3.39:1 — visible but clearly "inactive"
  // Was: #c0c0c0 on #f3f4f6 = 1.66:1 (CSS-only disabled, axe flagged it)
  inputDisabled: {
    padding: '0.625rem 0.875rem',
    fontSize: '0.9375rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    fontFamily: 'inherit',
    cursor: 'not-allowed',
  },

  hint: {
    fontSize: '0.8125rem',
    color: '#6b7280',
  },

  actions: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem',
  },

  btnBase: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.625rem 1.25rem',
    fontSize: '0.9375rem',
    fontWeight: '500',
    borderRadius: '6px',
    cursor: 'pointer',
    border: '2px solid transparent',
    fontFamily: 'inherit',
  },

  btnPrimary: {
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
    borderColor: '#1d4ed8',
  },

  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#374151',
    borderColor: '#d1d5db',
  },

  // FIXED: When disabled={true} is passed to a <button>, React sets the HTML disabled attr.
  // WCAG-exempt. Readable visual styling maintained.
  btnDisabled: {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    borderColor: '#d1d5db',
    cursor: 'not-allowed',
  },
};

export default function AccountSettings() {
  return (
    <div style={styles.page}>
      <form style={styles.form} aria-label="Account settings">
        <h1 style={styles.title}>Account Settings</h1>
        <p style={styles.description}>
          Update your profile information. Fields marked as read-only cannot be changed.
        </p>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="email">Email address</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            defaultValue="sarah.chen@example.com"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="username">Username</label>
          {/* disabled={true} sets the HTML disabled attribute — WCAG-exempt */}
          <input
            style={styles.inputDisabled}
            type="text"
            id="username"
            name="username"
            defaultValue="sarah_chen_42"
            disabled
          />
          <span style={styles.hint}>Usernames cannot be changed after account creation.</span>
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="plan">Current plan</label>
          <input
            style={styles.inputDisabled}
            type="text"
            id="plan"
            name="plan"
            defaultValue="Pro — $12/month"
            disabled
          />
          <span style={styles.hint}>Manage your plan in the Billing section.</span>
        </div>

        <div style={styles.actions}>
          <button
            type="submit"
            style={{ ...styles.btnBase, ...styles.btnPrimary }}
          >
            Save changes
          </button>
          <button
            type="button"
            style={{ ...styles.btnBase, ...styles.btnDisabled }}
            disabled
          >
            Request data export
          </button>
        </div>
      </form>
    </div>
  );
}
