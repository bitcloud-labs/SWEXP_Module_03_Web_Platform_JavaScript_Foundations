# Lab 01 — Investigate How a Website Loads

**Goal:** read a Network waterfall, find what blocks first paint, and reason about the critical rendering path.

The LMS lab serves a deliberately render-blocking page and you measure FCP before/after a fix in the
Performance panel. Here you implement the **analysis** a browser engineer does in their head when reading
that waterfall: given the list of resources a page requested, which ones delay first paint, and what is
the critical rendering path?

## What you do

In [`src/load.js`](src/load.js), implement two functions over a list of resource entries (same shape as
Lab 00: `{ url, type, inHead, async, defer }`).

- `firstPaintBlockers(resources)` — return the **urls** of resources that block first paint, in input
  order. A stylesheet in `<head>` blocks. A script in `<head>` with neither `async` nor `defer` blocks.
  Nothing else blocks.
- `criticalPath()` — return the canonical critical-rendering-path steps as an array of strings, in order:
  `['HTML', 'DOM', 'CSSOM', 'Render Tree', 'Layout', 'Paint']`. (Knowing the pipeline by heart is the point.)

## Definition of done

- All tests pass (`npx vitest run labs/lab-01-page-load`).
- In your LMS notebook: the annotated waterfall, the four load milestones, and FCP before/after your fix
  (measured, not asserted).

## Submit

Edit `src/`, run the tests, commit and push.
