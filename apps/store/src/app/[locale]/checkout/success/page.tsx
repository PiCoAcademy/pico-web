import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@pico/ui'

export default function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ order?: string }>
}) {
  return <SuccessContent params={params} searchParams={searchParams} />
}

async function SuccessContent({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ order?: string }>
}) {
  const { locale } = await params
  const { order } = await searchParams
  return <SuccessUI locale={locale} order={order} />
}

function SuccessUI({ locale, order }: { locale: string; order?: string }) {
  const t = useTranslations()

  return (
    <section className="py-28">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div className="flex justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent-bg)] text-5xl">
              ✅
            </span>
          </div>
          <h1 className="mt-6 font-display text-h1 font-bold text-text-primary">{t('success.title')}</h1>
          <p className="mt-4 text-text-muted">{t('success.sub')}</p>
          {order && (
            <p className="mt-3 text-sm text-text-muted">
              {t('success.orderNumber')}: <span className="font-mono font-bold text-text-primary">#{order}</span>
            </p>
          )}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href={`/${locale}/products`}
              className="rounded-btn bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              {t('success.continueShopping')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
