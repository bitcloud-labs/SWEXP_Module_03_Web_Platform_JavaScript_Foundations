/**
 * Lab 10 — DNS, TCP/IP & the Client–Server Journey. See README.md.
 *
 * @typedef {Object} Phases
 * @property {number} dns
 * @property {number} tcp
 * @property {number} tls
 * @property {number} ttfb
 * @property {number} download
 */

/**
 * Parse a curl `-w` timing line into per-phase durations in milliseconds.
 * Input checkpoints are cumulative SECONDS:
 *   dns:<namelookup> connect:<connect> tls:<appconnect> ttfb:<starttransfer> total:<total>
 * @param {string} line
 * @returns {Phases}
 */
export function parseCurlTiming(line) {
  // TODO: extract dns/connect/tls/ttfb/total (seconds) from the line,
  //       then derive per-phase durations by subtracting consecutive checkpoints:
  //         dns      = namelookup
  //         tcp      = connect - namelookup
  //         tls      = appconnect - connect
  //         ttfb     = starttransfer - appconnect
  //         download = total - starttransfer
  //       Convert each to ms (×1000) and round to 1 decimal place.
  return { dns: 0, tcp: 0, tls: 0, ttfb: 0, download: 0 };
}

/**
 * Name the phase with the largest duration — the layer that owns the "slow start".
 * @param {Phases} phases
 * @returns {'dns'|'tcp'|'tls'|'ttfb'|'download'}
 */
export function attributeSlowness(phases) {
  // TODO: return the key of the largest value.
  return 'dns';
}
