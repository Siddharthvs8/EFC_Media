import { describe, expect, it } from 'vitest'

import type { PublicForm } from '@/lib/forms'
import type { Form } from '@/payload-types'

import {
  cleanMultiLine,
  cleanSingleLine,
  HONEYPOT_FIELD,
  pickSubmitter,
  toPublicForm,
  validateSubmission,
} from '@/lib/forms'

const form: PublicForm = {
  id: 1,
  title: 'Contact',
  submitLabel: 'Send',
  confirmationType: 'message',
  confirmationMessage: null,
  redirectUrl: null,
  fields: [
    { blockType: 'text', name: 'name', label: 'Your name', required: true, width: 50 },
    { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
    { blockType: 'text', name: 'phone', label: 'Phone', required: false, width: 50 },
    {
      blockType: 'select',
      name: 'service',
      label: 'Service',
      required: false,
      width: 100,
      options: [
        { label: 'SEO', value: 'SEO' },
        { label: 'Branding', value: 'Branding' },
      ],
    },
    { blockType: 'checkbox', name: 'consent', label: 'I agree', required: true, width: 100, defaultChecked: false },
    { blockType: 'textarea', name: 'message', label: 'Message', required: true, width: 100 },
    { blockType: 'message', name: 'message-6', message: null },
  ],
}

const valid = {
  consent: 'on',
  email: 'asha@example.com',
  message: 'We would like help with our launch.',
  name: 'Asha',
  service: 'SEO',
}

describe('validateSubmission', () => {
  it('accepts a complete submission and returns clean values', () => {
    const { errors, values } = validateSubmission(form, valid)

    expect(errors).toEqual({})
    expect(values).toEqual([
      { field: 'name', value: 'Asha' },
      { field: 'email', value: 'asha@example.com' },
      { field: 'service', value: 'SEO' },
      { field: 'consent', value: 'Yes' },
      { field: 'message', value: 'We would like help with our launch.' },
    ])
  })

  it('reports every missing required field', () => {
    const { errors } = validateSubmission(form, {})

    expect(Object.keys(errors).sort()).toEqual(['consent', 'email', 'message', 'name'])
    expect(errors.name).toBe('Your name is required.')
  })

  it.each(['plainaddress', 'a@b', 'a b@example.com', 'a@example..com', 'a@exa mple.com', '<a@example.com>'])(
    'rejects the invalid email %s',
    (email) => {
      expect(validateSubmission(form, { ...valid, email }).errors.email).toMatch(/valid email/)
    },
  )

  it('rejects a select value that is not one of the options', () => {
    expect(validateSubmission(form, { ...valid, service: 'Hacking' }).errors.service).toBeDefined()
  })

  it('enforces length limits', () => {
    expect(validateSubmission(form, { ...valid, name: 'x'.repeat(201) }).errors.name).toMatch(/too long/)
    expect(validateSubmission(form, { ...valid, message: 'x'.repeat(5001) }).errors.message).toMatch(/too long/)
  })

  it('ignores fields that are not part of the form (including the honeypot)', () => {
    const { values } = validateSubmission(form, { ...valid, [HONEYPOT_FIELD]: 'bot', _token: 'abc', extra: 'nope' })

    expect(values.map((value) => value.field)).not.toContain(HONEYPOT_FIELD)
    expect(values.map((value) => value.field)).not.toContain('extra')
  })

  it('neutralises markup and control characters', () => {
    const { values } = validateSubmission(form, {
      ...valid,
      message: 'Hello <script>alert(1)</script>\r\nSecond line\u0000',
      name: 'Asha\r\nBcc: someone@example.com',
    })
    const byField = Object.fromEntries(values.map((value) => [value.field, value.value]))

    expect(byField.name).toBe('Asha Bcc: someone@example.com')
    expect(byField.message).toBe('Hello ‹script›alert(1)‹/script›\nSecond line')
  })
})

describe('cleaning helpers', () => {
  it('collapses whitespace on single-line input', () => {
    expect(cleanSingleLine('  a \t b\n c  ')).toBe('a b c')
  })

  it('keeps paragraphs but trims excessive blank lines on multi-line input', () => {
    expect(cleanMultiLine('a\n\n\n\n\n\nb')).toBe('a\n\n\nb')
  })
})

describe('pickSubmitter', () => {
  it('finds the name and email whatever the fields are called', () => {
    const { values } = validateSubmission(form, valid)
    expect(pickSubmitter(form, values)).toEqual({ email: 'asha@example.com', name: 'Asha' })
  })
})

describe('toPublicForm', () => {
  it('never exposes notification email settings', () => {
    const doc = {
      id: 7,
      title: 'Contact',
      createdAt: '',
      updatedAt: '',
      emails: [{ emailTo: 'private@example.com', subject: 'New enquiry' }],
      fields: [{ blockType: 'text', name: 'full_name', required: true }],
    } as unknown as Form

    const result = toPublicForm(doc)

    expect(JSON.stringify(result)).not.toContain('private@example.com')
    expect(result.fields[0]).toMatchObject({ blockType: 'text', label: 'Full name', name: 'full_name', width: 100 })
    expect(result.submitLabel).toBe('Send message')
  })
})
