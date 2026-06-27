# Async JavaScript & the Event Loop

## One thread
JS runs on a single main thread that also does layout, paint, and input. **Long synchronous work freezes everything.** Don't block the main thread.

## The loop
1. Run the current task (synchronous code) to completion.
2. **Drain the entire microtask queue** (Promise `.then`/`catch`/`finally`, `await` continuations, `queueMicrotask`).
3. (Browser) render if needed.
4. Take **one macrotask** (`setTimeout`, I/O, DOM events), then go to step 2.

**Ordering rule:** sync → all microtasks → one macrotask → all microtasks → next macrotask...
```js
console.log('A');
setTimeout(() => console.log('B'), 0);        // macrotask
Promise.resolve().then(() => console.log('C')); // microtask
console.log('D');
// A, D, C, B
```

## Promises
```js
fetch(url).then(r => r.json()).then(use).catch(handle).finally(cleanup);
Promise.all([a, b, c]);     // all, or first rejection
Promise.allSettled([...]);  // never rejects; per-result status
Promise.race([...]);        // first to settle
```

## async/await
```js
async function load(id) {
  try {
    const [user, prefs] = await Promise.all([getUser(id), getPrefs(id)]); // concurrent
    const orders = await getOrders(user);   // dependent → sequential
    return { user, prefs, orders };
  } catch (err) { handle(err); }
}
```
`await` pauses the *function*, not the thread. Don't `await` independent calls serially — use `Promise.all`. Always handle rejections.

## Not blocking the main thread
- **Chunk** long loops and yield: process a slice, `setTimeout(next, 0)`, repeat.
- **Web Worker** for heavy pure compute (separate thread; no DOM access).
- `requestAnimationFrame` for visual updates; `requestIdleCallback` for low-priority work.

## Gotchas
- `setTimeout(fn, 0)` ≠ immediate — it waits for the stack to clear *and* microtasks to drain.
- `async` doesn't make CPU work non-blocking — you must yield or offload.
- A "floating" promise (no `await`/`.catch`) swallows errors.
