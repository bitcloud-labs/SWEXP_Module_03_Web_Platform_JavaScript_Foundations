# HTTP & REST Reference

## Methods
| Method | Intent | Safe | Idempotent |
|--------|--------|------|------------|
| GET | read | yes | yes |
| POST | create / non-idempotent action | no | no |
| PUT | replace | no | yes |
| PATCH | partial update | no | no |
| DELETE | remove | no | yes |

## Status codes
| Range | Meaning | Common |
|-------|---------|--------|
| 2xx | success | 200 OK, 201 Created, 204 No Content |
| 3xx | redirect | 301 Moved Permanently, 304 Not Modified |
| 4xx | **client** error (request is wrong) | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Too Many Requests |
| 5xx | **server** error (server failed) | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

**The 4xx/5xx split tells you which side to investigate first.**

## REST resource design
```
GET    /api/orders        list           → 200
POST   /api/orders        create         → 201 (+ Location)
GET    /api/orders/42     fetch one      → 200 / 404
PUT    /api/orders/42     replace        → 200
PATCH  /api/orders/42     partial update → 200
DELETE /api/orders/42     remove         → 204
```
Resources are nouns; methods are verbs; collections are plural; nest sparingly.

## fetch essentials
```js
const res = await fetch('/api/orders', { headers: { Accept: 'application/json' } });
if (!res.ok) throw new Error(`HTTP ${res.status}`);   // fetch does NOT reject on 4xx/5xx
const data = await res.json();
```
- Always check `res.ok`/`res.status` — `fetch` only rejects on network failure.
- Error bodies may be text/HTML, not JSON — branch on `Content-Type`.
- A **CORS** error is a browser policy (see the Console), not "the server is down."
- For non-idempotent requests, be careful with retries (idempotency matters).
