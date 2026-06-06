import { useTranslations } from 'next-intl'
import { Container } from '@pico/ui'
import { RfqForm } from '@/components/RfqForm'

export default function RfqPage() {
  const t = useTranslations('rfq')

  return (
    <section className="py-20">
      <Container width="narrow">
        <div className="mb-10">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {t('title')}
          </p>
          <h1 className="mt-2 font-display text-h1 font-black leading-tight tracking-[-0.04em] text-text-primary">
            {t('title')}
          </h1>
          <p className="mt-4 text-body-lg text-text-muted-2">{t('sub')}</p>
        </div>
        <RfqForm />
      </Container>
    </section>
  )
}
