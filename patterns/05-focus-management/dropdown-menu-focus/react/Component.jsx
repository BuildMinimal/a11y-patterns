// react/Component.jsx
// Pattern: Dropdown Menu Focus — Focus Management
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import DropdownMenu from './Component';
//   <DropdownMenu />

import React, { useState, useRef, useEffect, useCallback } from 'react';

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

  otherContent: {
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
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
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
  },

  link: {
    color: '#1d4ed8',
    textDecoration: 'underline',
    marginRight: '1rem',
  },

  dropdown: {
    position: 'relative',
    display: 'inline-block',
  },

  dropdownTrigger: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    fontSize: '0.9375rem',
    fontWeight: '500',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    cursor: 'pointer',
  },

  dropdownIcon: {
    transition: 'transform 0.15s ease',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 0.25rem)',
    left: 0,
    minWidth: '200px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 100,
  },

  dropdownItem: {
    display: 'block',
    padding: '0.625rem 1rem',
    color: '#1a1a1a',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },

  dropdownItemDanger: {
    color: '#dc2626',
  },

  dropdownSeparator: {
    margin: '0.25rem 0',
    border: 'none',
    borderTop: '1px solid #e5e7eb',
  },
};

// FIXED: Get all focusable menu items (excluding separators)
function getFocusableItems(menuRef) {
  if (!menuRef.current) return [];
  return Array.from(
    menuRef.current.querySelectorAll('[role="menuitem"]')
  );
}

// Dropdown menu component with keyboard navigation
function DropdownMenu({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  // FIXED: Open dropdown with proper focus management
  const openDropdown = useCallback(() => {
    setIsOpen(true);
    setFocusedIndex(0);
  }, []);

  // FIXED: Close dropdown with focus restoration
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
    // Return focus to trigger button
    triggerRef.current?.focus();
  }, []);

  // FIXED: Handle keyboard navigation within the dropdown
  const handleMenuKeyDown = useCallback((event) => {
    const focusableItems = getFocusableItems(menuRef);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        // Move to next item, wrap to first if at end
        setFocusedIndex((prev) => (prev + 1) % focusableItems.length);
        break;

      case 'ArrowUp':
        event.preventDefault();
        // Move to previous item, wrap to last if at start
        setFocusedIndex((prev) => (prev - 1 + focusableItems.length) % focusableItems.length);
        break;

      case 'Home':
        event.preventDefault();
        // Jump to first item
        setFocusedIndex(0);
        break;

      case 'End':
        event.preventDefault();
        // Jump to last item
        setFocusedIndex(focusableItems.length - 1);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        // Activate the currently focused item
        if (focusedIndex >= 0 && focusableItems[focusedIndex]) {
          focusableItems[focusedIndex].click();
        }
        break;

      case 'Escape':
        event.preventDefault();
        // Close the dropdown
        closeDropdown();
        break;

      case 'Tab':
        // FIXED: Close the dropdown when Tab is pressed
        event.preventDefault();
        closeDropdown();
        break;
    }
  }, [focusedIndex, closeDropdown]);

  // FIXED: Handle trigger button keyboard events
  const handleTriggerKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          // If already open, focus the menu
          const focusableItems = getFocusableItems(menuRef);
          if (focusableItems.length > 0) {
            focusableItems[0].focus();
          }
        } else {
          openDropdown();
        }
        break;

      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          closeDropdown();
        }
        break;
    }
  }, [isOpen, openDropdown, closeDropdown]);

  // FIXED: Handle click outside to close
  const handleClickOutside = useCallback((event) => {
    if (
      triggerRef.current &&
      !triggerRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      if (isOpen) {
        closeDropdown();
      }
    }
  }, [isOpen, closeDropdown]);

  // FIXED: Set focus to the currently focused item
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const focusableItems = getFocusableItems(menuRef);
      if (focusableItems[focusedIndex]) {
        focusableItems[focusedIndex].focus();
      }
    }
  }, [isOpen, focusedIndex]);

  // FIXED: Add click outside listener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  // FIXED: Rotate icon when dropdown is open
  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  }, [isOpen]);

  return (
    <div style={styles.dropdown}>
      <button
        ref={triggerRef}
        style={styles.dropdownTrigger}
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span>Account</span>
        <svg
          ref={iconRef}
          style={styles.dropdownIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 11L3 6h10l-5 5z" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          style={styles.dropdownMenu}
          role="menu"
          aria-labelledby="dropdown-trigger"
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <hr
                  key={`separator-${index}`}
                  style={styles.dropdownSeparator}
                  role="separator"
                  aria-orientation="horizontal"
                />
              );
            }

            return (
              <a
                key={index}
                href={item.href}
                style={{
                  ...styles.dropdownItem,
                  ...(item.danger ? styles.dropdownItemDanger : {}),
                }}
                role="menuitem"
                tabIndex={-1}
                onClick={closeDropdown}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Main component
export default function DropdownMenuExample() {
  const menuItems = [
    { label: 'Profile', href: '#profile' },
    { label: 'Settings', href: '#settings' },
    { label: 'Notifications', href: '#notifications' },
    { separator: true },
    { label: 'Sign out', href: '#logout', danger: true },
  ];

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.h1}>Dropdown Menu Focus — React</h1>
        <p style={styles.p}>
          This version demonstrates a dropdown menu with proper keyboard navigation in React.
        </p>

        <div style={styles.content}>
          <h2 style={styles.h2}>User Menu</h2>
          <p style={styles.p}>
            Click the button below or press Enter/Space to open the user menu.
          </p>

          <DropdownMenu items={menuItems} />

          <div style={styles.otherContent}>
            <h3 style={styles.h3}>Other Page Content</h3>
            <p style={styles.p}>
              This content is here to demonstrate that focus is trapped within the dropdown when it's open.
            </p>
            <a href="#" style={styles.link}>Another link</a>
            <button style={styles.btn}>Another button</button>
          </div>
        </div>
      </main>
    </div>
  );
}
