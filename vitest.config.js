import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: 45000,  // Browser launch + axe analysis needs room
    hookTimeout: 15000,
    include: ['patterns/**/*.test.js'],
    reporter: 'verbose',
  },
});
