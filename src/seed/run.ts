import config from '@payload-config'
import { getPayload } from 'payload'

import { seed } from './index'

/**
 * Entry point for `npm run seed` (executed with `payload run`, which loads .env files
 * and TypeScript path aliases).
 *
 *   npm run seed            – load the starter content into an empty database
 *   npm run seed -- reset   – wipe existing content first, then load it again
 *
 * (`payload run` only forwards plain words to the script, so the option is `reset`,
 * not `--reset`. Setting SEED_RESET=true does the same.)
 */
const payload = await getPayload({ config })

const reset = process.argv.includes('reset') || process.env.SEED_RESET === 'true'

let exitCode = 0

try {
  await seed({ payload, reset })
} catch (err) {
  payload.logger.error({ err, msg: '[seed] failed' })
  exitCode = 1
} finally {
  await payload.destroy()
}

process.exit(exitCode)
