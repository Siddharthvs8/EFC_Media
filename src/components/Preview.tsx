'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useSyncExternalStore } from 'react'

const subscribeNever = () => () => undefined

/**
 * Rendered only in draft mode. Keeps the admin's Live Preview in sync (the page
 * re-renders with the latest draft whenever the editor autosaves) and shows a small
 * "Preview mode" bar with a way out when the page is opened in its own tab.
 */
export const PreviewTools: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  // Browser-only facts, read after hydration (null / true on the server).
  const origin = useSyncExternalStore<null | string>(
    subscribeNever,
    () => window.location.origin,
    () => null,
  )
  const framed = useSyncExternalStore(
    subscribeNever,
    () => window.self !== window.top,
    () => true,
  )

  return (
    <>
      {origin ? <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={origin} /> : null}

      {!framed ? (
        <div className="preview-bar" role="status">
          <span>Preview mode — showing unpublished changes</span>
          <a
            className="btn btn--primary btn--sm"
            href={`/next/exit-preview?path=${encodeURIComponent(pathname)}`}
            style={{ minHeight: '2.25rem' }}
          >
            Exit preview
          </a>
        </div>
      ) : null}
    </>
  )
}
