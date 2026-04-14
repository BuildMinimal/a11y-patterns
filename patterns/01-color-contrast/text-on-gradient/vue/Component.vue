<!-- vue/Component.vue -->
<!-- Pattern: Text on Gradient — Color Contrast -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import GradientHero from './Component.vue'
    <GradientHero />
-->

<template>
  <div class="page">
    <section class="hero" aria-label="Promotional banner">
      <div class="hero__content">
        <span class="hero__eyebrow">New release</span>
        <h1 class="hero__heading">Design systems that scale with your team</h1>
        <p class="hero__subtext">
          Ship accessible, consistent UI faster. Built for product teams who
          can't afford to choose between speed and quality.
        </p>
        <div class="hero__actions">
          <a href="#" class="btn btn--primary">Start for free</a>
          <a href="#" class="btn btn--ghost">Watch demo</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No reactive state needed for this pattern — it's a pure display component.
</script>

<style scoped>
/* All color values from tokens.json in this pattern folder. */

.page {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #f8fafc;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* FIXED: Gradient #0f172a → #1e3a8a stays dark throughout.
   White text on lightest point (#1e3a8a) = 10.4:1 (AAA).
   Was: gradient to #7dd3fc — white text there = 1.75:1 (failed). */
.hero {
  max-width: 700px;
  width: 100%;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  border-radius: 12px;
  padding: 4rem 3rem;
  color: #ffffff;
}

.hero__content {
  max-width: 520px;
}

/* White text on dark gradient — passes throughout (10.4:1 to 19.5:1 AAA).
   opacity: 0.85 for visual hierarchy — still ≥16:1 effective contrast at darkest end. */
.hero__eyebrow {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffffff;
  margin-bottom: 1rem;
  display: block;
  opacity: 0.85;
}

.hero__heading {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.hero__subtext {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: #ffffff;
  margin-bottom: 2rem;
}

.hero__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  line-height: 1;
  border: 2px solid transparent;
}

/* FIXED: Flipped to white bg + dark text.
   #0f172a on #ffffff = 19.5:1 (AAA).
   Was: white on #7dd3fc = 1.75:1 (failed). */
.btn--primary {
  background-color: #ffffff;
  color: #0f172a;
  border-color: #ffffff;
}

/* FIXED: Transparent bg + white text on dark gradient.
   White on darkest gradient point = 19.5:1 (AAA).
   Was: white on #93c5fd = 1.80:1 (failed). */
.btn--ghost {
  background-color: transparent;
  color: #ffffff;
  border-color: #ffffff;
}

.btn--primary:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 3px;
}

.btn--ghost:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 3px;
  /* #93c5fd on dark background = high contrast — safe for focus indicator */
}
</style>
