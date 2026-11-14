/** URL prefix of each routable collection on the public site. */
export const COLLECTION_PATH_PREFIX = {
  pages: '',
  services: '/services',
  'case-studies': '/work',
  posts: '/insights',
} as const

export type RoutableCollection = keyof typeof COLLECTION_PATH_PREFIX

/** Public path of a document, e.g. ("services", "seo") → "/services/seo". */
export const documentPath = (collection: RoutableCollection, slug?: string | null): string => {
  if (collection === 'pages') return !slug || slug === 'home' ? '/' : `/${slug}`
  return `${COLLECTION_PATH_PREFIX[collection]}/${slug ?? ''}`
}

/**
 * URL the admin opens for "Preview" and Live Preview. It hits /next/preview, which checks
 * the secret and the signed-in user, switches on draft mode and redirects to the page.
 */
export const previewPath = (collection: RoutableCollection, slug?: string | null): string | null => {
  if (!slug) return null

  const path =
    collection === 'pages' && slug === 'home'
      ? '/'
      : `${COLLECTION_PATH_PREFIX[collection]}/${encodeURIComponent(slug)}`

  const params = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}
