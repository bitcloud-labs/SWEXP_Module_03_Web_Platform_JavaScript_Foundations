import { describe, it, expect } from 'vitest';
import { total, makeHandlers, makeCounter, formatter } from '../src/runtime.js';

describe('lab 04 — the JavaScript runtime', () => {
  it('total sums numbers', () => {
    expect(total([10, 20, 30])).toBe(60);
  });
  it('total sums numeric strings (coercion)', () => {
    expect(total(['10', '20', '30'])).toBe(60);
  });
  it('total handles a mix', () => {
    expect(total(['5', 5, '0.5'])).toBe(10.5);
  });

  it('each handler captures its own index', () => {
    const hs = makeHandlers(3);
    expect([hs[0](), hs[1](), hs[2]()]).toEqual([0, 1, 2]);
  });

  it('counters are independent', () => {
    const a = makeCounter();
    const b = makeCounter();
    expect(a()).toBe(1);
    expect(a()).toBe(2);
    expect(b()).toBe(1);
  });

  it('formatAll keeps `this`', () => {
    expect(formatter.formatAll([1, 2])).toEqual(['$1', '$2']);
  });
});
