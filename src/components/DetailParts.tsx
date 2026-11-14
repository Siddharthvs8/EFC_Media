import Link from 'next/link'
import React from 'react'

import { Arrow } from './icons'

type Crumb = { href?: string; label: string }

/** Small breadcrumb trail above detail-page headlines. */
export const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="fade-up">
    <ol className="index-num flex flex-wrap items-center gap-x-2.5 gap-y-1 uppercase">
      {items.map((item, index) => (
        <li className="flex items-center gap-2.5" key={`${item.label}-${index}`}>
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {item.href ? (
            <Link className="link-underline text-fg" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
)

/** Oversized "next" link that closes a service, case study or article page. */
export const NextBand: React.FC<{
  backHref: string
  backLabel: string
  href: string
  label: string
  title: string
}> = ({ backHref, backLabel, href, label, title }) => (
  <section className="section" data-theme="tint">
    <div className="wrap">
      <Link className="card border-line block border-y py-[clamp(2rem,4vw,3.5rem)]" data-reveal href={href}>
        <span className="index-num uppercase">{label}</span>
        <span className="mt-3 flex items-center justify-between gap-6">
          <span className="display-lg">
            <span className="card__title">{title}</span>
          </span>
          <span aria-hidden="true" className="svc-row__arrow shrink-0">
            <Arrow size={16} />
          </span>
        </span>
      </Link>

      <Link className="text-link mt-8" href={backHref}>
        {backLabel}
        <Arrow />
      </Link>
    </div>
  </section>
)
