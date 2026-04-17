import React from 'react';

const EXT_ICON = (
  <svg
    className="ext-icon"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const SECTIONS = [
  {
    heading: 'Official Specifications',
    links: [
      {
        href: 'https://www.w3.org/TR/WCAG22/',
        label: 'WCAG 2.2',
        description: 'Web Content Accessibility Guidelines — full specification',
      },
      {
        href: 'https://www.w3.org/WAI/ARIA/apg/',
        label: 'ARIA Authoring Practices Guide',
        description: 'Design patterns and widgets for ARIA implementations',
      },
      {
        href: 'https://html.spec.whatwg.org/',
        label: 'HTML Living Standard',
        description: 'The WHATWG HTML specification maintained as a living document',
      },
    ],
  },
  {
    heading: 'Testing Tools',
    links: [
      {
        href: 'https://www.deque.com/axe/',
        label: 'axe DevTools',
        description: 'Browser extension for automated accessibility testing',
      },
      {
        href: 'https://wave.webaim.org/',
        label: 'WAVE',
        description: 'Web accessibility evaluation tool by WebAIM',
      },
    ],
  },
];

const styles = {
  body: { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1a1a1a', margin: 0 },
  main: { maxWidth: 760, margin: '0 auto', padding: '2rem' },
  pageHeader: { marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #e2e8f0' },
  pageTitle: { fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' },
  pageSubtitle: { fontSize: '0.9375rem', color: '#4a5568' },
  section: { marginBottom: '2rem' },
  sectionHeading: { fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem', paddingBottom: '0.375rem', borderBottom: '1px solid #e2e8f0' },
  linkList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 },
  linkItem: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.875rem 1rem' },
  link: { display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9375rem', fontWeight: 600, color: '#2563eb', textDecoration: 'none' },
  description: { fontSize: '0.875rem', color: '#4a5568', marginTop: '0.125rem' },
  srOnly: { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 },
};

function ExternalLink({ href, label, description }) {
  return (
    <li style={styles.linkItem}>
      {/*
        FIX: rel="noopener noreferrer" for security.
             .sr-only span announces "(opens in new tab)" to screen reader users.
             aria-hidden SVG icon gives sighted users the same visual cue.
      */}
      <a href={href} target="_blank" rel="noopener noreferrer" style={styles.link}>
        {label}
        {EXT_ICON}
        <span style={styles.srOnly}>(opens in new tab)</span>
      </a>
      <p style={styles.description}>{description}</p>
    </li>
  );
}

export default function WcagResources() {
  return (
    <div style={styles.body}>
      <main style={styles.main}>
        <header style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>WCAG Resources</h1>
          <p style={styles.pageSubtitle}>Essential references for accessible web development</p>
        </header>
        {SECTIONS.map(section => (
          <section key={section.heading} style={styles.section}>
            <h2 style={styles.sectionHeading}>{section.heading}</h2>
            <ul style={styles.linkList}>
              {section.links.map(link => (
                <ExternalLink key={link.href} {...link} />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
