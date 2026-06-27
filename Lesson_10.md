# Lesson 10 — The Website Cannot Be Found (DNS, TCP/IP & Client–Server)

> **Role:** Frontend Engineer · **Competency:** Networking Fundamentals · **Track:** NET · **Est. time:** 3 hours

---

## 🎫 Engineering Ticket

```
TICKET:      NET-5015
TITLE:       Some users get "server not found"; others see a slow first byte
PRIORITY:    P1
TYPE:        Investigation
DESCRIPTION: Reports range from "the site can't be found" to "it takes forever
             to even start loading." These live below HTTP — in DNS resolution,
             TCP/TLS connection setup, and routing. Build the mental model and
             use the right tools to locate where in the journey the time or
             failure occurs.

ACCEPTANCE CRITERIA:
  - You can explain what happens from URL to first byte: DNS → TCP → TLS → HTTP
  - You can use DNS/connection tools (nslookup/dig, ping, traceroute, curl -v)
  - You can read the connection phases in the Network panel's Timing tab
  - You can localize a failure/slowness to a specific layer with evidence
```

## 🏢 Business Context

When a site "can't be found" or is slow *before any content downloads*, the cause is usually beneath HTTP — DNS, TCP, or TLS. Frontend engineers who understand the full journey can tell whether a problem is theirs, the network's, or DNS's, instead of escalating blindly. It also demystifies the timing breakdown DevTools shows for every request.

## 🎯 Learning Objectives

- Describe the journey from URL to first byte: DNS resolution, TCP handshake, TLS handshake, HTTP request
- Use `nslookup`/`dig`, `ping`, `traceroute`, and `curl -v` to investigate each layer
- Read the **Timing** breakdown of a request in the Network panel
- Localize a "not found" or slow-start problem to the responsible layer

## 📚 Technical Deep Dive

**From URL to first byte.**

1. **DNS resolution.** The human name (`forge.example.com`) is translated to an IP address by the DNS system (resolver → root → TLD → authoritative). Cached at many layers; a stale or failing DNS record produces "server not found."
2. **TCP handshake.** The browser opens a reliable connection to that IP:port (the SYN / SYN-ACK / ACK three-way handshake). Latency here is round-trip-time bound.
3. **TLS handshake** (for HTTPS). Certificates are exchanged and a secure channel established — additional round trips before any HTTP flows.
4. **HTTP request/response.** Only now does the request from Lesson 9 travel; **TTFB** includes all of the above plus server processing.

**The client–server model.** Your browser (client) requests; a server responds. Between them sit resolvers, routers, CDNs, and proxies — each a place latency or failure can occur.

**Tools, by layer:**

| Tool | Answers |
|------|---------|
| `nslookup forge.example.com` / `dig` | does the name resolve, and to what IP? (DNS) |
| `ping <host>` | is the host reachable; round-trip latency? (note: ICMP may be blocked) |
| `traceroute <host>` | what path do packets take; where do they stall? |
| `curl -v https://host/` | verbose: DNS, connect, TLS, request/response headers |
| DevTools → Network → Timing | per-request: Queued, DNS Lookup, Initial connection, SSL, TTFB, Download |

**Reading the Timing tab.** A request's time is broken into phases. A large **DNS Lookup** points at resolution; a large **Initial connection / SSL** points at TCP/TLS setup; a large **Waiting (TTFB)** with small connect points at the server. This tells you *which layer* owns the delay — exactly the evidence to localize the problem.

### Common gotchas
- Blaming the server for what is actually slow DNS or TLS setup (read the Timing breakdown).
- Assuming `ping` failure means "down" (ICMP is often firewalled).
- Forgetting DNS/connection caching makes the *first* request slower than repeats.

## 🧪 Hands-on Labs

Work through **`labs/lab-10-dns-tcp.md`**. Using your own machine and well-known public hosts, you'll resolve names with `nslookup`/`dig`, observe latency with `ping`/`traceroute`, run `curl -v` to watch DNS → connect → TLS → HTTP, and read the Network Timing tab to attribute a request's time to phases. (A local Node server provides a baseline with negligible DNS/TLS for comparison.)

## 🔍 Engineering Investigation

For one public host and the local server, capture: the resolved IP (DNS), the connection setup time, and the TTFB. Compare where time goes for a remote HTTPS host vs `localhost`. From a request's Timing breakdown, state which layer owns the largest share and the evidence. Localize, don't guess.

## 🤖 AI Engineering Exercise

Ask an AI to diagnose "server not found." **Verify** its suggested checks by actually running `nslookup`/`curl -v` — AIs give generic checklists without your evidence. **Log** which tool's output would confirm or rule out each suggested cause, and what your actual output showed.

## 📝 Assignment

Produce a layered investigation report: the URL-to-first-byte journey in your own words; tool output (`dig`/`nslookup`, `curl -v`, a Timing breakdown) for a remote host vs localhost; and a statement of which layer would own a "slow start" vs a "not found," with the evidence that would prove it.

## 🚀 Stretch Goal

Explain how a CDN and DNS caching change the journey (and the Timing breakdown) for a returning user, and why a cold first visit differs from warm repeats.

## ✅ Definition of Done

- [ ] URL-to-first-byte journey (DNS → TCP → TLS → HTTP) explained accurately
- [ ] DNS/connection tools used and their output interpreted
- [ ] Network Timing breakdown read and attributed to layers
- [ ] A failure/slowness localized to the responsible layer with evidence

## 🪞 Reflection

Where does the time *before* the first byte actually go, and how would you now tell a DNS problem from a server problem? What did `curl -v` reveal that you'd never seen before?
