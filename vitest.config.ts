import { defineConfig } from 'vitest/config'

// Logic and data tests only for now, so the default node environment is enough; jsdom and Testing
// Library come with the first component test.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
})
