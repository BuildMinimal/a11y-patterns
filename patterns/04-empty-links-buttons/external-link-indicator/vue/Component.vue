<template>
  <div class="page">
    <main>
      <header class="page-header">
        <h1 class="page-title">WCAG Resources</h1>
        <p class="page-subtitle">Essential references for accessible web development</p>
      </header>

      <section v-for="section in sections" :key="section.heading" class="resource-section">
        <h2 class="section-heading">{{ section.heading }}</h2>
        <ul class="link-list">
          <li v-for="link in section.links" :key="link.href" class="link-item">
            <!--
              FIX: rel="noopener noreferrer" for security.
                   .sr-only span announces "(opens in new tab)" to screen reader users.
                   aria-hidden SVG icon gives sighted users the same visual cue.
            -->
            <a :href="link.href" target="_blank" rel="noopener noreferrer" class="ext-link">
              {{ link.label }}
              <svg class="ext-icon" aria-hidden="true" focusable="false"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              <span class="sr-only">(opens in new tab)</span>
            </a>
            <p class="link-description">{{ link.description }}</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
const sections = [
  {
    heading: 'Official Specifications',
    links: [
      { href: 'https://www.w3.org/TR/WCAG22/', label: 'WCAG 2.2', description: 'Web Content Accessibility Guidelines — full specification' },
      { href: 'https://www.w3.org/WAI/ARIA/apg/', label: 'ARIA Authoring Practices Guide', description: 'Design patterns and widgets for ARIA implementations' },
      { href: 'https://html.spec.whatwg.org/', label: 'HTML Living Standard', description: 'The WHATWG HTML specification maintained as a living document' },
    ],
  },
  {
    heading: 'Testing Tools',
    links: [
      { href: 'https://www.deque.com/axe/', label: 'axe DevTools', description: 'Browser extension for automated accessibility testing' },
      { href: 'https://wave.webaim.org/', label: 'WAVE', description: 'Web accessibility evaluation tool by WebAIM' },
    ],
  },
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

main { max-width: 760px; margin: 0 auto; padding: 2rem; }

.page-header { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #e2e8f0; }
.page-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
.page-subtitle { font-size: 0.9375rem; color: #4a5568; }

.resource-section { margin-bottom: 2rem; }

.section-heading {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid #e2e8f0;
}

.link-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }

.link-item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.875rem 1rem;
}

.ext-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
}
.ext-link:hover { text-decoration: underline; }
.ext-link:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; border-radius: 2px; }

.ext-icon { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.7; }

.link-description { font-size: 0.875rem; color: #4a5568; margin-top: 0.125rem; }

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
