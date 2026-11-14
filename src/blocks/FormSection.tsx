import React from 'react'

import type { FormBlock } from '@/payload-types'

import { ContactDetails } from '@/components/ContactDetails'
import { FormClient } from '@/components/FormClient'
import { RichHeading } from '@/components/RichHeading'
import { RichText } from '@/components/RichText'
import { Section } from '@/components/Section'
import { getForm, getSettings, shouldHidePlaceholders } from '@/lib/data'
import { type PublicForm, toPublicForm } from '@/lib/forms'

/**
 * A form from the CMS with optional contact details beside it. The form definition is
 * read on the server; only the fields the browser needs are passed to the client
 * component (never the notification email settings).
 */
export const FormSection = async ({ block }: { block: FormBlock }) => {
  const formId = typeof block.form === 'object' ? block.form.id : block.form

  const [formDoc, settings, hidePlaceholders] = await Promise.all([
    getForm(formId),
    getSettings(),
    shouldHidePlaceholders(),
  ])

  if (!formDoc) return null

  const form = toPublicForm(formDoc)

  // Rich text is rendered here on the server and handed to the client as ready-made nodes.
  const messages: Record<string, React.ReactNode> = {}
  for (const field of form.fields) {
    if (field.blockType === 'message') {
      messages[field.name] = <RichText className="text-muted text-sm" data={field.message} />
    }
  }

  const clientForm: PublicForm = {
    ...form,
    confirmationMessage: null,
    fields: form.fields.map((field) =>
      field.blockType === 'message' ? { ...field, message: null } : field,
    ),
  }

  return (
    <Section anchor={block.anchor} theme={block.theme}>
      <div className="wrap grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          {block.eyebrow ? (
            <p className="eyebrow" data-reveal>
              {block.eyebrow}
            </p>
          ) : null}
          {block.heading ? (
            <RichHeading
              as="h2"
              className="display-md mt-[1.125rem] max-w-[14ch]"
              data-reveal
              text={block.heading}
            />
          ) : null}
          {block.intro ? (
            <p className="lead text-muted mt-6 max-w-md" data-reveal>
              {block.intro}
            </p>
          ) : null}

          {block.showContactDetails ? (
            <div className="border-line mt-10 border-t pt-8" data-reveal>
              <ContactDetails hidePlaceholders={hidePlaceholders} settings={settings} />
            </div>
          ) : null}
        </div>

        <div className="form-card" data-reveal>
          <FormClient
            confirmation={<RichText data={form.confirmationMessage} />}
            fallbackEmail={settings.email}
            form={clientForm}
            messages={messages}
          />
        </div>
      </div>
    </Section>
  )
}
