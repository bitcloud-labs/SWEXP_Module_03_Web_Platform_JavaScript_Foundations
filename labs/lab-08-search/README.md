# Lab 08 — The Search Is Too Slow

**Goal:** lower the per-query cost — binary search on a pre-sorted array, plus memoization and debounce.

The slow search re-sorts the whole catalog on **every** query and then linear-scans it. In the LMS lab you
benchmark it growing with n. Here you implement the three improvements and prove them correct.

## What you do

In [`src/fast.js`](src/fast.js):

- `binarySearch(sorted, target)` — classic O(log n) loop over an **already-sorted** array. Return the
  index of `target`, or `-1` if absent. (It's fast only because the sort happens once, outside the
  per-query path.)
- `memoize(fn)` — return a wrapped function that caches results in a `Map` keyed by the (single, primitive)
  argument, so repeated identical calls skip the work and return the cached value.
- `debounce(fn, ms)` — return a function that delays calling `fn` until `ms` have passed since the **last**
  call; a burst of calls results in a single trailing call with the most recent arguments.

## Definition of done

- All tests pass (`npx vitest run labs/lab-08-search`).
- In your LMS notebook: baseline vs improved benchmarks and a note on which change mattered most and why
  Big-O predicted it.

## Submit

Edit `src/`, run the tests, commit and push.
