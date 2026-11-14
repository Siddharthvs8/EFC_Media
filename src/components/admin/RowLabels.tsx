'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

const fallback = (prefix: string, rowNumber?: number) =>
  `${prefix} ${String(rowNumber ?? 0).padStart(2, '0')}`

const firstText = (...values: unknown[]): string | undefined =>
  values.find((value): value is string => typeof value === 'string' && value.trim().length > 0)

/** Shows a link row by its label instead of "Link 01". */
export const LinkRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{ link?: { label?: string | null } }>()
  return <span>{firstText(data?.link?.label) ?? fallback('Link', rowNumber)}</span>
}

/** Shows an array row by its most descriptive text field. */
export const TitleRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()

  const valueAndLabel =
    firstText(data?.value) && firstText(data?.label) ? `${data.value} — ${data.label}` : undefined

  const text = firstText(
    data?.title,
    valueAndLabel,
    data?.text,
    data?.question,
    data?.label,
    data?.caption,
    data?.platform,
  )

  return <span>{text ?? fallback('Item', rowNumber)}</span>
}
