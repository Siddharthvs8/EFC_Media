import type { Access, CollectionConfig } from 'payload'

import { adminOnlyField, hasRole, isAdmin, ROLE_OPTIONS } from '@/access'

/** Admins manage everyone; other users can see and update only their own account. */
const selfOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, 'admin')) return true
  return { id: { equals: user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: {
    group: 'Admin',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
    description: 'People who can sign in to this dashboard. Roles control what each person can do.',
  },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8 hours
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minutes
    cookies: { sameSite: 'Lax' },
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: isAdmin,
    delete: isAdmin,
    read: selfOrAdmin,
    update: selfOrAdmin,
    unlock: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: ROLE_OPTIONS,
      saveToJWT: true,
      access: { create: adminOnlyField, update: adminOnlyField },
      admin: {
        description:
          'Admin: everything. Editor: all content, media, navigation and settings. Author: drafts Insights articles only.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      // The very first account (created on the "create first user" screen) is always an admin.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        return totalDocs === 0 ? { ...data, role: 'admin' } : data
      },
    ],
    beforeDelete: [
      // Never allow the last admin to be removed — that would lock everyone out.
      async ({ id, req }) => {
        const target = await req.payload.findByID({ collection: 'users', id, depth: 0, req })
        if (target?.role !== 'admin') return
        const { totalDocs } = await req.payload.count({
          collection: 'users',
          where: { role: { equals: 'admin' } },
          req,
        })
        if (totalDocs <= 1) {
          throw new Error('You cannot delete the only admin account. Make another user an admin first.')
        }
      },
    ],
  },
}
