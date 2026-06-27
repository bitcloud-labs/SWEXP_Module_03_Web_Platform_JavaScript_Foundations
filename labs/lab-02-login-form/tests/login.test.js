// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { validate, initLoginForm } from '../src/login.js';

describe('lab 02 — validate (pure logic)', () => {
  it('passes valid input', () => {
    expect(validate('a@b.com', 'longenough')).toBeNull();
  });
  it('rejects an email with no @', () => {
    expect(validate('bad', 'longenough')).toBe('Enter a valid email');
  });
  it('rejects a missing email', () => {
    expect(validate('', 'longenough')).toBe('Enter a valid email');
  });
  it('rejects a short password', () => {
    expect(validate('a@b.com', 'short')).toBe('Password must be at least 8 characters');
  });
});

describe('lab 02 — the wired form (jsdom)', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="login-form">
        <input type="email" id="email">
        <input type="password" id="password">
        <button type="submit">Sign in</button>
      </form>
      <p id="message"></p>`;
  });

  function submit() {
    const form = document.querySelector('#login-form');
    const event = new window.Event('submit', { cancelable: true, bubbles: true });
    form.dispatchEvent(event);
    return event;
  }

  it('initLoginForm wires the real form without throwing (bug A: selector)', () => {
    expect(() => initLoginForm(document)).not.toThrow();
  });

  it('prevents the default submit — no page reload (bugs B & C)', () => {
    initLoginForm(document);
    document.querySelector('#email').value = 'a@b.com';
    document.querySelector('#password').value = 'longenough';
    const event = submit();
    expect(event.defaultPrevented).toBe(true);
  });

  it('shows a success message for valid input', () => {
    initLoginForm(document);
    document.querySelector('#email').value = 'a@b.com';
    document.querySelector('#password').value = 'longenough';
    submit();
    const msg = document.querySelector('#message');
    expect(msg.textContent).toBe('Signed in!');
    expect(msg.className).toBe('ok');
  });

  it('shows the validation error for bad input', () => {
    initLoginForm(document);
    document.querySelector('#email').value = 'nope';
    document.querySelector('#password').value = 'longenough';
    submit();
    const msg = document.querySelector('#message');
    expect(msg.textContent).toBe('Enter a valid email');
    expect(msg.className).toBe('error');
  });
});
