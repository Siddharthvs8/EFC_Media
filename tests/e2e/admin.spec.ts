import type { APIRequestContext, Page } from '@playwright/test'

import { expect, test } from '@playwright/test'

import { isLocalTarget, skipIntro } from './helpers'

/**
 * Admin flows: sign in through the real login screen, then make the changes an editor
 * makes — edit the hero, add a service, publish a case study, change the navigation,
 * upload an image — and check each one on the public site.
 *
 * These tests CHANGE CONTENT (and restore it afterwards), so they only run against a
 * local server using the development database:
 *
 *   npm run test:e2e -- admin
 *
 * Credentials come from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.development.local
 * (the account created by `npm run seed`).
 *
 * Run against `npm run dev`, changes show immediately. To exercise the production cache
 * and on-demand revalidation instead, build and start the site in production mode with the
 * development database (see README → Testing) and run the same command.
 */

const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD

/** A 2×2 orange PNG: enough to exercise the upload pipeline. */
const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP8X6TEwMDAxAAGIMb/TiMAFTQCKo+WZ2kAAAAASUVORK5CYII=',
  'base64',
)

const unique = () => Date.now().toString(36)

const signIn = async (page: Page) => {
  await page.goto('/admin/login')
  await page.locator('#field-email').fill(email as string)
  await page.locator('#field-password').fill(password as string)
  await page.locator('form button[type="submit"]').click()
  // Generous: on a dev server the first sign-in also compiles the API and the dashboard.
  await expect(page).toHaveURL(/\/admin\/?$/, { timeout: 180_000 })
}

/** The page's request context shares the admin session cookie set at sign-in. */
const api = (page: Page): APIRequestContext => page.request

const json = async <T>(response: Awaited<ReturnType<APIRequestContext['get']>>): Promise<T> => {
  expect(response.ok(), `${response.url()} → ${response.status()} ${await response.text().catch(() => '')}`).toBe(true)
  return (await response.json()) as T
}

type Doc = { id: number } & Record<string, unknown>

test.describe('admin', () => {
  test.describe.configure({ mode: 'serial' })

  test.beforeEach(async ({ baseURL, page }) => {
    test.skip(!isLocalTarget(baseURL), 'Admin flows change content and only run against a local server.')
    test.skip(!email || !password, 'Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD (see .env.example).')
    await skipIntro(page)
  })

  test('the dashboard shows the welcome panel and every content area', async ({ page }) => {
    await signIn(page)

    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible()
    await expect(page.getByText('Launch checklist')).toBeVisible()

    for (const path of [
      '/admin/collections/pages',
      '/admin/collections/services',
      '/admin/collections/case-studies',
      '/admin/collections/posts',
      '/admin/collections/media',
      '/admin/collections/form-submissions',
      '/admin/globals/header',
      '/admin/globals/footer',
      '/admin/globals/settings',
    ]) {
      const response = await page.goto(path)
      expect(response?.status(), path).toBe(200)
      await expect(page.locator('.template-default, .collection-list, .global-edit, main').first()).toBeVisible()
    }
  })

  test('an editor changes the hero headline in the page editor and publishes it', async ({ page }) => {
    await signIn(page)

    const { docs } = await json<{ docs: Doc[] }>(
      await api(page).get('/api/pages?where[slug][equals]=home&depth=0&draft=true&limit=1'),
    )
    const home = docs[0] as Doc & { layout: Record<string, unknown>[] }
    const original = structuredClone(home.layout)
    const headline = `Edited in the dashboard ${unique()}`

    try {
      // Open the home page in the editor, expand its first section (the hero) and type.
      await page.goto(`/admin/collections/pages/${home.id}`)
      const hero = page.locator('#layout-row-0')
      await expect(hero).toBeVisible()

      const field = page.locator('#field-layout__0__headline')
      if (!(await field.isVisible())) await hero.locator('.collapsible__toggle').first().click()
      await field.fill(headline)

      // Publish with the editor's own button and wait for the confirmation.
      await page.locator('#action-save').click()
      await expect(page.locator('.payload-toast-container')).toContainText(/success/i, { timeout: 60_000 })

      await page.goto('/')
      await expect(page.locator('h1')).toContainText(headline)
    } finally {
      await json(await api(page).patch(`/api/pages/${home.id}`, { data: { _status: 'published', layout: original } }))
    }
  })

  test('editing the hero headline updates the home page', async ({ page }) => {
    await signIn(page)

    const { docs } = await json<{ docs: Doc[] }>(
      await api(page).get('/api/pages?where[slug][equals]=home&depth=0&draft=true&limit=1'),
    )
    const home = docs[0] as Doc & { layout: ({ blockType: string; headline?: string } & Record<string, unknown>)[] }
    const original = structuredClone(home.layout)
    const headline = `Growth, measured ${unique()}.`

    const layout = home.layout.map((block) => (block.blockType === 'hero' ? { ...block, headline } : block))

    try {
      await json(await api(page).patch(`/api/pages/${home.id}`, { data: { _status: 'published', layout } }))

      await page.goto('/')
      await expect(page.locator('h1')).toContainText(headline.replace(/\.$/, ''))
    } finally {
      await json(await api(page).patch(`/api/pages/${home.id}`, { data: { _status: 'published', layout: original } }))
    }

    await page.goto('/')
    await expect(page.locator('h1')).not.toContainText('Growth, measured')
  })

  test('a new service appears in the services list and gets its own page', async ({ page }) => {
    await signIn(page)
    const title = `Video Production ${unique()}`
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const { doc } = await json<{ doc: Doc }>(
      await api(page).post('/api/services', {
        data: {
          _status: 'published',
          icon: 'play',
          slug,
          summary: 'Added by the end-to-end test to prove a new service goes live without a deploy.',
          title,
        },
      }),
    )

    try {
      await page.goto('/services')
      await expect(page.getByRole('link', { name: title }).first()).toBeVisible()

      const response = await page.goto(`/services/${slug}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toContainText(title)
    } finally {
      await api(page).delete(`/api/services/${doc.id}`)
    }

    const gone = await page.goto(`/services/${slug}`)
    expect(gone?.status()).toBe(404)
  })

  test('a case study stays private as a draft and goes live when published', async ({ page }) => {
    await signIn(page)
    const title = `Launch campaign ${unique()}`
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    const { doc } = await json<{ doc: Doc }>(
      await api(page).post('/api/case-studies?draft=true', {
        data: {
          _status: 'draft',
          placeholder: true,
          slug,
          summary: 'Created by the end-to-end test: first saved as a draft, then published.',
          title,
        },
      }),
    )

    try {
      // Draft: not on the Work page, and its URL is a 404 for the public.
      await page.goto('/work')
      await expect(page.getByRole('link', { name: title })).toHaveCount(0)
      expect((await page.goto(`/work/${slug}`))?.status()).toBe(404)

      await json(await api(page).patch(`/api/case-studies/${doc.id}`, { data: { _status: 'published' } }))

      await page.goto('/work')
      await expect(page.getByRole('link', { name: title }).first()).toBeVisible()
      expect((await page.goto(`/work/${slug}`))?.status()).toBe(200)
      await expect(page.locator('h1')).toContainText(title)
    } finally {
      await api(page).delete(`/api/case-studies/${doc.id}`)
    }
  })

  test('changing the navigation updates the header on every page', async ({ page }) => {
    await signIn(page)

    const header = await json<{ navItems: Record<string, unknown>[] }>(await api(page).get('/api/globals/header?depth=0'))
    const label = `Careers ${unique()}`

    try {
      await json(
        await api(page).post('/api/globals/header', {
          data: {
            navItems: [...header.navItems, { link: { label, type: 'custom', url: '/contact' } }],
          },
        }),
      )

      for (const path of ['/', '/about']) {
        await page.goto(path)
        await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: label })).toBeVisible()
      }
    } finally {
      await json(await api(page).post('/api/globals/header', { data: { navItems: header.navItems } }))
    }

    await page.goto('/')
    await expect(page.getByRole('link', { name: label })).toHaveCount(0)
  })

  test('an uploaded image is stored, served and usable on a page', async ({ page }) => {
    await signIn(page)

    const { doc: created } = await json<{ doc: Doc }>(
      await api(page).post('/api/media', {
        multipart: {
          _payload: JSON.stringify({ alt: `End-to-end test upload ${unique()}` }),
          file: { buffer: TINY_PNG, mimeType: 'image/png', name: `e2e-${unique()}.png` },
        },
      }),
    )
    // Read the stored record: with cloud storage the file's final URL (which includes a
    // unique suffix) is saved just after the upload response is built.
    const media = await json<Doc & { url: string }>(await api(page).get(`/api/media/${created.id}`))

    const { docs } = await json<{ docs: Doc[] }>(
      await api(page).get('/api/pages?where[slug][equals]=about&depth=0&draft=true&limit=1'),
    )
    const about = docs[0] as Doc & { layout: ({ blockType: string } & Record<string, unknown>)[] }
    const original = structuredClone(about.layout)

    try {
      // The file itself is reachable…
      const file = await page.request.get(media.url)
      expect(file.status()).toBe(200)
      expect(file.headers()['content-type']).toContain('image/png')

      // …and shows up on the site once it is added to the About page's hero.
      const layout = about.layout.map((block) => (block.blockType === 'hero' ? { ...block, media: media.id } : block))
      await json(await api(page).patch(`/api/pages/${about.id}`, { data: { _status: 'published', layout } }))

      await page.goto('/about')
      await expect(page.locator('.hero__media img')).toBeVisible()
    } finally {
      await json(await api(page).patch(`/api/pages/${about.id}`, { data: { _status: 'published', layout: original } }))
      await api(page).delete(`/api/media/${media.id}`)
    }
  })

  test('preview shows unpublished changes only to signed-in editors', async ({ browser, page }) => {
    await signIn(page)

    const { docs } = await json<{ docs: Doc[] }>(
      await api(page).get('/api/pages?where[slug][equals]=about&depth=0&draft=true&limit=1'),
    )
    const about = docs[0] as Doc & { layout: ({ blockType: string; headline?: string } & Record<string, unknown>)[] }
    const original = structuredClone(about.layout)
    const headline = `Draft headline ${unique()}`

    try {
      // Save a draft (not published).
      const layout = about.layout.map((block) => (block.blockType === 'hero' ? { ...block, headline } : block))
      await json(await api(page).patch(`/api/pages/${about.id}?draft=true`, { data: { _status: 'draft', layout } }))

      // The public still sees the published version.
      const visitor = await browser.newContext()
      const publicPage = await visitor.newPage()
      await publicPage.goto('/about')
      await expect(publicPage.locator('h1')).not.toContainText(headline)

      // The preview URL without a session is refused.
      const refused = await publicPage.goto(`/next/preview?path=/about&previewSecret=${process.env.PREVIEW_SECRET ?? ''}`)
      expect(refused?.status()).toBe(403)
      await visitor.close()

      // The editor's preview shows the draft.
      await page.goto(`/next/preview?path=/about&previewSecret=${process.env.PREVIEW_SECRET ?? ''}`)
      await expect(page.locator('h1')).toContainText(headline)
      await expect(page.getByText('Preview mode')).toBeVisible()

      await page.getByRole('link', { name: 'Exit preview' }).click()
      await expect(page.locator('h1')).not.toContainText(headline)
    } finally {
      await json(await api(page).patch(`/api/pages/${about.id}`, { data: { _status: 'published', layout: original } }))
    }
  })
})
