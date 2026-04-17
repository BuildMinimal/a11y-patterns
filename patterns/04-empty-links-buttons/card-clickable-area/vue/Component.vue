<template>
  <div class="page">
    <main>
      <header class="page-header">
        <h1 class="page-title">Dev Blog</h1>
        <p class="page-subtitle">Articles on frontend development and accessibility</p>
      </header>

      <div class="card-grid">
        <!--
          FIX: <article> with position:relative. One <a class="card-link"> on the title.
          The CSS ::after on .card-link (inset:0, position:absolute) covers the full card.
        -->
        <article v-for="article in articles" :key="article.id" class="card">
          <img
            :src="thumbnailSrc(article)"
            :alt="`${article.thumbnailLabel} illustration`"
            class="card-thumbnail"
          />
          <div class="card-body">
            <span class="card-category">{{ article.category }}</span>
            <h2 class="card-title">
              <a :href="`#${article.id}`" class="card-link">
                {{ article.title }}
              </a>
            </h2>
            <p class="card-excerpt">{{ article.excerpt }}</p>
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
    category: 'CSS',
    title: 'CSS Grid: Building Complex Layouts Without a Framework',
    excerpt: 'Stop fighting with float hacks. Grid gives you two-dimensional layout control that was impossible five years ago.',
    thumbnailBg: '#dbeafe',
    thumbnailColor: '#2563eb',
    thumbnailLabel: 'CSS Grid',
  },
  {
    id: 'article-2',
    category: 'Performance',
    title: 'Core Web Vitals: A Practical Optimisation Checklist',
    excerpt: 'LCP, CLS, INP — what they measure, how they affect ranking, and the ten changes that move the needle most.',
    thumbnailBg: '#dcfce7',
    thumbnailColor: '#16a34a',
    thumbnailLabel: 'Performance',
  },
  {
    id: 'article-3',
    category: 'TypeScript',
    title: 'Migrating a Legacy Codebase to TypeScript Incrementally',
    excerpt: "You don't need to convert everything at once. A phased approach lets the team build confidence while keeping shipping.",
    thumbnailBg: '#fef9c3',
    thumbnailColor: '#ca8a04',
    thumbnailLabel: 'TypeScript',
  },
];

function thumbnailSrc({ thumbnailBg, thumbnailColor, thumbnailLabel }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="150"><rect width="400" height="150" fill="${thumbnailBg}"/><text x="200" y="83" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${thumbnailColor}">${thumbnailLabel}</text></svg>`;
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

main { max-width: 900px; margin: 0 auto; padding: 2rem; }

.page-header { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #e2e8f0; }
.page-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
.page-subtitle { font-size: 0.9375rem; color: #4a5568; }

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.card:has(.card-link:focus-visible) {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.card-thumbnail { width: 100%; height: 150px; object-fit: cover; display: block; }

.card-body { padding: 1rem 1.25rem 1.25rem; }

.card-category {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #2563eb;
  margin-bottom: 0.375rem;
}

.card-title { font-size: 1rem; font-weight: 600; line-height: 1.4; margin-bottom: 0.5rem; }

/* Stretched-link technique */
.card-link {
  color: inherit;
  text-decoration: none;
}

.card-link:focus-visible {
  outline: none;
}

.card-link::after {
  content: "";
  position: absolute;
  inset: 0;
}

.card-excerpt { font-size: 0.875rem; color: #4a5568; line-height: 1.6; }
</style>
