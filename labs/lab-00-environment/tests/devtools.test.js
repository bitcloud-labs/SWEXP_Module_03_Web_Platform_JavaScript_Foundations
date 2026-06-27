import { describe, it, expect } from 'vitest';
import { analyzeResource } from '../src/devtools.js';

describe('lab 00 — reading a Network entry', () => {
  it('classifies known kinds and falls back to "other"', () => {
    expect(analyzeResource({ type: 'document', transferBytes: 0 }).kind).toBe('document');
    expect(analyzeResource({ type: 'stylesheet', transferBytes: 0 }).kind).toBe('stylesheet');
    expect(analyzeResource({ type: 'script', transferBytes: 0 }).kind).toBe('script');
    expect(analyzeResource({ type: 'image', transferBytes: 0 }).kind).toBe('image');
    expect(analyzeResource({ type: 'font', transferBytes: 0 }).kind).toBe('other');
    expect(analyzeResource({ type: 'fetch', transferBytes: 0 }).kind).toBe('other');
  });

  it('a stylesheet in <head> is render-blocking', () => {
    expect(
      analyzeResource({ type: 'stylesheet', inHead: true, transferBytes: 0 }).renderBlocking,
    ).toBe(true);
  });

  it('a stylesheet not in <head> is not render-blocking', () => {
    expect(
      analyzeResource({ type: 'stylesheet', inHead: false, transferBytes: 0 }).renderBlocking,
    ).toBe(false);
  });

  it('a blocking <head> script (no async/defer) is render-blocking', () => {
    expect(
      analyzeResource({ type: 'script', inHead: true, async: false, defer: false, transferBytes: 0 })
        .renderBlocking,
    ).toBe(true);
  });

  it('a deferred or async <head> script is NOT render-blocking', () => {
    expect(
      analyzeResource({ type: 'script', inHead: true, defer: true, transferBytes: 0 }).renderBlocking,
    ).toBe(false);
    expect(
      analyzeResource({ type: 'script', inHead: true, async: true, transferBytes: 0 }).renderBlocking,
    ).toBe(false);
  });

  it('a script at end of <body> is NOT render-blocking', () => {
    expect(
      analyzeResource({ type: 'script', inHead: false, transferBytes: 0 }).renderBlocking,
    ).toBe(false);
  });

  it('documents and images are never render-blocking', () => {
    expect(analyzeResource({ type: 'document', inHead: false, transferBytes: 0 }).renderBlocking).toBe(
      false,
    );
    expect(analyzeResource({ type: 'image', inHead: true, transferBytes: 0 }).renderBlocking).toBe(
      false,
    );
  });

  it('reports transfer size in KiB to one decimal place', () => {
    expect(analyzeResource({ type: 'stylesheet', transferBytes: 120000 }).transferKb).toBeCloseTo(
      117.2,
      1,
    );
    expect(analyzeResource({ type: 'image', transferBytes: 512 }).transferKb).toBe(0.5);
  });
});
