// react/Component.jsx
// Pattern: Complex Images / Charts — Alt Text
// React port of the fixed (after/) version. Plain JSX — no TypeScript.
//
// Usage:
//   import ComplexImagesCharts from './Component';
//   <ComplexImagesCharts />
//
// Two-layer accessible text for complex images:
//   Layer 1 — brief alt:  topic + headline finding (what the chart is about)
//   Layer 2 — long desc:  full data via aria-describedby (what the chart shows)
//
// Two long description techniques demonstrated:
//   Technique 1 — visible <figcaption> (revenue chart)
//   Technique 2 — <details> with a data table (engagement chart)

const REVENUE_CHART_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='380'%3E%3Crect width='600' height='380' fill='white'/%3E%3Ctext x='300' y='30' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='bold' fill='%231a1a1a'%3EQuarterly Revenue 2023 ($M)%3C/text%3E%3Cline x1='70' y1='50' x2='70' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Cline x1='70' y1='330' x2='570' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Crect x='90' y='151' width='80' height='179' fill='%231d4ed8'/%3E%3Crect x='210' y='138' width='80' height='192' fill='%231d4ed8'/%3E%3Crect x='330' y='104' width='80' height='226' fill='%231d4ed8'/%3E%3Crect x='450' y='73' width='80' height='257' fill='%231d4ed8'/%3E%3Ctext x='130' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ1%3C/text%3E%3Ctext x='250' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ2%3C/text%3E%3Ctext x='370' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ3%3C/text%3E%3Ctext x='490' y='345' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%234a5568'%3EQ4%3C/text%3E%3Ctext x='130' y='146' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E4.3%3C/text%3E%3Ctext x='250' y='133' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E4.6%3C/text%3E%3Ctext x='370' y='99' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E5.4%3C/text%3E%3Ctext x='490' y='68' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%231a1a1a'%3E6.1%3C/text%3E%3C/svg%3E";

const ENGAGEMENT_CHART_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='380'%3E%3Crect width='600' height='380' fill='white'/%3E%3Ctext x='300' y='30' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='bold' fill='%231a1a1a'%3EMonthly Active Users (thousands)%3C/text%3E%3Cline x1='70' y1='50' x2='70' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Cline x1='70' y1='330' x2='570' y2='330' stroke='%234a5568' stroke-width='1.5'/%3E%3Cpath d='M80,216 L168,197 L256,207 L344,177 L432,148 L520,119' fill='none' stroke='%231d4ed8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='80' cy='216' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='168' cy='197' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='256' cy='207' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='344' cy='177' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='432' cy='148' r='5' fill='%231d4ed8'/%3E%3Ccircle cx='520' cy='119' r='5' fill='%231d4ed8'/%3E%3Ctext x='80' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EJan%3C/text%3E%3Ctext x='168' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EFeb%3C/text%3E%3Ctext x='256' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EMar%3C/text%3E%3Ctext x='344' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EApr%3C/text%3E%3Ctext x='432' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EMay%3C/text%3E%3Ctext x='520' y='345' text-anchor='middle' font-family='sans-serif' font-size='11' fill='%234a5568'%3EJun%3C/text%3E%3C/svg%3E";

const ENGAGEMENT_DATA = [
  { month: 'January',  users: '12,000', change: '—'    },
  { month: 'February', users: '14,000', change: '+17%' },
  { month: 'March',    users: '13,000', change: '−7%'  },
  { month: 'April',    users: '16,000', change: '+23%' },
  { month: 'May',      users: '19,000', change: '+19%' },
  { month: 'June',     users: '22,000', change: '+16%' },
];

export default function ComplexImagesCharts() {
  return (
    <main className="page">
      <h1 className="page-title">Analytics Dashboard</h1>

      {/* ── Chart 1: Technique 1 — visible figcaption ── */}
      <section className="chart-section">
        <h2 className="section-heading">Quarterly Revenue by Product Category</h2>
        <figure className="chart-figure">
          {/*
            Layer 1: brief alt — topic + direction
            Layer 2: aria-describedby → figcaption with full values
          */}
          <img
            src={REVENUE_CHART_SRC}
            alt="Bar chart: quarterly revenue grew each quarter in 2023, from $4.3M in Q1 to $6.1M in Q4"
            aria-describedby="revenue-chart-desc"
            className="chart-img"
            id="revenue-chart"
          />
          {/*
            Visible long description — benefits all users, not just AT users.
            Contains the actual data values the chart encodes.
          */}
          <figcaption className="chart-desc" id="revenue-chart-desc">
            Total quarterly revenue increased steadily throughout 2023:
            Q1 $4.3M, Q2 $4.6M (+7%), Q3 $5.4M (+17%), Q4 $6.1M (+13%).
            Full-year revenue was $20.4M, up 42% compared to $14.3M in 2022.
            The strongest growth occurred between Q2 and Q3, driven by new enterprise contracts.
          </figcaption>
        </figure>
      </section>

      {/* ── Chart 2: Technique 2 — <details> data table ── */}
      <section className="chart-section">
        <h2 className="section-heading">Monthly Active Users — H1 2023</h2>
        <figure className="chart-figure">
          <img
            src={ENGAGEMENT_CHART_SRC}
            alt="Line chart: monthly active users grew 83% in H1 2023, from 12,000 in January to 22,000 in June"
            aria-describedby="engagement-chart-desc"
            className="chart-img"
            id="engagement-chart"
          />
          {/*
            Collapsible data table — collapsed for sighted users by default,
            always accessible to AT (aria-describedby still works on collapsed <details>).
          */}
          <details className="chart-details" id="engagement-chart-desc">
            <summary>View monthly active users data as table</summary>
            <div className="data-table-wrap">
              <table className="data-table">
                <caption className="sr-only">Monthly active users, H1 2023</caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Active Users</th>
                    <th scope="col">Month-over-Month Change</th>
                  </tr>
                </thead>
                <tbody>
                  {ENGAGEMENT_DATA.map(({ month, users, change }) => (
                    <tr key={month}>
                      <td>{month}</td>
                      <td>{users}</td>
                      <td>{change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </figure>
      </section>
    </main>
  );
}
