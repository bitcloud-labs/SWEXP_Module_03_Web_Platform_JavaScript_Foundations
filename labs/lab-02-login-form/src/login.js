/**
 * Lab 02 — Debug a Broken Login Form. See README.md.
 * Fix bugs A (selector), B (passing vs calling), C (preventDefault).
 */

/**
 * Pure validation. Returns an error string, or null when valid.
 * @param {string} email
 * @param {string} password
 * @returns {string|null}
 */
export function validate(email, password) {
  if (!email || !email.includes('@')) return 'Enter a valid email';
  if (!password || password.length < 8) return 'Password must be at least 8 characters';
  return null; // null === valid
}

/**
 * Wire the login form on the given document.
 * @param {Document} doc
 */
export function initLoginForm(doc) {
  // BUG A: this selector matches nothing. Fix it to '#login-form'.
  const form = doc.querySelector('#signin-form');

  function onSubmit(event) {
    // BUG C: without preventDefault the form does a full page reload.
    const email = doc.querySelector('#email').value;
    const password = doc.querySelector('#password').value;
    const err = validate(email, password);
    const msg = doc.querySelector('#message');
    if (err) {
      msg.className = 'error';
      msg.textContent = err;
    } else {
      msg.className = 'ok';
      msg.textContent = 'Signed in!';
    }
  }

  // BUG B: this CALLS onSubmit immediately and registers its return value (undefined).
  // Pass the function reference instead.
  form.addEventListener('submit', onSubmit());
}
