import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { motionReady, scrollThrough, trackErrors } from './helpers'

/**
 * Public site: every page renders, navigation works with mouse, touch and keyboard,
 * motion behaves (and gets out of the way for reduced-motion users), and there are no
 * serious accessibility violations. Safe to run against a deployed site.
 */

const PAGES = ['/', '/about', '/services', '/work', '/insights', '/contact', '/privacy']

const isMobile = () => test.info().project.name === 'mobile'

test.describe('pages', () => {
  for (const path of PAGES) {
    test(`${path} renders completely and without errors`, async ({ page }) => {
      const errors = trackErrors(page)

      const response = await page.goto(path)
      expect(response?.status()).toBe(200)

      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page).toHaveTitle(/EFC Media/)
      await expect(page.locator('main#main')).toBeVisible()
      await expect(page.locator('header.site-header')).toBeVisible()
      await expect(page.locator('footer.site-footer')).toBeAttached()

      await motionReady(page)
      await scrollThrough(page)
      await page.waitForLoadState('networkidle')

      const brokenImages = await page.evaluate(() =>
        Array.from(document.images)
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
      )
      expect(brokenImages, 'images that failed to load').toEqual([])

      expect(await page.locator('img:not([alt])').count(), 'images without an alt attribute').toBe(0)
      expect(errors, 'console errors').toEqual([])

      // Nothing should force the page to scroll sideways.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, 'horizontal overflow in px').toBeLessThanOrEqual(1)
    })
  }

  for (const [index, prefix] of [
    ['/services', '/services/'],
    ['/work', '/work/'],
    ['/insights', '/insights/'],
  ] as const) {
    test(`a detail page opens from ${index}`, async ({ page }) => {
      await page.goto(index)
      const link = page.locator(`main a[href^="${prefix}"]`).first()
      const href = await link.getAttribute('href')
      expect(href).toBeTruthy()

      const response = await page.goto(href as string)
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toBeVisible()
    })
  }

  for (const path of ['/this-page-does-not-exist', '/a/b/c']) {
    test(`${path} shows the not-found page with a 404 status`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(404)
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.getByRole('link', { name: /home/i }).first()).toBeVisible()
    })
  }
})

test.describe('technical SEO and headers', () => {
  test('robots.txt, sitemap.xml and the generated sharing card respond', async ({ request }) => {
    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toMatch(/User-Agent: \*/i)

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(sitemap.headers()['content-type']).toContain('xml')

    const card = await request.get('/og?title=Test%20card&eyebrow=EFC%20Media')
    expect(card.status()).toBe(200)
    expect(card.headers()['content-type']).toContain('image/png')
  })

  test('pages carry canonical, Open Graph and structured data', async ({ page }) => {
    await page.goto('/services')

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/services$/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https?:\/\//)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/)

    const types = await page.evaluate(() =>
      Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap((node) => {
        const data = JSON.parse(node.textContent || 'null')
        return (Array.isArray(data) ? data : [data]).map((item) => item?.['@type'])
      }),
    )
    expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite']))
  })

  test('security headers are present', async ({ request }) => {
    const headers = (await request.get('/')).headers()
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
    expect(headers['x-frame-options']).toBe('SAMEORIGIN')
  })

  test('the admin and API are not open to the public', async ({ request }) => {
    // Form definitions (which hold notification addresses) and enquiries need a signed-in user.
    expect((await request.get('/api/forms')).status()).toBe(403)
    expect((await request.get('/api/form-submissions')).status()).toBe(403)
    expect((await request.get('/api/users')).status()).toBe(403)
    // Submissions can only be created by the site's own server action.
    expect((await request.post('/api/form-submissions', { data: { form: 1, submissionData: [] } })).status()).toBe(403)
    // Drafts never leak through the public API.
    const pages = await (await request.get('/api/pages?draft=true&limit=100&depth=0')).json()
    expect(pages.docs.every((doc: { _status?: string }) => doc._status === 'published')).toBe(true)
  })
})

test.describe('navigation', () => {
  test('desktop: header links navigate and mark the current page', async ({ page }) => {
    test.skip(isMobile(), 'desktop navigation')

    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main' })
    await nav.getByRole('link', { name: 'Services' }).click()

    await expect(page).toHaveURL(/\/services$/)
    await expect(page.locator('h1')).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page')
  })

  test('mobile: the menu opens as a dialog, keeps focus inside and closes with Escape', async ({ page }) => {
    test.skip(!isMobile(), 'mobile navigation')

    await page.goto('/')
    const toggle = page.locator('button[aria-controls="mobile-menu"]')
    const menu = page.getByRole('dialog', { name: 'Menu' })

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(menu).toBeVisible()

    // Tab forward through every item; focus must never leave the toggle + menu.
    const itemCount = await menu.locator('a').count()
    for (let step = 0; step < itemCount + 3; step++) {
      await page.keyboard.press('Tab')
      const inside = await page.evaluate(() => {
        const active = document.activeElement
        return Boolean(active?.closest('#mobile-menu') || active?.classList.contains('menu-toggle'))
      })
      expect(inside, `focus stayed inside the menu after ${step + 1} tabs`).toBe(true)
    }

    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()

    await toggle.click()
    await menu.getByRole('link', { name: /About/ }).click()
    await expect(page).toHaveURL(/\/about$/)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

test.describe('keyboard', () => {
  test('the skip link is the first stop and jumps to the content', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')

    const skipLink = page.getByRole('link', { name: 'Skip to content' })
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeInViewport()

    await page.keyboard.press('Enter')
    await expect(page.locator('#main')).toBeFocused()
  })

  test('focused controls have a visible focus indicator', async ({ page }) => {
    test.skip(isMobile(), 'keyboard navigation is a desktop interaction')

    await page.goto('/')
    const seen: string[] = []

    for (let step = 0; step < 9; step++) {
      await page.keyboard.press('Tab')
      const focus = await page.evaluate(() => {
        const element = document.activeElement as HTMLElement | null
        if (!element || element === document.body) return null
        const style = getComputedStyle(element)
        return {
          label: (element.textContent || element.getAttribute('aria-label') || element.tagName).trim().slice(0, 40),
          outlined: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2,
        }
      })

      expect(focus, `tab stop ${step + 1} exists`).not.toBeNull()
      expect(focus?.outlined, `"${focus?.label}" shows a focus outline`).toBe(true)
      seen.push(focus?.label ?? '')
    }

    // The header's links and call to action are all reachable.
    expect(seen.join(' | ')).toMatch(/Services/)
    expect(seen.join(' | ')).toMatch(/Contact/)
  })
})

test.describe('motion', () => {
  test('sections below the fold reveal as they scroll into view', async ({ page }) => {
    await page.goto('/')
    await motionReady(page)

    const target = page.locator('[data-reveal]').last()
    await expect(target).toHaveCSS('opacity', '0')

    await target.scrollIntoViewIfNeeded()
    await expect(target).toHaveAttribute('data-inview', '')
    await expect(target).toHaveCSS('opacity', '1')
  })

  test('scrolling is native: no scroll-jacking, wheel input moves the page directly', async ({ page }) => {
    test.skip(isMobile(), 'wheel input')

    await page.goto('/')
    await motionReady(page)
    await page.mouse.move(600, 400)
    await page.mouse.wheel(0, 600)

    // Native scrolling applies the delta immediately (within a frame or two).
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 2000 }).toBeGreaterThan(500)
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden')
  })

  test('with motion on, mid-animation states still meet contrast requirements (axe)', async ({ page }) => {
    await page.goto('/')
    await motionReady(page)
    await scrollThrough(page)
    // Back at the top: scroll-linked text is in its dimmest state and steps are de-emphasised.
    await page.evaluate(() => window.scrollTo({ behavior: 'instant', top: 0 }))
    await page.waitForTimeout(1200)

    const results = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
    const failures = results.violations.flatMap((violation) =>
      violation.nodes.map((node) => `${node.target.join(' ')} — ${node.failureSummary ?? ''}`),
    )

    expect(failures).toEqual([])
  })

  test.describe('with prefers-reduced-motion', () => {
    test.use({ contextOptions: { reducedMotion: 'reduce' } })

    test('all content is visible immediately and nothing keeps moving', async ({ page }) => {
      await page.goto('/')
      await motionReady(page)

      // Nothing waits for a scroll to appear.
      const hidden = await page.evaluate(
        () =>
          Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
            (element) => getComputedStyle(element).opacity !== '1',
          ).length,
      )
      expect(hidden, 'reveal elements still hidden').toBe(0)

      // The scrolling band is a still, wrapped list and the orbit text does not rotate.
      const marquee = page.locator('.marquee__group').first()
      await expect(marquee).toHaveCSS('animation-name', 'none')

      const running = await page.evaluate(
        () => document.getAnimations().filter((animation) => animation.playState === 'running').length,
      )
      expect(running, 'animations still running').toBe(0)

      // Scroll-linked effects are parked: scrolling does not write progress values.
      await page.evaluate(() => window.scrollTo({ behavior: 'instant', top: 900 }))
      const progressWritten = await page.evaluate(
        () => Array.from(document.querySelectorAll<HTMLElement>('[data-scroll]')).filter((el) => el.style.getPropertyValue('--p')).length,
      )
      expect(progressWritten).toBe(0)
    })

    for (const path of ['/', '/services', '/contact']) {
      test(`${path} has no serious accessibility violations (axe, WCAG 2.1 AA)`, async ({ page }) => {
        await page.goto(path)
        await motionReady(page)
        await scrollThrough(page)
        await page.evaluate(() => window.scrollTo({ behavior: 'instant', top: 0 }))

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()

        const serious = results.violations
          .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
          .map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(' ')).slice(0, 4).join(' | ')}`)

        expect(serious).toEqual([])
      })
    }
  })
})
