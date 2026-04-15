// react/Component.jsx
// Pattern: Modal Dialog Focus Trap — Focus Management
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import Modal from './Component';
//   <Modal />

import React, { useState, useEffect, useRef } from 'react';

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

  p: {
    marginBottom: '1rem',
  },

  content: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
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

  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
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

  btnSecondary: {
    backgroundColor: '#f3f4f6',
    color: '#1a1a1a',
  },

  btnDanger: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
  },

  link: {
    color: '#1d4ed8',
    textDecoration: 'underline',
  },

  modal: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '1.5rem',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: '0 0 0.75rem 0',
    color: '#1a1a1a',
  },

  modalDescription: {
    margin: '0 0 1.5rem 0',
    color: '#4a5568',
  },

  modalActions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
  },
};

// Get all focusable elements within a container
function getFocusableElements(container) {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]'
  ];
  return Array.from(container?.querySelectorAll?.(focusableSelectors.join(', ')) || []);
}

// Modal component with focus trap
function Modal({ isOpen, onClose, title, description, children }) {
  const modalRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  // FIXED: Store the element that had focus before modal opened
  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement;
    }
  }, [isOpen]);

  // FIXED: Set initial focus when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = getFocusableElements(modalRef.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        modalRef.current.focus();
      }
    }
  }, [isOpen]);

  // FIXED: Restore focus when modal closes
  useEffect(() => {
    if (!isOpen && lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, [isOpen]);

  // FIXED: Trap focus within the modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleKeyDown = (event) => {
      const focusableElements = getFocusableElements(modalRef.current);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift+Tab: if focus is on first element, move to last
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: if focus is on last element, move to first
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const modalElement = modalRef.current;
    modalElement.addEventListener('keydown', handleKeyDown);

    return () => {
      modalElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // FIXED: Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // FIXED: Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      style={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
    >
      <div
        className="modal__overlay"
        style={styles.modalOverlay}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="modal__content"
        style={styles.modalContent}
        tabIndex={-1}
      >
        <h2 id="modal-title" style={styles.modalTitle}>
          {title}
        </h2>
        <p id="modal-desc" style={styles.modalDescription}>
          {description}
        </p>
        <div className="modal__actions" style={styles.modalActions}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Main component
export default function ModalDialogExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.h1}>Modal Dialog Focus Trap — React</h1>
        <p style={styles.p}>
          This version demonstrates a modal with proper focus management in React.
        </p>

        <div style={styles.content}>
          <h2 style={styles.h2}>Page Content</h2>
          <p style={styles.p}>
            This is the main page content that should be obscured when the modal is open.
          </p>

          <form>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Name:
              </label>
              <input type="text" id="name" name="name" style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <input type="email" id="email" name="email" style={styles.input} />
            </div>
            <button type="submit" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Submit Form
            </button>
          </form>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={openModal}
              style={{ ...styles.btn, ...styles.btnPrimary }}
            >
              Open Modal
            </button>
            <a href="#" style={styles.link}>
              Another link
            </a>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
      >
        <button
          type="button"
          onClick={closeModal}
          style={{ ...styles.btn, ...styles.btnSecondary }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={closeModal}
          style={{ ...styles.btn, ...styles.btnDanger }}
        >
          Delete Account
        </button>
      </Modal>
    </div>
  );
}
