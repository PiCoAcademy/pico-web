import { useTranslations } from 'next-intl'
import { Container, PageHero, ArticleCard } from '@pico/ui'
import { sanityClient, BLOG_POSTS_QUERY } from '@/lib/sanity'

export const revalidate = 3600

type BlogPost = {
  _id: string
  slug: { current: string }
  title: string
  excerpt?: string
  coverUrl?: string
  tags?: string[]
  publishedAt?: string
}

export default async function BlogPage() {
  const posts: BlogPost[] = await sanityClient.fetch(BLOG_POSTS_QUERY).catch(() => [])

  return <Blog posts={posts} />
}

function Blog({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('blog')

  return (
    <section className="py-20">
      <Container>
        <PageHero
          eyebrow="Blog"
          title={t('title')}
          description={t('sub')}
        />

        {posts.length === 0 ? (
          <p className="mt-10 text-text-muted">{t('empty')}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post._id}
                slug={post.slug.current}
                title={post.title}
                excerpt={post.excerpt}
                coverUrl={post.coverUrl}
                tags={post.tags}
                publishedAt={post.publishedAt}
                site="industrial"
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
