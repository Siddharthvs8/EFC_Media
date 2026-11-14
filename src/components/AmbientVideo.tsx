'use client'

import React, { useEffect, useRef } from 'react'

type Props = { className?: string; label?: string; src: string }

/**
 * Silent looping background video. It only plays while on screen, and for people who
 * prefer reduced motion it stays paused and exposes the browser's controls instead.
 */
export const AmbientVideo: React.FC<Props> = ({ className, label, src }) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.controls = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => undefined)
        else video.pause()
      },
      { threshold: 0.15 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      aria-label={label || undefined}
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
      ref={ref}
      src={src}
    />
  )
}
