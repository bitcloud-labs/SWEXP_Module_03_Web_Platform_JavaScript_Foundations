# Rendering Pipeline Guide

## The pixel pipeline
1. **DOM + CSSOM → render tree** (visible nodes + computed styles).
2. **Layout (reflow)** — compute geometry (position/size) of every box. **Expensive**; can cascade across the page.
3. **Paint** — fill pixels per layer (text, color, shadow, images). **Moderate**.
4. **Composite** — GPU assembles layers (translate/scale/opacity). **Cheap**.

## Cost ladder (what your change triggers)
| Change | Triggers |
|--------|----------|
| geometry: `width`, `height`, `top`, `margin`, font size | layout → paint → composite (most) |
| paint-only: `color`, `background`, `box-shadow` | paint → composite |
| `transform`, `opacity` | composite only (cheapest) |

Animate `transform`/`opacity` for smooth (often 60fps) motion.

## The frame budget
~16.7ms per frame at 60Hz. Work that overruns it drops frames (jank). The Performance panel shows long tasks and the layout/paint/composite breakdown.

## Layout thrashing (forced synchronous layout)
Reading a layout property (`offsetWidth/Height`, `getBoundingClientRect`, `getComputedStyle`) forces the browser to flush pending layout *now*. Interleaving reads and writes forces a reflow each iteration:
```js
// BAD: read forces layout, write invalidates it — repeat
for (const el of els) el.style.height = el.offsetHeight + 10 + 'px';
// GOOD: batch
const hs = els.map(el => el.offsetHeight);
els.forEach((el, i) => el.style.height = hs[i] + 10 + 'px');
```

## Fixing jank
- Batch reads, then writes (avoid forced sync layout).
- Animate `transform`/`opacity`, not geometry.
- Promote a layer with `will-change` **sparingly** (each layer costs memory).
- Virtualize long lists — render only visible rows so the render tree stays small.

## Seeing it
- **Performance**: purple = layout, green = paint; "forced reflow" warnings.
- **Rendering** tab: Paint flashing, Layout Shift regions, FPS meter.
