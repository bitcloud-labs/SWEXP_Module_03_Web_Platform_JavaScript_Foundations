# Lab 02 — Debug a Broken Login Form

**Lesson:** 02 · **Goal:** localize and fix four planted DOM/event bugs, with the validation logic unit-tested in Node.

## Goal
Use the Console and Sources debugger to find each bug *before* fixing it, then make the form validate and submit without a page reload.

## Setup
```bash
mkdir -p /tmp/swexp-l02 && cd /tmp/swexp-l02
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Forge Login (broken)</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 2rem; }
  .field { display: block; margin: .5rem 0; }
  .error { color: #b00; } .ok { color: #080; }
</style>
<!-- BUG D (timing): this script runs in <head> BEFORE the form exists in the DOM -->
<script src="login.js"></script>
</head>
<body>
  <h1>Sign in</h1>
  <form id="login-form">
    <label class="field">Email <input type="email" id="email"></label>
    <label class="field">Password <input type="password" id="password"></label>
    <button type="submit">Sign in</button>
  </form>
  <p id="message"></p>
</body>
</html>
HTML
cat > login.js <<'JS'
// This file contains FOUR planted bugs. Find each with the Console/Sources before fixing.
// (The DOM wiring is guarded so Node can require `validate` for tests; in the browser
//  `document` exists, so all four bugs are live there.)

function validate(email, password) {
  // pure logic (this part is correct and unit-tested in Node)
  if (!email || !email.includes('@')) return 'Enter a valid email';
  if (!password || password.length < 8) return 'Password must be at least 8 characters';
  return null; // null === valid
}

if (typeof document !== 'undefined') {
  var form = document.querySelector('#signin-form');   // BUG A: wrong id (should be #login-form) → null

  function onSubmit(event) {
    // BUG C: missing event.preventDefault() → the form does a full page reload
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var err = validate(email, password);
    var msg = document.querySelector('#message');
    if (err) { msg.className = 'error'; msg.textContent = err; }
    else { msg.className = 'ok'; msg.textContent = 'Signed in!'; }
  }

  form.addEventListener('submit', onSubmit());         // BUG B: calling onSubmit() instead of passing it
}

// module export for Node tests (ignored by the browser)
if (typeof module !== 'undefined') module.exports = { validate };
JS

# Node-testable validation logic (pure)
cat > login.test.js <<'JS'
const assert = require('assert');
const { validate } = require('./login.js');   // the DOM block is skipped in Node; only `validate` is tested
assert.strictEqual(validate('a@b.com', 'longenough'), null, 'valid input passes');
assert.strictEqual(validate('bad', 'longenough'), 'Enter a valid email');
assert.strictEqual(validate('a@b.com', 'short'), 'Password must be at least 8 characters');
console.log('VALIDATION TESTS PASSED');
JS
echo "Serve it: npx serve .   (open with DevTools Console + Sources)"
echo "Run the pure validation tests anytime: node login.test.js"
```

## The four planted bugs
- **A — wrong selector:** `#signin-form` matches nothing → `null`; the next line throws *"Cannot read properties of null"*.
- **B — calling vs passing:** `addEventListener('submit', onSubmit())` runs `onSubmit` immediately (binding its return value, `undefined`) instead of registering it.
- **C — no `preventDefault`:** even once wired, submit triggers a full page reload, so "nothing happens."
- **D — script timing:** the script is in `<head>` with no `defer`, so it runs before `#login-form` exists.

## Tasks
1. **Reproduce, don't guess.** Load the page; read the Console error. Where does it point? Set a breakpoint in `onSubmit` — does it ever hit? (It won't, until B is fixed.)
2. **Fix A:** correct the selector to `#login-form`.
3. **Fix B:** pass the function reference: `form.addEventListener('submit', onSubmit)`.
4. **Fix C:** add `event.preventDefault()` as the first line of `onSubmit`.
5. **Fix D:** add `defer` to the `<script>` (or move it to the end of `<body>`, or wrap in `DOMContentLoaded`). This also lets `require('./login.js')` work cleanly for the Node test.
6. **Verify:** form shows validation errors and a success message with **no page reload**; `node login.test.js` prints `VALIDATION TESTS PASSED`.

## Deliverable
A bug log (symptom → instrument/evidence → fix) for all four, the corrected files, and the passing Node validation test.

## Cleanup
```bash
rm -rf /tmp/swexp-l02
```

## Check
`../solutions/lab-02-solution.md`.
