<!-- vue/Component.vue -->
<!-- Pattern: Text on Solid Background — Color Contrast -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import ArticleCard from './Component.vue'
    <ArticleCard />
-->

<template>
  <div class="page">
    <article class="card" aria-label="Article preview">
      <span class="card__tag">Accessibility</span>

      <h1 class="card__title">Getting Started with Web Accessibility</h1>

      <p class="card__meta">
        By <a href="#" class="card__meta-link">Sarah Chen</a>
        &middot; March 12, 2024 &middot; 8 min read
      </p>

      <p class="card__body">
        Web accessibility ensures that people with disabilities can use, understand,
        and interact with your website. Starting with the basics is easier than you
        think — and the improvements benefit every user, not just those with disabilities.
      </p>

      <p class="card__secondary">
        This article covers the fundamentals of WCAG 2.1, practical implementation
        tips, and tools you can use to audit your own sites today without expensive software.
      </p>

      <div class="card__footer">
        <a href="#" class="btn btn--primary">Read article</a>
        <a href="#" class="btn btn--ghost">Save for later</a>
      </div>
    </article>
  </div>
</template>

<script setup>
// No reactive state needed for this pattern — it's a pure display component.
// If you adapt this to show real article data, pass props here:
//   const props = defineProps({ title: String, author: String, ... })
</script>

<style scoped>
/* All color values from tokens.json in this pattern folder.
   Every comment explains why the value was chosen. */

.page {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #ffffff;
  color: #1a1a1a;
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
}

/* FIXED: #1e40af on #dbeafe = 7.16:1 — AAA.
   Was: #7ab3f0 on #ffffff = 2.85:1 — failed.
   Strategy: use the light brand color as a background, pair with a dark shade of the same hue. */
.card__tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #1e40af;
  background-color: #dbeafe;
  padding: 0.2em 0.6em;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

/* Unchanged — #1a1a1a on white = 18.1:1 (AAA). Already correct. */
.card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

/* FIXED: #4a5568 on white = 5.74:1 — AA.
   Was: #b0b7c3 on white = 1.96:1 — failed.
   "Secondary" text is not exempt from contrast requirements. */
.card__meta {
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 1.25rem;
}

.card__meta-link {
  color: #4a5568;
  text-decoration: underline;
}

/* FIXED: #1a1a1a on white = 18.1:1 — AAA.
   Was: #aaaaaa on white = 2.32:1 — failed.
   For body copy, push toward AAA — reading effort compounds over long passages. */
.card__body {
  font-size: 1rem;
  line-height: 1.7;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

/* FIXED: #4a5568 on white = 5.74:1 — AA.
   Lighter than primary body text for hierarchy, still passes. */
.card__secondary {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.card__footer {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  line-height: 1;
  border: 2px solid transparent;
}

/* FIXED: white on #1d4ed8 = 7.22:1 — AAA.
   Was: white on #93c5fd = 2.45:1 — failed.
   Use the dark shade (blue-700), not the light brand color (blue-300). */
.btn--primary {
  background-color: #1d4ed8;
  color: #ffffff;
  border-color: #1d4ed8;
}

/* FIXED: #1d4ed8 on white = 7.22:1 — AAA.
   Was: #9ca3af text + border on white = 2.54:1 — failed.
   Ghost buttons are not exempt from contrast requirements — text AND border must pass. */
.btn--ghost {
  background-color: transparent;
  color: #1d4ed8;
  border-color: #1d4ed8;
}

/* WCAG 2.4.11: focus ring must have 3:1 contrast against adjacent colors.
   2px solid #1d4ed8 at 2px offset meets this and is always visible. */
.btn:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
