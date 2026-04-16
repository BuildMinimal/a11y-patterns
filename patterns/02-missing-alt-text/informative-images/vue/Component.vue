<!-- vue/Component.vue -->
<!-- Pattern: Informative Images — Alt Text -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import InformativeImages from './Component.vue'
    <InformativeImages />
-->

<template>
  <main class="page">
    <h1 class="review-title">ProSound X1 Headphones: Full Review</h1>
    <p class="review-meta">By Alex Morgan · April 16, 2026 · Hardware</p>

    <!--
      FIXED: Informative product photo.
      Alt text conveys the physical appearance of the product — what a sighted
      user would see and take note of when evaluating the product.
    -->
    <div class="product-hero">
      <img
        :src="productPhotoSrc"
        alt="ProSound X1 over-ear headphones in midnight black with padded ear cups and adjustable headband"
        class="product-photo"
      />
    </div>

    <div class="review-body">
      <p>
        The ProSound X1 is an over-ear wireless headphone with 40-hour battery
        life, active noise cancellation, and memory-foam ear cushions. At $149
        it sits in the sweet spot between budget and premium.
      </p>
      <p>
        Build quality is excellent. The midnight-black finish resists smudges
        and the stainless headband adjusts smoothly across head sizes.
      </p>
    </div>

    <!--
      FIXED: Informative chart.
      The alt text includes the data values the chart visualises — not just
      the chart's title or type. "Battery life chart" is insufficient.
      Screen reader users need the numbers to understand the comparison.
    -->
    <section class="chart-section">
      <h2 class="section-heading">Battery Life Comparison</h2>
      <img
        :src="chartSrc"
        alt="Bar chart comparing wireless headphone battery life: ProSound X1 leads at 40 hours, Brand A at 30 hours, Brand B at 22 hours"
        class="chart-img"
      />
    </section>

    <div class="review-body">
      <p>
        The 40-hour battery is class-leading at this price point. Competitors
        typically offer 22–30 hours. Charging takes 90 minutes via USB-C.
      </p>
    </div>

    <!--
      FIXED: Informative diagram.
      Alt text describes all three steps in the procedure.
      Naming only the diagram type ("a pairing diagram") conveys form,
      not content — and content is what screen reader users need.
    -->
    <section class="diagram-section">
      <h2 class="section-heading">How to Pair via Bluetooth</h2>
      <img
        :src="diagramSrc"
        alt="Three-step Bluetooth pairing guide: Step 1 hold the power button for 3 seconds, Step 2 select ProSound X1 from your device list, Step 3 confirm the pairing on your device"
        class="diagram-img"
      />
    </section>

    <div class="review-body">
      <p>
        Pairing is fast and reliable. The headphones remembered up to eight
        previously connected devices and switched between them seamlessly.
      </p>
    </div>
  </main>
</template>

<script setup>
// SVG data URIs — identical visuals to the HTML version, fully self-contained
const productPhotoSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23f8f9fa'/%3E%3Cpath d='M300 210 Q400 80 500 210' fill='none' stroke='%231a1a1a' stroke-width='20' stroke-linecap='round'/%3E%3Crect x='270' y='200' width='60' height='80' rx='20' fill='%231a1a1a'/%3E%3Crect x='470' y='200' width='60' height='80' rx='20' fill='%231a1a1a'/%3E%3Ctext x='400' y='360' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%234a5568'%3EProSound X1%3C/text%3E%3C/svg%3E";

const chartSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='white'/%3E%3Ctext x='400' y='40' text-anchor='middle' font-family='sans-serif' font-size='20' font-weight='bold' fill='%231a1a1a'%3EBattery Life (Hours)%3C/text%3E%3Cline x1='100' y1='60' x2='100' y2='320' stroke='%234a5568' stroke-width='2'/%3E%3Cline x1='100' y1='320' x2='700' y2='320' stroke='%234a5568' stroke-width='2'/%3E%3Crect x='180' y='128' width='120' height='192' fill='%231d4ed8'/%3E%3Ctext x='240' y='118' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%231a1a1a'%3E40h%3C/text%3E%3Ctext x='240' y='350' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%234a5568'%3EProSound X1%3C/text%3E%3Crect x='340' y='176' width='120' height='144' fill='%236b7280'/%3E%3Ctext x='400' y='166' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%231a1a1a'%3E30h%3C/text%3E%3Ctext x='400' y='350' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%234a5568'%3EBrand A%3C/text%3E%3Crect x='500' y='214' width='120' height='106' fill='%236b7280'/%3E%3Ctext x='560' y='204' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%231a1a1a'%3E22h%3C/text%3E%3Ctext x='560' y='350' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%234a5568'%3EBrand B%3C/text%3E%3C/svg%3E";

const diagramSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='280'%3E%3Crect width='800' height='280' fill='%23f8f9fa'/%3E%3Ctext x='400' y='40' text-anchor='middle' font-family='sans-serif' font-size='20' font-weight='bold' fill='%231a1a1a'%3EBluetooth Pairing Guide%3C/text%3E%3Crect x='60' y='65' width='190' height='160' rx='12' fill='white' stroke='%23e2e8f0' stroke-width='2'/%3E%3Ccircle cx='155' cy='120' r='30' fill='%231d4ed8'/%3E%3Ctext x='155' y='128' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3E1%3C/text%3E%3Ctext x='155' y='180' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%231a1a1a'%3EHold power 3s%3C/text%3E%3Crect x='305' y='65' width='190' height='160' rx='12' fill='white' stroke='%23e2e8f0' stroke-width='2'/%3E%3Ccircle cx='400' cy='120' r='30' fill='%231d4ed8'/%3E%3Ctext x='400' y='128' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3E2%3C/text%3E%3Ctext x='400' y='180' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%231a1a1a'%3ESelect device%3C/text%3E%3Crect x='550' y='65' width='190' height='160' rx='12' fill='white' stroke='%23e2e8f0' stroke-width='2'/%3E%3Ccircle cx='645' cy='120' r='30' fill='%2316a34a'/%3E%3Ctext x='645' y='128' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3E3%3C/text%3E%3Ctext x='645' y='180' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%231a1a1a'%3EConfirm pairing%3C/text%3E%3C/svg%3E";
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
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

.review-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.review-meta {
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.product-hero {
  margin: 2rem 0;
}

.product-photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.review-body {
  font-size: 1rem;
  line-height: 1.75;
  color: #1a1a1a;
}

.review-body p {
  margin-bottom: 1.25rem;
}

.chart-section,
.diagram-section {
  margin: 2.5rem 0;
}

.section-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.chart-img,
.diagram-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
