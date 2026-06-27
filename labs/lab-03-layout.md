# Lab 03 — Repair a Broken Layout

**Lesson:** 03 · **Goal:** diagnose layout bugs with the Elements box-model inspector and fix with modern CSS (no magic numbers).

## Goal
Find *which* box misbehaves and *why* using DevTools, then fix the layout so it's responsive with no horizontal overflow.

## Setup
```bash
mkdir -p /tmp/swexp-l03 && cd /tmp/swexp-l03
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Forge Dashboard (broken layout)</title>
<link rel="stylesheet" href="styles.css"></head>
<body>
  <header class="topbar"><h1>Forge Dashboard</h1></header>
  <div class="shell">
    <aside class="sidebar">
      <nav><a href="#">Overview</a><a href="#">Orders</a><a href="#">Customers</a><a href="#">Settings</a></nav>
    </aside>
    <main class="content">
      <div class="cards">
        <section class="card"><h2>Revenue</h2><p>$1,240,005.77</p></section>
        <section class="card"><h2>Orders</h2><p>3,418</p></section>
        <section class="card"><h2>Customers</h2><p>9,902</p></section>
        <section class="card"><h2>Token</h2><p class="data">ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOP</p></section>
      </div>
    </main>
  </div>
</body>
</html>
HTML
cat > styles.css <<'CSS'
/* BUG 1: no border-box — widths + padding overflow their containers */
* { margin: 0; }
body { font-family: system-ui, sans-serif; }
.topbar { background: #1f6feb; color: white; padding: 1rem; }

/* BUG 2: a flex row that does NOT wrap — children overflow on narrow screens */
.shell { display: flex; }

/* BUG 3: fixed-width sidebar (with padding, no border-box) overflows small viewports */
.sidebar { width: 320px; padding: 1rem; background: #f0f3f7; }
.sidebar nav { display: flex; flex-direction: column; gap: .5rem; }

.content { padding: 1rem; }

/* BUG 2 (cont.): card row uses fixed widths that don't add up; no wrap */
.cards { display: flex; }
.card { width: 300px; padding: 1rem; margin: .5rem; background: white; border: 1px solid #ddd; }

/* BUG 4: long unbreakable string forces horizontal overflow of its cell */
.data { font-family: monospace; }
CSS
echo "Serve it:  npx serve .   (open with DevTools Elements + device toolbar)"
```

## The planted bugs
1. **No `box-sizing: border-box`** — `width` excludes padding/border, so padded boxes exceed their declared width.
2. **Non-wrapping flex** — `.shell` and `.cards` don't wrap, so children overflow horizontally on narrow viewports.
3. **Fixed-width sidebar** — `width: 320px` + padding (without border-box) overflows small screens instead of adapting.
4. **Unbreakable string** — the long token string in `.data` can't wrap and pushes its card wider than the viewport.

## Tasks
1. **Investigate first.** Open the device toolbar, set width ~375px. Use the **box-model overlay** in Elements to find which box exceeds its parent (and by how much). For each bug, record the box-model evidence.
2. **Fix 1:** add `*, *::before, *::after { box-sizing: border-box; }`. Watch geometry change live.
3. **Fix 2:** `flex-wrap: wrap` on `.shell`/`.cards`, or move `.cards` to Grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;`.
4. **Fix 3:** make the sidebar flexible (`flex: 0 0 260px` that can shrink, or let it become full-width above the content on narrow screens).
5. **Fix 4:** allow the string to wrap (`overflow-wrap: anywhere` / `word-break: break-word`).
6. **Verify:** no horizontal scrollbar from ~320px to wide desktop; no magic numbers fighting the layout.

## Deliverable
Before/after screenshots at three widths (~320, ~768, wide), your box-model diagnosis for each bug, and the corrected CSS with comments explaining each fix.

## Cleanup
```bash
rm -rf /tmp/swexp-l03
```

## Check
`../solutions/lab-03-solution.md`.
