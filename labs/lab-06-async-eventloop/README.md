# Lab 06 — Async JavaScript & the Event Loop

**Goal:** know the event-loop ordering rule, convert callbacks → `async/await`, and stop a UI freeze by yielding.

## What you do

In [`src/async.js`](src/async.js), implement three things.

### Part 1 — Event-loop ordering

`eventLoopOrder()` returns the order the labelled lines of this snippet print, as an array of numbers:

```js
console.log('1: sync start');
setTimeout(() => console.log('2: setTimeout (macrotask)'), 0);
Promise.resolve().then(() => console.log('3: promise (microtask)'));
queueMicrotask(() => console.log('4: queueMicrotask (microtask)'));
Promise.resolve().then(() => {
  console.log('5: microtask that schedules a macrotask');
  setTimeout(() => console.log('6: nested setTimeout'), 0);
});
console.log('7: sync end');
```

The rule: **all synchronous code first, then drain every microtask, then macrotasks in order.** Return
the labels in print order (e.g. `[1, 7, ...]`). Predict it before you run.

### Part 2 — Callbacks → async/await

Given the callback-style `getUser` / `getOrders` (provided), implement:

- `getUserP(id)` — a Promise wrapper around `getUser` (`new Promise((resolve, reject) => ...)`).
- `getOrdersP(user)` — a Promise wrapper around `getOrders`.
- `loadAsync(id)` — an `async` function that `await`s both and returns `{ user, orders }`, the same
  result the nested-callback `loadCallback` produces.

### Part 3 — Yield instead of freezing

`chunk(items, size, process)` — process `items` in slices of `size`, **yielding** between slices with
`setTimeout(..., 0)` so the main thread stays free (this is the fix for the lesson's freezing report).
Call `process(item)` for every item, in order, and return a Promise that resolves once all are processed.

## Definition of done

- All tests pass (`npx vitest run labs/lab-06-async-eventloop`).
- In your LMS notebook: predicted vs actual order + the rule, and before/after evidence the UI no longer
  freezes.

## Submit

Edit `src/`, run the tests, commit and push.
