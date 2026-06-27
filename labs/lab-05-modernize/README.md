# Lab 05 — Modernize the Codebase

**Goal:** rewrite ES5 utilities with modern ES6+ idioms **without changing behavior**. The tests are your proof.

In the LMS lab you start from a green ES5 `legacy.js` and modernize in small steps, re-running the tests
after each. Here the tests are already green-by-spec: implement each function with modern idioms and keep
every assertion passing.

## What you do

In [`src/utils.js`](src/utils.js), implement four functions:

- `formatUser(user)` → `'First Last <email>'` (use a **template literal**, not `+` concatenation).
- `activeEmails(users)` → the emails of users whose `active === true` (use `filter` + `map`).
- `withDefaults(opts)` → `{ page, size, sort }` defaulting to `1 / 20 / 'name'`
  (destructuring with defaults: `({ page = 1, size = 20, sort = 'name' } = {})`).
- `sum(nums)` → the total (use `reduce`).

### The `||` vs `??` trap (read this)

The legacy code used `opts.page || 1`, which treats `0` **and** `''` as "missing". Default parameters
and `??` only fall back on `undefined` (and `??` also on `null`) — **not** on `0`/`''`. The tests pin the
behavior down; pick the idiom that keeps it identical. Note one example where `??` differs from `||` in
your notebook.

## Definition of done

- All tests pass (`npx vitest run labs/lab-05-modernize`).
- In your LMS notebook: before/after of two functions and a note on where a modern idiom would have
  changed behavior and how you avoided it.

## Submit

Edit `src/`, run the tests, commit and push.
