# Lesson 12 — Project Forge Web Diagnostics Capstone

> **Role:** Frontend Engineer · **Competency:** Integrated Web Diagnostics · **Track:** CAP · **Est. time:** 12–16 hours

---

## 🎫 Engineering Ticket

```
EPIC:        FORGE-9100
TITLE:       Diagnose and repair the ailing Forge web application end to end
PRIORITY:    P1 — module capstone
TYPE:        Epic (integrative)
DESCRIPTION: The Forge web app is slow to load, has a broken form and layout,
             freezes during a report, lags on search, mishandles API errors, and
             stutters when scrolling. You are the engineer on call. Investigate
             every layer with the browser's instruments, fix the real causes,
             and deliver a diagnostics report that proves each fix with evidence.

ACCEPTANCE CRITERIA: (full mapping in assignments/capstone-brief.md)
  - Page-load bottleneck found from the waterfall and improved (measured)
  - DOM/event form bug and the CSS layout bug diagnosed and fixed
  - A runtime/modern-JS defect corrected from first principles
  - The UI freeze removed (event-loop aware) and the slow search/data optimized (measured)
  - An API error-handling bug fixed using Network evidence; a network-layer issue localized
  - Scroll jank eliminated using the Performance/Rendering tools (before/after traces)
  - A complete, evidence-based diagnostics report with the engineering notebook
```

## 🏢 Business Context

This is the job: a real app misbehaving across every layer, and an engineer who can *investigate first, optimize second* — reading the instruments, localizing each problem to the right layer, fixing the cause (not the symptom), and proving it with before/after evidence. The capstone is deliberately holistic: any one fix is easy; diagnosing a whole system calmly and methodically is the skill.

## 🎯 Learning Objectives

Integrate every module competency: DevTools-driven investigation; the critical rendering path and load metrics; DOM/events/forms; CSS layout; the JS runtime and modern JS; the event loop and async; data structures and algorithmic complexity; HTTP/REST and the network journey; and the rendering pipeline — all under disciplined, evidence-based documentation.

## 📚 Technical Deep Dive

The capstone introduces no new concepts. It tests **judgment and method**: for each symptom, choose the right instrument, gather evidence, localize the layer, fix the cause, and *measure* the result. The full specification, the buggy app's setup, the phase plan, and the acceptance-criteria → rubric mapping are in **`assignments/capstone-brief.md`** — read it before starting and trace each criterion to the evidence you'll produce.

The work spans the layers you've studied:

1. **Load** — find and improve the first-paint bottleneck (L1), measured.
2. **Document** — fix the form (L2) and the layout (L3).
3. **Language** — correct a runtime/modern-JS defect (L4–L5) and remove the UI freeze (L6).
4. **Performance** — optimize the slow data join (L7) and search (L8), measured.
5. **Network** — fix the API error-handling bug (L9) and localize a network-journey issue (L10).
6. **Rendering** — eliminate scroll jank (L11), with before/after traces.

## 🧪 Hands-on Labs

The capstone *is* the lab. The buggy Forge app and its scenario generators are assembled from the earlier labs (reuse those generators to reconstruct or extend the broken behaviors), so the defects are realistic and reproducible.

## 🔍 Engineering Investigation

Investigation is the deliverable, not a step. For every symptom, your report must show: the instrument used, the evidence gathered, the layer localized, the root cause, the fix, and a *measurement* proving the result. End with a "how to reproduce this diagnosis" section — could another engineer follow your notebook and arrive at the same evidence?

## 🤖 AI Engineering Exercise

Use AI throughout exactly as a professional would — to explain an error, draft a hypothesis, suggest a fix — **but every use follows draft → verify-against-the-instruments → log.** Maintain an AI-usage log. The recurring failure to guard against is the confident AI cause that the DevTools evidence contradicts; catching those is part of the grade. The golden rule governs: **never claim a cause you haven't observed.**

## 📝 Assignment

Deliver the complete diagnosis and repair per `assignments/capstone-brief.md`, using `assignments/capstone-submission-template.md`. Your submission is the repaired app plus a **diagnostics report** that proves each fix with before/after evidence, and the engineering notebook (including the AI-usage log) that ties it together.

## 🚀 Stretch Goal

Add one improvement a real team would value beyond the brief — e.g. a Lighthouse score before/after, an accessibility pass on the form, a Web Worker for the heavy report, or list virtualization — and justify it with evidence.

## ✅ Definition of Done

- [ ] Every acceptance criterion met with instrument-backed evidence
- [ ] Each fix localized to the right layer and addressing the cause, not the symptom
- [ ] Performance/load/search/rendering improvements shown with before/after measurements
- [ ] API and network issues diagnosed with Network evidence
- [ ] Diagnostics report + engineering notebook + AI-usage log complete
- [ ] The diagnosis is reproducible from your documentation

## 🪞 Reflection

Which layer was hardest to diagnose, and which instrument earned its keep most? Where did evidence overturn your first guess? If a new symptom appeared tomorrow, how would your method find it?
