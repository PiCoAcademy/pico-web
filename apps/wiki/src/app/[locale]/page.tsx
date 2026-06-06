import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container, Card, Badge } from '@pico/ui'
import { BookOpen, Cpu, Code, Blocks, HelpCircle, FileCode } from 'lucide-react'

const SECTION_ICONS = {
  'getting-started': BookOpen,
  hardware: Cpu,
  software: Code,
  picoblocks: Blocks,
  faq: HelpCircle,
  api: FileCode,
}

const SECTIONS = ['getting-started', 'hardware', 'software', 'picoblocks', 'faq', 'api'] as const

export default function WikiHome() {
  return <WikiHomePage />
}

function WikiHomePage() {
  const t = useTranslations('home')

  return (
    <section className="py-20">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-hero font-black leading-none tracking-[-0.04em] text-text-primary">
            {t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-text-muted-2">{t('sub')}</p>

          {/* Search box (static — Algolia InstantSearch on /search page) */}
          <Link
            href="./search"
            className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-btn border border-[var(--border)] bg-bg-card px-4 py-3 text-sm text-text-muted transition-colors hover:border-[var(--accent-bd)] hover:bg-bg-card-2"
          >
            <span className="text-[var(--accent)]">⌕</span>
            {t('search')}
            <kbd className="ml-auto rounded bg-bg-card-2 px-2 py-0.5 font-mono text-xs text-text-muted">⌘K</kbd>
          </Link>
        </div>

        {/* Section cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => {
            const Icon = SECTION_ICONS[section]
            return (
              <Link key={section} href={`./${section}`}>
                <Card variant="interactive" className="h-full flex flex-col gap-3">
                  <Icon size={24} strokeWidth={1.75} className="text-[var(--accent)]" />
                  <h2 className="font-display text-h3 font-bold text-text-primary">
                    {t(`sections.${section}.title`)}
                  </h2>
                  <p className="text-sm text-text-muted">{t(`sections.${section}.desc`)}</p>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Products quick links */}
        <div className="mt-16">
          <h2 className="font-display text-h2 font-bold text-text-primary">Par produit</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {['PiCoLAB', 'PiCoBOT', 'PiCoNano', 'UnoCore', 'PiCoBlocks'].map((p) => (
              <Badge key={p} variant="neutral" className="cursor-pointer hover:border-[var(--accent-bd)]">
                <Link href={`./hardware/${p.toLowerCase()}`}>{p}</Link>
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
