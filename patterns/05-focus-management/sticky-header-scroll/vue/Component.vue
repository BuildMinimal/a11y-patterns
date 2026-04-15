<!-- vue/Component.vue -->
<!-- Pattern: Sticky Header Scroll — Focus Management -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import StickyHeaderScroll from './Component.vue'
    <StickyHeaderScroll />
-->

<template>
  <div class="page">
    <!-- FIXED: Sticky header with proper focus management -->
    <header class="header">
      <div class="header__content">
        <h1 class="header__title">My Website</h1>
        <nav class="header__nav">
          <a href="#home" class="nav__link">Home</a>
          <a href="#about" class="nav__link">About</a>
          <a href="#services" class="nav__link">Services</a>
          <a href="#contact" class="nav__link">Contact</a>
        </nav>
      </div>
    </header>

    <main class="main">
      <h1 class="h1">Sticky Header Scroll — Vue</h1>
      <p class="p">
        This version demonstrates a sticky header with proper focus management
        in Vue.
      </p>

      <div class="content">
        <h2 class="h2">Page Content</h2>
        <p class="p">
          Scroll down to see how the sticky header reserves space for content.
        </p>

        <section id="home" class="section">
          <h3 class="h3">Home Section</h3>
          <p class="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a href="#" class="link">Read more</a>
        </section>

        <section id="about" class="section">
          <h3 class="h3">About Section</h3>
          <p class="p">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <a href="#" class="link">Read more</a>
        </section>

        <section id="services" class="section">
          <h3 class="h3">Services Section</h3>
          <p class="p">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
          <a href="#" class="link">Read more</a>
        </section>

        <section id="contact" class="section">
          <h3 class="h3">Contact Section</h3>
          <p class="p">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <a href="#" class="link">Read more</a>
        </section>

        <section id="more-content" class="section">
          <h3 class="h3">More Content Section</h3>
          <p class="p">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </p>
          <a href="#" class="link">Read more</a>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const headerRef = ref(null);
const mainRef = ref(null);

// FIXED: Get currently focused element
function getActiveElement() {
  return document.activeElement;
}

// FIXED: Find first visible element that can receive focus
function findFirstVisibleElement() {
  const allFocusable = document.querySelectorAll(
    "a[href], button:not([disabled]), input:not([disabled]), " +
      "select:not([disabled]), textarea:not([disabled]), " +
      '[tabindex]:not([tabindex="-1"])',
  );

  for (const element of allFocusable) {
    const rect = element.getBoundingClientRect();
    const isVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth;

    if (isVisible) {
      return element;
    }
  }

  return null;
}

// FIXED: Check if header is covering a focused element
function checkHeaderCoverage() {
  const activeElement = getActiveElement();
  if (!activeElement || !headerRef.value) return;

  const headerRect = headerRef.value.getBoundingClientRect();
  const elementRect = activeElement.getBoundingClientRect();

  // Check if focused element is below the header
  const isCovered = elementRect.top >= headerRect.bottom;

  if (isCovered) {
    // FIXED: Move focus to the first visible element
    const firstVisible = findFirstVisibleElement();
    if (firstVisible) {
      firstVisible.focus();
    }
  }
}

// FIXED: Handle scroll events
function handleScroll() {
  checkHeaderCoverage();
}

// FIXED: Handle focus changes
function handleFocusChange() {
  // Small delay to ensure the element is actually focused
  setTimeout(checkHeaderCoverage, 50);
}

// Add event listeners
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("focusin", handleFocusChange);
  document.addEventListener("focusout", handleFocusChange);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("focusin", handleFocusChange);
  document.removeEventListener("focusout", handleFocusChange);
});
</script>

<style scoped>
.page {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  margin: 0;
  padding: 0;
  background-color: #f9fafb;
  min-height: 100vh;
}

/* Header styles */
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.header__nav {
  display: flex;
  gap: 1.5rem;
}

.nav__link {
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.nav__link:hover {
  color: #1d4ed8;
}

/* FIXED: Ensure focus indicators meet WCAG 2.4.11 (3:1 minimum) */
.nav__link:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

/* Main content styles */
.main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.p {
  margin-bottom: 1rem;
}

.content {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section {
  padding: 1.5rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #f3f4f6;
}

.section:last-child {
  border-bottom: none;
}

.link {
  color: #1d4ed8;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #1d4ed8;
  background-color: transparent;
  transition: all 0.15s ease;
  display: inline-block;
}

.link:hover {
  background-color: #1d4ed8;
  color: #ffffff;
}

/* FIXED: Ensure focus indicators meet WCAG 2.4.11 (3:1 minimum) */
.link:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
