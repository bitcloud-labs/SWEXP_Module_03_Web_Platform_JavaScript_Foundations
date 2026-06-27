# Lab 05 — Modernize the Codebase

**Lesson:** 05 · **Goal:** modernize ES5 → ES6+ and split into modules, keeping every test green (no behavior change).

## Goal
Apply modern idioms safely. The test suite is your proof that behavior didn't change.

## Setup
```bash
mkdir -p /tmp/swexp-l05 && cd /tmp/swexp-l05
cat > gen.sh <<'GEN'
#!/usr/bin/env bash
set -e
cat > legacy.js <<'JS'
// Legacy ES5 utilities — modernize WITHOUT changing behavior.
var utils = {};

utils.formatUser = function (user) {
  return "" + user.first + " " + user.last + " <" + user.email + ">";
};

utils.activeEmails = function (users) {
  var out = [];
  for (var i = 0; i < users.length; i++) {
    if (users[i].active === true) { out.push(users[i].email); }
  }
  return out;
};

utils.withDefaults = function (opts) {
  opts = opts || {};
  var result = {};
  result.page = opts.page || 1;
  result.size = opts.size || 20;
  result.sort = opts.sort || "name";
  return result;
};

utils.sum = function (nums) {
  var total = 0;
  for (var i = 0; i < nums.length; i++) { total += nums[i]; }
  return total;
};

module.exports = utils;
JS

cat > legacy.test.js <<'JS'
const assert = require('assert');
const utils = require('./legacy.js');
assert.strictEqual(utils.formatUser({ first: 'Ada', last: 'L', email: 'a@x.io' }), 'Ada L <a@x.io>');
assert.deepStrictEqual(utils.activeEmails([{ email: 'a', active: true }, { email: 'b', active: false }]), ['a']);
assert.deepStrictEqual(utils.withDefaults(), { page: 1, size: 20, sort: 'name' });
assert.deepStrictEqual(utils.withDefaults({ page: 3 }), { page: 3, size: 20, sort: 'name' });
assert.strictEqual(utils.sum([1, 2, 3, 4]), 10);
console.log('ALL TESTS PASSED');
JS
echo "Files in /tmp/swexp-l05: legacy.js (ES5), legacy.test.js"
GEN
bash gen.sh
node legacy.test.js   # confirm baseline GREEN before touching anything
```

## Tasks
1. **Green baseline:** run the tests; record them passing.
2. **Modernize `legacy.js` in small steps, re-running tests after each:**
   - `var` → `const`/`let`; string concat → template literals.
   - loops → `filter`/`map`/`reduce` where it reads clearly.
   - `withDefaults` → destructuring with defaults: `({ page = 1, size = 20, sort = 'name' } = {})`. **Careful:** the legacy code uses `||`, which treats `0`/`''` as missing — note where `??`/default params differ and keep behavior identical to the tests.
   - export named ES module functions.
3. **Split into modules:** move functions into an ES-module file (`utils.mjs` with `export`), import them in a small `main.mjs`, run under Node's ESM. Keep a CommonJS shim or adapt the test as needed; document the change.
4. **Stay green** the entire way.

## Deliverable
Before/after of two functions, the green test run after modernizing, a note on which idiom removed which bug class, and any case where a modern idiom (`??` vs `||`, arrow vs method) would have changed behavior and how you avoided it.

## Cleanup
```bash
rm -rf /tmp/swexp-l05
```

## Check
`../solutions/lab-05-solution.md`.
