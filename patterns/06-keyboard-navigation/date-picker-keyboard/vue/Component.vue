<template>
  <div class="page">
    <div class="form-card">
      <h1 class="form-title">Book an Appointment</h1>
      <p class="form-subtitle">Choose a date using the calendar below.</p>
      <div class="field">
        <label class="field-label" :for="`${uid}-input`">Appointment date</label>
        <div class="datepicker-wrapper">
          <input :id="`${uid}-input`" type="text" class="date-input" :value="formattedValue" readonly placeholder="DD/MM/YYYY" />
          <!-- FIX: Native <button> with aria-haspopup and aria-expanded -->
          <button
            ref="toggleRef"
            class="calendar-toggle"
            :class="{ 'calendar-toggle--open': isOpen }"
            aria-label="Open date picker"
            aria-haspopup="grid"
            :aria-expanded="isOpen.toString()"
            @click="isOpen ? closeCalendar() : openCalendar()"
          >
            <span aria-hidden="true">📅</span>
          </button>
        </div>

        <!-- FIX: role="dialog" with aria-label and aria-modal -->
        <div
          v-if="isOpen"
          role="dialog"
          aria-label="Date picker"
          aria-modal="true"
          class="calendar"
        >
          <div class="calendar-header">
            <button class="cal-nav" aria-label="Go to previous month" @click="prevMonth">
              <span aria-hidden="true">‹</span>
            </button>
            <h2 :id="`${uid}-heading`" class="cal-heading" aria-live="polite">
              {{ monthNames[viewMonth] }} {{ viewYear }}
            </h2>
            <button class="cal-nav" aria-label="Go to next month" @click="nextMonth">
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <!-- FIX: role="grid" with aria-labelledby and roving tabindex -->
          <table
            ref="gridRef"
            role="grid"
            :aria-labelledby="`${uid}-heading`"
            class="calendar-grid"
            @keydown="handleKeyDown"
          >
            <thead>
              <tr role="row">
                <th v-for="(d, i) in daysShort" :key="d" scope="col" :abbr="daysFull[i]" class="th">{{ d }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, wi) in weeks" :key="wi" role="row">
                <td
                  v-for="(date, di) in week"
                  :key="di"
                  role="gridcell"
                  :data-date="date ? dateKey(date) : undefined"
                  :tabindex="date && isFocused(date) ? 0 : -1"
                  :aria-current="date && isToday(date) ? 'date' : undefined"
                  :aria-selected="date && isSelected(date) ? 'true' : undefined"
                  :aria-disabled="!date ? 'true' : undefined"
                  :aria-label="date ? fullLabel(date) : undefined"
                  class="cal-cell"
                  :class="{
                    'cal-cell--today':    date && isToday(date),
                    'cal-cell--selected': date && isSelected(date),
                    'cal-cell--empty':    !date,
                  }"
                  @click="date && selectDate(date)"
                >
                  {{ date ? date.getDate() : '' }}
                </td>
              </tr>
            </tbody>
          </table>
          <button class="calendar-close" @click="closeCalendar()">Close calendar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, useId } from 'vue';

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const daysShort  = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const daysFull   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const uid       = useId();
const today     = new Date(); today.setHours(0,0,0,0);
const isOpen    = ref(false);
const viewYear  = ref(today.getFullYear());
const viewMonth = ref(today.getMonth());
const focused   = ref(new Date(today));
const selected  = ref(null);
const toggleRef = ref(null);
const gridRef   = ref(null);

function dateKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function isSameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function isToday(d)    { return isSameDay(d, today); }
function isSelected(d) { return selected.value && isSameDay(d, selected.value); }
function isFocused(d)  { return isSameDay(d, focused.value) && d.getMonth() === viewMonth.value; }
function fullLabel(d)  { return d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' }); }

const formattedValue = computed(() => {
  if (!selected.value) return '';
  const d = selected.value;
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
});

const weeks = computed(() => {
  const firstDay = new Date(viewYear.value, viewMonth.value, 1).getDay();
  const days     = new Date(viewYear.value, viewMonth.value + 1, 0).getDate();
  const cells    = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(viewYear.value, viewMonth.value, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const w = [];
  for (let i = 0; i < cells.length; i += 7) w.push(cells.slice(i, i+7));
  return w;
});

async function openCalendar() {
  isOpen.value = true;
  await nextTick();
  gridRef.value?.querySelector('[role="gridcell"][tabindex="0"]')?.focus();
}
function closeCalendar(returnFocus = true) {
  isOpen.value = false;
  if (returnFocus) toggleRef.value?.focus();
}
function selectDate(date) {
  selected.value = new Date(date);
  focused.value  = new Date(date);
  closeCalendar();
}
async function moveFocus(newDate) {
  focused.value = new Date(newDate);
  if (newDate.getMonth() !== viewMonth.value || newDate.getFullYear() !== viewYear.value) {
    viewYear.value  = newDate.getFullYear();
    viewMonth.value = newDate.getMonth();
  }
  await nextTick();
  gridRef.value?.querySelector('[role="gridcell"][tabindex="0"]')?.focus();
}
function prevMonth() {
  const d = new Date(viewYear.value, viewMonth.value - 1, 1);
  viewYear.value = d.getFullYear(); viewMonth.value = d.getMonth();
  focused.value = new Date(d.getFullYear(), d.getMonth(), Math.min(focused.value.getDate(), new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()));
}
function nextMonth() {
  const d = new Date(viewYear.value, viewMonth.value + 1, 1);
  viewYear.value = d.getFullYear(); viewMonth.value = d.getMonth();
  focused.value = new Date(d.getFullYear(), d.getMonth(), Math.min(focused.value.getDate(), new Date(d.getFullYear(), d.getMonth()+1, 0).getDate()));
}
function handleKeyDown(e) {
  const active = document.activeElement;
  if (!active?.dataset?.date) return;
  const [y, m, d] = active.dataset.date.split('-').map(Number);
  const cur = new Date(y, m - 1, d);
  let next;
  switch (e.key) {
    case 'ArrowRight': e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()+1); moveFocus(next); break;
    case 'ArrowLeft':  e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()-1); moveFocus(next); break;
    case 'ArrowDown':  e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()+7); moveFocus(next); break;
    case 'ArrowUp':    e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()-7); moveFocus(next); break;
    case 'Home':       e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()-cur.getDay()); moveFocus(next); break;
    case 'End':        e.preventDefault(); next = new Date(cur); next.setDate(cur.getDate()+(6-cur.getDay())); moveFocus(next); break;
    case 'PageUp':     e.preventDefault(); next = new Date(cur); next.setMonth(cur.getMonth()-1); moveFocus(next); break;
    case 'PageDown':   e.preventDefault(); next = new Date(cur); next.setMonth(cur.getMonth()+1); moveFocus(next); break;
    case 'Enter':
    case ' ':          e.preventDefault(); selectDate(cur); break;
    case 'Escape':     e.preventDefault(); closeCalendar(); break;
  }
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; padding: 2rem; display: flex; justify-content: center; }
.form-card { width: 100%; max-width: 420px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; }
.form-title { font-size: 1.375rem; font-weight: 700; margin-bottom: 0.25rem; }
.form-subtitle { font-size: 0.9375rem; color: #4a5568; margin-bottom: 1.5rem; }
.field { display: flex; flex-direction: column; gap: 0.375rem; }
.field-label { font-size: 0.875rem; font-weight: 600; color: #374151; }
.datepicker-wrapper { display: flex; }
.date-input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-right: none; border-radius: 6px 0 0 6px; font-size: 0.9375rem; }
.calendar-toggle { display: flex; align-items: center; justify-content: center; width: 42px; border: 1px solid #d1d5db; border-radius: 0 6px 6px 0; background: #f9fafb; cursor: pointer; font-size: 1.1rem; }
.calendar-toggle--open { background: #eff6ff; border-color: #2563eb; }
.calendar-toggle:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.calendar { margin-top: 0.5rem; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.calendar-header { display: flex; align-items: center; justify-content: space-between; padding: 0.625rem 0.875rem; border-bottom: 1px solid #e5e7eb; background: #f9fafb; }
.cal-nav { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 4px; background: transparent; cursor: pointer; font-size: 1.1rem; }
.cal-nav:hover { background: #e5e7eb; }
.cal-nav:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.cal-heading { font-size: 0.9375rem; font-weight: 600; }
.calendar-grid { width: 100%; border-collapse: collapse; padding: 0.625rem; }
.th { text-align: center; font-size: 0.75rem; font-weight: 600; color: #6b7280; padding: 0.25rem; }
.cal-cell { width: 36px; height: 36px; text-align: center; vertical-align: middle; font-size: 0.875rem; border-radius: 50%; cursor: pointer; }
.cal-cell:not(.cal-cell--empty):hover { background: #eff6ff; }
.cal-cell--empty { visibility: hidden; cursor: default; }
.cal-cell--today { background: #dbeafe; color: #1e40af; font-weight: 700; }
.cal-cell--selected { background: #2563eb; color: #ffffff; font-weight: 700; }
.cal-cell:focus-visible, .cal-cell[tabindex="0"]:focus { outline: 2px solid #2563eb; outline-offset: 2px; }
.calendar-close { display: block; width: 100%; padding: 0.5rem; border: none; border-top: 1px solid #e5e7eb; background: #f9fafb; font-size: 0.875rem; color: #374151; cursor: pointer; }
.calendar-close:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; }
</style>
