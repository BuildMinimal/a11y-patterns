<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">Task Priority</h1>
      <p class="page-subtitle">Drag tasks to reorder, or use the arrow buttons</p>
    </header>

    <!-- FIX: aria-live region announces reorder to screen reader users -->
    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ status }}</p>

    <ul class="task-list" aria-label="Task priority list — use arrow buttons to reorder">
      <li
        v-for="(task, index) in tasks"
        :key="task.id"
        class="task-item"
        draggable="true"
        @dragstart="dragSrc = task.id"
        @dragend="dragSrc = null"
        @dragover.prevent
        @drop="handleDrop(task.id)"
      >
        <span class="task-drag-handle" aria-hidden="true">⠿</span>
        <span class="task-position" aria-hidden="true">{{ index + 1 }}</span>
        <span class="task-text">{{ task.text }}</span>

        <!-- FIX: role="group" labels the pair of controls per item -->
        <div class="task-controls" role="group" :aria-label="`Reorder ${task.text}`">
          <button
            :ref="el => { if (el) btnRefs[`${task.id}-up`] = el }"
            class="task-btn task-btn--up"
            :aria-label="`Move '${task.text}' up`"
            :disabled="index === 0"
            @click="move(index, -1)"
          >
            <span aria-hidden="true">↑</span>
          </button>
          <button
            :ref="el => { if (el) btnRefs[`${task.id}-down`] = el }"
            class="task-btn task-btn--down"
            :aria-label="`Move '${task.text}' down`"
            :disabled="index === tasks.length - 1"
            @click="move(index, 1)"
          >
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const tasks = ref([
  { id: 1, text: 'Review accessibility audit report' },
  { id: 2, text: 'Fix keyboard navigation in dropdown' },
  { id: 3, text: 'Write WCAG compliance documentation' },
  { id: 4, text: 'Update colour contrast tokens' },
  { id: 5, text: 'Test with NVDA screen reader' },
]);

const status  = ref('');
const dragSrc = ref(null);
const btnRefs = ref({});

async function move(fromIndex, direction) {
  const toIndex = fromIndex + direction;
  if (toIndex < 0 || toIndex >= tasks.value.length) return;

  const movedId = tasks.value[fromIndex].id;
  [tasks.value[fromIndex], tasks.value[toIndex]] = [tasks.value[toIndex], tasks.value[fromIndex]];

  const moved = tasks.value[toIndex];
  status.value = `${moved.text} moved to position ${toIndex + 1} of ${tasks.value.length}.`;

  await nextTick();
  const isAtEdge = direction > 0 ? toIndex === tasks.value.length - 1 : toIndex === 0;
  const prefer   = direction > 0 ? `${movedId}-down` : `${movedId}-up`;
  const fallback = direction > 0 ? `${movedId}-up`   : `${movedId}-down`;
  const btn = !isAtEdge ? btnRefs.value[prefer] : btnRefs.value[fallback];
  btn?.focus();
}

function handleDrop(targetId) {
  if (!dragSrc.value || dragSrc.value === targetId) return;
  const list    = tasks.value;
  const srcIdx  = list.findIndex(t => t.id === dragSrc.value);
  const dstIdx  = list.findIndex(t => t.id === targetId);
  const [moved] = list.splice(srcIdx, 1);
  list.splice(dstIdx, 0, moved);
  status.value  = `${moved.text} moved to position ${dstIdx + 1} of ${list.length}.`;
  dragSrc.value = null;
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; padding: 2rem; }
.page-header { max-width: 600px; margin: 0 auto 1.5rem; }
.page-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
.page-subtitle { font-size: 0.9375rem; color: #4a5568; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.task-list { max-width: 600px; margin: 0 auto; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
.task-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; cursor: grab; user-select: none; }
.task-item:hover { border-color: #d1d5db; background: #f9fafb; }
.task-drag-handle { font-size: 1.1rem; color: #9ca3af; flex-shrink: 0; }
.task-position { min-width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center; background: #eff6ff; color: #1e40af; font-size: 0.75rem; font-weight: 700; border-radius: 50%; flex-shrink: 0; }
.task-text { font-size: 0.9375rem; font-weight: 500; color: #374151; flex: 1; }
.task-controls { display: flex; gap: 0.25rem; flex-shrink: 0; opacity: 0; transition: opacity 0.15s; }
.task-item:hover .task-controls, .task-controls:focus-within { opacity: 1; }
.task-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 4px; font-size: 0.875rem; color: #374151; cursor: pointer; }
.task-btn:hover:not(:disabled) { background: #e5e7eb; }
.task-btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.task-btn:disabled { opacity: 0.3; cursor: not-allowed; }
</style>
