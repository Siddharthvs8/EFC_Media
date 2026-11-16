import { expect, test } from '@playwright/test'

import { motionReady, skipIntro, trackErrors } from './helpers'

/**
 * Logo intro (src/lib/intro.ts, src/components/Intro.tsx): plays once per browser session
 * on the first page opened, lands on the header logo, gets out of the way on any input,
 * and never plays for reduced-motion users. Safe to run against a deployed site.
 */

const flag = '#intro-on'

test.describe('logo intro', () => {
  test('plays on the first visit, hands over to the page, and not again in the session', async ({ page }) => {
    const errors = trackErrors(page)

    await page.goto('/')
    await expect(page.locator(flag)).toBeAttached()
    await expect(page.locator('#intro')).toBeVisible()
    await expect(page.locator(flag)).toHaveAttribute('data-go', '')

    // While it plays the page does not scroll; afterwards everything is back to normal.
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden')

    await expect(page.locator(flag)).not.toBeAttached({ timeout: 12_000 })
    await expect(page.locator('#intro')).toBeHidden()
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden')
    await expect(page.locator('.site-header__logo')).toHaveCSS('opacity', '1')
    await expect(page.locator('h1')).toBeVisible()

    await motionReady(page)
    expect(errors, 'console errors').toEqual([])

    // Same session: reloading or opening another page goes straight to the content.
    await page.reload()
    expect(await page.evaluate(() => document.getElementById('intro-on'))).toBeNull()
    await page.goto('/about')
    expect(await page.evaluate(() => document.getElementById('intro-on'))).toBeNull()
    await expect(page.locator('#intro')).toBeHidden()
  })

  test('the symbol lands exactly on the header logo', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(flag)).toHaveAttribute('data-fly', '')

    // Jump the flight to its last frame and compare boxes.
    const boxes = await page.evaluate(() => {
      for (const selector of ['.intro__fly-x', '.intro__fly-y', '.intro__fly-s']) {
        const element = document.querySelector(selector) as HTMLElement
        for (const animation of element.getAnimations()) {
          if ((animation as CSSAnimation).animationName === 'intro-out') continue
          animation.pause()
          animation.currentTime = Number(animation.effect?.getComputedTiming().endTime ?? 0)
        }
      }
      const rect = (selector: string) => {
        const { height, left, top, width } = document.querySelector(selector)!.getBoundingClientRect()
        return { height, left, top, width }
      }
      return { landed: rect('.intro__fly-s'), target: rect('[data-intro-target]') }
    })

    for (const key of ['left', 'top', 'width', 'height'] as const) {
      expect(Math.abs(boxes.landed[key] - boxes.target[key]), `${key}: ${JSON.stringify(boxes)}`).toBeLessThan(1)
    }
  })

  test('any key press skips straight to the page', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(flag)).toHaveAttribute('data-go', '')

    await page.keyboard.press('Tab')
    await expect(page.locator(flag)).toHaveAttribute('data-skip', '')
    await expect(page.locator('#intro')).toBeHidden({ timeout: 2000 })

    const skipLink = page.getByRole('link', { name: 'Skip to content' })
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeInViewport()
    await expect(page.locator('.site-header__logo')).toHaveCSS('opacity', '1')
  })

  test('?intro replays it for a returning visitor', async ({ page }) => {
    await skipIntro(page)

    await page.goto('/')
    expect(await page.evaluate(() => document.getElementById('intro-on'))).toBeNull()

    await page.goto('/?intro')
    await expect(page.locator(flag)).toBeAttached()
  })

  test.describe('with prefers-reduced-motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })

    test('it never plays', async ({ page }) => {
      await page.goto('/')
      expect(await page.evaluate(() => document.getElementById('intro-on'))).toBeNull()
      await expect(page.locator('#intro')).toBeHidden()
      await expect(page.locator('h1')).toBeVisible()
    })
  })
})
