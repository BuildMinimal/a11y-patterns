<template>
  <div class="page">
    <!--
      FIX: Skip link is the FIRST element — therefore the first Tab stop.
      CSS transform hides it off-screen; :focus slides it into view.
    -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <nav class="site-nav" aria-label="Site navigation">
      <div class="nav-inner">
        <a href="#" class="nav-logo">A11y Docs</a>
        <ul class="nav-links">
          <li v-for="label in navLinks" :key="label">
            <a href="#">{{ label }}</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="page-content">
      <nav class="sidebar" aria-label="Page contents">
        <p class="sidebar-heading" aria-hidden="true">On this page</p>
        <ul class="sidebar-links">
          <li v-for="label in sidebarLinks" :key="label">
            <a href="#">{{ label }}</a>
          </li>
        </ul>
      </nav>

      <!--
        FIX: <main id="main-content" tabindex="-1">
        tabindex="-1" allows the skip link to programmatically focus the element.
      -->
      <main class="article" id="main-content" tabindex="-1">
        <h1 class="article-title">WCAG 2.4.1 — Bypass Blocks</h1>
        <p class="article-meta">Category: Navigable · Level: A</p>
        <div class="article-body">
          <p>A mechanism is available to bypass blocks of content that are repeated on multiple web pages. For keyboard-only users, navigating past a large navigation menu on every page visit is a significant burden.</p>
          <p>Screen reader users have their own bypass mechanisms — heading navigation, landmark regions, links list. But sighted keyboard users have none of these unless the page explicitly provides a skip link.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const navLinks = ['Getting Started', 'WCAG Guidelines', 'Patterns', 'Testing', 'Resources', 'About'];
const sidebarLinks = ['What is WCAG 2.4.1?', 'Who benefits?', 'Implementation', 'Testing checklist', 'Related patterns'];
</script>

<style scoped>
*,
*::before,
*::after { box-sizing: border-box; margin: 0; padding: 0; }

.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; }

/* Skip link */
.skip-link {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 9999;
  padding: 0.625rem 1rem;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transform: translateY(calc(-100% - 1rem));
  transition: transform 0.15s;
}
.skip-link:focus { transform: translateY(0); }

/* Nav */
.site-nav { background: #1a1a1a; padding: 0 2rem; }
.nav-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: center; height: 56px; }
.nav-logo { font-size: 1.125rem; font-weight: 700; color: #ffffff; text-decoration: none; margin-right: auto; }
.nav-links { list-style: none; display: flex; padding: 0; }
.nav-links a { display: block; padding: 0.5rem 1rem; font-size: 0.875rem; font-weight: 500; color: #d1d5db; text-decoration: none; }
.nav-links a:hover { color: #ffffff; }
.nav-links a:focus-visible { outline: 2px solid #ffffff; outline-offset: -2px; }

/* Layout */
.page-content { max-width: 900px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: 1fr 260px; gap: 2rem; }

/* Sidebar */
.sidebar { order: 2; }
.sidebar-heading { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #4a5568; margin-bottom: 0.75rem; }
.sidebar-links { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
.sidebar-links a { display: block; font-size: 0.875rem; color: #2563eb; text-decoration: none; padding: 0.25rem 0; }
.sidebar-links a:hover { text-decoration: underline; }

/* Article */
.article { order: 1; }
.article-title { font-size: 1.625rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.5rem; }
.article-meta { font-size: 0.875rem; color: #4a5568; margin-bottom: 1.25rem; }
.article-body { font-size: 1rem; line-height: 1.75; }
.article-body p + p { margin-top: 1rem; }
</style>
