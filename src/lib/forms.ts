import type { Form } from '@/payload-types'

/**
 * Form helpers shared by the server action and the browser component.
 * Pure functions only (no Node or Payload imports) so they are easy to unit test.
 */

type RichTextState = NonNullable<Form['confirmationMessage']>

type BaseField = {
  label: string
  name: string
  required: boolean
  /** Column width in percent (100 = full row). */
  width: number
}

export type PublicFormField =
  | (BaseField & { blockType: 'checkbox'; defaultChecked: boolean })
  | (BaseField & { blockType: 'email' })
  | (BaseField & { blockType: 'number'; defaultValue?: string })
  | (BaseField & {
      blockType: 'select'
      defaultValue?: string
      options: { label: string; value: string }[]
      placeholder?: string
    })
  | (BaseField & { blockType: 'text'; defaultValue?: string })
  | (BaseField & { blockType: 'textarea'; defaultValue?: string })
  | { blockType: 'message'; message: null | RichTextState; name: string }

export type PublicForm = {
  confirmationMessage: null | RichTextState
  confirmationType: 'message' | 'redirect'
  fields: PublicFormField[]
  id: number
  redirectUrl: null | string
  submitLabel: string
  title: string
}

const humanize = (name: string): string =>
  name.replace(/[-_]+/g, ' ').replace(/^\w/, (char) => char.toUpperCase())

/**
 * The subset of a form document that is safe to send to the browser.
 * Notification settings (`emails`) never leave the server.
 */
export const toPublicForm = (form: Form): PublicForm => ({
  id: form.id,
  title: form.title,
  submitLabel: form.submitButtonLabel?.trim() || 'Send message',
  confirmationType: form.confirmationType === 'redirect' ? 'redirect' : 'message',
  confirmationMessage: form.confirmationMessage ?? null,
  redirectUrl: form.redirect?.url ?? null,
  fields: (form.fields ?? []).map((field, index): PublicFormField => {
    if (field.blockType === 'message') {
      return { blockType: 'message', message: field.message ?? null, name: `message-${index}` }
    }

    const base: BaseField = {
      name: field.name,
      label: field.label?.trim() || humanize(field.name),
      required: Boolean(field.required),
      width: field.width && field.width > 0 && field.width <= 100 ? field.width : 100,
    }

    switch (field.blockType) {
      case 'checkbox':
        return { ...base, blockType: 'checkbox', defaultChecked: Boolean(field.defaultValue) }
      case 'email':
        return { ...base, blockType: 'email' }
      case 'number':
        return {
          ...base,
          blockType: 'number',
          defaultValue: field.defaultValue != null ? String(field.defaultValue) : undefined,
        }
      case 'select':
        return {
          ...base,
          blockType: 'select',
          defaultValue: field.defaultValue ?? undefined,
          options: (field.options ?? []).map(({ label, value }) => ({ label, value })),
          placeholder: field.placeholder ?? undefined,
        }
      case 'textarea':
        return { ...base, blockType: 'textarea', defaultValue: field.defaultValue ?? undefined }
      default:
        return { ...base, blockType: 'text', defaultValue: field.defaultValue ?? undefined }
    }
  }),
})

/* -------------------------------------------------------------------------- */
/*  Validation                                                                */
/* -------------------------------------------------------------------------- */

export const LIMITS = { email: 254, text: 200, textarea: 5000 } as const

/**
 * Name of the honeypot input. Deliberately not a word browsers' autofill recognises
 * (name, company, website, phone…) so a real visitor's autofill never trips it.
 */
export const HONEYPOT_FIELD = 'subject_ref'

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const CONTROL_CHARS_AND_BREAKS = /[\u0000-\u001F\u007F]/g

/**
 * Values end up in notification emails (HTML) and in the admin, so strip control
 * characters and neutralise angle brackets rather than trusting every renderer to escape.
 */
const neutralise = (value: string): string => value.replace(/</g, '‹').replace(/>/g, '›')

export const cleanSingleLine = (value: string): string =>
  neutralise(value.replace(CONTROL_CHARS_AND_BREAKS, ' ').replace(/\s+/g, ' ').trim())

export const cleanMultiLine = (value: string): string =>
  neutralise(
    value
      .replace(/\r\n?/g, '\n')
      .replace(CONTROL_CHARS, '')
      .replace(/\n{4,}/g, '\n\n\n')
      .trim(),
  )

export type SubmissionValue = { field: string; value: string }

export type ValidationResult = {
  errors: Record<string, string>
  values: SubmissionValue[]
}

/** Validate raw form input against the form definition from the CMS. */
export const validateSubmission = (
  form: PublicForm,
  input: Record<string, unknown>,
): ValidationResult => {
  const errors: Record<string, string> = {}
  const values: SubmissionValue[] = []

  for (const field of form.fields) {
    if (field.blockType === 'message') continue

    const raw = input[field.name]
    const text = typeof raw === 'string' ? raw : ''
    const label = field.label

    if (field.blockType === 'checkbox') {
      const checked = text === 'on' || text === 'true' || text === 'yes'
      if (field.required && !checked) errors[field.name] = `Please tick “${label}” to continue.`
      values.push({ field: field.name, value: checked ? 'Yes' : 'No' })
      continue
    }

    const value = field.blockType === 'textarea' ? cleanMultiLine(text) : cleanSingleLine(text)

    if (!value) {
      if (field.required) errors[field.name] = `${label} is required.`
      continue
    }

    switch (field.blockType) {
      case 'email':
        if (value.length > LIMITS.email || !EMAIL_PATTERN.test(value)) {
          errors[field.name] = 'Enter a valid email address, like name@example.com.'
        }
        break
      case 'number':
        if (!/^-?\d+(\.\d+)?$/.test(value)) errors[field.name] = `${label} must be a number.`
        break
      case 'select':
        if (!field.options.some((option) => option.value === value)) {
          errors[field.name] = `Choose one of the options for ${label}.`
        }
        break
      case 'textarea':
        if (value.length > LIMITS.textarea) {
          errors[field.name] = `${label} is too long — please keep it under ${LIMITS.textarea.toLocaleString('en')} characters.`
        }
        break
      default:
        if (value.length > LIMITS.text) {
          errors[field.name] = `${label} is too long — please keep it under ${LIMITS.text} characters.`
        }
    }

    values.push({ field: field.name, value })
  }

  return { errors, values }
}

/** Best-effort name/email for the admin list view, whatever the form's fields are called. */
export const pickSubmitter = (
  form: PublicForm,
  values: SubmissionValue[],
): { email: null | string; name: null | string } => {
  const byName = new Map(values.map(({ field, value }) => [field, value]))

  const emailField = form.fields.find((field) => field.blockType === 'email')
  const nameField = form.fields.find(
    (field) => field.blockType === 'text' && /name/i.test(field.name),
  )

  return {
    email: emailField ? (byName.get(emailField.name) ?? null) : null,
    name: nameField ? (byName.get(nameField.name) ?? null) : null,
  }
}
