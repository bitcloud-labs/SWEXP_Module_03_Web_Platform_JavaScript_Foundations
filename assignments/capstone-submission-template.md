# FORGE-9100 Capstone Submission — [Your Name]

**Date:** [date] · **Time spent:** [hours]

## Executive summary
2–4 sentences: what was wrong across the app, your overall approach (investigate first), and the headline before/after results.

## Per-defect diagnostics
Repeat this block for each defect (Load, Form, Layout, Runtime, Freeze, Data, Search, API, Network, Rendering).

### [Layer] — [short title]
- **Instrument used:** [Network / Performance / Elements / Sources / Console / curl / Timing]
- **Evidence observed:** [waterfall/trace/timing/status/output — paste or attach]
- **Localized to:** [layer/line/structure] because [evidence]
- **Root cause:** [in your own words; not the symptom]
- **Fix:** [what changed and why it addresses the cause]
- **Verification (measured):** [before → after numbers / clean trace / passing test / correct status]

## Measurements table
| Defect | Metric | Before | After |
|--------|--------|--------|-------|
| Load | FCP | | |
| Data join | time @ N | | |
| Search | time @ N queries | | |
| Freeze | longest main-thread task | | |
| Scroll | layout time / frames | | |

## AI-usage log
| Asked | AI suggested | Verified against | Outcome (matched / corrected) |
|-------|-------------|------------------|-------------------------------|
| | | | |

Include at least one case where the instrument **overruled** the AI's confident answer.

## Reproduce this diagnosis
Step-by-step: how to rebuild the broken app (which generators), and how to reproduce each piece of evidence. Another engineer should reach your conclusions by following this.

## Reflection
Hardest layer to diagnose and why; the instrument that earned its keep; where evidence overturned a first guess; how your method would handle a brand-new symptom.

---
**Self-check vs rubric:** [ ] Browser Investigation [ ] HTML & Accessibility [ ] Layout [ ] Runtime [ ] Performance [ ] Network [ ] Rendering [ ] Documentation [ ] Engineering Judgment
