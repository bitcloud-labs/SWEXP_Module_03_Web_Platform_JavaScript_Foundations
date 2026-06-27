# Lab 04 — Investigate the JavaScript Runtime

**Lesson:** 04 · **Goal:** predict, confirm, and fix four runtime bugs (coercion, hoisting/loop-capture, closure shared-state, `this`).

## Goal
Build a precise model of the runtime by predicting buggy output, confirming with Node, then fixing from first principles — with tests proving the fix.

## Setup
```bash
mkdir -p /tmp/swexp-l04 && cd /tmp/swexp-l04
cat > gen.sh <<'GEN'
#!/usr/bin/env bash
set -e
cat > runtime.js <<'JS'
// BUG 1 — coercion: sums a list of "amounts" that arrive as strings
function total(amounts) {
  let sum = 0;
  for (const a of amounts) sum += a;   // string '+' concatenates!
  return sum;
}

// BUG 2 — var loop-capture: build click handlers that report their index
function makeHandlers(n) {
  const handlers = [];
  for (var i = 0; i < n; i++) {
    handlers.push(() => i);            // all closures share the same `i`
  }
  return handlers;
}

// BUG 3 — accidental shared state: a "fresh" counter factory
let sharedCount = 0;                    // shared across all counters!
function makeCounter() {
  return () => ++sharedCount;
}

// BUG 4 — `this` lost in a callback
const formatter = {
  prefix: '$',
  format(n) { return this.prefix + n; },
  formatAll(list) { return list.map(this.format); } // `this` is lost
};

module.exports = { total, makeHandlers, makeCounter, formatter };
JS

cat > runtime.test.js <<'JS'
const assert = require('assert');
const { total, makeHandlers, makeCounter, formatter } = require('./runtime.js');

// 1: numeric sum, even if inputs are numeric strings
assert.strictEqual(total([10, 20, 30]), 60, 'total of numbers');
assert.strictEqual(total(['10', '20', '30']), 60, 'total of numeric strings');

// 2: each handler reports its own index
const hs = makeHandlers(3);
assert.deepStrictEqual([hs[0](), hs[1](), hs[2]()], [0, 1, 2], 'handlers capture own index');

// 3: counters are independent
const a = makeCounter(), b = makeCounter();
assert.strictEqual(a(), 1); assert.strictEqual(a(), 2);
assert.strictEqual(b(), 1, 'second counter is independent');

// 4: formatAll keeps `this`
assert.deepStrictEqual(formatter.formatAll([1, 2]), ['$1', '$2'], 'this preserved in map');

console.log('ALL TESTS PASSED');
JS
echo "Files ready in /tmp/swexp-l04: runtime.js (buggy), runtime.test.js"
GEN
bash gen.sh
```

## Tasks
1. **Predict first.** For each function, write your predicted output in your notebook *before* running. E.g. `total(['10','20','30'])` → ?
2. **Confirm:** `node runtime.test.js` — it will fail, showing the gap between your model and reality.
3. **Fix from first principles** (don't trial-and-error):
   - BUG 1: coerce to number (`Number(a)` / unary `+`).
   - BUG 2: `var` → `let` so each iteration binds a fresh `i`.
   - BUG 3: move `count` *inside* the factory so each counter has private state (closure).
   - BUG 4: preserve `this` — `list.map(n => this.format(n))` or `list.map(this.format, this)` or `.bind`.
4. **Verify:** `node runtime.test.js` prints `ALL TESTS PASSED`.

## Deliverable
For each bug: predicted vs actual output, the root concept (coercion / hoisting / closure / `this`), and the fix. Plus a short "runtime rules I now follow" list, and the passing test output.

## Cleanup
```bash
rm -rf /tmp/swexp-l04
```

## Check
`../solutions/lab-04-solution.md`.
