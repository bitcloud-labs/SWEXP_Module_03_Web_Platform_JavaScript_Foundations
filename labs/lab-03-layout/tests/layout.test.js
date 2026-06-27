import { describe, it, expect } from 'vitest';
import { auditLayout } from '../src/layout.js';

const fixed = {
  'box-sizing': 'border-box',
  '.shell flex-wrap': 'wrap',
  '.cards flex-wrap': 'wrap',
  '.sidebar flex': '1 1 260px',
  '.data overflow-wrap': 'anywhere',
};

describe('lab 03 — layout audit', () => {
  it('flags an empty/broken stylesheet as all-bugs-present', () => {
    const a = auditLayout({});
    expect(a).toEqual({
      borderBox: false,
      flexWraps: false,
      sidebarFlexible: false,
      stringWraps: false,
      allFixed: false,
    });
  });

  it('detects border-box', () => {
    expect(auditLayout({ 'box-sizing': 'border-box' }).borderBox).toBe(true);
    expect(auditLayout({ 'box-sizing': 'content-box' }).borderBox).toBe(false);
  });

  it('requires BOTH flex rows to wrap', () => {
    expect(auditLayout({ '.shell flex-wrap': 'wrap' }).flexWraps).toBe(false);
    expect(
      auditLayout({ '.shell flex-wrap': 'wrap', '.cards flex-wrap': 'wrap' }).flexWraps,
    ).toBe(true);
  });

  it('treats a shrinkable sidebar as flexible but a fixed one as not', () => {
    expect(auditLayout({ '.sidebar flex': '1 1 260px' }).sidebarFlexible).toBe(true);
    expect(auditLayout({ '.sidebar flex': '0 1 260px' }).sidebarFlexible).toBe(true);
    expect(auditLayout({ '.sidebar flex': '0 0 260px' }).sidebarFlexible).toBe(false);
    expect(auditLayout({ '.sidebar width': '320px' }).sidebarFlexible).toBe(false);
  });

  it('accepts either wrap mechanism for the long string', () => {
    expect(auditLayout({ '.data overflow-wrap': 'anywhere' }).stringWraps).toBe(true);
    expect(auditLayout({ '.data word-break': 'break-word' }).stringWraps).toBe(true);
    expect(auditLayout({ '.data overflow-wrap': 'normal' }).stringWraps).toBe(false);
  });

  it('reports allFixed only when every bug is fixed', () => {
    const a = auditLayout(fixed);
    expect(a.allFixed).toBe(true);

    const missingOne = { ...fixed };
    delete missingOne['box-sizing'];
    expect(auditLayout(missingOne).allFixed).toBe(false);
  });
});
