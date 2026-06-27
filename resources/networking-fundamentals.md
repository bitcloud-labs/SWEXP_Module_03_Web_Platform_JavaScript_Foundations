# Networking Fundamentals (DNS, TCP/IP, TLS)

## URL → first byte
1. **DNS resolution** — translate the hostname to an IP. Resolver checks caches, then asks root → TLD → authoritative servers. Cached aggressively; stale/failed records → "server not found."
2. **TCP handshake** — establish a reliable connection to IP:port (SYN / SYN-ACK / ACK). Cost ≈ one round trip.
3. **TLS handshake** (HTTPS) — exchange certificates, agree on keys, establish the secure channel. Extra round trips before any HTTP.
4. **HTTP request/response** — the request travels; **TTFB** = everything above + server processing time.

## Client–server model
Browser (client) requests; a server responds. Between them: resolvers, routers, load balancers, CDNs, proxies — each a place latency or failure can arise.

## Tools by layer
| Tool | Question it answers |
|------|---------------------|
| `dig host +short` / `nslookup host` | does it resolve, and to what IP? (DNS) |
| `ping host` | reachable? round-trip latency? (ICMP may be blocked) |
| `traceroute host` (`tracert` on Windows) | what path; where does it stall? |
| `curl -v https://host/` | verbose DNS → connect → TLS → HTTP headers/status |
| DevTools → Network → **Timing** | per-request: DNS Lookup, Initial connection, SSL, Waiting (TTFB), Download |

## Reading the Timing breakdown
- Big **DNS Lookup** → resolution problem.
- Big **Initial connection / SSL** → TCP/TLS setup (distance, handshakes).
- Big **Waiting (TTFB)** with quick connect → the server is slow.
- Localhost has negligible DNS and no TLS — a useful baseline for comparison.

## Caching & CDNs
DNS results, TCP connections (keep-alive), and TLS sessions are reused; CDNs serve content from a nearby edge. A cold first visit is slower than warm repeats — account for it when measuring.

## Gotchas
- Blaming the server for slow DNS/TLS — read the Timing split.
- Reading a blocked `ping` as "down" (ICMP is often firewalled).
- Forgetting cache makes the first request the slow one.
