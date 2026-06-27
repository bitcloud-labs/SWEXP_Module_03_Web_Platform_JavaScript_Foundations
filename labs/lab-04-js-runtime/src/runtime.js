/**
 * Lab 04 — Investigate the JavaScript Runtime. See README.md.
 * Fix four bugs from first principles. Predict the buggy output first!
 */

/** BUG 1 — coercion: sum a list of amounts numerically (some arrive as strings). */
export function total(amounts) {
  let sum = 0;
  for (const a of amounts) sum += a; // TODO: string '+' concatenates — coerce to Number.
  return sum;
}

/** BUG 2 — var loop-capture: handlers[i]() must return i. */
export function makeHandlers(n) {
  const handlers = [];
  for (var i = 0; i < n; i++) {
    handlers.push(() => i); // TODO: every closure shares one `i` — bind a fresh one per iteration.
  }
  return handlers;
}

/** BUG 3 — accidental shared state: each counter must be independent. */
let sharedCount = 0; // TODO: this lives outside the factory — move private state inside.
export function makeCounter() {
  return () => ++sharedCount;
}

/** BUG 4 — `this` lost in a callback. */
export const formatter = {
  prefix: '$',
  format(n) {
    return this.prefix + n;
  },
  formatAll(list) {
    return list.map(this.format); // TODO: `this` is lost inside map — preserve it.
  },
};
