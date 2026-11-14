import React from 'react'

import type { Setting } from '@/payload-types'

import { sanitizeHref } from '@/lib/links'
import { cn } from '@/lib/text'

import { PlaceholderBadge } from './Section'

type Props = {
  className?: string
  /** When true, missing details are omitted instead of shown as labelled placeholders. */
  hidePlaceholders: boolean
  settings: Setting
}

type Row = { content: React.ReactNode; label: string }

const Missing: React.FC<{ what: string }> = ({ what }) => (
  <span className="inline-flex flex-wrap items-center gap-2">
    <PlaceholderBadge />
    <span className="text-muted text-sm">Add {what} in Site settings</span>
  </span>
)

export const telHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`
export const whatsappHref = (number: string): string => `https://wa.me/${number.replace(/\D/g, '')}`

/**
 * Contact details from Site settings. Anything not yet supplied is shown as a clearly
 * labelled placeholder (or left out once "Hide placeholder content" is switched on).
 */
export const ContactDetails: React.FC<Props> = ({ className, hidePlaceholders, settings }) => {
  const { address, email, hours, mapUrl, phone, whatsapp } = settings
  const rows: Row[] = []
  const mapHref = sanitizeHref(mapUrl)

  if (email) {
    rows.push({
      label: 'Email',
      content: (
        <a className="link-underline" href={`mailto:${email}`}>
          {email}
        </a>
      ),
    })
  } else if (!hidePlaceholders) {
    rows.push({ label: 'Email', content: <Missing what="an email address" /> })
  }

  if (phone) {
    rows.push({
      label: 'Phone',
      content: (
        <a className="link-underline" href={telHref(phone)}>
          {phone}
        </a>
      ),
    })
  } else if (!hidePlaceholders) {
    rows.push({ label: 'Phone', content: <Missing what="a phone number" /> })
  }

  if (whatsapp) {
    rows.push({
      label: 'WhatsApp',
      content: (
        <a className="link-underline" href={whatsappHref(whatsapp)} rel="noopener noreferrer" target="_blank">
          Chat on WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    })
  }

  if (address) {
    rows.push({
      label: 'Studio',
      content: (
        <>
          <span className="whitespace-pre-line">{address}</span>
          {mapHref ? (
            <>
              <br />
              <a className="link-underline text-sm" href={mapHref} rel="noopener noreferrer" target="_blank">
                Open in Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          ) : null}
        </>
      ),
    })
  } else if (!hidePlaceholders) {
    rows.push({ label: 'Studio', content: <Missing what="an address" /> })
  }

  if (hours) rows.push({ label: 'Hours', content: hours })

  if (!rows.length) return null

  return (
    <dl className={cn('grid gap-5', className)}>
      {rows.map((row) => (
        <div className="grid gap-1" key={row.label}>
          <dt className="index-num uppercase">{row.label}</dt>
          <dd className="text-[1.0625rem] leading-snug">{row.content}</dd>
        </div>
      ))}
    </dl>
  )
}
