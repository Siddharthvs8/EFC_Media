import { beforeAll, describe, expect, it } from 'vitest'

import {
  clientIpFromHeaders,
  hashIp,
  issueFormToken,
  MAX_TOKEN_AGE_MS,
  MIN_FILL_MS,
  verifyFormToken,
} from '@/lib/form-security'

beforeAll(() => {
  process.env.PAYLOAD_SECRET = 'unit-test-secret'
})

describe('form timing token', () => {
  const issuedAt = 1_800_000_000_000

  it('accepts a token that is old enough and not expired', () => {
    const token = issueFormToken(12, issuedAt)
    expect(verifyFormToken(token, 12, issuedAt + MIN_FILL_MS + 1)).toEqual({ ok: true })
  })

  it('rejects submissions that arrive faster than a person could type', () => {
    const token = issueFormToken(12, issuedAt)
    expect(verifyFormToken(token, 12, issuedAt + 300)).toEqual({ ok: false, reason: 'too-fast' })
  })

  it('rejects expired tokens', () => {
    const token = issueFormToken(12, issuedAt)
    expect(verifyFormToken(token, 12, issuedAt + MAX_TOKEN_AGE_MS + 1)).toEqual({ ok: false, reason: 'expired' })
  })

  it('rejects a token issued for a different form', () => {
    const token = issueFormToken(12, issuedAt)
    expect(verifyFormToken(token, 13, issuedAt + 10_000)).toEqual({ ok: false, reason: 'invalid' })
  })

  it('rejects tampered, malformed and missing tokens', () => {
    const token = issueFormToken(12, issuedAt)
    const [id, , signature] = token.split('.')

    // Pretend the form was opened earlier than it was.
    expect(verifyFormToken(`${id}.${issuedAt - 60_000}.${signature}`, 12, issuedAt + 10).ok).toBe(false)
    expect(verifyFormToken(`${token}x`, 12, issuedAt + 10_000).ok).toBe(false)
    expect(verifyFormToken('not-a-token', 12).ok).toBe(false)
    expect(verifyFormToken(undefined, 12).ok).toBe(false)
    expect(verifyFormToken(null, 12).ok).toBe(false)
  })

  it('rejects tokens from the future', () => {
    const token = issueFormToken(12, issuedAt + 60_000)
    expect(verifyFormToken(token, 12, issuedAt)).toEqual({ ok: false, reason: 'invalid' })
  })
})

describe('visitor hashing', () => {
  it('is stable, salted and never contains the address', () => {
    const hash = hashIp('203.0.113.7')

    expect(hash).toBe(hashIp('203.0.113.7'))
    expect(hash).not.toBe(hashIp('203.0.113.8'))
    expect(hash).toHaveLength(32)
    expect(hash).not.toContain('203')
  })

  it('reads the first forwarded address', () => {
    expect(clientIpFromHeaders(new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }))).toBe('203.0.113.7')
    expect(clientIpFromHeaders(new Headers({ 'x-real-ip': '198.51.100.4' }))).toBe('198.51.100.4')
    expect(clientIpFromHeaders(new Headers())).toBe('unknown')
  })
})
