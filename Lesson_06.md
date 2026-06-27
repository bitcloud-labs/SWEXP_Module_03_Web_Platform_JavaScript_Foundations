# Lesson 06 — The Website Freezes (Async JavaScript & the Event Loop)

> **Role:** Frontend Engineer · **Competency:** Async JavaScript & the Event Loop · **Track:** JS · **Est. time:** 4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      JS-3030
TITLE:       The page freezes for seconds when generating a report
PRIORITY:    P1 — UI fully unresponsive during the operation
TYPE:        Bug
DESCRIPTION: Clicking "Generate report" freezes the entire tab — no scrolling,
             no clicks — for several seconds. The work runs synchronously on the
             single main thread and blocks everything, including rendering.
             Make the UI stay responsive, and fix the callback-based data
             fetching while you're in there.

ACCEPTANCE CRITERIA:
  - You can explain the single-threaded event loop: call stack, task queue, microtasks
  - You can identify why synchronous work freezes the UI and how to avoid it
  - You can convert callbacks → Promises → async/await and handle errors
  - You can predict the ordering of sync code, microtasks, and macrotasks
```

## 🏢 Business Context

JavaScript runs on a **single main thread** that also handles rendering and input. Any long synchronous task freezes the page — the most jarring failure a user can feel. Understanding the event loop is what separates engineers who write responsive UIs from those whose apps mysteriously "hang." This is the conceptual heart of frontend performance.

## 🎯 Learning Objectives

- Explain the event loop: call stack, Web APIs, the task (macrotask) queue, and the microtask queue
- Recognize why long synchronous work blocks rendering and input
- Convert callback-based async code to Promises and `async/await`, with error handling
- Predict execution order across synchronous code, microtasks, and macrotasks

## 📚 Technical Deep Dive

**One thread, one stack.** JS executes on a single call stack. While a function runs, *nothing else can* — not other JS, not rendering, not input handling. A 3-second `for` loop = a 3-second frozen tab.

**The event loop.** Asynchronous operations (timers, network, events) are handed to the host (browser/Node), which queues a callback when ready. The event loop runs queued callbacks **only when the call stack is empty**. Two queues, with a priority rule:

- **Microtasks** (Promise callbacks, `queueMicrotask`) — drained *completely* after each task, before rendering.
- **Macrotasks** (`setTimeout`, I/O, events) — one per loop turn.

```js
console.log('A');
setTimeout(() => console.log('B'), 0);     // macrotask
Promise.resolve().then(() => console.log('C')); // microtask
console.log('D');
// Order: A, D, C, B  — sync first, then microtasks, then macrotasks
```

**Why long sync work freezes.** The loop can't service rendering or input while your task holds the stack. Fixes: break work into chunks yielded via `setTimeout`/`requestIdleCallback`, move heavy compute to a **Web Worker** (a real separate thread), or make the work genuinely async (e.g. fetch in pages).

**Callbacks → Promises → async/await.**

```js
// callback hell
getUser(id, (err, user) => {
  if (err) return handle(err);
  getOrders(user, (err, orders) => { /* nested... */ });
});

// promises
getUser(id).then(getOrders).then(render).catch(handle);

// async/await — reads like sync, runs async
async function load(id) {
  try {
    const user = await getUser(id);
    const orders = await getOrders(user);
    render(orders);
  } catch (err) { handle(err); }
}
```

`await` pauses the *async function* (not the thread) until the Promise settles; errors propagate to `try/catch`. Run independent awaits concurrently with `Promise.all([...])` instead of awaiting serially.

### Common gotchas
- Believing `setTimeout(fn, 0)` runs "immediately" — it waits for the stack to clear *and* all microtasks.
- A heavy synchronous loop blocking the UI; thinking `async` alone makes CPU work non-blocking (it doesn't — you must yield or use a Worker).
- Forgetting to `await` (a "floating" Promise) or to `.catch` rejections.

## 🧪 Hands-on Labs

Work through **`labs/lab-06-async-eventloop.md`**. Part 1 (Node) is an event-loop ordering puzzle you predict then verify. Part 2 takes a callback-based fetch chain and a UI-freezing synchronous loop and has you convert to async/await + chunked/yielded work, proving order and responsiveness.

## 🔍 Engineering Investigation

For the ordering puzzle, write your predicted output, then run it in Node. In the browser version, record the Performance panel during the freeze — find the **long task** holding the main thread, and confirm after your fix that the task is broken up and the page stays responsive. Evidence, then claim.

## 🤖 AI Engineering Exercise

Give an AI the ordering puzzle and ask for the output. **Verify** by running it — models frequently mis-order microtasks vs macrotasks. **Log** the exact ordering rule (sync → drain microtasks → one macrotask → repeat) in your own words, validated against the run.

## 📝 Assignment

Submit: your predicted vs actual ordering with the rule stated; the callback chain converted to `async/await` with error handling (and `Promise.all` where appropriate); and evidence (Performance trace or before/after timing) that the UI no longer freezes. Explain why your fix keeps the main thread free.

## 🚀 Stretch Goal

Move the heavy computation into a **Web Worker** and post results back to the main thread. Explain what a Worker can and cannot access (no DOM) and when it's the right tool versus chunking.

## ✅ Definition of Done

- [ ] Event loop (stack, macro/microtask queues, priority) explained accurately
- [ ] Ordering predicted correctly and verified
- [ ] Callbacks converted to async/await with proper error handling
- [ ] UI freeze eliminated with evidence (no long task blocking the thread)

## 🪞 Reflection

Now that you can see the single thread, what does "don't block the main thread" mean concretely? Where in past code did you unknowingly freeze the UI?
