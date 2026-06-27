# Capstone — FORGE-9100: Forge Web Diagnostics

**Epic:** FORGE-9100 · **Role:** Frontend Engineer on call

The Project Forge web app is misbehaving across every layer at once: slow first paint, a broken login
form, a layout that collapses, a report that freezes the tab, slow search, an orders API that "fails"
intermittently, and a list that stutters on scroll. The capstone introduces **no new concepts** — it
integrates the whole module and tests *method and judgment*: choose the right instrument, gather evidence,
and fix the *cause* at each layer.

The full diagnostics report + engineering notebook are submitted via the LMS using
[`../capstone-submission-template.md`](../capstone-submission-template.md). The code below is the part the
autograder scores: one **diagnostics toolkit** that touches every layer.

## What you do

Implement every `// TODO` in [`src/diagnostics.js`](src/diagnostics.js):

| Layer | Function | From |
| --- | --- | --- |
| Load | `firstPaintBlockers(resources)` — urls that block first paint | lab-01 |
| Document | `validate(email, password)` — form validation | lab-02 |
| Language | `total(amounts)` — coerce numeric strings before summing | lab-04 |
| Performance | `joinFast(customers, orders)` — Map-indexed join, O(n) | lab-07 |
| Network | `getOrder(id, token, fetchImpl)` — check `res.ok`, handle 4xx/5xx | lab-09 |
| Rendering | `scheduleUpdates(rows, measure, apply)` — batch reads then writes | lab-11 |

> The network function takes an explicit `fetchImpl` argument (dependency injection) so it can be tested
> without a live server — pass `globalThis.fetch` in real use.

Run:
```bash
npx vitest run assignments/capstone
```

## Definition of done

- All capstone tests pass.
- Your LMS diagnostics report documents, for each defect: instrument → evidence → layer → root cause →
  fix → measurement.

## The golden rule

**Never claim a cause you haven't observed.** Where AI's confident explanation meets the DevTools
evidence, the evidence wins — and catching those cases is part of the grade.
