import React from 'react';

const TASKS = [
  { id: 1, label: 'Review accessibility audit report' },
  { id: 2, label: 'Update colour contrast tokens' },
  { id: 3, label: 'Write keyboard navigation tests' },
];

const ICON_CHECK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316a34a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E";
const ICON_EDIT  = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E";
const ICON_DELETE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'/%3E%3Cpath d='M10 11v6M14 11v6'/%3E%3Cpath d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'/%3E%3C/svg%3E";

const styles = {
  body: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: '#f8fafc',
    color: '#1a1a1a',
    padding: '2rem',
  },
  h1: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' },
  taskList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 640, padding: 0 },
  taskItem: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    background: '#ffffff', border: '1px solid #e2e8f0',
    borderRadius: 8, padding: '0.875rem 1rem',
  },
  taskLabel: { flex: 1, fontSize: '0.9375rem' },
  taskActions: { display: 'flex', gap: '0.25rem' },
  btn: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 36, height: 36, border: '1px solid #e2e8f0', borderRadius: 6,
    background: '#ffffff', cursor: 'pointer', padding: 0,
  },
  img: { width: 18, height: 18, display: 'block' },
};

function TaskActions({ taskLabel, onComplete, onEdit, onDelete }) {
  return (
    <div style={styles.taskActions}>
      {/*
        FIX: aria-label on the button names the action + target.
             alt="" on the image is correct — the image is decorative
             because the button itself already has an accessible name.
      */}
      <button
        style={styles.btn}
        aria-label={`Complete: ${taskLabel}`}
        onClick={onComplete}
      >
        <img src={ICON_CHECK} alt="" style={styles.img} />
      </button>
      <button
        style={styles.btn}
        aria-label={`Edit: ${taskLabel}`}
        onClick={onEdit}
      >
        <img src={ICON_EDIT} alt="" style={styles.img} />
      </button>
      <button
        style={styles.btn}
        aria-label={`Delete: ${taskLabel}`}
        onClick={onDelete}
      >
        <img src={ICON_DELETE} alt="" style={styles.img} />
      </button>
    </div>
  );
}

export default function TaskManager() {
  return (
    <div style={styles.body}>
      <h1 style={styles.h1}>My Tasks</h1>
      <ul style={styles.taskList}>
        {TASKS.map(task => (
          <li key={task.id} style={styles.taskItem}>
            <span style={styles.taskLabel}>{task.label}</span>
            <TaskActions
              taskLabel={task.label}
              onComplete={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
