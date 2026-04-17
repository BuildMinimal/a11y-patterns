<template>
  <div class="page">
    <header class="page-header">
      <h1 class="page-title">Accessibility FAQ</h1>
      <p class="page-subtitle">Common questions about web accessibility</p>
    </header>

    <div class="accordion">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="accordion-item"
      >
        <!--
          FIX: <h2> wrapping <button> for semantic heading structure.
          aria-expanded + aria-controls wire the button to its panel.
        -->
        <h2 class="accordion-heading">
          <button
            :ref="el => { if (el) triggerRefs[index] = el }"
            :id="`trigger-${item.id}`"
            class="accordion-trigger"
            :class="{ 'accordion-trigger--open': openIds.has(item.id) }"
            :aria-expanded="openIds.has(item.id).toString()"
            :aria-controls="`panel-${item.id}`"
            @click="toggle(item.id)"
            @keydown="handleKeyDown($event, index)"
          >
            <span class="accordion-title">{{ item.question }}</span>
            <span
              class="accordion-icon"
              :class="{ 'accordion-icon--open': openIds.has(item.id) }"
              aria-hidden="true"
            >+</span>
          </button>
        </h2>
        <!--
          FIX: role="region" with aria-labelledby names the panel.
          v-show keeps the element in the DOM (axe can audit it) but
          the hidden attribute removes it from the accessibility tree when closed.
        -->
        <div
          v-if="openIds.has(item.id)"
          :id="`panel-${item.id}`"
          class="accordion-panel"
          role="region"
          :aria-labelledby="`trigger-${item.id}`"
        >
          <p class="accordion-answer">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const items = [
  { id: 'faq-1', question: 'What is WCAG and who maintains it?', answer: "WCAG — the Web Content Accessibility Guidelines — is published by the W3C's Web Accessibility Initiative (WAI). The current version is WCAG 2.2, published October 2023. Version 3.0 is in development and will introduce a new conformance model." },
  { id: 'faq-2', question: 'How do screen readers work?', answer: 'Screen readers convert on-screen text and interface elements into synthesised speech or braille output. They navigate the accessibility tree — a parallel representation of the DOM that exposes semantic meaning.' },
  { id: 'faq-3', question: 'What is the difference between WCAG Level A and Level AA?', answer: "Level A covers minimum requirements — failures block access entirely for some users. Level AA is the broadly-adopted target for public-facing websites and most legal standards, including the UK's PSBAR and the EU's EN 301 549." },
  { id: 'faq-4', question: 'How do I start testing my site for accessibility?', answer: 'Start with automated tools — axe DevTools, WAVE, or Lighthouse — to catch the 30–40% of issues machines can identify. Then do keyboard-only testing: unplug your mouse and try to use the page with Tab, Enter, Arrow keys, and Escape.' },
];

const openIds    = reactive(new Set());
const triggerRefs = ref([]);

function toggle(id) {
  openIds.has(id) ? openIds.delete(id) : openIds.add(id);
}

function handleKeyDown(e, index) {
  const total = items.length;
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); triggerRefs.value[(index + 1) % total]?.focus(); break;
    case 'ArrowUp':   e.preventDefault(); triggerRefs.value[(index - 1 + total) % total]?.focus(); break;
    case 'Home':      e.preventDefault(); triggerRefs.value[0]?.focus(); break;
    case 'End':       e.preventDefault(); triggerRefs.value[total - 1]?.focus(); break;
  }
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; padding: 2rem; }
.page-header { max-width: 700px; margin: 0 auto 2rem; }
.page-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.375rem; }
.page-subtitle { font-size: 1rem; color: #4a5568; }

.accordion { max-width: 700px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
.accordion-item + .accordion-item { border-top: 1px solid #e5e7eb; }
.accordion-heading { margin: 0; }

.accordion-trigger {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 1rem 1.25rem; background: #ffffff;
  border: none; cursor: pointer; text-align: left;
}
.accordion-trigger:hover { background: #f9fafb; }
.accordion-trigger:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; }
.accordion-trigger--open { background: #eff6ff; }

.accordion-title { font-size: 1rem; font-weight: 600; color: #1a1a1a; }

.accordion-icon { flex-shrink: 0; margin-left: 1rem; font-size: 1.25rem; color: #6b7280; transition: transform 0.2s; }
.accordion-icon--open { transform: rotate(45deg); }

.accordion-panel { padding: 0 1.25rem 1rem; border-top: 1px solid #e5e7eb; }
.accordion-answer { font-size: 0.9375rem; line-height: 1.75; color: #374151; }
</style>
