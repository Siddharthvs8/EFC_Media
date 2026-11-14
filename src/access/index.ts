import type { Access, FieldAccess, PayloadRequest } from 'payload'

/**
 * Role model
 * ----------
 * admin   – everything, including users, forms and site settings.
 * editor  – all content, media, navigation and site settings; can publish.
 * author  – writes Insights articles as drafts and uploads media; cannot publish.
 */
export type Role = 'admin' | 'editor' | 'author'

export const ROLE_OPTIONS: { label: string; value: Role }[] = [
  { label: 'Admin — full access', value: 'admin' },
  { label: 'Editor — manage and publish content', value: 'editor' },
  { label: 'Author — draft Insights articles', value: 'author' },
]

type MaybeUser = PayloadRequest['user']

export const roleOf = (user: MaybeUser): Role | null => {
  const role = (user as { role?: Role } | null | undefined)?.role
  return role ?? null
}

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean => {
  const role = roleOf(user)
  return Boolean(role && roles.includes(role))
}

/* Collection / global access ------------------------------------------------ */

export const anyone: Access = () => true

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const isAdminOrEditor: Access = ({ req: { user } }) => hasRole(user, 'admin', 'editor')

/** Anyone can read published documents; signed-in users also see drafts. */
export const publishedOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

/* Field access -------------------------------------------------------------- */

export const adminOnlyField: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

/* Admin UI helpers ---------------------------------------------------------- */

/** Hide a collection from the admin navigation for authors (access rules still apply). */
export const hiddenFromAuthors = ({ user }: { user: unknown }): boolean =>
  (user as { role?: Role } | null)?.role === 'author'

/** Only show a collection in the admin navigation to admins. */
export const hiddenUnlessAdmin = ({ user }: { user: unknown }): boolean =>
  (user as { role?: Role } | null)?.role !== 'admin'
