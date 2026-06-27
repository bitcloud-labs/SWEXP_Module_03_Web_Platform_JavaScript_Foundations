# DevTools Guide

Open with `F12` / `Ctrl-Cmd+Shift+I` / right-click → Inspect. DevTools is a set of *instruments* — each answers a different question.

## Elements
The **live** DOM tree (not the original HTML source) plus the Styles pane.
- Click a node to see applied CSS, the cascade, and overrides (struck-through rules lost the cascade).
- The **box-model** diagram (Styles → bottom) shows content/padding/border/margin; hover to highlight on the page.
- Toggle/add declarations live to test a fix before committing it.

## Console
Logs, warnings, errors, and a full JS REPL bound to the page.
- Read errors top-down; click the source link to jump to the line.
- Inspect live objects: `document`, `$0` (the selected element), `$$('selector')`.

## Network
Every request as a waterfall.
- Enable **Disable cache** while open; reload to measure cold loads.
- Columns: status, type, size, time. Click a row → **Headers** (request/response), **Response** (body), **Timing** (DNS/connect/SSL/TTFB/download).
- Render-blocking resources sit early on the critical path.

## Sources
Loaded scripts + the debugger.
- Set breakpoints; step over (`F10`), into (`F11`), out (`Shift+F11`).
- Watch the **Scope** and **Call Stack** panes. A breakpoint that never hits is itself evidence (the code path isn't reached).
- Conditional breakpoints and `console.table` beat scattershot `console.log`.

## Performance
A recorded timeline of the main thread.
- Record → interact → stop. Look for **long tasks** (block input/paint) and the color bands: scripting (yellow), **layout (purple)**, paint (green), composite.
- "Forced reflow" warnings flag layout thrashing.

## Rendering (and Application)
- **Rendering** tab: Paint flashing, Layout Shift regions, FPS meter — see what repaints/relayouts.
- **Application**: storage, cache, service workers — client-side state.

## Lighthouse
Automated audit: Performance, Accessibility, Best Practices, SEO. Use it to generate evidence and track before/after, not as a substitute for understanding the cause.
