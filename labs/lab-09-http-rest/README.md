# Lab 09 — Investigate the Network (HTTP & REST)

**Goal:** read HTTP exchanges, interpret status codes, and fix a client that treats errors as success.

`fetch` does **not** reject on 4xx/5xx — only on a network failure. The buggy client calls `.json()`
unconditionally and never checks `res.ok`, so it crashes on a non-JSON 500 body and silently returns
401/404 error bodies as if they were valid data.

## What you do

In [`src/client.js`](src/client.js), fix `getOrder(id, token)` so it:

- **Checks `res.ok` first.** On a non-OK response, read the body **defensively** (it may not be JSON):
  if the `content-type` includes `application/json`, parse JSON and use its `error` field; otherwise read
  text. Then `throw new Error(\`HTTP ${res.status}: ${detail}\`)`.
- On an OK response, return the parsed JSON body.

The tests inject a fake `fetch` returning 200 / 401 / 404 / 500 responses (the 500 body is plain text, not
JSON) and assert each is handled correctly.

## 4xx vs 5xx (the diagnostic point)

A **4xx** means the *request* was wrong — look at the client (token, URL, params). A **5xx** means the
*server* failed — look at the backend. That distinction ends the blame game; record it in your notebook.

## Definition of done

- All tests pass (`npx vitest run labs/lab-09-http-rest`).
- In your LMS notebook: a table of each endpoint's method/status/headers/body and the 4xx-vs-5xx diagnosis.

## Submit

Edit `src/`, run the tests, commit and push.
