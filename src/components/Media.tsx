import Image from 'next/image'
import React from 'react'

import type { Media as MediaDoc } from '@/payload-types'

import { AmbientVideo } from './AmbientVideo'

type Props = {
  /** Overrides the alt text from the media library. Pass '' for purely decorative use. */
  alt?: string
  /** Video only: loop silently without controls (paused for reduced-motion users). */
  ambient?: boolean
  className?: string
  /** Preload with high priority — use for the page's main above-the-fold image only. */
  eager?: boolean
  /** Fill the (positioned) parent instead of using the file's own dimensions. */
  fill?: boolean
  resource?: MediaDoc | null | number
  /** Responsive sizes hint, e.g. "(min-width: 64rem) 50vw, 100vw". */
  sizes?: string
}

export const isPopulatedMedia = (resource?: MediaDoc | null | number): resource is MediaDoc =>
  typeof resource === 'object' && resource !== null && Boolean(resource.url)

/**
 * Renders a file from the media library: responsive, optimised images through next/image
 * (AVIF/WebP, lazy by default, focal point respected) or a video element.
 */
export const Media: React.FC<Props> = ({ alt, ambient, className, eager, fill, resource, sizes }) => {
  if (!isPopulatedMedia(resource)) return null

  const { focalX, focalY, height, mimeType, url, width } = resource
  const altText = alt ?? resource.alt ?? ''
  const src = url as string

  if (mimeType?.startsWith('video/')) {
    return ambient ? (
      <AmbientVideo className={className} label={altText} src={src} />
    ) : (
      <video aria-label={altText || undefined} className={className} controls playsInline preload="metadata">
        <source src={src} type={mimeType} />
      </video>
    )
  }

  const objectPosition =
    typeof focalX === 'number' && typeof focalY === 'number' ? `${focalX}% ${focalY}%` : undefined

  const shared = {
    className,
    sizes,
    src,
    // SVGs are already resolution independent; skip the optimiser for them.
    unoptimized: mimeType === 'image/svg+xml',
    // The page's main image: start loading it from the <head>, before the body is parsed.
    ...(eager ? { preload: true } : {}),
  }

  if (fill || !width || !height) {
    return (
      <Image
        {...shared}
        alt={altText}
        fill
        sizes={sizes ?? '100vw'}
        style={{ objectFit: 'cover', objectPosition }}
      />
    )
  }

  return (
    <Image
      {...shared}
      alt={altText}
      height={height}
      style={objectPosition ? { objectPosition } : undefined}
      width={width}
    />
  )
}
