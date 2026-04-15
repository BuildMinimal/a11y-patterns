<!-- vue/Component.vue -->
<!-- Pattern: Dropdown Menu Focus — Focus Management -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import DropdownMenu from './Component.vue'
    <DropdownMenu />
-->

<template>
  <div class="page">
    <main class="main">
      <h1 class="h1">Dropdown Menu Focus — Vue</h1>
      <p class="p">
        This version demonstrates a dropdown menu with proper keyboard
        navigation in Vue.
      </p>

      <div class="content">
        <h2 class="h2">User Menu</h2>
        <p class="p">
          Click the button below or press Enter/Space to open the user menu.
        </p>

        <!-- FIXED: Complete keyboard navigation implementation -->
        <div class="dropdown">
          <button
            ref="triggerRef"
            class="dropdown__trigger"
            @click="toggleDropdown"
            @keydown="handleTriggerKeyDown"
            aria-haspopup="menu"
            :aria-expanded="isOpen"
          >
            <span>Account</span>
            <svg
              ref="iconRef"
              class="dropdown__icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
            >
              <path d="M8 11L3 6h10l-5 5z" />
            </svg>
          </button>

          <Transition name="dropdown">
            <div
              v-if="isOpen"
              ref="menuRef"
              class="dropdown__menu"
              role="menu"
              aria-labelledby="dropdown-trigger"
              @keydown="handleMenuKeyDown"
            >
              <a
                v-for="(item, index) in menuItems"
                :key="index"
                v-if="!item.separator"
                :href="item.href"
                class="dropdown__item"
                :class="{ 'dropdown__item--danger': item.danger }"
                role="menuitem"
                tabindex="-1"
                @click="handleItemClick"
              >
                {{ item.label }}
              </a>
              <hr
                v-else
                class="dropdown__separator"
                role="separator"
                aria-orientation="horizontal"
              />
            </div>
          </Transition>
        </div>

        <div class="other-content">
          <h3 class="h3">Other Page Content</h3>
          <p class="p">
            This content is here to demonstrate that focus is trapped within the
            dropdown when it's open.
          </p>
          <a href="#" class="link">Another link</a>
          <button class="btn">Another button</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const focusedIndex = ref(-1);
const triggerRef = ref(null);
const menuRef = ref(null);
const iconRef = ref(null);

const menuItems = [
  { label: "Profile", href: "#profile" },
  { label: "Settings", href: "#settings" },
  { label: "Notifications", href: "#notifications" },
  { separator: true },
  { label: "Sign out", href: "#logout", danger: true },
];

// FIXED: Get all focusable menu items (excluding separators)
function getFocusableItems() {
  if (!menuRef.value) return [];
  return Array.from(menuRef.value.querySelectorAll('[role="menuitem"]'));
}

// FIXED: Open dropdown with proper focus management
function openDropdown() {
  isOpen.value = true;
  focusedIndex.value = 0;

  // Move focus to the first menu item
  nextTick(() => {
    const focusableItems = getFocusableItems();
    if (focusableItems.length > 0) {
      focusableItems[0].focus();
    }
  });
}

// FIXED: Close dropdown with focus restoration
function closeDropdown() {
  isOpen.value = false;
  focusedIndex.value = -1;

  // Return focus to the trigger button
  nextTick(() => {
    triggerRef.value?.focus();
  });
}

function toggleDropdown() {
  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

// FIXED: Handle keyboard navigation within the dropdown
function handleMenuKeyDown(event) {
  const focusableItems = getFocusableItems();

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      // Move to next item, wrap to first if at end
      focusedIndex.value = (focusedIndex.value + 1) % focusableItems.length;
      break;

    case "ArrowUp":
      event.preventDefault();
      // Move to previous item, wrap to last if at start
      focusedIndex.value =
        (focusedIndex.value - 1 + focusableItems.length) %
        focusableItems.length;
      break;

    case "Home":
      event.preventDefault();
      // Jump to first item
      focusedIndex.value = 0;
      break;

    case "End":
      event.preventDefault();
      // Jump to last item
      focusedIndex.value = focusableItems.length - 1;
      break;

    case "Enter":
    case " ":
      event.preventDefault();
      // Activate the currently focused item
      if (focusedIndex.value >= 0 && focusableItems[focusedIndex.value]) {
        focusableItems[focusedIndex.value].click();
      }
      break;

    case "Escape":
      event.preventDefault();
      // Close the dropdown
      closeDropdown();
      break;

    case "Tab":
      // FIXED: Close the dropdown when Tab is pressed
      event.preventDefault();
      closeDropdown();
      break;
  }
}

// FIXED: Handle trigger button keyboard events
function handleTriggerKeyDown(event) {
  switch (event.key) {
    case "ArrowDown":
    case "ArrowUp":
    case "Enter":
    case " ":
      event.preventDefault();
      if (isOpen.value) {
        // If already open, focus the menu
        const focusableItems = getFocusableItems();
        if (focusableItems.length > 0) {
          focusableItems[0].focus();
        }
      } else {
        openDropdown();
      }
      break;

    case "Escape":
      if (isOpen.value) {
        event.preventDefault();
        closeDropdown();
      }
      break;
  }
}

// FIXED: Handle click outside to close
function handleClickOutside(event) {
  if (
    triggerRef.value &&
    !triggerRef.value.contains(event.target) &&
    menuRef.value &&
    !menuRef.value.contains(event.target)
  ) {
    if (isOpen.value) {
      closeDropdown();
    }
  }
}

function handleItemClick() {
  closeDropdown();
}

// FIXED: Set focus to the currently focused item
watch(focusedIndex, (newIndex) => {
  if (isOpen.value && newIndex >= 0) {
    nextTick(() => {
      const focusableItems = getFocusableItems();
      if (focusableItems[newIndex]) {
        focusableItems[newIndex].focus();
      }
    });
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
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

.other-content {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
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
  background-color: #1d4ed8;
  color: #ffffff;
}

.btn:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.link {
  color: #1d4ed8;
  text-decoration: underline;
  margin-right: 1rem;
}

.link:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

/* Dropdown styles */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #1a1a1a;
  cursor: pointer;
}

.dropdown__trigger:focus {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.dropdown__icon {
  transition: transform 0.15s ease;
}

.dropdown__menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  min-width: 200px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.dropdown__item {
  display: block;
  padding: 0.625rem 1rem;
  color: #1a1a1a;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: #f3f4f6;
  outline: none;
}

.dropdown__item:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: -2px;
}

.dropdown__item--danger {
  color: #dc2626;
}

.dropdown__item--danger:hover,
.dropdown__item--danger:focus {
  background-color: #fef2f2;
}

.dropdown__separator {
  margin: 0.25rem 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
