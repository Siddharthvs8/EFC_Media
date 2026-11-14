import type { CollectionConfig } from 'payload'

import { anyone, isAdminOrEditor, isLoggedIn } from '@/access'
import { revalidateOnChange, revalidateOnDelete } from '@/hooks/revalidate'

/**
 * Media library. Files are stored in Vercel Blob when BLOB_READ_WRITE_TOKEN is set
 * (see payload.config.ts); the local `/media` folder is only a development fallback.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media file', plural: 'Media' },
  admin: {
    group: 'Library',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    description:
      'Images, videos and documents used across the site. Use folders to keep things tidy.',
  },
  folders: true,
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdminOrEditor,
  },
  upload: {
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'application/pdf',
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
    imageSizes: [
      // The site itself serves responsive AVIF/WebP through next/image from the original
      // file; these two sizes exist for admin previews and social sharing cards.
      { name: 'thumbnail', width: 480 },
      { name: 'og', width: 1200, height: 630, crop: 'center' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text',
      required: true,
      admin: {
        description:
          'Describe what the image or video shows, for people who cannot see it and for search engines.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional. Shown under the media where the design allows.' },
    },
  ],
  hooks: {
    beforeChange: [
      // Optional folder inside the Blob store (e.g. BLOB_PREFIX=dev) so files uploaded from a
      // development database stay apart from production files. Set per document rather than
      // in the storage plugin's options, which would make the database schema differ by
      // environment.
      ({ data, operation }) =>
        operation === 'create' && process.env.BLOB_PREFIX
          ? { ...data, prefix: process.env.BLOB_PREFIX }
          : data,
    ],
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
}
