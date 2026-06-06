import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container, PageHero, Card } from '@pico/ui'

const PATHS = [
  {
    key: 'maker',
    icon: '⚡',
    title: 'Parcours Maker',
    desc: 'De zéro à projets complexes avec Arduino et Raspberry Pi.',
    courses: ['Arduino pour Débutants', 'Python pour l\'Électronique', 'ESP32 WiFi & Bluetooth'],
    duration: '24h',
    level: 'Débutant → Intermédiaire',
  },
  {
    key: 'iot',
    icon: '📡',
    title: 'Parcours IoT',
    desc: 'Maîtrisez l\'internet des objets de bout en bout.',
    courses: ['ESP32 WiFi & Bluetooth', 'IoT avec Raspberry Pi', 'IA Embarquée'],
    duration: '37h',
    level: 'Intermédiaire → Avancé',
  },
  {
    key: 'hardware',
    icon: '🔌',
    title: 'Parcours Hardware Designer',
    desc: 'Concevez et fabriquez vos propres cartes électroniques.',
    courses: ['Arduino pour Débutants', 'Conception PCB avec KiCad'],
    duration: '17h',
    level: 'Débutant → Intermédiaire',
  },
]

export default function PathsPage() {
  return <Paths />
}

function Paths() {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <PageHero
          eyebrow={t('paths.title')}
          title={t('paths.title')}
          description={t('paths.sub')}
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {PATHS.map((path) => (
            <Card key={path.key} variant="accent" className="flex flex-col">
              <span className="text-3xl">{path.icon}</span>
              <h2 className="mt-4 font-display text-h2 font-bold text-text-primary">{path.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{path.desc}</p>
              <div className="mt-4 flex flex-col gap-1">
                {path.courses.map((c) => (
                  <span key={c} className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-text-muted">
                <span>⏱ {path.duration}</span>
                <span>{path.level}</span>
              </div>
              <Link
                href="../courses"
                className="mt-5 block w-full rounded-btn bg-[var(--accent)] py-2.5 text-center text-sm font-bold text-white hover:opacity-90"
              >
                Commencer →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
