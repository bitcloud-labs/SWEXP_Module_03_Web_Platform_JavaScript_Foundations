# JavaScript Runtime Reference

## Types
Primitives: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`. Everything else is an **object** (arrays, functions, dates...). Primitives are copied by value; objects by reference.

## Truthiness & coercion
Falsy: `false, 0, -0, 0n, '', null, undefined, NaN`. Everything else is truthy (including `'0'`, `[]`, `{}`).
- `==` coerces; `===` does not. **Default to `===`.**
- `+` with any string operand concatenates (`'5' + 1 === '51'`); other arithmetic coerces to number (`'5' - 1 === 4`).
- Coerce explicitly: `Number(x)`, `String(x)`, `Boolean(x)`, unary `+x`.

## Scope, hoisting, TDZ
- `var`: function-scoped, hoisted and initialized `undefined`.
- `let`/`const`: block-scoped, in the **temporal dead zone** until declared (accessing early throws).
- Prefer `const`; use `let` when reassigning; avoid `var`.

## Closures
A function retains access to the variables in scope where it was *defined*, even after that scope returns. Uses: private state, factories, memoization. Pitfall: capturing a `var` loop variable (all closures share one binding — use `let`).

## `this` (set by the call site)
| Call | `this` |
|------|--------|
| `obj.method()` | `obj` |
| `fn()` | `undefined` (strict) / global (sloppy) |
| `new Fn()` | the new instance |
| arrow fn | lexical (inherited; not rebindable) |
| `fn.call/apply/bind(x)` | `x` |

Classic fix for a detached callback: `arr.map(x => obj.method(x))` or `obj.method.bind(obj)`.

## Equality & comparison quick hits
- `NaN === NaN` is `false`; test with `Number.isNaN(x)`.
- Object equality is by reference; deep-equal needs a helper.
- Optional chaining `a?.b?.c` short-circuits on `null`/`undefined`; nullish coalescing `x ?? d` defaults only on `null`/`undefined` (not `0`/`''`).
