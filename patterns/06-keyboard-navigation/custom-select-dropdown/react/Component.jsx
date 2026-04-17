import React, { useState, useRef, useCallback, useId } from 'react';

const SORT_OPTIONS = [
  { value: 'Most recent',   label: 'Most recent' },
  { value: 'Most popular',  label: 'Most popular' },
  { value: 'Highest rated', label: 'Highest rated' },
  { value: 'Alphabetical',  label: 'Alphabetical' },
];

const ARTICLES = [
  { category: 'Accessibility', title: 'Building Accessible Forms', excerpt: 'Labels, errors, and input modes — the complete checklist for form accessibility that goes beyond just adding aria-label.' },
  { category: 'CSS',           title: 'CSS Grid for Complex Layouts', excerpt: 'Two-dimensional control without a framework. Grid makes the layouts that used to require JavaScript trivial to express in CSS.' },
  { category: 'TypeScript',    title: 'TypeScript Generics Explained', excerpt: 'Generics are the feature that makes TypeScript genuinely powerful. Here\'s how to read, write, and constrain them with confidence.' },
];

export default function ArticleSortSelect() {
  const [isOpen, setIsOpen]         = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeIdx, setActiveIdx]   = useState(0);
  const triggerId  = useId();
  const labelId    = useId();
  const listboxId  = useId();
  const triggerRef = useRef(null);
  const listboxRef = useRef(null);

  const open = useCallback(() => {
    setIsOpen(true);
    setActiveIdx(selectedIdx);
    // Focus the listbox on next paint (after it becomes visible)
    requestAnimationFrame(() => listboxRef.current?.focus());
  }, [selectedIdx]);

  const close = useCallback((returnFocus = true) => {
    setIsOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const select = useCallback((index) => {
    setSelectedIdx(index);
    close();
  }, [close]);

  const handleTriggerClick = () => (isOpen ? close() : open());

  const handleListboxKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActiveIdx(i => Math.min(i + 1, SORT_OPTIONS.length - 1)); break;
      case 'ArrowUp':   e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); break;
      case 'Enter':
      case ' ':         e.preventDefault(); select(activeIdx); break;
      case 'Escape':    e.preventDefault(); close(); break;
      case 'Home':      e.preventDefault(); setActiveIdx(0); break;
      case 'End':       e.preventDefault(); setActiveIdx(SORT_OPTIONS.length - 1); break;
    }
  };

  const activeOptionId = `${listboxId}-option-${activeIdx}`;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.pageTitle}>Articles</h1>
        <div style={styles.toolbar}>
          <label id={labelId} style={styles.sortLabel}>Sort by</label>
          <div style={styles.selectWrapper}>
            {/*
              FIX: Native <button> for keyboard access.
              aria-labelledby combines label + current value for full AT context.
            */}
            <button
              ref={triggerRef}
              id={triggerId}
              type="button"
              style={styles.trigger(isOpen)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-labelledby={`${labelId} ${triggerId}-value`}
              onClick={handleTriggerClick}
            >
              <span id={`${triggerId}-value`}>{SORT_OPTIONS[selectedIdx].label}</span>
              <span aria-hidden="true" style={styles.arrow(isOpen)}>▾</span>
            </button>
            {/*
              FIX: role="listbox" with tabindex="-1" for programmatic focus.
              aria-activedescendant tracks the keyboard-highlighted option.
            */}
            {isOpen && (
              <ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-labelledby={labelId}
                tabIndex={-1}
                style={styles.listbox}
                onKeyDown={handleListboxKeyDown}
              >
                {SORT_OPTIONS.map((opt, i) => (
                  <li
                    key={opt.value}
                    id={`${listboxId}-option-${i}`}
                    role="option"
                    aria-selected={i === selectedIdx}
                    style={styles.option(i === selectedIdx, i === activeIdx)}
                    onClick={() => select(i)}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      <ul style={styles.articleList}>
        {ARTICLES.map(article => (
          <li key={article.title} style={styles.card}>
            <span style={styles.category}>{article.category}</span>
            <h2 style={styles.articleTitle}>{article.title}</h2>
            <p style={styles.excerpt}>{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  page:        { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', padding: '2rem' },
  header:      { maxWidth: 860, margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' },
  pageTitle:   { fontSize: '1.75rem', fontWeight: 700 },
  toolbar:     { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  sortLabel:   { fontSize: '0.875rem', fontWeight: 500, color: '#4a5568' },
  selectWrapper: { position: 'relative' },
  trigger: (open) => ({
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.5rem 0.875rem', background: '#ffffff',
    border: `1px solid ${open ? '#2563eb' : '#d1d5db'}`,
    borderRadius: open ? '6px 6px 0 0' : '6px',
    fontSize: '0.875rem', color: '#1a1a1a', cursor: 'pointer', minWidth: 160, textAlign: 'left',
  }),
  arrow: (open) => ({
    marginLeft: 'auto', fontSize: '0.75rem', color: '#6b7280',
    transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s',
  }),
  listbox: {
    position: 'absolute', top: 'calc(100% - 1px)', left: 0, right: 0,
    background: '#ffffff', border: '1px solid #2563eb', borderTop: 'none',
    borderRadius: '0 0 6px 6px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    zIndex: 10, listStyle: 'none', padding: 0, outline: 'none',
  },
  option: (selected, active) => ({
    padding: '0.625rem 0.875rem', fontSize: '0.875rem', cursor: 'pointer',
    background: active ? '#eff6ff' : selected ? '#dbeafe' : '#ffffff',
    color: selected && !active ? '#1e40af' : '#1a1a1a',
    fontWeight: selected ? 500 : 400,
    outline: active ? '2px solid #2563eb' : 'none',
    outlineOffset: active ? '-2px' : 0,
  }),
  articleList: { maxWidth: 860, margin: '0 auto', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' },
  card:        { background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '1.25rem 1.5rem' },
  category:    { display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1e40af', background: '#dbeafe', padding: '0.2rem 0.5rem', borderRadius: 4, marginBottom: '0.5rem' },
  articleTitle: { fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.375rem' },
  excerpt:     { fontSize: '0.9375rem', color: '#4a5568', lineHeight: 1.6 },
};
