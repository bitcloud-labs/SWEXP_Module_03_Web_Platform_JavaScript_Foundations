# Lesson 07 — Optimize Customer Data

> **Role:** Frontend Engineer · **Competency:** Data Structures · **Track:** PERF · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      PERF-4001
TITLE:       Customer lookups and dedup are slow on large datasets
PRIORITY:    P2
TYPE:        Performance
DESCRIPTION: A screen that joins customers to their orders gets sluggish as the
             dataset grows. The code does repeated linear scans of arrays and a
             nested-loop deduplication. Choose the right data structures so the
             same work scales, and prove the improvement with measurements.

ACCEPTANCE CRITERIA:
  - You can choose between Array, Object, Map, and Set by access pattern
  - You can turn repeated O(n) lookups into O(1) with a Map/Set index
  - You can replace an O(n²) operation with an O(n) one
  - The improvement is demonstrated with before/after measurements
```

## 🏢 Business Context

The same feature can feel instant or sluggish depending entirely on the data structures behind it — and the gap *widens* as data grows. A nested-loop join that's fine for 100 rows is unusable at 100,000. Picking the right structure is one of the highest-leverage, lowest-effort performance wins a frontend engineer can make.

## 🎯 Learning Objectives

- Compare Array, Object, Map, and Set by their access characteristics
- Build an **index** (Map/Set) to convert repeated linear lookups to constant time
- Replace nested-loop (O(n²)) operations with single-pass (O(n)) ones
- Measure and compare performance empirically

## 📚 Technical Deep Dive

**Pick the structure for the access pattern:**

| Structure | Strength | Typical lookup |
|-----------|----------|----------------|
| Array | ordered list, iteration, index access | `find`/`includes` scan = O(n) |
| Object | string-keyed records | key access ≈ O(1) (string keys only) |
| Map | any-type keys, ordered, sized | `get`/`has` ≈ O(1) |
| Set | unique membership | `has` ≈ O(1) |

**The lookup-in-a-loop trap.** Looking up each order's customer with `customers.find(...)` inside a loop over orders is O(n·m) — every order rescans the whole customer array:

```js
// slow: O(orders × customers)
orders.map(o => ({ ...o, customer: customers.find(c => c.id === o.customerId) }));
```

Build an index once (O(n)), then each lookup is O(1):

```js
// fast: O(customers + orders)
const byId = new Map(customers.map(c => [c.id, c]));
orders.map(o => ({ ...o, customer: byId.get(o.customerId) }));
```

**Dedup with a Set.** Nested-loop "is this already in the result?" is O(n²); a Set makes membership O(1):

```js
// slow O(n²): result.includes(x) rescans result each time
// fast O(n):
const seen = new Set();
const unique = items.filter(x => !seen.has(x) && seen.add(x));
// or simply: [...new Set(items)]
```

**Object vs Map.** Use a plain object for simple string-keyed records; use a `Map` when keys aren't strings, when you insert/delete a lot, or when you need reliable size/iteration order. Don't use an array's `indexOf` where a Set's `has` belongs.

### Common gotchas
- `array.find`/`includes` inside a loop — the hidden O(n²).
- Using an object with non-string keys (they're coerced to strings) when a Map is correct.
- "Optimizing" without measuring, or measuring on a tiny dataset where O(n²) looks fine.

## 🧪 Hands-on Labs

Work through **`labs/lab-07-data-structures.md`**. A Node script joins customers to orders with a nested `find` and dedups with `includes`, plus a timing harness. You'll measure the baseline on a large generated dataset, refactor to a Map index and a Set dedup, and measure the speedup.

## 🔍 Engineering Investigation

Run the timing harness on the baseline at increasing dataset sizes (1k, 10k, 100k) and record how runtime grows — does it scale linearly or quadratically? After refactoring, re-measure and plot/describe the new growth. The point is to *see* O(n²) vs O(n) in real numbers, not just assert it.

## 🤖 AI Engineering Exercise

Ask an AI to speed up the join. **Verify** its suggestion actually changes the complexity (some "optimizations" are micro-tweaks that don't fix the O(n²)). **Log** the complexity before/after and the measured times that prove (or disprove) the improvement.

## 📝 Assignment

Refactor the join and dedup to O(n) using a Map and a Set, preserving output. Submit before/after timings at three dataset sizes, the complexity analysis (O(n²) → O(n)), and a short note on how you chose each data structure.

## 🚀 Stretch Goal

Add a `groupBy(items, keyFn)` utility returning a `Map<key, items[]>` in a single pass, and use it to replace another repeated-scan pattern. Explain its complexity.

## ✅ Definition of Done

- [ ] Array/Object/Map/Set chosen deliberately by access pattern
- [ ] Repeated linear lookups replaced with an O(1) index
- [ ] O(n²) operation replaced with O(n)
- [ ] Speedup demonstrated with before/after measurements at multiple sizes

## 🪞 Reflection

Where had you been using an array as a lookup table out of habit? How does watching runtime grow with dataset size change how you'll choose structures?
