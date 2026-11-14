import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { LINKABLE_COLLECTIONS } from './link'

/** Default features we replace or do not need on a marketing site. */
const REMOVED_FEATURES = new Set([
  'heading',
  'link',
  'relationship',
  'checklist',
  'subscript',
  'superscript',
  'indent',
  'align',
])

/**
 * Full editor for long-form content (articles, case studies, page copy):
 * H2–H4, lists, quotes, links to site pages, images and dividers.
 */
export const defaultLexical = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((feature) => !REMOVED_FEATURES.has(feature.key)),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    LinkFeature({ enabledCollections: [...LINKABLE_COLLECTIONS] }),
    FixedToolbarFeature(),
  ],
})

/** Small editor for short answers and intros: paragraphs, emphasis, lists and links. */
export const simpleLexical = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    LinkFeature({ enabledCollections: [...LINKABLE_COLLECTIONS] }),
    InlineToolbarFeature(),
  ],
})
