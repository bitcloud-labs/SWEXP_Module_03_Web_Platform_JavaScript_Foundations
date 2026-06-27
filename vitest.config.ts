import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Each exercise's tests/ folder IS the spec.
    include: ['labs/**/tests/**/*.test.js', 'assignments/**/tests/**/*.test.js'],
    // Default to Node; DOM-dependent specs opt in per file with
    //   // @vitest-environment jsdom
    environment: 'node',
  },
});
