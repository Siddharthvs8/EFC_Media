/**
 * Single cache tag shared by every CMS query the public site makes.
 *
 * The site is small and heavily cross-linked (navigation, services on the home page,
 * related work on service pages…), so one tag keeps publishing simple and impossible
 * to get subtly wrong: any published change expires all cached content, and each page
 * re-renders once on its next visit.
 */
export const CONTENT_TAG = 'content'
