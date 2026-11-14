import Link from 'next/link'
import React from 'react'

import type {
  FAQBlock,
  PostsGridBlock,
  ServicesListBlock,
  TeamBlock,
  TestimonialsBlock,
  WorkGridBlock,
} from '@/payload-types'

import { PostCardView, TeamCard, TestimonialCard, WorkCard } from '@/components/cards'
import { CMSLink } from '@/components/CMSLink'
import { Arrow, ServiceIcon } from '@/components/icons'
import { RichText } from '@/components/RichText'
import { JsonLd, Section, SectionHead } from '@/components/Section'
import {
  getCaseStudies,
  getFaqs,
  getPosts,
  getServices,
  getTeam,
  getTestimonials,
  toIds,
} from '@/lib/data'
import { lexicalToPlainText } from '@/lib/lexical'
import { documentPath } from '@/lib/preview'
import { pad2 } from '@/lib/text'

/**
 * Sections that list content from collections (services, case studies, articles,
 * testimonials, team, FAQs). Each one fetches what it needs on the server, and renders
 * nothing at all when there is nothing to show — so an empty collection never leaves
 * an empty shell on the page.
 */

const stagger = (index: number): React.CSSProperties => ({ '--i': index }) as React.CSSProperties

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export const ServicesList = async ({ block }: { block: ServicesListBlock }) => {
  const services = await getServices(block.source === 'selected' ? toIds(block.services) : undefined)
  if (!services.length) return null

  const detailed = block.detail === 'detailed'
  // Item titles sit one level below the section heading, or directly below the page title.
  const Title = block.heading ? 'h3' : 'h2'

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap">
        <SectionHead
          aside={<CMSLink appearance="text" link={block.link} />}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
        />

        {detailed ? (
          <ol>
            {services.map((service, index) => (
              <li className="svc-card" data-reveal key={service.id}>
                <span className="index-num pt-2">{pad2(index + 1)}</span>

                <div>
                  <ServiceIcon className="text-accent mb-5" name={service.icon} size={32} />
                  <Title className="display-md">
                    <Link className="link-underline" href={documentPath('services', service.slug)}>
                      {service.title}
                    </Link>
                  </Title>
                  <p className="text-muted mt-4 max-w-[44ch]">{service.summary}</p>
                  <Link className="text-link mt-6" href={documentPath('services', service.slug)}>
                    Explore {service.title}
                    <Arrow />
                  </Link>
                </div>

                {service.deliverables?.length ? (
                  <ul className="border-line grid content-start gap-0 self-start border-t">
                    {service.deliverables.slice(0, 5).map((item) => (
                      <li
                        className="border-line flex items-baseline gap-3 border-b py-3 text-[0.9375rem]"
                        key={item.id}
                      >
                        <Arrow className="text-accent shrink-0" size={11} />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <ol className="svc-list">
            {services.map((service, index) => (
              <li data-reveal key={service.id} style={stagger(Math.min(index, 5))}>
                <Link className="svc-row" href={documentPath('services', service.slug)}>
                  <span className="index-num">{pad2(index + 1)}</span>
                  <Title className="svc-row__title display-md">{service.title}</Title>
                  <p className="svc-row__summary">{service.summary}</p>
                  <span aria-hidden="true" className="svc-row__arrow">
                    <Arrow size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Work                                                                      */
/* -------------------------------------------------------------------------- */

export const WorkGrid = async ({ block }: { block: WorkGridBlock }) => {
  const caseStudies = await getCaseStudies({
    ids: toIds(block.caseStudies),
    limit: block.limit ?? 3,
    source: block.source,
  })

  if (!caseStudies.length) return null

  const hasPlaceholders = caseStudies.some((item) => item.placeholder)

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap">
        <SectionHead
          aside={<CMSLink appearance="text" link={block.link} />}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
        />

        {hasPlaceholders ? (
          <p className="placeholder-note mb-10 max-w-3xl" data-reveal>
            <strong className="font-semibold">These are placeholder projects.</strong> They show how
            case studies will look and will be replaced with real client work, published with each
            client’s approval.
          </p>
        ) : null}

        <div className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.75rem,5vw,4.5rem)] md:grid-cols-2 md:[&>*:nth-child(even)]:mt-[clamp(3rem,7vw,7rem)]">
          {caseStudies.map((item, index) => (
            <WorkCard headingLevel={block.heading ? 'h3' : 'h2'} index={index} item={item} key={item.id} />
          ))}
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Insights                                                                  */
/* -------------------------------------------------------------------------- */

export const PostsGrid = async ({ block }: { block: PostsGridBlock }) => {
  const posts = await getPosts({ limit: block.source === 'all' ? 100 : (block.limit ?? 3) })

  if (!posts.length) {
    // The archive page should say so rather than render a blank page.
    return block.source === 'all' ? (
      <Section anchor={block.anchor} theme={block.theme}>
        <div className="wrap">
          <p className="lead text-muted max-w-xl">Articles are on their way. Check back soon.</p>
        </div>
      </Section>
    ) : null
  }

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap">
        <SectionHead
          aside={<CMSLink appearance="text" link={block.link} />}
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
        />

        <div className="grid gap-x-[clamp(1.5rem,2.5vw,2.5rem)] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((item, index) => (
            <PostCardView headingLevel={block.heading ? 'h3' : 'h2'} index={index} item={item} key={item.id} />
          ))}
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

export const Testimonials = async ({ block }: { block: TestimonialsBlock }) => {
  const testimonials = await getTestimonials(
    block.source === 'selected' ? toIds(block.testimonials) : undefined,
  )

  if (!testimonials.length) return null

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <div
          aria-label="Testimonials"
          className="snap-row"
          role="group"
          // Keyboard users can scroll the row on small screens.
          tabIndex={testimonials.length > 1 ? 0 : undefined}
        >
          {testimonials.map((item, index) => (
            <TestimonialCard index={index} item={item} key={item.id} />
          ))}
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Team                                                                      */
/* -------------------------------------------------------------------------- */

export const TeamSection = async ({ block }: { block: TeamBlock }) => {
  const members = await getTeam(block.source === 'selected' ? toIds(block.members) : undefined)
  if (!members.length) return null

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <ul className="grid grid-cols-2 gap-x-[clamp(1rem,2.5vw,2.5rem)] gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member, index) => (
            <TeamCard headingLevel={block.heading ? 'h3' : 'h2'} index={index} key={member.id} member={member} />
          ))}
        </ul>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  FAQs                                                                      */
/* -------------------------------------------------------------------------- */

export const FAQSection = async ({ block }: { block: FAQBlock }) => {
  const faqs = await getFaqs(block.source === 'selected' ? toIds(block.faqs) : undefined)
  if (!faqs.length) return null

  const Question = block.heading ? 'h3' : 'h2'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      acceptedAnswer: { '@type': 'Answer', text: lexicalToPlainText(faq.answer) },
      name: faq.question,
    })),
  }

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          {block.eyebrow ? (
            <p className="eyebrow" data-reveal>
              {block.eyebrow}
            </p>
          ) : null}
          {block.heading ? (
            <h2 className="display-lg mt-[1.125rem] max-w-[12ch]" data-reveal style={stagger(1)}>
              {block.heading.replace(/\*/g, '')}
            </h2>
          ) : null}
          {block.intro ? (
            <p className="lead text-muted mt-6 max-w-md" data-reveal style={stagger(2)}>
              {block.intro}
            </p>
          ) : null}
        </div>

        <div data-reveal>
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.id}>
              <summary>
                <Question className="display-sm">{faq.question}</Question>
                <span aria-hidden="true" className="faq-item__icon" />
              </summary>
              <div className="faq-item__body">
                <RichText className="text-muted max-w-[62ch]" data={faq.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>

      <JsonLd data={structuredData} />
    </Section>
  )
}
