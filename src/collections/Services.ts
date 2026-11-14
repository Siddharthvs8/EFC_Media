import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { hiddenFromAuthors, isAdminOrEditor, publishedOrLoggedIn } from '@/access'
import { detailBlocks } from '@/blocks/config'
import { publishedAtField, seoTab } from '@/fields/seo'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateOnDelete, revalidateOnPublish } from '@/hooks/revalidate'
import { previewPath } from '@/lib/preview'
import { SERVICE_ICON_OPTIONS } from '@/lib/service-icons'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  orderable: true,
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'summary', '_status', 'updatedAt'],
    description:
      'Each service gets its own page at /services/… Drag rows to change the order services appear in across the site.',
    hidden: hiddenFromAuthors,
    livePreview: {
      url: ({ data }) => previewPath('services', data?.slug as string) ?? '/services',
    },
    preview: (data) => previewPath('services', data?.slug as string),
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
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 240,
      admin: {
        rows: 3,
        description: 'One or two sentences. Shown on service listings and at the top of the page.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'intro',
              type: 'richText',
              label: 'Introduction',
              admin: { description: 'A few paragraphs on what this service is and who it is for.' },
            },
            {
              name: 'deliverables',
              type: 'array',
              label: 'What’s included',
              labels: { singular: 'Item', plural: 'Items' },
              admin: {
                initCollapsed: true,
                components: { RowLabel: '@/components/admin/RowLabels#TitleRowLabel' },
              },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', admin: { rows: 2 } },
              ],
            },
          ],
        },
        {
          label: 'More sections',
          description: 'Optional sections shown below the overview: FAQs, process, a call to action…',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Sections',
              labels: { singular: 'Section', plural: 'Sections' },
              blocks: detailBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'spark',
      options: [...SERVICE_ICON_OPTIONS],
      admin: { position: 'sidebar', description: 'Small symbol shown next to the service.' },
    },
    publishedAtField,
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateOnPublish],
    afterDelete: [revalidateOnDelete],
  },
}
