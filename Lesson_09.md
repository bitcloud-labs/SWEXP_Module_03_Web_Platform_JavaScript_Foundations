# Lesson 09 — Investigate the Network (HTTP & REST)

> **Role:** Frontend Engineer · **Competency:** HTTP & REST · **Track:** NET · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      NET-5001
TITLE:       The orders API call "fails" intermittently — find out why
PRIORITY:    P1
TYPE:        Investigation
DESCRIPTION: The orders panel sometimes shows no data and sometimes an error.
             The frontend blames the backend; the backend blames the frontend.
             Use the Network panel to read the actual requests and responses —
             methods, status codes, headers, bodies — and produce evidence of
             what's really happening before anyone "fixes" anything.

ACCEPTANCE CRITERIA:
  - You can read HTTP requests/responses: method, URL, status, headers, body
  - You can interpret status codes and distinguish client (4xx) vs server (5xx) errors
  - You can explain REST resource design and correct method/status usage
  - You can make and inspect requests with fetch and from the Network panel
```

## 🏢 Business Context

Almost every modern frontend is a client to HTTP APIs. When data is missing or wrong, the Network panel is the source of truth that ends the frontend-vs-backend blame game: it shows the exact request sent and response received. Reading HTTP fluently is non-negotiable for a frontend engineer.

## 🎯 Learning Objectives

- Read an HTTP exchange: method, URL, status, headers, and body
- Interpret status codes; tell client errors (4xx) from server errors (5xx)
- Explain RESTful resource design and correct method/status semantics
- Make requests with `fetch` and inspect them in the Network panel

## 📚 Technical Deep Dive

**Anatomy of an HTTP exchange.** A request has a **method**, a **URL**, **headers** (e.g. `Authorization`, `Content-Type`, `Accept`), and an optional **body**. A response has a **status code**, **headers**, and a **body**.

**Methods (REST verbs):**

| Method | Intent | Safe? | Idempotent? |
|--------|--------|-------|-------------|
| GET | read a resource | yes | yes |
| POST | create / non-idempotent action | no | no |
| PUT | replace a resource | no | yes |
| PATCH | partially update | no | no |
| DELETE | remove a resource | no | yes |

**Status codes — the family tells the story:**

| Range | Meaning | Examples |
|-------|---------|----------|
| 2xx | success | 200 OK, 201 Created, 204 No Content |
| 3xx | redirection | 301 Moved, 304 Not Modified |
| 4xx | **client** error (the request is wrong) | 400, 401, 403, 404, 429 |
| 5xx | **server** error (the server failed) | 500, 502, 503 |

The 4xx/5xx split tells you *which side to investigate first* — a 401 is a missing/expired token (frontend/auth), a 500 is a server bug. That single distinction often ends the blame game.

**REST design.** Resources are nouns with predictable URLs; methods are the verbs:

```
GET    /api/orders          → list orders        (200)
POST   /api/orders          → create an order     (201 + Location)
GET    /api/orders/42       → fetch order 42       (200 / 404)
PATCH  /api/orders/42       → update order 42       (200)
DELETE /api/orders/42       → delete order 42        (204)
```

**Fetch and reading responses.**

```js
const res = await fetch('/api/orders', { headers: { Accept: 'application/json' } });
if (!res.ok) throw new Error(`HTTP ${res.status}`);   // fetch only rejects on network failure, NOT on 4xx/5xx!
const orders = await res.json();
```

A crucial gotcha: `fetch` does **not** throw on 4xx/5xx — you must check `res.ok`/`res.status` yourself. Many "intermittent failures" are unchecked error statuses treated as success.

### Common gotchas
- Assuming `fetch` rejects on 404/500 (it doesn't) — always check `res.ok`.
- Reading a body as `.json()` when the error response is HTML/text.
- Using GET with side effects, or POST where PUT/PATCH is meant.
- CORS errors mistaken for "the API is down" (it's a browser policy — read the Console message).

## 🧪 Hands-on Labs

Work through **`labs/lab-09-http-rest.md`**. You'll run a small provided local API (Node, no external network), exercise it with the Network panel, `curl`, and `fetch`, deliberately trigger 400/401/404/500 responses to read each, and fix a client that mistakes error statuses for success.

## 🔍 Engineering Investigation

Hit the lab API's endpoints and record, for each, the method, status, key headers, and body. Trigger a 4xx and a 5xx and explain *which side* each implicates. Find the client bug where a non-`ok` response is parsed as success, and show the Network evidence that localizes it.

## 🤖 AI Engineering Exercise

Describe an intermittent API symptom to an AI and ask for the cause. **Verify** against the actual status codes and bodies in the Network panel — AIs guess at causes without the exchange in front of them. **Log** how the real status code (e.g. 401 vs 500) redirected the investigation.

## 📝 Assignment

Produce a network investigation: a table of each endpoint's method/status/headers/body, a clear 4xx-vs-5xx diagnosis for the failing case, and the client fix (checking `res.ok`, handling errors). Include the evidence from the Network panel.

## 🚀 Stretch Goal

Add proper handling for `429 Too Many Requests` with a retry/backoff, and explain idempotency's role in deciding which requests are safe to retry.

## ✅ Definition of Done

- [ ] HTTP exchanges read accurately (method/URL/status/headers/body)
- [ ] 4xx vs 5xx interpreted and used to direct the investigation
- [ ] REST method/status semantics explained correctly
- [ ] Client fixed to check `res.ok`; errors handled with Network evidence

## 🪞 Reflection

How does reading the actual request/response change the frontend-vs-backend conversation? Which status code distinction will save you the most time in future debugging?
