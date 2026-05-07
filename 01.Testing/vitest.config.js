import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      exclude: ['src/demo1'],
    },
  },
});
