import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container, PageHero, Card, Badge, Button } from '@pico/ui'

const MODULES = [
  {
    name: 'PiCoMOD-PLC',
    tagline: 'Contrôleur API compact sur rail DIN',
    desc: 'Module de contrôle industriel basé ESP32-S3. 16 E/S configurables, Modbus RTU/TCP, Ethernet, alimentation 24 V DC.',
    specs: ['ESP32-S3 240 MHz', '16 E/S digitales', 'Modbus RTU + TCP', 'Rail DIN 35 mm', '24 V DC'],
    badge: 'Nouveau',
    badgeVariant: 'accent' as const,
  },
  {
    name: 'PiCoMOD-ENERGY',
    tagline: 'Analyseur de réseau triPhasé',
    desc: 'Mesure de puissance active/réactive, facteur de puissance, harmoniques jusqu\'au rang 31. Interface Modbus TCP et affichage local.',
    specs: ['3 × CT externes', 'THD jusqu\'au rang 31', 'Modbus TCP / RS485', 'Afficheur 2.8"', '85–265 V AC'],
    badge: 'Stock',
    badgeVariant: 'success' as const,
  },
  {
    name: 'PiCoMOD-IO32',
    tagline: 'Extension 32 E/S industrielles',
    desc: 'Carte d\'extension pour systèmes existants : 16 entrées TOR + 16 sorties relais 10 A. Communication I²C ou SPI.',
    specs: ['16 entrées 24 V DC', '16 sorties relais 10 A', 'I²C / SPI', 'Rail DIN', 'Isolation optique'],
    badge: 'Stock',
    badgeVariant: 'success' as const,
  },
  {
    name: 'PiCoMOD-GSM',
    tagline: 'Passerelle GSM/4G industrielle',
    desc: 'Envoi d\'alertes SMS, accès VPN 4G, routage de données vers le cloud. Idéal pour la télégestion de sites distants.',
    specs: ['4G LTE Cat-4', 'VPN OpenVPN / WireGuard', 'SMS + MQTT', '2 × SIM slots', 'Antenne externe SMA'],
    badge: 'Bientôt',
    badgeVariant: 'warning' as const,
  },
]

export default function ProductsPage() {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <PageHero
          eyebrow="Catalogue Produits"
          title="Modules Industriels PICO"
          description="Des modules électroniques conçus en interne pour répondre aux besoins spécifiques de l'industrie marocaine."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {MODULES.map((mod) => (
            <Card key={mod.name} variant="default" className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-[var(--accent)]">{mod.name}</p>
                  <h2 className="mt-1 font-display text-h3 font-bold text-text-primary">
                    {mod.tagline}
                  </h2>
                </div>
                <Badge variant={mod.badgeVariant} size="xs">{mod.badge}</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{mod.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {mod.specs.map((s) => (
                  <span key={s} className="rounded-chip bg-bg-card-2 px-2 py-0.5 text-[10px] font-mono text-text-muted-2">
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-card border border-[var(--border)] bg-bg-card p-8 text-center">
          <p className="text-text-muted-2">
            {t('contact.sub')}
          </p>
          <Button size="lg" asChild className="mt-5">
            <Link href="/rfq">{t('contact.cta')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
