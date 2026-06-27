# Lesson 02 — Debug a Broken Login Form

> **Role:** Frontend Engineer · **Competency:** DOM, Events & Forms · **Track:** DOM · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      DOM-2001
TITLE:       The login form does nothing when users click "Sign in"
PRIORITY:    P1 — customers cannot log in
TYPE:        Bug
DESCRIPTION: Support is flooded: clicking "Sign in" either reloads the page,
             does nothing, or throws a console error. Investigate the DOM and
             event wiring, find the real cause(s), and fix them — using the
             debugger, not guesswork.

ACCEPTANCE CRITERIA:
  - You can select and inspect DOM elements from JS and DevTools
  - You can attach event listeners correctly and explain event flow + default actions
  - You can read DOM/JS errors in the Console and trace them in Sources
  - The form validates input and submits without a full page reload
```

## 🏢 Business Context

A broken login form is a revenue emergency — every failed sign-in is a locked-out customer. Forms are also where beginners hit the most DOM and event bugs: wrong selectors, missing `preventDefault`, listeners attached before the element exists, and `this` confusion. Learning to debug them with instruments is a rite of passage.

## 🎯 Learning Objectives

- Select DOM nodes (`querySelector`, `getElementById`) and read/modify them safely
- Attach events with `addEventListener` and understand bubbling/capturing
- Prevent default behavior (`event.preventDefault()`) for form submits
- Read Console errors and step through code in the Sources debugger

## 📚 Technical Deep Dive

**Selecting elements.**

```js
const form  = document.querySelector('#login-form');   // CSS selector
const email = document.getElementById('email');         // by id
const all   = document.querySelectorAll('.field');      // a static NodeList
```

A selector that matches nothing returns `null`; calling `.value` on `null` throws *"Cannot read properties of null"* — the single most common beginner error. Check the selector against the actual DOM in Elements.

**Events and the event object.**

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();          // stop the browser's default full-page submit
  const email = form.querySelector('#email').value.trim();
  if (!email) { showError('Email required'); return; }
  // ...proceed
});
```

- **Default actions:** a `<form>` submit reloads/navigates by default; `event.preventDefault()` stops it so JS can handle it.
- **Event flow:** an event travels **capture** (document → target) then **bubble** (target → document). Most handlers run on the bubble phase. **Event delegation** uses bubbling to handle many children with one listener on a parent.
- **Timing:** a listener attached before the element exists in the DOM binds to nothing. Run scripts after the DOM is ready (`defer`, or a `DOMContentLoaded` handler, or place the script at the end of `<body>`).

**Debugging with Sources.** Set a breakpoint on the submit handler, click "Sign in," and step (`F10` over, `F11` into). Inspect variables in Scope. A breakpoint that never hits tells you the listener isn't wired — itself a clue.

### Common gotchas
- Forgetting `preventDefault()`, so the page reloads and "nothing happens."
- A selector typo → `null` → "Cannot read properties of null."
- Script runs before the DOM exists, so listeners attach to nothing.
- `addEventListener('click', handler())` — calling the handler instead of passing it.

## 🧪 Hands-on Labs

Work through **`labs/lab-02-login-form.md`**. You'll get a login form with several planted bugs (a bad selector, a missing `preventDefault`, a listener that calls instead of references its handler, and a script-timing issue). You'll reproduce each from the Console/Sources, fix it, and verify the form validates and submits without reloading. The pure-logic validation is also unit-tested in Node.

## 🔍 Engineering Investigation

Open the broken form. Before changing anything, catalog the symptoms: what does the Console say on load? On click? Set a breakpoint in the submit handler — does it hit? For each bug, write the symptom, the evidence that localized it, and the fix. Resist "try a change and see" — localize first.

## 🤖 AI Engineering Exercise

Paste one Console error to an AI and ask for the cause. **Verify** by reproducing in the debugger — AIs often offer a plausible-but-wrong fix that masks the real bug (e.g. wrapping everything in `try/catch`). **Log** the difference between the AI's guess and what the debugger proved.

## 📝 Assignment

Fix all planted bugs so the form validates (non-empty, valid-looking email) and submits without reload, showing a success message. Submit a bug log (symptom → evidence → fix for each), the corrected code, and the passing Node tests for the validation logic.

## 🚀 Stretch Goal

Refactor the field-level error handling to use **event delegation** (one listener on the form rather than one per field) and explain how bubbling makes that possible.

## ✅ Definition of Done

- [ ] DOM selection and inspection done from both JS and Elements
- [ ] Listeners correctly attached; event flow + `preventDefault` understood
- [ ] Each bug localized with debugger/Console evidence before fixing
- [ ] Form validates and submits without a page reload
- [ ] Validation logic passes the Node unit tests

## 🪞 Reflection

Which bug would have taken longest to find by guessing, and what instrument found it fastest? How does "localize before fixing" change your debugging?
