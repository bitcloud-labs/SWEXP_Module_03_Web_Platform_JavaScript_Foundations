# Modern JavaScript (ES6+) Cheatsheet

## Declarations
```js
const MAX = 10;        // never reassigned
let count = 0;         // reassigned
// avoid var
```

## Template literals
```js
const msg = `Hi ${user.name}, you have ${n} ${n === 1 ? 'item' : 'items'}`;
```

## Arrow functions
```js
const double = x => x * 2;
arr.map(x => x * 2);            // great for callbacks (lexical this)
// NOT for object methods needing their own `this`
```

## Destructuring & defaults
```js
const { id, email = 'n/a' } = user;
const [first, ...rest] = items;
function f({ page = 1, size = 20 } = {}) { /* ... */ }
```

## Spread / rest
```js
const copy = { ...user, email: newEmail };   // immutable update
const merged = [...a, ...b];
const max = Math.max(...nums);
function sum(...nums) { return nums.reduce((t, n) => t + n, 0); }
```

## Immutable array transforms
```js
const emails = users.filter(u => u.active).map(u => u.email);
const total  = items.reduce((t, i) => t + i.price, 0);
```
`map`/`filter` return new arrays; `reduce` folds to one value. Prefer over mutating loops.

## Optional chaining & nullish coalescing
```js
const city = user?.address?.city ?? 'Unknown';   // ?? defaults only on null/undefined
// note: 0 ?? 5 → 0   but   0 || 5 → 5
```

## ES modules
```js
// utils.js
export function formatName(u) { return `${u.first} ${u.last}`; }
export const VERSION = '2.0';
export default function main() {}
// app.js
import main, { formatName, VERSION } from './utils.js';
```
Browser: `<script type="module" src="app.js">` — and serve over http, not `file://`.

## Useful built-ins
`Object.entries/keys/values`, `Array.from`, `Array.prototype.flatMap`, `Object.fromEntries`, `structuredClone(obj)` for deep copies, `Map`/`Set` (see the data-structures lesson).
