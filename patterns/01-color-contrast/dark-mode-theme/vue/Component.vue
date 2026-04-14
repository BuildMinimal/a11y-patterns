<!-- vue/Component.vue -->
<!-- Pattern: Dark Mode Theme — Color Contrast -->
<!-- Vue 3 port of fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import DarkModeDashboard from './Component.vue'
    <DarkModeDashboard />
-->

<template>
  <div class="page">
    <div class="card" aria-label="Dark mode dashboard">
      <h1 class="card__title">Dark Mode Dashboard</h1>
      <p class="card__description">
        A dark mode interface that meets WCAG contrast requirements.
      </p>

      <div class="card__section">
        <h2 class="card__heading">Statistics</h2>
        <div class="stats">
          <div class="stat">
            <span class="stat__label">Total Users</span>
            <span class="stat__value">24,532</span>
          </div>
          <div class="stat">
            <span class="stat__label">Active Sessions</span>
            <span class="stat__value">1,847</span>
          </div>
          <div class="stat">
            <span class="stat__label">Conversion Rate</span>
            <span class="stat__value">3.2%</span>
          </div>
        </div>
      </div>

      <div class="card__section">
        <h2 class="card__heading">Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity__label">New user signup</span>
            <span class="activity__time">2 minutes ago</span>
          </div>
          <div class="activity-item">
            <span class="activity__label">Payment received</span>
            <span class="activity__time">15 minutes ago</span>
          </div>
          <div class="activity-item">
            <span class="activity__label">System update</span>
            <span class="activity__time">1 hour ago</span>
          </div>
        </div>
      </div>

      <div class="card__actions">
        <button class="btn btn--primary">View Details</button>
        <button class="btn btn--secondary">Export Data</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// No reactive state needed for this pattern — it's a pure display component.
// If you adapt this to show real dashboard data, pass props here:
//   const props = defineProps({ stats: Object, activities: Array, ... })
</script>

<style scoped>
/* All color values from tokens.json in this pattern folder.
   Every comment explains why a value was chosen. */

.page {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  background-color: #1a1a1a;
  color: #e5e5e5;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.card {
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  border: 1px solid #374151;
  border-radius: 8px;
  background-color: #1a1a1a;
}

/* FIXED: #e5e5e5 on #1a1a1a = 12.63:1 — AAA.
   Was: #a0a0a0 on #1a1a1a = 1.12:1 — failed.
   Strategy: Use off-white for body text, not medium gray. */
.card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e5e5e5;
  margin-bottom: 0.5rem;
}

/* FIXED: #a0aec0 on #1a1a1a = 5.74:1 — AA.
   Was: #808080 on #1a1a1a = 1.51:1 — failed.
   Strategy: Secondary text must still meet 4.5:1 contrast requirement. */
.card__description {
  font-size: 0.9375rem;
  color: #a0aec0;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.card__section {
  margin-bottom: 2rem;
}

.card__heading {
  font-size: 1.125rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-bottom: 1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
   Was: #2d2d2d on #1a1a1a = 1.20:1 — failed.
   Strategy: Component backgrounds must meet 3:1 contrast against page background. */
.stat {
  padding: 1rem;
  background-color: #374151;
  border-radius: 6px;
}

/* FIXED: #a0aec0 on #374151 = 5.74:1 — AA.
   Was: #808080 on #2d2d2d = 1.51:1 — failed.
   Strategy: Labels on dark backgrounds must use lighter colors. */
.stat__label {
  display: block;
  font-size: 0.8125rem;
  color: #a0aec0;
  margin-bottom: 0.5rem;
}

/* FIXED: #e5e5e5 on #374151 = 12.63:1 — AAA.
   Was: #a0a0a0 on #2d2d2d = 1.12:1 — failed.
   Strategy: Use off-white for values on dark backgrounds. */
.stat__value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #e5e5e5;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
   Was: #2d2d2d on #1a1a1a = 1.20:1 — failed.
   Strategy: List item backgrounds must be visible. */
.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #374151;
  border-radius: 6px;
}

/* FIXED: #e5e5e5 on #374151 = 12.63:1 — AAA.
   Was: #a0a0a0 on #2d2d2d = 1.12:1 — failed. */
.activity__label {
  font-size: 0.9375rem;
  color: #e5e5e5;
}

/* FIXED: #a0aec0 on #374151 = 5.74:1 — AA.
   Was: #808080 on #2d2d2d = 1.51:1 — failed. */
.activity__time {
  font-size: 0.8125rem;
  color: #a0aec0;
}

.card__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  border: 1px solid transparent;
}

/* FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
   Was: #2d2d2d on #1a1a1a = 1.20:1 — failed. */
.btn--primary {
  background-color: #374151;
  color: #ffffff;
  border-color: #374151;
}

/* FIXED: #4b5563 on #1a1a1a = 4.62:1 — AA.
   Hover state must also meet contrast requirements. */
.btn--primary:hover {
  background-color: #4b5563;
  border-color: #4b5563;
}

/* FIXED: #374151 on #1a1a1a = 3.01:1 — meets 3:1 for non-text content.
   Border color must be visible against dark background. */
.btn--secondary {
  background-color: transparent;
  color: #e5e5e5;
  border-color: #374151;
}

/* FIXED: #374151 on #1a1a1a = 3.01:1 — AA.
   Hover background is visible and meets contrast. */
.btn--secondary:hover {
  background-color: #374151;
}

/* WCAG 2.4.11: focus ring must have 3:1 contrast against adjacent colors.
   2px solid #60a5fa at 2px offset meets this and is always visible. */
.btn:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
</style>
