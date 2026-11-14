import React from 'react'

import type { Setting } from '@/payload-types'

import { getHeader, getSettings } from '@/lib/data'
import { type ResolvedLink, resolveLink } from '@/lib/links'

import { isPopulatedMedia } from './Media'
import { type HeaderLogo, SiteHeader } from './SiteHeader'

/** Bundled copies of the supplied logo, used until one is chosen in Site settings. */
export const FALLBACK_LOGO = { height: 579, src: '/brand/logo.png', width: 546 } as const
export const FALLBACK_MARK = { height: 451, src: '/brand/mark.png', width: 546 } as const

/** Header logo: the compact logo if set, otherwise the full logo, otherwise the bundled mark. */
export const headerLogo = (settings: Setting): HeaderLogo => {
  for (const candidate of [settings.logoMark, settings.logo]) {
    if (isPopulatedMedia(candidate) && candidate.width && candidate.height) {
      return { height: candidate.height, src: candidate.url as string, width: candidate.width }
    }
  }

  return FALLBACK_MARK
}

export async function Header() {
  const [header, settings] = await Promise.all([getHeader(), getSettings()])

  const nav = (header.navItems ?? [])
    .map((item) => resolveLink(item.link))
    .filter((link): link is ResolvedLink => link !== null)

  return (
    <SiteHeader
      cta={resolveLink(header.cta)}
      logo={headerLogo(settings)}
      nav={nav}
      siteName={settings.siteName}
    />
  )
}
