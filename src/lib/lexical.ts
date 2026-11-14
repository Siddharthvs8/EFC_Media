type LexicalNode = {
  children?: LexicalNode[]
  text?: string
  type?: string
}

type LexicalState = { root?: LexicalNode } | null | undefined

const BLOCK_TYPES = new Set(['heading', 'list', 'listitem', 'paragraph', 'quote'])

const collect = (node: LexicalNode | undefined, out: string[]): void => {
  if (!node) return
  if (typeof node.text === 'string') out.push(node.text)
  node.children?.forEach((child) => collect(child, out))
  if (node.type && BLOCK_TYPES.has(node.type)) out.push(' ')
}

/** Flatten Lexical rich text to plain text (used for descriptions and reading time). */
export const lexicalToPlainText = (state: LexicalState): string => {
  const out: string[] = []
  collect(state?.root, out)
  return out.join('').replace(/\s+/g, ' ').trim()
}

export const hasRichText = (state: LexicalState): boolean => lexicalToPlainText(state).length > 0

/** Minutes to read at ~220 words per minute, never less than 1. */
export const readingMinutes = (state: LexicalState): number => {
  const words = lexicalToPlainText(state).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}
