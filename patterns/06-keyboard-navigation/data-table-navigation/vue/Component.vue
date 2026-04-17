<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">Accessibility Tools</h1>
      <p class="page-subtitle">Use arrow keys to navigate. Press Enter or Space on a column header to sort.</p>
    </header>

    <!-- FIX: aria-live region announces sort changes to screen reader users -->
    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ status }}</p>

    <div class="table-wrapper">
      <!--
        FIX: role="grid" enables arrow-key cell navigation.
        FIX: aria-label names the table and hints at keyboard controls.
      -->
      <table
        ref="tableRef"
        class="data-table"
        role="grid"
        aria-label="Accessibility tools — sortable, use arrow keys to navigate cells"
        @keydown="handleKeyDown"
        @focusin="handleFocusIn"
      >
        <thead>
          <tr>
            <!--
              FIX: aria-sort on <th> communicates sort direction.
              FIX: <button> inside <th> is the keyboard sort trigger.
            -->
            <th
              v-for="col in COLS"
              :key="col"
              scope="col"
              :aria-sort="ariaSort(col)"
              :data-col="col"
              :class="{ 'th--sorted': ariaSort(col) !== 'none' }"
            >
              <button
                tabindex="-1"
                class="sort-btn"
                :aria-label="`Sort by ${COL_NAMES[col]}, ${SORT_LABELS[ariaSort(col)]}`"
                @click="sort(col)"
              >
                {{ COL_NAMES[col] }}
                <span class="sort-icon" aria-hidden="true">{{ SORT_ICONS[ariaSort(col)] }}</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in sortedTools" :key="tool.name">
            <!-- FIX: role="gridcell" explicitly marks cells as grid cells -->
            <td
              v-for="col in COLS"
              :key="col"
              role="gridcell"
              tabindex="-1"
            >
              {{ tool[col] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

const COLS      = ['name', 'category', 'cost', 'year'];
const COL_NAMES = { name: 'Tool name', category: 'Category', cost: 'Cost', year: 'Year' };
const SORT_ICONS  = { none: '↕', ascending: '↑', descending: '↓' };
const SORT_LABELS = { none: 'currently unsorted', ascending: 'currently sorted ascending', descending: 'currently sorted descending' };

const INITIAL_TOOLS = [
  { name: 'NVDA',       category: 'Screen reader', cost: 'Free',       year: 2006 },
  { name: 'axe-core',   category: 'Testing',       cost: 'Free',       year: 2015 },
  { name: 'JAWS',       category: 'Screen reader', cost: 'Commercial', year: 1989 },
  { name: 'VoiceOver',  category: 'Screen reader', cost: 'Built-in',   year: 2005 },
  { name: 'Lighthouse', category: 'Testing',       cost: 'Built-in',   year: 2016 },
];

const tableRef   = ref(null);
const sortCol    = ref(null);
const sortAsc    = ref(true);
const status     = ref('');
const focusedRow = ref(0);
const focusedCol = ref(0);

const sortedTools = computed(() => {
  if (!sortCol.value) return [...INITIAL_TOOLS];
  return [...INITIAL_TOOLS].sort((a, b) => {
    const av = a[sortCol.value]; const bv = b[sortCol.value];
    return sortAsc.value ? (av < bv ? -1 : av > bv ? 1 : 0) : (av > bv ? -1 : av < bv ? 1 : 0);
  });
});

function ariaSort(col) {
  if (col !== sortCol.value) return 'none';
  return sortAsc.value ? 'ascending' : 'descending';
}

// --- Grid structure ---

function getGrid() {
  const tbl = tableRef.value;
  if (!tbl) return [];
  const rows = [];
  rows.push(Array.from(tbl.querySelectorAll('thead th button')));
  tbl.querySelectorAll('tbody tr').forEach(tr => {
    rows.push(Array.from(tr.querySelectorAll('td')));
  });
  return rows;
}

// --- Focus management (roving tabindex) ---

function focusCell(row, col, skipFocus) {
  const grid = getGrid();
  row = Math.max(0, Math.min(row, grid.length - 1));
  col = Math.max(0, Math.min(col, (grid[row]?.length ?? 1) - 1));

  grid.forEach(r => r.forEach(el => el.setAttribute('tabindex', '-1')));
  const el = grid[row]?.[col];
  if (!el) return;
  el.setAttribute('tabindex', '0');
  focusedRow.value = row;
  focusedCol.value = col;
  if (!skipFocus) el.focus();
}

// --- Sort ---

async function sort(col) {
  if (sortCol.value === col) sortAsc.value = !sortAsc.value;
  else { sortCol.value = col; sortAsc.value = true; }

  const dir = sortAsc.value ? 'ascending' : 'descending';
  status.value = `Table sorted by ${COL_NAMES[col]}, ${dir}.`;

  await nextTick();
  focusCell(focusedRow.value, focusedCol.value);
}

// --- Arrow-key grid navigation ---

function handleKeyDown(e) {
  const { key, ctrlKey } = e;
  const grid = getGrid();
  let r = focusedRow.value;
  let c = focusedCol.value;
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
}

// --- Track focus from mouse click or Tab ---

function handleFocusIn(e) {
  const grid = getGrid();
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === e.target) {
        grid.forEach(row => row.forEach(el => el.setAttribute('tabindex', '-1')));
        e.target.setAttribute('tabindex', '0');
        focusedRow.value = r;
        focusedCol.value = c;
        return;
      }
    }
  }
}

// --- Init: first sort button is the Tab entry point ---
onMounted(() => {
  const grid = getGrid();
  grid.forEach(r => r.forEach(el => el.setAttribute('tabindex', '-1')));
  const first = grid[0]?.[0];
  if (first) first.setAttribute('tabindex', '0');
});
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; padding: 2rem; }
.page-header { max-width: 800px; margin: 0 auto 1.5rem; }
.page-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
.page-subtitle { font-size: 0.9375rem; color: #4a5568; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.table-wrapper { max-width: 800px; margin: 0 auto; overflow-x: auto; border-radius: 8px; border: 1px solid #e5e7eb; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.9375rem; }
.data-table thead { background: #f9fafb; border-bottom: 2px solid #e5e7eb; }
.data-table th { padding: 0; text-align: left; font-weight: 600; color: #374151; white-space: nowrap; }
.th--sorted { background: #eff6ff; }
.sort-btn { display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.75rem 1rem; background: transparent; border: none; font-size: 0.9375rem; font-weight: 600; color: #374151; cursor: pointer; text-align: left; }
.sort-btn:hover { background: #f3f4f6; color: #111827; }
.sort-btn:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; }
.sort-icon { font-size: 0.75rem; color: #9ca3af; }
.data-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #f3f4f6; color: #374151; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table td:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; background: #eff6ff; }
</style>
