---
title: Read More Links — No Destination Context
category: 04-empty-links-buttons
wcag: "2.4.4"
wcag-level: "A"
wcag-criterion: Link Purpose (In Context)
wcag-also: "2.4.9"
wcag-also-level: "AAA"
wcag-also-criterion: Link Purpose (Link Only)
axe-rule: link-name
status: complete
---

# Read More Links — No Destination Context

## What the problem is

"Read more", "Learn more", and "Click here" links are one of the most common accessibility anti-patterns. Every link on the page shares identical text — so screen reader users who navigate by links (e.g. NVDA's links list, VoiceOver's rotor) hear a list of identically-named items with no way to distinguish which article each one leads to.

### Why axe won't catch this automatically

The axe `link-name` rule checks whether a link has *any* accessible name. "Read more" passes that check — it is text. The violation is that the text is **not unique** and **not descriptive of the destination**, which requires semantic judgment axe cannot perform automatically. This is a WCAG 2.4.4 failure that requires manual review.

### Before — broken pattern

```html
<a href="/article-1" class="read-more">
  Read more <span aria-hidden="true">→</span>
</a>
<!-- repeated 3× with identical text -->
```

A screen reader's links list shows:
- Read more
- Read more
- Read more

## How to fix it

Add a `.sr-only` span inside the link with destination-specific text. Sighted users see only "Read more →" — the layout is unchanged. Screen reader users hear the full context.

### After — fixed pattern

```html
<a href="/article-1" class="read-more">
  Read more<span class="sr-only"> about Mastering Focus Management in Single-Page Apps</span>
  <span aria-hidden="true"> →</span>
</a>
```

Screen reader announces: **"Read more about Mastering Focus Management in Single-Page Apps, link"**

The links list now shows:
- Read more about Mastering Focus Management in Single-Page Apps
- Read more about WCAG 3.0 Contrast: What Changes for Designers
- Read more about Accessible Error Messages: Beyond Red Text

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

This hides content visually while keeping it available to assistive technology. It is the standard technique used across this pattern library wherever hidden labelling context is needed.

## Why `aria-hidden="true"` on the arrow

The decorative arrow `→` is `aria-hidden="true"` so it is not read aloud as part of the link text. Without it, a screen reader might announce "Read more about Focus Management arrow, link."

## Alternative technique: `aria-label`

```html
<a href="/article-1" aria-label="Read more about Mastering Focus Management in Single-Page Apps">
  Read more <span aria-hidden="true">→</span>
</a>
```

`aria-label` replaces the entire computed accessible name. It works but has two drawbacks:
- It is not translatable by browser translation tools (`.sr-only` text is).
- If the link text is changed visually, `aria-label` can fall out of sync silently.

Prefer the `.sr-only` approach for maintainability.

## WCAG success criteria

- **2.4.4 Link Purpose (In Context) — Level A**: The purpose of each link must be determinable from the link text alone or from the link text together with its programmatically determined context.
- **2.4.9 Link Purpose (Link Only) — Level AAA**: The purpose of each link must be determinable from the link text alone (context not sufficient).

The `.sr-only` fix satisfies both levels.
