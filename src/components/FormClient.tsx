'use client'

import { useRouter } from 'next/navigation'
import React, { startTransition, useActionState, useEffect, useId, useRef, useState } from 'react'

import type { PublicForm, PublicFormField } from '@/lib/forms'

import { type FormState, getFormToken, submitForm } from '@/app/(frontend)/actions/forms'
import { HONEYPOT_FIELD } from '@/lib/forms'
import { cn } from '@/lib/text'

import { Arrow } from './icons'

type Props = {
  /** Server-rendered confirmation message (rich text from the CMS). */
  confirmation: React.ReactNode
  /** Shown in the no-JavaScript fallback. */
  fallbackEmail?: null | string
  form: PublicForm
  /** Server-rendered rich text for the form's "message" blocks, keyed by field name. */
  messages: Record<string, React.ReactNode>
}

type InputField = Exclude<PublicFormField, { blockType: 'message' }>

const TOKEN_REFRESH_MS = 45 * 60 * 1000

/** Sensible autofill and keyboard hints from the field's name. */
const hintsFor = (field: InputField): React.InputHTMLAttributes<HTMLInputElement> => {
  const name = field.name.toLowerCase()
  if (field.blockType === 'email') return { autoComplete: 'email', inputMode: 'email', type: 'email' }
  if (field.blockType === 'number') return { inputMode: 'decimal', type: 'text' }
  if (/phone|mobile|tel|whatsapp/.test(name)) return { autoComplete: 'tel', inputMode: 'tel', type: 'tel' }
  if (/company|business|organi[sz]ation/.test(name)) return { autoComplete: 'organization', type: 'text' }
  if (/name/.test(name)) return { autoComplete: 'name', type: 'text' }
  return { type: 'text' }
}

/**
 * Renders a CMS-defined form. Submissions go to a server action that validates them,
 * runs the spam checks and stores them for the admin (see app/(frontend)/actions/forms.ts).
 *
 * Accessibility: every control has a visible label, errors are linked with
 * aria-describedby and announced, focus moves to the first problem (or to the
 * confirmation), and nothing the visitor typed is lost when validation fails.
 */
export const FormClient: React.FC<Props> = ({ confirmation, fallbackEmail, form, messages }) => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(submitForm, {
    status: 'idle',
  })
  const [token, setToken] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const router = useRouter()

  // Signed timing token for spam protection: issued on mount, kept fresh while the page is open.
  useEffect(() => {
    let cancelled = false

    const load = () =>
      getFormToken(form.id)
        .then((value) => {
          if (!cancelled) setToken(value)
        })
        .catch(() => undefined)

    void load()
    const interval = window.setInterval(load, TOKEN_REFRESH_MS)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [form.id])

  // After each response: move focus to where the visitor needs to look.
  useEffect(() => {
    if (state.status === 'idle') return

    if (state.status === 'success') {
      if (form.confirmationType === 'redirect' && form.redirectUrl?.startsWith('/')) {
        router.push(form.redirectUrl)
        return
      }
      statusRef.current?.focus()
      return
    }

    if (state.refreshToken) {
      void getFormToken(form.id)
        .then(setToken)
        .catch(() => undefined)
    }

    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    ;(firstInvalid ?? statusRef.current)?.focus()
  }, [state, form.confirmationType, form.id, form.redirectUrl, router])

  if (state.status === 'success') {
    return (
      <div className="form-status" data-kind="success" ref={statusRef} role="status" tabIndex={-1}>
        {confirmation ?? <p>Thank you — your message has been sent.</p>}
      </div>
    )
  }

  const fieldErrors = state.status === 'error' ? (state.fieldErrors ?? {}) : {}

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Submitting manually (instead of <form action>) keeps what was typed if validation fails.
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    startTransition(() => formAction(data))
  }

  return (
    <form aria-label={form.title} noValidate onSubmit={onSubmit} ref={formRef}>
      <input name="_form" type="hidden" value={form.id} />
      <input name="_token" type="hidden" value={token} />

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it in. */}
      <div aria-hidden="true" className="hp-field">
        <label htmlFor={`${uid}-hp`}>Reference (leave this field empty)</label>
        <input autoComplete="off" id={`${uid}-hp`} name={HONEYPOT_FIELD} tabIndex={-1} type="text" />
      </div>

      {state.status === 'error' ? (
        <div
          className="form-status mb-6"
          data-kind="error"
          ref={statusRef}
          role="alert"
          tabIndex={-1}
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {form.fields.map((field) => {
          if (field.blockType === 'message') {
            return (
              <div className="sm:col-span-2" key={field.name}>
                {messages[field.name]}
              </div>
            )
          }

          const id = `${uid}-${field.name}`
          const error = fieldErrors[field.name]
          const errorId = `${id}-error`
          const span = field.width <= 50 ? 'sm:col-span-1' : 'sm:col-span-2'

          const described = {
            'aria-describedby': error ? errorId : undefined,
            'aria-invalid': error ? (true as const) : undefined,
          }

          const errorMessage = error ? (
            <p className="field__error" id={errorId}>
              <span aria-hidden="true">!</span>
              {error}
            </p>
          ) : null

          if (field.blockType === 'checkbox') {
            return (
              <div className={cn('field', span)} key={field.name}>
                <div className="checkbox">
                  <input
                    defaultChecked={field.defaultChecked}
                    id={id}
                    name={field.name}
                    required={field.required}
                    type="checkbox"
                    {...described}
                  />
                  <label htmlFor={id}>
                    {field.label}
                    {field.required ? (
                      <span aria-hidden="true" className="field__req">
                        *
                      </span>
                    ) : null}
                  </label>
                </div>
                {errorMessage}
              </div>
            )
          }

          const label = (
            <label htmlFor={id}>
              {field.label}
              {field.required ? (
                <span aria-hidden="true" className="field__req">
                  *
                </span>
              ) : (
                <span className="field__hint"> (optional)</span>
              )}
            </label>
          )

          return (
            <div className={cn('field', span)} key={field.name}>
              {label}

              {field.blockType === 'textarea' ? (
                <textarea
                  className="input"
                  defaultValue={field.defaultValue}
                  id={id}
                  maxLength={5000}
                  name={field.name}
                  required={field.required}
                  rows={6}
                  {...described}
                />
              ) : field.blockType === 'select' ? (
                <select
                  className="input"
                  defaultValue={field.defaultValue ?? ''}
                  id={id}
                  name={field.name}
                  required={field.required}
                  {...described}
                >
                  <option value="">{field.placeholder || 'Select an option'}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="input"
                  defaultValue={'defaultValue' in field ? field.defaultValue : undefined}
                  id={id}
                  maxLength={field.blockType === 'email' ? 254 : 200}
                  name={field.name}
                  required={field.required}
                  {...hintsFor(field)}
                  {...described}
                />
              )}

              {errorMessage}
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button className="btn btn--primary" disabled={isPending || !token} type="submit">
          {isPending ? 'Sending…' : form.submitLabel}
          <Arrow />
        </button>
        <p className="field__hint">
          <span aria-hidden="true" className="field__req mr-1">
            *
          </span>
          Required
        </p>
      </div>

      <noscript>
        <p className="form-status mt-6" data-kind="error">
          This form needs JavaScript to send.
          {fallbackEmail ? ` You can also email us at ${fallbackEmail}.` : ''}
        </p>
      </noscript>
    </form>
  )
}
