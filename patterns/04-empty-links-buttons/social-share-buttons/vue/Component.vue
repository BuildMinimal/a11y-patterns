<template>
  <div class="page">
    <main>
      <article>
        <header class="article-header">
          <span class="article-category">Accessibility</span>
          <h1 class="article-title">Why Colour Contrast Matters More Than You Think</h1>
          <p class="article-meta">By Jordan Lee · 12 April 2026 · 5 min read</p>
        </header>

        <div class="article-body">
          <p>Colour contrast is often treated as a checkbox — run the tool, hit 4.5:1, move on. But the real impact extends far beyond users with low vision.</p>
          <p>WCAG 2.2 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.</p>
        </div>

        <!-- FIX: aria-label on each button; SVGs are aria-hidden -->
        <div class="share-bar">
          <span class="share-label" aria-hidden="true">Share:</span>
          <div class="share-buttons" role="group" aria-label="Share this article">
            <button
              v-for="btn in shareButtons"
              :key="btn.label"
              :aria-label="btn.label"
              :class="['share-btn', btn.className]"
              @click="btn.action"
            >
              <component :is="btn.icon" aria-hidden="true" focusable="false" />
            </button>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
import { h } from 'vue';

const IconX = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor' },
  [h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' })]
);

const IconFacebook = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor' },
  [h('path', { d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' })]
);

const IconLinkedIn = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor' },
  [h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })]
);

const IconLink = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
  [h('path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }), h('path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' })]
);

const shareButtons = [
  { label: 'Share on X',        className: 'share-btn--x',        icon: IconX,        action: () => {} },
  { label: 'Share on Facebook', className: 'share-btn--facebook', icon: IconFacebook, action: () => {} },
  { label: 'Share on LinkedIn', className: 'share-btn--linkedin', icon: IconLinkedIn, action: () => {} },
  { label: 'Copy link',         className: 'share-btn--copy',     icon: IconLink,     action: () => {} },
];
</script>

<style scoped>
*,
*::before,
*::after { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  font-family: system-ui, -apple-system, sans-serif;
  background: #f8fafc;
  color: #1a1a1a;
}

main { max-width: 720px; margin: 0 auto; padding: 2rem; }

.article-header { margin-bottom: 1.5rem; }
.article-category { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #2563eb; margin-bottom: 0.5rem; display: block; }
.article-title { font-size: 1.75rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.5rem; }
.article-meta { font-size: 0.875rem; color: #4a5568; }
.article-body { font-size: 1rem; line-height: 1.75; margin-bottom: 2rem; }
.article-body p + p { margin-top: 1rem; }

.share-bar { display: flex; align-items: center; gap: 0.75rem; padding: 1.25rem 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.share-label { font-size: 0.875rem; font-weight: 600; color: #4a5568; flex-shrink: 0; }
.share-buttons { display: flex; gap: 0.5rem; }

.share-btn { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 8px; border: none; cursor: pointer; padding: 0; transition: opacity 0.15s; }
.share-btn:hover { opacity: 0.85; }
.share-btn:focus-visible { outline: 2px solid #1a1a1a; outline-offset: 2px; }
.share-btn svg { width: 20px; height: 20px; display: block; }

.share-btn--x        { background: #000000; color: #ffffff; }
.share-btn--facebook { background: #1877f2; color: #ffffff; }
.share-btn--linkedin { background: #0a66c2; color: #ffffff; }
.share-btn--copy     { background: #e2e8f0; color: #1a1a1a; }
</style>
