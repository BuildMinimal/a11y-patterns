import React, { useState, useRef, useCallback } from 'react';

const INITIAL_TASKS = [
  { id: 1, text: 'Review accessibility audit report' },
  { id: 2, text: 'Fix keyboard navigation in dropdown' },
  { id: 3, text: 'Write WCAG compliance documentation' },
  { id: 4, text: 'Update colour contrast tokens' },
  { id: 5, text: 'Test with NVDA screen reader' },
];

export default function SortableTaskList() {
  const [tasks,   setTasks]   = useState(INITIAL_TASKS);
  const [status,  setStatus]  = useState('');
  const dragSrc   = useRef(null);
  const btnRefs   = useRef({}); // { `${id}-up`: el, `${id}-down`: el }

  const move = useCallback((fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= tasks.length) return;

    setTasks(prev => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      const moved = next[toIndex];
      setStatus(`${moved.text} moved to position ${toIndex + 1} of ${next.length}.`);
      return next;
    });

    // Focus the moved item's same-direction button (or its sibling if now at edge)
    const movedId = tasks[fromIndex].id;
    const btnKey  = direction > 0
      ? (toIndex < tasks.length - 1 ? `${movedId}-down` : `${movedId}-up`)
      : (toIndex > 0               ? `${movedId}-up`   : `${movedId}-down`);
    requestAnimationFrame(() => btnRefs.current[btnKey]?.focus());
  }, [tasks]);

  const handleDragStart = useCallback((id) => { dragSrc.current = id; }, []);
  const handleDrop = useCallback((targetId) => {
    if (!dragSrc.current || dragSrc.current === targetId) return;
    setTasks(prev => {
      const next     = [...prev];
      const srcIdx   = next.findIndex(t => t.id === dragSrc.current);
      const dstIdx   = next.findIndex(t => t.id === targetId);
      const [moved]  = next.splice(srcIdx, 1);
      next.splice(dstIdx, 0, moved);
      setStatus(`${moved.text} moved to position ${dstIdx + 1} of ${next.length}.`);
      return next;
    });
    dragSrc.current = null;
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Task Priority</h1>
        <p style={styles.subtitle}>Drag tasks to reorder, or use the arrow buttons</p>
      </header>

      {/* FIX: aria-live region announces reorder to screen reader users */}
      <p style={styles.srOnly} aria-live="polite" aria-atomic="true">{status}</p>

      <ul style={styles.list} aria-label="Task priority list — use arrow buttons to reorder">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            style={styles.item}
            draggable
            onDragStart={() => handleDragStart(task.id)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(task.id)}
          >
            <span style={styles.handle} aria-hidden="true">⠿</span>
            <span style={styles.position} aria-hidden="true">{index + 1}</span>
            <span style={styles.text}>{task.text}</span>

            {/* FIX: role="group" labels the pair of controls per item */}
            <div style={styles.controls} role="group" aria-label={`Reorder ${task.text}`}>
              <button
                ref={el => { btnRefs.current[`${task.id}-up`] = el; }}
                style={styles.btn}
                aria-label={`Move '${task.text}' up`}
                disabled={index === 0}
                onClick={() => move(index, -1)}
              >
                <span aria-hidden="true">↑</span>
              </button>
              <button
                ref={el => { btnRefs.current[`${task.id}-down`] = el; }}
                style={styles.btn}
                aria-label={`Move '${task.text}' down`}
                disabled={index === tasks.length - 1}
                onClick={() => move(index, 1)}
              >
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  page:     { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', padding: '2rem' },
  header:   { maxWidth: 600, margin: '0 auto 1.5rem' },
  title:    { fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' },
  subtitle: { fontSize: '0.9375rem', color: '#4a5568' },
  srOnly:   { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 },
  list:     { maxWidth: 600, margin: '0 auto', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  item:     { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'grab', userSelect: 'none' },
  handle:   { fontSize: '1.1rem', color: '#9ca3af', flexShrink: 0 },
  position: { minWidth: '1.5rem', height: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff6ff', color: '#1e40af', fontSize: '0.75rem', fontWeight: 700, borderRadius: '50%', flexShrink: 0 },
  text:     { fontSize: '0.9375rem', fontWeight: 500, color: '#374151', flex: 1 },
  controls: { display: 'flex', gap: '0.25rem', flexShrink: 0 },
  btn:      { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 4, fontSize: '0.875rem', color: '#374151', cursor: 'pointer' },
};
