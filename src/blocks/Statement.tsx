import React from 'react'

import type { StatementBlock } from '@/payload-types'

import { CMSLink } from '@/components/CMSLink'
import { Section } from '@/components/Section'
import { pad2, parseHighlight } from '@/lib/text'

type Unit = { highlight: boolean; text: string }

/** Break the statement into reveal units: single words, or a whole highlighted phrase. */
const toUnits = (text: string): Unit[] =>
  parseHighlight(text.replace(/\s+/g, ' ').trim()).flatMap((segment): Unit[] =>
    segment.highlight
      ? [{ highlight: true, text: segment.text.trim() }]
      : segment.text
          .split(' ')
          .filter(Boolean)
          .map((word) => ({ highlight: false, text: word })),
  )

/**
 * A large statement that "lights up" word by word as it is scrolled through.
 * The paragraph carries `data-scroll`, which gives it a `--p` progress value; each
 * word's opacity is derived from that in CSS (see `.statement__word`).
 */
export const Statement: React.FC<{ block: StatementBlock }> = ({ block }) => {
  const units = toUnits(block.text)
  const columns = block.columns ?? []

  return (
    <Section anchor={block.anchor} className="statement" theme={block.theme}>
      <div className="wrap">
        {block.eyebrow ? (
          <p className="eyebrow mb-[clamp(1.5rem,3vw,2.5rem)]" data-reveal>
            {block.eyebrow}
          </p>
        ) : null}

        <p
          className="statement__text max-w-[24ch] md:max-w-[26ch]"
          data-scroll
          data-scroll-end="0.5"
          data-scroll-start="0.92"
          style={{ '--n': units.length } as React.CSSProperties}
        >
          {units.map((unit, index) => (
            <React.Fragment key={index}>
              <span
                className={unit.highlight ? 'statement__word hl' : 'statement__word'}
                style={{ '--i': index } as React.CSSProperties}
              >
                {unit.text}
              </span>{' '}
            </React.Fragment>
          ))}
        </p>

        {columns.length ? (
          <ul
            className="statement__columns"
            style={{ '--cols': Math.min(columns.length, 4) } as React.CSSProperties}
          >
            {columns.map((column, index) => (
              <li data-reveal key={column.id ?? index} style={{ '--i': index } as React.CSSProperties}>
                <span className="index-num">{pad2(index + 1)}</span>
                <h2 className="display-sm mt-3">{column.title}</h2>
                {column.text ? <p className="text-muted mt-3 max-w-[38ch]">{column.text}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}

        <CMSLink appearance="text" className="mt-10" link={block.link} />
      </div>
    </Section>
  )
}
