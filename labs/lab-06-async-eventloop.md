# Lab 06 — Async JavaScript & the Event Loop

**Lesson:** 06 · **Goal:** predict event-loop ordering; convert callbacks → async/await; stop the UI freeze.

## Goal
Confirm the ordering rule (sync → drain microtasks → one macrotask → repeat), then refactor a callback chain and a blocking loop.

## Part 1 — Event-loop ordering (Node)
```bash
mkdir -p /tmp/swexp-l06 && cd /tmp/swexp-l06
cat > order.js <<'JS'
console.log('1: sync start');
setTimeout(() => console.log('2: setTimeout (macrotask)'), 0);
Promise.resolve().then(() => console.log('3: promise (microtask)'));
queueMicrotask(() => console.log('4: queueMicrotask (microtask)'));
Promise.resolve().then(() => {
  console.log('5: microtask that schedules a macrotask');
  setTimeout(() => console.log('6: nested setTimeout'), 0);
});
console.log('7: sync end');
JS
```
**Predict the output order in your notebook**, then run:
```bash
node order.js
```
Expected reasoning: all synchronous lines first (1, 7), then *all* microtasks (3, 4, 5), then macrotasks in order (2, 6). Write the rule in your own words.

## Part 2 — Callbacks → async/await (Node)
```bash
cat > chain.js <<'JS'
// Simulated async APIs (callback style)
function getUser(id, cb) { setTimeout(() => cb(null, { id, name: 'User' + id }), 20); }
function getOrders(user, cb) { setTimeout(() => cb(null, [user.name + '-order1', user.name + '-order2']), 20); }

// CALLBACK VERSION (nested). Refactor this to async/await with Promises.
function loadCallback(id, done) {
  getUser(id, (e, user) => {
    if (e) return done(e);
    getOrders(user, (e2, orders) => {
      if (e2) return done(e2);
      done(null, { user, orders });
    });
  });
}

// TODO: implement promise wrappers + an async function with the SAME result
function getUserP(id) { /* return a Promise */ }
function getOrdersP(user) { /* return a Promise */ }
async function loadAsync(id) { /* await + try/catch */ }

module.exports = { loadCallback, loadAsync };
JS
```
Implement `getUserP`/`getOrdersP` (wrap the callbacks in `new Promise`) and `loadAsync` (await them, `try/catch` for errors). They must produce the same `{ user, orders }`.

## Part 3 — The UI freeze (browser)
```bash
cat > freeze.html <<'HTML'
<!doctype html><meta charset=utf-8><title>Freeze</title>
<button id=go>Generate report</button><p id=status>idle</p>
<script>
document.querySelector('#go').addEventListener('click', () => {
  document.querySelector('#status').textContent = 'working...';
  // BLOCKING: a long synchronous loop freezes the tab (no repaint, no clicks)
  let x = 0; for (let i = 0; i < 2e9; i++) x += i;
  document.querySelector('#status').textContent = 'done: ' + x;
});
</script>
HTML
```
Serve it (`npx serve .`), open it, click the button, and try to scroll/select while it runs — note the freeze. Record a Performance trace; find the **long task**. Then fix it by **chunking** the work (process a slice, `setTimeout(…, 0)` to yield, repeat) so `status` updates and the page stays responsive — or move the compute to a **Web Worker** (stretch).

## Tasks
- Part 1: predicted vs actual order + the rule.
- Part 2: working `loadAsync` returning the same result as `loadCallback`.
- Part 3: a non-freezing version with Performance-trace evidence (long task gone).

## Deliverable
The ordering result + rule; the async/await refactor; and before/after evidence that the UI no longer freezes, with an explanation of why your fix keeps the main thread free.

## Cleanup
```bash
rm -rf /tmp/swexp-l06
```

## Check
`../solutions/lab-06-solution.md`.
