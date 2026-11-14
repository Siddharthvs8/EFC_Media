import type { Metadata } from 'next'

import Link from 'next/link'
import React from 'react'

import { Arrow } from '@/components/icons'
import { RichHeading } from '@/components/RichHeading'
import { getSettings } from '@/lib/data'
import { resolveLabels } from '@/lib/labels'

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: 'Page not found',
}

export default async function NotFound() {
  const settings = await getSettings()
  const labels = resolveLabels(settings.labels)

  return (
    <section className="hero hero--page" data-theme="light" style={{ minHeight: '82svh' }}>
      <div className="wrap hero__inner justify-center">
        <p className="eyebrow fade-up">Error 404</p>
        <RichHeading as="h1" className="display-xl hero__title" motion="lines" text={labels.notFoundTitle} />
        <p className="lead fade-up mt-8 max-w-xl" style={{ '--d': 420 } as React.CSSProperties}>
          {labels.notFoundText}
        </p>
        <div className="fade-up mt-9" style={{ '--d': 520 } as React.CSSProperties}>
          <Link className="btn btn--primary" href="/">
            {labels.notFoundButton}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
