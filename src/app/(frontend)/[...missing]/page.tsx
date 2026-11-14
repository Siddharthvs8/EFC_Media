import { notFound } from 'next/navigation'

/**
 * Catch-all for URLs that match no other route (e.g. /a/b/c), so they get the site's
 * own "not found" page — with header, footer and a way home — instead of a bare 404.
 */
export default function Missing() {
  notFound()
}
