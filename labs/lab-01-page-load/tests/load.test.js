import { describe, it, expect } from 'vitest';
import { firstPaintBlockers, criticalPath } from '../src/load.js';

// Mirrors the lab's deliberately render-blocking page: a <head> stylesheet,
// a blocking <head> script, the document, and an image.
const page = [
  { url: 'index.html', type: 'document', inHead: false },
  { url: 'big.css', type: 'stylesheet', inHead: true },
  { url: 'blocking.js', type: 'script', inHead: true, async: false, defer: false },
  { url: 'hero.svg', type: 'image', inHead: false },
];

describe('lab 01 — how a website loads', () => {
  it('flags the head stylesheet and blocking head script', () => {
    expect(firstPaintBlockers(page)).toEqual(['big.css', 'blocking.js']);
  });

  it('preserves input order', () => {
    const reordered = [page[2], page[1], page[0]];
    expect(firstPaintBlockers(reordered)).toEqual(['blocking.js', 'big.css']);
  });

  it('a deferred script no longer blocks (the lab fix)', () => {
    const fixed = page.map((r) =>
      r.url === 'blocking.js' ? { ...r, defer: true } : r,
    );
    expect(firstPaintBlockers(fixed)).toEqual(['big.css']);
  });

  it('returns an empty list when nothing blocks', () => {
    expect(
      firstPaintBlockers([
        { url: 'index.html', type: 'document' },
        { url: 'app.js', type: 'script', inHead: false },
        { url: 'logo.png', type: 'image' },
      ]),
    ).toEqual([]);
  });

  it('knows the critical rendering path in order', () => {
    expect(criticalPath()).toEqual(['HTML', 'DOM', 'CSSOM', 'Render Tree', 'Layout', 'Paint']);
  });
});
