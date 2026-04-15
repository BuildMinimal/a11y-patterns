// react/Component.jsx
// Pattern: Sticky Header Scroll — Focus Management
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import StickyHeaderScroll from './Component';
//   <StickyHeaderScroll />

import React from 'react';

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

  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
  },

  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },

  headerNav: {
    display: 'flex',
    gap: '1.5rem',
  },

  navLink: {
    color: '#4a5568',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.15s ease',
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
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },

  section: {
    padding: '1.5rem 0',
    marginBottom: '2rem',
    borderBottom: '1px solid #f3f4f6',
  },

  link: {
    color: '#1d4ed8',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid #1d4ed8',
    backgroundColor: 'transparent',
    transition: 'all 0.15s ease',
    display: 'inline-block',
  },
};

// FIXED: Sticky header component with focus management
function StickyHeaderScroll() {
  const headerRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const navLinksRef = React.useRef([]);

  // FIXED: Get currently focused element
  const getActiveElement = React.useCallback(() => {
    return document.activeElement;
  }, []);

  // FIXED: Find first visible element that can receive focus
  const findFirstVisibleElement = React.useCallback(() => {
    const allFocusable = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), ' +
      '[tabindex]:not([tabindex="-1"])'
    );

    for (const element of allFocusable) {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.left >= 0 &&
                         rect.bottom <= window.innerHeight &&
                         rect.right <= window.innerWidth;

      if (isVisible) {
        return element;
      }
    }

    return null;
  }, []);

  // FIXED: Check if header is covering a focused element
  const checkHeaderCoverage = React.useCallback(() => {
    const activeElement = getActiveElement();
    if (!activeElement || !headerRef.current) return;

    const headerRect = headerRef.current.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();

    // Check if focused element is below the header
    const isCovered = elementRect.top >= headerRect.bottom;

    if (isCovered) {
      // FIXED: Move focus to the first visible element
      const firstVisible = findFirstVisibleElement();
      if (firstVisible) {
        firstVisible.focus();
      }
    }
  }, [getActiveElement, findFirstVisibleElement]);

  // FIXED: Handle scroll events
  const handleScroll = React.useCallback(() => {
    checkHeaderCoverage();
  }, [checkHeaderCoverage]);

  // FIXED: Handle focus changes
  const handleFocusChange = React.useCallback(() => {
    // Small delay to ensure element is actually focused
    setTimeout(checkHeaderCoverage, 50);
  }, [checkHeaderCoverage]);

  // Add event listeners
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusChange);
    };
  }, [handleScroll, handleFocusChange]);

  return (
    <div style={styles.page}>
      {/* FIXED: Sticky header with proper focus management */}
      <header ref={headerRef} style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>My Website</h1>
          <nav style={styles.headerNav}>
            <a href="#home" style={styles.navLink}>Home</a>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#services" style={styles.navLink}>Services</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
          </nav>
        </div>
      </header>

      <main ref={mainRef} style={styles.main}>
        <h1 style={styles.h1}>Sticky Header Scroll — React</h1>
        <p style={styles.p}>
          This version demonstrates a sticky header with proper focus management in React.
        </p>

        <div style={styles.content}>
          <h2 style={styles.h2}>Page Content</h2>
          <p style={styles.p}>
            Scroll down to see how the sticky header reserves space for content.
          </p>

          <section id="home" style={styles.section}>
            <h3 style={styles.h3}>Home Section</h3>
            <p style={styles.p}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" style={styles.link}>Read more</a>
          </section>

          <section id="about" style={styles.section}>
            <h3 style={styles.h3}>About Section</h3>
            <p style={styles.p}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <a href="#" style={styles.link}>Read more</a>
          </section>

          <section id="services" style={styles.section}>
            <h3 style={styles.h3}>Services Section</h3>
            <p style={styles.p}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </p>
            <a href="#" style={styles.link}>Read more</a>
          </section>

          <section id="contact" style={styles.section}>
            <h3 style={styles.h3}>Contact Section</h3>
            <p style={styles.p}>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <a href="#" style={styles.link}>Read more</a>
          </section>

          <section id="more-content" style={styles.section}>
            <h3 style={styles.h3}>More Content Section</h3>
            <p style={styles.p}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
            <a href="#" style={styles.link}>Read more</a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default StickyHeaderScroll;
