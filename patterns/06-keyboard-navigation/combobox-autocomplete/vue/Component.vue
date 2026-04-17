<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">Framework Finder</h1>
      <p class="page-subtitle">Type to search — use arrow keys to pick a suggestion</p>
    </header>

    <div class="field">
      <label id="fw-label" for="fw-input" class="field-label">Framework</label>
      <div class="combobox-wrapper">
        <!--
          FIX: role="combobox" announces the widget type to AT.
          FIX: aria-expanded tracks whether the suggestion list is visible.
          FIX: aria-controls links the input to its listbox.
          FIX: aria-activedescendant points to the highlighted option.
        -->
        <input
          ref="inputRef"
          id="fw-input"
          type="text"
          class="combobox-input"
          role="combobox"
          aria-autocomplete="list"
          :aria-expanded="isOpen"
          :aria-controls="listboxId"
          :aria-activedescendant="activeDescendant"
          aria-labelledby="fw-label"
          v-model="value"
          placeholder="e.g. React, Vue, Svelte…"
          autocomplete="off"
          @input="handleInput"
          @keydown="handleKeyDown"
          @blur="handleBlur"
        />

        <!--
          FIX: role="listbox" names the popup; role="option" on each item.
          aria-selected marks the previously confirmed selection.
        -->
        <ul
          v-if="isOpen"
          :id="listboxId"
          class="listbox"
          role="listbox"
          aria-label="Framework suggestions"
        >
          <li
            v-for="(item, i) in matches"
            :key="item"
            :id="`${listboxId}-opt-${i}`"
            role="option"
            :aria-selected="item === selectedValue"
            class="option"
            :class="{
              'option--active':   i === activeIdx,
              'option--selected': item === selectedValue,
            }"
            @mousedown.prevent="select(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const ITEMS = [
  'Angular', 'Astro', 'Backbone', 'Ember',
  'Next.js', 'Nuxt', 'Preact', 'React',
  'Remix', 'Solid', 'Svelte', 'Vue',
];

const inputRef     = ref(null);
const value        = ref('');
const matches      = ref([]);
const activeIdx    = ref(-1);
const isOpen       = ref(false);
const selectedValue = ref('');
const listboxId    = 'fw-listbox';

const activeDescendant = computed(() =>
  isOpen.value && activeIdx.value >= 0 ? `${listboxId}-opt-${activeIdx.value}` : ''
);

function openWith(items) {
  matches.value  = items;
  activeIdx.value = -1;
  isOpen.value   = true;
}

function close() {
  isOpen.value   = false;
  matches.value  = [];
  activeIdx.value = -1;
}

function select(item) {
  value.value         = item;
  selectedValue.value = item;
  close();
  inputRef.value?.focus();
}

function handleInput() {
  const q = value.value.trim().toLowerCase();
  if (!q) { close(); return; }
  const filtered = ITEMS.filter(item => item.toLowerCase().startsWith(q));
  if (!filtered.length) { close(); return; }
  openWith(filtered);
}

function handleKeyDown(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!isOpen.value) {
      const q = value.value.trim().toLowerCase();
      const filtered = q ? ITEMS.filter(i => i.toLowerCase().startsWith(q)) : ITEMS;
      if (filtered.length) { openWith(filtered); activeIdx.value = 0; }
    } else {
      activeIdx.value = Math.min(activeIdx.value + 1, matches.value.length - 1);
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (isOpen.value) activeIdx.value = Math.max(activeIdx.value - 1, 0);
  } else if (e.key === 'Enter') {
    if (isOpen.value && activeIdx.value >= 0) {
      e.preventDefault();
      select(matches.value[activeIdx.value]);
    }
  } else if (e.key === 'Escape') {
    if (isOpen.value) { e.preventDefault(); close(); }
  } else if (e.key === 'Home' && isOpen.value) {
    e.preventDefault(); activeIdx.value = 0;
  } else if (e.key === 'End' && isOpen.value) {
    e.preventDefault(); activeIdx.value = matches.value.length - 1;
  }
}

function handleBlur() {
  setTimeout(() => {
    if (document.activeElement !== inputRef.value) close();
  }, 150);
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; padding: 2rem; }
.page-header { max-width: 480px; margin: 0 auto 2rem; }
.page-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
.page-subtitle { font-size: 0.9375rem; color: #4a5568; }
.field { max-width: 480px; margin: 0 auto; }
.field-label { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.375rem; }
.combobox-wrapper { position: relative; }
.combobox-input { width: 100%; padding: 0.625rem 0.875rem; font-size: 1rem; color: #1a1a1a; background: #fff; border: 1.5px solid #d1d5db; border-radius: 6px; outline: none; }
.combobox-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
.listbox { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); z-index: 10; overflow-y: auto; max-height: 240px; list-style: none; padding: 0.25rem 0; }
.option { padding: 0.625rem 0.875rem; font-size: 0.9375rem; color: #374151; cursor: pointer; }
.option:hover { background: #f3f4f6; }
.option--active { background: #eff6ff; color: #1e40af; font-weight: 500; }
.option--selected { background: #dbeafe; color: #1d4ed8; }
</style>
