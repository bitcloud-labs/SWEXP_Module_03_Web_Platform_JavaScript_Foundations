import { describe, it, expect, vi } from 'vitest';
import {
  firstPaintBlockers,
  validate,
  total,
  joinFast,
  getOrder,
  scheduleUpdates,
} from '../src/diagnostics.js';

describe('capstone — Load layer', () => {
  it('flags head stylesheet + blocking head script', () => {
    const page = [
      { url: 'index.html', type: 'document' },
      { url: 'big.css', type: 'stylesheet', inHead: true },
      { url: 'blocking.js', type: 'script', inHead: true },
      { url: 'app.js', type: 'script', inHead: true, defer: true },
    ];
    expect(firstPaintBlockers(page)).toEqual(['big.css', 'blocking.js']);
  });
});

describe('capstone — Document layer', () => {
  it('validates email and password', () => {
    expect(validate('a@b.com', 'longenough')).toBeNull();
    expect(validate('bad', 'longenough')).toBe('Enter a valid email');
    expect(validate('a@b.com', 'short')).toBe('Password must be at least 8 characters');
  });
});

describe('capstone — Language layer', () => {
  it('sums numeric strings without concatenating', () => {
    expect(total(['10', '20', '30'])).toBe(60);
    expect(total([1, 2, 3])).toBe(6);
  });
});

describe('capstone — Performance layer', () => {
  it('joins orders to customers via a Map', () => {
    const customers = [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Lin' },
    ];
    const orders = [{ id: 9, customerId: 2, total: 5 }];
    expect(joinFast(customers, orders)).toEqual([
      { id: 9, customerId: 2, total: 5, customer: { id: 2, name: 'Lin' } },
    ]);
  });
});

describe('capstone — Network layer', () => {
  const ok = {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
    json: async () => ({ id: 1, item: 'Widget' }),
  };
  const serverError = {
    ok: false,
    status: 500,
    headers: { get: () => 'text/plain' },
    text: async () => 'Internal Server Error',
    json: async () => {
      throw new SyntaxError('not json');
    },
  };

  it('returns data on 200', async () => {
    const fetchImpl = vi.fn(async () => ok);
    await expect(getOrder('1', 'Bearer demo-token', fetchImpl)).resolves.toEqual({
      id: 1,
      item: 'Widget',
    });
  });

  it('throws on a non-JSON 500 instead of crashing', async () => {
    const fetchImpl = vi.fn(async () => serverError);
    await expect(getOrder('boom', 'Bearer demo-token', fetchImpl)).rejects.toThrow(/HTTP 500/);
  });
});

describe('capstone — Rendering layer', () => {
  it('batches all reads before all writes', () => {
    const log = [];
    const measurements = scheduleUpdates(
      ['a', 'b'],
      (r) => {
        log.push('read:' + r);
        return r + r;
      },
      (r, m) => log.push('write:' + r + '=' + m),
    );
    expect(measurements).toEqual(['aa', 'bb']);
    expect(log).toEqual(['read:a', 'read:b', 'write:a=aa', 'write:b=bb']);
  });
});
