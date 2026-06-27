/**
 * Lab 03 — Repair a Broken Layout. See README.md.
 *
 * @typedef {Record<string, string>} Decls
 *
 * @typedef {Object} LayoutAudit
 * @property {boolean} borderBox
 * @property {boolean} flexWraps
 * @property {boolean} sidebarFlexible
 * @property {boolean} stringWraps
 * @property {boolean} allFixed
 */

/**
 * Audit a set of CSS declarations against the four planted layout bugs.
 * @param {Decls} decls
 * @returns {LayoutAudit}
 */
export function auditLayout(decls) {
  // TODO: borderBox — decls['box-sizing'] === 'border-box'.

  // TODO: flexWraps — BOTH '.shell flex-wrap' and '.cards flex-wrap' equal 'wrap'.

  // TODO: sidebarFlexible — '.sidebar flex' exists AND its shrink (the 2nd number) is not 0.
  //   e.g. '1 1 260px' (shrink 1) is flexible; '0 0 260px' (shrink 0) is NOT.

  // TODO: stringWraps — '.data overflow-wrap' === 'anywhere'
  //   OR '.data word-break' === 'break-word'.

  const borderBox = false;
  const flexWraps = false;
  const sidebarFlexible = false;
  const stringWraps = false;
  return {
    borderBox,
    flexWraps,
    sidebarFlexible,
    stringWraps,
    allFixed: borderBox && flexWraps && sidebarFlexible && stringWraps,
  };
}
