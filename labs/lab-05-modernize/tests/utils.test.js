import { describe, it, expect } from 'vitest';
import { formatUser, activeEmails, withDefaults, sum } from '../src/utils.js';

describe('lab 05 — modernized utilities (behaviour preserved)', () => {
  it('formatUser builds the display string', () => {
    expect(formatUser({ first: 'Ada', last: 'L', email: 'a@x.io' })).toBe('Ada L <a@x.io>');
  });

  it('activeEmails keeps only active users', () => {
    expect(
      activeEmails([
        { email: 'a', active: true },
        { email: 'b', active: false },
        { email: 'c', active: true },
      ]),
    ).toEqual(['a', 'c']);
  });

  it('withDefaults fills every default when called with nothing', () => {
    expect(withDefaults()).toEqual({ page: 1, size: 20, sort: 'name' });
  });

  it('withDefaults respects provided values', () => {
    expect(withDefaults({ page: 3 })).toEqual({ page: 3, size: 20, sort: 'name' });
  });

  it('withDefaults preserves the legacy || trap: falsy values fall back', () => {
    // The original used `opts.page || 1`, so 0 and '' become the default.
    expect(withDefaults({ page: 0 })).toEqual({ page: 1, size: 20, sort: 'name' });
    expect(withDefaults({ sort: '' })).toEqual({ page: 1, size: 20, sort: 'name' });
  });

  it('sum reduces a list of numbers', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
    expect(sum([])).toBe(0);
  });
});
