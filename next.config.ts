import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Same-origin framing is required for the admin's Live Preview.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Required on Windows until Turbopack resolves Payload's Sass imports on its own.
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    localPatterns: [
      { pathname: '/api/media/file/**' }, // local uploads (development fallback)
      { pathname: '/brand/**' },
      { pathname: '/_next/static/media/**' },
    ],
    remotePatterns: [
      // Vercel Blob (production media storage)
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },

  // Files the sharing-card route reads from disk at request time (fonts + logo).
  outputFileTracingIncludes: {
    '/og': ['./src/assets/fonts/*.woff', './public/brand/logo.png'],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
