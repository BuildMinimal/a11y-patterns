// react/Component.jsx
// Pattern: Infinite Scroll Focus — Focus Management
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import InfiniteScroll from './Component';
//   <InfiniteScroll />

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

  feedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },

  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#1a1a1a',
  },

  cardContent: {
    marginBottom: '1.25rem',
    color: '#4a5568',
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
    transition: 'backgroundColor 0.15s ease',
  },

  btnPrimary: {
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
  },

  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '1rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    marginTop: '2rem',
  },

  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #1d4ed8',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  loadingText: {
    fontSize: '0.9375rem',
    color: '#4a5568',
  },
};

// FIXED: Infinite scroll component with focus management
function InfiniteScroll() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const feedContainerRef = useRef(null);

  // FIXED: Store currently focused element before content loads
  const getActiveElement = useCallback(() => {
    return document.activeElement;
  }, []);

  // FIXED: Restore focus to previously focused element after content loads
  const restoreFocus = useCallback((previousFocus) => {
    if (previousFocus && document.body.contains(previousFocus)) {
      previousFocus.focus();
    }
  }, []);

  // FIXED: Create article element
  const createArticle = useCallback((index) => {
    return {
      id: index,
      title: `Article ${index + 1}`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    };
  }, []);

  // FIXED: Load more articles with focus preservation
  const loadMoreArticles = useCallback(() => {
    if (isLoading) return;

    // FIXED: Store currently focused element
    const previousFocus = getActiveElement();

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const newArticles = Array.from({ length: 3 }, (_, i) => {
        return createArticle(articles.length + i + 1);
      });

      setArticles(prev => [...prev, ...newArticles]);
      setIsLoading(false);

      // FIXED: Restore focus to previously focused element
      // If the previously focused element is still in the DOM, restore focus to it
      restoreFocus(previousFocus);
    }, 1000);
  }, [articles.length, getActiveElement, restoreFocus]);

  // FIXED: Scroll detection with focus preservation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when near bottom
      if (scrollTop + windowHeight > documentHeight - 500) {
        loadMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreArticles]);

  // Initialize with some articles
  useEffect(() => {
    const initialArticles = Array.from({ length: 3 }, (_, i) => createArticle(i + 1));
    setArticles(initialArticles);
  }, []);

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.h1}>Infinite Scroll Focus — React</h1>
        <p style={styles.p}>
          This version demonstrates an infinite scroll with proper focus management in React.
        </p>

        <div style={styles.content}>
          <h2 style={styles.h2}>News Feed</h2>
          <p style={styles.p}>
            Scroll down to load more articles. Focus is maintained when new content loads.
          </p>

          {/* FIXED: Feed container with aria-live for screen reader announcements */}
          <div
            ref={feedContainerRef}
            style={styles.feedContainer}
            aria-live="polite"
            aria-atomic="false"
          >
            {articles.map((article) => (
              <article key={article.id} style={styles.card}>
                <h3 style={styles.cardTitle}>{article.title}</h3>
                <p style={styles.cardContent}>{article.content}</p>
                <button
                  type="button"
                  style={{ ...styles.btn, ...styles.btnPrimary }}
                >
                  Read More
                </button>
              </article>
            ))}
          </div>

          {/* FIXED: Loading indicator with aria-busy state */}
          <div
            style={styles.loadingIndicator}
            aria-live="polite"
            aria-busy={isLoading}
            hidden={!isLoading}
          >
            <div style={styles.loadingSpinner}></div>
            <span style={styles.loadingText}>Loading more articles...</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InfiniteScroll;
