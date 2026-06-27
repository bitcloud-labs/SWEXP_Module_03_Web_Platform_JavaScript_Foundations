/**
 * Lab 01 — Investigate How a Website Loads. See README.md.
 *
 * @typedef {Object} Resource
 * @property {string} url
 * @property {string} type          'document' | 'stylesheet' | 'script' | 'image' | ...
 * @property {boolean} [inHead]
 * @property {boolean} [async]
 * @property {boolean} [defer]
 */

/**
 * Urls of resources that block first paint, in input order.
 * A <head> stylesheet blocks; a <head> script without async/defer blocks.
 * @param {Resource[]} resources
 * @returns {string[]}
 */
export function firstPaintBlockers(resources) {
  // TODO: filter to render-blocking resources, then map to their `url`.
  return [];
}

/**
 * The critical rendering path, in order.
 * @returns {string[]}
 */
export function criticalPath() {
  // TODO: return the six canonical steps in order.
  return [];
}
