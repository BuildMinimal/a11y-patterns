<!-- vue/Component.vue -->
<!-- Pattern: Linked Images — Alt Text -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import LinkedImages from './Component.vue'
    <LinkedImages />
-->

<template>
  <div>
    <!--
      FIXED: Logo link.
      The alt text identifies the site and the link destination.
      "logo" or "ProShop logo" describes the image, not the link's purpose.
      The accessible name of a link must describe where it goes.
    -->
    <header class="site-header">
      <nav class="site-nav" aria-label="Site">
        <a href="/" class="logo-link">
          <img
            :src="logoSrc"
            alt="ProShop — return to homepage"
            class="site-logo"
          />
        </a>
      </nav>
    </header>

    <main class="main">
      <h1 class="page-title">Shop by Category</h1>
      <p class="page-intro">Select a category to browse our full range of products.</p>

      <!--
        FIXED: Category image links.
        alt text describes the link destination, not the image subject.
        The image shows icons; the link goes to a category page.
        Screen reader announces: "Shop Electronics, link" — clear and actionable.
      -->
      <div class="category-grid">
        <a
          v-for="category in categories"
          :key="category.href"
          :href="category.href"
          class="category-link"
        >
          <img
            :src="category.src"
            :alt="category.alt"
            :class="['category-img', category.className]"
          />
        </a>
      </div>
    </main>
  </div>
</template>

<script setup>
// SVG data URIs — identical visuals to the HTML version, fully self-contained
const logoSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='40'%3E%3Crect width='160' height='40' fill='%231d4ed8' rx='6'/%3E%3Ctext x='80' y='27' text-anchor='middle' font-family='sans-serif' font-size='18' font-weight='bold' fill='white'%3EProShop%3C/text%3E%3C/svg%3E";

const categories = [
  {
    href: '/electronics',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23dbeafe'/%3E%3Crect x='100' y='60' width='200' height='130' rx='8' fill='%231d4ed8'/%3E%3Crect x='115' y='75' width='170' height='100' rx='4' fill='%23bfdbfe'/%3E%3Crect x='175' y='190' width='50' height='20' rx='4' fill='%231d4ed8'/%3E%3Crect x='155' y='208' width='90' height='8' rx='4' fill='%231d4ed8'/%3E%3Ctext x='200' y='235' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%231e40af'%3EElectronics%3C/text%3E%3C/svg%3E",
    alt: 'Shop Electronics',
    className: 'img-electronics',
  },
  {
    href: '/clothing',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23fce7f3'/%3E%3Cpath d='M140 80 L170 60 L200 80 L230 60 L260 80 L250 110 L230 100 L230 180 L170 180 L170 100 L150 110 Z' fill='%23db2777'/%3E%3Ctext x='200' y='220' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23be185d'%3EClothing%3C/text%3E%3C/svg%3E",
    alt: 'Shop Clothing',
    className: 'img-clothing',
  },
  {
    href: '/home-garden',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23dcfce7'/%3E%3Cpolygon points='200,60 120,130 280,130' fill='%2316a34a'/%3E%3Crect x='140' y='130' width='120' height='80' fill='%2316a34a'/%3E%3Crect x='180' y='160' width='40' height='50' fill='%23bbf7d0'/%3E%3Ctext x='200' y='225' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23166534'%3EHome and Garden%3C/text%3E%3C/svg%3E",
    alt: 'Shop Home and Garden',
    className: 'img-home-garden',
  },
  {
    href: '/books',
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='400' height='240' fill='%23fef3c7'/%3E%3Crect x='130' y='60' width='140' height='150' rx='4' fill='%23d97706'/%3E%3Crect x='135' y='65' width='130' height='140' rx='2' fill='%23fde68a'/%3E%3Crect x='150' y='90' width='100' height='6' rx='3' fill='%23d97706'/%3E%3Crect x='150' y='108' width='100' height='6' rx='3' fill='%23d97706'/%3E%3Crect x='150' y='126' width='80' height='6' rx='3' fill='%23d97706'/%3E%3Ctext x='200' y='225' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23b45309'%3EBooks%3C/text%3E%3C/svg%3E",
    alt: 'Shop Books',
    className: 'img-books',
  },
];
</script>

<style scoped>
.site-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
}

.site-nav {
  max-width: 1100px;
  margin: 0 auto;
}

.logo-link {
  display: inline-block;
  line-height: 0;
}

.site-logo {
  display: block;
  height: 40px;
  width: auto;
}

.main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: #1a1a1a;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.page-intro {
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.category-link {
  display: block;
  text-decoration: none;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.category-link:hover {
  border-color: #1d4ed8;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.12);
}

.category-img {
  display: block;
  width: 100%;
  height: auto;
}

:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
