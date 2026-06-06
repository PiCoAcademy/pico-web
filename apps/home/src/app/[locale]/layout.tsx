import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Nav } from '@pico/ui'
import { Footer } from '@pico/ui'

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

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  const navLinks = [
    { label: locale === 'fr' ? 'À propos' : 'About',   href: `/${locale}/about` },
    { label: 'Contact', href: `/${locale}/contact` },
  ]

  return (
    <NextIntlClientProvider messages={messages}>
      <Nav
        brand="Group"
        links={navLinks}
        cta={{ label: locale === 'fr' ? 'Devis' : 'Quote', href: 'https://industrial.pico.ma/rfq' }}
      />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
