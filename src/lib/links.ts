import { documentPath, type RoutableCollection } from './preview'

/** Shape produced by the `link()` field (see src/fields/link.ts). */
export type CMSLinkData = {
  appearance?: 'primary' | 'secondary' | 'text' | null
  label?: null | string
  newTab?: boolean | null
  reference?: {
    relationTo: string
    value: unknown
  } | null
  type?: 'custom' | 'reference' | null
  url?: null | string
}

export type ResolvedLink = {
  appearance: 'primary' | 'secondary' | 'text'
  href: string
  label: string
  newTab: boolean
}

/** Only allow URL forms we expect editors to use — never `javascript:` and friends. */
const SAFE_URL = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i

export const sanitizeHref = (url?: null | string): null | string => {
  const trimmed = url?.trim()
  if (!trimmed) return null
  return SAFE_URL.test(trimmed) ? trimmed : null
}

export const resolveHref = (link?: CMSLinkData | null): null | string => {
  if (!link) return null

  if (link.type === 'custom') return sanitizeHref(link.url)

  const reference = link.reference
  if (reference && typeof reference.value === 'object' && reference.value !== null) {
    const slug = (reference.value as { slug?: null | string }).slug
    if (slug) return documentPath(reference.relationTo as RoutableCollection, slug)
  }

  return null
}

/** A link is only rendered when it has both a label and a destination. */
export const resolveLink = (link?: CMSLinkData | null): null | ResolvedLink => {
  const href = resolveHref(link)
  const label = link?.label?.trim()
  if (!href || !label) return null

  return {
    appearance: link?.appearance ?? 'primary',
    href,
    label,
    newTab: Boolean(link?.newTab),
  }
}

export const isExternal = (href: string): boolean => /^https?:\/\//i.test(href)
