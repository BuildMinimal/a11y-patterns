<!-- vue/Component.vue -->
<!-- Pattern: Focus Indicator Contrast — Color Contrast -->
<!-- Vue 3 port of fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import ContactForm from './Component.vue'
    <ContactForm />
-->

<template>
  <div class="page">
    <div class="card" aria-label="Contact form">
      <h1 class="card__title">Contact Form</h1>
      <p class="card__description">
        A form with focus indicators that meet WCAG contrast requirements.
      </p>

      <form class="form" aria-label="Contact form">
        <div class="field">
          <label class="field__label" for="name">Full Name</label>
          <input
            class="field__input"
            type="text"
            id="name"
            name="name"
            autocomplete="name"
          />
        </div>

        <div class="field">
          <label class="field__label" for="email">Email Address</label>
          <input
            class="field__input"
            type="email"
            id="email"
            name="email"
            autocomplete="email"
          />
        </div>

        <div class="field">
          <label class="field__label" for="message">Message</label>
          <textarea
            class="field__textarea"
            id="message"
            name="message"
            rows="4"
          ></textarea>
        </div>

        <div class="field field--checkbox">
          <input
            class="field__checkbox"
            type="checkbox"
            id="subscribe"
            name="subscribe"
          />
          <label class="field__checkbox-label" for="subscribe">
            Subscribe to newsletter
          </label>
        </div>

        <div class="form__actions">
          <button type="submit" class="btn btn--primary">Send Message</button>
          <button type="button" class="btn btn--secondary">Cancel</button>
        </div>
      </form>

      <div class="card__links">
        <a href="#" class="link">Privacy Policy</a>
        <a href="#" class="link">Terms of Service</a>
        <a href="#" class="link">Help Center</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// No reactive state needed for this pattern — it's a pure display component.
// If you adapt this to show real form data, pass props here:
//   const props = defineProps({ title: String, fields: Array, ... })
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
  background-color: #f8fafc;
  color: #1a1a1a;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.card {
  max-width: 480px;
  width: 100%;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
}

.card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.card__description {
  font-size: 0.9375rem;
  color: #4a5568;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
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
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.9375rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1a1a1a;
  font-family: inherit;
}

.field__textarea {
  resize: vertical;
  min-height: 100px;
}

/* FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
   Was: #d1d5db on #ffffff = 1.51:1 — failed.
   Strategy: Use brand color for focus indicators. Meets WCAG 2.4.11.
   Using :focus-visible ensures focus only shows for keyboard users, not mouse users. */
.field__input:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 0;
  border-color: #1d4ed8;
}

.field--checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.field__checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
}

/* FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
   Was: #d1d5db on #ffffff = 1.51:1 — failed.
   Strategy: Checkbox focus indicators must also meet 3:1 contrast. */
.field__checkbox:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
  border-color: #1d4ed8;
}

.field__checkbox-label {
  font-size: 0.9375rem;
  color: #374151;
}

.form__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
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
  border: 2px solid transparent;
}

.btn--primary {
  background-color: #1d4ed8;
  color: #ffffff;
  border-color: #1d4ed8;
}

.btn--secondary {
  background-color: transparent;
  color: #1d4ed8;
  border-color: #1d4ed8;
}

/* FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
   Was: #d1d5db on #ffffff = 1.51:1 — failed.
   Strategy: Button focus indicators must be clearly visible. Use brand color for consistency. */
.btn:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.card__links {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.link {
  font-size: 0.9375rem;
  color: #1d4ed8;
  text-decoration: none;
}

/* FIXED: #1d4ed8 on #ffffff = 6.70:1 — meets 3:1 requirement for non-text content.
   Was: #d1d5db on #ffffff = 1.51:1 — failed.
   Strategy: Link focus indicators must be clearly visible. Underline alone is insufficient. */
.link:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
  text-decoration: underline;
}
</style>
