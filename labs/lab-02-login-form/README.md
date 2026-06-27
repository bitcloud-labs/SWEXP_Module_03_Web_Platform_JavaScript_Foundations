# Lab 02 — Debug a Broken Login Form

**Goal:** localize and fix four planted DOM/event bugs, with the validation logic unit-tested.

The original `login.js` has **four** planted bugs you find with the Console and Sources debugger:

- **A — wrong selector:** `#signin-form` matches nothing → `null` → "Cannot read properties of null".
- **B — calling vs passing:** `addEventListener('submit', onSubmit())` runs the handler immediately
  (registering its `undefined` return) instead of registering the function.
- **C — no `preventDefault`:** submit triggers a full page reload, so "nothing happens".
- **D — script timing:** the script ran before the form existed in the DOM.

## What you do

In [`src/login.js`](src/login.js):

1. `validate(email, password)` — pure logic (this part is already correct; tests pin it down):
   return `'Enter a valid email'` when email is missing or has no `@`, `'Password must be at least 8
   characters'` when the password is under 8 chars, otherwise `null` (valid).
2. `initLoginForm(doc)` — wire the form **correctly**, fixing bugs A–C (D is solved structurally because
   you call `initLoginForm` once the DOM exists). On submit it must:
   - call `event.preventDefault()` (no reload),
   - read `#email` / `#password` values, run `validate`,
   - on error set `#message` `textContent` to the error and `className` to `'error'`,
   - on success set `#message` to `'Signed in!'` with `className` `'ok'`.

The tests build the DOM with `jsdom`, call `initLoginForm(document)`, dispatch a submit event, and assert
the message and that the default was prevented.

## Definition of done

- All tests pass (`npx vitest run labs/lab-02-login-form`).
- In your LMS notebook: a bug log (symptom → instrument/evidence → fix) for all four bugs.

## Submit

Edit `src/`, run the tests, commit and push.
