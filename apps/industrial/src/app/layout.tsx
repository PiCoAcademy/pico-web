import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const body    = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' })
const mono    = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: { default: 'PICO Industrial', template: '%s | PICO Industrial' },
  description: 'Solutions d\'automatisation industrielle sur mesure au Maroc — API, CNC, IoT, énergie.',
  metadataBase: new URL('https://industrial.pico.ma'),
  openGraph: {
    siteName: 'PICO Industrial',
    locale: 'fr_MA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-brand="industrial" suppressHydrationWarning>
      <body
        className={[
          display.variable,
          body.variable,
          mono.variable,
          'font-body bg-bg-base text-text-primary antialiased',
        ].join(' ')}
      >
        {children}
      </body>
    </html>
  )
}
