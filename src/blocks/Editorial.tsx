import React from 'react'

import type {
  ApproachBlock,
  ContentBlock,
  CTABlock,
  FeatureGridBlock,
  MediaBlock as MediaBlockData,
  MediaTextBlock,
  StatsBlock,
} from '@/payload-types'

import { CMSLink } from '@/components/CMSLink'
import { telHref } from '@/components/ContactDetails'
import { isPopulatedMedia, Media } from '@/components/Media'
import { RichHeading } from '@/components/RichHeading'
import { RichText } from '@/components/RichText'
import { PlaceholderBadge, Section, SectionHead } from '@/components/Section'
import { getSettings, shouldHidePlaceholders } from '@/lib/data'
import { cn, pad2 } from '@/lib/text'

const stagger = (index: number): React.CSSProperties => ({ '--i': index }) as React.CSSProperties

/* -------------------------------------------------------------------------- */
/*  Approach — sticky scroll storytelling                                     */
/* -------------------------------------------------------------------------- */

/**
 * The heading stays pinned while the steps scroll past. The step crossing the middle of
 * the screen is emphasised and a gradient rail fills as the visitor moves through them.
 * It is ordinary `position: sticky` layout — scrolling is never hijacked — and on small
 * screens or with reduced motion it is simply a numbered list.
 */
export const Approach: React.FC<{ block: ApproachBlock }> = ({ block }) => {
  const steps = block.steps ?? []
  if (!steps.length) return null

  // Steps sit one level below the section heading (or directly below the page title).
  const StepHeading = block.heading ? 'h3' : 'h2'

  return (
    <Section anchor={block.anchor} className="approach" theme={block.theme}>
      <div className="wrap approach__grid">
        <div className="approach__aside">
          {block.eyebrow ? (
            <p className="eyebrow" data-reveal>
              {block.eyebrow}
            </p>
          ) : null}
          {block.heading ? (
            <RichHeading
              as="h2"
              className="display-lg mt-[1.125rem] max-w-[13ch]"
              data-reveal
              style={stagger(1)}
              text={block.heading}
            />
          ) : null}
          {block.intro ? (
            <p className="lead text-muted mt-6 max-w-md" data-reveal style={stagger(2)}>
              {block.intro}
            </p>
          ) : null}
        </div>

        <div
          className="approach__steps"
          data-scroll
          data-scroll-end="0.55"
          data-scroll-start="0.55"
          data-spy-group
        >
          <span aria-hidden="true" className="approach__rail">
            <span className="approach__rail-fill block" />
          </span>

          <ol>
            {steps.map((step, index) => (
              <li className="approach__step" data-spy key={step.id ?? index}>
                <span aria-hidden="true" className="approach__num block">
                  {pad2(index + 1)}
                </span>
                <StepHeading className="approach__title display-md mt-4">{step.title}</StepHeading>
                <p className="text-muted mt-4 max-w-[46ch]">{step.description}</p>
                {step.keywords ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {step.keywords
                      .split(',')
                      .map((keyword) => keyword.trim())
                      .filter(Boolean)
                      .map((keyword) => (
                        <li className="tag" key={keyword}>
                          {keyword}
                        </li>
                      ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Proof / statistics                                                        */
/* -------------------------------------------------------------------------- */

export const Stats = async ({ block }: { block: StatsBlock }) => {
  const items = block.items ?? []
  if (!items.length) return null

  // Placeholder figures disappear entirely once "Hide placeholder content" is on.
  if (block.placeholder && (await shouldHidePlaceholders())) return null

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        {block.placeholder ? (
          <p className="placeholder-note mb-10 max-w-3xl" data-reveal>
            <strong className="font-semibold">Placeholder figures.</strong> These numbers are not real
            results. Replace them with verified statistics before launch, or hide this section.
          </p>
        ) : null}

        <dl className="border-line grid gap-x-10 gap-y-12 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              className="flex flex-col gap-3"
              data-reveal
              key={item.id ?? index}
              style={stagger(index)}
            >
              <dt className="text-muted max-w-[22ch]">
                {item.label}
                {block.placeholder ? <PlaceholderBadge className="mt-3 flex w-fit" /> : null}
              </dt>
              <dd className="stat__value">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Call to action                                                            */
/* -------------------------------------------------------------------------- */

export const CTA = async ({ block }: { block: CTABlock }) => {
  const settings = block.showContact ? await getSettings() : null
  const links = block.links ?? []

  return (
    <Section anchor={block.anchor} className="cta" data-scroll theme={block.theme}>
      <div aria-hidden="true" className="cta__sun" />

      <div className="wrap relative z-[1]">
        {block.eyebrow ? (
          <p className="eyebrow" data-reveal>
            {block.eyebrow}
          </p>
        ) : null}

        <RichHeading
          as="h2"
          className="display-xl cta__title mt-5"
          data-reveal
          style={stagger(1)}
          text={block.heading}
        />

        {block.text ? (
          <p className="lead text-muted mt-7 max-w-xl" data-reveal style={stagger(2)}>
            {block.text}
          </p>
        ) : null}

        {links.length ? (
          <div className="mt-9 flex flex-wrap gap-3" data-reveal style={stagger(3)}>
            {links.map((item) => (
              <CMSLink key={item.id} link={item.link} />
            ))}
          </div>
        ) : null}

        {settings && (settings.phone || settings.email) ? (
          <p
            className="mt-9 flex flex-wrap gap-x-8 gap-y-2 text-[1.0625rem]"
            data-reveal
            style={stagger(4)}
          >
            {settings.phone ? (
              <a className="link-underline" href={telHref(settings.phone)}>
                {settings.phone}
              </a>
            ) : null}
            {settings.email ? (
              <a className="link-underline" href={`mailto:${settings.email}`}>
                {settings.email}
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Text                                                                      */
/* -------------------------------------------------------------------------- */

export const Content: React.FC<{ block: ContentBlock }> = ({ block }) => {
  const split = block.layout !== 'single'
  const hasHead = Boolean(block.eyebrow || block.heading)

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div
        className={cn(
          'wrap',
          split && hasHead
            ? 'grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]'
            : 'grid gap-8',
        )}
      >
        {hasHead ? (
          <div className={cn(split && 'lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start')}>
            {block.eyebrow ? (
              <p className="eyebrow" data-reveal>
                {block.eyebrow}
              </p>
            ) : null}
            {block.heading ? (
              <RichHeading
                as="h2"
                className={cn('display-md max-w-[16ch]', block.eyebrow && 'mt-[1.125rem]')}
                data-reveal
                style={stagger(1)}
                text={block.heading}
              />
            ) : null}
          </div>
        ) : null}

        <div className={cn(!split || !hasHead ? 'max-w-3xl' : 'max-w-[44rem]')} data-reveal style={stagger(2)}>
          <RichText data={block.richText} lead />
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Image + text                                                              */
/* -------------------------------------------------------------------------- */

export const MediaText: React.FC<{ block: MediaTextBlock }> = ({ block }) => {
  if (!isPopulatedMedia(block.media)) return null

  const mediaFirst = block.mediaPosition === 'left'
  const plate = block.mediaStyle === 'plate'

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap grid items-center gap-x-[clamp(2rem,6vw,6rem)] gap-y-10 lg:grid-cols-2">
        <div className={cn(mediaFirst ? 'lg:order-1' : 'lg:order-2')} data-reveal="clip">
          {plate ? (
            // Logos and graphics are shown whole, at their own proportions, on a light plate.
            <div
              className="border-line grid place-items-center rounded-[clamp(1rem,2vw,2rem)] border bg-[var(--color-paper)] p-[clamp(2.5rem,7vw,6rem)]"
              data-theme="light"
            >
              <Media
                className="h-auto w-full max-w-[17rem]"
                resource={block.media}
                sizes="(min-width: 64rem) 17rem, 60vw"
              />
            </div>
          ) : (
            <div className="card-media aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]">
              <Media fill resource={block.media} sizes="(min-width: 64rem) 50vw, 100vw" />
            </div>
          )}
        </div>

        <div className={cn(mediaFirst ? 'lg:order-2' : 'lg:order-1')}>
          {block.eyebrow ? (
            <p className="eyebrow" data-reveal>
              {block.eyebrow}
            </p>
          ) : null}
          {block.heading ? (
            <RichHeading
              as="h2"
              className={cn('display-md max-w-[16ch]', block.eyebrow && 'mt-[1.125rem]')}
              data-reveal
              style={stagger(1)}
              text={block.heading}
            />
          ) : null}
          <div className="mt-6 max-w-[38rem]" data-reveal style={stagger(2)}>
            <RichText data={block.richText} />
          </div>
          <CMSLink appearance="text" className="mt-8" link={block.link} />
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Image / video                                                             */
/* -------------------------------------------------------------------------- */

export const MediaSection: React.FC<{ block: MediaBlockData }> = ({ block }) => {
  if (!isPopulatedMedia(block.media)) return null

  const media = block.media
  const ratio = media.width && media.height ? `${media.width} / ${media.height}` : '16 / 9'
  const full = block.size === 'full'

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <figure className={cn(full ? 'w-full' : 'wrap', block.size === 'contained' && 'max-w-4xl')}>
        <div
          className={cn('card-media', full && 'rounded-none')}
          data-reveal="clip"
          style={{ aspectRatio: ratio, maxHeight: '86svh' }}
        >
          <Media fill resource={media} sizes={full ? '100vw' : '(min-width: 90rem) 86rem, 100vw'} />
        </div>
        {block.caption || media.caption ? (
          <figcaption className={cn('text-muted mt-4 text-sm', full && 'wrap')}>
            {block.caption || media.caption}
          </figcaption>
        ) : null}
      </figure>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Feature grid                                                              */
/* -------------------------------------------------------------------------- */

export const FeatureGrid: React.FC<{ block: FeatureGridBlock }> = ({ block }) => {
  const items = block.items ?? []
  if (!items.length) return null

  const ItemHeading = block.heading ? 'h3' : 'h2'

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap">
        <SectionHead eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} />

        <ul
          className={cn(
            'grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 sm:grid-cols-2',
            items.length === 2
              ? 'lg:grid-cols-2'
              : items.length === 4
                ? 'lg:grid-cols-4'
                : 'lg:grid-cols-3',
          )}
        >
          {items.map((item, index) => (
            <li className="border-line border-t pt-6" data-reveal key={item.id ?? index} style={stagger(index % 4)}>
              <span className="index-num">{pad2(index + 1)}</span>
              <ItemHeading className="display-sm mt-3">{item.title}</ItemHeading>
              {item.text ? <p className="text-muted mt-3 max-w-[40ch]">{item.text}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
