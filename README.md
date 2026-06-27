# SWEXP Module 03 — Web Platform: JavaScript Foundations · Starter Workspace

This repo is your **work-along workspace** for Module 03. The lessons live in the LMS; here you do the
labs and the capstone: open an exercise, read its `README.md`, implement the `// TODO`s in its `src/`,
run the tests, and submit.

> **The tests are the spec.** Each exercise's `tests/` describes exactly what your code must do — make
> them pass without weakening the logic. No answer keys are shipped.

The module is about the web platform and the JavaScript runtime: how a page loads, the DOM and events,
the JS runtime (coercion, closures, `this`), modern ES6+, the event loop and async, data-structure
complexity, HTTP/REST, the network journey, and the rendering pipeline. The lessons lean on browser
DevTools; this workspace distills each lab's **autogradable core** — pure functions and DOM behaviour
(via `jsdom`) you can assert deterministically — so you get red→green feedback while you learn.

## Quick start

```bash
npm install            # one time (already done in your LMS code-server workspace)
npm test               # run every exercise's tests
npm run grade          # your score + per-exercise breakdown (what CI reports)
```

Run a single exercise while you work on it:

```bash
npx vitest run labs/lab-04-js-runtime       # or any folder below
npx vitest watch labs/lab-04-js-runtime     # re-run on save
```

## Exercises

| Exercise | Folder | You implement |
| --- | --- | --- |
| Lab 00 — Environment & DevTools | `labs/lab-00-environment` | `analyzeResource` — read a Network entry, classify render-blocking |
| Lab 01 — How a website loads | `labs/lab-01-page-load` | `firstPaintBlockers` / `criticalPath` over a resource list |
| Lab 02 — Debug a login form | `labs/lab-02-login-form` | `validate` + wire the form (jsdom: selector/event/preventDefault) |
| Lab 03 — Repair a layout | `labs/lab-03-layout` | `auditLayout` — flag the four CSS box-model bugs |
| Lab 04 — JS runtime | `labs/lab-04-js-runtime` | fix coercion / loop-capture / shared-state / `this` |
| Lab 05 — Modernize the codebase | `labs/lab-05-modernize` | ES6+ utils, behaviour-preserving (`\|\|` vs `??` trap) |
| Lab 06 — Async & the event loop | `labs/lab-06-async-eventloop` | `eventLoopOrder`; callbacks → `async/await`; `chunk` to yield |
| Lab 07 — Optimize customer data | `labs/lab-07-data-structures` | `joinFast` (Map) + `dedupFast` (Set), O(n) |
| Lab 08 — Search is too slow | `labs/lab-08-search` | `binarySearch` + `memoize` + `debounce` |
| Lab 09 — HTTP & REST | `labs/lab-09-http-rest` | fix a `fetch` client that treats 4xx/5xx as success |
| Lab 10 — DNS, TCP/IP journey | `labs/lab-10-dns-tcp` | `parseCurlTiming` + `attributeSlowness` to a layer |
| Lab 11 — Rendering engine | `labs/lab-11-rendering` | `layoutTriggers` guard + batched read/write `scheduleUpdates` |
| Capstone — Web Diagnostics | `assignments/capstone` | integrate the fixes into one diagnostics toolkit |

Each folder is self-contained: a `README.md` (the brief), `src/` (starter code with `// TODO`s), and
`tests/` (the spec). Reference cheatsheets are in [`resources/`](resources/).

## How grading & submission work

- Every exercise contributes behaviour tests (`*.test.js`), run in Node or — for DOM labs — `jsdom`.
  `npm run grade` reports a per-exercise score.
- **Submit** by committing your changes and pushing (or opening a pull request). The **Autograde** GitHub
  Action runs the same grader, posts your score to the run summary, and comments it on any PR.
- You're done when the score is **100%**.

## The rules of this module

- **Investigate first, optimize second** — read the instrument, localize the problem to the right layer,
  fix the *cause*, prove the fix.
- **Never claim a cause you haven't observed.** Where AI's confident explanation meets the evidence,
  the evidence wins.
- Fix from first principles — understand *why* (coercion, closures, the event loop, Big-O), don't
  trial-and-error.
