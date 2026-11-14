/** Icon choices for a service. The SVGs live in `src/components/ServiceIcon.tsx`. */
export const SERVICE_ICON_OPTIONS = [
  { label: 'Spark (branding)', value: 'spark' },
  { label: 'Megaphone (social media)', value: 'megaphone' },
  { label: 'Play (content & video)', value: 'play' },
  { label: 'Target (advertising)', value: 'target' },
  { label: 'Magnifier (search / SEO)', value: 'search' },
  { label: 'Code (web)', value: 'code' },
  { label: 'Chart (analytics)', value: 'chart' },
  { label: 'Layers (strategy)', value: 'layers' },
] as const

export type ServiceIconName = (typeof SERVICE_ICON_OPTIONS)[number]['value']
