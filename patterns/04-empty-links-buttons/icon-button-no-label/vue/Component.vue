<template>
  <div class="page">
    <h1>My Tasks</h1>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <span class="task-label">{{ task.label }}</span>
        <div class="task-actions">
          <!--
            FIX: aria-label on each button provides the accessible name.
                 alt="" on the image is correct — the image is decorative
                 because the button already has its name via aria-label.
          -->
          <button :aria-label="`Complete: ${task.label}`" @click="complete(task)">
            <img :src="iconCheck" alt="" />
          </button>
          <button :aria-label="`Edit: ${task.label}`" @click="edit(task)">
            <img :src="iconEdit" alt="" />
          </button>
          <button :aria-label="`Delete: ${task.label}`" @click="remove(task)">
            <img :src="iconDelete" alt="" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const tasks = [
  { id: 1, label: 'Review accessibility audit report' },
  { id: 2, label: 'Update colour contrast tokens' },
  { id: 3, label: 'Write keyboard navigation tests' },
];

const iconCheck  = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316a34a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E";
const iconEdit   = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E";
const iconDelete = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'/%3E%3Cpath d='M10 11v6M14 11v6'/%3E%3Cpath d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'/%3E%3C/svg%3E";

function complete(task) {}
function edit(task) {}
function remove(task) {}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page {
  font-family: system-ui, -apple-system, sans-serif;
  background: #f8fafc;
  color: #1a1a1a;
  padding: 2rem;
}
h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 640px;
}
.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.875rem 1rem;
}
.task-label {
  flex: 1;
  font-size: 0.9375rem;
}
.task-actions {
  display: flex;
  gap: 0.25rem;
}
.task-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
  padding: 0;
  transition: background 0.15s;
}
.task-actions button:hover { background: #f1f5f9; }
.task-actions button img {
  width: 18px;
  height: 18px;
  display: block;
}
</style>
