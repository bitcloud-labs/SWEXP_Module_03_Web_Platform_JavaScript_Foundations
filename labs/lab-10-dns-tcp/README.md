# Lab 10 — DNS, TCP/IP & the Client–Server Journey

**Goal:** attribute the time *before* content download to the right layer — DNS, TCP, TLS, or the server.

In the LMS lab you run `dig` / `ping` / `curl -v` and read the Network **Timing** tab for a remote host vs
`localhost`. The autogradable core is the **reasoning**: given the phase timings `curl` reports, which
layer dominates, and is a "slow start" a DNS/TCP/TLS problem or a server (TTFB) problem?

`curl` can print cumulative timing checkpoints with `-w`:

```
curl -o /dev/null -s -w "dns:%{time_namelookup} connect:%{time_connect} tls:%{time_appconnect} ttfb:%{time_starttransfer} total:%{time_total}\n" https://example.com/
```

These are **cumulative** seconds from the start: `time_namelookup ≤ time_connect ≤ time_appconnect ≤
time_starttransfer ≤ time_total`.

## What you do

In [`src/journey.js`](src/journey.js):

- `parseCurlTiming(line)` — parse a line like
  `dns:0.031 connect:0.052 tls:0.120 ttfb:0.210 total:0.260` into the **per-phase** durations (in
  milliseconds), by subtracting consecutive checkpoints:
  - `dns` = `time_namelookup`
  - `tcp` = `connect − dns`
  - `tls` = `tls − connect`  (appconnect − connect)
  - `ttfb` = `ttfb − tls`     (server "waiting" / time-to-first-byte)
  - `download` = `total − ttfb`

  Return `{ dns, tcp, tls, ttfb, download }` with each value in **milliseconds** (seconds × 1000),
  rounded to one decimal place.
- `attributeSlowness(phases)` — return the name of the phase with the largest duration: one of
  `'dns' | 'tcp' | 'tls' | 'ttfb' | 'download'`. That's the layer that owns the "slow start".

## Definition of done

- All tests pass (`npx vitest run labs/lab-10-dns-tcp`).
- In your LMS notebook: the URL→first-byte journey in your own words, with `dig` / `curl -v` / Timing
  evidence for remote vs localhost, and which layer owns a "slow start" vs a "not found".

## Submit

Edit `src/`, run the tests, commit and push.
