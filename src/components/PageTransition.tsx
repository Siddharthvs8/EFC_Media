'use client'

import { usePathname } from 'next/navigation'
import React, { useLayoutEffect, useRef } from 'react'

/**
 * Plays a short entrance when the route changes. The first page load is left alone so
 * the server-rendered content (and the hero's own animation) paints immediately.
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const element = ref.current
    if (!element) return

    element.classList.remove('page-enter')
    // Force a reflow so the animation restarts for consecutive navigations.
    void element.offsetWidth
    element.classList.add('page-enter')
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
