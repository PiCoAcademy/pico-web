import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Container, Breadcrumb, Badge, Card } from '@pico/ui'
import { sanityClient, BLOG_POST_QUERY, BLOG_POSTS_QUERY } from '@/lib/sanity'
import { ArrowLeft, CalendarDays, User } from 'lucide-react'

export const revalidate = 3600

type Post = {
  _id: string
  title: string
  excerpt?: string
  coverUrl?: string
  tags?: string[]
  publishedAt?: string
  body?: unknown[]
  author?: { name: string; role?: string; avatarUrl?: string }
  related?: Array<{ slug: { current: string }; title: string; excerpt?: string }>
}

export async function generateStaticParams() {
  const posts = await sanityClient.fetch<Array<{ slug: { current: string } }>>(BLOG_POSTS_QUERY).catch(() => [])
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post: Post | null = await sanityClient.fetch(BLOG_POST_QUERY, { slug }).catch(() => null)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.coverUrl ? [post.coverUrl] : [] },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const post: Post | null = await sanityClient.fetch(BLOG_POST_QUERY, { slug }).catch(() => null)
  if (!post) notFound()

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <article className="py-12">
      <Container width="narrow">
        <Breadcrumb
          items={[
            { label: 'Blog', href: `/${locale}/blog` },
            { label: post.title },
          ]}
        />

        {/* Cover */}
        {post.coverUrl && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-card">
            <Image src={post.coverUrl} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Meta */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="neutral" size="xs">{tag}</Badge>
          ))}
        </div>

        <h1 className="mt-4 font-display text-h1 font-black leading-tight tracking-[-0.04em] text-text-primary">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User size={14} strokeWidth={1.75} />
              {post.author.name}
              {post.author.role && ` — ${post.author.role}`}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} strokeWidth={1.75} />
              {date}
            </span>
          )}
        </div>

        {/* Body */}
        {post.body && (
          <div className="prose-industrial mt-10">
            <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} />
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 border-t border-[var(--border)] pt-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            {locale === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </div>

        {/* Related posts */}
        {post.related && post.related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-h2 font-bold text-text-primary">
              {locale === 'fr' ? 'Articles liés' : 'Related articles'}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {post.related.map((r) => (
                <Card key={r.slug.current} variant="interactive" padding="sm">
                  <Link href={`/${locale}/blog/${r.slug.current}`}>
                    <h3 className="font-body text-sm font-semibold text-text-primary">{r.title}</h3>
                    {r.excerpt && <p className="mt-1 text-xs text-text-muted">{r.excerpt}</p>}
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  )
}
