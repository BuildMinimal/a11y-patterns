# Screen Reader Testing Guide

How to test the patterns in this repo with actual screen readers. Automated axe tests do not cover everything — screen reader testing catches announcement order issues, missing state changes, and ARIA implementation errors that axe can't detect.

---

## Which screen readers to test with

You don't need to test with all of them. Start with the top two:

| Priority | Screen Reader | Browser | Platform | Cost |
|----------|--------------|---------|----------|------|
| 1 | **NVDA** | Firefox | Windows | Free |
| 2 | **VoiceOver** | Safari | macOS / iOS | Built-in |
| 3 | JAWS | Chrome | Windows | Paid (license) |
| 4 | TalkBack | Chrome | Android | Built-in |

NVDA + Firefox covers the highest percentage of actual screen reader users (per the [WebAIM Screen Reader User Survey](https://webaim.org/projects/screenreadersurvey/)).

---

## Setting up NVDA (Windows)

1. Download from [nvaccess.org/download](https://www.nvaccess.org/download/) — free, open source
2. Run the installer — NVDA starts immediately after install
3. Download Firefox if you don't have it
4. Open Firefox and navigate to the `after/index.html` file for the pattern you're testing

**Disable NVDA's speech viewer** for testing — it can make you think something is being announced when it's not. Test with audio on.

---

## Setting up VoiceOver (macOS)

VoiceOver is built into macOS — no install needed.

1. Enable: `Command + F5` (or `System Preferences → Accessibility → VoiceOver`)
2. Open Safari — VoiceOver and Safari are the best-supported pair on macOS
3. Navigate to `after/index.html`

---

## Core NVDA commands

### Reading

| Action | Command |
|--------|---------|
| Start reading from cursor | `NVDA + Down Arrow` (Insert + Down) |
| Stop reading | `Control` |
| Read current line | `NVDA + Up Arrow` |
| Read next element | `Down Arrow` (browse mode) |
| Read previous element | `Up Arrow` (browse mode) |

### Navigation

| Action | Command |
|--------|---------|
| Next interactive element | `Tab` |
| Previous interactive element | `Shift + Tab` |
| Next heading | `H` (browse mode) |
| Next link | `K` (browse mode) |
| Next form element | `F` (browse mode) |
| Next button | `B` (browse mode) |
| Open element list | `NVDA + F7` |

### Modes

NVDA has two modes:
- **Browse mode** (default) — reads page content, single-key shortcuts work
- **Forms mode** — activated automatically when you Tab into an input — single keys type characters instead

You can force-switch modes with `NVDA + Space`.

---

## Core VoiceOver commands (macOS)

The VoiceOver modifier key is `Control + Option` (abbreviated as VO).

| Action | Command |
|--------|---------|
| Start/stop reading | `VO + A` |
| Next element | `VO + Right Arrow` |
| Previous element | `VO + Left Arrow` |
| Next interactive element | `Tab` |
| Activate button/link | `VO + Space` |
| Open rotor | `VO + U` (then use arrow keys to navigate by headings, links, etc.) |

---

## What to test for each pattern

### All patterns

- [ ] Tab order is logical — matches visual reading order
- [ ] Every interactive element receives focus and is reachable by Tab
- [ ] Focused element is announced with a name, role, and (if applicable) value
- [ ] State changes are announced when they happen (e.g. expanded/collapsed)

### Color contrast patterns

Screen readers don't perceive color, so these patterns don't have direct screen reader implications. However:
- [ ] Verify the visual contrast is correct (use a browser extension like axe DevTools)
- [ ] Confirm any icons or graphics that communicate information have text alternatives

### Form label patterns

- [ ] Tabbing into each input announces the full label text
- [ ] Placeholder text is NOT used as the accessible name — it should be a hint, not a label
- [ ] Required fields are announced as "required" (via `required` attribute or `aria-required="true"`)
- [ ] Error messages are announced — either via `aria-live` or by moving focus to the error

### Focus management patterns (modals, dialogs)

1. Open the modal — focus must move inside the modal automatically
2. Tab through modal content — focus must not leave the modal (focus trap)
3. Press Escape — modal closes and focus returns to the trigger element
4. Verify the page behind the modal is NOT reachable by Tab while modal is open

### Keyboard navigation patterns (dropdowns, accordions)

1. Tab to the control — it's focusable
2. Press Enter or Space — control activates/opens
3. Use Arrow keys — navigate options
4. Press Escape — close without selecting
5. Make a selection — focus returns to the correct location

---

## Common screen reader bugs to watch for

**Announcing the wrong thing:**
A button reads "Button" instead of "Save changes, button". Cause: the `<button>` has no text and no `aria-label`.

**Announcing duplicate content:**
A link reads "Learn more Learn more". Cause: both visible text and an `aria-label` with the same text, or visible text and a title attribute.

**Not announcing state changes:**
Clicking a toggle reads nothing. Cause: state is communicated only with CSS (e.g. changing a class) with no ARIA update (`aria-checked`, `aria-expanded`, etc.).

**Focus trap failure:**
Tabbing in a modal eventually reaches page content behind it. Cause: focus trap not implemented, or implemented only for mouse users.

**Phantom focus:**
An element appears to have focus but the screen reader announces something else. Cause: visual focus via CSS is disconnected from actual DOM focus order.

---

## Testing checklist for PRs

Before opening a PR, check these manually with NVDA (Windows) or VoiceOver (macOS):

- [ ] `after/index.html` reads correctly from top to bottom in reading mode
- [ ] Tab order is correct
- [ ] All interactive elements have meaningful accessible names
- [ ] No silent state changes (all dynamic content is announced)
- [ ] Forms: all inputs labeled, errors announced
- [ ] Focus management: focus moves where it should, returns where it should
