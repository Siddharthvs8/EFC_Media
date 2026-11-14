import type { CollectionConfig } from 'payload'

import { APIError, slugField } from 'payload'

import { hiddenFromAuthors, isAdminOrEditor, publishedOrLoggedIn } from '@/access'
import { pageBlocks } from '@/blocks/config'
import { publishedAtField, seoTab } from '@/fields/seo'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateOnDelete, revalidateOnPublish } from '@/hooks/revalidate'
import { previewPath } from '@/lib/preview'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Every page is built from sections you can add, remove, reorder and hide. The page with the slug “home” is the home page.',
    hidden: hiddenFromAuthors,
    livePreview: {
      url: ({ data }) => previewPath('pages', data?.slug as string) ?? '/',
    },
    preview: (data) => previewPath('pages', data?.slug as string),
  },
  defaultPopulate: { title: true, slug: true },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
    readVersions: isAdminOrEditor,
  },
  versions: {
    drafts: {
      autosave: { interval: 500 },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Page sections',
              labels: { singular: 'Section', plural: 'Sections' },
              blocks: pageBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        seoTab(),
      ],
    },
    publishedAtField,
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateOnPublish],
    beforeDelete: [
      async ({ id, req }) => {
        // `npm run seed -- reset` wipes everything on purpose.
        if (req.context?.seeding) return

        const page = await req.payload.findByID({ collection: 'pages', id, depth: 0, draft: true, req })
        if (page?.slug === 'home') {
          throw new APIError('The home page cannot be deleted. Edit its sections instead.', 400)
        }
      },
    ],
    afterDelete: [revalidateOnDelete],
  },
}
