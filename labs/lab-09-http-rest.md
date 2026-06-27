# Lab 09 — Investigate the Network (HTTP & REST)

**Lesson:** 09 · **Goal:** read real HTTP exchanges, interpret status codes, and fix a client that treats errors as success.

## Goal
Exercise a small local REST API, read each exchange (method/status/headers/body), trigger 4xx and 5xx, and fix the `fetch` client.

## Setup — a local API (no external network)
```bash
mkdir -p /tmp/swexp-l09 && cd /tmp/swexp-l09
cat > server.js <<'JS'
const http = require('http');
const orders = { 1: { id: 1, item: 'Widget', total: 9.99 }, 2: { id: 2, item: 'Gadget', total: 19.5 } };
const server = http.createServer((req, res) => {
  const json = (code, body) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };
  const m = req.url.match(/^\/api\/orders(?:\/(\w+))?$/);
  if (!m) return json(404, { error: 'Not found' });
  const id = m[1];
  // auth: require a header to demonstrate 401
  if (req.headers['authorization'] !== 'Bearer demo-token') return json(401, { error: 'Unauthorized' });
  if (req.method === 'GET' && !id) return json(200, Object.values(orders));
  if (req.method === 'GET' && id) {
    if (id === 'boom') { res.writeHead(500); return res.end('Internal Server Error'); } // 5xx demo (non-JSON body!)
    return orders[id] ? json(200, orders[id]) : json(404, { error: 'Order not found' });
  }
  if (req.method === 'POST' && !id) return json(201, { id: 3, ...JSON.parse('{}') });
  return json(405, { error: 'Method not allowed' });
});
server.listen(3009, () => console.log('API on http://localhost:3009'));
JS

cat > client.js <<'JS'
// BUGGY client: assumes fetch rejects on error statuses (it does NOT) and always .json()s
async function getOrder(id, token) {
  const res = await fetch(`http://localhost:3009/api/orders/${id}`, { headers: { Authorization: token } });
  const data = await res.json();   // BUG: 500 returns non-JSON; 401/404 are treated as success
  return data;                      // BUG: never checks res.ok
}
module.exports = { getOrder };
JS
echo "Files in /tmp/swexp-l09: server.js, client.js (buggy)"
echo "Run the server in one terminal:  node server.js"
```

## Tasks
1. **Start the API:** `node server.js` (leave running in one terminal).
2. **Read exchanges with curl** (verbose shows headers/status):
   ```bash
   curl -i -H "Authorization: Bearer demo-token" http://localhost:3009/api/orders
   curl -i -H "Authorization: Bearer demo-token" http://localhost:3009/api/orders/1
   curl -i http://localhost:3009/api/orders/1                 # 401 (no token)
   curl -i -H "Authorization: Bearer demo-token" http://localhost:3009/api/orders/999   # 404
   curl -i -H "Authorization: Bearer demo-token" http://localhost:3009/api/orders/boom  # 500 (non-JSON body)
   ```
   Record method, status, key headers, and body for each. In the **browser**, do the same via the Network panel and compare.
3. **Reproduce the client bug:** call the buggy `getOrder('boom', 'Bearer demo-token')` and `getOrder('1', 'wrong')` — see it crash on `.json()` or silently return an error body as if it were data.
4. **Fix the client:** check `res.ok`/`res.status` before parsing; branch on content type; throw or return a typed error. Verify each status is handled correctly.

## Deliverable
A table of each endpoint's method/status/headers/body; a 4xx-vs-5xx diagnosis (which side to investigate); and the fixed client with evidence it now handles 200/401/404/500 correctly.

## Cleanup
```bash
# stop the server (Ctrl+C), then:
rm -rf /tmp/swexp-l09
```

## Check
`../solutions/lab-09-solution.md`.
