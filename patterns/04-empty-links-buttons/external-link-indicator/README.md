---
title: External Link — No New-Tab Indicator
category: 04-empty-links-buttons
wcag: "2.4.4"
wcag-level: "A"
wcag-criterion: Link Purpose (In Context)
axe-rule: link-name
status: complete
---

# External Link — No New-Tab Indicator

## What the problem is

A link with `target="_blank"` opens a new browser tab without warning. For keyboard and screen reader users this is disorienting: focus moves to a new tab, their browsing history is broken, and the Back button no longer works as expected. WCAG 2.4.4 requires that link purpose — including its navigation behaviour — is determinable from context.

### Why axe won't catch this automatically

The axe `link-name` rule only checks that a link has an accessible name. A link reading "WCAG 2.2" passes — it has text. The failure is that `target="_blank"` creates a context change that is not disclosed to the user, which requires manual review to catch.

### Before — broken pattern

```html
<a href="https://www.w3.org/TR/WCAG22/" target="_blank">
  WCAG 2.2
</a>
```

Screen reader announces: **"WCAG 2.2, link"** — no indication a new tab will open.

## How to fix it

Combine three changes:

1. **`rel="noopener noreferrer"`** — security best practice that prevents the new tab from accessing `window.opener` on the originating page.
2. **`.sr-only` span** — announces `(opens in new tab)` to screen reader users before they activate the link.
3. **Visible SVG icon** (`aria-hidden="true"`) — gives sighted users the same cue as the sr-only text.

### After — fixed pattern

```html
<a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">
  WCAG 2.2
  <svg class="ext-icon" aria-hidden="true" focusable="false" ...>...</svg>
  <span class="sr-only">(opens in new tab)</span>
</a>
```

Screen reader announces: **"WCAG 2.2 (opens in new tab), link"**

## The `.sr-only` pattern

```css
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
```

Hides text visually while keeping it in the accessibility tree. The same utility is used throughout this pattern library.

## Why the icon needs `aria-hidden="true"` and `focusable="false"`

The SVG is purely decorative — the `.sr-only` text already communicates the new-tab behaviour to AT users. Without `aria-hidden="true"`, some screen readers would attempt to describe the SVG path data. Without `focusable="false"`, Internet Explorer and older Edge make SVGs independently focusable, creating a phantom tab stop.

## Alternative technique: `aria-label`

```html
<a href="..." target="_blank" rel="noopener noreferrer"
   aria-label="WCAG 2.2 (opens in new tab)">
  WCAG 2.2
  <svg aria-hidden="true" focusable="false" ...>...</svg>
</a>
```

`aria-label` overrides the entire accessible name. It works but is not translated by browser translation tools and can silently diverge from the visible link text. The `.sr-only` approach is preferred.

## Should you avoid `target="_blank"` entirely?

Some accessibility advocates recommend removing `target="_blank"` altogether and letting users decide whether to open a new tab. This is valid for content sites. For applications where a new tab is genuinely beneficial (e.g. opening a reference document without losing a form state), disclosing the behaviour is the right middle ground.

## WCAG success criterion

**2.4.4 Link Purpose (In Context) — Level A**: The purpose of each link must be determinable from the link text alone, or from the link text together with its programmatically determined context. Opening a new tab is part of a link's purpose and must be disclosed.
