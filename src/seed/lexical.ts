/**
 * Tiny helpers for writing Lexical rich text by hand in the seed script.
 *
 *   richText(h2('Heading'), p('A paragraph with ', bold('bold'), ' text.'), ul('One', 'Two'))
 */

type Node = Record<string, unknown>
type Inline = Node | string

const base = { direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 }

export const text = (value: string, format = 0): Node => ({
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text: value,
  type: 'text',
  version: 1,
})

export const bold = (value: string): Node => text(value, 1)

const inline = (children: Inline[]): Node[] =>
  children.map((child) => (typeof child === 'string' ? text(child) : child))

export const p = (...children: Inline[]): Node => ({
  ...base,
  children: inline(children),
  textFormat: 0,
  type: 'paragraph',
})

const heading = (tag: 'h2' | 'h3' | 'h4') => (value: string): Node => ({
  ...base,
  children: [text(value)],
  tag,
  type: 'heading',
})

export const h2 = heading('h2')
export const h3 = heading('h3')

const list = (listType: 'bullet' | 'number') => (...items: Inline[]): Node => ({
  ...base,
  children: items.map((item, index) => ({
    ...base,
    children: inline([item]),
    type: 'listitem',
    value: index + 1,
  })),
  listType,
  start: 1,
  tag: listType === 'number' ? 'ol' : 'ul',
  type: 'list',
})

export const ul = list('bullet')
export const ol = list('number')

export const quote = (value: string): Node => ({ ...base, children: [text(value)], type: 'quote' })

/** Wraps nodes in a Lexical editor state, the shape Payload stores for rich text fields. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- generated field types are structural
export const richText = (...children: Node[]): any => ({
  root: { ...base, children, type: 'root' },
})
