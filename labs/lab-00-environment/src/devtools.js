/**
 * Lab 00 — Environment & the DevTools Panels. See README.md.
 *
 * @typedef {Object} ResourceEntry
 * @property {string} url
 * @property {string} type            e.g. 'document' | 'stylesheet' | 'script' | 'image' | ...
 * @property {boolean} [inHead]       was the tag in <head>?
 * @property {boolean} [async]        <script async>?
 * @property {boolean} [defer]        <script defer>?
 * @property {number} transferBytes   bytes over the wire (Network panel "Transferred")
 *
 * @typedef {Object} ResourceSummary
 * @property {'document'|'stylesheet'|'script'|'image'|'other'} kind
 * @property {boolean} renderBlocking
 * @property {number} transferKb
 */

const KINDS = new Set(['document', 'stylesheet', 'script', 'image']);

/**
 * Classify one Network-panel resource entry.
 * @param {ResourceEntry} entry
 * @returns {ResourceSummary}
 */
export function analyzeResource(entry) {
  // TODO: derive `kind` from entry.type (fall back to 'other' for anything not in KINDS).
  // TODO: compute `renderBlocking`:
  //   - stylesheet in <head>  => true
  //   - script in <head> with neither async nor defer => true
  //   - otherwise => false
  // TODO: compute `transferKb` = transferBytes / 1024 rounded to 1 decimal place.
  return { kind: 'other', renderBlocking: false, transferKb: 0 };
}
