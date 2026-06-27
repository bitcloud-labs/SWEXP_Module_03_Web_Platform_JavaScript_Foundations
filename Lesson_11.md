# Lesson 11 — Investigate the Browser Rendering Engine

> **Role:** Frontend Engineer · **Competency:** Browser Rendering Engine · **Track:** RENDER · **Est. time:** 4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      RENDER-6001
TITLE:       The list view stutters and drops frames while scrolling
PRIORITY:    P1
TYPE:        Performance
DESCRIPTION: Scrolling the customer list is janky — visibly stuttering. The
             code triggers repeated layout (reflow) on every frame and animates
             properties that force paint. Use the Performance and Rendering
             tools to see the rendering pipeline doing too much work, then fix
             it so scrolling is smooth.

ACCEPTANCE CRITERIA:
  - You can explain the rendering pipeline: DOM/CSSOM → render tree → layout → paint → composite
  - You can distinguish reflow (layout) from repaint from composite, by cost
  - You can identify layout thrashing and forced synchronous layout
  - You can fix jank by avoiding reflow and animating compositor-friendly properties
```

## 🏢 Business Context

Smoothness is a feature. Users perceive jank — dropped frames, stutter — as the product being low quality, even when it's functionally correct. The browser repaints up to 60 times a second; if your code makes the rendering pipeline redo expensive work every frame, you miss that budget (~16ms/frame). Understanding the pipeline is how you find and fix the cause instead of randomly removing code.

## 🎯 Learning Objectives

- Explain the rendering pipeline end to end and the per-frame budget
- Distinguish **reflow/layout**, **repaint**, and **composite** by cost
- Recognize **layout thrashing** (forced synchronous layout) in the Performance panel
- Fix jank by batching reads/writes and animating `transform`/`opacity`

## 📚 Technical Deep Dive

**The pixel pipeline** (recap + depth from L1):

1. **DOM + CSSOM → render tree** (visible nodes with computed styles).
2. **Layout (reflow)** — compute geometry: position and size of every box. **Expensive**; touching one element can reflow much of the page.
3. **Paint** — fill pixels for each layer (text, colors, shadows, images). **Moderately expensive**.
4. **Composite** — the GPU assembles painted layers (translate, scale, opacity). **Cheap**.

**Cost ladder.** Changing geometry (width, height, top, margin) triggers **layout → paint → composite** (most expensive). Changing paint-only properties (color, background, box-shadow) triggers **paint → composite**. Changing `transform` / `opacity` can be **composite-only** (cheapest) — which is why smooth animations use them.

**Layout thrashing (forced synchronous layout).** Reading a layout property (e.g. `offsetHeight`, `getBoundingClientRect`) forces the browser to flush pending layout *now*. Interleaving reads and writes in a loop forces a reflow every iteration:

```js
// THRASHING: read forces layout, write invalidates it, repeat → O(n) reflows
for (const el of items) {
  el.style.height = el.offsetHeight + 10 + 'px'; // read then write, every iteration
}
// BATCHED: read all first, then write all → 1 reflow
const heights = items.map(el => el.offsetHeight);
items.forEach((el, i) => { el.style.height = heights[i] + 10 + 'px'; });
```

**Fixing scroll jank.** Avoid per-frame layout reads/writes; animate with `transform`/`opacity` (composite-only); use `will-change` sparingly to promote a layer; and for long lists, render only what's visible (virtualization) so the render tree stays small.

**Seeing it.** The **Performance** panel records the main thread — purple = layout, green = paint; tall repeated blocks during scroll = the pipeline overworking. The **Rendering** tab's "Paint flashing" and "Layout Shift regions" make repaint/relayout visible live.

### Common gotchas
- Animating `top`/`left`/`width` (layout every frame) instead of `transform` (composite).
- Reading `offsetTop`/`getBoundingClientRect` inside a write loop (forced sync layout).
- Overusing `will-change`, creating too many layers and using more memory than it saves.

## 🧪 Hands-on Labs

Work through **`labs/lab-11-rendering.md`**. You'll get a list view that thrashes layout on scroll and animates `top`. Using the Performance and Rendering tools, you'll record the jank, identify the forced synchronous layout, batch reads/writes, switch the animation to `transform`, and re-record to show frames recovered.

## 🔍 Engineering Investigation

Record a Performance trace while scrolling the janky page. Find the long main-thread tasks and identify the layout (purple) work; confirm a forced synchronous layout warning if present. Use Paint flashing to see what repaints on scroll. After your fix, record again and quantify the improvement (fewer/shorter layout blocks, steadier frames). Evidence before and after.

## 🤖 AI Engineering Exercise

Ask an AI why the scroll is janky from a description. **Verify** against the Performance trace — AIs often suggest generic "debounce the scroll" advice when the real cause is layout thrashing the trace makes obvious. **Log** what the trace showed versus the AI's guess, and the fix the evidence pointed to.

## 📝 Assignment

Fix the jank and submit: the rendering pipeline explained with the cost ladder; before/after Performance traces; identification of the layout-thrashing code and the forced-layout property; and the change to compositor-friendly animation — with the evidence that scrolling is now smooth.

## 🚀 Stretch Goal

Implement basic **list virtualization** (render only visible rows) and explain, in pipeline terms, why a smaller render tree reduces layout and paint cost on every frame.

## ✅ Definition of Done

- [ ] Rendering pipeline and per-frame budget explained accurately
- [ ] Reflow vs repaint vs composite distinguished by cost
- [ ] Layout thrashing identified from a Performance trace
- [ ] Jank fixed (batched reads/writes, `transform`/`opacity`) with before/after evidence

## 🪞 Reflection

Now that you can see layout, paint, and composite, what does "cheap animation" mean concretely? Where had you been making the browser redo expensive work without realizing it?
