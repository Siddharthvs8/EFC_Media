import React from 'react'

import type { ServiceIconName } from '@/lib/service-icons'

import { cn } from '@/lib/text'

type IconProps = { className?: string; size?: number }

/**
 * The diagonal "up and to the right" arrow — the same direction of travel as the
 * arrow in the EFC Media logo — used on every button and link.
 */
export const Arrow: React.FC<IconProps> = ({ className, size = 14 }) => (
  <svg
    aria-hidden="true"
    className={cn('arrow', className)}
    fill="none"
    focusable="false"
    height={size}
    viewBox="0 0 14 14"
    width={size}
  >
    <path
      d="M2.75 11.25 11.25 2.75M4.75 2.75h6.5v6.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </svg>
)

/** Four-point spark used as a separator in the scrolling band. */
export const Spark: React.FC<IconProps> = ({ className, size = 16 }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    focusable="false"
    height={size}
    viewBox="0 0 16 16"
    width={size}
  >
    <path d="M8 0c.55 4.55 3.45 7.45 8 8-4.55.55-7.45 3.45-8 8-.55-4.55-3.45-7.45-8-8 4.55-.55 7.45-3.45 8-8Z" />
  </svg>
)

const SERVICE_ICON_PATHS: Record<ServiceIconName, React.ReactNode> = {
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m8 15 3.5-4 3 2.5L19 8" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 7-5 5 5 5" />
      <path d="m15.5 7 5 5-5 5" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12.5 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10.25v3.5a1 1 0 0 0 1 1h2.25L15 18.5v-13L7.25 9.25H5a1 1 0 0 0-1 1Z" />
      <path d="M18.25 9.25a4 4 0 0 1 0 5.5" />
      <path d="M8 14.75V19" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.25 8.5v7l5.75-3.5-5.75-3.5Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  spark: (
    <path d="M12 3c.55 4.9 4.1 8.45 9 9-4.9.55-8.45 4.1-9 9-.55-4.9-4.1-8.45-9-9 4.9-.55 8.45-4.1 9-9Z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" fill="currentColor" r="1.25" stroke="none" />
    </>
  ),
}

export const ServiceIcon: React.FC<IconProps & { name?: null | ServiceIconName }> = ({
  className,
  name,
  size = 28,
}) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    focusable="false"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size}
  >
    {SERVICE_ICON_PATHS[name ?? 'spark'] ?? SERVICE_ICON_PATHS.spark}
  </svg>
)
