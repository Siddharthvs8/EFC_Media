import type { Metadata } from 'next'

import type { Media, Setting } from '@/payload-types'

import { truncate } from './text'
import { absoluteURL, getSiteURL } from './url'

type MetaFields = {
  description?: null | string
  image?: Media | null | number
  title?: null | string
} | null

type MetadataInput = {
  /** Used when the document has no SEO description of its own. */
  description?: null | string
  /** Small line on the generated sharing card, e.g. "Case study". */
  eyebrow?: string
  /** Home page: use the site name + tagline instead of "Title — Suffix". */
  isHome?: boolean
  meta?: MetaFields
  /** Keep this page out of search engines regardless of the site-wide setting. */
  noindex?: boolean
  /** Site-relative path, e.g. "/services/seo". */
  path: string
  publishedTime?: null | string
  settings: Setting
  /** Used when the document has no SEO title of its own. */
  title: string
  type?: 'article' | 'website'
}

const populated = (image?: Media | null | number): Media | null =>
  typeof image === 'object' && image !== null && image.url ? image : null

/** URL of the dynamically generated Open Graph card (see app/(frontend)/og/route.tsx). */
export const generatedOgImage = (title: string, eyebrow?: string): string => {
  const params = new URLSearchParams({ title: truncate(title, 110) })
  if (eyebrow) params.set('eyebrow', truncate(eyebrow, 60))
  return `/og?${params.toString()}`
}

/**
 * Builds Next.js metadata for a page: title, description, canonical URL, Open Graph and
 * Twitter cards and robots rules.
 *
 * Sharing image priority: the document's own SEO image → the default in Site settings →
 * an automatically generated card with the page title.
 */
export const buildMetadata = ({
  description,
  eyebrow,
  isHome,
  meta,
  noindex,
  path,
  publishedTime,
  settings,
  title,
  type = 'website',
}: MetadataInput): Metadata => {
  const siteName = settings.siteName
  const suffix = settings.seo?.titleSuffix?.trim() || siteName
  const baseTitle = meta?.title?.trim() || title

  const fullTitle = isHome
    ? meta?.title?.trim() || [siteName, settings.tagline].filter(Boolean).join(' — ')
    : `${baseTitle} — ${suffix}`

  const metaDescription = truncate(
    meta?.description?.trim() || description?.trim() || settings.seo?.description?.trim() || '',
    170,
  )

  const image = populated(meta?.image) ?? populated(settings.seo?.image)
  const imageURL = image
    ? (image.sizes?.og?.url ?? (image.url as string))
    : generatedOgImage(isHome ? (settings.tagline ?? siteName) : baseTitle, eyebrow ?? siteName)

  const indexable = Boolean(settings.launch?.allowIndexing) && !noindex

  return {
    title: { absolute: fullTitle },
    description: metaDescription || undefined,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: metaDescription || undefined,
      images: [{ alt: image?.alt || baseTitle, height: 630, url: imageURL, width: 1200 }],
      locale: 'en_IN',
      siteName,
      type,
      url: path,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription || undefined,
      images: [imageURL],
    },
    robots: indexable ? { follow: true, index: true } : { follow: false, index: false },
  }
}

/* -------------------------------------------------------------------------- */
/*  Structured data (JSON-LD)                                                 */
/* -------------------------------------------------------------------------- */

type JsonLd = Record<string, unknown>

const compact = (data: JsonLd): JsonLd =>
  Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && !value.length),
    ),
  )

export const organizationJsonLd = (settings: Setting): JsonLd => {
  const logo = populated(settings.logo)
  const hasAddress = settings.address || settings.city || settings.region || settings.country

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${getSiteURL()}/#organization`,
    name: settings.siteName,
    slogan: settings.tagline,
    url: getSiteURL(),
    description: settings.seo?.description,
    logo: absoluteURL(logo?.url ?? '/brand/logo.png'),
    email: settings.email,
    telephone: settings.phone,
    address: hasAddress
      ? compact({
          '@type': 'PostalAddress',
          streetAddress: settings.address,
          addressLocality: settings.city,
          addressRegion: settings.region,
          addressCountry: settings.country,
        })
      : undefined,
    sameAs: (settings.social ?? []).map((item) => item.url).filter(Boolean),
  })
}

export const websiteJsonLd = (settings: Setting): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${getSiteURL()}/#website`,
  name: settings.siteName,
  publisher: { '@id': `${getSiteURL()}/#organization` },
  url: getSiteURL(),
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    item: absoluteURL(item.path),
    name: item.name,
    position: index + 1,
  })),
})

export const serviceJsonLd = ({
  description,
  name,
  path,
}: {
  description: string
  name: string
  path: string
}): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  description,
  name,
  provider: { '@id': `${getSiteURL()}/#organization` },
  url: absoluteURL(path),
})

export const articleJsonLd = ({
  authorName,
  dateModified,
  datePublished,
  description,
  headline,
  image,
  path,
}: {
  authorName?: null | string
  dateModified?: null | string
  datePublished?: null | string
  description: string
  headline: string
  image?: null | string
  path: string
}): JsonLd =>
  compact({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@id': `${getSiteURL()}/#organization` },
    dateModified,
    datePublished,
    description,
    headline,
    image: image ? absoluteURL(image) : undefined,
    mainEntityOfPage: absoluteURL(path),
    publisher: { '@id': `${getSiteURL()}/#organization` },
  })
