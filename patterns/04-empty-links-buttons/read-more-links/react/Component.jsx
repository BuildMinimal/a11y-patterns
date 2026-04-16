import React from 'react';

const ARTICLES = [
  {
    id: 'article-1',
    category: 'Keyboard',
    title: 'Mastering Focus Management in Single-Page Apps',
    excerpt:
      "When routes change in an SPA, focus stays on the trigger element rather than moving to the new content. Here's how to fix it.",
    thumbnailBg: '#dbeafe',
    thumbnailColor: '#2563eb',
    thumbnailLabel: 'Keyboard Navigation',
  },
  {
    id: 'article-2',
    category: 'Colour',
    title: 'WCAG 3.0 Contrast: What Changes for Designers',
    excerpt:
      'The APCA model replaces the old AA/AAA ratio system. We break down what the shift means for your design tokens and component library.',
    thumbnailBg: '#dcfce7',
    thumbnailColor: '#16a34a',
    thumbnailLabel: 'Colour Contrast',
  },
  {
    id: 'article-3',
    category: 'Forms',
    title: 'Accessible Error Messages: Beyond Red Text',
    excerpt:
      'Colour alone does not communicate an error to users with colour blindness. Combine icons, text, and ARIA live regions for resilience.',
    thumbnailBg: '#fef9c3',
    thumbnailColor: '#ca8a04',
    thumbnailLabel: 'Forms',
  },
];

const styles = {
  body: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: '#f8fafc',
    color: '#1a1a1a',
    margin: 0,
  },
  main: { maxWidth: 800, margin: '0 auto', padding: '2rem' },
  pageHeader: { marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #e2e8f0' },
  pageTitle: { fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' },
  pageSubtitle: { fontSize: '0.9375rem', color: '#4a5568' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  card: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  cardBody: { padding: '1rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', flex: 1 },
  category: { fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2563eb', marginBottom: '0.375rem' },
  cardTitle: { fontSize: '1.0625rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.5rem' },
  excerpt: { fontSize: '0.875rem', color: '#4a5568', lineHeight: 1.6, flex: 1, marginBottom: '1rem' },
  readMore: { display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 600, color: '#2563eb', textDecoration: 'none', marginTop: 'auto' },
  srOnly: { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 },
};

function ArticleCard({ id, category, title, excerpt, thumbnailBg, thumbnailColor, thumbnailLabel }) {
  const thumbnailSrc = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="160"><rect width="400" height="160" fill="${thumbnailBg}"/><text x="200" y="88" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${thumbnailColor}">${thumbnailLabel}</text></svg>`
  )}`;

  return (
    <article style={styles.card}>
      <img src={thumbnailSrc} alt={`${thumbnailLabel} illustration`} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
      <div style={styles.cardBody}>
        <span style={styles.category}>{category}</span>
        <h2 style={styles.cardTitle}>{title}</h2>
        <p style={styles.excerpt}>{excerpt}</p>
        {/*
          FIX: .sr-only span appends destination context invisible to sighted users.
          Screen reader announces: "Read more about [title], link"
        */}
        <a href={`#${id}`} style={styles.readMore}>
          Read more
          <span style={styles.srOnly}> about {title}</span>
          <span aria-hidden="true"> →</span>
        </a>
      </div>
    </article>
  );
}

export default function A11yWeekly() {
  return (
    <div style={styles.body}>
      <main style={styles.main}>
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>A11y Weekly</h1>
          <p style={styles.pageSubtitle}>Latest articles on web accessibility</p>
        </header>
        <div style={styles.grid}>
          {ARTICLES.map(article => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </main>
    </div>
  );
}
