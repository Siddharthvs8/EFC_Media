import type { Access, CollectionConfig } from 'payload'

import { APIError, slugField } from 'payload'

import { adminOnlyField, hasRole, isAdminOrEditor, isLoggedIn, publishedOrLoggedIn } from '@/access'
import { publishedAtField, seoTab } from '@/fields/seo'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateOnDelete, revalidateOnPublish } from '@/hooks/revalidate'
import { previewPath } from '@/lib/preview'

/** Editors and admins can edit any article; authors only the ones they created. */
const editOwnOrAll: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, 'admin', 'editor')) return true
  return { createdBy: { equals: user.id } }
}

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: { singular: 'Article', plural: 'Insights' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', '_status', 'publishedAt'],
    description: 'Articles for the Insights section at /insights/…',
    livePreview: {
      url: ({ data }) => previewPath('posts', data?.slug as string) ?? '/insights',
    },
    preview: (data) => previewPath('posts', data?.slug as string),
  },
  defaultPopulate: { title: true, slug: true },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: editOwnOrAll,
    delete: isAdminOrEditor,
    readVersions: isLoggedIn,
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 260,
      admin: { rows: 3, description: 'One or two sentences. Shown on cards and under the title.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Landscape works best (about 1600 × 1000).' },
            },
            { name: 'content', type: 'richText', label: 'Body', required: true },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team',
      admin: {
        position: 'sidebar',
        description: 'Optional. Leave empty to credit the article to the agency.',
      },
    },
    publishedAtField,
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: { update: adminOnlyField },
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => Boolean(data?.createdBy),
      },
      hooks: {
        beforeChange: [
          ({ operation, req, value }) => (operation === 'create' && req.user ? req.user.id : value),
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [
      // Authors write and save drafts; publishing is an editor/admin decision.
      ({ data, req }) => {
        if (req.user && hasRole(req.user, 'author') && data?._status === 'published') {
          throw new APIError(
            'Authors can save drafts. Ask an editor or admin to publish this article.',
            403,
            undefined,
            true,
          )
        }
        return data
      },
      populatePublishedAt,
    ],
    afterChange: [revalidateOnPublish],
    afterDelete: [revalidateOnDelete],
  },
}
