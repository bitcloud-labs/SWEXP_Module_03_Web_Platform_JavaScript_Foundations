# Lab 01 — Investigate How a Website Loads

**Lesson:** 01 · **Goal:** read a Network waterfall, find render-blocking resources, measure a fix.

## Goal
Capture the critical-rendering-path evidence for a deliberately render-blocking page, then improve first paint and measure the change.

## Setup
```bash
mkdir -p /tmp/swexp-l01 && cd /tmp/swexp-l01
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Forge Landing (slow first paint)</title>
  <!-- render-blocking stylesheet -->
  <link rel="stylesheet" href="big.css">
  <!-- render-blocking script in <head> with NO defer/async: blocks HTML parsing -->
  <script src="blocking.js"></script>
</head>
<body>
  <h1>Welcome to Project Forge</h1>
  <p>Hero copy the user is waiting to see.</p>
  <img src="hero.svg" width="600" height="200" alt="hero">
</body>
</html>
HTML
# a large-ish CSS file (render-blocking)
node -e "let s='';for(let i=0;i<4000;i++)s+='.c'+i+'{color:#'+(i%9)+''+(i%9)+''+(i%9)+';padding:'+(i%5)+'px}\n';require('fs').writeFileSync('big.css','body{font-family:sans-serif;margin:2rem}h1{color:#1f6feb}\n'+s)"
# a slow blocking script (busy-wait to simulate parse/execute cost)
cat > blocking.js <<'JS'
var t = Date.now(); while (Date.now() - t < 400) {}   // 400ms of blocking work in <head>
console.log('blocking.js finished (blocked parsing for ~400ms)');
JS
cat > hero.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="200"><rect width="600" height="200" fill="#1f6feb"/><text x="20" y="110" fill="white" font-size="28">Forge</text></svg>
SVG
echo "Serve it:  npx serve .   (open with DevTools Network + Performance)"
```

## Tasks
1. **Baseline evidence (investigate first):** in the Network panel with **cache disabled**, reload and record: document TTFB, which resources are **render-blocking**, and the time of **FCP** vs **load** (Performance panel shows paint markers).
2. **Identify the bottleneck** from the data — is first paint delayed by the blocking `<script>` in `<head>`, the large CSS, or the image? State the evidence.
3. **Apply fixes and re-measure** (one change at a time): add `defer` to the script (or move it to end of `<body>`); confirm HTML parsing/first paint no longer waits on it. Optionally split/trim the CSS. Record FCP before vs after.
4. **(Stretch)** Use the Coverage tab to quantify unused CSS.

## Deliverable
The critical rendering path in order; the annotated waterfall + the four load milestones with values; an evidence-based statement of the bottleneck; and FCP before/after your fix (measured, not asserted).

## Cleanup
```bash
rm -rf /tmp/swexp-l01
```

## Check
`../solutions/lab-01-solution.md`.
