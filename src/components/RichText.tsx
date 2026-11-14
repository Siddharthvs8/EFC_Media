import type { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

import type { Media as MediaDoc } from '@/payload-types'

import { hasRichText } from '@/lib/lexical'
import { documentPath, type RoutableCollection } from '@/lib/preview'
import { cn } from '@/lib/text'

import { Media } from './Media'

/** Internal links picked in the editor resolve to the document's public URL. */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }): string => {
  const doc = linkNode.fields.doc
  if (!doc || typeof doc.value !== 'object' || doc.value === null) return '#'
  return documentPath(doc.relationTo as RoutableCollection, (doc.value as { slug?: string }).slug)
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  // Images inside rich text go through the same optimised <Media> component as everywhere else.
  upload: ({ node }) => {
    const doc = node.value as MediaDoc | number
    if (typeof doc !== 'object' || doc === null) return null

    return (
      <figure>
        <Media resource={doc} sizes="(min-width: 64rem) 48rem, 100vw" />
        {doc.caption ? <figcaption>{doc.caption}</figcaption> : null}
      </figure>
    )
  },
})

type Props = {
  className?: string
  data?: unknown
  /** Makes the first paragraph larger and lighter (article and page intros). */
  lead?: boolean
}

/** Renders Lexical rich text from the CMS with the site's prose styles. */
export const RichText: React.FC<Props> = ({ className, data, lead }) => {
  const state = data as null | SerializedEditorState | undefined
  if (!state || !hasRichText(state as Parameters<typeof hasRichText>[0])) return null

  return (
    <LexicalRichText
      className={cn('prose', lead && 'prose--lead', className)}
      converters={converters}
      data={state}
    />
  )
}
