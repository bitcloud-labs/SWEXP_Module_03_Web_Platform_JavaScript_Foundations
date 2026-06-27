# Performance Checklist

Measure first (DevTools), change one thing, measure again. Never assert an improvement you didn't measure.

## Load (critical rendering path)
- [ ] Minimize render-blocking resources; `defer`/`async` scripts; move non-critical JS out of `<head>`.
- [ ] Keep critical CSS small; remove unused CSS/JS (Coverage tab).
- [ ] Watch FCP/LCP; ensure the largest element isn't blocked.
- [ ] Right-size and lazy-load images; set width/height to avoid layout shift.

## Runtime (the main thread)
- [ ] No long synchronous tasks; chunk or offload heavy compute (Worker).
- [ ] Don't block input/paint; keep handlers fast.
- [ ] Avoid unnecessary work on every event (debounce/throttle).

## Data & algorithms
- [ ] Right structure for the access pattern (Map/Set for lookups & membership).
- [ ] No lookup-in-a-loop O(n²); build an index once.
- [ ] Better algorithm for repeated work (sort once + binary search; memoize pure functions).

## Rendering
- [ ] Animate `transform`/`opacity` (composite), not `top`/`width`/`height` (layout).
- [ ] Batch DOM reads then writes; avoid forced synchronous layout (reading `offsetHeight` mid-write-loop).
- [ ] Virtualize long lists; keep the render tree small.
- [ ] Use `will-change` sparingly.

## Verify
- [ ] Before/after numbers (timings, FCP/LCP) or DevTools traces accompany every claim.
