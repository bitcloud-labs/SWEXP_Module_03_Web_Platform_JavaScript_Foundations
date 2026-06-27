# Lab 11 — Investigate the Browser Rendering Engine

**Goal:** stop scroll jank — recognize layout-triggering properties and batch reads before writes.

The janky scroll handler reads each row's `offsetHeight` (forces layout) and writes `style.top`
(invalidates layout) **interleaved**, per row, per scroll event — layout thrashing — and animates `top`,
which is itself a layout-triggering property. The fix is to **read all, then write all**, and animate with
`transform` (composite) instead of `top` (layout).

## What you do

In [`src/render.js`](src/render.js):

- `layoutTriggers(props)` — given an array of CSS property names, return only the ones that trigger
  **layout** when animated, in input order. Treat `top`, `left`, `right`, `bottom`, `width`, `height`,
  `margin`, `padding` as layout-triggering; treat `transform` and `opacity` as **not** (they're
  composite/paint-cheap). Anything else: not layout-triggering for this exercise.
- `scheduleUpdates(rows, measure, apply)` — the de-thrashed update. Given `rows`, a `measure(row)`
  function (a READ) and an `apply(row, measurement)` function (a WRITE), perform **all** reads first into
  an array, then **all** writes — never interleaving a write between two reads. Return the array of
  measurements (in row order) so the batching is observable.

## Definition of done

- All tests pass (`npx vitest run labs/lab-11-rendering`).
- In your LMS notebook: before/after Performance traces, the thrashing code identified, and the
  layout-triggering property named.

## Submit

Edit `src/`, run the tests, commit and push.
