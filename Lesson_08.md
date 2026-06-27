# Lesson 08 — The Search Is Too Slow

> **Role:** Frontend Engineer · **Competency:** Algorithms & Complexity · **Track:** PERF · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      PERF-4015
TITLE:       Type-ahead search lags as the catalog grows
PRIORITY:    P2
TYPE:        Performance
DESCRIPTION: The product search re-scans and re-sorts the entire catalog on
             every keystroke, and recomputes the same expensive results
             repeatedly. Improve the algorithmic complexity (and stop redundant
             work) so search stays fast as the catalog grows. Measure it.

ACCEPTANCE CRITERIA:
  - You can reason about time complexity (Big-O) and identify the dominant cost
  - You can apply a better algorithm (e.g. binary search on sorted data, indexing)
  - You can eliminate redundant work with memoization/caching and debouncing
  - The improvement is shown with measurements, not assertions
```

## 🏢 Business Context

Search is the feature users touch most, and the one where slowness is most punishing — it happens on *every keystroke*. The difference between scanning everything each time and using the right algorithm is the difference between a snappy product and one that feels broken. Complexity analysis tells you *which* change will actually matter at scale.

## 🎯 Learning Objectives

- Analyze time complexity and find the dominant term
- Replace linear scans with better algorithms (binary search; pre-built indexes)
- Use **memoization** to avoid recomputation and **debouncing** to avoid redundant calls
- Validate improvements with measurements

## 📚 Technical Deep Dive

**Big-O, briefly.** Big-O describes how cost grows with input size *n*, keeping the dominant term:

| Complexity | Name | Example |
|------------|------|---------|
| O(1) | constant | Map/Set lookup |
| O(log n) | logarithmic | binary search |
| O(n) | linear | scanning an array |
| O(n log n) | linearithmic | a good sort |
| O(n²) | quadratic | nested loops |

Sorting once is O(n log n); scanning is O(n). If you **search many times**, paying O(n log n) once to sort, then O(log n) per search, beats O(n) per search.

**Binary search (sorted data, O(log n)):**

```js
function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
```

For prefix search (type-ahead), pre-build an index (e.g. sorted names, or a prefix map) once, then query it cheaply per keystroke.

**Memoization** caches results of pure, expensive functions by their arguments (a closure — L4):

```js
function memoize(fn) {
  const cache = new Map();
  return (arg) => cache.has(arg) ? cache.get(arg) : (cache.set(arg, fn(arg)), cache.get(arg));
}
```

**Debouncing** stops doing work on every keystroke — wait until typing pauses:

```js
function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
```

Debouncing reduces *how often* you run; better algorithms reduce *how expensive each run is*. Real search uses both, plus the right data structure (L7).

### Common gotchas
- Re-sorting the whole list on every keystroke (re-paying O(n log n) needlessly).
- Binary-searching unsorted data (it must be sorted first).
- Micro-optimizing an O(n²) hotspot instead of changing the algorithm.
- Caching an impure function (results depend on hidden state) — caches the wrong answer.

## 🧪 Hands-on Labs

Work through **`labs/lab-08-search.md`**. A Node harness implements search by re-scanning and re-sorting per query, with a benchmark. You'll add a pre-built sorted index + binary search, memoize an expensive scoring function, add debounce semantics, and measure each improvement against the baseline.

## 🔍 Engineering Investigation

Benchmark the baseline search at growing catalog sizes; identify the dominant cost (the per-keystroke sort? the linear scan?). Apply *one* change at a time and re-measure, attributing the speedup to the specific change. Record which optimization mattered most and why complexity analysis predicted it.

## 🤖 AI Engineering Exercise

Ask an AI to "make the search faster." **Verify** whether its suggestions reduce complexity or just shuffle constants, and confirm correctness (binary search only works on sorted input!). **Log** the measured impact of each suggestion and which one the Big-O analysis said would dominate.

## 📝 Assignment

Improve the search with a better algorithm + memoization + debouncing, preserving correctness. Submit: complexity analysis of baseline vs improved, before/after benchmarks at multiple sizes, and a note on which change had the biggest effect and why.

## 🚀 Stretch Goal

Build a simple prefix index (trie or sorted-prefix map) for type-ahead and compare its query complexity to repeated `filter(startsWith)`. Explain the space/time trade-off.

## ✅ Definition of Done

- [ ] Complexity analyzed; dominant cost identified
- [ ] A better algorithm applied correctly (sorted index / binary search)
- [ ] Memoization and debouncing applied appropriately
- [ ] Improvements shown with before/after measurements

## 🪞 Reflection

Which mattered more here: a smarter algorithm or doing the work less often? When would you reach for each, and how did the measurements settle it?
