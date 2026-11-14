import React from 'react'

import type { Page } from '@/payload-types'

import { FAQSection, PostsGrid, ServicesList, TeamSection, Testimonials, WorkGrid } from './Collections'
import { Approach, Content, CTA, FeatureGrid, MediaSection, MediaText, Stats } from './Editorial'
import { FormSection } from './FormSection'
import { Hero } from './Hero'
import { Marquee } from './Marquee'
import { Statement } from './Statement'

export type LayoutBlock = NonNullable<Page['layout']>[number]

type Props = {
  blocks?: LayoutBlock[] | null
  /** True when the surrounding template already rendered the page's <h1>. */
  hasPageHeading?: boolean
}

/** A section is skipped when an editor ticked "Hide this section". */
export const visibleBlocks = (blocks?: LayoutBlock[] | null): LayoutBlock[] =>
  (blocks ?? []).filter((block) => !block.isHidden)

/**
 * Turns the ordered list of sections saved in the CMS into components.
 * To add a new section type: define it in `src/blocks/config.ts`, build its component,
 * and add a case here.
 */
export const RenderBlocks: React.FC<Props> = ({ blocks, hasPageHeading = false }) => {
  const sections = visibleBlocks(blocks)

  // The first hero on a page carries the <h1>, unless the template already rendered one.
  const headingIndex = hasPageHeading ? -1 : sections.findIndex((block) => block.blockType === 'hero')

  return (
    <>
      {sections.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`

        switch (block.blockType) {
          case 'approach':
            return <Approach block={block} key={key} />
          case 'content':
            return <Content block={block} key={key} />
          case 'cta':
            return <CTA block={block} key={key} />
          case 'faq':
            return <FAQSection block={block} key={key} />
          case 'featureGrid':
            return <FeatureGrid block={block} key={key} />
          case 'formBlock':
            return <FormSection block={block} key={key} />
          case 'hero':
            return <Hero block={block} isFirst={index === headingIndex} key={key} />
          case 'marquee':
            return <Marquee block={block} key={key} />
          case 'mediaBlock':
            return <MediaSection block={block} key={key} />
          case 'mediaText':
            return <MediaText block={block} key={key} />
          case 'postsGrid':
            return <PostsGrid block={block} key={key} />
          case 'servicesList':
            return <ServicesList block={block} key={key} />
          case 'statement':
            return <Statement block={block} key={key} />
          case 'stats':
            return <Stats block={block} key={key} />
          case 'team':
            return <TeamSection block={block} key={key} />
          case 'testimonials':
            return <Testimonials block={block} key={key} />
          case 'workGrid':
            return <WorkGrid block={block} key={key} />
          default:
            return null
        }
      })}
    </>
  )
}
