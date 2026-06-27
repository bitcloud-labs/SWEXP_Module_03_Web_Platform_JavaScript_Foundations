# Lesson 05 — Modernize the Codebase

> **Role:** Frontend Engineer · **Competency:** Modern JavaScript (ES6+) · **Track:** JS · **Est. time:** 3 hours

---

## 🎫 Engineering Ticket

```
TICKET:      JS-3015
TITLE:       Modernize a legacy ES5 utility file for clarity and safety
PRIORITY:    P3
TYPE:        Refactor
DESCRIPTION: A core utility file is written in old-style ES5: `var` everywhere,
             string concatenation, callback soup, manual object copying. Modernize
             it to clear, safe ES6+ — without changing behavior. Prove behavior is
             unchanged with the existing tests.

ACCEPTANCE CRITERIA:
  - You can apply let/const, arrow functions, template literals, destructuring, spread/rest
  - You can convert objects/arrays to modern idioms safely (immutability where sensible)
  - You can organize code into ES modules (import/export)
  - All existing tests still pass — behavior is preserved
```

## 🏢 Business Context

Modern JavaScript isn't fashion — `const`/`let`, destructuring, and modules eliminate entire categories of bug (accidental reassignment, hoisting surprises, namespace collisions) and make code dramatically easier to read and review. Modernizing safely — *without* changing behavior — is a core professional skill, and the tests are how you prove you didn't break anything.

## 🎯 Learning Objectives

- Replace `var` with `const`/`let` and string concatenation with template literals
- Use arrow functions, destructuring, and spread/rest idiomatically
- Prefer immutable transforms (`map`/`filter`/`reduce`, spread) over in-place mutation
- Organize code with ES modules (`import`/`export`)

## 📚 Technical Deep Dive

**Declarations & strings.**

```js
// before
var name = "Forge"; var greeting = "Hi, " + name + "!";
// after
const name = 'Forge';
const greeting = `Hi, ${name}!`;
```

**Arrow functions** are concise and lexically bind `this` (see L4) — ideal for callbacks, *not* for object methods that need their own `this`.

**Destructuring & spread/rest.**

```js
const { id, email } = user;                 // object destructuring
const [first, ...others] = items;           // array destructuring + rest
const updated = { ...user, email: newEmail }; // immutable copy with one change
const merged = [...a, ...b];                  // concat via spread
```

**Immutable array transforms** read as a pipeline and avoid mutation bugs:

```js
const activeEmails = users
  .filter(u => u.active)
  .map(u => u.email);
```

`map`/`filter` return new arrays; `reduce` folds to a single value. Prefer these over hand-written loops that mutate shared state.

**ES modules.**

```js
// utils.js
export function formatName(u) { return `${u.first} ${u.last}`; }
export const VERSION = '2.0';
// main.js
import { formatName, VERSION } from './utils.js';
```

Modules give explicit dependencies and real encapsulation (no leaking globals). In the browser: `<script type="module" src="main.js">` (and serve over http, not `file://` — L0).

**Optional chaining & nullish coalescing** prevent a class of crashes:

```js
const city = user?.address?.city ?? 'Unknown';
```

### Common gotchas
- Using an arrow function for a method that needs its own `this`.
- Reaching for `||` where `??` is meant (`0 || 5` is `5`; `0 ?? 5` is `0`).
- "Modernizing" in a way that changes behavior — always run the tests.

## 🧪 Hands-on Labs

Work through **`labs/lab-05-modernize.md`**. You'll modernize a provided ES5 utility file (with a passing test suite) into ES6+, then split it into ES modules — keeping every test green the whole way.

## 🔍 Engineering Investigation

Before refactoring, run the tests and record them green. Modernize in small steps, re-running tests after each. When a "harmless" change turns a test red (e.g. `||` → `??`, or an arrow breaking `this`), stop and record exactly which modern idiom changed behavior and why. The tests are your safety net for proving "no behavior change."

## 🤖 AI Engineering Exercise

Ask an AI to modernize one function. **Verify** behavior is identical by running the tests — AIs sometimes "improve" logic while modernizing (changing an edge case). **Log** any behavior drift the tests caught, and the corrected, behavior-preserving version.

## 📝 Assignment

Modernize the file to ES6+ and split it into modules, with all original tests still passing. Submit before/after of two representative functions, the green test run, and a short note on which idiom eliminated which class of bug.

## 🚀 Stretch Goal

Introduce a small build/lint step (e.g. ESLint with a modern config) and fix the warnings it surfaces. Explain what a linter catches that tests don't.

## ✅ Definition of Done

- [ ] `const`/`let`, template literals, arrows, destructuring, spread/rest applied idiomatically
- [ ] Immutable transforms used where sensible
- [ ] Code organized into ES modules
- [ ] All original tests pass — behavior provably unchanged

## 🪞 Reflection

Which modern idiom most improved readability, and which most improved *safety*? Where did the tests stop you from a refactor that quietly changed behavior?
