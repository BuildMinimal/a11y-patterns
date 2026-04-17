import React from 'react';

const ARTICLES = [
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

const styles = {
  body: { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', margin: 0 },
  main: { maxWidth: 900, margin: '0 auto', padding: '2rem' },
  pageHeader: { marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #e2e8f0' },
  pageTitle: { fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' },
  pageSubtitle: { fontSize: '0.9375rem', color: '#4a5568' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' },
  card: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', position: 'relative' },
  thumbnail: { width: '100%', height: 150, objectFit: 'cover', display: 'block' },
  cardBody: { padding: '1rem 1.25rem 1.25rem' },
  category: { fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#2563eb', marginBottom: '0.375rem', display: 'block' },
  cardTitle: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '0.5rem' },
  /*
    FIX: The <a> is the real interactive element. Its ::after (via CSS class)
    stretches to cover the entire card. In React, apply the stretched-link
    class or use inline style with a pseudo-element via a CSS module / Tailwind.
    Here we use a data attribute and inline style noting the pattern.
  */
  link: { color: 'inherit', textDecoration: 'none' },
  excerpt: { fontSize: '0.875rem', color: '#4a5568', lineHeight: 1.6 },
};

function ArticleCard({ id, category, title, excerpt, thumbnailBg, thumbnailColor, thumbnailLabel }) {
  const src = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="150"><rect width="400" height="150" fill="${thumbnailBg}"/><text x="200" y="83" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${thumbnailColor}">${thumbnailLabel}</text></svg>`
  )}`;

  return (
    /*
      FIX: <article> with position:relative. One <a class="card-link"> on the title.
      The CSS ::after on .card-link stretches it over the whole card surface.
    */
    <article style={styles.card}>
      <img src={src} alt={`${thumbnailLabel} illustration`} style={styles.thumbnail} />
      <div style={styles.cardBody}>
        <span style={styles.category}>{category}</span>
        <h2 style={styles.cardTitle}>
          <a
            href={`#${id}`}
            className="card-link"
            style={styles.link}
          >
            {title}
          </a>
        </h2>
        <p style={styles.excerpt}>{excerpt}</p>
      </div>
    </article>
  );
}

export default function DevBlog() {
  return (
    <div style={styles.body}>
      <main style={styles.main}>
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Dev Blog</h1>
          <p style={styles.pageSubtitle}>Articles on frontend development and accessibility</p>
        </header>
        <div style={styles.grid}>
          {ARTICLES.map(a => <ArticleCard key={a.id} {...a} />)}
        </div>
      </main>
      {/* ::after stretch requires CSS — include this in your global/component stylesheet */}
      <style>{`
        .card-link { position: static; }
        .card-link::after { content: ""; position: absolute; inset: 0; }
        .card-link:focus-visible { outline: none; }
        article.card:has(.card-link:focus-visible) { outline: 2px solid #2563eb; outline-offset: 2px; }
      `}</style>
    </div>
  );
}
