import { describe, it, expect } from 'vitest';
import { joinSlow, dedupSlow } from '../src/slow.js';
import { joinFast, dedupFast } from '../src/fast.js';

function makeData(n) {
  const customers = Array.from({ length: n }, (_, i) => ({ id: i, name: 'Cust' + i }));
  const orders = Array.from({ length: n }, (_, i) => ({
    id: i,
    customerId: (i * 7) % n,
    total: i,
  }));
  return { customers, orders };
}

describe('lab 07 — Map/Set optimizations', () => {
  it('joinFast matches joinSlow', () => {
    const { customers, orders } = makeData(50);
    expect(joinFast(customers, orders)).toEqual(joinSlow(customers, orders));
  });

  it('joinFast attaches the right customer object', () => {
    const customers = [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Lin' },
    ];
    const orders = [{ id: 10, customerId: 2, total: 5 }];
    expect(joinFast(customers, orders)).toEqual([
      { id: 10, customerId: 2, total: 5, customer: { id: 2, name: 'Lin' } },
    ]);
  });

  it('joinFast leaves an unknown customer undefined (like find)', () => {
    const customers = [{ id: 1, name: 'Ada' }];
    const orders = [{ id: 9, customerId: 99, total: 1 }];
    expect(joinFast(customers, orders)[0].customer).toBeUndefined();
  });

  it('dedupFast matches dedupSlow (first-seen order)', () => {
    const values = [3, 1, 3, 2, 1, 2, 3];
    expect(dedupFast(values)).toEqual(dedupSlow(values));
    expect(dedupFast(values)).toEqual([3, 1, 2]);
  });

  it('dedupFast handles strings and an empty list', () => {
    expect(dedupFast(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
    expect(dedupFast([])).toEqual([]);
  });
});
