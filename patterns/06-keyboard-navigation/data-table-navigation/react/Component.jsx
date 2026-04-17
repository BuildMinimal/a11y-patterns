import React, { useState, useRef, useEffect, useCallback } from 'react';

const INITIAL_TOOLS = [
  { name: 'NVDA',       category: 'Screen reader', cost: 'Free',       year: 2006 },
  { name: 'axe-core',   category: 'Testing',       cost: 'Free',       year: 2015 },
  { name: 'JAWS',       category: 'Screen reader', cost: 'Commercial', year: 1989 },
  { name: 'VoiceOver',  category: 'Screen reader', cost: 'Built-in',   year: 2005 },
  { name: 'Lighthouse', category: 'Testing',       cost: 'Built-in',   year: 2016 },
];

const COLS      = ['name', 'category', 'cost', 'year'];
const COL_NAMES = { name: 'Tool name', category: 'Category', cost: 'Cost', year: 'Year' };
const SORT_ICONS  = { none: '↕', ascending: '↑', descending: '↓' };
const SORT_LABELS = { none: 'currently unsorted', ascending: 'currently sorted ascending', descending: 'currently sorted descending' };

export default function DataTable() {
  const [sortCol, setSortCol] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [status,  setStatus]  = useState('');
  const [focusPos, setFocusPos] = useState({ row: 0, col: 0 });

  const tableRef   = useRef(null);
  const focusRef   = useRef({ row: 0, col: 0 });

  const sorted = sortCol
    ? [...INITIAL_TOOLS].sort((a, b) => {
        const av = a[sortCol]; const bv = b[sortCol];
        return sortAsc ? (av < bv ? -1 : av > bv ? 1 : 0) : (av > bv ? -1 : av < bv ? 1 : 0);
      })
    : [...INITIAL_TOOLS];

  const isHeader = (row) => row === 0;

  // Build aria-sort for a given column
  const ariaSort = (col) => {
    if (col !== sortCol) return 'none';
    return sortAsc ? 'ascending' : 'descending';
  };

  const sortDir = (col) => ariaSort(col);

  const handleSort = useCallback((col) => {
    setSortCol(prev => {
      const nextAsc = prev === col ? !sortAsc : true;
      setSortAsc(nextAsc);
      const dir = nextAsc ? 'ascending' : 'descending';
      setStatus(`Table sorted by ${COL_NAMES[col]}, ${dir}.`);
      return col;
    });
  }, [sortAsc]);

  // Get all focusable grid elements after render
  const getGrid = useCallback(() => {
    const tbl = tableRef.current;
    if (!tbl) return [];
    const rows = [];
    rows.push(Array.from(tbl.querySelectorAll('thead th button')));
    tbl.querySelectorAll('tbody tr').forEach(tr => {
      rows.push(Array.from(tr.querySelectorAll('td')));
    });
    return rows;
  }, []);

  // Roving tabindex: set tabindex=0 on focused cell, -1 on all others
  const applyTabindex = useCallback((row, col) => {
    const grid = getGrid();
    grid.forEach(r => r.forEach(el => el.setAttribute('tabindex', '-1')));
    const el = grid[row]?.[col];
    if (el) {
      el.setAttribute('tabindex', '0');
    }
  }, [getGrid]);

  // Focus a cell by [row, col]
  const focusCell = useCallback((row, col, skipFocus) => {
    const grid = getGrid();
    row = Math.max(0, Math.min(row, grid.length - 1));
    col = Math.max(0, Math.min(col, (grid[row]?.length ?? 1) - 1));
    applyTabindex(row, col);
    focusRef.current = { row, col };
    if (!skipFocus) grid[row]?.[col]?.focus();
  }, [getGrid, applyTabindex]);

  // After sort re-renders data rows, restore focus
  useEffect(() => {
    if (sortCol !== null) {
      focusCell(focusRef.current.row, focusRef.current.col);
    }
  }, [sortCol, sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

  // Init: set first cell as Tab entry point
  useEffect(() => {
    applyTabindex(0, 0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = useCallback((e) => {
    const { key, ctrlKey } = e;
    const grid = getGrid();
    let { row: r, col: c } = focusRef.current;
    const lastRow = grid.length - 1;
    const rowLen  = grid[r]?.length ?? 1;

    if (key === 'ArrowRight') {
      e.preventDefault(); c = Math.min(c + 1, rowLen - 1);
    } else if (key === 'ArrowLeft') {
      e.preventDefault(); c = Math.max(c - 1, 0);
    } else if (key === 'ArrowDown') {
      e.preventDefault(); r = Math.min(r + 1, lastRow);
    } else if (key === 'ArrowUp') {
      e.preventDefault(); r = Math.max(r - 1, 0);
    } else if (key === 'Home' && !ctrlKey) {
      e.preventDefault(); c = 0;
    } else if (key === 'End' && !ctrlKey) {
      e.preventDefault(); c = (grid[r]?.length ?? 1) - 1;
    } else if (key === 'Home' && ctrlKey) {
      e.preventDefault(); r = 0; c = 0;
    } else if (key === 'End' && ctrlKey) {
      e.preventDefault(); r = lastRow; c = (grid[r]?.length ?? 1) - 1;
    } else {
      return;
    }

    focusCell(r, c);
  }, [getGrid, focusCell]);

  const handleFocusIn = useCallback((e) => {
    const grid = getGrid();
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === e.target) {
          grid.forEach(row => row.forEach(el => el.setAttribute('tabindex', '-1')));
          e.target.setAttribute('tabindex', '0');
          focusRef.current = { row: r, col: c };
          return;
        }
      }
    }
  }, [getGrid]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Accessibility Tools</h1>
        <p style={styles.subtitle}>Use arrow keys to navigate. Press Enter or Space on a column header to sort.</p>
      </header>

      {/* FIX: aria-live region announces sort changes */}
      <p style={styles.srOnly} aria-live="polite" aria-atomic="true">{status}</p>

      <div style={styles.wrapper}>
        {/* FIX: role="grid" enables arrow-key cell navigation */}
        <table
          ref={tableRef}
          style={styles.table}
          role="grid"
          aria-label="Accessibility tools — sortable, use arrow keys to navigate cells"
          onKeyDown={handleKeyDown}
          onFocus={handleFocusIn}
        >
          <thead>
            <tr>
              {COLS.map(col => (
                <th
                  key={col}
                  scope="col"
                  aria-sort={ariaSort(col)}
                  data-col={col}
                  style={ariaSort(col) !== 'none' ? { ...styles.th, background: '#eff6ff' } : styles.th}
                >
                  {/* FIX: <button> inside <th> — keyboard-accessible sort trigger */}
                  <button
                    tabIndex={-1}
                    style={styles.sortBtn}
                    aria-label={`Sort by ${COL_NAMES[col]}, ${SORT_LABELS[sortDir(col)]}`}
                    onClick={() => handleSort(col)}
                  >
                    {COL_NAMES[col]} <span aria-hidden="true">{SORT_ICONS[sortDir(col)]}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((tool, rowIdx) => (
              <tr key={tool.name} style={styles.row}>
                {COLS.map((col) => (
                  <td key={col} role="gridcell" tabIndex={-1} style={styles.td}>
                    {tool[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page:    { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', padding: '2rem' },
  header:  { maxWidth: 800, margin: '0 auto 1.5rem' },
  title:   { fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' },
  subtitle:{ fontSize: '0.9375rem', color: '#4a5568' },
  srOnly:  { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 },
  wrapper: { maxWidth: 800, margin: '0 auto', overflowX: 'auto', borderRadius: 8, border: '1px solid #e5e7eb' },
  table:   { width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' },
  th:      { padding: 0, textAlign: 'left', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap', background: '#f9fafb', borderBottom: '2px solid #e5e7eb' },
  sortBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', fontSize: '0.9375rem', fontWeight: 600, color: '#374151', cursor: 'pointer', textAlign: 'left' },
  row:     {},
  td:      { padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6', color: '#374151' },
};
