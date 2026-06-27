import { describe, it, expect } from 'vitest';
import { eventLoopOrder, loadCallback, loadAsync, chunk } from '../src/async.js';

describe('lab 06 — event loop ordering', () => {
  it('orders sync, then all microtasks, then macrotasks', () => {
    expect(eventLoopOrder()).toEqual([1, 7, 3, 4, 5, 2, 6]);
  });
});

describe('lab 06 — callbacks to async/await', () => {
  it('loadAsync produces the same result as loadCallback', async () => {
    const expected = await new Promise((resolve, reject) =>
      loadCallback('7', (e, r) => (e ? reject(e) : resolve(r))),
    );
    const actual = await loadAsync('7');
    expect(actual).toEqual(expected);
  });

  it('loadAsync returns the user and their orders', async () => {
    const { user, orders } = await loadAsync('42');
    expect(user).toEqual({ id: '42', name: 'User42' });
    expect(orders).toEqual(['User42-order1', 'User42-order2']);
  });
});

describe('lab 06 — chunked processing yields without dropping work', () => {
  it('processes every item, in order', async () => {
    const seen = [];
    const items = Array.from({ length: 25 }, (_, i) => i);
    await chunk(items, 10, (n) => seen.push(n));
    expect(seen).toEqual(items);
  });

  it('handles an empty list', async () => {
    const seen = [];
    await chunk([], 5, (n) => seen.push(n));
    expect(seen).toEqual([]);
  });

  it('does not block: returns before processing the second chunk', async () => {
    const order = [];
    const items = [1, 2, 3, 4];
    // chunk yields between slices, so it cannot finish the 2nd chunk before
    // the synchronous code after this call runs.
    const done = chunk(items, 2, (n) => order.push('item' + n));
    order.push('after-call');
    await done;
    // The 'after-call' marker must appear before the last item — proof that
    // chunk yielded control instead of running the whole loop synchronously.
    expect(order).toContain('after-call');
    expect(order.indexOf('after-call')).toBeLessThan(order.lastIndexOf('item4'));
    // And every item still ran, in order.
    expect(order.filter((x) => x.startsWith('item'))).toEqual(['item1', 'item2', 'item3', 'item4']);
  });
});
