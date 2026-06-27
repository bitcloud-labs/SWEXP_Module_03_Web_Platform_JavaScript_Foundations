# Lesson 01 — Investigate How a Website Loads

> **Role:** Frontend Engineer · **Competency:** Page Load & the Critical Rendering Path · **Track:** WEB · **Est. time:** 3 hours

---

## 🎫 Engineering Ticket

```
TICKET:      WEB-1010
TITLE:       Explain why the Forge marketing page is slow to first paint
PRIORITY:    P2
TYPE:        Investigation
DESCRIPTION: Customers report the landing page "takes a while before anything
             shows up." Before anyone changes code, produce an evidence-based
             account of exactly what the browser does between the URL and the
             first painted pixels, and where the time goes.

ACCEPTANCE CRITERIA:
  - You can describe the critical rendering path: HTML → DOM, CSS → CSSOM, render tree, layout, paint
  - You can read a Network waterfall and identify render-blocking resources
  - You can distinguish key load milestones (TTFB, FCP, LCP, DOMContentLoaded, load)
  - An investigation report explains the slow first paint with evidence
```

## 🏢 Business Context

First impressions are measured in milliseconds. Users abandon pages that paint slowly, and search ranking depends on load metrics (Core Web Vitals). But "make it faster" is meaningless without understanding *what* the browser is doing and *which* step is the bottleneck. This lesson builds the mental model the rest of the module sharpens.

## 🎯 Learning Objectives

- Trace the **critical rendering path** from bytes to pixels
- Identify render-blocking CSS and JavaScript
- Read a Network waterfall (queuing, TTFB, download, dependencies)
- Define and locate FCP, LCP, DOMContentLoaded, and load

## 📚 Technical Deep Dive

**The critical rendering path.** To show pixels the browser must:

1. **Parse HTML → DOM** (the document object model: a tree of nodes).
2. **Parse CSS → CSSOM** (the styling model). CSS is **render-blocking** — the browser won't paint until it has the CSSOM.
3. **Build the render tree** (DOM + CSSOM, minus non-visual nodes).
4. **Layout / reflow** — compute the geometry (size, position) of every box.
5. **Paint** — fill in pixels (text, colors, images, borders).
6. **Composite** — assemble layers to the screen.

**Render-blocking resources.** A `<link rel="stylesheet">` in `<head>` blocks rendering until downloaded and parsed. A plain `<script>` in `<head>` blocks HTML parsing while it downloads and executes. Two fixes you'll recognize everywhere:

| Attribute | Effect on a `<script>` |
|-----------|------------------------|
| (none) | parsing pauses; script downloads + runs immediately — blocking |
| `defer` | downloads in parallel; runs after HTML is parsed, in order — non-blocking |
| `async` | downloads in parallel; runs as soon as ready, order not guaranteed |

**The Network waterfall.** Each request is a bar: time spent *queued*, then **TTFB** (time to first byte — server think time), then content download. Bars that start late because they were *discovered* late (e.g. a CSS file that references a font) reveal dependency chains.

**Load milestones:**

| Metric | Meaning |
|--------|---------|
| TTFB | first byte arrives from the server |
| FCP (First Contentful Paint) | first text/image painted |
| LCP (Largest Contentful Paint) | largest element painted (a Core Web Vital) |
| DOMContentLoaded | HTML parsed, deferred scripts run (DOM ready) |
| load | all subresources (images, etc.) finished |

### Common gotchas
- Assuming "slow" means a slow server when it's actually render-blocking CSS/JS.
- Confusing DOMContentLoaded (DOM ready) with load (everything done).
- Optimizing a resource that isn't on the critical path.

## 🧪 Hands-on Labs

Work through **`labs/lab-01-page-load.md`**. You'll serve a provided page deliberately burdened with render-blocking resources, record its waterfall and paint milestones in DevTools, then apply `defer`/async and reordering and measure the improvement — evidence first, change second.

## 🔍 Engineering Investigation

In the Network panel (with cache disabled), reload the lab page and identify: the TTFB of the document, which resources are render-blocking, and the time of FCP vs load. In the Performance panel, find the **first paint** marker. Write down *which* resource is delaying first paint and the evidence that says so — not a guess.

## 🤖 AI Engineering Exercise

Paste your waterfall observations to an AI and ask it to explain the bottleneck. **Verify** its explanation against the actual timings (AIs love to blame "large images" even when the data shows render-blocking CSS). **Log** where it was right and where the evidence contradicted it. Evidence outranks the confident answer.

## 📝 Assignment

Produce an **investigation report**: a labeled description of the critical rendering path for the lab page, an annotated screenshot/notes of the waterfall, the four load milestones with values, and a one-paragraph evidence-based explanation of the slow first paint plus the single change you'd make first.

## 🚀 Stretch Goal

Use the Coverage tab to find unused CSS/JS on the page, and explain how dead code on the critical path hurts first paint even when it "does nothing."

## ✅ Definition of Done

- [ ] Critical rendering path described accurately, in order
- [ ] Render-blocking resources identified from the waterfall
- [ ] FCP, LCP, DOMContentLoaded, load located with values
- [ ] Evidence-based explanation of the slow first paint
- [ ] Improvement measured after a change, not just asserted

## 🪞 Reflection

Before this lesson, what did you imagine happened between typing a URL and seeing the page? Where was your mental model wrong, and what does that change about how you'd debug "slow"?
