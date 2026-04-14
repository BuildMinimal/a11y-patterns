// Pattern data - will be populated from patterns directory
let patterns = [];

// Category mapping
const categories = {
  '01-color-contrast': 'Color Contrast',
  '02-missing-alt-text': 'Missing Alt Text',
  '03-form-labels': 'Form Labels',
  '04-empty-links-buttons': 'Empty Links & Buttons',
  '05-focus-management': 'Focus Management',
  '06-keyboard-navigation': 'Keyboard Navigation'
};

// Load patterns from the patterns directory
async function loadPatterns() {
  try {
    const response = await fetch('./patterns-data.json');
    if (!response.ok) throw new Error('Failed to load patterns');
    patterns = await response.json();
  } catch (error) {
    console.error('Error loading patterns:', error);
    // Fallback patterns for development
    patterns = getFallbackPatterns();
  }
  renderPatterns();
  updateResultsCount();
}

// Get fallback patterns for development
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
      path: 'patterns/01-color-contrast/disabled-state-contrast'
    },
    {
      id: 'placeholder-text',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Placeholder Text',
      description: 'Why placeholder text should never be used as a label, and the contrast issues it creates.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/placeholder-text'
    },
    {
      id: 'text-on-gradient',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Text on Gradient',
      description: 'How to ensure text remains readable when placed on gradient backgrounds.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/text-on-gradient'
    },
    {
      id: 'text-on-solid-bg',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Text on Solid Background',
      description: 'Basic contrast requirements for text on solid colored backgrounds.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/text-on-solid-bg'
    },
    {
      id: 'focus-indicator-contrast',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Focus Indicator Contrast',
      description: 'Ensuring focus indicators are visible enough for keyboard users.',
      wcagLevel: 'AA',
      wcagCriteria: '2.4.7',
      path: 'patterns/01-color-contrast/focus-indicator-contrast'
    },
    {
      id: 'icon-only-button',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Icon-Only Button',
      description: 'Ensuring icon-only buttons have sufficient contrast and proper labels.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3, 2.4.4',
      path: 'patterns/01-color-contrast/icon-only-button'
    },
    {
      id: 'dark-mode-theme',
      category: '01-color-contrast',
      categoryName: 'Color Contrast',
      title: 'Dark Mode Theme',
      description: 'Proper color contrast considerations for dark mode implementations.',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      path: 'patterns/01-color-contrast/dark-mode-theme'
    }
  ];
}

// Render pattern cards
function renderPatterns() {
  const grid = document.getElementById('patterns-grid');
  const categoryFilter = document.getElementById('category-filter').value;
  const wcagFilter = document.getElementById('wcag-filter').value;

  // Filter patterns
  let filteredPatterns = patterns.filter(pattern => {
    const matchesCategory = !categoryFilter || pattern.category === categoryFilter;
    const matchesWcag = !wcagFilter || pattern.wcagLevel === wcagFilter;
    return matchesCategory && matchesWcag;
  });

  // Clear grid
  grid.innerHTML = '';

  // Show empty state if no patterns
  if (filteredPatterns.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <h3>No patterns found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    `;
    return;
  }

  // Render pattern cards
  filteredPatterns.forEach(pattern => {
    const card = document.createElement('article');
    card.className = 'pattern-card';
    card.innerHTML = `
      <div class="pattern-card__header">
        <span class="pattern-card__category">${pattern.categoryName}</span>
        <span class="pattern-card__wcag pattern-card__wcag--${pattern.wcagLevel}">WCAG ${pattern.wcagLevel}</span>
      </div>
      <h3 class="pattern-card__title">${pattern.title}</h3>
      <p class="pattern-card__description">${pattern.description}</p>
      <div class="pattern-card__footer">
        <span class="pattern-card__criterion">${pattern.wcagCriteria}</span>
        <a href="pattern.html?id=${pattern.id}" class="pattern-card__link">View Pattern</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Update results count
function updateResultsCount() {
  const categoryFilter = document.getElementById('category-filter').value;
  const wcagFilter = document.getElementById('wcag-filter').value;
  const count = patterns.filter(pattern => {
    const matchesCategory = !categoryFilter || pattern.category === categoryFilter;
    const matchesWcag = !wcagFilter || pattern.wcagLevel === wcagFilter;
    return matchesCategory && matchesWcag;
  }).length;

  const resultsCount = document.getElementById('results-count');
  resultsCount.textContent = `Showing ${count} pattern${count !== 1 ? 's' : ''}`;
}

// Initialize filters
function initFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const wcagFilter = document.getElementById('wcag-filter');

  categoryFilter.addEventListener('change', () => {
    renderPatterns();
    updateResultsCount();
  });

  wcagFilter.addEventListener('change', () => {
    renderPatterns();
    updateResultsCount();
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  loadPatterns();
});
