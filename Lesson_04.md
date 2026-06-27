# Lesson 04 — Investigate the JavaScript Runtime

> **Role:** Frontend Engineer · **Competency:** JavaScript Runtime Fundamentals · **Track:** JS · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      JS-3001
TITLE:       A utility module returns "wrong" values under certain inputs
PRIORITY:    P2
TYPE:        Bug / Investigation
DESCRIPTION: A shared utility behaves inconsistently: numbers turn into strings,
             a counter shares state it shouldn't, and `this` is undefined in a
             callback. The real cause is misunderstanding how the JavaScript
             runtime handles types, scope, closures, and `this`. Investigate and
             fix from first principles.

ACCEPTANCE CRITERIA:
  - You can explain JS types, truthiness, and coercion, and avoid coercion bugs
  - You can reason about scope (function/block), hoisting, and the TDZ
  - You can explain and use closures deliberately
  - You can predict and fix `this` binding in functions and callbacks
```

## 🏢 Business Context

The "weird" bugs that make people distrust JavaScript almost always come from a fuzzy model of the runtime: `==` coercion, `var` hoisting, accidental shared state, and `this` losing its binding in a callback. A frontend engineer who understands the runtime writes fewer bugs and debugs the rest in minutes.

## 🎯 Learning Objectives

- Distinguish JS's primitive types and reference types; reason about truthiness/coercion
- Explain scope, hoisting, and the temporal dead zone (TDZ)
- Use closures intentionally (and recognize accidental shared state)
- Predict `this` in methods, plain calls, arrow functions, and callbacks

## 📚 Technical Deep Dive

**Types & coercion.** Primitives: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`. Everything else is an object (including arrays and functions). `==` coerces operands; `===` does not — **default to `===`**. Classic traps: `'5' + 1 === '51'` (string concat) but `'5' - 1 === 4` (numeric); `[] == false` is `true`. Falsy values: `false, 0, '', null, undefined, NaN` — everything else is truthy.

**Scope & hoisting.** `var` is function-scoped and hoisted (initialized `undefined`); `let`/`const` are block-scoped and live in the **temporal dead zone** from the top of the block until declared — touching them early throws. Prefer `const`, then `let`; avoid `var`.

```js
console.log(a); // undefined  (var hoisted)
var a = 1;
console.log(b); // ReferenceError (TDZ)
let b = 2;
```

**Closures.** A function "closes over" the variables in scope where it was defined, retaining access after the outer function returns:

```js
function makeCounter() {
  let count = 0;                 // private state
  return () => ++count;          // closure keeps `count` alive
}
const next = makeCounter();
next(); next();                  // 1, 2 — state preserved, not shared globally
```

Closures power private state and memoization (L8). The accidental-shared-state bug: capturing a loop variable with `var` instead of `let`.

**`this`.** Determined by *how a function is called*, not where it's defined:

| Call form | `this` is |
|-----------|-----------|
| `obj.method()` | `obj` |
| `fn()` (plain) | `undefined` (strict) / global (sloppy) |
| `new Fn()` | the new instance |
| arrow function | inherited from the enclosing scope (lexical) — not rebindable |
| `fn.call/apply/bind(x)` | `x` |

The classic callback bug — `arr.forEach(obj.method)` loses `obj` — is fixed with an arrow (`arr.forEach(x => obj.method(x))`) or `.bind(obj)`.

### Common gotchas
- `==` coercion surprises; use `===`.
- `var` hoisting / loop-capture bugs; use `let`/`const`.
- Arrow vs regular function for `this`: arrows can't be rebound — wrong choice breaks methods or callbacks.

## 🧪 Hands-on Labs

Work through **`labs/lab-04-js-runtime.md`**. A Node script contains four planted runtime bugs (a coercion bug, a `var` loop-capture bug, an accidental shared-state closure, and a `this`-losing callback). You'll predict each output *before* running, run it to confirm, and fix it — with Node unit tests verifying the corrected behavior.

## 🔍 Engineering Investigation

For each buggy function, write down your *predicted* output, then run it in Node. Where prediction ≠ reality, that gap is exactly your runtime misconception — name it precisely (coercion? hoisting? `this`?). Record the prediction, the actual, and the root concept for each.

## 🤖 AI Engineering Exercise

Ask an AI to explain why one of the buggy snippets misbehaves. **Verify** by running it yourself and reading the output — AIs sometimes give a correct-sounding explanation for the *wrong* reason. **Log** the precise runtime concept at fault, in your own words.

## 📝 Assignment

Fix all four bugs from first principles (not by trial and error). Submit, for each: predicted vs actual output, the root concept, the fix, and the passing test. Add a short "runtime rules I now follow" list (`===`, `const`/`let`, arrow-vs-regular for `this`).

## 🚀 Stretch Goal

Write a `once(fn)` higher-order function that uses a closure to ensure `fn` runs at most once (caching its result). Explain how the closure provides the private "has it run?" state.

## ✅ Definition of Done

- [ ] Types/coercion explained; `===` used by default
- [ ] Scope, hoisting, and TDZ reasoned about correctly
- [ ] Closures used intentionally; accidental shared state identified
- [ ] `this` predicted correctly across call forms; callback binding fixed
- [ ] All four fixes pass Node tests

## 🪞 Reflection

Which runtime behavior had you been working *around* without understanding? Now that you can predict it, what class of bug disappears from your code?
