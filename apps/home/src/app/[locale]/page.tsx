import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, Cpu, GraduationCap, BookOpen, ShoppingCart, FileText } from 'lucide-react'
import { Container, Badge, Button, StatCard } from '@pico/ui'

// ─── Unit card data ──────────────────────────────────────────────────────────

const units = [
  {
    key:    'education' as const,
    href:   'https://education.pico.ma',
    accent: '#2563EB',
    bg:     'rgba(37,99,235,0.08)',
    bd:     'rgba(37,99,235,0.20)',
    Icon:   GraduationCap,
  },
  {
    key:    'industrial' as const,
    href:   'https://industrial.pico.ma',
    accent: '#F97316',
    bg:     'rgba(249,115,22,0.08)',
    bd:     'rgba(249,115,22,0.20)',
    Icon:   Cpu,
  },
  {
    key:    'academy' as const,
    href:   'https://academy.pico.ma',
    accent: '#7C3AED',
    bg:     'rgba(124,58,237,0.08)',
    bd:     'rgba(124,58,237,0.20)',
    Icon:   BookOpen,
  },
  {
    key:    'store' as const,
    href:   'https://store.pico.ma',
    accent: '#10B981',
    bg:     'rgba(16,185,129,0.08)',
    bd:     'rgba(16,185,129,0.20)',
    Icon:   ShoppingCart,
  },
  {
    key:    'wiki' as const,
    href:   'https://wiki.pico.ma',
    accent: '#CFA97B',
    bg:     'rgba(207,169,123,0.08)',
    bd:     'rgba(207,169,123,0.20)',
    Icon:   FileText,
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations()

  return (
    <>
      {/* ── HERO ── */}
      <section className="pb-20 pt-28 md:pb-28 md:pt-36">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="accent" size="sm" className="mb-6">
              {t('hero.eyebrow')}
            </Badge>
            <h1 className="font-display text-hero font-black leading-none tracking-[-0.04em] text-text-primary">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg leading-relaxed text-text-muted-2">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="https://industrial.pico.ma/rfq">
                  {t('hero.ctaPrimary')}
                  <ArrowRight size={16} strokeWidth={2} className="ml-2" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="https://education.pico.ma">
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-[var(--border)] bg-bg-card py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCard value={7}   suffix="+"  label={t('stats.years')}    />
            <StatCard value={50}  suffix="+"  label={t('stats.clients')}  />
            <StatCard value={100} suffix="+"  label={t('stats.projects')} />
            <StatCard value={2000} suffix="+" label={t('stats.students')} />
          </div>
        </Container>
      </section>

      {/* ── UNIT CARDS ── */}
      <section className="py-24">
        <Container>
          <h2 className="mb-3 font-display text-h1 font-black tracking-tight text-text-primary">
            {t('units.title')}
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {units.map(({ key, href, accent, bg, bd, Icon }) => (
              <Link
                key={key}
                href={href}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-card border border-[var(--border)] bg-bg-card p-6 transition-all duration-[0.25s] ease-out hover:-translate-y-1 hover:border-[var(--border-strong)]"
              >
                {/* Accent top border */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-card opacity-0 transition-opacity duration-[0.25s] group-hover:opacity-100"
                  style={{ background: accent }}
                />
                {/* Icon */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-btn"
                  style={{ background: bg, border: `1px solid ${bd}` }}
                >
                  <Icon size={20} strokeWidth={1.75} style={{ color: accent }} />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-h3 font-bold tracking-tight text-text-primary">
                    {t(`units.${key}.name`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {t(`units.${key}.description`)}
                  </p>
                </div>
                {/* CTA */}
                <div
                  className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-[0.18s]"
                  style={{ color: accent }}
                >
                  {t(`units.${key}.cta`)}
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    className="transition-transform duration-[0.18s] group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-24">
        <Container>
          <div className="rounded-card border border-[var(--border)] bg-bg-card p-8 md:p-12">
            <Badge variant="accent" size="sm" className="mb-5">
              {t('contact.eyebrow')}
            </Badge>
            <h2 className="font-display text-h1 font-black tracking-tight text-text-primary">
              {t('contact.title')}
            </h2>
            <p className="mt-4 max-w-lg text-body-lg text-text-muted-2">
              {t('contact.description')}
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t('contact.cta')}
                  <ArrowRight size={16} strokeWidth={2} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
