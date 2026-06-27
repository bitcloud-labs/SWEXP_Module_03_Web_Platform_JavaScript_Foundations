# Lab 11 — Investigate the Browser Rendering Engine

**Lesson:** 11 · **Goal:** record scroll jank, find the forced synchronous layout, fix with batched reads/writes + `transform`.

## Goal
See the rendering pipeline overworking on scroll in a Performance trace, then eliminate the jank and prove it with a second trace.

## Setup
```bash
mkdir -p /tmp/swexp-l11 && cd /tmp/swexp-l11
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Forge List (janky)</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; }
  #list { height: 100vh; overflow-y: scroll; }
  .row { padding: 12px 16px; border-bottom: 1px solid #eee; position: relative; }
  .badge { position: absolute; right: 16px; top: 8px; background: #1f6feb; color: white; padding: 2px 8px; border-radius: 8px; }
</style></head>
<body>
  <div id="list"></div>
  <script src="app.js"></script>
</body>
</html>
HTML
cat > app.js <<'JS'
// Build a long list
const list = document.getElementById('list');
for (let i = 0; i < 2000; i++) {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `Customer #${i} <span class="badge">VIP</span>`;
  list.appendChild(row);
}

// JANK: on every scroll, read each row's layout and write a style — interleaved read/write
// forces a synchronous layout (reflow) per row, per scroll event. Also animates `top` (layout).
const rows = [...document.querySelectorAll('.row')];
list.addEventListener('scroll', () => {
  rows.forEach((row) => {
    const h = row.offsetHeight;            // READ (forces layout)
    row.style.top = (h % 3) + 'px';        // WRITE (invalidates layout) → thrash + `top` triggers layout
  });
});
JS
echo "Serve it:  npx serve .   (open with DevTools Performance + Rendering)"
```

## Tasks
1. **Record the jank (evidence first).** Open Performance, start recording, scroll the list a few seconds, stop. Find the long main-thread tasks during scroll; identify the **layout (purple)** work. Look for a "forced reflow / forced synchronous layout" warning. In the **Rendering** tab, enable **Paint flashing** to see what repaints on scroll.
2. **Diagnose:** the scroll handler reads `offsetHeight` (forcing layout) and writes `style.top` (invalidating it) in the same loop — layout thrashing — and animates `top`, which is a layout-triggering property.
3. **Fix — batch reads then writes:**
   ```js
   list.addEventListener('scroll', () => {
     const heights = rows.map(r => r.offsetHeight);          // READ all first
     rows.forEach((r, i) => { r.style.transform = `translateY(${heights[i] % 3}px)`; }); // WRITE all (transform = composite)
   });
   ```
   (Better still: don't touch per-row layout on scroll at all — and for 2000 rows, consider **virtualization**, the stretch goal.)
4. **Re-record** and compare: fewer/shorter purple layout blocks, steadier frame rate, less paint flashing.

## Deliverable
The rendering pipeline + cost ladder in your words; before/after Performance traces; identification of the thrashing code and the layout-triggering property; and the fix (batched reads/writes, `transform` instead of `top`) with evidence scrolling is now smooth.

## Cleanup
```bash
rm -rf /tmp/swexp-l11
```

## Check
`../solutions/lab-11-solution.md`.
