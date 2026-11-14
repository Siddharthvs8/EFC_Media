import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSafeRedirect } from 'payload/shared'

/** GET /next/exit-preview?path=/about — leaves draft mode and returns to the public page. */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const safePath = getSafeRedirect({ fallbackTo: '/', redirectTo: searchParams.get('path') ?? '/' })

  const draft = await draftMode()
  draft.disable()

  redirect(safePath || '/')
}
