import { describe, expect, it } from 'vitest'

import { resolveLabels, TEMPLATE_LABELS } from '@/lib/labels'
import { hasRichText, lexicalToPlainText, readingMinutes } from '@/lib/lexical'
import { resolveHref, resolveLink, sanitizeHref } from '@/lib/links'
import { documentPath, previewPath } from '@/lib/preview'
import { formatDate, parseHighlight, splitLines, stripHighlight, truncate } from '@/lib/text'

describe('heading highlights', () => {
  it('splits *asterisk* phrases into highlighted segments', () => {
    expect(parseHighlight('We turn clicks into *customers.*')).toEqual([
      { highlight: false, text: 'We turn clicks into ' },
      { highlight: true, text: 'customers.' },
    ])
  })

  it('leaves stray asterisks alone', () => {
    expect(parseHighlight('5 * 3 = 15')).toEqual([{ highlight: false, text: '5 * 3 = 15' }])
  })

  it('strips highlight markers for metadata', () => {
    expect(stripHighlight('Let’s *grow*\ntogether.')).toBe('Let’s grow together.')
  })

  it('splits editor line breaks', () => {
    expect(splitLines('One\r\n\n Two ')).toEqual(['One', 'Two'])
  })
})

describe('links', () => {
  it('resolves references to public paths', () => {
    expect(resolveHref({ type: 'reference', reference: { relationTo: 'pages', value: { slug: 'home' } } })).toBe('/')
    expect(resolveHref({ type: 'reference', reference: { relationTo: 'pages', value: { slug: 'about' } } })).toBe('/about')
    expect(resolveHref({ type: 'reference', reference: { relationTo: 'services', value: { slug: 'seo' } } })).toBe('/services/seo')
    expect(resolveHref({ type: 'reference', reference: { relationTo: 'case-studies', value: { slug: 'x' } } })).toBe('/work/x')
    expect(resolveHref({ type: 'reference', reference: { relationTo: 'posts', value: { slug: 'y' } } })).toBe('/insights/y')
  })

  it('returns nothing for an unpopulated reference or an incomplete link', () => {
    expect(resolveHref({ type: 'reference', reference: { relationTo: 'pages', value: 4 } })).toBeNull()
    expect(resolveLink({ type: 'custom', url: '/contact' })).toBeNull()
    expect(resolveLink({ type: 'custom', url: '/contact', label: 'Contact' })).toMatchObject({ href: '/contact', label: 'Contact' })
  })

  it('only allows safe URL schemes', () => {
    expect(sanitizeHref('https://example.com')).toBe('https://example.com')
    expect(sanitizeHref('mailto:hello@example.com')).toBe('mailto:hello@example.com')
    expect(sanitizeHref('tel:+919999999999')).toBe('tel:+919999999999')
    expect(sanitizeHref('#approach')).toBe('#approach')
    expect(sanitizeHref('javascript:alert(1)')).toBeNull()
    expect(sanitizeHref('//evil.example')).toBeNull()
    expect(sanitizeHref('data:text/html,hi')).toBeNull()
  })
})

describe('paths', () => {
  it('builds document and preview paths', () => {
    expect(documentPath('pages', 'home')).toBe('/')
    expect(documentPath('posts', 'hello')).toBe('/insights/hello')
    expect(previewPath('pages', null)).toBeNull()
    expect(previewPath('services', 'seo')).toContain('path=%2Fservices%2Fseo')
  })
})

describe('rich text helpers', () => {
  const state = {
    root: {
      children: [
        { children: [{ text: 'Hello' }], type: 'heading' },
        { children: [{ text: 'world ' }, { text: 'again' }], type: 'paragraph' },
      ],
      type: 'root',
    },
  }

  it('flattens to plain text', () => {
    expect(lexicalToPlainText(state)).toBe('Hello world again')
    expect(hasRichText(state)).toBe(true)
    expect(hasRichText({ root: { children: [{ children: [], type: 'paragraph' }], type: 'root' } })).toBe(false)
    expect(hasRichText(null)).toBe(false)
  })

  it('estimates reading time, never below a minute', () => {
    expect(readingMinutes(state)).toBe(1)
  })
})

describe('text helpers', () => {
  it('truncates on a word boundary', () => {
    const result = truncate('one two three four five six seven eight nine ten', 20)
    expect(result.length).toBeLessThanOrEqual(20)
    expect(result.endsWith('…')).toBe(true)
  })

  it('formats dates for India', () => {
    expect(formatDate('2026-11-12T20:00:00.000Z')).toBe('13 Nov 2026')
    expect(formatDate(null)).toBe('')
    expect(formatDate('nonsense')).toBe('')
  })
})

describe('template labels', () => {
  it('falls back to defaults and honours saved values', () => {
    const labels = resolveLabels({ serviceIncluded: '  ', servicesAll: 'Everything we do' })

    expect(labels.serviceIncluded).toBe(TEMPLATE_LABELS.serviceIncluded.defaultValue)
    expect(labels.servicesAll).toBe('Everything we do')
    expect(Object.keys(labels)).toHaveLength(Object.keys(TEMPLATE_LABELS).length)
  })
})
