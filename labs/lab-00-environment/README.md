# Lab 00 — Environment & the DevTools Panels

**Goal:** a working toolchain, plus fluency reading what each DevTools panel tells you.

In the LMS lesson you serve a small page locally and record one finding from each DevTools panel
(Elements, Console, Network, Sources, Performance, Lighthouse). That hands-on investigation can't be
autograded, but the **judgement** behind reading a Network entry can: given the data DevTools shows for
one resource, can you classify it correctly?

## What you do

In [`src/devtools.js`](src/devtools.js), implement `analyzeResource(entry)`. An `entry` is one row of the
Network panel:

```js
{ url: 'big.css', type: 'stylesheet', inHead: true, async: false, defer: false, transferBytes: 120000 }
```

Return a summary object:

- `kind` — the resource category: `'document' | 'stylesheet' | 'script' | 'image' | 'other'`, taken from
  `type` (anything not in that set is `'other'`).
- `renderBlocking` — `true` when this resource blocks first paint. A **stylesheet** in `<head>` is
  render-blocking. A **script** is render-blocking only when it is in `<head>` **and** has neither
  `async` nor `defer`. Documents, images, and everything else are not render-blocking.
- `transferKb` — `transferBytes / 1024`, rounded to one decimal place.

## Definition of done

- All tests pass (`npx vitest run labs/lab-00-environment`).
- In your LMS notebook, record your six panel findings and a 5–8 sentence "what the browser actually is"
  explainer.

## Submit

Edit `src/`, run the tests, commit and push.
