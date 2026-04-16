// react/Component.jsx
// Pattern: Linked Images — Alt Text
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import LinkedImages from './Component';
//   <LinkedImages />
//
// Key accessibility rules demonstrated:
//   1. Image-only links → alt text describes the link DESTINATION, not the image subject
//   2. Logo links → alt must identify the site and the destination ("ProShop — return to homepage")
//   3. The alt attribute IS the accessible name of the link when no other text is present

// SVG data URIs — same visuals as the HTML version, fully self-contained
const LOGO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='40'%3E%3Crect width='160' height='40' fill='%231d4ed8' rx='6'/%3E%3Ctext x='80' y='27' text-anchor='middle' font-family='sans-serif' font-size='18' font-weight='bold' fill='white'%3EProShop%3C/text%3E%3C/svg%3E";

const ELECTRONICS_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23dbeafe'/%3E%3Crect x='100' y='60' width='200' height='130' rx='8' fill='%231d4ed8'/%3E%3Crect x='115' y='75' width='170' height='100' rx='4' fill='%23bfdbfe'/%3E%3Crect x='175' y='190' width='50' height='20' rx='4' fill='%231d4ed8'/%3E%3Crect x='155' y='208' width='90' height='8' rx='4' fill='%231d4ed8'/%3E%3Ctext x='200' y='235' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%231e40af'%3EElectronics%3C/text%3E%3C/svg%3E";

const CLOTHING_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23fce7f3'/%3E%3Cpath d='M140 80 L170 60 L200 80 L230 60 L260 80 L250 110 L230 100 L230 180 L170 180 L170 100 L150 110 Z' fill='%23db2777'/%3E%3Ctext x='200' y='220' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23be185d'%3EClothing%3C/text%3E%3C/svg%3E";

const HOME_GARDEN_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23dcfce7'/%3E%3Cpolygon points='200,60 120,130 280,130' fill='%2316a34a'/%3E%3Crect x='140' y='130' width='120' height='80' fill='%2316a34a'/%3E%3Crect x='180' y='160' width='40' height='50' fill='%23bbf7d0'/%3E%3Ctext x='200' y='225' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23166534'%3EHome and Garden%3C/text%3E%3C/svg%3E";

const BOOKS_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23fef3c7'/%3E%3Crect x='130' y='60' width='140' height='150' rx='4' fill='%23d97706'/%3E%3Crect x='135' y='65' width='130' height='140' rx='2' fill='%23fde68a'/%3E%3Crect x='150' y='90' width='100' height='6' rx='3' fill='%23d97706'/%3E%3Crect x='150' y='108' width='100' height='6' rx='3' fill='%23d97706'/%3E%3Crect x='150' y='126' width='80' height='6' rx='3' fill='%23d97706'/%3E%3Ctext x='200' y='225' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23b45309'%3EBooks%3C/text%3E%3C/svg%3E";

const CATEGORIES = [
  { href: '/electronics', src: ELECTRONICS_SRC, alt: 'Shop Electronics',       className: 'img-electronics' },
  { href: '/clothing',    src: CLOTHING_SRC,    alt: 'Shop Clothing',           className: 'img-clothing'    },
  { href: '/home-garden', src: HOME_GARDEN_SRC, alt: 'Shop Home and Garden',    className: 'img-home-garden' },
  { href: '/books',       src: BOOKS_SRC,       alt: 'Shop Books',              className: 'img-books'       },
];

const styles = {
  body: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: '1.6',
    color: '#1a1a1a',
    background: '#f8fafc',
    margin: 0,
  },
  header: {
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0.75rem 1.5rem',
  },
  nav: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  logoLink: {
    display: 'inline-block',
    lineHeight: 0,
  },
  siteLogo: {
    display: 'block',
    height: '40px',
    width: 'auto',
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2.5rem 1.5rem',
  },
  pageTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  pageIntro: {
    fontSize: '1rem',
    color: '#4a5568',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
  },
  categoryLink: {
    display: 'block',
    textDecoration: 'none',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '2px solid #e2e8f0',
    background: '#ffffff',
  },
  categoryImg: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
};

export default function LinkedImages() {
  return (
    <div style={styles.body}>
      {/*
        FIXED: Logo link.
        alt="ProShop — return to homepage" names the site AND the destination.
        "logo" alone describes the image; it does not describe the link.
      */}
      <header style={styles.header}>
        <nav style={styles.nav} aria-label="Site">
          <a href="/" style={styles.logoLink}>
            <img
              src={LOGO_SRC}
              alt="ProShop — return to homepage"
              style={styles.siteLogo}
            />
          </a>
        </nav>
      </header>

      <main style={styles.main}>
        <h1 style={styles.pageTitle}>Shop by Category</h1>
        <p style={styles.pageIntro}>Select a category to browse our full range of products.</p>

        {/*
          FIXED: Category image links.
          Each alt describes where the link goes — not what the image depicts.
          Screen reader: "Shop Electronics, link" — destination is clear.
        */}
        <div style={styles.grid}>
          {CATEGORIES.map(({ href, src, alt, className }) => (
            <a key={href} href={href} style={styles.categoryLink}>
              <img
                src={src}
                alt={alt}
                className={className}
                style={styles.categoryImg}
              />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
