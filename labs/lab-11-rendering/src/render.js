/**
 * Lab 11 — Investigate the Browser Rendering Engine. See README.md.
 */

const LAYOUT_PROPS = new Set([
  'top',
  'left',
  'right',
  'bottom',
  'width',
  'height',
  'margin',
  'padding',
]);

/**
 * Keep only the CSS properties that trigger layout when animated, in input order.
 * (transform / opacity are composite/paint-cheap and must be excluded.)
 * @param {string[]} props
 * @returns {string[]}
 */
export function layoutTriggers(props) {
  // TODO: filter `props` to those in LAYOUT_PROPS.
  return [];
}

/**
 * De-thrashed update: ALL reads first, then ALL writes (never interleaved).
 * @template T, M
 * @param {T[]} rows
 * @param {(row: T) => M} measure   a READ (e.g. offsetHeight)
 * @param {(row: T, m: M) => void} apply   a WRITE (e.g. set transform)
 * @returns {M[]} the measurements, in row order
 */
export function scheduleUpdates(rows, measure, apply) {
  // TODO: const measurements = rows.map(measure);  // read phase
  //       rows.forEach((row, i) => apply(row, measurements[i]));  // write phase
  //       return measurements;
  return [];
}
