import Link from 'next/link'
import React from 'react'

import { type CMSLinkData, isExternal, resolveLink } from '@/lib/links'
import { cn } from '@/lib/text'

import { Arrow } from './icons'

type Appearance = 'plain' | 'primary' | 'secondary' | 'text'

type Props = {
  /** Overrides the style chosen in the CMS. `plain` renders an unstyled link. */
  appearance?: Appearance
  children?: React.ReactNode
  className?: string
  link?: CMSLinkData | null
  size?: 'default' | 'sm'
  style?: React.CSSProperties
  withArrow?: boolean
}

/** Renders a CMS link field as a button, text link or plain anchor. Nothing if incomplete. */
export const CMSLink: React.FC<Props> = ({
  appearance,
  children,
  className,
  link,
  size = 'default',
  style,
  withArrow = true,
}) => {
  const resolved = resolveLink(link)
  if (!resolved) return null

  const look: Appearance = appearance ?? resolved.appearance

  const classes =
    look === 'plain'
      ? className
      : look === 'text'
        ? cn('text-link', className)
        : cn(
            'btn',
            look === 'primary' ? 'btn--primary' : 'btn--secondary',
            size === 'sm' && 'btn--sm',
            className,
          )

  const content = (
    <>
      {children ?? resolved.label}
      {withArrow && look !== 'plain' ? <Arrow /> : null}
      {resolved.newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  )

  const newTabProps = resolved.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // Plain anchors for external URLs, mailto:/tel: and in-page anchors; next/link for site pages.
  if (isExternal(resolved.href) || !resolved.href.startsWith('/')) {
    return (
      <a className={classes} href={resolved.href} style={style} {...newTabProps}>
        {content}
      </a>
    )
  }

  return (
    <Link className={classes} href={resolved.href} style={style} {...newTabProps}>
      {content}
    </Link>
  )
}
