import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { RenderBlocks, visibleBlocks } from '@/blocks/RenderBlocks'
import { getPageBySlug, getSettings } from '@/lib/data'
import { documentPath } from '@/lib/preview'
import { buildMetadata } from '@/lib/seo'
import { stripHighlight } from '@/lib/text'

/** Shown instead of a 404 on a brand-new install, before any content exists. */
const SetupNotice: React.FC = () => (
  <section className="section" data-theme="light" style={{ paddingTop: 'calc(var(--header-h) + 5rem)' }}>
    <div className="wrap max-w-2xl">
      <p className="eyebrow">Almost there</p>
      <h1 className="display-lg mt-5">The site has no home page yet.</h1>
      <p className="lead text-muted mt-6">
        Run <code>npm run seed</code> to load the starter content, or sign in at{' '}
        <Link className="underline" href="/admin">
          /admin
        </Link>{' '}
        and create a page with the slug <code>home</code>.
      </p>
    </div>
  </section>
)

/** Renders a page from the Pages collection: its sections, in the order set in the admin. */
export async function CmsPage({ slug }: { slug: string }) {
  const page = await getPageBySlug(slug)

  if (!page) {
    if (slug === 'home') return <SetupNotice />
    notFound()
  }

  const blocks = visibleBlocks(page.layout)
  const startsWithHero = blocks[0]?.blockType === 'hero'
  const hasHero = blocks.some((block) => block.blockType === 'hero')

  return (
    <>
      {/* Every page needs exactly one <h1>; pages without a hero get a visually hidden one. */}
      {!hasHero ? <h1 className="sr-only">{page.title}</h1> : null}
      {/* Clear the fixed header when the first section is not a hero (which does this itself). */}
      {!startsWithHero ? <div aria-hidden="true" style={{ height: 'var(--header-h)' }} /> : null}
      <RenderBlocks blocks={page.layout} hasPageHeading={!hasHero} />
    </>
  )
}

export async function cmsPageMetadata(slug: string): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPageBySlug(slug), getSettings()])
  if (!page) return {}

  const hero = visibleBlocks(page.layout).find((block) => block.blockType === 'hero')
  const intro = hero && hero.blockType === 'hero' ? hero.intro : null

  return buildMetadata({
    description: intro,
    isHome: slug === 'home',
    meta: page.meta,
    path: documentPath('pages', slug),
    settings,
    title: stripHighlight(page.title),
  })
}
