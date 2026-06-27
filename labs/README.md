# Labs — Web Platform & JavaScript Foundations

Hands-on labs for each lesson. They come in two flavors:

- **Node labs** (language, async, data, algorithms, API): runnable JavaScript with a generator that writes the buggy code and a test/benchmark harness. You run them with `node`.
- **Browser labs** (page load, DOM/form, layout, network journey, rendering): a small set of provided HTML/CSS/JS files you serve locally and investigate with **DevTools**. The point is reading the instruments, not just editing code.

Every lab follows the module ethos: **investigate first, optimize second** — gather evidence before you change anything.

## How to use a lab
1. Read the matching `Lesson_NN.md` first.
2. Run the **Setup** (a generator writes files into a throwaway folder, or you serve the provided page).
3. Work the **Tasks**, gathering evidence as you go.
4. Produce the **Deliverable** for your engineering notebook.
5. Check your reasoning against `solutions/lab-NN-solution.md`.

## Ground rules
- **Work in a throwaway directory.** Node generators build under `/tmp/swexp-*`; delete freely.
- **Serve over `http://localhost`, not `file://`** (modules, fetch, and many APIs require it): `npx serve .` or `python3 -m http.server 8000`.
- **Measure, don't assert.** Performance claims need before/after numbers or a DevTools trace.
- **Never claim a cause you haven't observed** in an instrument.

## Prerequisites
- A modern browser with DevTools (Chrome/Edge/Firefox).
- **Node.js** (`node --version`) — used for the language/perf/API labs.
- A local static server (`npx serve` or Python's `http.server`).

## Lab index
| # | Lab | Mode |
|---|-----|------|
| 0 | `lab-00-environment.md` | browser + node setup |
| 1 | `lab-01-page-load.md` | browser (DevTools Network/Performance) |
| 2 | `lab-02-login-form.md` | browser + node (logic tests) |
| 3 | `lab-03-layout.md` | browser (DevTools Elements) |
| 4 | `lab-04-js-runtime.md` | node (generator + tests) |
| 5 | `lab-05-modernize.md` | node (generator + tests) |
| 6 | `lab-06-async-eventloop.md` | node + browser |
| 7 | `lab-07-data-structures.md` | node (generator + benchmark) |
| 8 | `lab-08-search.md` | node (generator + benchmark) |
| 9 | `lab-09-http-rest.md` | node (local API) + browser |
| 10 | `lab-10-dns-tcp.md` | terminal tools + browser Timing |
| 11 | `lab-11-rendering.md` | browser (DevTools Performance/Rendering) |
