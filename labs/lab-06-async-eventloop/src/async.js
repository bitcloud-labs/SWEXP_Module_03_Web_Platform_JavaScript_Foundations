/**
 * Lab 06 — Async JavaScript & the Event Loop. See README.md.
 */

/* Part 1 — predict the print order of the lesson snippet. */
export function eventLoopOrder() {
  // TODO: return the labels (numbers) in the order they print.
  // Rule: all sync first, then ALL microtasks, then macrotasks in order.
  return [];
}

/* Part 2 — callback-style APIs (provided; do not change). */
export function getUser(id, cb) {
  setTimeout(() => cb(null, { id, name: 'User' + id }), 5);
}
export function getOrders(user, cb) {
  setTimeout(() => cb(null, [user.name + '-order1', user.name + '-order2']), 5);
}

/** Reference callback chain you must match (provided). */
export function loadCallback(id, done) {
  getUser(id, (e, user) => {
    if (e) return done(e);
    getOrders(user, (e2, orders) => {
      if (e2) return done(e2);
      done(null, { user, orders });
    });
  });
}

/** TODO: wrap getUser in a Promise. */
export function getUserP(id) {
  // return new Promise((resolve, reject) => getUser(id, (e, u) => (e ? reject(e) : resolve(u))));
  throw new Error('not implemented');
}

/** TODO: wrap getOrders in a Promise. */
export function getOrdersP(user) {
  throw new Error('not implemented');
}

/** TODO: await both, return { user, orders } — same shape as loadCallback. */
export async function loadAsync(id) {
  throw new Error('not implemented');
}

/* Part 3 — process work in chunks, yielding between slices so the thread stays free. */
/**
 * @template T
 * @param {T[]} items
 * @param {number} size
 * @param {(item: T) => void} process
 * @returns {Promise<void>}
 */
export function chunk(items, size, process) {
  // TODO: process `size` items, then setTimeout(..., 0) to yield, repeat.
  //       Resolve the returned Promise once every item has been processed in order.
  return Promise.reject(new Error('not implemented'));
}
