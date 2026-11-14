import type { Block, Field } from 'payload'

import { simpleLexical } from '@/fields/lexical'
import { link } from '@/fields/link'
import { sectionIntro, sectionSettings } from '@/fields/sectionSettings'

/**
 * Page sections ("blocks").
 *
 * Editors build every page from these: add, remove, reorder, hide and preview them
 * in the admin. Each block has a matching React component in `src/blocks/*.tsx`,
 * wired up in `src/blocks/RenderBlocks.tsx`.
 */

const LINK_ROW_LABEL = '@/components/admin/RowLabels#LinkRowLabel'
const TITLE_ROW_LABEL = '@/components/admin/RowLabels#TitleRowLabel'

const linksArray = (maxRows = 2): Field => ({
  name: 'links',
  type: 'array',
  label: 'Buttons',
  labels: { singular: 'Button', plural: 'Buttons' },
  maxRows,
  admin: { initCollapsed: true, components: { RowLabel: LINK_ROW_LABEL } },
  fields: [link({ appearances: true })],
})

const sourceSelect = (
  name: string,
  options: { label: string; value: string }[],
  defaultValue: string,
): Field => ({
  name,
  type: 'select',
  label: 'Show',
  required: true,
  defaultValue,
  options,
})

/* -------------------------------------------------------------------------- */

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'style',
      type: 'select',
      required: true,
      defaultValue: 'page',
      options: [
        { label: 'Statement — full height, for the home page', value: 'statement' },
        { label: 'Page — compact, for inner pages', value: 'page' },
      ],
    },
    { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the headline.' } },
    {
      name: 'headline',
      type: 'textarea',
      required: true,
      admin: {
        rows: 3,
        description:
          'The page’s main heading. Wrap a word or phrase in *asterisks* to highlight it; press Enter for a line break.',
      },
    },
    { name: 'intro', type: 'textarea', admin: { rows: 3 } },
    linksArray(2),
    {
      name: 'pillars',
      type: 'array',
      label: 'Supporting points',
      labels: { singular: 'Point', plural: 'Points' },
      maxRows: 4,
      admin: {
        initCollapsed: true,
        components: { RowLabel: TITLE_ROW_LABEL },
        description: 'Optional short points under the headline, e.g. Strategy / Content / Ads.',
        condition: (_, siblingData) => siblingData?.style === 'statement',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', admin: { rows: 2 } },
      ],
    },
    {
      name: 'orbitText',
      type: 'text',
      label: 'Orbit text',
      admin: {
        description: 'Short text that circles the sun graphic. Leave empty to hide it.',
        condition: (_, siblingData) => siblingData?.style === 'statement',
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional image or video shown with the hero.' },
    },
    sectionSettings,
  ],
}

export const Marquee: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  labels: { singular: 'Scrolling band', plural: 'Scrolling bands' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 16,
      labels: { singular: 'Word', plural: 'Words' },
      admin: { components: { RowLabel: TITLE_ROW_LABEL } },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'tone',
      type: 'select',
      label: 'Colour',
      defaultValue: 'brand',
      options: [
        { label: 'Brand gradient', value: 'brand' },
        { label: 'Charcoal', value: 'ink' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Section settings',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'isHidden',
          type: 'checkbox',
          label: 'Hide this section',
          defaultValue: false,
        },
      ],
    },
  ],
}

export const Statement: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      admin: {
        rows: 4,
        description:
          'A short, bold paragraph that lights up word by word as visitors scroll. Wrap a phrase in *asterisks* to highlight it.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Supporting columns',
      labels: { singular: 'Column', plural: 'Columns' },
      maxRows: 4,
      admin: { initCollapsed: true, components: { RowLabel: TITLE_ROW_LABEL } },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', admin: { rows: 3 } },
      ],
    },
    link({ required: false, label: 'Link (optional)' }),
    sectionSettings,
  ],
}

export const ServicesList: Block = {
  slug: 'servicesList',
  interfaceName: 'ServicesListBlock',
  labels: { singular: 'Services list', plural: 'Services lists' },
  fields: [
    ...sectionIntro(),
    sourceSelect(
      'source',
      [
        { label: 'All published services', value: 'all' },
        { label: 'Selected services', value: 'selected' },
      ],
      'all',
    ),
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'selected' },
    },
    {
      name: 'detail',
      type: 'select',
      label: 'Layout',
      defaultValue: 'rows',
      options: [
        { label: 'Numbered rows (compact)', value: 'rows' },
        { label: 'Detailed (with what’s included)', value: 'detailed' },
      ],
    },
    link({ required: false, label: 'Link (optional)' }),
    sectionSettings,
  ],
}

export const WorkGrid: Block = {
  slug: 'workGrid',
  interfaceName: 'WorkGridBlock',
  labels: { singular: 'Work / case studies', plural: 'Work sections' },
  fields: [
    ...sectionIntro(),
    sourceSelect(
      'source',
      [
        { label: 'Featured case studies', value: 'featured' },
        { label: 'Latest case studies', value: 'latest' },
        { label: 'All case studies', value: 'all' },
        { label: 'Selected case studies', value: 'selected' },
      ],
      'featured',
    ),
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'selected' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 24,
      admin: {
        step: 1,
        condition: (_, siblingData) =>
          siblingData?.source === 'featured' || siblingData?.source === 'latest',
      },
    },
    link({ required: false, label: 'Link (optional)' }),
    sectionSettings,
  ],
}

export const Approach: Block = {
  slug: 'approach',
  interfaceName: 'ApproachBlock',
  labels: { singular: 'Approach / process', plural: 'Approach sections' },
  fields: [
    ...sectionIntro(),
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Step', plural: 'Steps' },
      admin: { initCollapsed: true, components: { RowLabel: TITLE_ROW_LABEL } },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true, admin: { rows: 3 } },
        {
          name: 'keywords',
          type: 'text',
          admin: { description: 'Optional short tags, separated by commas.' },
        },
      ],
    },
    sectionSettings,
  ],
}

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Proof / statistics', plural: 'Proof sections' },
  fields: [
    ...sectionIntro(),
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Statistic', plural: 'Statistics' },
      admin: { components: { RowLabel: TITLE_ROW_LABEL } },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { width: '30%', description: 'e.g. 120+, 4.8/5, 3×' },
            },
            { name: 'label', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
      ],
    },
    {
      name: 'placeholder',
      type: 'checkbox',
      label: 'These numbers are placeholders',
      defaultValue: false,
      admin: {
        description:
          'Keeps a visible “Placeholder” label on the section. Untick only when every figure is real and verifiable.',
      },
    },
    sectionSettings,
  ],
}

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonial sections' },
  fields: [
    ...sectionIntro(),
    sourceSelect(
      'source',
      [
        { label: 'All testimonials', value: 'all' },
        { label: 'Selected testimonials', value: 'selected' },
      ],
      'all',
    ),
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'selected' },
    },
    sectionSettings,
  ],
}

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Team', plural: 'Team sections' },
  fields: [
    ...sectionIntro(),
    sourceSelect(
      'source',
      [
        { label: 'Everyone', value: 'all' },
        { label: 'Selected people', value: 'selected' },
      ],
      'all',
    ),
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'selected' },
    },
    sectionSettings,
  ],
}

export const PostsGrid: Block = {
  slug: 'postsGrid',
  interfaceName: 'PostsGridBlock',
  labels: { singular: 'Insights / articles', plural: 'Insights sections' },
  fields: [
    ...sectionIntro(),
    sourceSelect(
      'source',
      [
        { label: 'Latest articles', value: 'latest' },
        { label: 'All articles (archive)', value: 'all' },
      ],
      'latest',
    ),
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: { step: 1, condition: (_, siblingData) => siblingData?.source === 'latest' },
    },
    link({ required: false, label: 'Link (optional)' }),
    sectionSettings,
  ],
}

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQs', plural: 'FAQ sections' },
  fields: [
    ...sectionIntro(),
    sourceSelect(
      'source',
      [
        { label: 'All FAQs', value: 'all' },
        { label: 'Selected FAQs', value: 'selected' },
      ],
      'all',
    ),
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'selected' },
    },
    sectionSettings,
  ],
}

export const CTA: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      admin: { rows: 2, description: 'Wrap a word or phrase in *asterisks* to highlight it.' },
    },
    { name: 'text', type: 'textarea', admin: { rows: 3 } },
    linksArray(2),
    {
      name: 'showContact',
      type: 'checkbox',
      label: 'Show phone and email from Site settings',
      defaultValue: true,
    },
    sectionSettings,
  ],
}

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: { singular: 'Text', plural: 'Text sections' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading',
      type: 'textarea',
      admin: { rows: 2, description: 'Optional. Wrap a phrase in *asterisks* to highlight it.' },
    },
    { name: 'richText', type: 'richText', label: 'Text', required: true },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'split',
      options: [
        { label: 'Split — heading left, text right', value: 'split' },
        { label: 'Single column', value: 'single' },
      ],
    },
    sectionSettings,
  ],
}

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: { singular: 'Image or video', plural: 'Images / videos' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full width', value: 'full' },
      ],
    },
    sectionSettings,
  ],
}

export const MediaText: Block = {
  slug: 'mediaText',
  interfaceName: 'MediaTextBlock',
  labels: { singular: 'Image + text', plural: 'Image + text sections' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    {
      name: 'heading',
      type: 'textarea',
      admin: { rows: 2, description: 'Wrap a phrase in *asterisks* to highlight it.' },
    },
    { name: 'richText', type: 'richText', label: 'Text', editor: simpleLexical },
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'mediaPosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Image right', value: 'right' },
            { label: 'Image left', value: 'left' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'mediaStyle',
          type: 'select',
          defaultValue: 'cover',
          options: [
            { label: 'Photo — fills the frame', value: 'cover' },
            { label: 'Logo / graphic — shown whole on a light plate', value: 'plate' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    link({ required: false, label: 'Link (optional)' }),
    sectionSettings,
  ],
}

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  labels: { singular: 'Feature grid', plural: 'Feature grids' },
  fields: [
    ...sectionIntro(),
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { initCollapsed: true, components: { RowLabel: TITLE_ROW_LABEL } },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', admin: { rows: 3 } },
      ],
    },
    sectionSettings,
  ],
}

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  labels: { singular: 'Form', plural: 'Forms' },
  fields: [
    ...sectionIntro(),
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: { description: 'Forms are managed under Enquiries → Forms.' },
    },
    {
      name: 'showContactDetails',
      type: 'checkbox',
      label: 'Show contact details from Site settings beside the form',
      defaultValue: true,
    },
    sectionSettings,
  ],
}

/** Every section available in the page builder, in the order shown in the admin drawer. */
export const pageBlocks: Block[] = [
  Hero,
  Marquee,
  Statement,
  ServicesList,
  WorkGrid,
  Approach,
  Stats,
  Testimonials,
  Team,
  PostsGrid,
  FAQ,
  CTA,
  Content,
  MediaText,
  MediaBlock,
  FeatureGrid,
  FormBlock,
]

/** Sections that make sense below a service or case study's own content. */
export const detailBlocks: Block[] = [
  Statement,
  Approach,
  Stats,
  Testimonials,
  FAQ,
  CTA,
  Content,
  MediaText,
  MediaBlock,
  FeatureGrid,
  WorkGrid,
  FormBlock,
]
