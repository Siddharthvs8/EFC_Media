import React from 'react'

import { parseHighlight, splitLines } from '@/lib/text'

type Props = {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  id?: string
  /** `lines`: each line rises out of a mask on load (hero headlines). */
  motion?: 'lines' | 'none'
  text: string
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>

const Segments: React.FC<{ line: string }> = ({ line }) => (
  <>
    {parseHighlight(line).map((segment, index) =>
      segment.highlight ? (
        <span className="hl" key={index}>
          {segment.text}
        </span>
      ) : (
        <React.Fragment key={index}>{segment.text}</React.Fragment>
      ),
    )}
  </>
)

/**
 * Heading text from the CMS: line breaks are kept, and *asterisk-wrapped* phrases get
 * the brand highlight band.
 */
export const RichHeading: React.FC<Props> = ({
  as: Tag = 'h2',
  className,
  motion = 'none',
  text,
  ...rest
}) => {
  const lines = splitLines(text)
  if (!lines.length) return null

  return (
    <Tag className={className} {...rest}>
      {lines.map((line, index) =>
        motion === 'lines' ? (
          <span className="line" key={index}>
            <span className="line__inner" style={{ '--i': index } as React.CSSProperties}>
              <Segments line={line} />
            </span>
          </span>
        ) : (
          <React.Fragment key={index}>
            {index > 0 ? <br /> : null}
            <Segments line={line} />
          </React.Fragment>
        ),
      )}
    </Tag>
  )
}
