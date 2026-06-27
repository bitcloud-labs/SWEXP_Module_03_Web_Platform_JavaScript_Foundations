import { describe, it, expect, afterEach, vi } from 'vitest';
import { getOrder } from '../src/client.js';

/** Build a minimal Response-like object the client can read. */
function fakeResponse({ status, json, text, contentType }) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (h) => (h.toLowerCase() === 'content-type' ? contentType : null) },
    json: async () => {
      if (json === undefined) throw new SyntaxError('Unexpected token in JSON');
      return json;
    },
    text: async () => text ?? '',
  };
}

function stubFetch(response) {
  globalThis.fetch = vi.fn(async () => response);
}

afterEach(() => {
  vi.restoreAllMocks();
  delete globalThis.fetch;
});

describe('lab 09 — fixed fetch client', () => {
  it('returns the parsed body on 200', async () => {
    stubFetch(
      fakeResponse({
        status: 200,
        contentType: 'application/json',
        json: { id: 1, item: 'Widget', total: 9.99 },
      }),
    );
    await expect(getOrder('1', 'Bearer demo-token')).resolves.toEqual({
      id: 1,
      item: 'Widget',
      total: 9.99,
    });
  });

  it('throws on 401 instead of returning the error body as data', async () => {
    stubFetch(
      fakeResponse({ status: 401, contentType: 'application/json', json: { error: 'Unauthorized' } }),
    );
    await expect(getOrder('1', 'wrong')).rejects.toThrow(/HTTP 401/);
    await expect(getOrder('1', 'wrong')).rejects.toThrow(/Unauthorized/);
  });

  it('throws on 404', async () => {
    stubFetch(
      fakeResponse({ status: 404, contentType: 'application/json', json: { error: 'Order not found' } }),
    );
    await expect(getOrder('999', 'Bearer demo-token')).rejects.toThrow(/HTTP 404/);
  });

  it('throws on a 500 with a NON-JSON body (does not crash on .json())', async () => {
    stubFetch(
      fakeResponse({ status: 500, contentType: 'text/plain', text: 'Internal Server Error' }),
    );
    await expect(getOrder('boom', 'Bearer demo-token')).rejects.toThrow(/HTTP 500/);
    await expect(getOrder('boom', 'Bearer demo-token')).rejects.toThrow(/Internal Server Error/);
  });

  it('sends the Authorization header', async () => {
    stubFetch(fakeResponse({ status: 200, contentType: 'application/json', json: {} }));
    await getOrder('1', 'Bearer demo-token');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/orders/1'),
      expect.objectContaining({ headers: { Authorization: 'Bearer demo-token' } }),
    );
  });
});
