# Lab 00 — Environment & the DevTools Panels

**Lesson:** 00 · **Goal:** working toolchain + fluency opening and reading each core DevTools panel.

## Goal
Verify your tools, serve a page locally, and record one finding from each DevTools panel.

## Setup
```bash
node --version      # confirm Node is installed
mkdir -p /tmp/swexp-l00 && cd /tmp/swexp-l00
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Forge Sample Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header><h1>Project Forge</h1></header>
  <main>
    <p>A sample page for DevTools practice.</p>
    <ul id="links">
      <li><a href="#a">Docs</a></li>
      <li><a href="#b">Status</a></li>
      <li><a href="#c">Support</a></li>
    </ul>
    <button id="ping">Ping</button>
    <p id="out"></p>
  </main>
  <script src="app.js" defer></script>
</body>
</html>
HTML
cat > styles.css <<'CSS'
body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.5; }
h1 { color: #1f6feb; }
button { padding: .5rem 1rem; }
CSS
cat > app.js <<'JS'
document.querySelector('#ping').addEventListener('click', () => {
  document.querySelector('#out').textContent = 'pong @ ' + new Date().toLocaleTimeString();
});
console.log('app.js loaded; links =', document.querySelectorAll('a').length);
JS
echo "Serve it:"; echo "  npx serve .    # or: python3 -m http.server 8000"
```

## Tasks
Open the served page (e.g. `http://localhost:3000`) and open DevTools (`F12`). For **each panel**, record one concrete finding:
1. **Elements:** find the `<h1>`; what color is applied, and from which CSS rule?
2. **Console:** read the `app.js` log; then type `document.title` and `document.querySelectorAll('a').length`.
3. **Network:** reload with cache disabled; how many requests, and what's the total transfer size? Which file is the document vs the stylesheet vs the script?
4. **Sources:** open `app.js`; set a breakpoint on the click handler; click **Ping** and confirm it pauses.
5. **Performance:** record a reload; find the first paint marker.
6. **(Stretch) Lighthouse:** run an audit; record the four category scores.

## Deliverable
One finding per panel (six total), your `node --version`/browser/editor note, and a 5–8 sentence "what the browser actually is" explainer in your own words.

## Cleanup
```bash
rm -rf /tmp/swexp-l00
```

## Check
`../solutions/lab-00-solution.md`.
