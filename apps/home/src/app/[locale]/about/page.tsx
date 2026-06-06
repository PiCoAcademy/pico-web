import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Target, BookOpen, MapPin } from 'lucide-react'
import { Container, PageHero } from '@pico/ui'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: t('title') }
}

const valueIcons = { precision: Target, pedagogy: BookOpen, local: MapPin }

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} />

      <section className="pb-24">
        <Container width="narrow">
          <div className="space-y-6 text-body-lg leading-relaxed text-text-muted-2">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>

          <h2 className="mb-10 mt-20 font-display text-h2 font-bold tracking-tight text-text-primary">
            {t('valuesTitle')}
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {(['precision', 'pedagogy', 'local'] as const).map((key) => {
              const Icon = valueIcons[key]
              return (
                <div
                  key={key}
                  className="rounded-card border border-[var(--border)] bg-bg-card p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-btn bg-[var(--accent-bg)] border border-[var(--accent-bd)]">
                    <Icon size={20} strokeWidth={1.75} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-display text-h3 font-bold tracking-tight text-text-primary">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {t(`values.${key}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
