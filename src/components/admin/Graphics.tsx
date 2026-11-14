import React from 'react'

/**
 * Admin branding. The logo artwork is used exactly as supplied; because its wordmark
 * is dark, it always sits on a light plate so it stays legible in the admin's dark theme.
 */

/* eslint-disable @next/next/no-img-element */

export const Logo: React.FC = () => (
  <span
    style={{
      background: '#FAF6EF',
      borderRadius: 24,
      display: 'inline-flex',
      padding: '22px 30px',
    }}
  >
    <img
      alt="EFC Media — Your Growth Partner"
      height={170}
      src="/brand/logo.png"
      style={{ display: 'block', height: 170, width: 'auto' }}
      width={160}
    />
  </span>
)

export const Icon: React.FC = () => (
  <span
    style={{
      alignItems: 'center',
      background: '#FAF6EF',
      borderRadius: 8,
      display: 'inline-flex',
      height: 32,
      justifyContent: 'center',
      width: 32,
    }}
  >
    <img
      alt=""
      height={18}
      src="/brand/mark.png"
      style={{ display: 'block', height: 18, width: 'auto' }}
      width={22}
    />
  </span>
)
