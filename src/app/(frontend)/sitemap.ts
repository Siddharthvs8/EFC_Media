import type { MetadataRoute } from 'next'

import { getSettings, getSlugs } from '@/lib/data'
import { documentPath } from '@/lib/preview'
import { absoluteURL } from '@/lib/url'

/**
 * /sitemap.xml — every published page, service, case study and article.
 * Placeholder case studies are left out, and the sitemap stays empty until
 * "Let search engines index the site" is switched on in Site settings → Launch.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings()
  if (!settings.launch?.allowIndexing) return []

  const [pages, services, caseStudies, posts] = await Promise.all([
    getSlugs('pages'),
    getSlugs('services'),
    getSlugs('case-studies'),
    getSlugs('posts'),
  ])

  const entry = (path: string, updatedAt: string, priority: number): MetadataRoute.Sitemap[number] => ({
    lastModified: updatedAt,
    priority,
    url: absoluteURL(path),
  })

  return [
    ...pages.map((page) =>
      entry(documentPath('pages', page.slug), page.updatedAt, page.slug === 'home' ? 1 : 0.8),
    ),
    ...services.map((service) => entry(documentPath('services', service.slug), service.updatedAt, 0.8)),
    ...caseStudies
      .filter((item) => !item.placeholder)
      .map((item) => entry(documentPath('case-studies', item.slug), item.updatedAt, 0.6)),
    ...posts.map((post) => entry(documentPath('posts', post.slug), post.updatedAt, 0.6)),
  ]
}
