import React, { useId } from 'react'

import type { HeroBlock } from '@/payload-types'

import { CMSLink } from '@/components/CMSLink'
import { isPopulatedMedia, Media } from '@/components/Media'
import { RichHeading } from '@/components/RichHeading'
import { cn, pad2 } from '@/lib/text'

type Props = { block: HeroBlock; isFirst: boolean }

/** Repeat a short phrase so it fills the ring evenly. */
const orbitString = (text: string): string => {
  const unit = `${text.trim()} · `
  return unit.repeat(Math.max(1, Math.ceil(58 / unit.length)))
}

const delay = (ms: number): React.CSSProperties => ({ '--d': ms }) as React.CSSProperties

/**
 * Hero.
 *  - "statement": full-height home page hero with the rising sun graphic. As the page
 *    scrolls, `--p` goes 0 → 1 and the sun drifts up and to the right — the same direction
 *    as the arrow in the logo.
 *  - "page": compact hero for inner pages.
 *
 * Entrances are CSS-only so the headline (the largest paint on the page) never waits for JS.
 */
export const Hero: React.FC<Props> = ({ block, isFirst }) => {
  const orbitId = useId()
  const isStatement = block.style === 'statement'
  const pillars = block.pillars ?? []
  const links = block.links ?? []
  const hasMedia = isPopulatedMedia(block.media)

  return (
    <section
      className={cn('hero', isStatement ? 'hero--statement' : 'hero--page')}
      data-theme={block.theme ?? 'light'}
      id={block.anchor || undefined}
      {...(isStatement ? { 'data-scroll': '', 'data-scroll-end': '0', 'data-scroll-start': '0' } : {})}
    >
      {isStatement ? (
        <div aria-hidden="true" className="hero__sun">
          <div className="hero__sun-inner">
            <div className="hero__disc" />
            {block.orbitText ? (
              <svg className="hero__orbit" viewBox="0 0 100 100">
                <defs>
                  <path d="M50 50m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" id={orbitId} />
                </defs>
                <text>
                  <textPath href={`#${orbitId}`} lengthAdjust="spacing" textLength="287">
                    {orbitString(block.orbitText)}
                  </textPath>
                </text>
              </svg>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="wrap hero__inner">
        {block.eyebrow ? (
          <p className="eyebrow fade-up" style={delay(0)}>
            {block.eyebrow}
          </p>
        ) : null}

        <RichHeading
          as={isFirst ? 'h1' : 'h2'}
          className="display-xl hero__title"
          motion="lines"
          text={block.headline}
        />

        {block.intro || links.length ? (
          <div className="hero__bottom">
            {block.intro ? (
              <p className="lead rise-in max-w-[34rem]" style={delay(120)}>
                {block.intro}
              </p>
            ) : null}

            {links.length ? (
              <div className="hero__actions fade-up" style={delay(520)}>
                {links.map((item) => (
                  <CMSLink key={item.id} link={item.link} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {isStatement && pillars.length ? (
          <ul
            className="hero__pillars fade-up"
            style={{ ...delay(640), '--cols': Math.min(pillars.length, 4) } as React.CSSProperties}
          >
            {pillars.map((pillar, index) => (
              <li className="hero__pillar" key={pillar.id ?? index}>
                <span className="index-num pt-0.5">{pad2(index + 1)}</span>
                <h2 className="font-sans text-[1.0625rem] font-medium">{pillar.title}</h2>
                {pillar.text ? <p>{pillar.text}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}

        {hasMedia ? (
          <div className="hero__media fade-up aspect-[16/9] md:aspect-[21/9]" style={delay(700)}>
            <Media ambient eager fill resource={block.media} sizes="(min-width: 90rem) 86rem, 100vw" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
