import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Footer } from '@pico/ui'
import { AcademyNav } from '@/components/AcademyNav'

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
      <AcademyNav locale={locale} />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
