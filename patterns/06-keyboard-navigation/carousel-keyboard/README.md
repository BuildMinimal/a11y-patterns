---
title: Carousel — Keyboard Navigation and Pause Control
category: 06-keyboard-navigation
wcag: "2.1.1 Keyboard"
wcag-shorthand: "2.1.1"
wcag-level: "A"
wcag-criterion: Keyboard
wcag-also: "2.2.2"
wcag-also-level: "A"
wcag-also-criterion: Pause, Stop, Hide
axe-rule: button-name
status: complete
---

# Carousel — Keyboard Navigation and Pause Control

## What the problem is

Carousels break accessibility in two distinct ways:

**1. WCAG 2.1.1 — Keyboard:** Previous/Next controls built from `<div>` elements are not keyboard-reachable. `Tab` skips them entirely. Keyboard users cannot navigate between slides.

**2. WCAG 2.2.2 — Pause, Stop, Hide:** Auto-advancing content with no pause mechanism forces users to read at the carousel's speed. For users with cognitive disabilities, reading impairments, or motor limitations who navigate slowly, the slide changes before they finish.

### Before — broken pattern

```html
<!-- Both bugs in one: div controls + no pause -->
<div class="carousel-btn" onclick="prevSlide()">‹</div>
<div class="carousel-btn" onclick="nextSlide()">›</div>
<!-- setInterval(nextSlide, 3000) — no way to stop it -->
```

## How to fix it

Replace `<div>` controls with native `<button>` elements. Add a pause button as the first Tab stop. Auto-pause when focus enters the carousel.

### After — fixed pattern

```html
<!-- FIX: Pause button FIRST — keyboard users stop auto-advance before it changes on them -->
<button id="pause-btn" aria-label="Pause slideshow">⏸</button>
<button id="prev-btn"  aria-label="Previous slide">‹</button>
<button id="next-btn"  aria-label="Next slide">›</button>
```

## The auto-pause strategy

The carousel auto-pauses in two situations:

1. **On keyboard focus** (`focusin` event): When any button inside the carousel receives focus, auto-advance stops. This protects keyboard users who cannot react in time if a slide changes while they are activating a button.

2. **On hover** (`mouseenter` event): Pauses for pointer users inspecting the current slide.

Auto-advance resumes when focus leaves the carousel entirely (`focusout` with `relatedTarget` outside) and when the pointer leaves (`mouseleave`).

## ARIA structure for the carousel

| Element | Attributes | Purpose |
|---------|-----------|---------|
| `<section>` | `aria-label="Featured articles"` | Names the carousel region |
| `<section>` | `aria-roledescription="carousel"` | Overrides "region" with "carousel" in AT announcements |
| Each slide `<div>` | `role="group"` | Groups slide content |
| Each slide `<div>` | `aria-roledescription="slide"` | Overrides "group" with "slide" |
| Each slide `<div>` | `aria-label="1 of 4"` | Position context for AT users |
| Inactive slides | `hidden` | Removes them from accessibility tree |
| Status `<p>` | `aria-live="polite"` | Announces slide change on manual navigation only |

## Why the live region only fires on manual navigation

`aria-live="polite"` announces content changes as soon as the current utterance finishes. If it fired on every auto-advance tick, screen reader users would hear "slide 2 of 4", "slide 3 of 4", "slide 4 of 4" interrupting whatever they are reading. The status element is only updated when the user explicitly navigates via prev/next.

## Why `aria-label` on buttons, not icon text

The icon characters (`‹`, `›`, `⏸`) are visually recognisable but ambiguous to screen readers. Without `aria-label`, a screen reader announces "single left-pointing angle quotation mark" or "pause button character". `aria-label` replaces the announced text entirely — the icon is `aria-hidden="true"` and the label is the sole accessible name.

## WCAG success criteria

- **2.1.1 Keyboard — Level A**: All functionality operable via keyboard. `<div onclick>` controls have no keyboard equivalent.
- **2.2.2 Pause, Stop, Hide — Level A**: Moving content that plays for more than 5 seconds must have a pause mechanism. The pause button satisfies this for keyboard users; auto-pause on focus provides additional protection.

## Related patterns

- `custom-select-dropdown` — button-based keyboard navigation
- `accordion-keyboard` — same button/ARIA pattern without auto-advance complexity
