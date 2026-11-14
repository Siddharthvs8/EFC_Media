import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

import { revalidateTag } from 'next/cache'

import { CONTENT_TAG } from '@/lib/cache-tags'

/**
 * Every public page is statically rendered from cached CMS queries that share one
 * cache tag. Expiring that tag makes the very next visit to any page re-render with
 * fresh content, so "Publish" in the admin is the only step needed to update the site.
 *
 * `{ expire: 0 }` = never serve the stale copy (the next request blocks on a fresh render).
 */
const expireContent = (req: PayloadRequest, reason: string): void => {
  if (req.context?.disableRevalidate) return

  try {
    revalidateTag(CONTENT_TAG, { expire: 0 })
    req.payload.logger.info(`[revalidate] ${reason}`)
  } catch (err) {
    // Outside of a Next.js request (seed script, CLI) there is no cache to expire.
    req.payload.logger.debug({ err, msg: `[revalidate] skipped (${reason})` })
  }
}

/** For collections with drafts: only published content (or un-publishing) affects the site. */
export const revalidateOnPublish: CollectionAfterChangeHook = ({
  collection,
  doc,
  previousDoc,
  req,
}) => {
  const isPublished = doc?._status === 'published'
  const wasPublished = previousDoc?._status === 'published'

  if (isPublished || wasPublished) {
    expireContent(req, `${collection.slug} "${doc?.slug ?? doc?.id}" ${isPublished ? 'published' : 'unpublished'}`)
  }

  return doc
}

/** For collections without drafts (testimonials, team, FAQs, media, forms…): every save is live. */
export const revalidateOnChange: CollectionAfterChangeHook = ({ collection, doc, req }) => {
  expireContent(req, `${collection.slug} ${doc?.id} changed`)
  return doc
}

export const revalidateOnDelete: CollectionAfterDeleteHook = ({ collection, doc, req }) => {
  expireContent(req, `${collection.slug} ${doc?.id} deleted`)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, global, req }) => {
  expireContent(req, `global "${global.slug}" changed`)
  return doc
}
