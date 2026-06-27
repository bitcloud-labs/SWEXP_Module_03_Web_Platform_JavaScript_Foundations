import { describe, it, expect } from 'vitest';
import { parseCurlTiming, attributeSlowness } from '../src/journey.js';

describe('lab 10 — curl timing breakdown', () => {
  it('splits cumulative checkpoints into per-phase ms', () => {
    // dns 31ms, tcp 21ms, tls 68ms, ttfb 90ms, download 50ms
    const phases = parseCurlTiming('dns:0.031 connect:0.052 tls:0.120 ttfb:0.210 total:0.260');
    expect(phases.dns).toBeCloseTo(31, 1);
    expect(phases.tcp).toBeCloseTo(21, 1);
    expect(phases.tls).toBeCloseTo(68, 1);
    expect(phases.ttfb).toBeCloseTo(90, 1);
    expect(phases.download).toBeCloseTo(50, 1);
  });

  it('handles localhost (no DNS, no TLS)', () => {
    const phases = parseCurlTiming('dns:0.000 connect:0.001 tls:0.001 ttfb:0.002 total:0.003');
    expect(phases.dns).toBe(0);
    expect(phases.tls).toBe(0);
    expect(phases.tcp).toBeCloseTo(1, 1);
  });

  it('attributes a TLS-dominated start to tls', () => {
    const phases = parseCurlTiming('dns:0.010 connect:0.020 tls:0.300 ttfb:0.320 total:0.340');
    expect(attributeSlowness(phases)).toBe('tls');
  });

  it('attributes a slow server (high TTFB) to ttfb', () => {
    const phases = parseCurlTiming('dns:0.010 connect:0.020 tls:0.030 ttfb:0.530 total:0.560');
    expect(attributeSlowness(phases)).toBe('ttfb');
  });

  it('attributes a slow DNS lookup to dns', () => {
    const phases = parseCurlTiming('dns:0.400 connect:0.410 tls:0.420 ttfb:0.430 total:0.440');
    expect(attributeSlowness(phases)).toBe('dns');
  });
});
