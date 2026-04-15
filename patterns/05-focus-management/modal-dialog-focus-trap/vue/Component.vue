<!-- vue/Component.vue -->
<!-- Pattern: Modal Dialog Focus Trap — Focus Management -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import ModalDialog from './Component.vue'
    <ModalDialog />
-->

<template>
  <div class="page">
    <main class="main">
      <h1 class="h1">Modal Dialog Focus Trap — Vue</h1>
      <p class="p">
        This version demonstrates a modal with proper focus management in Vue.
      </p>

      <div class="content">
        <h2 class="h2">Page Content</h2>
        <p class="p">
          This is the main page content that should be obscured when the modal
          is open.
        </p>

        <form>
          <div class="form-group">
            <label for="name" class="label">Name:</label>
            <input type="text" id="name" name="name" class="input" />
          </div>
          <div class="form-group">
            <label for="email" class="label">Email:</label>
            <input type="email" id="email" name="email" class="input" />
          </div>
          <button type="submit" class="btn btn--primary">Submit Form</button>
        </form>

        <div class="actions">
          <button type="button" class="btn btn--primary" @click="openModal">
            Open Modal
          </button>
          <a href="#" class="link">Another link</a>
        </div>
      </div>
    </main>

    <!-- FIXED: Complete focus trap implementation -->
    <Transition name="modal-fade">
      <div
        v-if="isModalOpen"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div class="modal__overlay" @click="closeModal" aria-hidden="true" />
        <div
          ref="modalContent"
          class="modal__content"
          tabindex="-1"
          @keydown="handleKeyDown"
        >
          <h2 id="modal-title" class="modal__title">Delete Account</h2>
          <p id="modal-desc" class="modal__description">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <div class="modal__actions">
            <button
              type="button"
              class="btn btn--secondary"
              @click="closeModal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn--danger" @click="closeModal">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";

const isModalOpen = ref(false);
const modalContent = ref(null);
const lastFocusedElement = ref(null);

// FIXED: Get all focusable elements within a container
function getFocusableElements(container) {
  if (!container) return [];
  const focusableSelectors = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
    "[contenteditable]",
  ];
  return Array.from(container.querySelectorAll(focusableSelectors.join(", ")));
}

// FIXED: Open modal with proper focus management
function openModal() {
  // Store the element that opened the modal
  lastFocusedElement.value = document.activeElement;

  // Show the modal
  isModalOpen.value = true;

  // Prevent body scroll
  document.body.style.overflow = "hidden";

  // FIXED: Set initial focus after DOM update
  nextTick(() => {
    const focusableElements = getFocusableElements(modalContent.value);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else if (modalContent.value) {
      modalContent.value.focus();
    }
  });
}

// FIXED: Close modal with focus restoration
function closeModal() {
  // Hide the modal
  isModalOpen.value = false;

  // Restore body scroll
  document.body.style.overflow = "";

  // FIXED: Return focus to the element that opened the modal
  if (lastFocusedElement.value) {
    lastFocusedElement.value.focus();
  }
}

// FIXED: Trap focus within the modal
function handleKeyDown(event) {
  const focusableElements = getFocusableElements(modalContent.value);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key === "Tab") {
    if (event.shiftKey) {
      // Shift+Tab: if focus is on first element, move to last
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: if focus is on last element, move to first
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}

// FIXED: Handle Escape key to close modal
function handleEscape(event) {
  if (event.key === "Escape" && isModalOpen.value) {
    closeModal();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
  // Restore body scroll if modal was open
  document.body.style.overflow = "";
});
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

.p {
  margin-bottom: 1rem;
}

.content {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
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

.btn--secondary {
  background-color: #f3f4f6;
  color: #1a1a1a;
}

.btn--secondary:hover {
  background-color: #e5e7eb;
}

.btn--danger {
  background-color: #dc2626;
  color: #ffffff;
}

.btn--danger:hover {
  background-color: #b91c1c;
}

.link {
  color: #1d4ed8;
  text-decoration: underline;
}

.link:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

/* Modal styles */
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__content {
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal__content:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.modal__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #1a1a1a;
}

.modal__description {
  margin: 0 0 1.5rem 0;
  color: #4a5568;
}

.modal__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Modal fade transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
