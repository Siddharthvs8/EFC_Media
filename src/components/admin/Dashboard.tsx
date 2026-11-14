import type { Payload } from 'payload'

import React from 'react'

type Props = {
  payload: Payload
  user?: { name?: string | null; role?: string | null } | null
}

type Shortcut = { description: string; href: string; label: string }

const SHORTCUTS: Shortcut[] = [
  { label: 'Edit pages', href: '/admin/collections/pages', description: 'Home, About, Services, Work, Insights, Contact' },
  { label: 'Navigation', href: '/admin/globals/header', description: 'Header links and button' },
  { label: 'Services', href: '/admin/collections/services', description: 'Add or reorder services' },
  { label: 'Case studies', href: '/admin/collections/case-studies', description: 'Publish client work' },
  { label: 'Insights', href: '/admin/collections/posts', description: 'Write and schedule articles' },
  { label: 'Enquiries', href: '/admin/collections/form-submissions', description: 'Messages from the site' },
  { label: 'Media', href: '/admin/collections/media', description: 'Images and video' },
  { label: 'Site settings', href: '/admin/globals/settings', description: 'Logo, contact, SEO, launch' },
]

/** Welcome panel shown above the collections on the admin dashboard. */
export const BeforeDashboard = async ({ payload, user }: Props) => {
  let placeholderCount = 0
  let newEnquiries = 0
  let allowIndexing = false
  let hidePlaceholders = false

  try {
    const [settings, caseStudies, testimonials, team, enquiries] = await Promise.all([
      payload.findGlobal({ slug: 'settings', depth: 0 }),
      payload.count({ collection: 'case-studies', where: { placeholder: { equals: true } } }),
      payload.count({ collection: 'testimonials', where: { placeholder: { equals: true } } }),
      payload.count({ collection: 'team', where: { placeholder: { equals: true } } }),
      payload.count({ collection: 'form-submissions', where: { status: { equals: 'new' } } }),
    ])

    placeholderCount = caseStudies.totalDocs + testimonials.totalDocs + team.totalDocs
    newEnquiries = enquiries.totalDocs
    allowIndexing = Boolean(settings?.launch?.allowIndexing)
    hidePlaceholders = Boolean(settings?.launch?.hidePlaceholders)
  } catch {
    // The dashboard still renders if a count fails (e.g. before the first migration).
  }

  const isAuthor = user?.role === 'author'
  const firstName = user?.name?.split(' ')[0]

  return (
    <section className="efc-dash" aria-label="Getting started">
      <header className="efc-dash__header">
        <p className="efc-dash__eyebrow">EFC Media · Your Growth Partner.</p>
        <h2 className="efc-dash__title">{firstName ? `Welcome back, ${firstName}.` : 'Welcome.'}</h2>
        <p className="efc-dash__lead">
          Everything on the website is edited here. Publish a change and the live site updates
          within moments — no code and no redeploy.
        </p>
      </header>

      {!isAuthor && (
        <ul className="efc-dash__grid">
          {SHORTCUTS.map((shortcut) => (
            <li key={shortcut.href}>
              <a className="efc-dash__card" href={shortcut.href}>
                <span className="efc-dash__card-label">
                  {shortcut.label}
                  {shortcut.label === 'Enquiries' && newEnquiries > 0 ? (
                    <span className="efc-dash__badge">{newEnquiries} new</span>
                  ) : null}
                </span>
                <span className="efc-dash__card-text">{shortcut.description}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {!isAuthor && (
        <div className="efc-dash__checklist">
          <h3>Launch checklist</h3>
          <ul>
            <li data-done={placeholderCount === 0 || hidePlaceholders}>
              {placeholderCount === 0
                ? 'No placeholder case studies, testimonials or team members remain.'
                : `${placeholderCount} placeholder item${placeholderCount === 1 ? '' : 's'} (case studies, testimonials, team) ${
                    hidePlaceholders ? 'are hidden from the public site.' : 'are visible on the site, clearly labelled.'
                  } Replace them with real, approved content.`}
            </li>
            <li data-done={allowIndexing}>
              {allowIndexing
                ? 'Search engines are allowed to index the site.'
                : 'Search engines are blocked while the site is in review. Turn on indexing in Site settings → Launch when you go live.'}
            </li>
          </ul>
        </div>
      )}
    </section>
  )
}
