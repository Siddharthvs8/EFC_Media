import type { Field, Tab } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

/** "SEO" tab: search title, description and social sharing image for a document. */
export const seoTab = (): Tab => ({
  name: 'meta',
  label: 'SEO',
  description:
    'How this page appears in search results and when shared. Leave blank to use sensible defaults.',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({ hasGenerateFn: true }),
    MetaDescriptionField({ hasGenerateFn: true }),
    MetaImageField({ relationTo: 'media' }),
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ],
})

/** Sidebar checkbox that marks sample content so the site labels it clearly. */
export const placeholderField: Field = {
  name: 'placeholder',
  type: 'checkbox',
  label: 'Placeholder content',
  defaultValue: false,
  admin: {
    position: 'sidebar',
    description:
      'Shows a visible “Placeholder” label on the site and keeps this item out of search engines. Untick once it is real, approved content.',
  },
}

export const publishedAtField: Field = {
  name: 'publishedAt',
  type: 'date',
  label: 'Published on',
  admin: {
    position: 'sidebar',
    date: { pickerAppearance: 'dayAndTime' },
    description: 'Set automatically the first time you publish.',
  },
}
