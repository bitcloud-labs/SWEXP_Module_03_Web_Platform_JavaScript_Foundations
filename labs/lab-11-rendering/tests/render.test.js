import { describe, it, expect } from 'vitest';
import { layoutTriggers, scheduleUpdates } from '../src/render.js';

describe('lab 11 — layout-triggering properties', () => {
  it('keeps only layout-triggering props, in order', () => {
    expect(layoutTriggers(['transform', 'top', 'opacity', 'width'])).toEqual(['top', 'width']);
  });

  it('excludes transform and opacity entirely', () => {
    expect(layoutTriggers(['transform', 'opacity'])).toEqual([]);
  });

  it('recognizes the full layout set', () => {
    const all = ['top', 'left', 'right', 'bottom', 'width', 'height', 'margin', 'padding'];
    expect(layoutTriggers(all)).toEqual(all);
  });

  it('ignores unknown properties', () => {
    expect(layoutTriggers(['color', 'transform', 'height'])).toEqual(['height']);
  });
});

describe('lab 11 — batched reads then writes (no thrash)', () => {
  it('performs all reads before any write', () => {
    const log = [];
    const rows = ['a', 'b', 'c'];
    const measure = (r) => {
      log.push('read:' + r);
      return r.toUpperCase();
    };
    const apply = (r, m) => {
      log.push('write:' + r + '=' + m);
    };
    const measurements = scheduleUpdates(rows, measure, apply);

    expect(measurements).toEqual(['A', 'B', 'C']);
    // All reads come strictly before all writes.
    const firstWrite = log.findIndex((x) => x.startsWith('write:'));
    const lastRead = log.map((x) => x.startsWith('read:')).lastIndexOf(true);
    expect(lastRead).toBeLessThan(firstWrite);
    expect(log).toEqual([
      'read:a',
      'read:b',
      'read:c',
      'write:a=A',
      'write:b=B',
      'write:c=C',
    ]);
  });

  it('handles an empty row list', () => {
    expect(scheduleUpdates([], () => {}, () => {})).toEqual([]);
  });
});
