'use client'

import React, { useEffect } from 'react'

/** Friendly fallback if a page fails to render. Offers a retry and a way home. */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="hero hero--page" data-theme="light" style={{ minHeight: '82svh' }}>
      <div className="wrap hero__inner justify-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display-lg mt-5 max-w-[16ch]">We couldn’t load this page.</h1>
        <p className="lead mt-6 max-w-xl">
          It’s us, not you. Please try again — and if it keeps happening, come back in a few minutes.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button className="btn btn--primary" onClick={() => reset()} type="button">
            Try again
          </button>
          {/* A full page load (not client navigation) so a broken client state is discarded. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="btn btn--secondary" href="/">
            Back to home
          </a>
        </div>
      </div>
    </section>
  )
}
