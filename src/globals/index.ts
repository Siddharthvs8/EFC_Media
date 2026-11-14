import type { GlobalConfig } from 'payload'

import { anyone, isAdminOrEditor } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'
import { TEMPLATE_LABELS } from '@/lib/labels'

const LINK_ROW_LABEL = '@/components/admin/RowLabels#LinkRowLabel'
const TITLE_ROW_LABEL = '@/components/admin/RowLabels#TitleRowLabel'

const globalAccess: GlobalConfig['access'] = {
  read: anyone,
  update: isAdminOrEditor,
}

/** Keeps a history of saved versions so navigation or settings changes can be rolled back. */
const history: GlobalConfig['versions'] = { max: 25 }

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & navigation',
  admin: {
    group: 'Site',
    description: 'The navigation bar at the top of every page.',
  },
  access: globalAccess,
  versions: history,
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation links',
      labels: { singular: 'Link', plural: 'Links' },
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: { RowLabel: LINK_ROW_LABEL },
        description: 'Drag to reorder. Six or fewer links keeps the header comfortable on laptops.',
      },
      fields: [link()],
    },
    link({
      name: 'cta',
      label: 'Header button',
      required: false,
      description: 'The highlighted button at the right of the header. Leave empty to hide it.',
    }),
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Site',
    description: 'The footer at the bottom of every page. Contact details and social links come from Site settings.',
  },
  access: globalAccess,
  versions: history,
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'statement',
      type: 'textarea',
      label: 'Closing line',
      admin: {
        rows: 2,
        description: 'Large line at the top of the footer. Wrap a phrase in *asterisks* to highlight it.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      labels: { singular: 'Column', plural: 'Columns' },
      maxRows: 3,
      admin: { initCollapsed: true, components: { RowLabel: TITLE_ROW_LABEL } },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Link', plural: 'Links' },
          maxRows: 8,
          admin: { initCollapsed: true, components: { RowLabel: LINK_ROW_LABEL } },
          fields: [link()],
        },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Small print links',
      labels: { singular: 'Link', plural: 'Links' },
      maxRows: 4,
      admin: { initCollapsed: true, components: { RowLabel: LINK_ROW_LABEL } },
      fields: [link()],
    },
    {
      name: 'note',
      type: 'text',
      label: 'Small print',
      admin: { description: 'Shown after “© year Site name”. e.g. “All rights reserved.”' },
    },
  ],
}

const SOCIAL_PLATFORMS = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'X (Twitter)', value: 'x' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Threads', value: 'threads' },
  { label: 'Behance', value: 'behance' },
]

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site settings',
  admin: {
    group: 'Site',
    description: 'Brand assets, contact details, social links, SEO defaults and launch switches.',
  },
  access: globalAccess,
  versions: history,
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'siteName', type: 'text', required: true, defaultValue: 'EFC Media', admin: { width: '50%' } },
                { name: 'tagline', type: 'text', defaultValue: 'Your Growth Partner.', admin: { width: '50%' } },
              ],
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo (full)',
              admin: {
                description:
                  'The complete logo. Used in the footer and anywhere there is room. It is always shown whole, at its own proportions, on a light background.',
              },
            },
            {
              name: 'logoMark',
              type: 'upload',
              relationTo: 'media',
              label: 'Header logo (compact)',
              admin: {
                description:
                  'A compact version for the header — the symbol on its own or a horizontal lockup. Falls back to the full logo.',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Square PNG, at least 512 × 512. Shown in browser tabs and bookmarks.' },
            },
          ],
        },
        {
          label: 'Contact',
          description: 'Shown in the footer, on the contact page and in calls to action. Empty fields are simply not shown.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', admin: { width: '50%' } },
                {
                  name: 'phone',
                  type: 'text',
                  admin: { width: '50%', description: 'As you want it displayed, e.g. +91 98765 43210' },
                },
              ],
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp number',
              admin: {
                description: 'Digits only with country code, e.g. 919876543210. Adds a “Chat on WhatsApp” link.',
              },
              validate: (value: unknown) =>
                !value || /^\d{8,15}$/.test(String(value)) ? true : 'Digits only, including the country code.',
            },
            { name: 'address', type: 'textarea', admin: { rows: 3 } },
            {
              type: 'row',
              fields: [
                { name: 'city', type: 'text', admin: { width: '34%' } },
                { name: 'region', type: 'text', label: 'State / region', admin: { width: '33%' } },
                { name: 'country', type: 'text', admin: { width: '33%', description: 'Two-letter code, e.g. IN' } },
              ],
            },
            { name: 'hours', type: 'text', label: 'Opening hours', admin: { description: 'e.g. Mon–Sat, 9:30am–6:30pm IST' } },
            { name: 'mapUrl', type: 'text', label: 'Map link', admin: { description: 'A Google Maps link to your office.' } },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'social',
              type: 'array',
              label: 'Social profiles',
              labels: { singular: 'Profile', plural: 'Profiles' },
              maxRows: 8,
              admin: { components: { RowLabel: TITLE_ROW_LABEL } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'platform', type: 'select', required: true, options: SOCIAL_PLATFORMS, admin: { width: '35%' } },
                    { name: 'url', type: 'text', required: true, label: 'Profile URL', admin: { width: '65%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          description: 'Defaults used when a page has no SEO fields of its own.',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'titleSuffix',
                  type: 'text',
                  defaultValue: 'EFC Media',
                  admin: { description: 'Added after page titles in search results: “Services — EFC Media”.' },
                },
                { name: 'description', type: 'textarea', label: 'Default description', maxLength: 180, admin: { rows: 3 } },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Default sharing image',
                  admin: { description: '1200 × 630. Leave empty to use automatically generated cards.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Labels',
          description:
            'Small pieces of wording used by the service, case study, article and “not found” page templates.',
          fields: [
            {
              name: 'labels',
              type: 'group',
              label: false,
              fields: Object.entries(TEMPLATE_LABELS).map(([name, { defaultValue, label }]) => ({
                name,
                type: 'text' as const,
                defaultValue,
                label,
              })),
            },
          ],
        },
        {
          label: 'Launch',
          description: 'Switches for taking the site from review to live.',
          fields: [
            {
              name: 'launch',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'allowIndexing',
                  type: 'checkbox',
                  label: 'Let search engines index the site',
                  defaultValue: false,
                  admin: {
                    description:
                      'Keep this off while the site is being reviewed. Turn it on at launch so Google can list the site.',
                  },
                },
                {
                  name: 'hidePlaceholders',
                  type: 'checkbox',
                  label: 'Hide placeholder content',
                  defaultValue: false,
                  admin: {
                    description:
                      'When on, anything marked as a placeholder (sample case studies, testimonials, team members, statistics, missing contact details) is removed from the public site.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
