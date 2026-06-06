import { useTranslations } from 'next-intl'
import Link from 'next/link'
import {
  Badge, Button, Card, Container, StatCard, CaseStudyCard,
} from '@pico/ui'
import { sanityClient, CASE_STUDIES_QUERY } from '@/lib/sanity'

// Revalidate every hour — case studies update in Sanity
export const revalidate = 3600

const SOLUTIONS = [
  { key: 'automation', icon: '⚙️' },
  { key: 'cnc',        icon: '🔩' },
  { key: 'energy',     icon: '⚡' },
  { key: 'iot',        icon: '📡' },
  { key: 'textile',    icon: '🧵' },
  { key: 'lpg',        icon: '🔥' },
] as const

type CaseStudy = {
  _id: string
  slug: { current: string }
  sector: string
  techStack: string[]
  title: string
  excerpt: string
}

export default async function IndustrialHome({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const caseStudies: CaseStudy[] = await sanityClient.fetch(CASE_STUDIES_QUERY).catch(() => [])
  const featured = caseStudies.slice(0, 3)

  return <IndustrialHomePage locale={locale} featured={featured} />
}

function IndustrialHomePage({ locale, featured }: { locale: string; featured: CaseStudy[] }) {
  const t = useTranslations()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-20 pt-24 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.12),transparent)]"
        />
        <Container>
          <Badge variant="accent" size="sm" className="mb-6">{t('hero.eyebrow')}</Badge>
          <h1 className="max-w-3xl font-display text-hero font-black leading-none tracking-[-0.04em] text-text-primary whitespace-pre-line">
            {t('hero.headline')}
          </h1>
          <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-text-muted-2">
            {t('hero.sub')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={`/${locale}/rfq`}>{t('hero.ctaPrimary')}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href={`/${locale}/projects`}>{t('hero.ctaSecondary')}</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-[var(--border)] bg-bg-card py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCard value={60}  suffix="+"  label={t('stats.projects')} />
            <StatCard value={35}  suffix="+"  label={t('stats.clients')} />
            <StatCard value={8}   suffix=""   label={t('stats.sectors')} />
            <StatCard value={99}  suffix="%"  label={t('stats.uptime')} />
          </div>
        </Container>
      </section>

      {/* ── Solutions ── */}
      <section className="py-20">
        <Container>
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-h1 font-black leading-tight tracking-tight text-text-primary">
              {t('solutions.title')}
            </h2>
            <p className="mt-4 text-body-lg text-text-muted-2">{t('solutions.sub')}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map(({ key, icon }) => (
              <Card key={key} variant="accent">
                <span className="text-2xl" role="img" aria-label={key}>{icon}</span>
                <h3 className="mt-3 font-display text-h3 font-bold text-text-primary">
                  {t(`solutions.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {t(`solutions.items.${key}.desc`)}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="secondary" asChild>
              <Link href={`/${locale}/solutions`}>{locale === 'fr' ? 'Toutes nos solutions' : 'All Solutions'}</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Featured projects ── */}
      <section className="bg-bg-card py-20">
        <Container>
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-h1 font-black leading-tight tracking-tight text-text-primary">
                {t('projects.title')}
              </h2>
              <p className="mt-4 text-body-lg text-text-muted-2">{t('projects.sub')}</p>
            </div>
            <Button variant="ghost" asChild className="flex-shrink-0">
              <Link href={`/${locale}/projects`}>{t('projects.cta')}</Link>
            </Button>
          </div>

          {featured.length === 0 ? (
            <p className="text-text-muted">{t('projects.empty')}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((cs) => (
                <CaseStudyCard
                  key={cs._id}
                  slug={cs.slug.current}
                  title={cs.title}
                  sector={cs.sector}
                  techStack={cs.techStack ?? []}
                  excerpt={cs.excerpt}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <Container>
          <Card variant="accent" className="relative overflow-hidden p-10 md:p-16 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]"
            />
            <h2 className="font-display text-h1 font-black leading-tight tracking-tight text-text-primary">
              {t('contact.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-text-muted-2">
              {t('contact.sub')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link href={`/${locale}/rfq`}>{t('contact.cta')}</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href={`/${locale}/blog`}>{locale === 'fr' ? 'Lire nos articles' : 'Read our articles'}</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </>
  )
}
