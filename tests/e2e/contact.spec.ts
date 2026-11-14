import { expect, test } from '@playwright/test'

/**
 * Contact form: accessible validation, spam protection and a successful submission.
 *
 * The success test stores a real enquiry (marked "Automated test") in whichever database
 * the target site uses. Set E2E_SKIP_SUBMIT=true to leave that test out.
 */

const openForm = async (page: import('@playwright/test').Page) => {
  await page.goto('/contact')
  const form = page.getByRole('form', { name: 'Contact' })
  await form.scrollIntoViewIfNeeded()
  // The send button is enabled once the form's timing token has loaded.
  await expect(form.getByRole('button', { name: /send/i })).toBeEnabled()
  return form
}

test.describe('contact form', () => {
  test('every field has a label and required fields are marked', async ({ page }) => {
    const form = await openForm(page)

    for (const name of ['Your name', 'Email', 'Phone', 'Business name', 'What do you need help with?', 'Tell us about your project']) {
      await expect(form.getByLabel(name, { exact: false }).first()).toBeVisible()
    }

    await expect(form.getByLabel('Your name')).toHaveAttribute('required', '')
    await expect(form.getByLabel('Email')).toHaveAttribute('type', 'email')
  })

  test('invalid input is explained next to each field and focus moves to the first problem', async ({ page }) => {
    const form = await openForm(page)

    await form.getByLabel('Email').fill('not-an-email')
    // Wait past the "too fast" window so we are testing validation, not spam protection.
    await page.waitForTimeout(3000)
    await form.getByRole('button', { name: /send/i }).click()

    await expect(form.getByRole('alert')).toContainText(/check the highlighted fields/i)

    const name = form.getByLabel('Your name')
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(name).toBeFocused()

    const describedBy = await name.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    await expect(page.locator(`[id="${describedBy}"]`)).toContainText(/required/i)

    await expect(form.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true')
    // What the visitor typed is still there.
    await expect(form.getByLabel('Email')).toHaveValue('not-an-email')
  })

  test('instant (bot-speed) submissions are rejected', async ({ page }) => {
    const form = await openForm(page)

    await form.getByLabel('Your name').fill('Speedy Bot')
    await form.getByLabel('Email').fill('bot@example.com')
    await form.getByLabel('Tell us about your project').fill('Sent immediately after the page loaded.')
    await form.getByRole('button', { name: /send/i }).click()

    await expect(form.getByRole('alert')).toContainText(/that was quick/i)
  })

  test('a valid enquiry is accepted and confirmed', async ({ page }) => {
    test.skip(process.env.E2E_SKIP_SUBMIT === 'true', 'E2E_SKIP_SUBMIT is set')

    const form = await openForm(page)
    const stamp = new Date().toISOString()

    await form.getByLabel('Your name').fill('Automated test')
    await form.getByLabel('Email').fill('automated-test@example.com')
    await form.getByLabel('Phone').fill('+91 00000 00000')
    await form.getByLabel('Business name').fill('Playwright')
    await form.getByLabel('What do you need help with?').selectOption({ index: 1 })
    await form.getByLabel('Tell us about your project').fill(`Automated end-to-end test — safe to delete. ${stamp}`)

    await page.waitForTimeout(3000)
    await form.getByRole('button', { name: /send/i }).click()

    const confirmation = page.getByRole('status').filter({ hasText: /thank you/i })
    await expect(confirmation).toBeVisible()
    await expect(confirmation).toBeFocused()
    // The form is replaced by the confirmation, so it cannot be sent twice by accident.
    await expect(page.getByRole('form', { name: 'Contact' })).toHaveCount(0)
  })
})
