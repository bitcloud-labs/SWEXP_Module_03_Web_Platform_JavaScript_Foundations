/**
 * Lab 07 — Optimize Customer Data. See README.md.
 * Match joinSlow / dedupSlow exactly, but in O(n).
 */

/**
 * Join orders to customers in O(customers + orders) using a Map index.
 * @param {{id:number,name:string}[]} customers
 * @param {{id:number,customerId:number,total:number}[]} orders
 */
export function joinFast(customers, orders) {
  // TODO: const byId = new Map(customers.map(c => [c.id, c]));
  //       return orders.map(o => ({ ...o, customer: byId.get(o.customerId) }));
  throw new Error('not implemented');
}

/**
 * Unique values in first-seen order, in O(n) using a Set.
 * @param {any[]} values
 */
export function dedupFast(values) {
  // TODO: return [...new Set(values)];
  throw new Error('not implemented');
}
