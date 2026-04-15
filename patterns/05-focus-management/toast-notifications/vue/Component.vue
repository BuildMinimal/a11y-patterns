<!-- vue/Component.vue -->
<!-- Pattern: Toast Notifications — Focus Management -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import ToastNotifications from './Component.vue'
    <ToastNotifications />
-->

<template>
  <div class="page">
    <main class="main">
      <h1 class="h1">Toast Notifications — Vue</h1>
      <p class="p">
        This version demonstrates a toast notification with proper screen reader
        announcements in Vue.
      </p>

      <div class="content">
        <h2 class="h2">Notification Demo</h2>
        <p class="p">
          Click the buttons below to trigger different toast notifications.
        </p>

        <div class="actions">
          <button
            type="button"
            class="btn btn--success"
            @click="showToast('Changes saved successfully!', 'success')"
          >
            Show Success Toast
          </button>
          <button
            type="button"
            class="btn btn--danger"
            @click="
              showToast('Failed to save changes. Please try again.', 'error')
            "
          >
            Show Error Toast
          </button>
          <button
            type="button"
            class="btn btn--warning"
            @click="
              showToast('Your session will expire in 5 minutes.', 'warning')
            "
          >
            Show Warning Toast
          </button>
          <button
            type="button"
            class="btn btn--info"
            @click="showToast('New message received from John.', 'info')"
          >
            Show Info Toast
          </button>
        </div>

        <div class="form">
          <h3 class="h3">Test Form</h3>
          <div class="form-group">
            <label for="username" class="label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              class="input"
            />
          </div>
          <div class="form-group">
            <label for="email" class="label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              class="input"
            />
          </div>
          <button
            type="button"
            class="btn btn--primary"
            @click="showToast('Form submitted successfully!', 'success')"
          >
            Submit Form
          </button>
        </div>
      </div>
    </main>

    <!-- FIXED: Toast container with aria-live for screen reader announcements -->
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>{{ toast.message }}</span>
          <button
            type="button"
            class="toast__dismiss"
            aria-label="Dismiss notification"
            @click="dismissToast(toast.id)"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const toasts = ref([]);
const TOAST_DURATION = 5000; // 5 seconds

// FIXED: Show toast with proper ARIA attributes
function showToast(message, type = "info") {
  const id = Date.now();
  const newToast = {
    id,
    message,
    type,
    role: "alert",
    "aria-live": "polite",
    "aria-atomic": true,
  };

  toasts.value.push(newToast);

  // FIXED: Auto-dismiss after timeout
  setTimeout(() => {
    dismissToast(id);
  }, TOAST_DURATION);
}

// FIXED: Dismiss toast and remove from state
function dismissToast(id) {
  const index = toasts.value.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
}
</script>

<style scoped>
.page {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  margin: 0;
  padding: 0;
  background-color: #f9fafb;
  min-height: 100vh;
}

.main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.p {
  margin-bottom: 1rem;
}

.content {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.form {
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

.input:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.btn--primary {
  background-color: #1d4ed8;
  color: #ffffff;
}

.btn--primary:hover {
  background-color: #1e40af;
}

.btn--success {
  background-color: #059669;
  color: #ffffff;
}

.btn--success:hover {
  background-color: #047857;
}

.btn--danger {
  background-color: #dc2626;
  color: #ffffff;
}

.btn--danger:hover {
  background-color: #b91c1c;
}

.btn--warning {
  background-color: #d97706;
  color: #ffffff;
}

.btn--warning:hover {
  background-color: #b45309;
}

.btn--info {
  background-color: #2563eb;
  color: #ffffff;
}

.btn--info:hover {
  background-color: #1d4ed8;
}

/* Toast styles */
.toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-radius: 6px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 300px;
}

.toast--success {
  background-color: #059669;
  color: #ffffff;
}

.toast--error {
  background-color: #dc2626;
  color: #ffffff;
}

.toast--warning {
  background-color: #d97706;
  color: #ffffff;
}

.toast--info {
  background-color: #2563eb;
  color: #ffffff;
}

.toast__dismiss {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.25rem;
  margin-left: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.15s ease;
}

.toast__dismiss:hover {
  opacity: 1;
}

.toast__dismiss:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  opacity: 1;
}

/* Toast transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
