# Lesson 03 — Repair a Broken Layout

> **Role:** Frontend Engineer · **Competency:** CSS Layout · **Track:** CSS · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      CSS-2010
TITLE:       The dashboard layout collapses and overflows on smaller screens
PRIORITY:    P2
TYPE:        Bug
DESCRIPTION: The Forge dashboard looks fine on the designer's huge monitor but
             collapses, overlaps, and overflows horizontally elsewhere.
             Diagnose the layout with the Elements panel and the box-model
             inspector, then fix it with modern layout — no magic numbers.

ACCEPTANCE CRITERIA:
  - You can read the box model (content, padding, border, margin) in DevTools
  - You can diagnose and fix common Flexbox/Grid layout failures
  - You understand the normal flow, block vs inline, and box-sizing
  - The layout is responsive and free of horizontal overflow
```

## 🏢 Business Context

Layout bugs are the most *visible* defects — they make a product look broken and untrustworthy even when every feature works. They're also where guesswork wastes the most time (adding random `margin` and `!important` until it "looks right"). DevTools lets you see exactly which box is misbehaving and why.

## 🎯 Learning Objectives

- Read and reason about the **box model** in the Elements panel
- Use `box-sizing: border-box` and understand why
- Diagnose and fix common **Flexbox** and **Grid** failures
- Build responsive layouts without fragile magic numbers

## 📚 Technical Deep Dive

**The box model.** Every element is a box: **content** → **padding** → **border** → **margin** (outermost). By default `width` sets the *content* width, so padding/border add on top — a frequent cause of unexpected overflow. The fix most teams apply globally:

```css
*, *::before, *::after { box-sizing: border-box; }  /* width now includes padding+border */
```

**Normal flow.** Block elements stack vertically and fill their container's width; inline elements flow horizontally. Layout systems (Flexbox, Grid) change how children are placed.

**Flexbox (one dimension).**

```css
.row { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
.row > .grow { flex: 1; }     /* grow to fill remaining space */
```

Common failures: forgetting `flex-wrap: wrap` (children overflow instead of wrapping); using fixed widths that don't add up; misusing `align-items` (cross axis) vs `justify-content` (main axis).

**Grid (two dimensions).**

```css
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
```

`minmax` + `auto-fit` gives responsive columns with no media queries and no magic numbers.

**Overflow.** Horizontal scrollbars usually mean a child is wider than its parent — a fixed width, an unbroken long string, or padding pushing past `100%` without `border-box`. The Elements box-model overlay shows you which box exceeds its container.

### Common gotchas
- Not using `border-box`, so `width: 100%` + padding overflows.
- Fighting layout with `!important` and magic pixel values.
- Confusing main-axis (`justify-content`) with cross-axis (`align-items`).
- A single long unbreakable string forcing horizontal overflow.

## 🧪 Hands-on Labs

Work through **`labs/lab-03-layout.md`**. You'll get a dashboard whose CSS has planted layout bugs (missing `border-box`, a non-wrapping flex row, a fixed-width sidebar that overflows, and an overflowing data cell). Using the Elements panel and box-model inspector, you'll diagnose each visually, fix with Flexbox/Grid, and verify responsiveness across widths.

## 🔍 Engineering Investigation

Open the broken dashboard. Use the box-model overlay to find the element causing horizontal overflow — *which* box exceeds its parent, and by how much? Toggle `box-sizing` in the Styles pane and watch the geometry change live. Record, for each layout bug, the box-model evidence that explains it.

## 🤖 AI Engineering Exercise

Describe a layout symptom to an AI and ask for a fix. **Verify** by toggling its suggestion live in DevTools before committing it — AIs frequently suggest `!important` or fixed widths that paper over the real cause. **Log** a case where the live DevTools experiment beat the AI's first answer.

## 📝 Assignment

Fix the layout so it is responsive from ~320px to wide desktop with no horizontal overflow and no magic numbers. Submit before/after screenshots at three widths, your box-model diagnosis for each bug, and the corrected CSS with comments explaining the fix.

## 🚀 Stretch Goal

Replace one fixed-breakpoint media query with an intrinsic responsive technique (`auto-fit`/`minmax`, `clamp()`), and explain why intrinsic layout is more robust than hard-coded breakpoints.

## ✅ Definition of Done

- [ ] Box model read and reasoned about from DevTools
- [ ] `box-sizing: border-box` applied and understood
- [ ] Flexbox/Grid failures diagnosed with evidence and fixed
- [ ] Layout responsive 320px → desktop, no horizontal overflow, no magic numbers

## 🪞 Reflection

How many of these bugs had you previously "fixed" by adding values until it looked right? What does seeing the box model change about that habit?
