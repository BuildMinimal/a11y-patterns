// react/Component.jsx
// Pattern: Tab Panel Focus — Focus Management
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import TabPanel from './Component';
//   <TabPanel />

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
    maxWidth: '900px',
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

  tabs: {
    marginTop: '2rem',
  },

  tabsList: {
    display: 'flex',
    borderBottom: '2px solid #e5e7eb',
    marginBottom: '1.5rem',
  },

  tab: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.9375rem',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },

  tabActive: {
    color: '#1d4ed8',
    borderBottomColor: '#1d4ed8',
  },

  tabsPanels: {
    minHeight: '200px',
  },

  panel: {
    display: 'none',
  },

  panelActive: {
    display: 'block',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  th: {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '2px solid #e5e7eb',
    fontWeight: '600',
    color: '#1a1a1a',
  },

  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
  },

  review: {
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
  },

  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },

  reviewAuthor: {
    fontWeight: '600',
  },

  reviewRating: {
    color: '#f59e0b',
  },

  reviewText: {
    margin: 0,
    color: '#4a5568',
  },
};

// FIXED: Tab data structure
const tabData = [
  {
    id: 'description',
    label: 'Description',
    title: 'Product Description',
    content: (
      <>
        <p>
          This premium wireless keyboard features mechanical switches, RGB backlighting, and a
          compact design perfect for both work and gaming. The durable aluminum frame ensures
          longevity, while hot-swappable switches allow for easy customization.
        </p>
        <p>
          Includes a detachable USB-C cable, keycap puller, and switch removal tool.
          Compatible with Windows, macOS, and Linux.
        </p>
      </>
    ),
  },
  {
    id: 'specifications',
    label: 'Specifications',
    title: 'Technical Specifications',
    content: (
      <table>
        <tbody>
          <tr>
            <th>Switch Type</th>
            <td>Hot-swappable Mechanical</td>
          </tr>
          <tr>
            <th>Connectivity</th>
            <td>USB-C Wired / 2.4GHz Wireless / Bluetooth 5.0</td>
          </tr>
          <tr>
            <th>Battery Life</th>
            <td>Up to 72 hours (wireless)</td>
          </tr>
          <tr>
            <th>Dimensions</th>
            <td>14" x 5.5" x 1.5"</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>1.8 lbs</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: 'reviews',
    label: 'Reviews',
    title: 'Customer Reviews',
    content: (
      <>
        <div style={styles.review}>
          <div style={styles.reviewHeader}>
            <span style={styles.reviewAuthor}>Alex M.</span>
            <span style={styles.reviewRating}>★★★★★</span>
          </div>
          <p style={styles.reviewText}>
            "Best keyboard I've ever owned. The wireless connection is rock-solid and the
            battery life is incredible. Highly recommend!"
          </p>
        </div>
        <div style={styles.review}>
          <div style={styles.reviewHeader}>
            <span style={styles.reviewAuthor}>Sarah K.</span>
            <span style={styles.reviewRating}>★★★★☆</span>
          </div>
          <p style={styles.reviewText}>
            "Great keyboard for the price. The RGB lighting is subtle and professional.
            Only giving 4 stars because I wish it came in more colors."
          </p>
        </div>
      </>
    ),
  },
];

const reviews = [
  {
    author: 'Alex M.',
    rating: '★★★★★',
    text: 'Best keyboard I\'ve ever owned. The wireless connection is rock-solid and the battery life is incredible. Highly recommend!',
  },
  {
    author: 'Sarah K.',
    rating: '★★★★☆',
    text: 'Great keyboard for the price. The RGB lighting is subtle and professional. Only giving 4 stars because I wish it came in more colors.',
  },
];

// FIXED: Tab panel component with keyboard navigation
function TabPanel() {
  const [activeTabId, setActiveTabId] = useState(tabData[0].id);
  const tabsRef = useRef(null);
  const tabRefs = useRef({});

  // FIXED: Get index of active tab
  const getActiveTabIndex = useCallback(() => {
    return tabData.findIndex(tab => tab.id === activeTabId);
  }, [activeTabId]);

  // FIXED: Switch to a specific tab
  const switchTab = useCallback((tabId) => {
    setActiveTabId(tabId);
  }, []);

  // FIXED: Handle keyboard navigation within the tab list
  const handleTabListKeyDown = useCallback((event) => {
    const currentIndex = getActiveTabIndex();

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        // Move to next tab, wrap to first if at end
        const nextIndex = (currentIndex + 1) % tabData.length;
        switchTab(tabData[nextIndex].id);
        break;

      case 'ArrowLeft':
        event.preventDefault();
        // Move to previous tab, wrap to last if at start
        const prevIndex = (currentIndex - 1 + tabData.length) % tabData.length;
        switchTab(tabData[prevIndex].id);
        break;

      case 'Home':
        event.preventDefault();
        // Jump to first tab
        switchTab(tabData[0].id);
        break;

      case 'End':
        event.preventDefault();
        // Jump to last tab
        switchTab(tabData[tabData.length - 1].id);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        // Activate the currently focused tab
        const focusedTab = document.activeElement;
        const tabId = Object.keys(tabRefs.current).find(
          key => tabRefs.current[key] === focusedTab
        );
        if (tabId) {
          switchTab(tabId);
        }
        break;
    }
  }, [getActiveTabIndex, switchTab]);

  // FIXED: Focus the active tab when it changes
  useEffect(() => {
    if (tabRefs.current[activeTabId]) {
      tabRefs.current[activeTabId].focus();
    }
  }, [activeTabId]);

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.h1}>Tab Panel Focus — React</h1>
        <p style={styles.p}>
          This version demonstrates a tab component with proper keyboard navigation in React.
        </p>

        <div style={styles.content}>
          <h2 style={styles.h2}>Product Details</h2>
          <p style={styles.p}>Use the tabs below to view different product information.</p>

          <div style={styles.tabs}>
            {/* FIXED: Tab list with proper ARIA attributes */}
            <div
              ref={tabsRef}
              style={styles.tabsList}
              role="tablist"
              aria-label="Product information tabs"
              onKeyDown={handleTabListKeyDown}
            >
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[tab.id] = el)}
                  style={{
                    ...styles.tab,
                    ...(tab.id === activeTabId ? styles.tabActive : {}),
                  }}
                  role="tab"
                  aria-selected={tab.id === activeTabId}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={tab.id === activeTabId ? 0 : -1}
                  onClick={() => switchTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* FIXED: Tab panels with proper ARIA attributes */}
            <div style={styles.tabsPanels}>
              {tabData.map((tab) => (
                <div
                  key={tab.id}
                  id={`panel-${tab.id}`}
                  style={{
                    ...styles.panel,
                    ...(tab.id === activeTabId ? styles.panelActive : {}),
                  }}
                  role="tabpanel"
                  aria-labelledby={`tab-${tab.id}`}
                  tabIndex={tab.id === activeTabId ? 0 : -1}
                  hidden={tab.id !== activeTabId}
                >
                  <h3 style={styles.h3}>{tab.title}</h3>
                  {tab.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TabPanel;
