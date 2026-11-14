import type { GenerateDescription, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { PayloadRequest } from 'payload'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { hiddenFromAuthors, hiddenUnlessAdmin, isAdmin, isAdminOrEditor, isLoggedIn } from './access'
import { CaseStudies } from './collections/CaseStudies'
import { Categories, FAQs, Team, Testimonials } from './collections/Library'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { defaultLexical, simpleLexical } from './fields/lexical'
import { Footer, Header, Settings } from './globals'
import { revalidateOnChange, revalidateOnDelete } from './hooks/revalidate'
import { documentPath, type RoutableCollection } from './lib/preview'
import { getSiteURL } from './lib/url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/* -------------------------------------------------------------------------- */
/*  Environment                                                               */
/* -------------------------------------------------------------------------- */

const isVercel = Boolean(process.env.VERCEL)
const blobToken = process.env.BLOB_READ_WRITE_TOKEN || undefined

// Vercel's filesystem is read-only and temporary, so uploads must go to Blob storage there.
if (isVercel && !blobToken) {
  throw new Error(
    'BLOB_READ_WRITE_TOKEN is missing. Connect a Vercel Blob store to this project (Storage → Create → Blob) — media uploads cannot use the Vercel filesystem.',
  )
}

/**
 * Hosted Postgres URLs usually say `sslmode=require`. node-postgres is changing what that
 * means, so ask for what we actually want — an encrypted connection with the server's
 * certificate fully verified — explicitly. Local URLs without sslmode are left alone.
 */
const withVerifiedSSL = (url: string): string =>
  url.replace(/([?&]sslmode=)(?:prefer|require|verify-ca)/, '$1verify-full')

// Migrations use a direct (un-pooled) connection when one is provided — see `npm run migrate`.
const databaseURL = withVerifiedSSL(
  (process.env.DB_USE_UNPOOLED === 'true' && process.env.DATABASE_URL_UNPOOLED) ||
    process.env.DATABASE_URL ||
    '',
)

/* -------------------------------------------------------------------------- */
/*  Email                                                                     */
/* -------------------------------------------------------------------------- */

const emailFromAddress = process.env.EMAIL_FROM_ADDRESS || 'onboarding@resend.dev'
const emailFromName = process.env.EMAIL_FROM_NAME || 'EFC Media website'

/**
 * Resend (API key) takes priority, then any SMTP provider. With neither configured,
 * Payload logs emails to the server console and enquiries are still saved in the admin.
 */
const email = process.env.RESEND_API_KEY
  ? resendAdapter({
      apiKey: process.env.RESEND_API_KEY,
      defaultFromAddress: emailFromAddress,
      defaultFromName: emailFromName,
    })
  : process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: emailFromAddress,
        defaultFromName: emailFromName,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT || 587) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined

/* -------------------------------------------------------------------------- */
/*  SEO plugin helpers ("Auto-generate" buttons in the SEO tab)               */
/* -------------------------------------------------------------------------- */

type SeoDoc = { excerpt?: string; slug?: string; summary?: string; title?: string }

const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) => doc?.title ?? ''

const generateDescription: GenerateDescription<SeoDoc> = ({ doc }) =>
  doc?.summary ?? doc?.excerpt ?? ''

const generateURL: GenerateURL<SeoDoc> = ({ collectionSlug, doc }) =>
  `${getSiteURL()}${documentPath((collectionSlug ?? 'pages') as RoutableCollection, doc?.slug)}`

/* -------------------------------------------------------------------------- */

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · EFC Media',
      description: 'Content management for the EFC Media website.',
      icons: [{ rel: 'icon', type: 'image/png', url: '/brand/icon-192.png' }],
    },
    components: {
      graphics: {
        Icon: '@/components/admin/Graphics#Icon',
        Logo: '@/components/admin/Graphics#Logo',
      },
      beforeDashboard: ['@/components/admin/Dashboard#BeforeDashboard'],
    },
    livePreview: {
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 820, height: 1180 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
  },

  collections: [Pages, Services, CaseStudies, Posts, Categories, Testimonials, Team, FAQs, Media, Users],
  globals: [Header, Footer, Settings],

  editor: defaultLexical,

  db: postgresAdapter({
    pool: { connectionString: databaseURL },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema changes go through migrations (`npm run migrate:create` / `npm run migrate`) so
    // development can never silently alter a shared database. Opt in to drizzle "push"
    // only for a throwaway local database.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),

  email,

  plugins: [
    seoPlugin({ generateDescription, generateTitle, generateURL }),

    formBuilderPlugin({
      fields: {
        country: false,
        date: false,
        payment: false,
        state: false,
        upload: false,
      },
      defaultToEmail: process.env.CONTACT_TO_EMAIL || undefined,
      formOverrides: {
        labels: { singular: 'Form', plural: 'Forms' },
        admin: {
          group: 'Enquiries',
          description:
            'Forms shown on the site. Edit the fields, the confirmation message and who gets notified by email.',
          hidden: hiddenUnlessAdmin,
        },
        access: {
          // Form definitions contain notification addresses, so they are never public.
          // The site reads them on the server only.
          read: isLoggedIn,
          create: isAdmin,
          update: isAdmin,
          delete: isAdmin,
        },
        hooks: {
          afterChange: [revalidateOnChange],
          afterDelete: [revalidateOnDelete],
        },
        fields: ({ defaultFields }) =>
          defaultFields.map((field) =>
            'name' in field && field.name === 'confirmationMessage'
              ? { ...field, editor: simpleLexical }
              : field,
          ),
      },
      formSubmissionOverrides: {
        labels: { singular: 'Enquiry', plural: 'Enquiries' },
        admin: {
          group: 'Enquiries',
          useAsTitle: 'submitterName',
          defaultColumns: ['submitterName', 'submitterEmail', 'form', 'status', 'createdAt'],
          description: 'Messages sent through the forms on the site, newest first.',
          hidden: hiddenFromAuthors,
        },
        access: {
          // Submissions are created only by the site's server action, which applies
          // validation, spam checks and rate limiting first. The public REST API cannot create them.
          create: () => false,
          read: isAdminOrEditor,
          update: isAdminOrEditor,
          delete: isAdmin,
        },
        defaultSort: '-createdAt',
        fields: ({ defaultFields }) => [
          {
            type: 'row',
            fields: [
              {
                name: 'submitterName',
                type: 'text',
                label: 'From',
                admin: { readOnly: true, width: '40%' },
              },
              {
                name: 'submitterEmail',
                type: 'text',
                label: 'Email',
                admin: { readOnly: true, width: '40%' },
              },
              {
                name: 'status',
                type: 'select',
                defaultValue: 'new',
                options: [
                  { label: 'New', value: 'new' },
                  { label: 'In progress', value: 'in-progress' },
                  { label: 'Done', value: 'done' },
                  { label: 'Spam', value: 'spam' },
                ],
                admin: { width: '20%' },
              },
            ],
          },
          ...defaultFields.map((field) => ({
            ...field,
            admin: { ...('admin' in field ? field.admin : {}), readOnly: true },
          })),
          { name: 'sourcePath', type: 'text', label: 'Sent from page', admin: { readOnly: true, position: 'sidebar' } },
          {
            name: 'ipHash',
            type: 'text',
            index: true,
            admin: { hidden: true, readOnly: true },
          },
          { name: 'notes', type: 'textarea', label: 'Internal notes', admin: { rows: 3 } },
        ] as typeof defaultFields,
      },
    }),

    vercelBlobStorage({
      enabled: Boolean(blobToken),
      token: blobToken,
      // Every upload gets a unique, permanent URL (name-AbC123.png). Files are cached for a
      // year at the CDN, so replacing an image must produce a new URL — and a delete followed
      // by a re-upload of the same name can never collide with the old object.
      addRandomSuffix: true,
      // Keep the schema identical whether or not Blob is enabled (local dev vs. production).
      alwaysInsertFields: true,
      // Upload straight from the browser to Blob — avoids Vercel's 4.5 MB request limit (video!).
      clientUploads: true,
      collections: {
        // Serve files directly from the Blob CDN instead of proxying them through a function.
        // (An optional per-environment folder is applied in collections/Media.ts.)
        media: { disablePayloadAccessControl: true },
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || '',
  sharp,

  graphQL: { disable: true },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  upload: {
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
  },

  /**
   * Scheduled publishing runs through Payload's job queue. On Vercel, the cron in
   * `vercel.json` calls /api/payload-jobs/run with `Authorization: Bearer $CRON_SECRET`.
   */
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        return req.headers.get('authorization') === `Bearer ${secret}`
      },
    },
    tasks: [],
  },

  onInit: async (payload) => {
    // On Vercel (Fluid Compute) let the platform close idle Postgres connections before an
    // instance is suspended, so a resumed instance never reuses a dead socket.
    if (isVercel) {
      try {
        const { attachDatabasePool } = await import('@vercel/functions')
        const pool = (payload.db as unknown as { pool?: Parameters<typeof attachDatabasePool>[0] }).pool
        if (pool) attachDatabasePool(pool)
      } catch (err) {
        payload.logger.warn({ err, msg: 'Could not attach the database pool to the Vercel runtime.' })
      }
    }
  },
})
