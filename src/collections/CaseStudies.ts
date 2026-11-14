import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { hiddenFromAuthors, isAdminOrEditor, publishedOrLoggedIn } from '@/access'
import { detailBlocks } from '@/blocks/config'
import { placeholderField, publishedAtField, seoTab } from '@/fields/seo'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateOnDelete, revalidateOnPublish } from '@/hooks/revalidate'
import { previewPath } from '@/lib/preview'

export const CaseStudies: CollectionConfig<'case-studies'> = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'featured', '_status', 'updatedAt'],
    description:
      'Client work, shown on the Work page at /work/… Only publish results and quotes the client has approved.',
    hidden: hiddenFromAuthors,
    livePreview: {
      url: ({ data }) => previewPath('case-studies', data?.slug as string) ?? '/work',
    },
    preview: (data) => previewPath('case-studies', data?.slug as string),
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
      maxLength: 260,
      admin: { rows: 3, description: 'One or two sentences. Shown on cards and at the top of the page.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'client', type: 'text', admin: { width: '40%' } },
                { name: 'industry', type: 'text', admin: { width: '35%' } },
                { name: 'year', type: 'text', admin: { width: '25%' } },
              ],
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: { description: 'Which services this project involved.' },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Main image. Landscape works best (about 1600 × 1200).' },
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            { name: 'challenge', type: 'richText', label: 'The challenge' },
            { name: 'approach', type: 'richText', label: 'What we did' },
            { name: 'outcome', type: 'richText', label: 'The outcome' },
            {
              name: 'results',
              type: 'array',
              label: 'Results',
              labels: { singular: 'Result', plural: 'Results' },
              maxRows: 4,
              admin: {
                description: 'Headline figures. Only add numbers you can verify and the client has approved.',
                components: { RowLabel: '@/components/admin/RowLabels#TitleRowLabel' },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
                    { name: 'label', type: 'text', required: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Images' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'media', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
            {
              name: 'testimonial',
              type: 'relationship',
              relationTo: 'testimonials',
              admin: { description: 'Optional client quote for this project.' },
            },
          ],
        },
        {
          label: 'More sections',
          description: 'Optional sections shown below the story.',
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
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Featured case studies appear in “Selected work” sections.' },
    },
    placeholderField,
    publishedAtField,
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateOnPublish],
    afterDelete: [revalidateOnDelete],
  },
}
