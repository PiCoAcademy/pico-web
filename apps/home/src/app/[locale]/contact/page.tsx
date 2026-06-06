import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Container, PageHero } from '@pico/ui'
import { ContactForm } from '@/components/ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  return { title: t('title') }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />

      <section className="pb-24">
        <Container width="narrow">
          <ContactForm locale={locale} />
        </Container>
      </section>
    </>
  )
}
