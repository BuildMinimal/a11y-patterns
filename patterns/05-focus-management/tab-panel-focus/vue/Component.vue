<!-- vue/Component.vue -->
<!-- Pattern: Tab Panel Focus — Focus Management -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import TabPanel from './Component.vue'
    <TabPanel />
-->

<template>
  <div class="page">
    <main class="main">
      <h1 class="h1">Tab Panel Focus — Vue</h1>
      <p class="p">
        This version demonstrates a tab component with proper keyboard
        navigation in Vue.
      </p>

      <div class="content">
        <h2 class="h2">Product Details</h2>
        <p class="p">
          Use the tabs below to view different product information.
        </p>

        <!-- FIXED: Complete keyboard navigation implementation -->
        <div class="tabs">
          <!-- FIXED: Tab list with proper ARIA attributes -->
          <div
            ref="tabListRef"
            class="tabs__list"
            role="tablist"
            aria-label="Product information tabs"
            @keydown="handleTabListKeyDown"
          >
            <button
              v-for="tab in tabData"
              :key="tab.id"
              :ref="(el) => setTabRef(tab.id, el)"
              :id="`tab-${tab.id}`"
              class="tabs__tab"
              :class="{ 'tabs__tab--active': activeTabId === tab.id }"
              role="tab"
              :aria-selected="activeTabId === tab.id"
              :aria-controls="`panel-${tab.id}`"
              :tabindex="activeTabId === tab.id ? 0 : -1"
              @click="switchTab(tab.id)"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- FIXED: Tab panels with proper ARIA attributes -->
          <div class="tabs__panels">
            <div
              v-for="tab in tabData"
              :key="tab.id"
              :id="`panel-${tab.id}`"
              class="tabs__panel"
              :class="{ 'tabs__panel--active': activeTabId === tab.id }"
              role="tabpanel"
              :aria-labelledby="`tab-${tab.id}`"
              :tabindex="activeTabId === tab.id ? 0 : -1"
              :hidden="activeTabId !== tab.id"
            >
              <h3 class="h3">{{ tab.title }}</h3>
              <component :is="tab.content" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";

// FIXED: Tab data structure
const tabData = [
  {
    id: "description",
    label: "Description",
    title: "Product Description",
    content: "description-content",
  },
  {
    id: "specifications",
    label: "Specifications",
    title: "Technical Specifications",
    content: "specifications-content",
  },
  {
    id: "reviews",
    label: "Reviews",
    title: "Customer Reviews",
    content: "reviews-content",
  },
];

const activeTabId = ref(tabData[0].id);
const tabListRef = ref(null);
const tabRefs = ref({});

// FIXED: Set up tab refs
function setTabRef(tabId, el) {
  if (el) {
    tabRefs.value[tabId] = el;
  }
}

// FIXED: Get index of active tab
const getActiveTabIndex = computed(() => {
  return tabData.findIndex((tab) => tab.id === activeTabId.value);
});

// FIXED: Switch to a specific tab
function switchTab(tabId) {
  activeTabId.value = tabId;
}

// FIXED: Handle keyboard navigation within the tab list
function handleTabListKeyDown(event) {
  const currentIndex = getActiveTabIndex.value;

  switch (event.key) {
    case "ArrowRight":
      event.preventDefault();
      // Move to next tab, wrap to first if at end
      const nextIndex = (currentIndex + 1) % tabData.length;
      switchTab(tabData[nextIndex].id);
      break;

    case "ArrowLeft":
      event.preventDefault();
      // Move to previous tab, wrap to last if at start
      const prevIndex = (currentIndex - 1 + tabData.length) % tabData.length;
      switchTab(tabData[prevIndex].id);
      break;

    case "Home":
      event.preventDefault();
      // Jump to first tab
      switchTab(tabData[0].id);
      break;

    case "End":
      event.preventDefault();
      // Jump to last tab
      switchTab(tabData[tabData.length - 1].id);
      break;

    case "Enter":
    case " ":
      event.preventDefault();
      // Activate the currently focused tab
      const focusedTab = document.activeElement;
      const tabId = Object.keys(tabRefs.value).find(
        (key) => tabRefs.value[key] === focusedTab,
      );
      if (tabId) {
        switchTab(tabId);
      }
      break;
  }
}

// FIXED: Focus the active tab when it changes
watch(activeTabId, (newTabId) => {
  nextTick(() => {
    if (tabRefs.value[newTabId]) {
      tabRefs.value[newTabId].focus();
    }
  });
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
  max-width: 900px;
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

/* Tabs styles */
.tabs {
  margin-top: 2rem;
}

.tabs__list {
  display: flex;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.tabs__tab {
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 500;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tabs__tab:hover {
  color: #1d4ed8;
}

.tabs__tab:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: -2px;
}

.tabs__tab--active {
  color: #1d4ed8;
  border-bottom-color: #1d4ed8;
}

.tabs__panels {
  min-height: 200px;
}

.tabs__panel {
  display: none;
}

.tabs__panel--active {
  display: block;
}

.tabs__panel:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

/* Table styles */
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
  font-weight: 600;
  color: #1a1a1a;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

tr:last-child td {
  border-bottom: none;
}

/* Review styles */
.review {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.review__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.review__author {
  font-weight: 600;
}

.review__rating {
  color: #f59e0b;
}

.review__text {
  margin: 0;
  color: #4a5568;
}
</style>
