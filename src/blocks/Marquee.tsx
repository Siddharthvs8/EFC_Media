import React from 'react'

import type { MarqueeBlock } from '@/payload-types'

import { Spark } from '@/components/icons'

/**
 * A tilted band of words that drifts across the page — borrowed from the bold strips in
 * EFC Media's social posts. Pure CSS: it pauses on hover/focus and becomes a static,
 * wrapped list for visitors who prefer reduced motion.
 */
export const Marquee: React.FC<{ block: MarqueeBlock }> = ({ block }) => {
  const items = (block.items ?? []).map((item) => item.text?.trim()).filter(Boolean) as string[]
  if (!items.length) return null

  // Each half of the loop must be wider than the screen, so short lists are repeated.
  const repeats = Math.max(1, Math.ceil(10 / items.length))

  return (
    <div className="marquee bg-bg" data-theme="light">
      <div className="marquee__band" data-tone={block.tone ?? 'brand'}>
        <div className="marquee__track">
          {[0, 1].map((group) => (
            <ul aria-hidden={group === 1 ? true : undefined} className="marquee__group" key={group}>
              {Array.from({ length: repeats }).flatMap((_, repeat) =>
                items.map((text, index) => (
                  <li
                    // Only the first run of words is announced to assistive technology.
                    aria-hidden={group === 0 && repeat > 0 ? true : undefined}
                    className="flex items-center gap-[inherit]"
                    key={`${repeat}-${index}`}
                  >
                    <span className="marquee__item">{text}</span>
                    <Spark className="marquee__sep" />
                  </li>
                )),
              )}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
