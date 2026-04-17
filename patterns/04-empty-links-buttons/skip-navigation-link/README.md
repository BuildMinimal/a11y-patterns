---
title: Skip Navigation Link
category: 04-empty-links-buttons
wcag: "2.4.1 Bypass Blocks"
wcag-shorthand: "2.4.1"
wcag-level: "A"
wcag-criterion: Bypass Blocks
axe-rule: bypass
status: complete
---

# Skip Navigation Link

## What the problem is

Every page load, a keyboard user must Tab through every repeated navigation element before reaching the main content. On a page with 6 top-nav links and 5 sidebar links, that is 11 Tab presses before the article is reachable — on every page, every visit.

Screen reader users have their own bypass tools: heading navigation, landmark jumps, the links list. **Sighted keyboard users have none of these** unless the page explicitly provides a skip link.

### Why axe may not flag this automatically

The axe `bypass` rule passes when a page has a `<main>` element, an `<h1>`, or any landmark region — it treats these as sufficient bypass mechanisms. This is technically correct per WCAG 2.4.1, but misses the real-world impact on sighted keyboard users who cannot jump to a heading without a screen reader. Manual testing (press Tab on page load, count presses to reach content) is the definitive check.

## How to fix it: three-part solution

### 1. Skip link — first element in the DOM

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

It must be the **first focusable element** so it is reachable on the first Tab press. Hidden off-screen by default, it slides into view on `:focus` so sighted users can see and activate it.

```css
.skip-link {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 9999;
  transform: translateY(calc(-100% - 1rem)); /* off-screen */
  transition: transform 0.15s;
}
.skip-link:focus {
  transform: translateY(0);                  /* visible on focus */
}
```

### 2. Target with `tabindex="-1"`

```html
<main id="main-content" tabindex="-1">
```

`tabindex="-1"` allows the element to receive **programmatic focus** when the skip link is activated, without adding it to the natural Tab order. Without it, Safari does not move focus to the target — the viewport scrolls but keyboard position stays on the link.

### 3. Landmark regions with `aria-label`

```html
<nav aria-label="Site navigation">...</nav>
<nav aria-label="Page contents">...</nav>
<main id="main-content" tabindex="-1">...</main>
```

Multiple `<nav>` elements on a page must have unique `aria-label` attributes so screen readers can distinguish them in the landmarks list.

## Why `display: none` or `visibility: hidden` won't work

A skip link hidden with `display: none` or `visibility: hidden` is also hidden from assistive technology — it cannot be focused at all. The skip link must be focusable; only its visual position should be off-screen when not focused.

## Testing the fix

1. Load the after/ page
2. Press **Tab** once — the blue "Skip to main content" button appears
3. Press **Enter** — focus moves to `<main>`, bypassing all nav links
4. Continue pressing **Tab** — the next stop is the first interactive element inside `<main>`

## WCAG success criterion

**2.4.1 Bypass Blocks — Level A**: A mechanism is available to bypass blocks of content that are repeated on multiple web pages. The skip link satisfies this for sighted keyboard users; landmark regions satisfy it for screen reader users. Both should be present.
