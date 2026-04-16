// react/Component.jsx
// Pattern: Informative Images — Alt Text
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import InformativeImages from './Component';
//   <InformativeImages />
//
// Key accessibility rules demonstrated:
//   1. Informative images → meaningful alt text describing the content
//   2. Charts/graphs → alt text that conveys the data, not just the chart type
//   3. Instructional diagrams → alt text that conveys the procedure or steps

// SVG data URIs — same visuals as the HTML version, fully self-contained
const PRODUCT_PHOTO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23f8f9fa'/%3E%3Cpath d='M300 210 Q400 80 500 210' fill='none' stroke='%231a1a1a' stroke-width='20' stroke-linecap='round'/%3E%3Crect x='270' y='200' width='60' height='80' rx='20' fill='%231a1a1a'/%3E%3Crect x='470' y='200' width='60' height='80' rx='20' fill='%231a1a1a'/%3E%3Ctext x='400' y='360' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%234a5568'%3EProSound X1%3C/text%3E%3C/svg%3E";

const CHART_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='white'/%3E%3Ctext x='400' y='40' text-anchor='middle' font-family='sans-serif' font-size='20' font-weight='bold' fill='%231a1a1a'%3EBattery Life (Hours)%3C/text%3E%3Cline x1='100' y1='60' x2='100' y2='320' stroke='%234a5568' stroke-width='2'/%3E%3Cline x1='100' y1='320' x2='700' y2='320' stroke='%234a5568' stroke-width='2'/%3E%3Crect x='180' y='128' width='120' height='192' fill='%231d4ed8'/%3E%3Ctext x='240' y='118' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%231a1a1a'%3E40h%3C/text%3E%3Ctext x='240' y='350' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%234a5568'%3EProSound X1%3C/text%3E%3Crect x='340' y='176' width='120' height='144' fill='%236b7280'/%3E%3Ctext x='400' y='166' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%231a1a1a'%3E30h%3C/text%3E%3Ctext x='400' y='350' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%234a5568'%3EBrand A%3C/text%3E%3Crect x='500' y='214' width='120' height='106' fill='%236b7280'/%3E%3Ctext x='560' y='204' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%231a1a1a'%3E22h%3C/text%3E%3Ctext x='560' y='350' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%234a5568'%3EBrand B%3C/text%3E%3C/svg%3E";

const DIAGRAM_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='280'%3E%3Crect width='800' height='280' fill='%23f8f9fa'/%3E%3Ctext x='400' y='40' text-anchor='middle' font-family='sans-serif' font-size='20' font-weight='bold' fill='%231a1a1a'%3EBluetooth Pairing Guide%3C/text%3E%3Crect x='60' y='65' width='190' height='160' rx='12' fill='white' stroke='%23e2e8f0' stroke-width='2'/%3E%3Ccircle cx='155' cy='120' r='30' fill='%231d4ed8'/%3E%3Ctext x='155' y='128' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3E1%3C/text%3E%3Ctext x='155' y='180' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%231a1a1a'%3EHold power 3s%3C/text%3E%3Crect x='305' y='65' width='190' height='160' rx='12' fill='white' stroke='%23e2e8f0' stroke-width='2'/%3E%3Ccircle cx='400' cy='120' r='30' fill='%231d4ed8'/%3E%3Ctext x='400' y='128' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3E2%3C/text%3E%3Ctext x='400' y='180' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%231a1a1a'%3ESelect device%3C/text%3E%3Crect x='550' y='65' width='190' height='160' rx='12' fill='white' stroke='%23e2e8f0' stroke-width='2'/%3E%3Ccircle cx='645' cy='120' r='30' fill='%2316a34a'/%3E%3Ctext x='645' y='128' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='white'%3E3%3C/text%3E%3Ctext x='645' y='180' text-anchor='middle' font-family='sans-serif' font-size='13' fill='%231a1a1a'%3EConfirm pairing%3C/text%3E%3C/svg%3E";

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    lineHeight: '1.6',
    color: '#1a1a1a',
    background: '#ffffff',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  meta: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '2rem',
  },
  productHero: {
    margin: '2rem 0',
  },
  productPhoto: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  reviewBody: {
    fontSize: '1rem',
    lineHeight: '1.75',
    color: '#1a1a1a',
  },
  p: {
    marginBottom: '1.25rem',
  },
  section: {
    margin: '2.5rem 0',
  },
  sectionHeading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '1rem',
  },
  chartImg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  diagramImg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
};

export default function InformativeImages() {
  return (
    <main style={styles.page}>
      <h1 style={styles.title}>ProSound X1 Headphones: Full Review</h1>
      <p style={styles.meta}>By Alex Morgan · April 16, 2026 · Hardware</p>

      {/*
        FIXED: Informative product photo.
        Alt text describes the physical appearance — what the image conveys visually.
        Rule: if removing this image would lose information, it is informative.
        Write alt text that conveys the same content the image conveys.
      */}
      <div style={styles.productHero}>
        <img
          src={PRODUCT_PHOTO_SRC}
          alt="ProSound X1 over-ear headphones in midnight black with padded ear cups and adjustable headband"
          style={styles.productPhoto}
        />
      </div>

      <div style={styles.reviewBody}>
        <p style={styles.p}>
          The ProSound X1 is an over-ear wireless headphone with 40-hour battery
          life, active noise cancellation, and memory-foam ear cushions. At $149
          it sits in the sweet spot between budget and premium.
        </p>
        <p style={styles.p}>
          Build quality is excellent. The midnight-black finish resists smudges
          and the stainless headband adjusts smoothly across head sizes.
        </p>
      </div>

      {/*
        FIXED: Informative chart.
        The alt text conveys the actual data the chart represents.
        "A bar chart" is NOT sufficient — it tells the user the form, not the content.
        The alt must include the numbers so the data is accessible without the visual.
      */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Battery Life Comparison</h2>
        <img
          src={CHART_SRC}
          alt="Bar chart comparing wireless headphone battery life: ProSound X1 leads at 40 hours, Brand A at 30 hours, Brand B at 22 hours"
          style={styles.chartImg}
        />
      </section>

      <div style={styles.reviewBody}>
        <p style={styles.p}>
          The 40-hour battery is class-leading at this price point. Competitors
          typically offer 22–30 hours. Charging takes 90 minutes via USB-C.
        </p>
      </div>

      {/*
        FIXED: Informative diagram.
        The alt text summarises all three steps so a screen reader user can
        follow the procedure without seeing the visual diagram.
        Rule: alt text for instructional diagrams must convey the procedure,
        not just name the diagram.
      */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>How to Pair via Bluetooth</h2>
        <img
          src={DIAGRAM_SRC}
          alt="Three-step Bluetooth pairing guide: Step 1 hold the power button for 3 seconds, Step 2 select ProSound X1 from your device list, Step 3 confirm the pairing on your device"
          style={styles.diagramImg}
        />
      </section>

      <div style={styles.reviewBody}>
        <p style={styles.p}>
          Pairing is fast and reliable. The headphones remembered up to eight
          previously connected devices and switched between them seamlessly.
        </p>
      </div>
    </main>
  );
}
