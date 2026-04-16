<!-- vue/Component.vue -->
<!-- Pattern: Complex Images / Charts — Alt Text -->
<!-- Vue 3 port of the fixed (after/) version. Uses <script setup>. No TypeScript. -->
<!--
  Usage:
    import ComplexImagesCharts from './Component.vue'
    <ComplexImagesCharts />
-->

<template>
  <main class="page">
    <h1 class="page-title">Analytics Dashboard</h1>

    <!-- Chart 1: Technique 1 — visible figcaption as long description -->
    <section class="chart-section">
      <h2 class="section-heading">Quarterly Revenue by Product Category</h2>
      <figure class="chart-figure">
        <!--
          Layer 1: brief alt — topic + headline trend
          Layer 2: aria-describedby → figcaption with full data values
        -->
        <img
          :src="revenueChartSrc"
          alt="Bar chart: quarterly revenue grew each quarter in 2023, from $4.3M in Q1 to $6.1M in Q4"
          aria-describedby="revenue-chart-desc"
          class="chart-img"
          id="revenue-chart"
        />
        <figcaption class="chart-desc" id="revenue-chart-desc">
          Total quarterly revenue increased steadily throughout 2023:
          Q1 $4.3M, Q2 $4.6M (+7%), Q3 $5.4M (+17%), Q4 $6.1M (+13%).
          Full-year revenue was $20.4M, up 42% compared to $14.3M in 2022.
          The strongest growth occurred between Q2 and Q3, driven by new enterprise contracts.
        </figcaption>
      </figure>
    </section>

    <!-- Chart 2: Technique 2 — <details> data table as long description -->
    <section class="chart-section">
      <h2 class="section-heading">Monthly Active Users — H1 2023</h2>
      <figure class="chart-figure">
        <img
          :src="engagementChartSrc"
          alt="Line chart: monthly active users grew 83% in H1 2023, from 12,000 in January to 22,000 in June"
          aria-describedby="engagement-chart-desc"
          class="chart-img"
          id="engagement-chart"
        />
        <details class="chart-details" id="engagement-chart-desc">
          <summary>View monthly active users data as table</summary>
          <div class="data-table-wrap">
            <table class="data-table">
              <caption class="sr-only">Monthly active users, H1 2023</caption>
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Active Users</th>
                  <th scope="col">Month-over-Month Change</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in engagementData" :key="row.month">
                  <td>{{ row.month }}</td>
                  <td>{{ row.users }}</td>
                  <td>{{ row.change }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </figure>
    </section>
  </main>
</template>

<script setup>
const revenueChartSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='380'%3E%3Crect width='600' height='380' fill='white'/%3E%3Ctext x='300' y='30' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='bold' fill='%231a1a1a'%3EQuarterly Revenue 2023 ($M)%3C/text%3E%3Cline x1='70' y1='50' x2='70' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Cline x1='70' y1='330' x2='570' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Crect x='90' y='151' width='80' height='179' fill='%231d4ed8'/%3E%3Crect x='210' y='138' width='80' height='192' fill='%231d4ed8'/%3E%3Crect x='330' y='104' width='80' height='226' fill='%231d4ed8'/%3E%3Crect x='450' y='73' width='80' height='257' fill='%231d4ed8'/%3E%3Ctext x='130' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ1%3C/text%3E%3Ctext x='250' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ2%3C/text%3E%3Ctext x='370' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ3%3C/text%3E%3Ctext x='490' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ4%3C/text%3E%3Ctext x='130' y='146' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E4.3%3C/text%3E%3Ctext x='250' y='133' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E4.6%3C/text%3E%3Ctext x='370' y='99' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E5.4%3C/text%3E%3Ctext x='490' y='68' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E6.1%3C/text%3E%3C/svg%3E";

const engagementChartSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='380'%3E%3Crect width='600' height='380' fill='white'/%3E%3Ctext x='300' y='30' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='bold' fill='%231a1a1a'%3EMonthly Active Users (thousands)%3C/text%3E%3Cline x1='70' y1='50' x2='70' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Cline x1='70' y1='330' x2='570' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Cpath d='M80,216 L168,197 L256,207 L344,177 L432,148 L520,119' fill='none' stroke='%231d4ed8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='80' cy='216' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='168' cy='197' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='256' cy='207' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='344' cy='177' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='432' cy='148' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='520' cy='119' r='5' fill='%231d4ed8'/%3E%3Ctext x='80' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EJan%3C/text%3E%3Ctext x='168' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EFeb%3C/text%3E%3Ctext x='256' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EMar%3C/text%3E%3Ctext x='344' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EApr%3C/text%3E%3Ctext x='432' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EMay%3C/text%3E%3Ctext x='520' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EJun%3C/text%3E%3C/svg%3E";

const engagementData = [
  { month: 'January',  users: '12,000', change: '—'    },
  { month: 'February', users: '14,000', change: '+17%' },
  { month: 'March',    users: '13,000', change: '−7%'  },
  { month: 'April',    users: '16,000', change: '+23%' },
  { month: 'May',      users: '19,000', change: '+19%' },
  { month: 'June',     users: '22,000', change: '+16%' },
];
</script>

<style scoped>
.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  color: #1a1a1a;
  background: #f8fafc;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.chart-section { margin-bottom: 3rem; }

.section-heading {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.chart-figure { margin: 0; }

.chart-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.chart-desc {
  margin-top: 1rem;
  font-size: 0.9375rem;
  color: #4a5568;
  line-height: 1.7;
}

.chart-details {
  margin-top: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.chart-details summary {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1d4ed8;
  cursor: pointer;
  background: #f8fafc;
  list-style: none;
  user-select: none;
}

.chart-details summary::-webkit-details-marker { display: none; }
.chart-details summary::before { content: "▶ "; font-size: 0.75em; }
.chart-details[open] summary::before { content: "▼ "; }
.chart-details summary:hover { background: #f1f5f9; }

.data-table-wrap { padding: 1rem; overflow-x: auto; }

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th,
.data-table td {
  padding: 0.5rem 0.75rem;
  text-align: right;
  border-bottom: 1px solid #f1f5f9;
}

.data-table th:first-child,
.data-table td:first-child { text-align: left; }

.data-table th {
  font-weight: 600;
  color: #1a1a1a;
  background: #f8fafc;
}

.data-table td { color: #374151; }
.data-table tr:last-child td { border-bottom: none; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}
</style>
