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
 * Cron frequency: Hobby projects may only run a cron once a day, so the schedule is daily
 * (00:30 UTC = 06:00 IST) — a scheduled publish goes live on the next run. On a Pro plan,
 * change it to e.g. '*' + '/5 * * * *' (every five minutes) for near-exact timing.
 * Keep it a literal string: Vercel validates this file and rejects computed values.
 */
export const config: VercelConfig = {
  buildCommand: 'npm run ci',
  crons: [{ path: '/api/payload-jobs/run', schedule: '30 0 * * *' }],
  framework: 'nextjs',
  regions: ['sin1'],
}
