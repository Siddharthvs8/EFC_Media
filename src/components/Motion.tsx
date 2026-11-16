'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    /** Set by the logo intro script (src/lib/intro.ts): ends the intro immediately. */
    __introEnd?: () => void
    /** True while the logo intro holds scroll reveals back. */
    __introHold?: boolean
    /** A reveal scan was requested during the intro; it runs when the intro hands over. */
    __introPending?: boolean
    __motionReady?: boolean
    /** Set by the inline script in the root layout: (re)observes [data-reveal] elements. */
    __reveal?: () => void
  }
}

/**
 * Scroll motion for the site. Scrolling itself is never touched (no smooth-scroll
 * library, no scroll-jacking) — we only observe it.
 *
 *   [data-reveal]            fades/rises in once, the first time it enters the viewport.
 *                            The observer for this lives in a tiny inline script in the
 *                            root layout so it starts before React hydrates; this
 *                            component only asks it to re-scan when the page changes.
 *   [data-scroll]            gets a `--p` custom property (0 → 1) as it travels through
 *                            the viewport; CSS turns that into movement
 *   [data-spy-group] > [data-spy]   the item crossing the middle of the screen gets
 *                            `data-active` (used by the "approach" storytelling section)
 *
 * With prefers-reduced-motion everything is shown in its final state and no scroll
 * listener is attached. Without JavaScript the content is simply visible (the `js` class
 * that enables the hidden-until-revealed styles is only added when scripts run).
 */
export function Motion() {
  useEffect(() => {
    window.__motionReady = true

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    /* Scroll-linked progress --------------------------------------------- */
    const tracked = new Set<HTMLElement>()
    let frame = 0

    const measure = () => {
      frame = 0
      const viewport = window.innerHeight

      for (const element of tracked) {
        if (!element.isConnected) {
          tracked.delete(element)
          continue
        }

        const rect = element.getBoundingClientRect()
        // start/end are viewport fractions: progress is 0 when the element's top is at
        // `start` and 1 when its bottom reaches `end`.
        const start = Number(element.dataset.scrollStart ?? 1)
        const end = Number(element.dataset.scrollEnd ?? 0)
        const distance = rect.height + viewport * (start - end)
        const progress = Math.min(1, Math.max(0, (viewport * start - rect.top) / distance))

        element.style.setProperty('--p', progress.toFixed(4))
      }
    }

    const requestMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    const scrollObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement
          if (entry.isIntersecting) tracked.add(element)
          else tracked.delete(element)
        }
        requestMeasure()
      },
      { rootMargin: '30% 0px 30% 0px' },
    )

    /* Scroll spy (active step) ------------------------------------------- */
    const spyObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const group = entry.target.closest('[data-spy-group]')
          group?.querySelectorAll('[data-spy][data-active]').forEach((item) => {
            if (item !== entry.target) item.removeAttribute('data-active')
          })
          entry.target.setAttribute('data-active', '')
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    /* Wire up whatever is in the document now, and again whenever it changes
       (client-side navigation, live preview refreshes). */
    const scan = () => {
      window.__reveal?.()

      if (reduceMotion.matches) return

      document
        .querySelectorAll<HTMLElement>('[data-scroll]')
        .forEach((element) => scrollObserver.observe(element))

      document.querySelectorAll<HTMLElement>('[data-spy-group]').forEach((group) => {
        if (!group.hasAttribute('data-enhanced')) {
          group.setAttribute('data-enhanced', '')
          group.querySelector('[data-spy]')?.setAttribute('data-active', '')
        }
        group.querySelectorAll<HTMLElement>('[data-spy]').forEach((item) => spyObserver.observe(item))
      })
    }

    let scanFrame = 0
    const requestScan = () => {
      if (!scanFrame) {
        scanFrame = requestAnimationFrame(() => {
          scanFrame = 0
          scan()
        })
      }
    }

    scan()

    const mutations = new MutationObserver(requestScan)
    mutations.observe(document.body, { childList: true, subtree: true })

    if (!reduceMotion.matches) {
      window.addEventListener('scroll', requestMeasure, { passive: true })
      window.addEventListener('resize', requestMeasure, { passive: true })
    }

    return () => {
      scrollObserver.disconnect()
      spyObserver.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', requestMeasure)
      window.removeEventListener('resize', requestMeasure)
      if (frame) cancelAnimationFrame(frame)
      if (scanFrame) cancelAnimationFrame(scanFrame)
    }
  }, [])

  return null
}
