import type { Page } from '@playwright/test'

/** Console noise that is not a defect of the site (browser extensions, dev tooling). */
const IGNORED_CONSOLE = [/Download the React DevTools/i, /\[HMR\]/i, /favicon/i]

/** Collects console errors and uncaught exceptions for a page. */
export const trackErrors = (page: Page): string[] => {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() !== 'error') return
    const text = message.text()
    if (!IGNORED_CONSOLE.some((pattern) => pattern.test(text))) errors.push(text)
  })

  page.on('pageerror', (error) => errors.push(String(error)))

  return errors
}

/**
 * Scrolls to the bottom in steps so scroll-reveals fire and lazy images load.
 * Uses instant scrolling: the site enables smooth scrolling for anchor links, which would
 * otherwise make a scripted scroll lag behind.
 */
export const scrollThrough = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7)
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ behavior: 'instant', top: y })
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
  })
}

/** sessionStorage key the logo intro sets once it has played (src/lib/intro.ts). */
export const INTRO_SEEN_KEY = 'efc-intro'

/**
 * Starts the page as a returning visitor in the same session: the logo intro (which plays
 * once per session) has already been seen. Its own behaviour is covered in intro.spec.ts.
 */
export const skipIntro = async (page: Page): Promise<void> => {
  await page.addInitScript((key) => {
    try {
      window.sessionStorage.setItem(key, '1')
    } catch {
      // Storage unavailable: the intro cannot play either.
    }
  }, INTRO_SEEN_KEY)
}

/** Resolves once the motion script has started (it marks itself on window). */
export const motionReady = (page: Page) =>
  page.waitForFunction(() => (window as { __motionReady?: boolean }).__motionReady === true)

export const isLocalTarget = (baseURL?: string): boolean =>
  /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?/i.test(baseURL ?? '')
