/**
 * Lab 09 — Investigate the Network (HTTP & REST). See README.md.
 * Fix the client so it checks res.ok and reads error bodies defensively.
 */

export const API_BASE = 'http://localhost:3009/api/orders';

/**
 * Fetch one order. On any non-OK status, throw `HTTP <status>: <detail>`.
 * @param {string|number} id
 * @param {string} token   e.g. 'Bearer demo-token'
 * @returns {Promise<object>}
 */
export async function getOrder(id, token) {
  const res = await fetch(`${API_BASE}/${id}`, { headers: { Authorization: token } });
  // BUG: this parses JSON unconditionally and never checks res.ok.
  //  - a 500 body may be plain text → .json() throws
  //  - 401/404 error bodies are returned as if they were valid data
  const data = await res.json();
  return data;

  // TODO:
  // if (!res.ok) {
  //   const ct = res.headers.get('content-type') || '';
  //   const detail = ct.includes('application/json')
  //     ? (await res.json()).error
  //     : await res.text();
  //   throw new Error(`HTTP ${res.status}: ${detail}`);
  // }
  // return res.json();
}
