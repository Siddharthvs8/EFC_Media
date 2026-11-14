import { permanentRedirect } from 'next/navigation'

import { CmsPage, cmsPageMetadata } from '@/components/CmsPage'
import { getSlugs } from '@/lib/data'

type Args = { params: Promise<{ slug: string }> }

/**
 * Any other page from the Pages collection: /about, /services, /work, /insights, /contact…
 * Published pages are pre-rendered at build time; pages created later are rendered on
 * first visit and then cached until the next publish.
 */
export async function generateStaticParams() {
  const pages = await getSlugs('pages')
  return pages.filter((page) => page.slug !== 'home').map((page) => ({ slug: page.slug }))
}

export default async function Page({ params }: Args) {
  const { slug } = await params

  // The home page lives at "/", never at "/home".
  if (slug === 'home') permanentRedirect('/')

  return <CmsPage slug={decodeURIComponent(slug)} />
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params
  return cmsPageMetadata(decodeURIComponent(slug))
}
