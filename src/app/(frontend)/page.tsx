import { CmsPage, cmsPageMetadata } from '@/components/CmsPage'

/** Home page — the Pages document with the slug "home". */
export default function HomePage() {
  return <CmsPage slug="home" />
}

export const generateMetadata = () => cmsPageMetadata('home')
