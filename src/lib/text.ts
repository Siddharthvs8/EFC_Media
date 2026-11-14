/** Join class names, skipping falsy values. */
export const cn = (...values: (false | null | string | undefined)[]): string =>
  values.filter(Boolean).join(' ')

export type TextSegment = { highlight: boolean; text: string }

/**
 * Editors mark emphasis in headings with *asterisks*:
 * "We turn clicks into *customers.*" → [{ text: 'We turn clicks into ' }, { text: 'customers.', highlight: true }]
 */
export const parseHighlight = (input: string): TextSegment[] =>
  input
    .split(/(\*[^*\n]+\*)/g)
    .filter((part) => part.length > 0)
    .map((part) =>
      part.length > 2 && part.startsWith('*') && part.endsWith('*')
        ? { highlight: true, text: part.slice(1, -1) }
        : { highlight: false, text: part },
    )

/** The same heading as plain text (for metadata, aria-labels and structured data). */
export const stripHighlight = (input?: null | string): string =>
  (input ?? '').replace(/\*([^*\n]+)\*/g, '$1').replace(/\s+/g, ' ').trim()

/** Split editor text into lines on line breaks, dropping empty lines. */
export const splitLines = (input: string): string[] =>
  input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
})

/** "12 Nov 2026" */
export const formatDate = (iso?: null | string): string => {
  if (!iso) return ''
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
}

/** "01", "02", … for numbered lists. */
export const pad2 = (n: number): string => String(n).padStart(2, '0')

/** Trim text to a maximum length on a word boundary, for meta descriptions. */
export const truncate = (text: string, max = 160): string => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 30)).trimEnd()}…`
}
