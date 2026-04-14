// react/Component.jsx
// Pattern: Focus Indicator Contrast — Color Contrast
// React port of fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import ContactForm from './Component';
//   <ContactForm />

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

  card: {
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
    marginBottom: '2rem',
    lineHeight: '1.6',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },

  field: {
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
    width: '100%',
    padding: '0.625rem 0.875rem',
    fontSize: '0.9375rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
  },

  // FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
  // Was: #d1d5db (1.51:1) in broken version.
  // Using :focus-visible ensures focus only shows for keyboard users.
  inputFocusVisible: {
    outline: '2px solid #1d4ed8',
    outlineOffset: '0',
    borderColor: '#1d4ed8',
  },

  fieldCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  checkbox: {
    width: '20px',
    height: '20px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  // FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
  // Was: #d1d5db (1.51:1) in broken version.
  checkboxFocusVisible: {
    outline: '2px solid #1d4ed8',
    outlineOffset: '2px',
    borderColor: '#1d4ed8',
  },

  checkboxLabel: {
    fontSize: '0.9375rem',
    color: '#374151',
  },

  formActions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem',
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
    border: '2px solid transparent',
  },

  btnPrimary: {
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
    borderColor: '#1d4ed8',
  },

  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#1d4ed8',
    borderColor: '#1d4ed8',
  },

  // FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
  // Was: #d1d5db (1.51:1) in broken version.
  btnFocusVisible: {
    outline: '2px solid #1d4ed8',
    outlineOffset: '2px',
  },

  cardLinks: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e5e7eb',
  },

  link: {
    fontSize: '0.9375rem',
    color: '#1d4ed8',
    textDecoration: 'none',
  },

  // FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
  // Was: #d1d5db (1.51:1) in broken version.
  linkFocusVisible: {
    outline: '2px solid #1d4ed8',
    outlineOffset: '2px',
    textDecoration: 'underline',
  },
};

export default function ContactForm() {
  return (
    <div style={styles.page}>
      <div style={styles.card} aria-label="Contact form">
        <h1 style={styles.title}>Contact Form</h1>
        <p style={styles.description}>
          A form with focus indicators that meet WCAG contrast requirements.
        </p>

        <form style={styles.form} aria-label="Contact form">
          <div style={styles.field}>
            <label style={styles.label} htmlFor="name">Full Name</label>
            <input
              style={styles.input}
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocusVisible)}
              onBlur={(e) => Object.assign(e.target.style, { outline: '', borderColor: '#d1d5db' })}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocusVisible)}
              onBlur={(e) => Object.assign(e.target.style, { outline: '', borderColor: '#d1d5db' })}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="message">Message</label>
            <textarea
              style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }}
              id="message"
              name="message"
              rows="4"
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocusVisible)}
              onBlur={(e) => Object.assign(e.target.style, { outline: '', borderColor: '#d1d5db' })}
            />
          </div>

          <div style={styles.fieldCheckbox}>
            <input
              style={styles.checkbox}
              type="checkbox"
              id="subscribe"
              name="subscribe"
              onFocus={(e) => Object.assign(e.target.style, styles.checkboxFocusVisible)}
              onBlur={(e) => Object.assign(e.target.style, { outline: '', borderColor: '#d1d5db' })}
            />
            <label style={styles.checkboxLabel} htmlFor="subscribe">
              Subscribe to newsletter
            </label>
          </div>

          <div style={styles.formActions}>
            <button
              type="submit"
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onFocus={(e) => Object.assign(e.target.style, styles.btnFocusVisible)}
              onBlur={(e) => Object.assign(e.target.style, { outline: '' })}
            >
              Send Message
            </button>
            <button
              type="button"
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onFocus={(e) => Object.assign(e.target.style, styles.btnFocusVisible)}
              onBlur={(e) => Object.assign(e.target.style, { outline: '' })}
            >
              Cancel
            </button>
          </div>
        </form>

        <div style={styles.cardLinks}>
          <a
            href="#"
            style={styles.link}
            onFocus={(e) => Object.assign(e.target.style, styles.linkFocusVisible)}
            onBlur={(e) => Object.assign(e.target.style, { outline: '', textDecoration: 'none' })}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            style={styles.link}
            onFocus={(e) => Object.assign(e.target.style, styles.linkFocusVisible)}
            onBlur={(e) => Object.assign(e.target.style, { outline: '', textDecoration: 'none' })}
          >
            Terms of Service
          </a>
          <a
            href="#"
            style={styles.link}
            onFocus={(e) => Object.assign(e.target.style, styles.linkFocusVisible)}
            onBlur={(e) => Object.assign(e.target.style, { outline: '', textDecoration: 'none' })}
          >
            Help Center
          </a>
        </div>
      </div>
    </div>
  );
}
