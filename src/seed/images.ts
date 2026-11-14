import sharp from 'sharp'

/**
 * Abstract cover artwork for the starter content, drawn in the site's palette and
 * rendered to WebP at seed time. These are neutral graphics (no photography, no
 * client work) so sample content has something to show until real images are uploaded.
 */

const PAPER = '#faf6ef'
const SAND = '#f1eadc'
const INK = '#1d1b19'
const SUN = '#f9bb08'
const FLAME = '#fe7322'

const defs = `<defs><linearGradient id="g" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SUN}"/><stop offset="1" stop-color="${FLAME}"/></linearGradient></defs>`

const svg = (w: number, h: number, body: string): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}${body}</svg>`

const dots = (x: number, y: number, cols: number, rows: number, gap: number, color: string): string => {
  let out = ''
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      out += `<circle cx="${x + col * gap}" cy="${y + row * gap}" r="5" fill="${color}"/>`
    }
  }
  return out
}

type Cover = (w: number, h: number) => string

/** Sand field, a large sun low on the right, a quiet dot grid. */
const sunrise: Cover = (w, h) =>
  svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${SAND}"/>
     <circle cx="${w * 0.74}" cy="${h * 0.86}" r="${h * 0.56}" fill="url(#g)"/>
     ${dots(w * 0.08, h * 0.14, 7, 5, 44, INK)}
     <rect x="${w * 0.08}" y="${h * 0.62}" width="${w * 0.26}" height="6" rx="3" fill="${INK}"/>
     <rect x="${w * 0.08}" y="${h * 0.67}" width="${w * 0.16}" height="6" rx="3" fill="${INK}"/>`,
  )

/** Charcoal field with a thick gradient ring leaving the frame. */
const orbit: Cover = (w, h) =>
  svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${INK}"/>
     <circle cx="${w * 0.78}" cy="${h * 0.2}" r="${h * 0.46}" fill="none" stroke="url(#g)" stroke-width="${h * 0.11}"/>
     <circle cx="${w * 0.2}" cy="${h * 0.74}" r="${h * 0.1}" fill="${PAPER}"/>
     <circle cx="${w * 0.2}" cy="${h * 0.74}" r="${h * 0.19}" fill="none" stroke="${PAPER}" stroke-opacity="0.35" stroke-width="3"/>
     <circle cx="${w * 0.2}" cy="${h * 0.74}" r="${h * 0.28}" fill="none" stroke="${PAPER}" stroke-opacity="0.2" stroke-width="3"/>`,
  )

/** Paper field with rising rounded columns. */
const ascent: Cover = (w, h) => {
  const heights = [0.22, 0.34, 0.47, 0.62, 0.78]
  const barWidth = w * 0.1
  const gap = w * 0.045
  const startX = w * 0.16
  const baseline = h * 0.86

  return svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${PAPER}"/>
     ${heights
       .map((value, index) => {
         const barHeight = h * value
         const fill = index === heights.length - 1 ? 'url(#g)' : index % 2 === 0 ? INK : SAND
         return `<rect x="${startX + index * (barWidth + gap)}" y="${baseline - barHeight}" width="${barWidth}" height="${barHeight}" rx="${barWidth / 2}" fill="${fill}"/>`
       })
       .join('')}
     <rect x="${w * 0.08}" y="${baseline + 22}" width="${w * 0.84}" height="5" rx="2.5" fill="${INK}"/>`,
  )
}

/** Gradient field with charcoal contour rings. */
const ripple: Cover = (w, h) =>
  svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="url(#g)"/>
     ${[0.18, 0.3, 0.42, 0.54, 0.66]
       .map(
         (radius) =>
           `<circle cx="${w * 0.14}" cy="${h * 0.92}" r="${h * radius}" fill="none" stroke="${INK}" stroke-width="5"/>`,
       )
       .join('')}
     <circle cx="${w * 0.8}" cy="${h * 0.3}" r="${h * 0.13}" fill="${PAPER}"/>`,
  )

/** Sand field with stacked quarter-circles. */
const quarters: Cover = (w, h) => {
  const size = h * 0.42
  const x = w * 0.5 - size
  const y = h * 0.5 - size

  return svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${SAND}"/>
     <path d="M${x} ${y + size} a${size} ${size} 0 0 1 ${size} -${size} v${size} z" fill="${INK}"/>
     <path d="M${x + size} ${y} h${size} a${size} ${size} 0 0 1 -${size} ${size} z" fill="url(#g)"/>
     <path d="M${x} ${y + size} h${size} v${size} a${size} ${size} 0 0 1 -${size} -${size} z" fill="url(#g)"/>
     <path d="M${x + size} ${y + size} h${size} a${size} ${size} 0 0 1 -${size} ${size} z" fill="${INK}"/>
     ${dots(w * 0.82, h * 0.12, 3, 3, 44, INK)}`,
  )
}

/** Charcoal field with a half sun on the horizon. */
const horizon: Cover = (w, h) =>
  svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${INK}"/>
     <circle cx="${w * 0.5}" cy="${h * 0.72}" r="${h * 0.42}" fill="url(#g)"/>
     <rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="${INK}"/>
     <rect x="${w * 0.08}" y="${h * 0.72}" width="${w * 0.84}" height="4" rx="2" fill="${PAPER}"/>
     ${dots(w * 0.08, h * 0.82, 20, 1, w * 0.0442, PAPER)}`,
  )

export const COVERS = { ascent, horizon, orbit, quarters, ripple, sunrise } as const
export type CoverName = keyof typeof COVERS

export const renderCover = async (name: CoverName, width: number, height: number): Promise<Buffer> =>
  sharp(Buffer.from(COVERS[name](width, height)))
    .webp({ quality: 86 })
    .toBuffer()
