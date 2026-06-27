# Learner Guide — Web Platform & JavaScript Foundations

## You are a frontend engineer, not a student doing exercises
Every lesson is an **engineering ticket** on *Project Forge*. Approach each one as real work: understand what's being asked, open the right instrument and gather evidence *before* changing anything, fix the cause, measure the result, and document your reasoning. The goal isn't the "right answer" — it's the judgment and habits of an engineer a team trusts with a production web app.

## The one habit that matters most
**Investigate first, optimize second.** Before you touch code: what does the instrument show? The Network waterfall, the Performance trace, the Elements box model, the Console error, the actual HTTP status, the `curl -v` output. Then localize the problem to a layer, fix the cause, and prove the fix with before/after evidence.

## How each lesson works
1. **Read the ticket and the deep dive** — understand the concepts and acceptance criteria.
2. **Do the lab.** Node labs: run the generator, predict before running, then fix. Browser labs: serve the page and investigate with DevTools.
3. **Investigate** — the Engineering Investigation pushes you from "it works" to "I have evidence for why."
4. **Run the AI exercise** — practice draft → verify → log deliberately.
5. **Submit the assignment** and **update your notebook.**
6. **Check the solution** to validate your reasoning — after you've done the work.

Track your progress in `dashboard.html`.

## What every assignment must include
- **Investigation:** the instrument, the evidence, the layer localized.
- **Root cause** (not the symptom) and the **fix**.
- **Verification:** measured before/after, a clean trace, passing tests, or correct status codes.
- **AI-usage log:** what you asked, what you verified it against, what you corrected.
- **Clean commits** (your Module 02 Git habits apply).

## Using AI responsibly
AI is a fast, confident, sometimes-wrong assistant. On the web platform, "confidently wrong" usually means an explanation the DevTools evidence contradicts (blaming images for slow paint, mis-ordering the event loop, assuming `fetch` throws on 404). Use it, but always **draft → verify against the instrument → log.** When the AI and the instrument disagree, the instrument wins. `resources/ai-workflow-guide.md` maps where AI most often misleads here.

## When you're stuck
- The Console and the Network/Performance panels almost always show where you are.
- `resources/debugging-playbook.md` has an evidence-first recipe for each common failure.
- Reproduce the problem, observe it in an instrument, localize it — then fix. You're rarely as stuck as you feel.

## The golden rule
**Never claim a cause you haven't observed.** A measurement beats an intuition; a trace beats a guess; the instrument beats the confident answer.

## How you're graded
Against `ASSESSMENT_RUBRIC.md` — on investigation, evidence-based debugging, performance reasoning, and documentation, **not** on memorizing APIs. Choosing the right instrument and proving your fix beats reciting syntax.
