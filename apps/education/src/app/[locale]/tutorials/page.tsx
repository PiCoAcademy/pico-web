import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container, PageHero, Card, Badge } from '@pico/ui'

const TUTORIALS = [
  { slug: 'demarrer-picolab',    product: 'PiCoLAB',  level: 'Débutant',     title: 'Démarrer avec PiCoLAB',        duration: '30 min' },
  { slug: 'premiers-pas-led',    product: 'UnoCore',   level: 'Débutant',     title: 'Premiers pas : clignoter une LED', duration: '20 min' },
  { slug: 'picobot-avancer',     product: 'PiCoBOT',  level: 'Débutant',     title: 'Faire avancer PiCoBOT',        duration: '45 min' },
  { slug: 'capteur-distance',    product: 'PiCoLAB',  level: 'Intermédiaire', title: 'Capteur à ultrasons HC-SR04',  duration: '40 min' },
  { slug: 'servo-moteur',        product: 'PiCoLAB',  level: 'Intermédiaire', title: 'Contrôler un servomoteur',     duration: '35 min' },
  { slug: 'lcd-i2c',             product: 'UnoCore',   level: 'Intermédiaire', title: 'Afficher du texte sur écran LCD I²C', duration: '50 min' },
  { slug: 'wifi-esp32',          product: 'PiCoNano', level: 'Avancé',       title: 'Connecter au Wi-Fi avec ESP32', duration: '60 min' },
  { slug: 'bluetooth-robot',     product: 'PiCoBOT',  level: 'Avancé',       title: 'Contrôler PiCoBOT en Bluetooth', duration: '75 min' },
]

const LEVEL_VARIANT = {
  'Débutant':     'success',
  'Intermédiaire': 'warning',
  'Avancé':       'error',
} as const

export default function TutorialsPage() {
  const t = useTranslations('tutorials')

  return (
    <section className="py-20">
      <Container>
        <PageHero eyebrow="Tutoriels" title={t('title')} description={t('sub')} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TUTORIALS.map((tut) => (
            <Link key={tut.slug} href={`/fr/tutorials/${tut.slug}`}>
              <Card variant="interactive" className="h-full flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" size="xs">{tut.product}</Badge>
                  <Badge variant={LEVEL_VARIANT[tut.level as keyof typeof LEVEL_VARIANT] ?? 'neutral'} size="xs">
                    {tut.level}
                  </Badge>
                </div>
                <h3 className="font-display text-h3 font-bold leading-snug text-text-primary">{tut.title}</h3>
                <p className="mt-auto text-xs text-text-muted">{tut.duration}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
