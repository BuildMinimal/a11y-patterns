// react/Component.jsx
// Pattern: SVG Icons — Alt Text
// React port of the fixed (after/) version. Plain JSX — no TypeScript.
//
// Usage:
//   import SvgIcons from './Component';
//   <SvgIcons />
//
// Two SVG icon strategies demonstrated:
//   Strategy 1 — Informative standalone SVG:  role="img" + aria-label + <title>
//   Strategy 2 — Decorative SVG inside labelled element: aria-hidden="true" + focusable="false"

// ── Inline SVG components ──────────────────────────────────────────────────

// Informative severity icons — each used as standalone visual content
function ErrorIcon() {
  return (
    <svg
      role="img"
      aria-label="Error"
      className="severity-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20" height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <title>Error</title>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      role="img"
      aria-label="Warning"
      className="severity-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20" height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Warning</title>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      role="img"
      aria-label="Informational"
      className="severity-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20" height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <title>Informational</title>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}

// Decorative icons — used inside labelled controls, hidden from AT
function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16" height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16" height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16" height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

// ── Alert data ─────────────────────────────────────────────────────────────

const ALERTS = [
  {
    type: 'error',
    SeverityIcon: ErrorIcon,
    message: 'Critical: Database connection failed on primary server.',
    dismissLabel: 'Dismiss critical alert',
  },
  {
    type: 'warning',
    SeverityIcon: WarningIcon,
    message: 'Warning: Disk usage on server-02 is above 80%.',
    dismissLabel: 'Dismiss warning alert',
  },
  {
    type: 'info',
    SeverityIcon: InfoIcon,
    message: 'Informational: Scheduled maintenance window starts at 02:00 UTC.',
    dismissLabel: 'Dismiss informational alert',
  },
];

// ── Component ──────────────────────────────────────────────────────────────

export default function SvgIcons() {
  return (
    <main className="page">
      <h1 className="page-title">System Alerts</h1>

      <div className="alert-list">
        {ALERTS.map(({ type, SeverityIcon, message, dismissLabel }) => (
          <div key={type} className={`alert-row alert-row--${type}`}>
            <span className="alert-badge">
              {/*
                Strategy 1: Informative SVG
                The icon IS the content — it conveys the alert severity.
                role="img" + aria-label + <title> make it accessible.
              */}
              <SeverityIcon />
            </span>

            <p className="alert-message">
              <strong>{message.split(':')[0]}:</strong>
              {message.substring(message.indexOf(':') + 1)}
            </p>

            {/*
              Strategy 2: Decorative SVG inside labelled button
              aria-label on the <button> is the accessible name.
              aria-hidden on the SVG prevents AT from reading SVG internals.
            */}
            <button
              type="button"
              className={`btn-dismiss btn-dismiss--${type}`}
              aria-label={dismissLabel}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>

      {/* Text + decorative SVG buttons — aria-hidden suppresses SVG noise */}
      <div className="action-bar">
        <button type="button" className="btn-action">
          <DownloadIcon />
          Download Report
        </button>
        <button type="button" className="btn-action">
          <ShareIcon />
          Share
        </button>
      </div>
    </main>
  );
}
