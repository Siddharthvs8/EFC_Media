import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { CoverFallback, TestimonialCard } from '@/components/cards'
import { Breadcrumbs, NextBand } from '@/components/DetailParts'
import { isPopulatedMedia, Media } from '@/components/Media'
import { RichHeading } from '@/components/RichHeading'
import { RichText } from '@/components/RichText'
import { JsonLd, PlaceholderBadge, Section } from '@/components/Section'
import { getCaseStudies, getCaseStudyBySlug, getSettings, getSlugs, shouldHidePlaceholders } from '@/lib/data'
import { resolveLabels } from '@/lib/labels'
import { hasRichText } from '@/lib/lexical'
import { documentPath } from '@/lib/preview'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const caseStudies = await getSlugs('case-studies')
  return caseStudies.map((item) => ({ slug: item.slug }))
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params
  const [caseStudy, hidePlaceholders] = await Promise.all([
    getCaseStudyBySlug(decodeURIComponent(slug)),
    shouldHidePlaceholders(),
  ])

  // Placeholder case studies are not reachable once placeholders are switched off.
  if (!caseStudy || (caseStudy.placeholder && hidePlaceholders)) notFound()

  const [settings, all] = await Promise.all([getSettings(), getCaseStudies({ source: 'all' })])
  const labels = resolveLabels(settings.labels)
  const path = documentPath('case-studies', caseStudy.slug)

  const index = all.findIndex((item) => item.id === caseStudy.id)
  const next = all.length > 1 ? all[(index + 1) % all.length] : null

  const services = (caseStudy.services ?? []).filter(
    (service): service is Exclude<typeof service, number> => typeof service === 'object' && service !== null,
  )

  const facts = [
    { label: labels.caseStudyClient, value: caseStudy.client },
    { label: labels.caseStudyIndustry, value: caseStudy.industry },
    { label: labels.caseStudyYear, value: caseStudy.year },
  ].filter((fact) => Boolean(fact.value))

  const story = [
    { body: caseStudy.challenge, heading: labels.caseStudyChallenge },
    { body: caseStudy.approach, heading: labels.caseStudyApproach },
    { body: caseStudy.outcome, heading: labels.caseStudyOutcome },
  ].filter((part) => hasRichText(part.body))

  const results = caseStudy.results ?? []
  const gallery = (caseStudy.gallery ?? []).filter((item) => isPopulatedMedia(item.media))
  const testimonial =
    typeof caseStudy.testimonial === 'object' && caseStudy.testimonial !== null ? caseStudy.testimonial : null
  const showTestimonial = testimonial && !(testimonial.placeholder && hidePlaceholders)

  return (
    <article>
      <header className="hero hero--page" data-theme="light">
        <div className="wrap hero__inner">
          <Breadcrumbs items={[{ href: '/work', label: labels.workAll }, { label: labels.caseStudyEyebrow }]} />

          <RichHeading as="h1" className="display-xl hero__title" motion="lines" text={caseStudy.title} />

          <p className="lead rise-in mt-[clamp(1.75rem,3.5vw,3rem)] max-w-[40rem]" style={{ '--d': 120 } as React.CSSProperties}>
            {caseStudy.summary}
          </p>

          {caseStudy.placeholder ? (
            <p className="placeholder-note fade-up mt-8 max-w-3xl" style={{ '--d': 480 } as React.CSSProperties}>
              <PlaceholderBadge className="mr-3 align-middle" />
              This is a sample case study that shows the page layout. The client, story and figures are
              not real and will be replaced with approved client work.
            </p>
          ) : null}

          {facts.length || services.length ? (
            <dl
              className="border-line fade-up mt-[clamp(2rem,4vw,3.5rem)] grid gap-x-10 gap-y-6 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4"
              style={{ '--d': 560 } as React.CSSProperties}
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="index-num uppercase">{fact.label}</dt>
                  <dd className="mt-1.5 text-[1.0625rem]">{fact.value}</dd>
                </div>
              ))}
              {services.length ? (
                <div>
                  <dt className="index-num uppercase">{labels.caseStudyServices}</dt>
                  <dd className="mt-1.5 text-[1.0625rem]">
                    {services.map((service, serviceIndex) => (
                      <React.Fragment key={service.id}>
                        {serviceIndex > 0 ? ', ' : null}
                        <Link className="link-underline" href={documentPath('services', service.slug)}>
                          {service.title}
                        </Link>
                      </React.Fragment>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>
      </header>

      <div className="wrap">
        <div className="card-media rise-in aspect-[4/3] md:aspect-[16/9]">
          {isPopulatedMedia(caseStudy.coverImage) ? (
            <Media eager fill resource={caseStudy.coverImage} sizes="(min-width: 90rem) 86rem, 100vw" />
          ) : (
            <CoverFallback index={Math.max(index, 0)} />
          )}
        </div>
      </div>

      {story.length ? (
        <Section theme="light">
          <div className="wrap grid gap-y-[clamp(3rem,6vw,5rem)]">
            {story.map((part, partIndex) => (
              <section
                className="border-line grid gap-x-16 gap-y-6 border-t pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
                data-reveal
                key={part.heading}
              >
                <h2 className="display-md">
                  <span className="index-num mb-3 block font-sans">0{partIndex + 1}</span>
                  {part.heading}
                </h2>
                <RichText className="max-w-[44rem]" data={part.body} lead />
              </section>
            ))}
          </div>
        </Section>
      ) : null}

      {results.length ? (
        <Section theme="dark">
          <div className="wrap">
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <h2 className="display-md" data-reveal>
                {labels.caseStudyResults}
              </h2>
              {caseStudy.placeholder ? <PlaceholderBadge>Placeholder figures</PlaceholderBadge> : null}
            </div>
            <dl className="border-line grid gap-x-10 gap-y-12 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((result, resultIndex) => (
                <div
                  className="flex flex-col gap-3"
                  data-reveal
                  key={result.id ?? resultIndex}
                  style={{ '--i': resultIndex } as React.CSSProperties}
                >
                  <dt className="text-muted max-w-[22ch]">{result.label}</dt>
                  <dd className="stat__value">{result.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      ) : null}

      {gallery.length ? (
        <Section theme="light">
          <div className="wrap grid gap-[clamp(1rem,2.5vw,2.5rem)] md:grid-cols-2">
            {gallery.map((item, itemIndex) => (
              <figure
                className={gallery.length % 2 === 1 && itemIndex === 0 ? 'md:col-span-2' : undefined}
                data-reveal="clip"
                key={item.id ?? itemIndex}
              >
                <div className="card-media aspect-[4/3]">
                  <Media fill resource={item.media} sizes="(min-width: 48rem) 50vw, 100vw" />
                </div>
                {item.caption ? <figcaption className="text-muted mt-3 text-sm">{item.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {showTestimonial ? (
        <Section theme="light">
          <div className="wrap max-w-4xl">
            <TestimonialCard index={0} item={testimonial} />
          </div>
        </Section>
      ) : null}

      <RenderBlocks blocks={caseStudy.layout} hasPageHeading />

      {next && next.id !== caseStudy.id ? (
        <NextBand
          backHref="/work"
          backLabel={labels.workAll}
          href={documentPath('case-studies', next.slug)}
          label={labels.caseStudyNext}
          title={next.title}
        />
      ) : null}

      {/* No structured data for placeholders — sample content must not be presented as fact. */}
      {!caseStudy.placeholder ? (
        <JsonLd
          data={breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: labels.workAll, path: '/work' },
            { name: caseStudy.title, path },
          ])}
        />
      ) : null}
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const [caseStudy, settings] = await Promise.all([getCaseStudyBySlug(decodeURIComponent(slug)), getSettings()])
  if (!caseStudy) return {}

  return buildMetadata({
    description: caseStudy.summary,
    eyebrow: 'Case study',
    meta: caseStudy.meta,
    noindex: Boolean(caseStudy.placeholder),
    path: documentPath('case-studies', caseStudy.slug),
    settings,
    title: caseStudy.title,
  })
}
