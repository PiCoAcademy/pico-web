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

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound()
  }

  const messages = await getMessages()
  const isFr = locale === 'fr'

  const navLinks = [
    { label: isFr ? 'Solutions' : 'Solutions', href: `/${locale}/solutions` },
    { label: isFr ? 'Projets'  : 'Projects',   href: `/${locale}/projects` },
    { label: isFr ? 'Produits' : 'Products',   href: `/${locale}/products` },
    { label: 'Blog',                             href: `/${locale}/blog` },
  ]

  return (
    <NextIntlClientProvider messages={messages}>
      <Nav
        brand="Industrial"
        links={navLinks}
        cta={{ label: isFr ? 'Demande de devis' : 'Request a Quote', href: `/${locale}/rfq` }}
      />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
