import type { Where } from 'payload'

import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { CaseStudy, Faq, Form, Page, Post, Service, Team, Testimonial } from '@/payload-types'

import { CONTENT_TAG } from './cache-tags'

/**
 * Data access for the public site.
 *
 * - Every query runs through the Payload Local API (no HTTP round trip).
 * - Results are cached and share one tag, which Payload hooks expire on publish
 *   (see src/hooks/revalidate.ts) — so pages are static and still update instantly.
 * - In draft mode (admin "Preview" / Live Preview) the cache is bypassed and the
 *   latest drafts are returned instead.
 */

const client = () => getPayload({ config })

export const isDraftMode = cache(async (): Promise<boolean> => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    // No request scope (build-time helpers such as generateStaticParams).
    return false
  }
})

function cmsQuery<Args extends unknown[], Result>(
  name: string,
  query: (draft: boolean, ...args: Args) => Promise<Result>,
): (...args: Args) => Promise<Result> {
  const cachedQuery = unstable_cache((...args: Args) => query(false, ...args), ['cms', name], {
    tags: [CONTENT_TAG],
  })

  return async (...args: Args) => {
    if (await isDraftMode()) return query(true, ...args)

    // `next dev` always reads straight from the database, so content changed outside the
    // admin (seed script, another environment) shows up without restarting the server.
    if (process.env.NODE_ENV === 'development') return query(false, ...args)

    return cachedQuery(...args)
  }
}

/** Published only for the public; drafts included when previewing. */
const visibility = (draft: boolean) => ({ draft, overrideAccess: draft })

const withoutPlaceholders = (hide: boolean): Where[] =>
  hide ? [{ placeholder: { not_equals: true } }] : []

/** Keep documents in the order an editor picked them in a relationship field. */
const inOrder = <T extends { id: number }>(docs: T[], ids: number[]): T[] => {
  const byId = new Map(docs.map((doc) => [doc.id, doc]))
  return ids.map((id) => byId.get(id)).filter((doc): doc is T => Boolean(doc))
}

/** Relationship values arrive as ids or populated documents depending on depth. */
export const toIds = (values?: ({ id: number } | number)[] | null): number[] =>
  (values ?? []).map((value) => (typeof value === 'object' ? value.id : value))

/* -------------------------------------------------------------------------- */
/*  Globals                                                                   */
/* -------------------------------------------------------------------------- */

export const getSettings = cache(
  cmsQuery('settings', async () => (await client()).findGlobal({ slug: 'settings', depth: 1 })),
)

export const getHeader = cache(
  cmsQuery('header', async () => (await client()).findGlobal({ slug: 'header', depth: 1 })),
)

export const getFooter = cache(
  cmsQuery('footer', async () => (await client()).findGlobal({ slug: 'footer', depth: 1 })),
)

export const shouldHidePlaceholders = cache(async (): Promise<boolean> => {
  const settings = await getSettings()
  return Boolean(settings.launch?.hidePlaceholders)
})

/* -------------------------------------------------------------------------- */
/*  Pages                                                                     */
/* -------------------------------------------------------------------------- */

export const getPageBySlug = cache(
  cmsQuery('page', async (draft, slug: string): Promise<null | Page> => {
    const { docs } = await (
      await client()
    ).find({
      collection: 'pages',
      depth: 1,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
      ...visibility(draft),
    })

    return docs[0] ?? null
  }),
)

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export type ServiceCard = Pick<Service, 'deliverables' | 'icon' | 'id' | 'slug' | 'summary' | 'title'>

const queryServices = cmsQuery('services', async (draft, ids: null | number[]): Promise<ServiceCard[]> => {
  const { docs } = await (
    await client()
  ).find({
    collection: 'services',
    depth: 0,
    limit: 100,
    pagination: false,
    select: { deliverables: true, icon: true, slug: true, summary: true, title: true },
    sort: '_order',
    where: ids ? { id: { in: ids } } : {},
    ...visibility(draft),
  })

  const services = docs as unknown as ServiceCard[]
  return ids ? inOrder(services, ids) : services
})

/** All published services in their admin order, or a hand-picked selection. */
export const getServices = (ids?: number[]) => queryServices(ids?.length ? ids : null)

export const getServiceBySlug = cache(
  cmsQuery('service', async (draft, slug: string): Promise<null | Service> => {
    const { docs } = await (
      await client()
    ).find({
      collection: 'services',
      depth: 1,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
      ...visibility(draft),
    })

    return docs[0] ?? null
  }),
)

/* -------------------------------------------------------------------------- */
/*  Case studies                                                              */
/* -------------------------------------------------------------------------- */

export type CaseStudyCard = Pick<
  CaseStudy,
  'client' | 'coverImage' | 'id' | 'industry' | 'placeholder' | 'services' | 'slug' | 'summary' | 'title' | 'year'
>

export type CaseStudySource = 'all' | 'featured' | 'latest' | 'selected'

type CaseStudyQuery = { ids?: number[]; limit?: number; source: CaseStudySource }

const queryCaseStudies = cmsQuery(
  'case-studies',
  async (draft, { ids = [], limit, source }: CaseStudyQuery, hidePlaceholders: boolean): Promise<CaseStudyCard[]> => {
    const payload = await client()

    const find = async (extra: Where[], max: number) => {
      const { docs } = await payload.find({
        collection: 'case-studies',
        depth: 1,
        limit: max,
        pagination: false,
        select: {
          client: true,
          coverImage: true,
          industry: true,
          placeholder: true,
          services: true,
          slug: true,
          summary: true,
          title: true,
          year: true,
        },
        sort: '-publishedAt',
        where: { and: [...withoutPlaceholders(hidePlaceholders), ...extra] },
        ...visibility(draft),
      })

      return docs as unknown as CaseStudyCard[]
    }

    if (source === 'selected') {
      if (!ids.length) return []
      return inOrder(await find([{ id: { in: ids } }], 100), ids)
    }

    const max = source === 'all' ? 100 : (limit ?? 3)

    if (source === 'featured') {
      const featured = await find([{ featured: { equals: true } }], max)
      // Nothing featured yet? Fall back to the most recent work rather than an empty section.
      if (featured.length) return featured
    }

    return find([], max)
  },
)

export const getCaseStudies = async (query: CaseStudyQuery) =>
  queryCaseStudies(query, await shouldHidePlaceholders())

const queryCaseStudiesByService = cmsQuery(
  'case-studies-by-service',
  async (draft, serviceId: number, limit: number, hidePlaceholders: boolean): Promise<CaseStudyCard[]> => {
    const { docs } = await (
      await client()
    ).find({
      collection: 'case-studies',
      depth: 1,
      limit,
      pagination: false,
      select: {
        client: true,
        coverImage: true,
        industry: true,
        placeholder: true,
        services: true,
        slug: true,
        summary: true,
        title: true,
        year: true,
      },
      sort: '-publishedAt',
      where: { and: [...withoutPlaceholders(hidePlaceholders), { services: { in: [serviceId] } }] },
      ...visibility(draft),
    })

    return docs as unknown as CaseStudyCard[]
  },
)

/** Case studies tagged with a service, for the "Related work" strip on service pages. */
export const getCaseStudiesByService = async (serviceId: number, limit = 2) =>
  queryCaseStudiesByService(serviceId, limit, await shouldHidePlaceholders())

export const getCaseStudyBySlug = cache(
  cmsQuery('case-study', async (draft, slug: string): Promise<CaseStudy | null> => {
    const { docs } = await (
      await client()
    ).find({
      collection: 'case-studies',
      depth: 2,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
      ...visibility(draft),
    })

    return docs[0] ?? null
  }),
)

/* -------------------------------------------------------------------------- */
/*  Insights                                                                  */
/* -------------------------------------------------------------------------- */

export type PostCard = Pick<
  Post,
  'categories' | 'coverImage' | 'excerpt' | 'id' | 'publishedAt' | 'slug' | 'title'
>

const queryPosts = cmsQuery('posts', async (draft, limit: number, excludeId: null | number): Promise<PostCard[]> => {
  const { docs } = await (
    await client()
  ).find({
    collection: 'posts',
    depth: 1,
    limit,
    pagination: false,
    select: {
      categories: true,
      coverImage: true,
      excerpt: true,
      publishedAt: true,
      slug: true,
      title: true,
    },
    sort: '-publishedAt',
    where: excludeId ? { id: { not_equals: excludeId } } : {},
    ...visibility(draft),
  })

  return docs as unknown as PostCard[]
})

export const getPosts = ({ excludeId, limit = 100 }: { excludeId?: number; limit?: number } = {}) =>
  queryPosts(limit, excludeId ?? null)

export const getPostBySlug = cache(
  cmsQuery('post', async (draft, slug: string): Promise<null | Post> => {
    const { docs } = await (
      await client()
    ).find({
      collection: 'posts',
      depth: 2,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
      ...visibility(draft),
    })

    return docs[0] ?? null
  }),
)

/* -------------------------------------------------------------------------- */
/*  Library: testimonials, team, FAQs                                         */
/* -------------------------------------------------------------------------- */

const queryTestimonials = cmsQuery(
  'testimonials',
  async (_draft, ids: null | number[], hidePlaceholders: boolean): Promise<Testimonial[]> => {
    const { docs } = await (
      await client()
    ).find({
      collection: 'testimonials',
      depth: 1,
      limit: 50,
      pagination: false,
      sort: '_order',
      where: { and: [...withoutPlaceholders(hidePlaceholders), ...(ids ? [{ id: { in: ids } }] : [])] },
    })

    return ids ? inOrder(docs, ids) : docs
  },
)

export const getTestimonials = async (ids?: number[]) =>
  queryTestimonials(ids?.length ? ids : null, await shouldHidePlaceholders())

const queryTeam = cmsQuery(
  'team',
  async (_draft, ids: null | number[], hidePlaceholders: boolean): Promise<Team[]> => {
    const { docs } = await (
      await client()
    ).find({
      collection: 'team',
      depth: 1,
      limit: 100,
      pagination: false,
      sort: '_order',
      where: { and: [...withoutPlaceholders(hidePlaceholders), ...(ids ? [{ id: { in: ids } }] : [])] },
    })

    return ids ? inOrder(docs, ids) : docs
  },
)

export const getTeam = async (ids?: number[]) =>
  queryTeam(ids?.length ? ids : null, await shouldHidePlaceholders())

const queryFaqs = cmsQuery('faqs', async (_draft, ids: null | number[]): Promise<Faq[]> => {
  const { docs } = await (
    await client()
  ).find({
    collection: 'faqs',
    depth: 1,
    limit: 100,
    pagination: false,
    sort: '_order',
    where: ids ? { id: { in: ids } } : {},
  })

  return ids ? inOrder(docs, ids) : docs
})

export const getFaqs = (ids?: number[]) => queryFaqs(ids?.length ? ids : null)

/* -------------------------------------------------------------------------- */
/*  Forms                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Loads a form definition on the server. Form documents include notification email
 * addresses, so they are never exposed through the public API — components pass only
 * the safe subset to the browser (see src/lib/forms.ts → toPublicForm).
 */
export const getForm = cache(
  cmsQuery('form', async (_draft, id: number): Promise<Form | null> => {
    try {
      return await (await client()).findByID({ collection: 'forms', depth: 0, id })
    } catch {
      return null
    }
  }),
)

/* -------------------------------------------------------------------------- */
/*  Routing helpers (static params, sitemap)                                  */
/* -------------------------------------------------------------------------- */

type SlugEntry = { placeholder?: boolean | null; slug: string; updatedAt: string }

const querySlugs = cmsQuery(
  'slugs',
  async (_draft, collection: 'case-studies' | 'pages' | 'posts' | 'services'): Promise<SlugEntry[]> => {
    const { docs } = await (
      await client()
    ).find({
      collection,
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select:
        collection === 'case-studies'
          ? { placeholder: true, slug: true, updatedAt: true }
          : { slug: true, updatedAt: true },
    })

    return (docs as unknown as SlugEntry[]).filter((doc) => Boolean(doc.slug))
  },
)

export const getSlugs = (collection: 'case-studies' | 'pages' | 'posts' | 'services') =>
  querySlugs(collection)
