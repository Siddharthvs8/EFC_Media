import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
import React from 'react'

import { PostCardView } from '@/components/cards'
import { Breadcrumbs } from '@/components/DetailParts'
import { isPopulatedMedia, Media } from '@/components/Media'
import { RichHeading } from '@/components/RichHeading'
import { RichText } from '@/components/RichText'
import { JsonLd, Section } from '@/components/Section'
import { getPostBySlug, getPosts, getSettings, getSlugs } from '@/lib/data'
import { resolveLabels } from '@/lib/labels'
import { readingMinutes } from '@/lib/lexical'
import { documentPath } from '@/lib/preview'
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/text'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getSlugs('posts')
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: Args) {
  const { slug } = await params
  const post = await getPostBySlug(decodeURIComponent(slug))
  if (!post) notFound()

  const [settings, more] = await Promise.all([getSettings(), getPosts({ excludeId: post.id, limit: 3 })])
  const labels = resolveLabels(settings.labels)
  const path = documentPath('posts', post.slug)

  const categories = (post.categories ?? []).filter(
    (category): category is Exclude<typeof category, number> => typeof category === 'object' && category !== null,
  )
  const author = typeof post.author === 'object' && post.author !== null ? post.author : null
  const authorName = author?.name ?? labels.articleTeam
  const minutes = readingMinutes(post.content)
  const cover = isPopulatedMedia(post.coverImage) ? post.coverImage : null

  return (
    <article>
      <header className="hero hero--page" data-theme="light">
        <div className="wrap hero__inner">
          <Breadcrumbs
            items={[
              { href: '/insights', label: labels.insightsAll },
              ...(categories[0] ? [{ label: categories[0].title }] : []),
            ]}
          />

          <RichHeading
            as="h1"
            className="display-lg hero__title !max-w-[20ch]"
            motion="lines"
            text={post.title}
          />

          <p className="lead rise-in mt-[clamp(1.5rem,3vw,2.5rem)] max-w-[42rem]" style={{ '--d': 120 } as React.CSSProperties}>
            {post.excerpt}
          </p>

          <p
            className="index-num fade-up mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 uppercase"
            style={{ '--d': 520 } as React.CSSProperties}
          >
            <span>
              {labels.articleBy} <span className="text-fg">{authorName}</span>
            </span>
            {post.publishedAt ? (
              <>
                <span aria-hidden="true">/</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </>
            ) : null}
            <span aria-hidden="true">/</span>
            <span>
              {minutes} {labels.articleReadingTime}
            </span>
          </p>
        </div>
      </header>

      {cover ? (
        <div className="wrap">
          <div className="card-media rise-in aspect-[3/2] md:aspect-[21/9]">
            <Media eager fill resource={cover} sizes="(min-width: 90rem) 86rem, 100vw" />
          </div>
        </div>
      ) : null}

      <Section theme="light">
        <div className="wrap">
          <RichText className="mx-auto max-w-[44rem]" data={post.content} lead />
        </div>
      </Section>

      {more.length ? (
        <Section theme="tint">
          <div className="wrap">
            <h2 className="display-md mb-10" data-reveal>
              {labels.articleMore}
            </h2>
            <div className="grid gap-x-[clamp(1.5rem,2.5vw,2.5rem)] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item, index) => (
                <PostCardView index={index} item={item} key={item.id} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      <JsonLd
        data={[
          articleJsonLd({
            authorName: author?.name,
            dateModified: post.updatedAt,
            datePublished: post.publishedAt,
            description: post.excerpt,
            headline: post.title,
            image: cover ? (cover.sizes?.og?.url ?? cover.url) : null,
            path,
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: labels.insightsAll, path: '/insights' },
            { name: post.title, path },
          ]),
        ]}
      />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const [post, settings] = await Promise.all([getPostBySlug(decodeURIComponent(slug)), getSettings()])
  if (!post) return {}

  return buildMetadata({
    description: post.excerpt,
    eyebrow: 'Insights',
    meta: post.meta,
    path: documentPath('posts', post.slug),
    publishedTime: post.publishedAt,
    settings,
    title: post.title,
    type: 'article',
  })
}
