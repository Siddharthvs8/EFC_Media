import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Spam protection that needs no third-party service:
 *
 * 1. Honeypot field      – real people never see or fill it (handled in the action).
 * 2. Signed timing token – issued when someone starts filling in the form. A submission
 *    must carry a valid token that is at least a couple of seconds old, so scripted
 *    POSTs (no token) and instant bot submissions (too fast) are rejected.
 * 3. Rate limiting       – per visitor, keyed on a salted hash of the IP (never the raw IP).
 */

export const MIN_FILL_MS = 2500
export const MAX_TOKEN_AGE_MS = 6 * 60 * 60 * 1000

/** Max submissions per visitor inside the window. */
export const RATE_LIMIT = { max: 5, windowMs: 15 * 60 * 1000 } as const

const secret = (): string => process.env.FORM_SECRET || process.env.PAYLOAD_SECRET || ''

const sign = (payload: string): string =>
  createHmac('sha256', secret()).update(payload).digest('base64url')

export const issueFormToken = (formId: number | string, now: number = Date.now()): string => {
  const payload = `${formId}.${now}`
  return `${payload}.${sign(payload)}`
}

export type TokenCheck = { ok: false; reason: 'expired' | 'invalid' | 'too-fast' } | { ok: true }

export const verifyFormToken = (
  token: unknown,
  formId: number | string,
  now: number = Date.now(),
): TokenCheck => {
  if (typeof token !== 'string') return { ok: false, reason: 'invalid' }

  const [id, issuedAt, signature, ...rest] = token.split('.')
  if (!id || !issuedAt || !signature || rest.length) return { ok: false, reason: 'invalid' }

  const expected = Buffer.from(sign(`${id}.${issuedAt}`))
  const received = Buffer.from(signature)
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return { ok: false, reason: 'invalid' }
  }

  if (id !== String(formId)) return { ok: false, reason: 'invalid' }

  const age = now - Number(issuedAt)
  if (!Number.isFinite(age) || age < 0) return { ok: false, reason: 'invalid' }
  if (age < MIN_FILL_MS) return { ok: false, reason: 'too-fast' }
  if (age > MAX_TOKEN_AGE_MS) return { ok: false, reason: 'expired' }

  return { ok: true }
}

/** Salted, truncated hash — enough to rate-limit a visitor without storing their IP address. */
export const hashIp = (ip: string): string =>
  createHmac('sha256', secret()).update(`ip:${ip}`).digest('hex').slice(0, 32)

export const clientIpFromHeaders = (headers: Headers): string => {
  const forwarded = headers.get('x-vercel-forwarded-for') || headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
}
