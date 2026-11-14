import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone, hiddenFromAuthors, isAdminOrEditor } from '@/access'
import { simpleLexical } from '@/fields/lexical'
import { placeholderField } from '@/fields/seo'
import { revalidateOnChange, revalidateOnDelete } from '@/hooks/revalidate'

/**
 * Reusable content that pages pull in: article categories, testimonials, team members
 * and FAQs. These have no drafts — saving a change updates the live site straight away.
 */

const libraryAccess: CollectionConfig['access'] = {
  read: anyone,
  create: isAdminOrEditor,
  update: isAdminOrEditor,
  delete: isAdminOrEditor,
}

const libraryHooks: CollectionConfig['hooks'] = {
  afterChange: [revalidateOnChange],
  afterDelete: [revalidateOnDelete],
}

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  labels: { singular: 'Category', plural: 'Categories' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Topics used to label Insights articles.',
  },
  defaultPopulate: { title: true, slug: true },
  access: libraryAccess,
  hooks: libraryHooks,
  fields: [{ name: 'title', type: 'text', required: true }, slugField()],
}

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  orderable: true,
  admin: {
    group: 'Library',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'placeholder', 'updatedAt'],
    description:
      'Client quotes. Only add quotes the client has given and approved. Drag rows to reorder.',
    hidden: hiddenFromAuthors,
  },
  access: libraryAccess,
  hooks: libraryHooks,
  fields: [
    { name: 'quote', type: 'textarea', required: true, admin: { rows: 4 } },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '34%' } },
        { name: 'role', type: 'text', admin: { width: '33%' } },
        { name: 'company', type: 'text', admin: { width: '33%' } },
      ],
    },
    { name: 'avatar', type: 'upload', relationTo: 'media', label: 'Photo or logo' },
    placeholderField,
  ],
}

export const Team: CollectionConfig<'team'> = {
  slug: 'team',
  labels: { singular: 'Team member', plural: 'Team' },
  orderable: true,
  admin: {
    group: 'Library',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'placeholder', 'updatedAt'],
    description: 'People shown in Team sections and credited on articles. Drag rows to reorder.',
    hidden: hiddenFromAuthors,
  },
  defaultPopulate: { name: true, role: true, photo: true },
  access: libraryAccess,
  hooks: libraryHooks,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'role', type: 'text', label: 'Job title', admin: { width: '50%' } },
      ],
    },
    { name: 'bio', type: 'textarea', admin: { rows: 3 } },
    { name: 'photo', type: 'upload', relationTo: 'media', admin: { description: 'Portrait, about 800 × 1000.' } },
    {
      type: 'row',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL', admin: { width: '50%' } },
        { name: 'instagram', type: 'text', label: 'Instagram URL', admin: { width: '50%' } },
      ],
    },
    placeholderField,
  ],
}

export const FAQs: CollectionConfig<'faqs'> = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  orderable: true,
  admin: {
    group: 'Library',
    useAsTitle: 'question',
    defaultColumns: ['question', 'updatedAt'],
    description: 'Questions and answers shown in FAQ sections. Drag rows to reorder.',
    hidden: hiddenFromAuthors,
  },
  access: libraryAccess,
  hooks: libraryHooks,
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true, editor: simpleLexical },
  ],
}
