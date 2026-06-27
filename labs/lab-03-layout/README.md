# Lab 03 — Repair a Broken Layout

**Goal:** diagnose box-model bugs and prove you know each modern-CSS fix.

The dashboard layout has four planted bugs:

1. **No `box-sizing: border-box`** — `width` excludes padding/border, so padded boxes overflow.
2. **Non-wrapping flex** — `.shell` / `.cards` don't wrap, so children overflow on narrow screens.
3. **Fixed-width sidebar** — `width: 320px` + padding overflows small viewports.
4. **Unbreakable string** — a long token can't wrap and pushes its card past the viewport.

You diagnose these live with the Elements box-model overlay in the LMS lab. Here you encode the
**diagnosis and the fix** as data the grader can check: given a set of CSS declarations, decide whether
each bug is still present.

## What you do

In [`src/layout.js`](src/layout.js), implement `auditLayout(decls)`. `decls` is a flat object mapping a
CSS property to its value as it would appear in your stylesheet, e.g.:

```js
{
  'box-sizing': 'border-box',
  '.shell flex-wrap': 'wrap',
  '.cards flex-wrap': 'wrap',
  '.sidebar width': '260px',
  '.sidebar flex': '0 0 260px',
  '.data overflow-wrap': 'anywhere',
}
```

Return `{ borderBox, flexWraps, sidebarFlexible, stringWraps, allFixed }`:

- `borderBox` — `true` when `decls['box-sizing'] === 'border-box'`.
- `flexWraps` — `true` when **both** `.shell flex-wrap` and `.cards flex-wrap` are `'wrap'`
  (a Grid alternative is out of scope for the autograder — wrap the flex rows).
- `sidebarFlexible` — `true` when the sidebar can shrink: its `flex` value starts with `0 0` is **not**
  enough on its own; accept it as flexible when `.sidebar flex` is present and is **not** a fixed
  `0 0 <px>` with no shrink — concretely, accept any `.sidebar flex` whose shrink (2nd number) is not `0`,
  e.g. `'1 1 260px'` or `'0 1 260px'`. (A bare `width: 320px` with no flex is **not** flexible.)
- `stringWraps` — `true` when `.data overflow-wrap` is `'anywhere'` or `.data word-break` is
  `'break-word'`.
- `allFixed` — `true` only when all four are fixed.

## Definition of done

- All tests pass (`npx vitest run labs/lab-03-layout`).
- In your LMS notebook: before/after screenshots at ~320 / ~768 / wide, with box-model evidence per bug.

## Submit

Edit `src/`, run the tests, commit and push.
