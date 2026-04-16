<template>
  <div class="page">
    <main>
      <header class="page-header">
        <h1 class="page-title">A11y Weekly</h1>
        <p class="page-subtitle">Latest articles on web accessibility</p>
      </header>

      <div class="article-grid">
        <article v-for="article in articles" :key="article.id" class="article-card">
          <img
            :src="thumbnailSrc(article)"
            :alt="`${article.thumbnailLabel} illustration`"
            class="card-thumbnail"
          />
          <div class="card-body">
            <span class="card-category">{{ article.category }}</span>
            <h2 class="card-title">{{ article.title }}</h2>
            <p class="card-excerpt">{{ article.excerpt }}</p>
            <!--
              FIX: .sr-only span appends destination context invisible to sighted users.
              Screen reader announces: "Read more about [title], link"
            -->
            <a :href="`#${article.id}`" class="read-more">
              Read more<span class="sr-only"> about {{ article.title }}</span
              ><span aria-hidden="true"> →</span>
            </a>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
const articles = [
  {
    id: 'article-1',
    category: 'Keyboard',
    title: 'Mastering Focus Management in Single-Page Apps',
    excerpt: "When routes change in an SPA, focus stays on the trigger element rather than moving to the new content. Here's how to fix it.",
    thumbnailBg: '#dbeafe',
    thumbnailColor: '#2563eb',
    thumbnailLabel: 'Keyboard Navigation',
  },
  {
    id: 'article-2',
    category: 'Colour',
    title: 'WCAG 3.0 Contrast: What Changes for Designers',
    excerpt: 'The APCA model replaces the old AA/AAA ratio system. We break down what the shift means for your design tokens and component library.',
    thumbnailBg: '#dcfce7',
    thumbnailColor: '#16a34a',
    thumbnailLabel: 'Colour Contrast',
  },
  {
    id: 'article-3',
    category: 'Forms',
    title: 'Accessible Error Messages: Beyond Red Text',
    excerpt: 'Colour alone does not communicate an error to users with colour blindness. Combine icons, text, and ARIA live regions for resilience.',
    thumbnailBg: '#fef9c3',
    thumbnailColor: '#ca8a04',
    thumbnailLabel: 'Forms',
  },
];

function thumbnailSrc({ thumbnailBg, thumbnailColor, thumbnailLabel }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="${thumbnailBg}"/><text x="200" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${thumbnailColor}">${thumbnailLabel}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
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

main { max-width: 800px; margin: 0 auto; padding: 2rem; }

.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.page-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
.page-subtitle { font-size: 0.9375rem; color: #4a5568; }

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.article-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-thumbnail { width: 100%; height: 160px; object-fit: cover; display: block; }

.card-body {
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #2563eb;
  margin-bottom: 0.375rem;
}

.card-title { font-size: 1.0625rem; font-weight: 600; line-height: 1.4; margin-bottom: 0.5rem; }
.card-excerpt { font-size: 0.875rem; color: #4a5568; line-height: 1.6; flex: 1; margin-bottom: 1rem; }

.read-more {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
  margin-top: auto;
}
.read-more:hover { text-decoration: underline; }
.read-more:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; border-radius: 2px; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
