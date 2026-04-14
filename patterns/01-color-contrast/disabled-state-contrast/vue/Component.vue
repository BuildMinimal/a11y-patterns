<!-- vue/Component.vue -->
<!-- Pattern: Disabled State Contrast — Color Contrast -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import AccountSettings from './Component.vue'
    <AccountSettings />
-->

<template>
  <div class="page">
    <form class="form" aria-label="Account settings">
      <h1 class="form__title">Account Settings</h1>
      <p class="form__description">
        Update your profile information. Fields marked as read-only cannot be changed.
      </p>

      <div class="field">
        <label class="field__label" for="email">Email address</label>
        <input
          class="field__input"
          type="email"
          id="email"
          name="email"
          value="sarah.chen@example.com"
        >
      </div>

      <div class="field">
        <label class="field__label" for="username">Username</label>
        <!-- disabled attribute triggers WCAG's inactive-UI-component exemption -->
        <input
          class="field__input"
          type="text"
          id="username"
          name="username"
          value="sarah_chen_42"
          disabled
        >
        <span class="field__hint">Usernames cannot be changed after account creation.</span>
      </div>

      <div class="field">
        <label class="field__label" for="plan">Current plan</label>
        <input
          class="field__input"
          type="text"
          id="plan"
          name="plan"
          value="Pro — $12/month"
          disabled
        >
        <span class="field__hint">Manage your plan in the Billing section.</span>
      </div>

      <div class="form__actions">
        <button type="submit" class="btn btn--primary">Save changes</button>
        <button type="button" class="btn btn--secondary" disabled>
          Request data export
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// No reactive state needed for this pattern — it's a pure display component.
// In real usage you'd bind form values with v-model and handle the submit event.
</script>

<style scoped>
/* All color values from tokens.json in this pattern folder. */

.page {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #f8fafc;
  color: #1a1a1a;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.form {
  max-width: 520px;
  width: 100%;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.form__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.form__description {
  font-size: 0.9375rem;
  color: #4a5568;
  margin-bottom: 1.75rem;
  line-height: 1.6;
}

.field {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.field__input {
  padding: 0.625rem 0.875rem;
  font-size: 0.9375rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1a1a1a;
  font-family: inherit;
}

/* FIXED: Targets elements with the native disabled attribute.
   WCAG 1.4.3 exempts natively disabled controls — no contrast requirement applies.
   #6b7280 on #f3f4f6 = 3.39:1 — readable enough to understand the field's value,
   while visually distinct from active fields.
   Was: #c0c0c0 on #f3f4f6 = 1.66:1 with CSS class only (axe flagged it). */
.field__input:disabled {
  background-color: #f3f4f6;
  color: #6b7280;
  border-color: #d1d5db;
  cursor: not-allowed;
}

.field__hint {
  font-size: 0.8125rem;
  color: #6b7280;
}

.form__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  font-family: inherit;
}

.btn--primary {
  background-color: #1d4ed8;
  color: #ffffff;
  border-color: #1d4ed8;
}

.btn--secondary {
  background-color: transparent;
  color: #374151;
  border-color: #d1d5db;
}

/* FIXED: Native disabled attribute — WCAG-exempt. */
.btn:disabled {
  background-color: #f3f4f6;
  color: #6b7280;
  border-color: #d1d5db;
  cursor: not-allowed;
}

.btn--primary:focus-visible,
.btn--secondary:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
