const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, '')

/**
 * Canonical public origin of the site (no trailing slash).
 *
 * 1. NEXT_PUBLIC_SITE_URL — set this once a custom domain is connected.
 * 2. On Vercel production: the project's production domain.
 * 3. On Vercel previews: the deployment URL.
 * 4. Locally: http://localhost:3000
 */
export const getSiteURL = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL)
  }

  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return `http://localhost:${process.env.PORT || 3000}`
}

/** Absolute URL for a site-relative path. */
export const absoluteURL = (path = '/'): string => {
  if (/^https?:\/\//i.test(path)) return path
  return `${getSiteURL()}${path.startsWith('/') ? path : `/${path}`}`
}
