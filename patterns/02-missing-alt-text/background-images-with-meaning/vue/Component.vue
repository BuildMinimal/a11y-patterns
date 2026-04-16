<!-- vue/Component.vue -->
<!-- Pattern: Background Images with Meaning — Alt Text -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import BackgroundImagesWithMeaning from './Component.vue'
    <BackgroundImagesWithMeaning />
-->

<template>
  <main class="page">
    <h1 class="page-title">Article Editor</h1>

    <div class="editor-card">
      <div class="toolbar" role="toolbar" aria-label="Formatting">

        <!--
          Technique A: aria-label
          Applied directly to each button. The CSS background-image is the visual;
          aria-label is the accessible name used by screen readers and voice control.
        -->
        <div class="toolbar-group">
          <button
            v-for="btn in formattingButtons"
            :key="btn.className"
            type="button"
            class="toolbar-btn"
            :class="btn.className"
            :aria-label="btn.ariaLabel"
          />
        </div>

        <!--
          Technique B: visually-hidden <span> inside the button.
          The span is off-screen (sr-only CSS), so only AT reads it.
          Both techniques produce the same accessible name.
        -->
        <div class="toolbar-group">
          <button
            v-for="btn in insertButtons"
            :key="btn.className"
            type="button"
            class="toolbar-btn"
            :class="btn.className"
          >
            <span class="sr-only">{{ btn.label }}</span>
          </button>
        </div>

        <div class="toolbar-group">
          <button
            v-for="btn in listButtons"
            :key="btn.className"
            type="button"
            class="toolbar-btn"
            :class="btn.className"
          >
            <span class="sr-only">{{ btn.label }}</span>
          </button>
        </div>

      </div>

      <div class="editor-body">
        <textarea
          class="editor-area"
          placeholder="Start writing your article here…"
          aria-label="Article content"
        ></textarea>
      </div>
    </div>
  </main>
</template>

<script setup>
const formattingButtons = [
  { className: 'toolbar-btn--bold',      ariaLabel: 'Bold'      },
  { className: 'toolbar-btn--italic',    ariaLabel: 'Italic'    },
  { className: 'toolbar-btn--underline', ariaLabel: 'Underline' },
];

const insertButtons = [
  { className: 'toolbar-btn--link',  label: 'Insert link'  },
  { className: 'toolbar-btn--image', label: 'Insert image' },
];

const listButtons = [
  { className: 'toolbar-btn--ol', label: 'Ordered list'   },
  { className: 'toolbar-btn--ul', label: 'Unordered list' },
];
</script>

<style scoped>
/* Background-image icons — defined here rather than an external stylesheet */
.toolbar-btn--bold {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='4' y='18' font-family='serif' font-size='18' font-weight='900' fill='%231a1a1a'%3EB%3C/text%3E%3C/svg%3E");
}
.toolbar-btn--italic {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='7' y='18' font-family='serif' font-size='18' font-style='italic' font-weight='700' fill='%231a1a1a'%3EI%3C/text%3E%3C/svg%3E");
}
.toolbar-btn--underline {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='4' y='16' font-family='serif' font-size='16' text-decoration='underline' fill='%231a1a1a'%3EU%3C/text%3E%3Cline x1='4' y1='20' x2='20' y2='20' stroke='%231a1a1a' stroke-width='2'/%3E%3C/svg%3E");
}
.toolbar-btn--link {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='2' y='9' width='9' height='6' rx='3' fill='none' stroke='%231a1a1a' stroke-width='2'/%3E%3Crect x='13' y='9' width='9' height='6' rx='3' fill='none' stroke='%231a1a1a' stroke-width='2'/%3E%3Cline x1='11' y1='12' x2='13' y2='12' stroke='%231a1a1a' stroke-width='2'/%3E%3C/svg%3E");
}
.toolbar-btn--image {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='3' y='4' width='18' height='16' rx='2' fill='none' stroke='%231a1a1a' stroke-width='2'/%3E%3Ccircle cx='8' cy='9' r='2' fill='%231a1a1a'/%3E%3Cpath d='M3,17 L8,12 L13,16 L16,13 L21,17' fill='none' stroke='%231a1a1a' stroke-width='1.5'/%3E%3C/svg%3E");
}
.toolbar-btn--ol {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext x='3' y='9' font-family='sans-serif' font-size='7' fill='%231a1a1a'%3E1.%3C/text%3E%3Ctext x='3' y='15' font-family='sans-serif' font-size='7' fill='%231a1a1a'%3E2.%3C/text%3E%3Ctext x='3' y='21' font-family='sans-serif' font-size='7' fill='%231a1a1a'%3E3.%3C/text%3E%3Cline x1='13' y1='8' x2='22' y2='8' stroke='%231a1a1a' stroke-width='2'/%3E%3Cline x1='13' y1='14' x2='22' y2='14' stroke='%231a1a1a' stroke-width='2'/%3E%3Cline x1='13' y1='20' x2='22' y2='20' stroke='%231a1a1a' stroke-width='2'/%3E%3C/svg%3E");
}
.toolbar-btn--ul {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='5' cy='8' r='2' fill='%231a1a1a'/%3E%3Ccircle cx='5' cy='14' r='2' fill='%231a1a1a'/%3E%3Ccircle cx='5' cy='20' r='2' fill='%231a1a1a'/%3E%3Cline x1='11' y1='8' x2='22' y2='8' stroke='%231a1a1a' stroke-width='2'/%3E%3Cline x1='11' y1='14' x2='22' y2='14' stroke='%231a1a1a' stroke-width='2'/%3E%3Cline x1='11' y1='20' x2='22' y2='20' stroke='%231a1a1a' stroke-width='2'/%3E%3C/svg%3E");
}

/* Layout — matches the HTML/CSS version */
.page {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: #1a1a1a;
  background: #f8fafc;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.editor-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 8px 12px;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
  padding-right: 10px;
  margin-right: 8px;
  border-right: 1px solid #cbd5e1;
}

.toolbar-group:last-child {
  border-right: none;
  padding-right: 0;
  margin-right: 0;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.toolbar-btn:hover {
  background-color: #e2e8f0;
}

.toolbar-btn:active {
  background-color: #cbd5e1;
}

.editor-body {
  padding: 1.5rem;
}

.editor-area {
  width: 100%;
  min-height: 200px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.75;
  color: #1a1a1a;
  resize: vertical;
}

.editor-area:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 1px;
  border-color: transparent;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
