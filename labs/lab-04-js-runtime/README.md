# Lab 04 — Investigate the JavaScript Runtime

**Goal:** fix four runtime bugs from first principles — coercion, `var` loop-capture, shared state, `this`.

Predict each function's buggy output in your notebook *before* running, confirm the gap with the tests,
then fix the root cause (don't trial-and-error).

## What you do

In [`src/runtime.js`](src/runtime.js), fix four functions:

- `total(amounts)` — sum the amounts **numerically**, even when they arrive as numeric strings
  (`'+'` concatenates strings → coerce with `Number(a)` / unary `+`).
- `makeHandlers(n)` — return `n` functions where `handlers[i]()` returns `i`
  (`var` makes every closure share one `i` → use `let`).
- `makeCounter()` — each call returns an **independent** counter starting at 1
  (move the count *inside* the factory so each has private state).
- `formatter.formatAll(list)` — keep `this` so each item is prefixed
  (`list.map(this.format)` loses `this` → `n => this.format(n)`, `.map(this.format, this)`, or `.bind`).

## Definition of done

- All tests pass (`npx vitest run labs/lab-04-js-runtime`).
- In your LMS notebook: predicted vs actual output and the root concept for each bug, plus a short
  "runtime rules I now follow" list.

## Submit

Edit `src/`, run the tests, commit and push.
