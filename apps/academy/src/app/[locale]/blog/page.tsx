import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container, PageHero, Badge } from '@pico/ui'

const ARTICLES = [
  { slug: 'arduino-vs-raspberry', title: 'Arduino vs Raspberry Pi — Lequel choisir ?', excerpt: 'Guide complet pour choisir la plateforme adaptée à votre projet.', tag: 'Guide', date: '2024-11-10', readMin: 8 },
  { slug: 'debuter-esp32', title: 'Débuter avec l\'ESP32 en 2024', excerpt: 'Tout ce qu\'il faut savoir pour commencer avec ce microcontrôleur puissant.', tag: 'Tutoriel', date: '2024-11-25', readMin: 12 },
  { slug: 'ia-microcontroleur', title: 'Déployer de l\'IA sur microcontrôleur', excerpt: 'TensorFlow Lite sur ESP32 : de la théorie à la pratique.', tag: 'Avancé', date: '2024-12-05', readMin: 15 },
  { slug: 'pcb-prototypage-maroc', title: 'Prototyper un PCB au Maroc', excerpt: 'Services de prototypage disponibles et bonnes pratiques avec KiCad.', tag: 'Hardware', date: '2024-12-18', readMin: 10 },
]

export default function BlogPage() {
  return <Blog />
}

function Blog() {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <PageHero
          eyebrow={t('blog.title')}
          title={t('blog.title')}
          description={t('blog.sub')}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`./blog/${article.slug}`}
              className="group rounded-card border border-[var(--border)] bg-bg-card p-6 transition-colors hover:border-[var(--accent)]"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="accent" size="xs">{article.tag}</Badge>
                <span className="text-xs text-text-muted">{article.readMin} min de lecture</span>
              </div>
              <h2 className="mt-3 font-display text-lg font-bold text-text-primary leading-snug group-hover:text-[var(--accent)] transition-colors">
                {article.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-text-muted">{article.excerpt}</p>
              <p className="mt-4 text-xs text-text-muted">{article.date}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
