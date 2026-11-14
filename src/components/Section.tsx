import React from 'react'

import { cn } from '@/lib/text'

import { RichHeading } from './RichHeading'

export type SectionTheme = 'dark' | 'light' | 'tint'

type SectionProps = {
  anchor?: null | string
  children: React.ReactNode
  className?: string
  theme?: null | SectionTheme
} & Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className' | 'id'>

/** Standard page section: sets the colour theme, vertical rhythm and optional anchor. */
export const Section: React.FC<SectionProps> = ({ anchor, children, className, theme, ...rest }) => (
  <section
    className={cn('section', className)}
    data-theme={theme ?? 'light'}
    id={anchor || undefined}
    {...rest}
  >
    {children}
  </section>
)

type SectionHeadProps = {
  /** Extra content on the right (e.g. a "view all" link). */
  aside?: React.ReactNode
  className?: string
  eyebrow?: null | string
  heading?: null | string
  headingLevel?: 'h2' | 'h3'
  intro?: null | string
}

/** Eyebrow, large heading and intro: the opening of most sections. */
export const SectionHead: React.FC<SectionHeadProps> = ({
  aside,
  className,
  eyebrow,
  heading,
  headingLevel = 'h2',
  intro,
}) => {
  if (!eyebrow && !heading && !intro && !aside) return null

  const hasSide = Boolean(intro || aside)

  return (
    <header className={cn('section-head', hasSide && 'section-head--split', className)}>
      <div>
        {eyebrow ? (
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
        ) : null}
        {heading ? (
          <RichHeading
            as={headingLevel}
            className="display-lg section-head__title"
            data-reveal
            style={{ '--i': 1 } as React.CSSProperties}
            text={heading}
          />
        ) : null}
      </div>

      {hasSide ? (
        <div
          className="flex max-w-xl flex-col items-start gap-6 lg:justify-self-end"
          data-reveal
          style={{ '--i': 2 } as React.CSSProperties}
        >
          {intro ? <p className="lead text-muted">{intro}</p> : null}
          {aside}
        </div>
      ) : null}
    </header>
  )
}

export const PlaceholderBadge: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <span className={cn('placeholder-badge', className)}>{children ?? 'Placeholder'}</span>

/** Serialises structured data safely into a JSON-LD script tag. */
export const JsonLd: React.FC<{ data: Record<string, unknown> | Record<string, unknown>[] }> = ({
  data,
}) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    type="application/ld+json"
  />
)
