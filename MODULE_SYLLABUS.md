# Module Syllabus — Web Platform & JavaScript Foundations

## Description
A ticket-driven, investigation-first module that teaches the web platform the way a professional frontend engineer understands it. Across 13 lessons and a capstone, you operate as a Frontend Engineer on *Project Forge*, closing tickets that move from how a page loads, through the DOM and CSS, the JavaScript runtime and event loop, data structures and algorithms, the network, and the rendering engine — culminating in an end-to-end web-diagnostics capstone. The emphasis is on **method and judgment**: read the instruments, gather evidence, localize the layer, fix the cause, and measure the result.

## Prerequisites
- Comfort at a command line and basic version control (SWEXP Modules 01–02 are ideal preparation).
- A modern browser with **DevTools** (Chromium/Firefox).
- **Node.js** (LTS or newer) for the language, performance, and API labs.
- A local static server: `npx serve` or Python's `http.server`.
- For Lesson 10: terminal access to `dig`/`nslookup`, `ping`, `traceroute`, `curl` (public-host probing is optional; a localhost baseline is provided).

## Pacing Options

| Track | Cadence | Duration |
|-------|---------|----------|
| Intensive (bootcamp) | ~1 lesson/day; capstone over the last 3–4 days | ~3–4 weeks |
| Part-time (cohort) | 2–3 lessons/week | ~6–8 weeks |
| Self-paced | 1 lesson per sitting; capstone when ready | flexible |

Most lessons are 3–4 hours including the lab; the capstone is 12–16 hours.

## Module Arc

| Phase | Lessons | Focus |
|-------|---------|-------|
| Platform & Page Load | 0–1 | DevTools as instruments; the critical rendering path |
| Document & Presentation | 2–3 | DOM/events/forms; CSS layout |
| The JavaScript Language | 4–6 | runtime fundamentals; modern JS; async & the event loop |
| Performance: Data & Algorithms | 7–8 | data structures; algorithmic complexity |
| The Network | 9–10 | HTTP & REST; DNS/TCP/IP & the client–server journey |
| Rendering | 11 | the browser rendering pipeline |
| Capstone | 12 | integrated, evidence-based web diagnostics |

## Lesson Structure
Every lesson follows the same shape: **Engineering Ticket → Business Context → Learning Objectives → Technical Deep Dive → Hands-on Labs → Engineering Investigation → AI Engineering Exercise → Assignment → Stretch Goal → Definition of Done → Reflection.**

## Labs
Two flavors. **Node labs** (runtime, modern JS, async, data, algorithms, the API) ship a generator that writes the buggy code plus a test/benchmark harness — you run them with `node` and the behaviors are verified. **Browser labs** (page load, DOM/form, layout, network journey, rendering) ship small HTML/CSS/JS pages you serve locally and investigate with DevTools. All labs are local-first; serve over `http://localhost`, not `file://`.

## Deliverables
- **Per lesson:** a completed lab, an assignment via `assignments/submission-template.md`, and an engineering-notebook entry (evidence → cause → fix → measurement → AI log).
- **Capstone:** the repaired Forge app, a diagnostics report proving each fix with before/after evidence, and the notebook — per `assignments/capstone-brief.md`.

## Final Assessment
Graded against `ASSESSMENT_RUBRIC.md`: Browser Investigation (15%), HTML & Accessibility (10%), Layout (10%), Runtime (10%), Performance (15%), Network (10%), Rendering (15%), Documentation (10%), Engineering Judgment (5%).

## Support Materials
- `resources/` — DevTools guide; JavaScript runtime reference; modern-JS cheatsheet; async/event-loop, performance, HTTP, networking, and rendering guides; a debugging playbook; the AI-workflow guide; and the notebook template.
- `dashboard.html` — an interactive progress tracker.
- `solutions/` — worked solutions to check reasoning against.
- `instructor-notes/` — per-lesson facilitation guidance.

## Academic & Professional Integrity
AI assistance is **encouraged**, used as a professional would: every use follows **draft → verify-against-the-instruments → log**, and you never claim a cause you haven't observed. Unverified AI output in deliverables counts against you — especially where the DevTools evidence contradicts it.
