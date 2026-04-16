// react/Component.jsx
// Pattern: Decorative Images — Alt Text
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import DecorativeImages from './Component';
//   <DecorativeImages />
//
// Key accessibility rules demonstrated:
//   1. Decorative images → alt=""  (screen reader skips entirely)
//   2. Informative images → meaningful alt text describing content
//   3. role="presentation" as belt-and-suspenders on landmark decorative images

// SVG data URIs — same visuals as the HTML version, fully self-contained
const BANNER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='200'%3E%3Crect width='1200' height='200' fill='%231d4ed8'/%3E%3Ccircle cx='200' cy='100' r='70' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle cx='1000' cy='80' r='90' fill='rgba(255,255,255,0.06)'/%3E%3C/svg%3E";

const DIVIDER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 48'%3E%3Cpath d='M0 24 C200 0,400 48,600 24 S1000 0,1200 24 L1200 48 L0 48Z' fill='%23e0e7ff'/%3E%3C/svg%3E";

const ORNAMENT_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='22' fill='none' stroke='%23dbeafe' stroke-width='3'/%3E%3Ccircle cx='24' cy='24' r='14' fill='none' stroke='%23bfdbfe' stroke-width='2'/%3E%3Ccircle cx='24' cy='24' r='5' fill='%23dbeafe'/%3E%3C/svg%3E";

const ARTICLE_PHOTO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='360'%3E%3Crect width='800' height='360' fill='%23f3f4f6'/%3E%3Crect x='60' y='60' width='680' height='240' rx='8' fill='%23e2e8f0'/%3E%3Crect x='80' y='80' width='200' height='16' rx='4' fill='%234a5568'/%3E%3Crect x='80' y='108' width='560' height='8' rx='4' fill='%236b7280'/%3E%3Crect x='80' y='124' width='480' height='8' rx='4' fill='%236b7280'/%3E%3C/svg%3E";

const styles = {
  page: {
    margin: 0,
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: '1.6',
    color: '#1a1a1a',
    background: '#ffffff',
  },
  hero: {
    overflow: 'hidden',
  },
  heroBanner: {
    display: 'block',
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  article: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 0.5rem',
  },
  meta: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '2rem',
  },
  articleBody: {
    fontSize: '1rem',
    lineHeight: '1.75',
    color: '#1a1a1a',
  },
  p: {
    margin: '0 0 1.5rem',
  },
  photoWrap: {
    margin: '2rem 0',
  },
  photo: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  caption: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginTop: '0.5rem',
    fontStyle: 'italic',
  },
  divider: {
    display: 'block',
    width: '100%',
    height: 'auto',
    margin: '2rem 0',
  },
  ornamentWrap: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  ornament: {
    display: 'block',
    width: '48px',
    height: '48px',
  },
};

export default function DecorativeImages() {
  return (
    <div style={styles.page}>
      {/*
        FIXED: Decorative hero banner
        - alt=""              → image is removed from the accessibility tree
        - role="presentation" → belt-and-suspenders for older AT
        The banner adds visual appeal but carries zero informational content.
      */}
      <div style={styles.hero}>
        <img
          src={BANNER_SRC}
          alt=""
          role="presentation"
          style={styles.heroBanner}
        />
      </div>

      <article style={styles.article}>
        <header>
          <h1 style={styles.title}>Building Accessible Web Applications</h1>
          <p style={styles.meta}>Published April 16, 2026 · 8 min read</p>
        </header>

        <div style={styles.articleBody}>
          <p style={styles.p}>
            Accessibility is not a feature — it is a fundamental quality of
            well-engineered software. When we build applications that work for
            everyone, we build better applications for all users.
          </p>

          <p style={styles.p}>
            The first step is understanding which users are affected and how
            specific failures manifest. Low-contrast text, missing form labels,
            and absent image alt text each produce distinct barriers for
            distinct user groups.
          </p>

          {/*
            Informative image: alt text describes what the image shows.
            Rule: if removing the image would lose information → it is informative.
            Write alt text that conveys the same information the image conveys visually.
          */}
          <div style={styles.photoWrap}>
            <img
              src={ARTICLE_PHOTO_SRC}
              alt="A developer reviewing an accessibility audit report showing WCAG violations"
              style={styles.photo}
            />
            <p style={styles.caption}>
              Accessibility audits should be part of every release cycle.
            </p>
          </div>

          <p style={styles.p}>
            Understanding WCAG success criteria gives developers a precise
            vocabulary for describing and fixing accessibility failures.
          </p>
        </div>

        {/*
          FIXED: Decorative section divider
          alt="" alone is sufficient here — no role="presentation" needed for a
          plain <img>. The wave SVG is pure visual decoration.
        */}
        <img
          src={DIVIDER_SRC}
          alt=""
          style={styles.divider}
        />

        <div style={styles.articleBody}>
          <p style={styles.p}>
            Not all images require descriptive alt text. Decorative images —
            those that add visual interest but convey no information — should be
            hidden from assistive technology entirely using{' '}
            <code>alt=""</code>.
          </p>
        </div>

        {/* FIXED: Decorative end ornament — alt="" removes it from the a11y tree */}
        <div style={styles.ornamentWrap}>
          <img
            src={ORNAMENT_SRC}
            alt=""
            style={styles.ornament}
          />
        </div>
      </article>
    </div>
  );
}
