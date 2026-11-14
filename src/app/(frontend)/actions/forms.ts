'use server'

import config from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import {
  clientIpFromHeaders,
  hashIp,
  issueFormToken,
  RATE_LIMIT,
  verifyFormToken,
} from '@/lib/form-security'
import { HONEYPOT_FIELD, pickSubmitter, toPublicForm, validateSubmission } from '@/lib/forms'

export type FormState =
  | { fieldErrors?: Record<string, string>; message: string; refreshToken?: boolean; status: 'error' }
  | { status: 'idle' }
  | { status: 'success' }

const fail = (message: string, extra: Partial<Extract<FormState, { status: 'error' }>> = {}): FormState => ({
  message,
  status: 'error',
  ...extra,
})

/** Issued when the form mounts in the browser; see src/lib/form-security.ts. */
export async function getFormToken(formId: number): Promise<string> {
  return issueFormToken(Number(formId))
}

/**
 * Handles every form on the site (forms are defined in the CMS under Enquiries → Forms).
 *
 * Order matters: cheap checks first, database work last.
 *   honeypot → signed timing token → field validation → rate limit → save (+ notify by email)
 */
export async function submitForm(_previous: FormState, formData: FormData): Promise<FormState> {
  const formId = Number(formData.get('_form'))
  if (!Number.isInteger(formId) || formId <= 0) {
    return fail('Something went wrong. Please reload the page and try again.')
  }

  // 1. Honeypot — bots that fill every field get a polite "success" and nothing is stored.
  if (String(formData.get(HONEYPOT_FIELD) ?? '').trim() !== '') {
    return { status: 'success' }
  }

  // 2. Signed timing token.
  const token = verifyFormToken(formData.get('_token'), formId)
  if (!token.ok) {
    return token.reason === 'too-fast'
      ? fail('That was quick! Please take a moment to check your message, then send it again.')
      : fail('This form was open for a while, so we refreshed it. Please send your message again.', {
          refreshToken: true,
        })
  }

  try {
    const payload = await getPayload({ config })

    const formDoc = await payload
      .findByID({ collection: 'forms', depth: 0, id: formId })
      .catch(() => null)

    if (!formDoc) {
      return fail('This form is no longer available. Please reload the page and try again.')
    }

    // 3. Validate against the form definition from the CMS.
    const form = toPublicForm(formDoc)
    const input: Record<string, unknown> = {}
    formData.forEach((value, key) => {
      if (typeof value === 'string') input[key] = value
    })

    const { errors, values } = validateSubmission(form, input)
    if (Object.keys(errors).length > 0) {
      return fail('Please check the highlighted fields and try again.', { fieldErrors: errors })
    }

    // 4. Rate limit per visitor.
    const requestHeaders = await headers()
    const ipHash = hashIp(clientIpFromHeaders(requestHeaders))
    const windowStart = new Date(Date.now() - RATE_LIMIT.windowMs).toISOString()

    const { totalDocs: recent } = await payload.count({
      collection: 'form-submissions',
      where: {
        and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: windowStart } }],
      },
    })

    if (recent >= RATE_LIMIT.max) {
      return fail(
        'You’ve sent several messages in a short time. Please try again a little later, or contact us directly.',
      )
    }

    // 5. Save. The form-builder plugin sends the notification emails configured on the form.
    const submitter = pickSubmitter(form, values)

    let sourcePath: string | undefined
    try {
      const referer = requestHeaders.get('referer')
      sourcePath = referer ? new URL(referer).pathname.slice(0, 200) : undefined
    } catch {
      sourcePath = undefined
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        ipHash,
        sourcePath,
        status: 'new',
        submissionData: values,
        submitterEmail: submitter.email,
        submitterName: submitter.name,
      },
    })

    return { status: 'success' }
  } catch (err) {
    console.error('[forms] submission failed', err)
    return fail('Sorry — we couldn’t send your message just now. Please try again in a moment.')
  }
}
