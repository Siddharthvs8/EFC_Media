import path from 'node:path'
import { defineConfig } from 'vitest/config'

/** Unit tests for the pure helpers in src/lib (no database or browser needed). */
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
  },
})
