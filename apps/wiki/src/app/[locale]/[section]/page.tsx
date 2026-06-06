import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, PageHero, Card, Breadcrumb } from '@pico/ui'
import { sanityClient, WIKI_SECTION_QUERY } from '@/lib/sanity'
import { ArrowRight } from 'lucide-react'

export const revalidate = 3600

const VALID_SECTIONS = ['getting-started', 'hardware', 'software', 'picoblocks', 'faq', 'api']

// Static fallback articles per section
const STATIC_ARTICLES: Record<string, Array<{ slug: string; title: string; excerpt: string }>> = {
  'getting-started': [
    { slug: 'demarrer-picolab', title: 'Démarrer avec PiCoLAB', excerpt: 'Unboxing, installation du driver et premier programme.' },
    { slug: 'demarrer-unocore', title: 'Démarrer avec UnoCore', excerpt: 'Connexion USB, IDE Arduino, premier sketch.' },
    { slug: 'demarrer-picobot', title: 'Démarrer avec PiCoBOT', excerpt: 'Assemblage, chargement et premiers mouvements.' },
    { slug: 'demarrer-piconano', title: 'Démarrer avec PiCoNano', excerpt: 'Environnement ESP-IDF et MicroPython.' },
  ],
  hardware: [
    { slug: 'picolab-pinout', title: 'PiCoLAB — Pinout complet', excerpt: 'Description de chaque broche du PiCoLAB.' },
    { slug: 'unocore-pinout', title: 'UnoCore — Pinout complet', excerpt: 'Compatibilité Arduino Uno, tensions et courants.' },
    { slug: 'picobot-schemas', title: 'PiCoBOT — Schémas électriques', excerpt: 'Schémas des circuits moteurs, capteurs et alimentation.' },
    { slug: 'piconano-pinout', title: 'PiCoNano — Pinout ESP32-S3', excerpt: 'GPIO, ADC, DAC, PWM, I²C, SPI, UART.' },
  ],
  software: [
    { slug: 'installer-driver', title: 'Installer le driver USB-Série (CH340)', excerpt: 'Windows 10/11, macOS, Linux.' },
    { slug: 'bibliotheque-picolab', title: 'Bibliothèque PiCoLAB Arduino', excerpt: 'Installation via le gestionnaire de bibliothèques.' },
    { slug: 'micropython-piconano', title: 'MicroPython sur PiCoNano', excerpt: 'Flasher MicroPython et utiliser Thonny.' },
    { slug: 'installer-picoblocks', title: 'Installer PiCoBlocks', excerpt: 'Windows, macOS, Linux — guide pas-à-pas.' },
  ],
  picoblocks: [
    { slug: 'interface-picoblocks', title: 'Interface PiCoBlocks', excerpt: 'Zone de blocs, panneau Arduino, console.' },
    { slug: 'blocs-entrees-sorties', title: 'Blocs Entrées / Sorties', excerpt: 'Lire et écrire les broches numériques et analogiques.' },
    { slug: 'blocs-moteurs', title: 'Blocs Moteurs (PiCoBOT)', excerpt: 'Avancer, reculer, tourner avec PiCoBOT.' },
    { slug: 'blocs-communication', title: 'Blocs Communication', excerpt: 'Bluetooth, Wi-Fi, MQTT depuis PiCoBlocks.' },
  ],
  faq: [
    { slug: 'port-non-detecte', title: 'Le port USB n\'est pas détecté', excerpt: 'Causes et solutions pour Windows, macOS et Linux.' },
    { slug: 'upload-echoue', title: 'L\'upload échoue', excerpt: 'Erreurs avrdude, permissions et timeout.' },
    { slug: 'batterie-picobot', title: 'PiCoBOT ne démarre pas sur batterie', excerpt: 'Tension minimale et dépannage alimentation.' },
    { slug: 'garantie', title: 'Garantie et retours', excerpt: 'Procédure de retour et conditions de garantie PICO.' },
  ],
  api: [
    { slug: 'picolab-api', title: 'PiCoLAB — Référence API Arduino', excerpt: 'Toutes les fonctions de la bibliothèque PiCoLAB.' },
    { slug: 'picobot-api', title: 'PiCoBOT — Référence API', excerpt: 'Fonctions de mouvement, capteurs et Bluetooth.' },
    { slug: 'piconano-api', title: 'PiCoNano — Référence MicroPython', excerpt: 'Modules machine, network, bluetooth.' },
    { slug: 'picoblocks-api', title: 'PiCoBlocks — Référence des blocs', excerpt: 'Liste complète des blocs disponibles.' },
  ],
}

const SECTION_LABELS: Record<string, string> = {
  'getting-started': 'Démarrage rapide',
  hardware: 'Matériel',
  software: 'Logiciel',
  picoblocks: 'PiCoBlocks',
  faq: 'FAQ',
  api: 'Référence API',
}

export async function generateStaticParams() {
  return VALID_SECTIONS.flatMap((section) =>
    ['fr', 'en'].map((locale) => ({ locale, section }))
  )
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string; locale: string }>
}) {
  const { section, locale } = await params
  if (!VALID_SECTIONS.includes(section)) notFound()

  const sanityArticles = await sanityClient
    .fetch(WIKI_SECTION_QUERY, { section })
    .catch(() => []) as Array<{ slug: string; title: string; excerpt?: string }>

  const articles = sanityArticles.length > 0 ? sanityArticles : (STATIC_ARTICLES[section] ?? [])
  const sectionLabel = SECTION_LABELS[section] ?? section

  return (
    <section className="py-20">
      <Container>
        <Breadcrumb items={[{ label: 'Docs', href: `/${locale}` }, { label: sectionLabel }]} />
        <PageHero eyebrow="Documentation" title={sectionLabel} className="mt-6" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {articles.map((a) => (
            <Link key={a.slug} href={`/${locale}/${section}/${a.slug}`}>
              <Card variant="interactive" className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-body text-sm font-semibold text-text-primary">{a.title}</h3>
                  {a.excerpt && <p className="mt-1 text-xs text-text-muted">{a.excerpt}</p>}
                </div>
                <ArrowRight size={14} strokeWidth={1.75} className="mt-1 flex-shrink-0 text-text-muted" />
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
