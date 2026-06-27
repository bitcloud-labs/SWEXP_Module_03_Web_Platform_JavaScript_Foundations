/**
 * Lab 08 — The Search Is Too Slow. See README.md.
 */

/**
 * O(log n) search over an ALREADY-sorted array. Returns the index or -1.
 * @param {Array<number|string>} sorted
 * @param {number|string} target
 * @returns {number}
 */
export function binarySearch(sorted, target) {
  // TODO: lo/hi loop; compare sorted[mid] to target; return mid or -1.
  throw new Error('not implemented');
}

/**
 * Cache results of a pure single-argument function in a Map.
 * @template A, R
 * @param {(arg: A) => R} fn
 * @returns {(arg: A) => R}
 */
export function memoize(fn) {
  // TODO: const cache = new Map(); return arg => cache.has(arg) ? cache.get(arg) : <compute+store>.
  throw new Error('not implemented');
}

/**
 * Delay fn until `ms` have passed since the last call (trailing-edge debounce).
 * @param {Function} fn
 * @param {number} ms
 * @returns {Function}
 */
export function debounce(fn, ms) {
  // TODO: keep a timer id; on each call clearTimeout then setTimeout(() => fn(...args), ms).
  throw new Error('not implemented');
}
