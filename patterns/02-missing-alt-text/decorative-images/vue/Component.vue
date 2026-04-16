<!-- vue/Component.vue -->
<!-- Pattern: Decorative Images — Alt Text -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import DecorativeImages from './Component.vue'
    <DecorativeImages />
-->

<template>
  <div class="page">
    <!--
      FIXED: Decorative hero banner
      - alt=""              → image is removed from the accessibility tree
      - role="presentation" → belt-and-suspenders for older assistive technology
      The banner is purely visual — no content is lost if it is invisible or absent.
    -->
    <div class="hero">
      <img
        :src="bannerSrc"
        alt=""
        role="presentation"
        class="hero__banner"
      />
    </div>

    <article class="article">
      <header>
        <h1 class="article__title">Building Accessible Web Applications</h1>
        <p class="article__meta">Published April 16, 2026 · 8 min read</p>
      </header>

      <div class="article__body">
        <p>
          Accessibility is not a feature — it is a fundamental quality of
          well-engineered software. When we build applications that work for
          everyone, we build better applications for all users.
        </p>

        <p>
          The first step is understanding which users are affected and how
          specific failures manifest. Low-contrast text, missing form labels,
          and absent image alt text each produce distinct barriers for
          distinct user groups.
        </p>

        <!--
          Informative image: alt text describes what the image shows.
          If removing this image would cause a sighted user to lose information,
          it is informative — provide alt text that conveys the same content.
        -->
        <div class="article__photo-wrap">
          <img
            :src="articlePhotoSrc"
            alt="A developer reviewing an accessibility audit report showing WCAG violations"
            class="article__photo"
          />
          <p class="article__photo-caption">
            Accessibility audits should be part of every release cycle.
          </p>
        </div>

        <p>
          Understanding WCAG success criteria gives developers a precise
          vocabulary for describing and fixing accessibility failures.
        </p>
      </div>

      <!--
        FIXED: Decorative section divider
        alt="" alone is sufficient for a plain <img> element.
        The wave SVG adds visual rhythm — it conveys no information.
      -->
      <img :src="dividerSrc" alt="" class="section-divider" />

      <div class="article__body">
        <p>
          Not all images require descriptive alt text. Decorative images —
          those that add visual interest but convey no information — should be
          hidden from assistive technology entirely using
          <code>alt=""</code>.
        </p>
      </div>

      <!-- FIXED: Decorative end ornament — alt="" removes it from the a11y tree -->
      <div class="ornament-wrap">
        <img :src="ornamentSrc" alt="" class="ornament" />
      </div>
    </article>
  </div>
</template>

<script setup>
// SVG data URIs — identical visuals to the HTML version, fully self-contained
const bannerSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='200'%3E%3Crect width='1200' height='200' fill='%231d4ed8'/%3E%3Ccircle cx='200' cy='100' r='70' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle cx='1000' cy='80' r='90' fill='rgba(255,255,255,0.06)'/%3E%3C/svg%3E";

const dividerSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 48'%3E%3Cpath d='M0 24 C200 0,400 48,600 24 S1000 0,1200 24 L1200 48 L0 48Z' fill='%23e0e7ff'/%3E%3C/svg%3E";

const ornamentSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='22' fill='none' stroke='%23dbeafe' stroke-width='3'/%3E%3Ccircle cx='24' cy='24' r='14' fill='none' stroke='%23bfdbfe' stroke-width='2'/%3E%3Ccircle cx='24' cy='24' r='5' fill='%23dbeafe'/%3E%3C/svg%3E";

const articlePhotoSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='360'%3E%3Crect width='800' height='360' fill='%23f3f4f6'/%3E%3Crect x='60' y='60' width='680' height='240' rx='8' fill='%23e2e8f0'/%3E%3Crect x='80' y='80' width='200' height='16' rx='4' fill='%234a5568'/%3E%3Crect x='80' y='108' width='560' height='8' rx='4' fill='%236b7280'/%3E%3Crect x='80' y='124' width='480' height='8' rx='4' fill='%236b7280'/%3E%3C/svg%3E";
</script>

<style scoped>
.page {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  background: #ffffff;
}

.hero {
  overflow: hidden;
}

.hero__banner {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article {
  max-width: 780px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.article__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem;
}

.article__meta {
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.article__body {
  font-size: 1rem;
  line-height: 1.75;
  color: #1a1a1a;
}

.article__body p {
  margin: 0 0 1.5rem;
}

.article__photo-wrap {
  margin: 2rem 0;
}

.article__photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.article__photo-caption {
  font-size: 0.875rem;
  color: #4a5568;
  margin-top: 0.5rem;
  font-style: italic;
}

.section-divider {
  display: block;
  width: 100%;
  height: auto;
  margin: 2rem 0;
}

.ornament-wrap {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.ornament {
  display: block;
  width: 48px;
  height: 48px;
}

:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
