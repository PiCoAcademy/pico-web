import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { Container, Breadcrumb } from '@pico/ui'
import { sanityClient, WIKI_ARTICLE_QUERY } from '@/lib/sanity'
import { CalendarDays, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react'

export const revalidate = 3600

type Article = {
  _id: string; title: string; section: string; lastReviewed?: string
  slug: string; body?: unknown[]; toc?: Array<{ anchor: string; title: string }>
}

const SECTION_LABELS: Record<string, string> = {
  'getting-started': 'Démarrage rapide',
  hardware: 'Matériel',
  software: 'Logiciel',
  picoblocks: 'PiCoBlocks',
  faq: 'FAQ',
  api: 'Référence API',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article: Article | null = await sanityClient.fetch(WIKI_ARTICLE_QUERY, { slug }).catch(() => null)
  if (!article) return {}
  return { title: article.title }
}

export default async function WikiArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string; locale: string }>
}) {
  const { section, slug, locale } = await params
  const article: Article | null = await sanityClient.fetch(WIKI_ARTICLE_QUERY, { slug }).catch(() => null)

  // Show a placeholder when article isn't in Sanity yet
  const sectionLabel = SECTION_LABELS[section] ?? section

  return (
    <div className="py-12">
      <Container>
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          {/* Main content */}
          <article>
            <Breadcrumb items={[
              { label: 'Docs', href: `/${locale}` },
              { label: sectionLabel, href: `/${locale}/${section}` },
              { label: article?.title ?? slug },
            ]} />

            <h1 className="mt-6 font-display text-h1 font-black leading-tight tracking-[-0.04em] text-text-primary">
              {article?.title ?? slug}
            </h1>

            {article?.lastReviewed && (
              <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                <CalendarDays size={12} strokeWidth={1.75} />
                Mis à jour le {new Date(article.lastReviewed).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            )}

            <div className="prose-wiki mt-8">
              {article?.body ? (
                <PortableText value={article.body as Parameters<typeof PortableText>[0]['value']} />
              ) : (
                <div className="rounded-card border border-amber-500/20 bg-amber-500/10 p-6 text-amber-400 text-sm">
                  Cet article n&apos;a pas encore été publié dans Sanity. Connectez-vous à Sanity Studio pour ajouter le contenu.
                </div>
              )}
            </div>

            {/* Feedback */}
            <div className="mt-12 flex items-center gap-4 border-t border-[var(--border)] pt-8 text-sm text-text-muted">
              <span>Cette page vous a été utile ?</span>
              <button className="flex items-center gap-1.5 rounded px-2 py-1 hover:text-text-primary transition-colors">
                <ThumbsUp size={14} strokeWidth={1.75} /> Oui
              </button>
              <button className="flex items-center gap-1.5 rounded px-2 py-1 hover:text-text-primary transition-colors">
                <ThumbsDown size={14} strokeWidth={1.75} /> Non
              </button>
              <a
                href={`https://github.com/PiCoAcademy/pico-web/edit/main/sanity/content/wiki/${slug}.md`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-1.5 hover:text-text-primary transition-colors"
              >
                <ExternalLink size={12} strokeWidth={1.75} /> Modifier sur GitHub
              </a>
            </div>
          </article>

          {/* TOC sidebar */}
          {article?.toc && article.toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Sur cette page</p>
                <nav className="space-y-1">
                  {article.toc.map((item) => (
                    <a
                      key={item.anchor}
                      href={`#${item.anchor}`}
                      className="block text-sm text-text-muted transition-colors hover:text-text-primary"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </div>
  )
}
