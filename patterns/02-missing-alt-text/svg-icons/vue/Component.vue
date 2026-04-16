<!-- vue/Component.vue -->
<!-- Pattern: SVG Icons — Alt Text -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import SvgIcons from './Component.vue'
    <SvgIcons />
-->

<template>
  <main class="page">
    <h1 class="page-title">System Alerts</h1>

    <div class="alert-list">
      <div
        v-for="alert in alerts"
        :key="alert.type"
        class="alert-row"
        :class="`alert-row--${alert.type}`"
      >
        <span class="alert-badge">
          <!--
            Strategy 1: Informative standalone SVG
            role="img" + aria-label + <title>
            The SVG IS the content — it conveys severity.
          -->
          <component :is="alert.severityIcon" />
        </span>

        <p class="alert-message">
          <strong>{{ alert.label }}:</strong> {{ alert.detail }}
        </p>

        <!--
          Strategy 2: Decorative SVG inside labelled button
          aria-label on the button provides the accessible name.
          aria-hidden on the SVG prevents AT from reading SVG internals.
        -->
        <button
          type="button"
          class="btn-dismiss"
          :class="`btn-dismiss--${alert.type}`"
          :aria-label="alert.dismissLabel"
        >
          <!-- Decorative close SVG — aria-hidden="true" focusable="false" -->
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16" height="16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Text + decorative SVG buttons -->
    <div class="action-bar">
      <button type="button" class="btn-action">
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16" height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download Report
      </button>

      <button type="button" class="btn-action">
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16" height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        Share
      </button>
    </div>
  </main>
</template>

<script setup>
import { defineComponent, h } from 'vue';

// Informative severity icon components — each conveys semantic meaning
const ErrorIcon = defineComponent({
  render: () => h('svg', {
    role: 'img',
    'aria-label': 'Error',
    class: 'severity-icon',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: '20', height: '20',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
  }, [
    h('title', 'Error'),
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
    h('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' }),
  ]),
});

const WarningIcon = defineComponent({
  render: () => h('svg', {
    role: 'img',
    'aria-label': 'Warning',
    class: 'severity-icon',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: '20', height: '20',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  }, [
    h('title', 'Warning'),
    h('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
    h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
    h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' }),
  ]),
});

const InfoIcon = defineComponent({
  render: () => h('svg', {
    role: 'img',
    'aria-label': 'Informational',
    class: 'severity-icon',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: '20', height: '20',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
  }, [
    h('title', 'Informational'),
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
    h('line', { x1: '12', y1: '8', x2: '12.01', y2: '8' }),
  ]),
});

const alerts = [
  {
    type: 'error',
    severityIcon: ErrorIcon,
    label: 'Critical',
    detail: 'Database connection failed on primary server.',
    dismissLabel: 'Dismiss critical alert',
  },
  {
    type: 'warning',
    severityIcon: WarningIcon,
    label: 'Warning',
    detail: 'Disk usage on server-02 is above 80%.',
    dismissLabel: 'Dismiss warning alert',
  },
  {
    type: 'info',
    severityIcon: InfoIcon,
    label: 'Informational',
    detail: 'Scheduled maintenance window starts at 02:00 UTC.',
    dismissLabel: 'Dismiss informational alert',
  },
];
</script>

<style scoped>
.page {
  max-width: 760px;
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

.alert-list {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  margin-bottom: 1.5rem;
}

.alert-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
}

.alert-row:last-child {
  border-bottom: none;
}

.alert-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.alert-row--error .alert-badge   { background: #fee2e2; color: #dc2626; }
.alert-row--warning .alert-badge { background: #fef3c7; color: #d97706; }
.alert-row--info .alert-badge    { background: #dbeafe; color: #2563eb; }

.severity-icon { display: block; }

.alert-message {
  flex: 1;
  font-size: 0.9375rem;
  color: #1a1a1a;
}

.btn-dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.btn-dismiss:hover      { background: #f1f5f9; }
.btn-dismiss--error     { color: #dc2626; }
.btn-dismiss--warning   { color: #d97706; }
.btn-dismiss--info      { color: #2563eb; }

.action-bar {
  display: flex;
  gap: 0.75rem;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  font-family: inherit;
  font-size: 0.9375rem;
  color: #1a1a1a;
  cursor: pointer;
  transition: background-color 0.1s ease, border-color 0.1s ease;
}

.btn-action:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
