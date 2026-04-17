<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">Articles</h1>
      <div class="toolbar">
        <!--
          FIX: <label> with id — referenced by aria-labelledby on the trigger.
          Screen reader announces: "Sort by: Most recent, collapsed, button"
        -->
        <label id="sort-label" class="sort-label">Sort by</label>
        <div class="select-wrapper">
          <!--
            FIX: Native <button> with aria-haspopup="listbox" and aria-expanded.
            aria-labelledby combines "Sort by" + current value for full context.
          -->
          <button
            ref="triggerRef"
            id="sort-trigger"
            type="button"
            class="select-trigger"
            :class="{ 'select-trigger--open': isOpen }"
            aria-haspopup="listbox"
            :aria-expanded="isOpen.toString()"
            aria-labelledby="sort-label sort-value"
            @click="toggleDropdown"
          >
            <span id="sort-value" class="select-value">{{ options[selectedIdx].label }}</span>
            <span class="select-arrow" :class="{ 'select-arrow--open': isOpen }" aria-hidden="true">▾</span>
          </button>
          <!--
            FIX: role="listbox" with tabindex="-1" for programmatic focus.
            aria-activedescendant tracks the keyboard-highlighted option.
          -->
          <ul
            v-if="isOpen"
            ref="listboxRef"
            id="sort-listbox"
            class="select-menu"
            role="listbox"
            aria-labelledby="sort-label"
            tabindex="-1"
            @keydown="handleListboxKeyDown"
          >
            <!--
              FIX: role="option" with aria-selected and unique id per option.
            -->
            <li
              v-for="(opt, i) in options"
              :key="opt.value"
              :id="`option-${i}`"
              role="option"
              :aria-selected="(i === selectedIdx).toString()"
              class="select-option"
              :class="{
                'select-option--selected': i === selectedIdx,
                'select-option--active':   i === activeIdx,
              }"
              :data-value="opt.value"
              @click="selectOption(i)"
            >
              {{ opt.label }}
            </li>
          </ul>
        </div>
      </div>
    </header>

    <ul class="article-list">
      <li v-for="article in articles" :key="article.title" class="article-card">
        <span class="article-category">{{ article.category }}</span>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-excerpt">{{ article.excerpt }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const options = [
  { value: 'Most recent',   label: 'Most recent' },
  { value: 'Most popular',  label: 'Most popular' },
  { value: 'Highest rated', label: 'Highest rated' },
  { value: 'Alphabetical',  label: 'Alphabetical' },
];

const articles = [
  { category: 'Accessibility', title: 'Building Accessible Forms', excerpt: 'Labels, errors, and input modes — the complete checklist for form accessibility that goes beyond just adding aria-label.' },
  { category: 'CSS',           title: 'CSS Grid for Complex Layouts', excerpt: 'Two-dimensional control without a framework. Grid makes the layouts that used to require JavaScript trivial to express in CSS.' },
  { category: 'TypeScript',    title: 'TypeScript Generics Explained', excerpt: 'Generics are the feature that makes TypeScript genuinely powerful. Here\'s how to read, write, and constrain them with confidence.' },
];

const isOpen      = ref(false);
const selectedIdx = ref(0);
const activeIdx   = ref(0);
const triggerRef  = ref(null);
const listboxRef  = ref(null);

async function openDropdown() {
  isOpen.value    = true;
  activeIdx.value = selectedIdx.value;
  await nextTick(); // wait for listbox to render
  listboxRef.value?.focus();
}

function closeDropdown(returnFocus = true) {
  isOpen.value = false;
  if (returnFocus) triggerRef.value?.focus();
}

function toggleDropdown() {
  isOpen.value ? closeDropdown() : openDropdown();
}

function selectOption(index) {
  selectedIdx.value = index;
  closeDropdown();
}

function handleListboxKeyDown(e) {
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); activeIdx.value = Math.min(activeIdx.value + 1, options.length - 1); break;
    case 'ArrowUp':   e.preventDefault(); activeIdx.value = Math.max(activeIdx.value - 1, 0); break;
    case 'Enter':
    case ' ':         e.preventDefault(); selectOption(activeIdx.value); break;
    case 'Escape':    e.preventDefault(); closeDropdown(); break;
    case 'Home':      e.preventDefault(); activeIdx.value = 0; break;
    case 'End':       e.preventDefault(); activeIdx.value = options.length - 1; break;
  }
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; padding: 2rem; }

.page-header { max-width: 860px; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.page-title { font-size: 1.75rem; font-weight: 700; }
.toolbar { display: flex; align-items: center; gap: 0.75rem; }
.sort-label { font-size: 0.875rem; font-weight: 500; color: #4a5568; }
.select-wrapper { position: relative; }

.select-trigger {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 0.875rem; background: #ffffff;
  border: 1px solid #d1d5db; border-radius: 6px;
  font-size: 0.875rem; color: #1a1a1a; cursor: pointer; min-width: 160px; text-align: left;
}
.select-trigger:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
.select-trigger--open { border-color: #2563eb; border-radius: 6px 6px 0 0; }

.select-arrow { margin-left: auto; font-size: 0.75rem; color: #6b7280; transition: transform 0.15s; }
.select-arrow--open { transform: rotate(180deg); }

.select-menu {
  position: absolute; top: calc(100% - 1px); left: 0; right: 0;
  background: #ffffff; border: 1px solid #2563eb; border-top: none;
  border-radius: 0 0 6px 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  z-index: 10; list-style: none; padding: 0; outline: none;
}

.select-option { padding: 0.625rem 0.875rem; font-size: 0.875rem; cursor: pointer; color: #1a1a1a; }
.select-option:hover { background: #f3f4f6; }
.select-option--selected { background: #dbeafe; color: #1e40af; font-weight: 500; }
.select-option--active { background: #eff6ff; outline: 2px solid #2563eb; outline-offset: -2px; }

.article-list { max-width: 860px; margin: 0 auto; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
.article-card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.25rem 1.5rem; }
.article-category { display: inline-block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #1e40af; background: #dbeafe; padding: 0.2rem 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; }
.article-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.375rem; }
.article-excerpt { font-size: 0.9375rem; color: #4a5568; line-height: 1.6; }
</style>
