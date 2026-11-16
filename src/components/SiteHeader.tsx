'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import type { ResolvedLink } from '@/lib/links'

import { isExternal } from '@/lib/links'
import { cn, pad2 } from '@/lib/text'

import { Arrow } from './icons'

export type HeaderLogo = { height: number; src: string; width: number }

type Props = {
  cta: null | ResolvedLink
  /** The logo is the supplied symbol, so the logo intro can land on it. */
  introTarget?: boolean
  logo: HeaderLogo
  nav: ResolvedLink[]
  siteName: string
}

const isActive = (pathname: string, href: string): boolean =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

const NavAnchor: React.FC<{
  children: React.ReactNode
  className?: string
  current?: boolean
  link: ResolvedLink
  style?: React.CSSProperties
}> = ({ children, className, current, link, style }) => {
  const shared = {
    'aria-current': current ? ('page' as const) : undefined,
    className,
    style,
    ...(link.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}),
  }

  return isExternal(link.href) || !link.href.startsWith('/') ? (
    <a href={link.href} {...shared}>
      {children}
    </a>
  ) : (
    <Link href={link.href} {...shared}>
      {children}
    </Link>
  )
}

/* Browser state the header reacts to, read through useSyncExternalStore so the server
   render and hydration agree (both start "not scrolled, light page"). */

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

const isScrolled = () => window.scrollY > 12

/** Re-check the first section's theme whenever the page content changes (navigation, live preview). */
const subscribeToMain = (onChange: () => void) => {
  const main = document.getElementById('main')
  if (!main) return () => undefined

  const observer = new MutationObserver(onChange)
  observer.observe(main, {
    attributeFilter: ['data-theme'],
    attributes: true,
    childList: true,
    subtree: true,
  })

  return () => observer.disconnect()
}

const startsWithDarkSection = () =>
  document.querySelector('#main [data-theme]')?.getAttribute('data-theme') === 'dark'

const serverFalse = () => false

export const SiteHeader: React.FC<Props> = ({ cta, introTarget, logo, nav, siteName }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Solid, blurred bar once the page has scrolled.
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, serverFalse)

  // Over a dark first section the transparent header switches to light text.
  const overDark = useSyncExternalStore(subscribeToMain, startsWithDarkSection, serverFalse)

  // Close the menu whenever the route changes (including browser back/forward).
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  // Mobile menu: lock page scroll, keep focus inside, close on Escape.
  useEffect(() => {
    if (!open) return

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const focusable = (): HTMLElement[] => [
      ...(toggleRef.current ? [toggleRef.current] : []),
      ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []),
    ]

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusable()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      root.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const logoHeight = 40
  const logoWidth = Math.round((logo.width / logo.height) * logoHeight)
  const tone = open || scrolled ? 'light' : overDark ? 'dark' : 'light'

  return (
    <>
      <header className="site-header text-fg" data-scrolled={scrolled && !open} data-theme={tone}>
        <div className="wrap site-header__bar">
          <Link aria-label={`${siteName} — home`} className="site-header__logo flex shrink-0 items-center" href="/">
            <Image
              alt=""
              data-intro-target={introTarget ? '' : undefined}
              height={logoHeight}
              loading="eager"
              sizes={`${logoWidth}px`}
              src={logo.src}
              style={{ height: logoHeight, width: 'auto' }}
              width={logoWidth}
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <NavAnchor
                    className="nav-link link-underline"
                    current={isActive(pathname, link.href)}
                    link={link}
                  >
                    {link.label}
                  </NavAnchor>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {cta ? (
              <NavAnchor className="btn btn--primary btn--sm hidden sm:inline-flex" link={cta}>
                {cta.label}
                <Arrow />
              </NavAnchor>
            ) : null}

            <button
              aria-controls="mobile-menu"
              aria-expanded={open}
              className="menu-toggle lg:hidden"
              onClick={() => setOpen((value) => !value)}
              ref={toggleRef}
              type="button"
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden="true" className="menu-toggle__icon">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        aria-label="Menu"
        aria-modal="true"
        className="mobile-menu lg:hidden"
        data-state={open ? 'open' : 'closed'}
        data-theme="light"
        id="mobile-menu"
        inert={!open}
        ref={menuRef}
        role="dialog"
      >
        <nav aria-label="Mobile">
          <ul>
            {nav.map((link, index) => (
              <li key={`${link.href}-${link.label}`}>
                <NavAnchor
                  className="mobile-menu__link"
                  current={isActive(pathname, link.href)}
                  link={link}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <span className="index-num">{pad2(index + 1)}</span>
                  <span className={cn(isActive(pathname, link.href) && 'hl hl--band')}>{link.label}</span>
                </NavAnchor>
              </li>
            ))}
          </ul>
        </nav>

        {cta ? (
          <div className="mt-8">
            <NavAnchor className="btn btn--primary w-full" link={cta}>
              {cta.label}
              <Arrow />
            </NavAnchor>
          </div>
        ) : null}
      </div>
    </>
  )
}
