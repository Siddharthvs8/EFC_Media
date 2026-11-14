import type { PayloadRequest } from 'payload'

import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { getSafeRedirect } from 'payload/shared'

/**
 * GET /next/preview?path=/services/seo&previewSecret=…
 *
 * Opened by the admin's "Preview" button and Live Preview. Requires both the shared
 * preview secret and a signed-in admin user, then switches on Next.js draft mode (so
 * pages render the latest drafts, uncached) and redirects to the page.
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!process.env.PREVIEW_SECRET || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page.', { status: 403 })
  }

  if (!path) {
    return new Response('Missing "path".', { status: 400 })
  }

  // Only ever redirect to a path on this site.
  const safePath = getSafeRedirect({ fallbackTo: '', redirectTo: path })
  if (!safePath) {
    return new Response('Previews are only available for pages on this site.', { status: 400 })
  }

  const payload = await getPayload({ config })
  const draft = await draftMode()

  let user = null
  try {
    const result = await payload.auth({
      headers: request.headers,
      req: request as unknown as PayloadRequest,
    })
    user = result.user
  } catch (err) {
    payload.logger.error({ err, msg: 'Could not verify the user for preview.' })
  }

  if (!user) {
    draft.disable()
    return new Response('Sign in to the admin to preview this page.', { status: 403 })
  }

  draft.enable()
  redirect(safePath)
}
