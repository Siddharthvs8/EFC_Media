import type { Field } from 'payload'

/**
 * Settings shared by every page section (block): visibility, colour theme and an
 * optional anchor so links can jump straight to the section.
 */
export const sectionSettings: Field = {
  type: 'collapsible',
  label: 'Section settings',
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'isHidden',
          type: 'checkbox',
          label: 'Hide this section',
          defaultValue: false,
          admin: {
            width: '34%',
            description: 'Keeps the content here but removes it from the site.',
          },
        },
        {
          name: 'theme',
          type: 'select',
          label: 'Background',
          defaultValue: 'light',
          options: [
            { label: 'Off-white', value: 'light' },
            { label: 'Warm sand', value: 'tint' },
            { label: 'Charcoal', value: 'dark' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'anchor',
          type: 'text',
          label: 'Anchor ID',
          admin: {
            width: '33%',
            description: 'Optional. "approach" lets you link to /#approach.',
          },
          validate: (value: unknown) => {
            if (!value) return true
            return /^[a-z][a-z0-9-]*$/.test(String(value))
              ? true
              : 'Use lowercase letters, numbers and hyphens, starting with a letter.'
          },
        },
      ],
    },
  ],
}

/** Eyebrow + heading + intro, the standard opening of a section. */
export const sectionIntro = ({
  headingRequired = false,
  headingDescription,
}: { headingRequired?: boolean; headingDescription?: string } = {}): Field[] => [
  {
    name: 'eyebrow',
    type: 'text',
    admin: { description: 'Small label above the heading.' },
  },
  {
    name: 'heading',
    type: 'textarea',
    required: headingRequired,
    admin: {
      rows: 2,
      description:
        headingDescription ?? 'Wrap a word or phrase in *asterisks* to highlight it.',
    },
  },
  {
    name: 'intro',
    type: 'textarea',
    admin: { rows: 3 },
  },
]
