# SWEXP Module 03 — Web Platform & JavaScript Foundations

**Theme:** Understanding the platform you build on.

You are a **Frontend Engineer** on *Project Forge* (continuing from Module 02). This module turns the browser from a black box into an inspectable platform you can investigate, measure, and reason about. Across 13 ticket-driven lessons you learn how a page loads, how the DOM and CSS produce a layout, how the JavaScript runtime and event loop actually behave, how to make data and algorithms scale, how the network delivers your app, and how the browser paints pixels — then you integrate it all in a web-diagnostics capstone.

The ethos, in every lesson: **investigate first, optimize second**, and **never claim a cause you haven't observed.**

## How You Work Here

| Step | What it means |
|------|---------------|
| Pick up a ticket | Each lesson is an engineering ticket (`WEB-1010`, `PERF-4015`, …) with acceptance criteria |
| Investigate first | Open the right instrument (DevTools panel, Node, curl) and gather evidence before changing code |
| Localize the layer | Pin the problem to load / document / language / performance / network / rendering |
| Fix the cause | Address the root cause, not the symptom |
| Measure | Prove the result with before/after evidence |
| Verify AI | Draft → verify-against-the-instruments → log |

## Learning Outcomes

By the end you will be able to:
- Drive the browser's developer tools as investigation instruments.
- Explain the critical rendering path and read a Network waterfall and load metrics.
- Debug DOM/event/form bugs and repair responsive layouts from box-model evidence.
- Reason about the JavaScript runtime (types, scope, closures, `this`) and write modern ES6+.
- Explain the single-threaded event loop and convert callbacks to async/await without freezing the UI.
- Choose data structures and algorithms that scale, and prove improvements by measurement.
- Read HTTP exchanges, design RESTful calls, and trace the network journey from URL to first byte.
- Explain the rendering pipeline and eliminate jank.
- Integrate all of the above into an evidence-based diagnosis of a real web app.

## Lesson Index

| # | Lesson | Competency | Ticket |
|---|--------|-----------|--------|
| 0 | Welcome to the Frontend Engineering Team | Environment & Developer Tools | WEB-1000 |
| 1 | Investigate How a Website Loads | Page Load & the Critical Rendering Path | WEB-1010 |
| 2 | Debug a Broken Login Form | DOM, Events & Forms | DOM-2001 |
| 3 | Repair a Broken Layout | CSS Layout | CSS-2010 |
| 4 | Investigate the JavaScript Runtime | Runtime Fundamentals | JS-3001 |
| 5 | Modernize the Codebase | Modern JavaScript (ES6+) | JS-3015 |
| 6 | The Website Freezes | Async JavaScript & the Event Loop | JS-3030 |
| 7 | Optimize Customer Data | Data Structures | PERF-4001 |
| 8 | The Search Is Too Slow | Algorithms & Complexity | PERF-4015 |
| 9 | Investigate the Network | HTTP & REST | NET-5001 |
| 10 | The Website Cannot Be Found | Networking Fundamentals (DNS/TCP/IP) | NET-5015 |
| 11 | Investigate the Browser Rendering Engine | Browser Rendering Engine | RENDER-6001 |
| 12 | Project Forge Web Diagnostics Capstone | Integrated Web Diagnostics | FORGE-9100 |

The module flows through phases: **Platform & Page Load** (0–1) → **Document & Presentation** (2–3) → **The JavaScript Language** (4–6) → **Performance: Data & Algorithms** (7–8) → **The Network** (9–10) → **Rendering** (11) → **Capstone** (12).

## Repository Layout

```
.
├── README.md                      # this file
├── MODULE_SYLLABUS.md             # pacing, structure, deliverables
├── LEARNER_GUIDE.md               # how to operate as a frontend engineer here
├── INSTRUCTOR_GUIDE.md            # facilitation and assessment
├── COMPETENCY_MATRIX.md           # lesson → competency → skills
├── ASSESSMENT_RUBRIC.md           # grading weights and performance levels
├── dashboard.html                 # interactive progress dashboard (open in a browser)
├── Lesson_00.md … Lesson_12.md    # the 13 lessons
├── labs/                          # hands-on labs (Node generators + browser pages)
├── solutions/                     # worked solutions / answer keys
├── resources/                     # DevTools, runtime, async, perf, HTTP, networking, rendering guides + templates
├── assignments/                   # submission templates + capstone brief
└── instructor-notes/              # per-lesson facilitation notes
```

## Getting Started

1. Read `resources/devtools-guide.md` and get a browser+DevTools, Node, an editor, and a local static server working (Lesson 0 / `labs/lab-00-environment.md`).
2. Start your engineering notebook from `resources/engineering-notebook-template.md`.
3. Open `dashboard.html` in your browser to track progress through the lessons and phases.
4. Open `Lesson_00.md` and pick up your first ticket. Keep `resources/debugging-playbook.md` and the cheatsheets open as you work.

**Always serve pages over `http://localhost`, not `file://`** — modules, fetch, and many browser APIs require it (`npx serve .` or `python3 -m http.server 8000`). The Node labs run anywhere `node` does.
