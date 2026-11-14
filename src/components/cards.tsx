import Link from 'next/link'
import React from 'react'

import type { CaseStudyCard, PostCard } from '@/lib/data'
import type { Team, Testimonial } from '@/payload-types'

import { documentPath } from '@/lib/preview'
import { cn, formatDate, pad2 } from '@/lib/text'

import { isPopulatedMedia, Media } from './Media'
import { PlaceholderBadge } from './Section'

/** Stand-in artwork when an item has no image yet: a calm panel with the brand disc. */
export const CoverFallback: React.FC<{ index?: number }> = ({ index = 0 }) => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
    <div
      className="absolute aspect-square w-[62%] rounded-full"
      style={{
        background: 'var(--brand-gradient)',
        ...(index % 2 === 0 ? { bottom: '-22%', right: '-12%' } : { left: '-14%', top: '-26%' }),
      }}
    />
    <span className="display-xl absolute bottom-4 left-5 opacity-20">{pad2(index + 1)}</span>
  </div>
)

const revealStyle = (index: number): React.CSSProperties => ({ '--i': index }) as React.CSSProperties

/* -------------------------------------------------------------------------- */

export const WorkCard: React.FC<{
  eager?: boolean
  /** h3 under a section heading (default); h2 when the cards follow the page title directly. */
  headingLevel?: 'h2' | 'h3'
  index: number
  item: CaseStudyCard
  sizes?: string
}> = ({ eager, headingLevel: Heading = 'h3', index, item, sizes = '(min-width: 48rem) 50vw, 100vw' }) => {
  const meta = [item.client, item.industry, item.year].filter(Boolean)

  return (
    <article className="card" data-reveal style={revealStyle(index % 2)}>
      <div className="card-media aspect-[4/3]">
        {isPopulatedMedia(item.coverImage) ? (
          <Media alt="" eager={eager} fill resource={item.coverImage} sizes={sizes} />
        ) : (
          <CoverFallback index={index} />
        )}
        {item.placeholder ? (
          <PlaceholderBadge className="absolute top-4 left-4 z-[2]">Placeholder</PlaceholderBadge>
        ) : null}
      </div>

      {meta.length ? (
        <p className="index-num mt-5 flex flex-wrap gap-x-2.5 gap-y-1 uppercase">
          {meta.map((value, metaIndex) => (
            <React.Fragment key={metaIndex}>
              {metaIndex > 0 ? <span aria-hidden="true">/</span> : null}
              <span>{value}</span>
            </React.Fragment>
          ))}
        </p>
      ) : null}

      <Heading className={cn('display-sm', meta.length ? 'mt-2' : 'mt-5')}>
        <Link className="card__link" href={documentPath('case-studies', item.slug)}>
          <span className="card__title">{item.title}</span>
        </Link>
      </Heading>

      <p className="text-muted mt-2.5 max-w-[46ch]">{item.summary}</p>
    </article>
  )
}

/* -------------------------------------------------------------------------- */

export const PostCardView: React.FC<{
  headingLevel?: 'h2' | 'h3'
  index: number
  item: PostCard
  sizes?: string
}> = ({
  headingLevel: Heading = 'h3',
  index,
  item,
  sizes = '(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw',
}) => {
  const category = (item.categories ?? []).find(
    (value): value is Exclude<typeof value, number> => typeof value === 'object' && value !== null,
  )

  return (
    <article className="card" data-reveal style={revealStyle(index % 3)}>
      <div className="card-media aspect-[3/2]">
        {isPopulatedMedia(item.coverImage) ? (
          <Media alt="" fill resource={item.coverImage} sizes={sizes} />
        ) : (
          <CoverFallback index={index} />
        )}
      </div>

      <p className="index-num mt-5 flex flex-wrap gap-x-2.5 uppercase">
        {category ? (
          <>
            <span>{category.title}</span>
            <span aria-hidden="true">/</span>
          </>
        ) : null}
        <time dateTime={item.publishedAt ?? undefined}>{formatDate(item.publishedAt)}</time>
      </p>

      <Heading className="display-sm mt-2">
        <Link className="card__link" href={documentPath('posts', item.slug)}>
          <span className="card__title">{item.title}</span>
        </Link>
      </Heading>

      <p className="text-muted mt-2.5 max-w-[44ch]">{item.excerpt}</p>
    </article>
  )
}

/* -------------------------------------------------------------------------- */

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

export const TeamCard: React.FC<{ headingLevel?: 'h2' | 'h3'; index: number; member: Team }> = ({
  headingLevel: Heading = 'h3',
  index,
  member,
}) => (
  <li data-reveal style={revealStyle(index % 4)}>
    <div className="card-media aspect-[4/5]">
      {isPopulatedMedia(member.photo) ? (
        <Media
          fill
          resource={member.photo}
          sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 33vw, 50vw"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <span className="display-lg opacity-25">{member.placeholder ? '?' : initials(member.name)}</span>
        </div>
      )}
      {member.placeholder ? (
        <PlaceholderBadge className="absolute top-3 left-3 z-[2]">Placeholder</PlaceholderBadge>
      ) : null}
    </div>
    <Heading className="mt-4 font-sans text-[1.0625rem] font-medium">{member.name}</Heading>
    {member.role ? <p className="text-muted text-sm">{member.role}</p> : null}
    {member.bio ? <p className="text-muted mt-2 text-sm leading-relaxed">{member.bio}</p> : null}
  </li>
)

/* -------------------------------------------------------------------------- */

export const TestimonialCard: React.FC<{ index: number; item: Testimonial }> = ({ index, item }) => {
  const attribution = [item.role, item.company].filter(Boolean).join(', ')

  return (
    <figure className="quote-card" data-reveal style={revealStyle(index % 3)}>
      <div>
        {item.placeholder ? <PlaceholderBadge className="mb-5">Placeholder quote</PlaceholderBadge> : null}
        <blockquote>
          <p>“{item.quote}”</p>
        </blockquote>
      </div>

      <figcaption className="flex items-center gap-3.5">
        <span className="bg-fg/10 relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full text-sm font-medium">
          {isPopulatedMedia(item.avatar) ? (
            <Media alt="" fill resource={item.avatar} sizes="44px" />
          ) : (
            <span aria-hidden="true">{item.placeholder ? '?' : initials(item.name)}</span>
          )}
        </span>
        <span className="text-sm leading-snug">
          <span className="block font-medium">{item.name}</span>
          {attribution ? <span className="text-muted block">{attribution}</span> : null}
        </span>
      </figcaption>
    </figure>
  )
}
