<template>
  <div class="page">
    <h1 class="page-title">Featured Articles</h1>

    <!-- FIX: Live region for manual navigation announcements -->
    <p class="sr-only" aria-live="polite" aria-atomic="true">{{ statusMsg }}</p>

    <!-- FIX: <section> with aria-label + aria-roledescription="carousel" -->
    <section
      class="carousel"
      aria-label="Featured articles"
      aria-roledescription="carousel"
      @focusin="stopAutoAdvance"
      @focusout="handleFocusOut"
      @mouseenter="stopAutoAdvance"
      @mouseleave="startAutoAdvance"
    >
      <div class="carousel-track">
        <!-- FIX: role="group" + aria-roledescription="slide" + aria-label="N of 4" -->
        <div
          v-for="(slide, i) in slides"
          :key="slide.title"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${i + 1} of ${slides.length}`"
          :aria-hidden="i !== current ? 'true' : 'false'"
          class="carousel-slide"
          :class="{ active: i === current }"
        >
          <span class="slide-category" :class="`slide-category--${slide.categoryClass}`">
            {{ slide.category }}
          </span>
          <h2 class="slide-title">{{ slide.title }}</h2>
          <p class="slide-excerpt">{{ slide.excerpt }}</p>
        </div>
      </div>

      <div class="carousel-controls">
        <!-- FIX: Pause button first so keyboard users can stop auto-advance immediately -->
        <button
          class="carousel-pause"
          :aria-label="isPlaying ? 'Pause slideshow' : 'Play slideshow'"
          @click="isPlaying ? stopAutoAdvance() : startAutoAdvance()"
        >
          <span aria-hidden="true">{{ isPlaying ? '⏸' : '▶' }}</span>
        </button>
        <button class="carousel-btn" aria-label="Previous slide" @click="prev">
          <span aria-hidden="true">‹</span>
        </button>
        <div class="carousel-dots" aria-hidden="true">
          <div v-for="(_, i) in slides" :key="i" class="dot" :class="{ active: i === current }" />
        </div>
        <button class="carousel-btn" aria-label="Next slide" @click="next">
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = [
  { category: 'Accessibility', categoryClass: 'blue',   title: 'Building Accessible Forms',       excerpt: 'Labels, errors, and input modes — the complete checklist for form accessibility.' },
  { category: 'Performance',   categoryClass: 'green',  title: 'Core Web Vitals: A Practical Guide', excerpt: 'LCP, CLS, INP — what they measure and the ten changes that move the needle most.' },
  { category: 'CSS',           categoryClass: 'yellow', title: 'CSS Grid for Complex Layouts',    excerpt: 'Two-dimensional control without a framework. Grid makes complex layouts trivial.' },
  { category: 'TypeScript',    categoryClass: 'purple', title: 'TypeScript Generics Explained',   excerpt: "Generics make TypeScript genuinely powerful. Here's how to read, write, and constrain them." },
];

const current   = ref(0);
const isPlaying = ref(false);
const statusMsg = ref('');
let intervalId  = null;

function goTo(index, announce = false) {
  current.value = index;
  if (announce) statusMsg.value = `Slide ${index + 1} of ${slides.length}`;
}

function next(announce = false) { goTo((current.value + 1) % slides.length, announce); }
function prev(announce = false) { goTo((current.value - 1 + slides.length) % slides.length, announce); }

function startAutoAdvance() {
  if (intervalId) return;
  intervalId = setInterval(() => next(false), 3000);
  isPlaying.value = true;
}

function stopAutoAdvance() {
  clearInterval(intervalId);
  intervalId = null;
  isPlaying.value = false;
}

function handleFocusOut(e) {
  const carousel = e.currentTarget;
  if (!carousel.contains(e.relatedTarget)) startAutoAdvance();
}

onMounted(startAutoAdvance);
onUnmounted(stopAutoAdvance);
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.page { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1a1a1a; padding: 2rem; }
.page-title { font-size: 1.75rem; font-weight: 700; max-width: 700px; margin: 0 auto 1.5rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.carousel { max-width: 700px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
.carousel-slide { display: none; padding: 2rem; }
.carousel-slide.active { display: block; }

.slide-category { display: inline-block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.25rem 0.625rem; border-radius: 4px; margin-bottom: 0.875rem; }
.slide-category--blue   { color: #1e40af; background: #dbeafe; }
.slide-category--green  { color: #166534; background: #dcfce7; }
.slide-category--yellow { color: #854d0e; background: #fef9c3; }
.slide-category--purple { color: #6b21a8; background: #f3e8ff; }

.slide-title { font-size: 1.375rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.625rem; }
.slide-excerpt { font-size: 0.9375rem; line-height: 1.7; color: #374151; }

.carousel-controls { display: flex; align-items: center; justify-content: space-between; padding: 0.875rem 1.25rem; border-top: 1px solid #e5e7eb; }

.carousel-btn, .carousel-pause {
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  background: #f3f4f6; border: 1px solid transparent; border-radius: 50%;
  font-size: 1.25rem; color: #374151; cursor: pointer;
}
.carousel-btn:hover, .carousel-pause:hover { background: #e5e7eb; }
.carousel-btn:focus-visible, .carousel-pause:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }

.carousel-dots { display: flex; gap: 0.5rem; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #d1d5db; }
.dot.active { background: #2563eb; }
</style>
