import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * GET /og?title=…&eyebrow=…
 *
 * Generates the 1200 × 630 sharing card used when a page has no SEO image of its own:
 * off-white paper, charcoal headline, the brand gradient as a rising sun, and the logo
 * artwork exactly as supplied. The title is part of the URL, so every card can be cached
 * forever — a new title simply produces a new URL.
 */

const asset = (...segments: string[]) => readFile(join(process.cwd(), ...segments))

const INK = '#1d1b19'
const PAPER = '#faf6ef'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get('title') || 'Your Growth Partner.').slice(0, 110)
  const eyebrow = (searchParams.get('eyebrow') || 'EFC Media').slice(0, 60)

  const [display, sans, sansMedium, logo] = await Promise.all([
    asset('src', 'assets', 'fonts', 'bricolage-grotesque-latin-700-normal.woff'),
    asset('src', 'assets', 'fonts', 'poppins-latin-400-normal.woff'),
    asset('src', 'assets', 'fonts', 'poppins-latin-500-normal.woff'),
    asset('public', 'brand', 'logo.png'),
  ])

  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`
  const fontSize = title.length > 70 ? 60 : title.length > 40 ? 74 : 92

  return new ImageResponse(
    (
      <div
        style={{
          background: PAPER,
          color: INK,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Poppins',
          height: '100%',
          justifyContent: 'space-between',
          padding: '64px 72px',
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Rising sun */}
        <div
          style={{
            background: 'linear-gradient(225deg, #f9bb08 0%, #fe7322 100%)',
            borderRadius: 9999,
            bottom: -250,
            height: 560,
            position: 'absolute',
            right: -130,
            width: 560,
          }}
        />

        <div style={{ alignItems: 'center', display: 'flex', gap: 14 }}>
          <div
            style={{
              background: 'linear-gradient(225deg, #f9bb08 0%, #fe7322 100%)',
              borderRadius: 9999,
              height: 14,
              width: 14,
            }}
          />
          <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: 4, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'Bricolage Grotesque',
            fontSize,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
            maxWidth: 880,
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex' }}>
          {/* The logo, unmodified, at its own proportions (546 × 579). */}
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img height={127} src={logoSrc} width={120} />
        </div>
      </div>
    ),
    {
      fonts: [
        { data: display, name: 'Bricolage Grotesque', style: 'normal', weight: 700 },
        { data: sans, name: 'Poppins', style: 'normal', weight: 400 },
        { data: sansMedium, name: 'Poppins', style: 'normal', weight: 500 },
      ],
      headers: {
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      },
      height: 630,
      width: 1200,
    },
  )
}
