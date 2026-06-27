# Lab 07 — Optimize Customer Data

**Lesson:** 07 · **Goal:** turn O(n²) array scans into O(n) with a Map index and a Set dedup, and measure it.

## Goal
See O(n²) vs O(n) in real numbers, then fix the join and dedup with the right data structures.

## Setup
```bash
mkdir -p /tmp/swexp-l07 && cd /tmp/swexp-l07
cat > gen.sh <<'GEN'
#!/usr/bin/env bash
set -e
cat > data.js <<'JS'
// Generate N customers and ~N orders referencing them
function makeData(n) {
  const customers = Array.from({ length: n }, (_, i) => ({ id: i, name: 'Cust' + i }));
  const orders = Array.from({ length: n }, (_, i) => ({ id: i, customerId: (i * 7) % n, total: i }));
  return { customers, orders };
}
module.exports = { makeData };
JS

cat > slow.js <<'JS'
// SLOW: linear find() inside a loop  → O(orders × customers)
function joinSlow(customers, orders) {
  return orders.map(o => ({ ...o, customer: customers.find(c => c.id === o.customerId) }));
}
// SLOW: includes() inside filter → O(n²) dedup
function dedupSlow(values) {
  const out = [];
  for (const v of values) if (!out.includes(v)) out.push(v);
  return out;
}
module.exports = { joinSlow, dedupSlow };
JS

cat > fast.js <<'JS'
// TODO (you implement): O(customers + orders) using a Map index
function joinFast(customers, orders) {
  // const byId = new Map(...);  return orders.map(...)
  throw new Error('not implemented');
}
// TODO (you implement): O(n) dedup using a Set
function dedupFast(values) {
  throw new Error('not implemented');
}
module.exports = { joinFast, dedupFast };
JS

cat > bench.js <<'JS'
const { makeData } = require('./data.js');
const { joinSlow, dedupSlow } = require('./slow.js');
let fast = {};
try { fast = require('./fast.js'); } catch {}
function time(label, fn) { const t = process.hrtime.bigint(); const r = fn(); const ms = Number(process.hrtime.bigint() - t) / 1e6; console.log(label.padEnd(22), ms.toFixed(1) + ' ms'); return r; }
for (const n of [1000, 5000, 20000]) {
  const { customers, orders } = makeData(n);
  const dupes = Array.from({ length: n }, (_, i) => i % (n / 10 | 0 || 1));
  console.log('\n=== n =', n, '===');
  time('joinSlow', () => joinSlow(customers, orders));
  time('dedupSlow', () => dedupSlow(dupes));
  if (fast.joinFast) { try { time('joinFast', () => fast.joinFast(customers, orders)); time('dedupFast', () => fast.dedupFast(dupes)); } catch (e) { console.log('fast not implemented yet'); } }
}
JS
echo "Files in /tmp/swexp-l07: data.js, slow.js, fast.js (TODO), bench.js"
GEN
bash gen.sh
```

## Tasks
1. **Measure the baseline:** `node bench.js`. Record `joinSlow`/`dedupSlow` at n = 1000, 5000, 20000. How does the time grow as n grows (roughly ×4 each step → that's quadratic)?
2. **Implement `fast.js`:**
   - `joinFast`: build `const byId = new Map(customers.map(c => [c.id, c]))` once, then `orders.map(o => ({ ...o, customer: byId.get(o.customerId) }))`.
   - `dedupFast`: `return [...new Set(values)]` (or a Set + filter).
3. **Re-measure:** `node bench.js` and compare. The fast versions should grow roughly linearly.
4. **Verify correctness:** the fast outputs must match the slow outputs (same joined data, same unique set/order semantics you intend).

## Deliverable
Before/after timings at all three sizes, the complexity analysis (O(n²) → O(n) for each), your `fast.js`, and a note on why a Map/Set was the right structure.

## Cleanup
```bash
rm -rf /tmp/swexp-l07
```

## Check
`../solutions/lab-07-solution.md`.
