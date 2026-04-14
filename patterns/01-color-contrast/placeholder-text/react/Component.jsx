// react/Component.jsx
// Pattern: Placeholder Text — Color Contrast
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import ContactForm from './Component';
//   <ContactForm />

import React from 'react';

// Inline styles for ::placeholder require a <style> tag or CSS-in-JS library,
// since React's style prop does not support pseudo-elements.
// This component injects a <style> element into the document head.
// In a real app, place this CSS in your global stylesheet or a CSS module.
const PLACEHOLDER_STYLE = `
  .contact-form__input::placeholder {
    color: #767676; /* 4.54:1 on white — meets WCAG 1.4.3 AA */
  }
`;

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
    maxWidth: '480px',
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

  // ADDED: Visible, persistent label for each field.
  // Labels do not disappear when the user types — placeholders do.
  // #374151 on white = 8.59:1 (AAA)
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
  },

  optionalBadge: {
    fontSize: '0.8125rem',
    fontWeight: '400',
    color: '#6b7280',
    marginLeft: '0.25rem',
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

  textarea: {
    width: '100%',
    padding: '0.625rem 0.875rem',
    fontSize: '0.9375rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '100px',
  },

  // FIXED: Helper text #4a5568 on white = 5.74:1 (AA).
  // Was: #aaaaaa on white = 2.32:1 (failed).
  helper: {
    fontSize: '0.8125rem',
    color: '#4a5568',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
  },

  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9375rem',
    fontWeight: '600',
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
    border: '2px solid #1d4ed8',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
};

export default function ContactForm() {
  return (
    <div style={styles.page}>
      {/* Inject placeholder styles — move to a CSS file in production */}
      <style>{PLACEHOLDER_STYLE}</style>

      <form style={styles.form} aria-label="Contact form">
        <h1 style={styles.title}>Get in touch</h1>
        <p style={styles.description}>
          Send us a message and we&apos;ll get back to you within one business day.
        </p>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="name">Full name</label>
          <input
            className="contact-form__input"
            style={styles.input}
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Sarah Chen"
            autoComplete="name"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="email">Email address</label>
          <input
            className="contact-form__input"
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="e.g. sarah@example.com"
            autoComplete="email"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="phone">
            Phone number
            <span style={styles.optionalBadge}>(optional)</span>
          </label>
          <input
            className="contact-form__input"
            style={styles.input}
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="message">Message</label>
          <textarea
            className="contact-form__input"
            style={styles.textarea}
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us what you need help with"
          />
        </div>

        <p style={styles.helper}>We respond to all enquiries within 24 hours.</p>

        <button type="submit" style={styles.btn}>
          Send message
        </button>
      </form>
    </div>
  );
}
