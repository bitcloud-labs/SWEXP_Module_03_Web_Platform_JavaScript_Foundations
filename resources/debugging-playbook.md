# Debugging Playbook (evidence-first)

The method, every time: **reproduce → observe in an instrument → localize → fix the cause → verify with evidence.** Never claim a cause you haven't observed.

## "Cannot read properties of null/undefined"
A selector matched nothing, or you accessed a property before the value existed. **Instrument:** Console (the line), Elements (does the selector match?). **Fix:** correct the selector; ensure the element exists (run after DOM ready).

## Form does nothing / reloads the page
**Instrument:** Network (a navigation on submit = no `preventDefault`); a breakpoint in the handler (never hits = listener not wired, e.g. `handler()` vs `handler`). **Fix:** pass the function reference; `event.preventDefault()`; attach after the DOM exists.

## Layout overflows / collapses
**Instrument:** Elements box-model overlay at a narrow width — which box exceeds its parent? **Fix:** `box-sizing: border-box`, `flex-wrap`, intrinsic sizing (`minmax`/`auto-fit`), `overflow-wrap` for long strings. Fix the cause, don't `overflow:hidden` the symptom.

## UI freezes
**Instrument:** Performance — find the long main-thread task. **Fix:** chunk/yield the loop, or offload to a Web Worker. `async` alone won't unblock CPU work.

## Slow data / search
**Instrument:** time it at growing sizes (`performance.now()` / a bench harness). **Fix:** right data structure (Map/Set index), better algorithm (sort once + binary search), memoize pure functions, debounce frequent calls. Let Big-O predict which change dominates.

## API call "fails"
**Instrument:** Network — read the actual status and body. **Fix:** check `res.ok`; 4xx ⇒ the request (auth/URL/params), 5xx ⇒ the server. Handle non-JSON error bodies.

## "Site can't be found" / slow to start
**Instrument:** `dig`/`nslookup`, `curl -v`, Network Timing. **Fix:** localize to DNS, TCP/TLS, or the server by which Timing phase dominates.

## Scroll/animation jank
**Instrument:** Performance (layout blocks), Rendering (Paint flashing). **Fix:** batch reads/writes, animate `transform`/`opacity`, virtualize long lists.
