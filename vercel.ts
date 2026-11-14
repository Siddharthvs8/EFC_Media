import type { VercelConfig } from '@vercel/config/v1'

/**
 * Vercel project configuration (replaces vercel.json).
 *
 * buildCommand – `npm run ci` applies database migrations, then builds the site.
 * regions      – Singapore (sin1): close to the Neon database (also sin1) and to visitors
 *                in India.
 * crons        – runs Payload's job queue, which performs scheduled publishing.
 *                Vercel calls the path with `Authorization: Bearer $CRON_SECRET`.
 *
 * Cron frequency: Hobby projects may only run a cron once a day, so the default is daily
 * (00:30 UTC = 06:00 IST) — a scheduled publish goes live on the next run. On a Pro plan,
 * set the PUBLISH_CRON_SCHEDULE environment variable (for example to every five minutes)
 * and redeploy for near-exact timing.
 */
export const config: VercelConfig = {
  buildCommand: 'npm run ci',
  crons: [
    {
      path: '/api/payload-jobs/run',
      schedule: process.env.PUBLISH_CRON_SCHEDULE || '30 0 * * *',
    },
  ],
  framework: 'nextjs',
  regions: ['sin1'],
}
