<!-- vue/Component.vue -->
<!-- Pattern: Infinite Scroll Focus — Focus Management -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import InfiniteScroll from './Component.vue'
    <InfiniteScroll />
-->

<template>
  <div class="page">
    <main class="main">
      <h1 class="h1">Infinite Scroll Focus — Vue</h1>
      <p class="p">
        This version demonstrates an infinite scroll with proper focus
        management in Vue.
      </p>

      <div class="content">
        <h2 class="h2">News Feed</h2>
        <p class="p">
          Scroll down to load more articles. Focus is maintained when new
          content loads.
        </p>

        <!-- FIXED: Feed container with aria-live for screen reader announcements -->
        <div
          ref="feedContainerRef"
          class="feed-container"
          aria-live="polite"
          aria-atomic="false"
        >
          <article v-for="article in articles" :key="article.id" class="card">
            <h3 class="card__title">{{ article.title }}</h3>
            <p class="card__content">{{ article.content }}</p>
            <button type="button" class="btn btn--primary">Read More</button>
          </article>
        </div>

        <!-- FIXED: Loading indicator with aria-busy state -->
        <div
          class="loading-indicator"
          aria-live="polite"
          :aria-busy="isLoading"
          :hidden="!isLoading"
        >
          <div class="loading__spinner"></div>
          <span class="loading__text">Loading more articles...</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const articles = ref([]);
const isLoading = ref(false);
const feedContainerRef = ref(null);
let articleCount = 3;

// FIXED: Store currently focused element before content loads
function getActiveElement() {
  return document.activeElement;
}

// FIXED: Restore focus to previously focused element after content loads
function restoreFocus(previousFocus) {
  if (previousFocus && document.body.contains(previousFocus)) {
    previousFocus.focus();
  }
}

// FIXED: Create article object
function createArticle(index) {
  return {
    id: index,
    title: `Article ${index + 1}`,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };
}

// FIXED: Load more articles with focus preservation
function loadMoreArticles() {
  if (isLoading.value) return;

  // FIXED: Store currently focused element
  const previousFocus = getActiveElement();

  isLoading.value = true;

  // Simulate network delay
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      const newArticle = createArticle(articleCount + i + 1);
      articles.value.push(newArticle);
    }
    articleCount += 3;
    isLoading.value = false;

    // FIXED: Restore focus to previously focused element
    // If previously focused element is still in the DOM, restore focus to it
    restoreFocus(previousFocus);
  }, 1000);
}

// FIXED: Scroll detection with focus preservation
function handleScroll() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Load more when near bottom
  if (scrollTop + windowHeight > documentHeight - 500) {
    loadMoreArticles();
  }
}

// Initialize with some articles
onMounted(() => {
  const initialArticles = Array.from({ length: 3 }, (_, i) =>
    createArticle(i + 1),
  );
  articles.value = initialArticles;

  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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

.feed-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.card__content {
  margin-bottom: 1.25rem;
  color: #4a5568;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.btn--primary {
  background-color: #1d4ed8;
  color: #ffffff;
}

.btn--primary:hover {
  background-color: #1e40af;
}

/* Loading indicator styles */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 6px;
  margin-top: 2rem;
}

.loading__spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #1d4ed8;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading__text {
  font-size: 0.9375rem;
  color: #4a5568;
}
</style>
