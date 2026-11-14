import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getFooter, getHeader, getSettings, shouldHidePlaceholders } from '@/lib/data'
import { resolveLink, sanitizeHref } from '@/lib/links'

import { CMSLink } from './CMSLink'
import { ContactDetails } from './ContactDetails'
import { FALLBACK_LOGO } from './Header'
import { Arrow } from './icons'
import { isPopulatedMedia } from './Media'
import { RichHeading } from './RichHeading'

const SOCIAL_LABELS: Record<string, string> = {
  behance: 'Behance',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  threads: 'Threads',
  whatsapp: 'WhatsApp',
  x: 'X',
  youtube: 'YouTube',
}

export async function Footer() {
  const [footer, header, settings, hidePlaceholders] = await Promise.all([
    getFooter(),
    getHeader(),
    getSettings(),
    shouldHidePlaceholders(),
  ])

  const logo =
    isPopulatedMedia(settings.logo) && settings.logo.width && settings.logo.height
      ? { height: settings.logo.height, src: settings.logo.url as string, width: settings.logo.width }
      : FALLBACK_LOGO

  // Shown at a fixed width; height follows the file's own proportions (never stretched).
  const logoWidth = 132
  const logoHeight = Math.round((logo.height / logo.width) * logoWidth)

  const social = (settings.social ?? [])
    .map((item) => ({ href: sanitizeHref(item.url), label: SOCIAL_LABELS[item.platform] ?? item.platform }))
    .filter((item): item is { href: string; label: string } => Boolean(item.href))

  const cta = resolveLink(header.cta)
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" data-theme="dark">
      <div className="wrap pt-[clamp(4rem,8vw,7.5rem)] pb-8">
        {footer.statement ? (
          <div className="border-line flex flex-col gap-8 border-b pb-[clamp(3rem,6vw,5rem)] md:flex-row md:items-end md:justify-between">
            <RichHeading as="p" className="display-lg hl-band max-w-[14ch]" data-reveal text={footer.statement} />
            {cta ? (
              <Link className="btn btn--primary shrink-0" data-reveal href={cta.href}>
                {cta.label}
                <Arrow />
              </Link>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-12 py-[clamp(3rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Link aria-label={`${settings.siteName} — home`} className="logo-plate" href="/">
              <Image
                alt={`${settings.siteName}${settings.tagline ? ` — ${settings.tagline}` : ''}`}
                height={logoHeight}
                sizes={`${logoWidth}px`}
                src={logo.src}
                style={{ height: 'auto', width: logoWidth }}
                width={logoWidth}
              />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {(footer.columns ?? []).map((column) => (
              <nav aria-label={column.title} key={column.id ?? column.title}>
                <h2 className="index-num mb-4 font-sans uppercase">{column.title}</h2>
                <ul className="grid gap-2.5">
                  {(column.links ?? []).map((item) => (
                    <li key={item.id}>
                      <CMSLink appearance="plain" className="link-underline" link={item.link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="sm:col-span-2 lg:col-span-1">
              <h2 className="index-num mb-4 font-sans uppercase">Contact</h2>
              <ContactDetails hidePlaceholders={hidePlaceholders} settings={settings} />
            </div>

            {social.length ? (
              <nav aria-label="Social media">
                <h2 className="index-num mb-4 font-sans uppercase">Follow</h2>
                <ul className="grid gap-2.5">
                  {social.map((item) => (
                    <li key={item.href}>
                      <a
                        className="link-underline inline-flex items-center gap-2"
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.label}
                        <Arrow size={11} />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>

        <div className="border-line text-muted flex flex-col gap-4 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.siteName}.{footer.note ? ` ${footer.note}` : ''}
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(footer.legalLinks ?? []).map((item) => (
              <li key={item.id}>
                <CMSLink appearance="plain" className="link-underline" link={item.link} />
              </li>
            ))}
            <li>
              <a className="link-underline inline-flex items-center gap-1.5" href="#top">
                Back to top
                <Arrow className="-rotate-45" size={11} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
