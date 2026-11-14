import type { MetadataRoute } from 'next'

import { getSettings } from '@/lib/data'
import { getSiteURL } from '@/lib/url'

/**
 * /robots.txt
 *
 * Blocks all crawlers until "Let search engines index the site" is switched on in
 * Site settings → Launch; afterwards allows everything except the admin, API and
 * preview routes.
 *
 * Note: Next.js only serves robots.txt from the root of `app/`, which is why this file
 * sits outside the (frontend) route group.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings()

  if (!settings.launch?.allowIndexing) {
    return { rules: [{ disallow: '/', userAgent: '*' }] }
  }

  return {
    host: getSiteURL(),
    rules: [{ allow: '/', disallow: ['/admin', '/api/', '/next/'], userAgent: '*' }],
    sitemap: `${getSiteURL()}/sitemap.xml`,
  }
}
