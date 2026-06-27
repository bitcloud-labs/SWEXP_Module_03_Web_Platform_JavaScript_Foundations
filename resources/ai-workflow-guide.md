# AI Workflow Guide — Draft → Verify-against-the-instruments → Log

AI is a fast, confident, sometimes-wrong assistant. On the web platform, "confidently wrong" usually means an explanation that the DevTools evidence contradicts. Use AI like a professional: **draft with it, verify against the instruments, log what you learned.**

## The loop
1. **Draft.** Ask for an explanation, a hypothesis, a snippet, a checklist.
2. **Verify against the instrument** — *not* against the AI's confidence:
   - Cause of slow load? → check the **Network waterfall / Performance**, not the AI's guess.
   - JS behavior? → **run it** (Node/Console) and read the output.
   - Layout fix? → toggle it live in **Elements** before committing.
   - API failure? → read the real **status/body** in Network.
   - Jank cause? → read the **Performance trace**.
3. **Log.** Record what you asked, what the instrument showed, where the AI was right, and where evidence overruled it.

## Where AI is most often wrong here
- Blaming "large images" for slow first paint when the data shows render-blocking CSS/JS.
- Mis-ordering microtasks vs macrotasks in event-loop questions.
- Suggesting `!important`/fixed widths for layout instead of the box-model cause.
- Assuming `fetch` throws on 4xx/5xx (it doesn't).
- "Debounce the scroll" for jank that's actually layout thrashing.
- Micro-optimizing instead of changing algorithmic complexity.

## The golden rule
**Never claim a cause you haven't observed.** If the AI's explanation and the instrument disagree, the instrument wins — every time. That discipline is exactly what this module grades.
