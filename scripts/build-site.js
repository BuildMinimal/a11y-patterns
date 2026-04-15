import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Extract category name from README
function extractCategoryName(readmePath) {
  try {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    const match = readme.match(/\*\*Category:\*\*\s*(.+)$/m);
    if (match) {
      return match[1].trim();
    }
    return '';
  } catch (error) {
    return '';
  }
}

// Extract WCAG criteria from README
function extractWcagCriteria(readmePath) {
  try {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    const match = readme.match(/\*\*WCAG:\*\*\s*(.+?)\s+—/);
    if (match) {
      return match[1].trim();
    }
    return '';
  } catch (error) {
    return '';
  }
}

// Extract WCAG level from README
function extractWcagLevel(readmePath) {
  try {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    const match = readme.match(/WCAG:\s*([\d.]+)\s+—\s+Level\s+(A{1,3})/i);
    if (match) {
      return match[2];
    }
    return 'AA'; // Default
  } catch (error) {
    return 'AA';
  }
}

// Extract description from README
function extractDescription(readmePath) {
  try {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    const match = readme.match(/## What this pattern demonstrates\s*\n\s*([\s\S]*?)(?=\n##|\n---)/);
    if (match) {
      return marked.parse(match[1].trim());
    }
    return '';
  } catch (error) {
    return '';
  }
}

// Extract key rules from README
function extractKeyRules(readmePath) {
  try {
    // Normalize CRLF → LF so all splitting works on Windows
    const readme = fs.readFileSync(readmePath, 'utf-8').replace(/\r\n/g, '\n');
    const match = readme.match(/## Key rules\s*\n([\s\S]*?)(?=\n##|\n---|$)/);
    if (match) {
      const rulesText = match[1].trim();
      // Rules are separated by blank lines; each block starts with **N.
      const ruleBlocks = rulesText.split(/\n\n+/).filter(b => /^\*\*\d+\./.test(b.trim()));
      return ruleBlocks.map(block =>
        block
          .replace(/\*\*/g, '')         // strip bold markers
          .replace(/^\d+\.\s+/, '')     // strip leading "N. " number prefix
          .replace(/\s+/g, ' ')         // collapse whitespace/newlines
          .trim()
      );
    }
    return [];
  } catch {
    return [];
  }
}

// Extract "Why it matters" from README
function extractWhyItMatters(readmePath) {
  try {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    const match = readme.match(/## Why it matters\s*\n\s*([\s\S]*?)(?=\n##|\n---)/);
    if (match) {
      return marked.parse(match[1].trim());
    }
    return '';
  } catch (error) {
    return '';
  }
}

// Scan patterns directory - auto-discovers all categories and patterns
function scanPatterns() {
  const patternsDir = path.join(rootDir, 'patterns');
  const patterns = [];

  if (!fs.existsSync(patternsDir)) {
    return patterns;
  }

  const categoryDirs = fs.readdirSync(patternsDir, { withFileTypes: true });

  for (const categoryDir of categoryDirs) {
    if (!categoryDir.isDirectory()) continue;

    const category = categoryDir.name;
    const categoryPath = path.join(patternsDir, category);

    const patternDirs = fs.readdirSync(categoryPath, { withFileTypes: true });

    for (const patternDir of patternDirs) {
      if (!patternDir.isDirectory()) continue;

      const patternId = patternDir.name;
      const patternPath = path.join(categoryPath, patternId);
      const readmePath = path.join(patternPath, 'README.md');

      // Skip if README doesn't exist
      if (!fs.existsSync(readmePath)) continue;

      // Extract pattern info from README
      const categoryName = extractCategoryName(readmePath);
      const wcagLevel = extractWcagLevel(readmePath);
      const wcagCriteria = extractWcagCriteria(readmePath);
      const description = extractDescription(readmePath);
      const keyRules = extractKeyRules(readmePath);
      const whyItMatters = extractWhyItMatters(readmePath);

      // Get title from README (first heading)
      let title = patternId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      try {
        const readme = fs.readFileSync(readmePath, 'utf-8');
        const titleMatch = readme.match(/^#\s+Pattern:\s+(.+)$/m);
        if (titleMatch) {
          title = titleMatch[1].trim();
        }
      } catch (error) {
        // Use generated title
      }

      // Embed code files so pattern.js doesn't need to fetch them
      const codeFilePaths = {
        html: path.join(patternPath, 'after', 'index.html'),
        react: path.join(patternPath, 'react', 'Component.jsx'),
        vue: path.join(patternPath, 'vue', 'Component.vue')
      };
      const code = {};
      for (const [type, filePath] of Object.entries(codeFilePaths)) {
        if (fs.existsSync(filePath)) {
          code[type] = fs.readFileSync(filePath, 'utf-8');
        }
      }

      patterns.push({
        id: patternId,
        category: category,
        categoryName: categoryName || category.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        title: title,
        description: description || `${title} - ${categoryName || category}`,
        wcagLevel: wcagLevel,
        wcagCriteria: wcagCriteria,
        path: `patterns/${category}/${patternId}`,
        keyRules: keyRules,
        whatItDemonstrates: description,
        whyItMatters: whyItMatters,
        code: code
      });
    }
  }

  return patterns;
}

// Build site
function build() {
  console.log('🏗️ Building A11y Patterns site...');

  // Create dist directory
  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  // Copy site files
  const siteDir = path.join(rootDir, 'site');
  const siteFiles = fs.readdirSync(siteDir, { withFileTypes: true });
  for (const entry of siteFiles) {
    const src = path.join(siteDir, entry.name);
    const dest = path.join(distDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  // Create patterns directory in dist
  const distPatternsDir = path.join(distDir, 'patterns');
  fs.mkdirSync(distPatternsDir, { recursive: true });

  // Copy patterns directory
  const patternsDir = path.join(rootDir, 'patterns');
  copyDirectory(patternsDir, distPatternsDir);

  // Generate patterns-data.json
  const patterns = scanPatterns();
  const patternsDataPath = path.join(distDir, 'patterns-data.json');
  fs.writeFileSync(patternsDataPath, JSON.stringify(patterns, null, 2));

  console.log(`✅ Built ${patterns.length} patterns`);
  console.log(`📁 Site output: ${distDir}`);
  console.log(`📊 Patterns data: ${patternsDataPath}`);
}

// Copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Run build
build();
