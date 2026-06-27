# Lab 07 — Optimize Customer Data

**Goal:** turn O(n²) array scans into O(n) with a `Map` index and a `Set` dedup — and keep the output correct.

The slow versions (provided) use `Array.find()` inside a loop (an O(orders × customers) join) and
`Array.includes()` inside a filter (O(n²) dedup). In the LMS lab you benchmark them at growing sizes and
watch the time grow ~4× per step — quadratic. Here you implement the fast versions and the tests prove
they produce the **same** results.

## What you do

In [`src/fast.js`](src/fast.js):

- `joinFast(customers, orders)` — build `const byId = new Map(customers.map(c => [c.id, c]))` **once**,
  then `orders.map(o => ({ ...o, customer: byId.get(o.customerId) }))`. Same shape as `joinSlow`, O(n).
- `dedupFast(values)` — return the unique values in first-seen order using a `Set`
  (`[...new Set(values)]`). Same result as `dedupSlow`, O(n).

## Definition of done

- All tests pass (`npx vitest run labs/lab-07-data-structures`).
- In your LMS notebook: before/after timings at n = 1000 / 5000 / 20000 and the O(n²) → O(n) analysis.

## Submit

Edit `src/`, run the tests, commit and push.
