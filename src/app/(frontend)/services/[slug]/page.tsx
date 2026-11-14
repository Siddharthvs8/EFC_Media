import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { WorkCard } from '@/components/cards'
import { CMSLink } from '@/components/CMSLink'
import { Breadcrumbs, NextBand } from '@/components/DetailParts'
import { ServiceIcon } from '@/components/icons'
import { RichHeading } from '@/components/RichHeading'
import { RichText } from '@/components/RichText'
import { JsonLd, Section } from '@/components/Section'
import {
  getCaseStudiesByService,
  getHeader,
  getServiceBySlug,
  getServices,
  getSettings,
  getSlugs,
} from '@/lib/data'
import { resolveLabels } from '@/lib/labels'
import { hasRichText } from '@/lib/lexical'
import { documentPath } from '@/lib/preview'
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from '@/lib/seo'
import { pad2 } from '@/lib/text'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const services = await getSlugs('services')
  return services.map((service) => ({ slug: service.slug }))
}

export default async function ServicePage({ params }: Args) {
  const { slug } = await params
  const service = await getServiceBySlug(decodeURIComponent(slug))
  if (!service) notFound()

  const [services, settings, header, relatedWork] = await Promise.all([
    getServices(),
    getSettings(),
    getHeader(),
    getCaseStudiesByService(service.id, 2),
  ])

  const labels = resolveLabels(settings.labels)
  const index = services.findIndex((item) => item.id === service.id)
  const next = services.length > 1 ? services[(index + 1) % services.length] : null
  const deliverables = service.deliverables ?? []
  const path = documentPath('services', service.slug)
  const hasIntro = hasRichText(service.intro)

  return (
    <>
      <header className="hero hero--page" data-theme="light">
        <div className="wrap hero__inner">
          <Breadcrumbs
            items={[
              { href: '/services', label: labels.servicesAll },
              { label: index >= 0 ? pad2(index + 1) : service.title },
            ]}
          />

          <RichHeading as="h1" className="display-xl hero__title" motion="lines" text={service.title} />

          <div className="hero__bottom">
            <p className="lead rise-in max-w-[36rem]" style={{ '--d': 120 } as React.CSSProperties}>
              {service.summary}
            </p>
            <div className="hero__actions fade-up" style={{ '--d': 520 } as React.CSSProperties}>
              <CMSLink appearance="primary" link={header.cta} />
            </div>
          </div>
        </div>
      </header>

      {hasIntro || deliverables.length ? (
        <Section theme="light">
          <div className="wrap border-line grid gap-x-16 gap-y-12 border-t pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div data-reveal>
              <p className="eyebrow">
                <ServiceIcon className="text-accent" name={service.icon} size={20} />
                {labels.serviceOverview}
              </p>
              <RichText className="mt-7 max-w-[42rem]" data={service.intro} lead />
            </div>

            {deliverables.length ? (
              <aside aria-labelledby="included-heading" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
                <h2 className="display-sm" id="included-heading">
                  {labels.serviceIncluded}
                </h2>
                <ul className="border-line mt-6 border-t">
                  {deliverables.map((item, itemIndex) => (
                    <li className="border-line grid grid-cols-[2.25rem_1fr] gap-x-2 border-b py-4" key={item.id ?? itemIndex}>
                      <span className="index-num pt-1">{pad2(itemIndex + 1)}</span>
                      <div>
                        <h3 className="font-sans font-medium">{item.title}</h3>
                        {item.text ? <p className="text-muted mt-1 text-[0.9375rem]">{item.text}</p> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </Section>
      ) : null}

      <RenderBlocks blocks={service.layout} hasPageHeading />

      {relatedWork.length ? (
        <Section theme="light">
          <div className="wrap">
            <h2 className="display-md mb-10" data-reveal>
              {labels.serviceRelatedWork}
            </h2>
            <div className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-12 md:grid-cols-2">
              {relatedWork.map((item, itemIndex) => (
                <WorkCard index={itemIndex} item={item} key={item.id} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {next && next.id !== service.id ? (
        <NextBand
          backHref="/services"
          backLabel={labels.servicesAll}
          href={documentPath('services', next.slug)}
          label={labels.serviceNext}
          title={next.title}
        />
      ) : null}

      <JsonLd
        data={[
          serviceJsonLd({ description: service.summary, name: service.title, path }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: labels.servicesAll, path: '/services' },
            { name: service.title, path },
          ]),
        ]}
      />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const [service, settings] = await Promise.all([getServiceBySlug(decodeURIComponent(slug)), getSettings()])
  if (!service) return {}

  return buildMetadata({
    description: service.summary,
    eyebrow: 'Services',
    meta: service.meta,
    path: documentPath('services', service.slug),
    settings,
    title: service.title,
  })
}
