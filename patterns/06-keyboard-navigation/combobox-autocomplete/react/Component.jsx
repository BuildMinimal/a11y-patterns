import React, { useState, useRef, useCallback, useId } from 'react';

const ITEMS = [
  'Angular', 'Astro', 'Backbone', 'Ember',
  'Next.js', 'Nuxt', 'Preact', 'React',
  'Remix', 'Solid', 'Svelte', 'Vue',
];

export default function ComboboxAutocomplete() {
  const [value,      setValue]      = useState('');
  const [matches,    setMatches]    = useState([]);
  const [activeIdx,  setActiveIdx]  = useState(-1);
  const [isOpen,     setIsOpen]     = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const inputRef   = useRef(null);
  const listboxId  = useId();
  const optionId   = (i) => `${listboxId}-opt-${i}`;

  const openWith = useCallback((items) => {
    setMatches(items);
    setActiveIdx(-1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setMatches([]);
    setActiveIdx(-1);
  }, []);

  const select = useCallback((item) => {
    setValue(item);
    setSelectedValue(item);
    close();
    inputRef.current?.focus();
  }, [close]);

  const handleInput = (e) => {
    const query = e.target.value;
    setValue(query);
    const q = query.trim().toLowerCase();
    if (!q) { close(); return; }
    const filtered = ITEMS.filter(item => item.toLowerCase().startsWith(q));
    if (!filtered.length) { close(); return; }
    openWith(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        const q = value.trim().toLowerCase();
        const filtered = q ? ITEMS.filter(i => i.toLowerCase().startsWith(q)) : ITEMS;
        if (filtered.length) { openWith(filtered); setActiveIdx(0); }
      } else {
        setActiveIdx(i => Math.min(i + 1, matches.length - 1));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (isOpen && activeIdx >= 0) { e.preventDefault(); select(matches[activeIdx]); }
    } else if (e.key === 'Escape') {
      if (isOpen) { e.preventDefault(); close(); }
    } else if (e.key === 'Home' && isOpen) {
      e.preventDefault(); setActiveIdx(0);
    } else if (e.key === 'End' && isOpen) {
      e.preventDefault(); setActiveIdx(matches.length - 1);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) close();
    }, 150);
  };

  const activeDescendant = isOpen && activeIdx >= 0 ? optionId(activeIdx) : '';

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Framework Finder</h1>
        <p style={styles.subtitle}>Type to search — use arrow keys to pick a suggestion</p>
      </header>

      <div style={styles.field}>
        <label id="fw-label" htmlFor="fw-input" style={styles.label}>Framework</label>
        <div style={styles.wrapper}>
          {/* FIX: role="combobox" + aria-expanded + aria-controls + aria-activedescendant */}
          <input
            ref={inputRef}
            id="fw-input"
            type="text"
            style={styles.input}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-activedescendant={activeDescendant}
            aria-labelledby="fw-label"
            value={value}
            placeholder="e.g. React, Vue, Svelte…"
            autoComplete="off"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />

          {/* FIX: role="listbox" popup with role="option" children */}
          {isOpen && (
            <ul
              id={listboxId}
              role="listbox"
              aria-label="Framework suggestions"
              style={styles.listbox}
            >
              {matches.map((item, i) => (
                <li
                  key={item}
                  id={optionId(i)}
                  role="option"
                  aria-selected={item === selectedValue}
                  style={{
                    ...styles.option,
                    ...(i === activeIdx ? styles.optionActive : {}),
                    ...(item === selectedValue ? styles.optionSelected : {}),
                  }}
                  onMouseDown={(e) => { e.preventDefault(); select(item); }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page:     { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', padding: '2rem' },
  header:   { maxWidth: 480, margin: '0 auto 2rem' },
  title:    { fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' },
  subtitle: { fontSize: '0.9375rem', color: '#4a5568' },
  field:    { maxWidth: 480, margin: '0 auto' },
  label:    { display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' },
  wrapper:  { position: 'relative' },
  input:    { width: '100%', padding: '0.625rem 0.875rem', fontSize: '1rem', color: '#1a1a1a', background: '#fff', border: '1.5px solid #d1d5db', borderRadius: 6, outline: 'none', boxSizing: 'border-box' },
  listbox:  { position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 10, overflowY: 'auto', maxHeight: 240, listStyle: 'none', padding: '0.25rem 0', margin: 0 },
  option:         { padding: '0.625rem 0.875rem', fontSize: '0.9375rem', color: '#374151', cursor: 'pointer' },
  optionActive:   { background: '#eff6ff', color: '#1e40af', fontWeight: 500 },
  optionSelected: { background: '#dbeafe', color: '#1d4ed8' },
};
