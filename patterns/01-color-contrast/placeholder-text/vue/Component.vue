<!-- vue/Component.vue -->
<!-- Pattern: Placeholder Text — Color Contrast -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import ContactForm from './Component.vue'
    <ContactForm />
-->

<template>
  <div class="page">
    <form class="form" aria-label="Contact form">
      <h1 class="form__title">Get in touch</h1>
      <p class="form__description">
        Send us a message and we'll get back to you within one business day.
      </p>

      <div class="field">
        <label class="field__label" for="name">Full name</label>
        <input
          class="field__input"
          type="text"
          id="name"
          name="name"
          placeholder="e.g. Sarah Chen"
          autocomplete="name"
        >
      </div>

      <div class="field">
        <label class="field__label" for="email">Email address</label>
        <input
          class="field__input"
          type="email"
          id="email"
          name="email"
          placeholder="e.g. sarah@example.com"
          autocomplete="email"
        >
      </div>

      <div class="field">
        <label class="field__label" for="phone">
          Phone number
          <span class="field__optional">(optional)</span>
        </label>
        <input
          class="field__input"
          type="tel"
          id="phone"
          name="phone"
          autocomplete="tel"
        >
      </div>

      <div class="field">
        <label class="field__label" for="message">Message</label>
        <textarea
          class="field__input field__textarea"
          id="message"
          name="message"
          rows="4"
          placeholder="Tell us what you need help with"
        ></textarea>
      </div>

      <p class="form__helper">We respond to all enquiries within 24 hours.</p>

      <button type="submit" class="btn btn--primary">Send message</button>
    </form>
  </div>
</template>

<script setup>
// No reactive state needed for this pattern — it's a pure display component.
// In real usage, bind inputs with v-model and handle the submit event.
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
  max-width: 480px;
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

/* ADDED: Persistent visible label for every field.
   #374151 on white = 8.59:1 (AAA).
   Labels survive after the user fills in the field — placeholders don't. */
.field__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.field__optional {
  font-size: 0.8125rem;
  font-weight: 400;
  color: #6b7280;
  margin-left: 0.25rem;
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

/* FIXED: Placeholder color is #767676 on white = 4.54:1 — meets AA.
   Was: #aaaaaa on white = 2.32:1 — failed.
   #767676 is the exact minimum for AA compliance on white backgrounds.
   Typed values (#1a1a1a) are clearly darker than placeholders (#767676),
   maintaining visual distinction without failing contrast. */
.field__input::placeholder {
  color: #767676;
}

.field__input:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 0;
  border-color: #1d4ed8;
}

/* FIXED: Helper text #4a5568 on white = 5.74:1 (AA).
   Was: #aaaaaa on white = 2.32:1 — failed. */
.form__helper {
  font-size: 0.8125rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.btn--primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  background-color: #1d4ed8;
  color: #ffffff;
  border: 2px solid #1d4ed8;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.btn--primary:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
