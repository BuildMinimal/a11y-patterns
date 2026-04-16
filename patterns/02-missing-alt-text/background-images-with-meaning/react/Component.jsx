// react/Component.jsx
// Pattern: Background Images with Meaning — Alt Text
// React port of the fixed (after/) version. Plain JSX — no TypeScript, no styling framework.
//
// Usage:
//   import BackgroundImagesWithMeaning from './Component';
//   <BackgroundImagesWithMeaning />
//
// Key accessibility rules demonstrated:
//   1. CSS background-image has no alt attribute — provide accessible names via:
//      a. aria-label on the button (Technique A)
//      b. Visually-hidden <span> inside the button (Technique B)
//   2. axe fires button-name when a button has no accessible name
//   3. Both techniques produce identical screen reader output

// CSS background images live in the stylesheet — they cannot carry alt text.
// The SVG data URIs below are in styles.css, not here. This component uses
// className references to apply them.

// Visually hidden helper — replicates the .sr-only CSS class for the sr-only technique
const srOnlyStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

// Formatting buttons use Technique A: aria-label
const FORMATTING_BUTTONS = [
  { className: 'toolbar-btn--bold',      ariaLabel: 'Bold'      },
  { className: 'toolbar-btn--italic',    ariaLabel: 'Italic'    },
  { className: 'toolbar-btn--underline', ariaLabel: 'Underline' },
];

// Insert and list buttons use Technique B: sr-only span
const INSERT_BUTTONS = [
  { className: 'toolbar-btn--link',  label: 'Insert link'  },
  { className: 'toolbar-btn--image', label: 'Insert image' },
];

const LIST_BUTTONS = [
  { className: 'toolbar-btn--ol', label: 'Ordered list'   },
  { className: 'toolbar-btn--ul', label: 'Unordered list' },
];

export default function BackgroundImagesWithMeaning() {
  return (
    <main className="page">
      <h1 className="page-title">Article Editor</h1>

      <div className="editor-card">
        <div className="toolbar" role="toolbar" aria-label="Formatting">

          {/*
            Technique A: aria-label
            aria-label is applied directly to the button.
            The background-image is the visual; aria-label is the accessible name.
            Screen reader: "Bold, button"
          */}
          <div className="toolbar-group">
            {FORMATTING_BUTTONS.map(({ className, ariaLabel }) => (
              <button
                key={className}
                type="button"
                className={`toolbar-btn ${className}`}
                aria-label={ariaLabel}
              />
            ))}
          </div>

          {/*
            Technique B: visually-hidden <span>
            The button's accessible name is derived from its text content.
            The span is clipped off-screen — invisible visually, read by AT.
            Screen reader: "Insert link, button"
          */}
          <div className="toolbar-group">
            {INSERT_BUTTONS.map(({ className, label }) => (
              <button key={className} type="button" className={`toolbar-btn ${className}`}>
                <span style={srOnlyStyle}>{label}</span>
              </button>
            ))}
          </div>

          <div className="toolbar-group">
            {LIST_BUTTONS.map(({ className, label }) => (
              <button key={className} type="button" className={`toolbar-btn ${className}`}>
                <span style={srOnlyStyle}>{label}</span>
              </button>
            ))}
          </div>

        </div>

        <div className="editor-body">
          <textarea
            className="editor-area"
            placeholder="Start writing your article here…"
            aria-label="Article content"
          />
        </div>
      </div>
    </main>
  );
}
