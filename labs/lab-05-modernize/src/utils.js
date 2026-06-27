/**
 * Lab 05 — Modernize the Codebase. See README.md.
 * Rewrite each function with modern ES6+ idioms, keeping behavior identical.
 */

/** 'First Last <email>' — use a template literal. */
export function formatUser(user) {
  // TODO: return `${user.first} ${user.last} <${user.email}>`;
  return '';
}

/** Emails of users whose active === true — use filter + map. */
export function activeEmails(users) {
  // TODO: users.filter(...).map(...)
  return [];
}

/**
 * Merge options over defaults { page: 1, size: 20, sort: 'name' }.
 * Keep the LEGACY behavior: a falsy value (0, '') falls back to the default,
 * just like the original `opts.page || 1`. (Mind the `||` vs `??` trap.)
 */
export function withDefaults(opts) {
  // TODO: destructure with a default for the whole arg ({ ... } = {}),
  //       then fall back so falsy values become the default (legacy `||` semantics).
  return { page: undefined, size: undefined, sort: undefined };
}

/** Sum a list of numbers — use reduce. */
export function sum(nums) {
  // TODO: nums.reduce(...)
  return 0;
}
