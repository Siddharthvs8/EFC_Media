import type { CollectionBeforeChangeHook } from 'payload'

/** Stamp `publishedAt` the first time a document is published (editors can still override it). */
export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (data?._status === 'published' && !data.publishedAt && !originalDoc?.publishedAt) {
    return { ...data, publishedAt: new Date().toISOString() }
  }

  return data
}
