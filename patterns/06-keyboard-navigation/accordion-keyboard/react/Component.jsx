import React, { useState, useRef, useCallback } from 'react';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What is WCAG and who maintains it?',
    answer: "WCAG — the Web Content Accessibility Guidelines — is published by the W3C's Web Accessibility Initiative (WAI). The current version is WCAG 2.2, published October 2023. Version 3.0 is in development and will introduce a new conformance model.",
  },
  {
    id: 'faq-2',
    question: 'How do screen readers work?',
    answer: 'Screen readers convert on-screen text and interface elements into synthesised speech or braille output. They navigate the accessibility tree — a parallel representation of the DOM that exposes semantic meaning. Headings, landmarks, links, buttons, and form controls all appear; decorative divs do not.',
  },
  {
    id: 'faq-3',
    question: 'What is the difference between WCAG Level A and Level AA?',
    answer: "Level A covers minimum requirements — failures block access entirely for some users. Level AA is the broadly-adopted target for public-facing websites and most legal standards, including the UK's PSBAR and the EU's EN 301 549. Level AAA sets a higher bar that not all content types can realistically meet.",
  },
  {
    id: 'faq-4',
    question: 'How do I start testing my site for accessibility?',
    answer: 'Start with automated tools — axe DevTools, WAVE, or Lighthouse — to catch the 30–40% of issues machines can identify. Then do keyboard-only testing: unplug your mouse and try to use the page with Tab, Enter, Arrow keys, and Escape. Finally test with a screen reader: NVDA (free, Windows) or VoiceOver (built-in, Mac/iOS).',
  },
];

export default function AccessibleAccordion() {
  const [openIds, setOpenIds] = useState(new Set());
  const triggerRefs = useRef([]);

  const toggle = useCallback((id) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleKeyDown = useCallback((e, index) => {
    const total = FAQ_ITEMS.length;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        triggerRefs.current[(index + 1) % total]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        triggerRefs.current[(index - 1 + total) % total]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        triggerRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        triggerRefs.current[total - 1]?.focus();
        break;
    }
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.pageTitle}>Accessibility FAQ</h1>
        <p style={styles.pageSubtitle}>Common questions about web accessibility</p>
      </header>

      <div style={styles.accordion}>
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIds.has(item.id);
          return (
            <div key={item.id} style={{ ...styles.item, ...(index > 0 ? styles.itemBorder : {}) }}>
              {/*
                FIX: <h2> wrapping <button> gives the heading semantic structure
                while keeping the button as the interactive element.
              */}
              <h2 style={styles.heading}>
                <button
                  ref={el => (triggerRefs.current[index] = el)}
                  id={`trigger-${item.id}`}
                  style={styles.trigger(isOpen)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => toggle(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                >
                  <span style={styles.triggerTitle}>{item.question}</span>
                  <span aria-hidden="true" style={styles.icon(isOpen)}>+</span>
                </button>
              </h2>
              {/*
                FIX: role="region" with aria-labelledby provides a named landmark
                when the panel is open. hidden removes it from the accessibility tree.
              */}
              {isOpen && (
                <div
                  id={`panel-${item.id}`}
                  role="region"
                  aria-labelledby={`trigger-${item.id}`}
                  style={styles.panel}
                >
                  <p style={styles.answer}>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page:         { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', padding: '2rem' },
  header:       { maxWidth: 700, margin: '0 auto 2rem' },
  pageTitle:    { fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.375rem' },
  pageSubtitle: { fontSize: '1rem', color: '#4a5568' },
  accordion:    { maxWidth: 700, margin: '0 auto', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' },
  item:         { background: '#ffffff' },
  itemBorder:   { borderTop: '1px solid #e5e7eb' },
  heading:      { margin: 0 },
  trigger: (open) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', padding: '1rem 1.25rem',
    background: open ? '#eff6ff' : '#ffffff',
    border: 'none', cursor: 'pointer', textAlign: 'left',
  }),
  triggerTitle: { fontSize: '1rem', fontWeight: 600, color: '#1a1a1a' },
  icon: (open) => ({
    flexShrink: 0, marginLeft: '1rem', fontSize: '1.25rem', fontWeight: 400, color: '#6b7280',
    transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s',
  }),
  panel:        { padding: '0 1.25rem 1rem', borderTop: '1px solid #e5e7eb' },
  answer:       { fontSize: '0.9375rem', lineHeight: 1.75, color: '#374151' },
};
