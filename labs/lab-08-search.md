# Lab 08 — The Search Is Too Slow

**Lesson:** 08 · **Goal:** replace per-keystroke rescans with a pre-built sorted index + binary search, add memoization and debounce, and measure.

## Goal
Lower the *per-query* complexity (and stop redundant work) so search scales, proving each change with the benchmark.

## Setup
```bash
mkdir -p /tmp/swexp-l08 && cd /tmp/swexp-l08
cat > gen.sh <<'GEN'
#!/usr/bin/env bash
set -e
cat > catalog.js <<'JS'
function makeCatalog(n) {
  return Array.from({ length: n }, (_, i) => 'product-' + String(i).padStart(6, '0'));
}
module.exports = { makeCatalog };
JS

cat > slow.js <<'JS'
// SLOW: re-sorts the WHOLE catalog on every query, then linear-scans for an exact match
function searchSlow(catalog, term) {
  const sorted = [...catalog].sort();          // O(n log n) EVERY call — wasteful
  return sorted.findIndex(x => x === term);     // O(n) scan
}
// An "expensive" pure scoring function called repeatedly with the same args
function score(term) {
  let s = 0;
  for (let i = 0; i < 200000; i++) s += (term.charCodeAt(i % term.length) * i) % 7;
  return s;
}
module.exports = { searchSlow, score };
JS

cat > fast.js <<'JS'
// TODO: binary search on a PRE-SORTED array (sort once, outside the per-query path)
function binarySearch(sorted, target) {
  // implement O(log n) search; return index or -1
  throw new Error('not implemented');
}
// TODO: wrap `score` so repeated identical args are cached (memoization)
function memoize(fn) {
  throw new Error('not implemented');
}
module.exports = { binarySearch, memoize };
JS

cat > bench.js <<'JS'
const { makeCatalog } = require('./catalog.js');
const { searchSlow, score } = require('./slow.js');
let fast = {}; try { fast = require('./fast.js'); } catch {}
function time(label, fn) { const t = process.hrtime.bigint(); fn(); console.log(label.padEnd(26), (Number(process.hrtime.bigint() - t) / 1e6).toFixed(1) + ' ms'); }
const QUERIES = 50;
for (const n of [5000, 20000, 80000]) {
  const catalog = makeCatalog(n);
  const terms = Array.from({ length: QUERIES }, (_, i) => 'product-' + String((i * 137) % n).padStart(6, '0'));
  console.log('\n=== n =', n, '(', QUERIES, 'queries) ===');
  time('searchSlow (sort+scan/qry)', () => terms.forEach(t => searchSlow(catalog, t)));
  if (fast.binarySearch) {
    const sortedOnce = [...catalog].sort();           // pay sort ONCE
    time('binarySearch (sorted once)', () => terms.forEach(t => fast.binarySearch(sortedOnce, t)));
  }
}
// memoization demo: same term 20 times
console.log('\n=== memoization ===');
time('score x20 (no memo)', () => { for (let i = 0; i < 20; i++) score('product-000042'); });
if (fast.memoize) { const m = fast.memoize(score); time('score x20 (memoized)', () => { for (let i = 0; i < 20; i++) m('product-000042'); }); }
JS
echo "Files in /tmp/swexp-l08: catalog.js, slow.js, fast.js (TODO), bench.js"
GEN
bash gen.sh
```

## Tasks
1. **Baseline:** `node bench.js`. Note how `searchSlow` grows with n (it re-sorts every query) and how `score x20` is ~20× one call.
2. **Implement `fast.js`:**
   - `binarySearch(sorted, target)` — classic O(log n) loop (see Lesson 8 deep dive). Works only because the array is sorted *once* outside the per-query path.
   - `memoize(fn)` — a `Map` cache keyed by the argument (a closure).
3. **Re-measure.** Binary search on the pre-sorted array should be dramatically faster across sizes; memoized `score x20` should cost ~1 call.
4. **Debounce (concept + code):** add the `debounce(fn, ms)` from the lesson; explain in your notebook how it reduces *how often* search runs versus how *expensive* each run is.

## Deliverable
Complexity analysis (baseline vs improved), before/after benchmarks at all sizes, your `fast.js`, the debounce snippet, and a note on which change mattered most and why Big-O predicted it.

## Cleanup
```bash
rm -rf /tmp/swexp-l08
```

## Check
`../solutions/lab-08-solution.md`.
