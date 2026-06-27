# Lesson 00 — Welcome to the Frontend Engineering Team

> **Role:** Frontend Engineer · **Competency:** Environment & Developer Tools · **Track:** WEB · **Est. time:** 2–3 hours

---

## 🎫 Engineering Ticket

```
TICKET:      WEB-1000
TITLE:       Onboard to frontend engineering and the browser as a platform
PRIORITY:    P1 — blocks all other work
TYPE:        Onboarding
ASSIGNEE:    You (Frontend Engineer)
DESCRIPTION: Welcome to the Project Forge web team. The browser is not a black
             box that "runs your code" — it is the platform you build on, and a
             professional frontend engineer can open it up and see exactly what
             it is doing. Set up your environment and learn to drive the
             browser's developer tools as investigation instruments.

ACCEPTANCE CRITERIA:
  - A modern browser with DevTools, Node.js (LTS or newer), and an editor are working
  - You can serve a static page locally and open it in the browser
  - You can navigate the core DevTools panels: Elements, Console, Network, Sources, Performance
  - You can explain what each panel is for in your own words
  - Your engineering notebook is created with a dated first entry
```

## 🏢 Business Context

Project Forge's web app is used by thousands of customers daily. When it's slow, broken, or behaving strangely, the engineers who can *investigate* — open the browser's instruments and read what's actually happening — fix problems in minutes that others guess at for hours. This module's ethos, which you'll hear constantly: **investigate first, optimize second.** You cannot fix what you have not measured.

## 🎯 Learning Objectives

- Set up a frontend environment: browser + DevTools, Node.js, an editor, and a local static server
- Identify the purpose of each core DevTools panel
- Serve and open a local page
- Begin treating the browser as an inspectable platform, not magic
- Start an engineering notebook

## 📚 Technical Deep Dive

**The browser is a platform.** It parses HTML into a DOM, CSS into a CSSOM, runs JavaScript in an engine (V8 in Chrome/Node, SpiderMonkey in Firefox), makes network requests, and paints pixels. Every one of those stages is observable through DevTools. Learning to *look* is the whole job for the first half of this module.

**The core DevTools panels:**

| Panel | What it shows | You'll use it for |
|-------|---------------|-------------------|
| Elements | the live DOM tree + applied CSS | inspecting structure, debugging layout (L2, L3, L11) |
| Console | logs, errors, a JS REPL | reading errors, quick experiments (every lesson) |
| Network | every request, timing, headers | page-load and API investigation (L1, L9) |
| Sources | loaded scripts, breakpoints, debugger | stepping through JS (L2, L4, L6) |
| Performance | a recorded timeline of the main thread | finding jank, long tasks, reflow (L6, L11) |
| Application | storage, cache, service workers | inspecting client state |

**Open DevTools:** `F12`, or `Ctrl/Cmd+Shift+I`, or right-click → Inspect.

**Why a local server (not `file://`).** Opening `file://...` works for trivial pages but breaks modules, fetch, and many APIs due to the browser's security model. Serve over `http://localhost` instead:

```bash
npx serve .            # or: python3 -m http.server 8000
```

**Node.js** lets you run JavaScript outside the browser — essential for the language and algorithm lessons (4–8), where we'll measure code directly without browser noise.

### Common gotchas
- Treating the browser as a black box and `console.log`-guessing instead of using the debugger and panels.
- Using `file://` and hitting confusing CORS/module errors.
- Forgetting that the Console is a full REPL — you can inspect live objects there.

## 🧪 Hands-on Labs

Work through **`labs/lab-00-environment.md`**: install/verify the toolchain, serve a provided sample page, open each DevTools panel, and record what each reveals about the page.

## 🔍 Engineering Investigation

Open the sample page with DevTools. In **Elements**, find the page's `<h1>`. In **Console**, type `document.title` and `document.querySelectorAll('a').length`. In **Network**, reload and count the requests and total transfer size. Record one concrete fact you learned about the page from *each* panel.

## 🤖 AI Engineering Exercise

Ask an AI: *"What does the browser do between receiving HTML and showing pixels?"* **Draft** its answer, then **verify** the stages against what you can actually observe in the Network and Performance panels, and **log** in your notebook what matched reality and what was vague. This is the loop you'll use all module: **draft → verify against the instruments → log.** The golden rule here: **never claim a cause you haven't observed** — measurement beats intuition.

## 📝 Assignment

1. Get the full toolchain working; paste `node --version` and a note on your browser/editor.
2. Complete the lab and record one finding from each DevTools panel.
3. Write a short "what the browser actually is" explainer (5–8 sentences) in your own words.
4. Commit your notebook with a clear message (your Module 02 Git skills apply here).

## 🚀 Stretch Goal

Install the Lighthouse panel (built into Chrome DevTools) and run an audit on the sample page. Record the four category scores. You'll learn to act on these in later lessons — for now, just learn to generate the evidence.

## ✅ Definition of Done

- [ ] Browser + DevTools, Node.js, editor, and a local server all working
- [ ] Sample page served over `http://localhost` and opened
- [ ] One finding recorded from each core DevTools panel
- [ ] "What the browser actually is" explainer written in your own words
- [ ] Notebook committed

## 🪞 Reflection

Which panel surprised you most with how much it reveals? Where had you previously been guessing about something the browser could have just shown you?
