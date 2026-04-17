import React, { useState, useRef, useCallback, useId } from 'react';

const MONTHS     = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const DAYS_FULL  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function isSameDay(a, b) {
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}
function getMonthGrid(year, month) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i+7));
  return weeks;
}

export default function DatePicker() {
  const today         = useRef(new Date()); today.current.setHours(0,0,0,0);
  const [isOpen,      setIsOpen]      = useState(false);
  const [viewYear,    setViewYear]    = useState(today.current.getFullYear());
  const [viewMonth,   setViewMonth]   = useState(today.current.getMonth());
  const [focusedDate, setFocusedDate] = useState(new Date(today.current));
  const [selected,    setSelected]    = useState(null);
  const toggleRef = useRef(null);
  const gridRef   = useRef(null);
  const labelId   = useId();

  const openCalendar = useCallback(() => {
    setIsOpen(true);
    requestAnimationFrame(() => {
      const cell = gridRef.current?.querySelector('[role="gridcell"][tabindex="0"]');
      cell?.focus();
    });
  }, []);

  const closeCalendar = useCallback((returnFocus = true) => {
    setIsOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  const selectDate = useCallback((date) => {
    setSelected(date);
    setFocusedDate(date);
    closeCalendar();
  }, [closeCalendar]);

  const moveFocus = useCallback((newDate) => {
    setFocusedDate(newDate);
    if (newDate.getMonth() !== viewMonth || newDate.getFullYear() !== viewYear) {
      setViewYear(newDate.getFullYear());
      setViewMonth(newDate.getMonth());
    }
    requestAnimationFrame(() => {
      const cell = gridRef.current?.querySelector('[role="gridcell"][tabindex="0"]');
      cell?.focus();
    });
  }, [viewMonth, viewYear]);

  const handleKeyDown = useCallback((e) => {
    const active = document.activeElement;
    if (!active?.dataset?.date) return;
    const [y, m, d] = active.dataset.date.split('-').map(Number);
    const cur = new Date(y, m - 1, d);
    let next;
    switch (e.key) {
      case 'ArrowRight':  e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()+1);  moveFocus(next); break;
      case 'ArrowLeft':   e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()-1);  moveFocus(next); break;
      case 'ArrowDown':   e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()+7);  moveFocus(next); break;
      case 'ArrowUp':     e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()-7);  moveFocus(next); break;
      case 'Home':        e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()-cur.getDay()); moveFocus(next); break;
      case 'End':         e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()+(6-cur.getDay())); moveFocus(next); break;
      case 'PageUp':      e.preventDefault(); next = new Date(cur); next.setMonth(cur.getMonth()-1); moveFocus(next); break;
      case 'PageDown':    e.preventDefault(); next = new Date(cur); next.setMonth(cur.getMonth()+1); moveFocus(next); break;
      case 'Enter':
      case ' ':           e.preventDefault(); selectDate(cur); break;
      case 'Escape':      e.preventDefault(); closeCalendar(); break;
    }
  }, [moveFocus, selectDate, closeCalendar]);

  const prevMonth = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear()); setViewMonth(d.getMonth());
    const clamped = new Date(d.getFullYear(), d.getMonth(), Math.min(focusedDate.getDate(), new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()));
    setFocusedDate(clamped);
  };
  const nextMonth = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear()); setViewMonth(d.getMonth());
    const clamped = new Date(d.getFullYear(), d.getMonth(), Math.min(focusedDate.getDate(), new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()));
    setFocusedDate(clamped);
  };

  const weeks = getMonthGrid(viewYear, viewMonth);
  const headingId = `${labelId}-heading`;
  const formattedValue = selected
    ? `${String(selected.getDate()).padStart(2,'0')}/${String(selected.getMonth()+1).padStart(2,'0')}/${selected.getFullYear()}`
    : '';

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Book an Appointment</h1>
        <p style={styles.subtitle}>Choose a date using the calendar below.</p>
        <div style={styles.field}>
          <label style={styles.label} htmlFor={`${labelId}-input`}>Appointment date</label>
          <div style={styles.wrapper}>
            <input id={`${labelId}-input`} type="text" readOnly value={formattedValue} placeholder="DD/MM/YYYY" style={styles.input} />
            {/* FIX: Native <button> with aria-haspopup and aria-expanded */}
            <button
              ref={toggleRef}
              style={styles.toggle(isOpen)}
              aria-label="Open date picker"
              aria-haspopup="grid"
              aria-expanded={isOpen}
              onClick={() => isOpen ? closeCalendar() : openCalendar()}
            >
              <span aria-hidden="true">📅</span>
            </button>
          </div>

          {isOpen && (
            /* FIX: role="dialog" with aria-label and aria-modal */
            <div role="dialog" aria-label="Date picker" aria-modal="true" style={styles.calendar}>
              <div style={styles.calHeader}>
                <button style={styles.navBtn} aria-label="Go to previous month" onClick={prevMonth}>
                  <span aria-hidden="true">‹</span>
                </button>
                <h2 id={headingId} style={styles.heading} aria-live="polite">
                  {MONTHS[viewMonth]} {viewYear}
                </h2>
                <button style={styles.navBtn} aria-label="Go to next month" onClick={nextMonth}>
                  <span aria-hidden="true">›</span>
                </button>
              </div>

              {/* FIX: role="grid" with aria-labelledby and roving tabindex on cells */}
              <table ref={gridRef} role="grid" aria-labelledby={headingId} style={styles.grid} onKeyDown={handleKeyDown}>
                <thead>
                  <tr role="row">
                    {DAYS_SHORT.map((d, i) => (
                      <th key={d} scope="col" abbr={DAYS_FULL[i]} style={styles.th}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeks.map((week, wi) => (
                    <tr key={wi} role="row">
                      {week.map((date, di) => {
                        if (!date) return (
                          <td key={di} role="gridcell" aria-disabled="true" tabIndex={-1} style={styles.emptyCell} />
                        );
                        const key      = dateKey(date);
                        const isToday  = isSameDay(date, today.current);
                        const isSel    = selected && isSameDay(date, selected);
                        const isFoc    = isSameDay(date, focusedDate) && date.getMonth() === viewMonth;
                        const label    = date.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
                        return (
                          <td
                            key={key}
                            role="gridcell"
                            data-date={key}
                            tabIndex={isFoc ? 0 : -1}
                            aria-current={isToday ? 'date' : undefined}
                            aria-selected={isSel ? 'true' : undefined}
                            aria-label={label}
                            style={styles.cell(isToday, isSel, isFoc)}
                            onClick={() => selectDate(date)}
                          >
                            {date.getDate()}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button style={styles.closeBtn} onClick={() => closeCalendar()}>Close calendar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page:     { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', padding: '2rem', display: 'flex', justifyContent: 'center' },
  card:     { width: '100%', maxWidth: 420, background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '2rem' },
  title:    { fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.25rem' },
  subtitle: { fontSize: '0.9375rem', color: '#4a5568', marginBottom: '1.5rem' },
  field:    { display: 'flex', flexDirection: 'column', gap: '0.375rem' },
  label:    { fontSize: '0.875rem', fontWeight: 600, color: '#374151' },
  wrapper:  { display: 'flex' },
  input:    { flex: 1, padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRight: 'none', borderRadius: '6px 0 0 6px', fontSize: '0.9375rem', color: '#1a1a1a' },
  toggle: (open) => ({ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, border: `1px solid ${open ? '#2563eb' : '#d1d5db'}`, borderRadius: '0 6px 6px 0', background: open ? '#eff6ff' : '#f9fafb', cursor: 'pointer', fontSize: '1.1rem' }),
  calendar: { marginTop: '0.5rem', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  calHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.625rem 0.875rem', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' },
  navBtn:   { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: '1.1rem', color: '#374151' },
  heading:  { fontSize: '0.9375rem', fontWeight: 600 },
  grid:     { width: '100%', borderCollapse: 'collapse', padding: '0.625rem' },
  th:       { textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', padding: '0.25rem' },
  cell: (isToday, isSel, isFoc) => ({
    width: 36, height: 36, textAlign: 'center', verticalAlign: 'middle', fontSize: '0.875rem',
    borderRadius: '50%', cursor: 'pointer',
    background: isSel ? '#2563eb' : isToday ? '#dbeafe' : 'transparent',
    color: isSel ? '#ffffff' : isToday ? '#1e40af' : '#1a1a1a',
    fontWeight: isToday || isSel ? 700 : 400,
    outline: isFoc ? '2px solid #2563eb' : 'none', outlineOffset: 2,
  }),
  emptyCell: { visibility: 'hidden' },
  closeBtn: { display: 'block', width: '100%', padding: '0.5rem', border: 'none', borderTop: '1px solid #e5e7eb', background: '#f9fafb', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' },
};
