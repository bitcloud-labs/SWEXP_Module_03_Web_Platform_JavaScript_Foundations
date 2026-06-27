# Lab 10 — DNS, TCP/IP & the Client–Server Journey

**Lesson:** 10 · **Goal:** trace URL → first byte with terminal tools and the Network Timing tab; attribute time to layers.

## Goal
See where the time *before* content download goes — DNS, TCP, TLS — and localize a "slow start" vs "not found" to the right layer.

## Setup
A local baseline server (negligible DNS/TLS) to compare against a remote HTTPS host:
```bash
mkdir -p /tmp/swexp-l10 && cd /tmp/swexp-l10
cat > server.js <<'JS'
const http = require('http');
http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/plain' }); res.end('hello from localhost\n'); })
    .listen(3010, () => console.log('baseline on http://localhost:3010'));
JS
echo "Run it:  node server.js"
```

## Tasks (use your own machine; pick a well-known public host, e.g. example.com)
1. **DNS resolution.** Resolve the name and note the IP(s):
   ```bash
   nslookup example.com        # or:  dig example.com +short
   ```
   What does the name resolve to? Try again — is it faster (cached)?
2. **Reachability & latency.**
   ```bash
   ping -c 4 example.com       # round-trip time (ICMP may be blocked — note if so)
   traceroute example.com      # the path; where does latency accumulate?  (Windows: tracert)
   ```
3. **Watch the full journey.** `curl -v` narrates DNS → connect (TCP) → TLS handshake → HTTP:
   ```bash
   curl -v https://example.com/ -o /dev/null
   ```
   Identify in the output: the resolved IP, the TCP connect, the TLS handshake lines, and the HTTP status line.
4. **Local baseline.** `curl -v http://localhost:3010/ -o /dev/null` — note there's no DNS lookup of significance and no TLS; connection setup is near-instant.
5. **Network Timing tab.** In the browser, load the remote host and `localhost:3010`. In Network → click a request → **Timing**: record the split across **DNS Lookup**, **Initial connection**, **SSL**, **Waiting (TTFB)**, **Content Download**. Which phase dominates for the remote host? For localhost?

## Deliverable
A layered report: the URL→first-byte journey in your own words; tool output (`dig`/`nslookup`, `curl -v`, a Timing breakdown) for remote vs localhost; and a statement of which layer would own a "slow start" vs a "not found," with the evidence that proves it.

## Cleanup
```bash
# Ctrl+C the server, then:
rm -rf /tmp/swexp-l10
```

## Check
`../solutions/lab-10-solution.md`.
