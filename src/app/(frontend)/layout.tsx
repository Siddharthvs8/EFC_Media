import type { Metadata, Viewport } from 'next'

import { Bricolage_Grotesque, Poppins } from 'next/font/google'
import React from 'react'

import introLogo from '@/assets/brand/efc-media-logo.png'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Intro } from '@/components/Intro'
import { isPopulatedMedia } from '@/components/Media'
import { Motion } from '@/components/Motion'
import { PageTransition } from '@/components/PageTransition'
import { PreviewTools } from '@/components/Preview'
import { JsonLd } from '@/components/Section'
import { getSettings, isDraftMode } from '@/lib/data'
import { introScript, isSuppliedLogo } from '@/lib/intro'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { getSiteURL } from '@/lib/url'

import './globals.css'

/**
 * Typography
 * - Poppins is the brand's typeface (the brand book sets the tagline in Poppins Light);
 *   it is used for body copy, navigation and labels.
 * - Bricolage Grotesque is the expressive display face for headlines. The brand book's
 *   wordmark font, Rosca, is a commercial typeface, so it appears only inside the logo
 *   artwork. If EFC Media licenses Rosca for web use, load it here with `next/font/local`
 *   and point `--font-bricolage` at it.
 * Both are self-hosted by next/font (no requests to Google at runtime) with
 * size-adjusted fallbacks to avoid layout shift.
 */
const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600'],
})

const bricolage = Bricolage_Grotesque({
  // Optical size keeps large headlines tight and small headings open. The width axis is
  // left out on purpose: it nearly doubles the font download for little visual gain.
  axes: ['opsz'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-bricolage',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const favicon = isPopulatedMedia(settings.favicon) ? (settings.favicon.url as string) : null

  return {
    metadataBase: new URL(getSiteURL()),
    applicationName: settings.siteName,
    title: {
      default: [settings.siteName, settings.tagline].filter(Boolean).join(' — '),
      template: `%s — ${settings.seo?.titleSuffix?.trim() || settings.siteName}`,
    },
    description: settings.seo?.description || undefined,
    icons: {
      apple: '/brand/apple-icon.png',
      icon: favicon
        ? [{ url: favicon }]
        : [
            { sizes: '192x192', type: 'image/png', url: '/brand/icon-192.png' },
            { sizes: '512x512', type: 'image/png', url: '/brand/icon-512.png' },
          ],
    },
    formatDetection: { address: false, email: false, telephone: false },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf6ef',
}

/**
 * Runs before first paint, independently of the React bundle. It adds the `js` class that
 * enables scroll-reveal styles and creates the reveal observer, exposed as
 * `window.__reveal()`. The Motion component calls it once React has hydrated (marking
 * elements earlier would make the DOM differ from what React expects) and again after each
 * client-side navigation. If React has not started within five seconds — a script failed
 * to load — the observer starts on its own, so content can never stay hidden.
 * While the logo intro plays (`__introHold`), reveals wait and run when it hands over.
 */
const motionBootstrap = `(function(){var d=document,w=window;if(!('IntersectionObserver' in w))return;d.documentElement.classList.add('js');var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting){es[i].target.setAttribute('data-inview','');io.unobserve(es[i].target)}}},{rootMargin:'0px 0px -8% 0px',threshold:0.05});var scan=function(){var els=d.querySelectorAll('[data-reveal]:not([data-inview])');for(var i=0;i<els.length;i++)io.observe(els[i])};w.__reveal=function(){if(w.__introHold){w.__introPending=true;return}scan()};setTimeout(function(){if(!w.__motionReady)scan()},5000)})();`

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, draft] = await Promise.all([getSettings(), isDraftMode()])

  // The logo intro (src/lib/intro.ts): never in draft preview, and only while the site
  // uses the supplied logo — it is built from that artwork.
  const intro = !draft && isSuppliedLogo(settings.logo)

  return (
    <html className={`${poppins.variable} ${bricolage.variable}`} lang="en" suppressHydrationWarning>
      <head>
        {intro ? <script dangerouslySetInnerHTML={{ __html: introScript(introLogo.src) }} /> : null}
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body id="top">
        {/* First in the document so it is in place before anything else can paint. */}
        {intro ? <Intro logoSrc={introLogo.src} /> : null}

        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Header />

        <main id="main" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />

        {draft ? <PreviewTools /> : null}
        <Motion />
        <JsonLd data={[organizationJsonLd(settings), websiteJsonLd(settings)]} />
      </body>
    </html>
  )
}
