import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Nav, Footer } from '@pico/ui'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'fr' | 'en')) notFound()

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Nav
        brand="Wiki"
        links={[
          { label: locale === 'fr' ? 'Démarrage' : 'Getting Started', href: `/${locale}/getting-started` },
          { label: locale === 'fr' ? 'Matériel' : 'Hardware', href: `/${locale}/hardware` },
          { label: locale === 'fr' ? 'Logiciel' : 'Software', href: `/${locale}/software` },
          { label: 'PiCoBlocks', href: `/${locale}/picoblocks` },
        ]}
        cta={{ label: locale === 'fr' ? 'Rechercher' : 'Search', href: `/${locale}/search` }}
      />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
