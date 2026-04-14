// Pattern data
let patterns = [];
let currentPattern = null;

// Get pattern ID from URL
function getPatternId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Load patterns
async function loadPatterns() {
  try {
    const response = await fetch('./patterns-data.json');
    if (!response.ok) throw new Error('Failed to load patterns');
    patterns = await response.json();
  } catch {
    patterns = getFallbackPatterns();
  }
  
  const patternId = getPatternId();
  if (patternId) {
    currentPattern = patterns.find(p => p.id === patternId);
    if (currentPattern) {
      renderPattern();
    } else {
      renderNotFound();
    }
  } else {
    renderNotFound();
  }
}

// Get fallback patterns
function getFallbackPatterns() {
  return [
    {
      id: 'disabled-state-contrast',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Disabled State Contrast',
      description: 'The difference between CSS-only disabled states and natively disabled controls using the HTML disabled attribute.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/disabled-state-contrast',
      keyRules: [
        'The WCAG contrast exemption requires the native `disabled` attribute. `aria-disabled`, `.disabled` CSS class, `pointer-events: none`, and `readonly` do not qualify.',
        'Exempt ≠ invisible. Even if you\'re technically exempt, disabled fields that show user data should be readable.',
        'Use `:disabled` pseudo-class, not utility classes. Targeting `input:disabled` and `button:disabled` in CSS means the visual styling automatically tracks the HTML attribute.'
      ],
      whatItDemonstrates: 'The difference between CSS-only "disabled" states (which axe checks for contrast failures) and natively disabled controls using the HTML `disabled` attribute (which WCAG explicitly exempts from contrast requirements) — plus why you should still use readable colors either way.',
      whyItMatters: 'There are two distinct failure modes here: CSS-only disabled states that fail axe, and native disabled with invisible styling that users can\'t read even though it\'s WCAG-exempt.'
    },
    {
      id: 'placeholder-text',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Placeholder Text',
      description: 'Why placeholder text should never be used as a label, and the contrast issues it creates.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/placeholder-text',
      keyRules: [
        'Never use placeholder as a label. It disappears when the user starts typing, leaving no context for what the field expects.',
        'Placeholder text must meet 4.5:1 contrast ratio with the input background, just like any other text.',
        'Always provide a visible label using the `<label>` element with a matching `for` attribute.',
        'Use `aria-describedby` to connect placeholder text to the field for screen readers if you need to provide additional hints.'
      ],
      whatItDemonstrates: 'Why placeholder text should never be used as a label, and the contrast issues it creates when placeholder text is too light.',
      whyItMatters: 'Placeholder text is often used as a label shortcut, but it violates WCAG 3.3.2 (Labels or Instructions) and creates usability issues for all users, not just those with disabilities.'
    },
    {
      id: 'text-on-gradient',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Text on Gradient',
      description: 'How to ensure text remains readable when placed on gradient backgrounds.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/text-on-gradient',
      keyRules: [
        'Test contrast at the lightest point of the gradient, not the average or darkest point.',
        'Use text shadows or overlays to ensure text remains readable across the entire gradient.',
        'Consider using solid color backgrounds with a gradient border or decoration instead of placing text directly on gradients.',
        'Always test with real contrast checking tools, not just visual inspection.'
      ],
      whatItDemonstrates: 'How to ensure text remains readable when placed on gradient backgrounds, which is a common failure mode.',
      whyItMatters: 'Gradients are popular in modern design, but they create contrast challenges that many developers overlook. The lightest part of the gradient determines whether text is readable.'
    },
    {
      id: 'text-on-solid-bg',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Text on Solid Background',
      description: 'Basic contrast requirements for text on solid colored backgrounds.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/text-on-solid-bg',
      keyRules: [
        'Normal text (under 18pt or 14pt bold) requires 4.5:1 contrast ratio for AA, 7:1 for AAA.',
        'Large text (18pt+ or 14pt+ bold) requires 3:1 contrast ratio for AA, 4.5:1 for AAA.',
        'Text components like icons and graphical objects require 3:1 contrast ratio for AA.',
        'Always test with automated tools like axe or WebAIM Contrast Checker.'
      ],
      whatItDemonstrates: 'Basic contrast requirements for text on solid colored backgrounds, which is the most common contrast failure.',
      whyItMatters: 'Low contrast is the #1 accessibility failure on the web according to WebAIM Million. Understanding and applying these basic rules prevents the most common issues.'
    },
    {
      id: 'focus-indicator-contrast',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Focus Indicator Contrast',
      description: 'Ensuring focus indicators are visible enough for keyboard users.',
      wcagLevel: 'AA',
      wcagCriteria: '2.4.7',
      path: 'patterns/01-color-contrast/focus-indicator-contrast',
      keyRules: [
        'Focus indicators must have a 3:1 contrast ratio against the adjacent colors for AA.',
        'The focus indicator must be visible and distinct from the non-focused state.',
        'Never remove the default browser focus outline without providing a clear alternative.',
        'Test focus indicators by tabbing through your interface with a keyboard.'
      ],
      whatItDemonstrates: 'Ensuring focus indicators are visible enough for keyboard users, which is critical for keyboard navigation.',
      whyItMatters: 'Keyboard users rely on focus indicators to understand where they are on the page. Poor focus indicators make your site unusable for keyboard-only users.'
    },
    {
      id: 'icon-only-button',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Icon-Only Button',
      description: 'Ensuring icon-only buttons have sufficient contrast and proper labels.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3, 2.4.4',
      path: 'patterns/01-color-contrast/icon-only-button',
      keyRules: [
        'Icon-only buttons must have a visible label using `aria-label` or `aria-labelledby`.',
        'The icon must have a 3:1 contrast ratio against its background for AA.',
        'Consider adding a visible text label alongside the icon when possible.',
        'Test icon-only buttons with screen readers to ensure the label is announced correctly.'
      ],
      whatItDemonstrates: 'Ensuring icon-only buttons have sufficient contrast and proper labels for screen reader users.',
      whyItMatters: 'Icon-only buttons are common in modern interfaces, but they create accessibility challenges for users who can\'t see the icon or don\'t understand its meaning.'
    },
    {
      id: 'dark-mode-theme',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Dark Mode Theme',
      description: 'Proper color contrast considerations for dark mode implementations.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/dark-mode-theme',
      keyRules: [
        'Dark mode is not just inverting colors — you must carefully design the color palette.',
        'Text on dark backgrounds often needs to be lighter than you think to meet contrast requirements.',
        'Avoid pure black (#000000) on pure white (#FFFFFF) — it causes eye strain and can create vibration effects.',
        'Test both light and dark modes with contrast checking tools.'
      ],
      whatItDemonstrates: 'Proper color contrast considerations for dark mode implementations, which is increasingly important.',
      whyItMatters: 'Dark mode is popular for reducing eye strain and saving battery, but many implementations fail to meet WCAG contrast requirements.'
    }
  ];
}

// Render pattern
function renderPattern() {
  const content = document.getElementById('pattern-content');
  
  content.innerHTML = `
    <header class="pattern-header">
      <div class="pattern-header__category">${currentPattern.categoryName}</div>
      <h1 class="pattern-header__title">${currentPattern.title}</h1>
      <div class="pattern-header__meta">
        <span class="pattern-header__badge pattern-header__badge--wcag ${currentPattern.wcagLevel}">
          WCAG ${currentPattern.wcagLevel}
        </span>
        <span class="pattern-header__badge pattern-header__badge--criterion">
          ${currentPattern.wcagCriteria}
        </span>
      </div>
    </header>

    <section class="pattern-description">
      <h2 class="pattern-description__title">What this pattern demonstrates</h2>
      <p class="pattern-description__content">${currentPattern.whatItDemonstrates || currentPattern.description}</p>
    </section>

    <section class="comparison">
      <div class="comparison__header">
        <h2 class="comparison__title">Before & After</h2>
      </div>
      <div class="comparison__frames">
        <div class="frame-container frame-container--before">
          <div class="frame-container__header">
            <span class="frame-container__title frame-container__title--before">
              <span class="material-symbols-outlined" aria-hidden="true">close</span> Before
            </span>
            <span class="frame-container__status frame-container__status--fail">FAILS axe</span>
          </div>
          <iframe
            class="frame-container__iframe"
            src="${currentPattern.path}/before/index.html"
            title="Before example - fails accessibility tests"
            loading="lazy"
          ></iframe>
        </div>
        <div class="frame-container frame-container--after">
          <div class="frame-container__header">
            <span class="frame-container__title frame-container__title--after">
              <span class="material-symbols-outlined" aria-hidden="true">check</span> After
            </span>
            <span class="frame-container__status frame-container__status--pass">PASSES axe</span>
          </div>
          <iframe
            class="frame-container__iframe"
            src="${currentPattern.path}/after/index.html"
            title="After example - passes accessibility tests"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    <section class="code-snippets">
      <h2 class="code-snippets__title">Copy Code</h2>
      <div class="code-snippets__tabs">
        <button class="code-snippets__tab code-snippets__tab--active" data-tab="html">HTML</button>
        <button class="code-snippets__tab" data-tab="react">React</button>
        <button class="code-snippets__tab" data-tab="vue">Vue</button>
      </div>
      <div id="code-content">
        <!-- Code blocks will be loaded here -->
      </div>
    </section>

    ${currentPattern.keyRules ? `
    <section class="key-rules">
      <h2 class="key-rules__title">Key Rules</h2>
      <ul class="key-rules__list">
        ${currentPattern.keyRules.map((rule, index) => `
          <li class="key-rules__item">
            <span class="key-rules__item-number">${index + 1}.</span>
            ${rule}
          </li>
        `).join('')}
      </ul>
    </section>
    ` : ''}
  `;

  initTabs();
  loadCodeSnippets();
}

// Render not found
function renderNotFound() {
  const content = document.getElementById('pattern-content');
  content.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon"><span class="material-symbols-outlined">search_off</span></div>
      <h2>Pattern not found</h2>
      <p>The pattern you're looking for doesn't exist or has been moved.</p>
      <a href="index.html" class="pattern-card__link">Back to all patterns</a>
    </div>
  `;
}

// Initialize tabs
function initTabs() {
  const tabs = document.querySelectorAll('.code-snippets__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('code-snippets__tab--active'));
      // Add active class to clicked tab
      tab.classList.add('code-snippets__tab--active');
      // Load code for this tab
      const codeType = tab.dataset.tab;
      loadCodeSnippet(codeType);
    });
  });
}

// Load code snippets
function loadCodeSnippets() {
  loadCodeSnippet('html');
}

// Load single code snippet from embedded pattern data
function loadCodeSnippet(type) {
  const codeContent = document.getElementById('code-content');

  let title;
  switch(type) {
    case 'html':  title = 'HTML (After)';    break;
    case 'react': title = 'React Component'; break;
    case 'vue':   title = 'Vue Component';   break;
  }

  const code = currentPattern.code && currentPattern.code[type];

  if (code) {
    codeContent.innerHTML = createCodeBlock(title, code);
    initCopyButtons();
  } else {
    codeContent.innerHTML = `
      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__title">${title}</span>
        </div>
        <div class="code-block__content">
          <p style="color: #94a3b8;">No ${title} file for this pattern.</p>
        </div>
      </div>
    `;
  }
}

// Create code block HTML
function createCodeBlock(title, code) {
  return `
    <div class="code-block">
      <div class="code-block__header">
        <span class="code-block__title">${title}</span>
        <button class="code-block__copy" type="button">
          <span class="material-symbols-outlined" aria-hidden="true">content_copy</span> Copy
        </button>
      </div>
      <div class="code-block__content">
        <pre class="code-block__code">${escapeHtml(code)}</pre>
      </div>
    </div>
  `;
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize copy buttons
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.code-block__copy');
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const codeBlock = button.closest('.code-block');
      const code = codeBlock.querySelector('.code-block__code').textContent;
      
      try {
        await navigator.clipboard.writeText(code);
        button.classList.add('code-block__copy--copied');
        button.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">check</span> Copied!';
        
        setTimeout(() => {
          button.classList.remove('code-block__copy--copied');
          button.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">content_copy</span> Copy';
        }, 2000);
      } catch {
        button.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">close</span> Failed';
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadPatterns();
});
