import { describe, it, expect, vi } from 'vitest';
import { binarySearch, memoize, debounce } from '../src/fast.js';

describe('lab 08 — binary search', () => {
  const sorted = Array.from({ length: 1000 }, (_, i) => i * 2); // 0,2,4,...

  it('finds an element and returns its index', () => {
    expect(binarySearch(sorted, 0)).toBe(0);
    expect(binarySearch(sorted, 500)).toBe(250);
    expect(binarySearch(sorted, 1998)).toBe(999);
  });

  it('returns -1 when absent', () => {
    expect(binarySearch(sorted, 1)).toBe(-1);
    expect(binarySearch(sorted, -5)).toBe(-1);
    expect(binarySearch(sorted, 5000)).toBe(-1);
  });

  it('works on strings (lexicographic order)', () => {
    const words = ['apple', 'banana', 'cherry', 'date'];
    expect(binarySearch(words, 'cherry')).toBe(2);
    expect(binarySearch(words, 'fig')).toBe(-1);
  });

  it('handles an empty array', () => {
    expect(binarySearch([], 1)).toBe(-1);
  });
});

describe('lab 08 — memoize', () => {
  it('computes once per distinct argument', () => {
    const spy = vi.fn((n) => n * n);
    const m = memoize(spy);
    expect(m(4)).toBe(16);
    expect(m(4)).toBe(16);
    expect(m(5)).toBe(25);
    expect(spy).toHaveBeenCalledTimes(2); // 4 cached on the 2nd call
  });

  it('returns the cached value, not a recomputation', () => {
    let calls = 0;
    const m = memoize(() => ++calls);
    expect(m('x')).toBe(1);
    expect(m('x')).toBe(1);
  });
});

describe('lab 08 — debounce', () => {
  it('collapses a burst into a single trailing call', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const d = debounce(spy, 300);
    d('a');
    d('b');
    d('c');
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('c');
    vi.useRealTimers();
  });

  it('fires again after the quiet period', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const d = debounce(spy, 100);
    d(1);
    vi.advanceTimersByTime(100);
    d(2);
    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
