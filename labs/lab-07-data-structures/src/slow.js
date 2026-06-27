/**
 * Lab 07 — the SLOW baselines (provided; do not change). Your fast versions
 * in fast.js must produce the same results.
 */

/** O(orders × customers): a linear find() inside a loop. */
export function joinSlow(customers, orders) {
  return orders.map((o) => ({ ...o, customer: customers.find((c) => c.id === o.customerId) }));
}

/** O(n²): includes() inside a loop. */
export function dedupSlow(values) {
  const out = [];
  for (const v of values) if (!out.includes(v)) out.push(v);
  return out;
}
