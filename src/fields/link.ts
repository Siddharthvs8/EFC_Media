import type { Field, GroupField } from 'payload'

/** Collections an editor can pick as an internal link target. */
export const LINKABLE_COLLECTIONS = ['pages', 'services', 'case-studies', 'posts'] as const

type LinkOptions = {
  /** Field name, defaults to `link`. */
  name?: string
  label?: string | false
  /** Adds a "Style" select (primary / secondary / text). */
  appearances?: boolean
  /** When false the whole link is optional (nothing renders until label + target are set). */
  required?: boolean
  description?: string
}

/**
 * Reusable link group: an internal document or a custom URL, with a label.
 * Rendered on the site by `<CMSLink>` and resolved by `resolveLink()`.
 */
export const link = ({
  name = 'link',
  label = false,
  appearances = false,
  required = true,
  description,
}: LinkOptions = {}): GroupField => {
  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'reference',
          options: [
            { label: 'Page on this site', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in a new tab',
          admin: { width: '50%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          relationTo: [...LINKABLE_COLLECTIONS],
          label: 'Link to',
          required,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required,
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.type === 'custom',
            description: 'e.g. /contact, https://…, mailto:… or tel:…',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required,
          admin: { width: '50%' },
        },
      ],
    },
  ]

  if (appearances) {
    fields.push({
      name: 'appearance',
      type: 'select',
      label: 'Style',
      defaultValue: 'primary',
      options: [
        { label: 'Primary button', value: 'primary' },
        { label: 'Secondary button', value: 'secondary' },
        { label: 'Text link', value: 'text' },
      ],
    })
  }

  return {
    name,
    type: 'group',
    label,
    admin: { hideGutter: true, description },
    fields,
  }
}
