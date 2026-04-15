// react/Component.jsx
// Pattern: Toast Notifications — Focus Management
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import ToastNotifications from './Component';
//   <ToastNotifications />

import React, { useState, useEffect, useCallback } from 'react';

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: '1.6',
    color: '#1a1a1a',
    margin: 0,
    padding: 0,
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },

  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },

  h1: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },

  h2: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },

  h3: {
    fontSize: '1.25rem',
    marginBottom: '0.75rem',
  },

  p: {
    marginBottom: '1rem',
  },

  content: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },

  actions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },

  form: {
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
  },

  formGroup: {
    marginBottom: '1rem',
  },

  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },

  input: {
    width: '100%',
    padding: '0.625rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
  },

  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.625rem 1.25rem',
    fontSize: '0.9375rem',
    fontWeight: '500',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },

  btnPrimary: {
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
  },

  btnSuccess: {
    backgroundColor: '#059669',
    color: '#ffffff',
  },

  btnDanger: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
  },

  btnWarning: {
    backgroundColor: '#d97706',
    color: '#ffffff',
  },

  btnInfo: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },

  toastContainer: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  toast: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.25rem',
    borderRadius: '6px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    minWidth: '300px',
    animation: 'slideIn 0.3s ease',
  },

  toastSuccess: {
    backgroundColor: '#059669',
    color: '#ffffff',
  },

  toastError: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
  },

  toastWarning: {
    backgroundColor: '#d97706',
    color: '#ffffff',
  },

  toastInfo: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },

  toastDismiss: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '1.25rem',
    cursor: 'pointer',
    padding: '0 0.25rem',
    marginLeft: '0.5rem',
    opacity: 0.8,
    transition: 'opacity 0.15s ease',
  },
};

const TOAST_DURATION = 5000; // 5 seconds

// FIXED: Toast notification component with aria-live
function ToastNotifications() {
  const [toasts, setToasts] = useState([]);

  // FIXED: Show toast with proper ARIA attributes
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type,
      role: 'alert',
      'aria-live': 'polite',
      'aria-atomic': true,
    };

    setToasts(prev => [...prev, newToast]);

    // FIXED: Auto-dismiss after timeout
    const timeoutId = setTimeout(() => {
      dismissToast(id);
    }, TOAST_DURATION);

    return () => clearTimeout(timeoutId);
  }, []);

  // FIXED: Dismiss toast and remove from state
  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.h1}>Toast Notifications — React</h1>
        <p style={styles.p}>
          This version demonstrates a toast notification with proper screen reader announcements in React.
        </p>

        <div style={styles.content}>
          <h2 style={styles.h2}>Notification Demo</h2>
          <p style={styles.p}>Click the buttons below to trigger different toast notifications.</p>

          <div style={styles.actions}>
            <button
              type="button"
              style={{ ...styles.btn, ...styles.btnSuccess }}
              onClick={() => showToast('Changes saved successfully!', 'success')}
            >
              Show Success Toast
            </button>
            <button
              type="button"
              style={{ ...styles.btn, ...styles.btnDanger }}
              onClick={() => showToast('Failed to save changes. Please try again.', 'error')}
            >
              Show Error Toast
            </button>
            <button
              type="button"
              style={{ ...styles.btn, ...styles.btnWarning }}
              onClick={() => showToast('Your session will expire in 5 minutes.', 'warning')}
            >
              Show Warning Toast
            </button>
            <button
              type="button"
              style={{ ...styles.btn, ...styles.btnInfo }}
              onClick={() => showToast('New message received from John.', 'info')}
            >
              Show Info Toast
            </button>
          </div>

          <div style={styles.form}>
            <h3 style={styles.h3}>Test Form</h3>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.label}>
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                style={styles.input}
              />
            </div>
            <button
              type="button"
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={() => showToast('Form submitted successfully!', 'success')}
            >
              Submit Form
            </button>
          </div>
        </div>
      </main>

      {/* FIXED: Toast container with aria-live for screen reader announcements */}
      <div
        style={styles.toastContainer}
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              ...(toast.type === 'success' && styles.toastSuccess),
              ...(toast.type === 'error' && styles.toastError),
              ...(toast.type === 'warning' && styles.toastWarning),
              ...(toast.type === 'info' && styles.toastInfo),
            }}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <span>{toast.message}</span>
            <button
              type="button"
              style={styles.toastDismiss}
              aria-label="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToastNotifications;
