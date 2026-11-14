import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

/**
 * End-to-end tests.
 *
 *   npm run test:e2e                              – starts `npm run dev` (development database)
 *                                                   and runs everything, including the admin flows
 *   BASE_URL=https://your-site.vercel.app npm run test:e2e
 *                                                 – runs the public tests against a deployed site
 *                                                   (admin flows are skipped: they change content
 *                                                   and only ever run against a local server)
 *
 * Browser: set PW_CHANNEL=chrome to use the Chrome already installed on this machine instead
 * of downloading Playwright's Chromium (`npx playwright install chromium`).
 */

// Admin test credentials live in .env.development.local (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD).
dotenv.config({ path: ['.env.development.local', '.env.local'] })

const baseURL = process.env.BASE_URL || 'http://localhost:3000'
const isRemote = Boolean(process.env.BASE_URL)
const channel = process.env.PW_CHANNEL || undefined

export default defineConfig({
  testDir: './tests/e2e',
  // The admin tests change shared content, so run files one at a time.
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    // A local dev server compiles each route on first visit, which can take a while.
    navigationTimeout: isRemote ? 30_000 : 180_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], channel, viewport: { height: 900, width: 1440 } },
    },
    {
      name: 'mobile',
      // Public pages only — the admin panel is a desktop tool.
      testIgnore: /admin\.spec\.ts/,
      use: { ...devices['Pixel 7'], channel },
    },
  ],
  webServer: isRemote
    ? undefined
    : {
        command: 'npm run dev',
        reuseExistingServer: true,
        timeout: 180_000,
        url: 'http://localhost:3000',
      },
})
