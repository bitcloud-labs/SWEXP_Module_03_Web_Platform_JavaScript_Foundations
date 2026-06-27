# Capstone Brief — FORGE-9100: Forge Web Diagnostics

> **Epic:** FORGE-9100 · **Role:** Frontend Engineer on call · **Est. time:** 12–16 hours (staged) · **Submission:** `capstone-submission-template.md`

## The situation
The Project Forge web app is misbehaving across every layer at once: it's slow to first paint, the login form is broken, the dashboard layout collapses, a report generation freezes the tab, search lags, the orders API "fails" intermittently, and the list view stutters when scrolling. You are the engineer on call. **Investigate first, optimize second:** read the instruments, localize each problem to the right layer, fix the *cause*, and prove every fix with before/after evidence.

The capstone introduces **no new concepts** — it integrates the whole module and tests *method and judgment*: choosing the right instrument, gathering evidence, and not claiming a cause you haven't observed.

## Building the broken app
Reconstruct the buggy Forge app from the lab generators you've already used — each defect maps to a lab, so the behaviors are realistic and reproducible:

| Layer | Defect | Source lab |
|-------|--------|-----------|
| Load | render-blocking script/CSS delaying first paint | lab-01 |
| Document | broken login form (selector/event/preventDefault/timing) | lab-02 |
| Document | collapsing/overflowing layout | lab-03 |
| Language | runtime/modern-JS defect (coercion / `this` / `\|\|` vs `??`) | lab-04 / lab-05 |
| Language | UI freeze from synchronous work | lab-06 |
| Performance | O(n²) data join / dedup | lab-07 |
| Performance | slow search (re-sort + scan) | lab-08 |
| Network | client treats 4xx/5xx as success | lab-09 |
| Network | a slow-start localized to DNS/TCP/TLS | lab-10 |
| Rendering | scroll jank from layout thrashing | lab-11 |

Assemble them into one app (or run them as a connected set). Keep the generators so your diagnosis is reproducible.

## Phases
Stage the work; don't attempt it in one sitting.

1. **Load** — diagnose the first-paint bottleneck from the waterfall/Performance; fix and **measure** FCP before/after.
2. **Document** — fix the form (localize each bug with the debugger) and the layout (box-model evidence).
3. **Language** — correct the runtime/modern-JS defect from first principles; remove the UI freeze (event-loop aware) with a Performance trace as proof.
4. **Performance** — optimize the data join and the search; **measure** at growing sizes; show the complexity change.
5. **Network** — fix the API error-handling bug using Network evidence; localize the network-journey issue to a layer with `curl -v`/Timing.
6. **Rendering** — eliminate scroll jank; before/after Performance traces.

## Acceptance criteria → rubric mapping
| Acceptance criterion | Rubric category |
|----------------------|-----------------|
| Used DevTools to investigate each issue before changing code | Browser Investigation (15%) |
| Form/DOM and HTML semantics correct and accessible | HTML & Accessibility (10%) |
| Layout responsive, no overflow, no magic numbers | Layout (10%) |
| Runtime/modern-JS defect fixed from first principles | Runtime (10%) |
| Load, data, search, and freeze improvements **measured** | Performance (15%) |
| API exchanges read; 4xx/5xx handled; errors surfaced | Network (10%) |
| Scroll jank fixed; reflow/paint/composite reasoned about | Rendering (15%) |
| Diagnostics report + notebook complete and reproducible | Documentation (10%) |
| Right instrument/fix chosen and justified; AI verified | Engineering Judgment (5%) |

## Deliverables
1. **The repaired app** (or the set of repaired labs) with the generators to reproduce the original defects.
2. **A diagnostics report** — for each defect: instrument → evidence → layer → root cause → fix → measurement.
3. **The engineering notebook**, including the **AI-usage log**.
4. A **"reproduce this diagnosis"** section: could another engineer follow your notebook to the same evidence?

## Definition of done
- [ ] Every acceptance criterion met with instrument-backed evidence
- [ ] Each fix addresses the cause (not the symptom), localized to the right layer
- [ ] Load/data/search/rendering improvements shown with before/after measurements
- [ ] API and network issues diagnosed with Network/`curl` evidence
- [ ] Report + notebook + AI log complete; the diagnosis is reproducible

## The golden rule
**Never claim a cause you haven't observed.** Where AI's confident explanation meets the DevTools evidence, the evidence wins — and catching those cases is part of the grade.
