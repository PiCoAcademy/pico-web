import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container, PageHero, Card, Button } from '@pico/ui'

const SOLUTIONS = [
  {
    key: 'automation',
    icon: '⚙️',
    specs: ['Siemens S7-1200/1500', 'Schneider M340/M580', 'Allen-Bradley CompactLogix', 'Beckhoff TwinCAT', 'WinCC / Ignition SCADA'],
  },
  {
    key: 'cnc',
    icon: '🔩',
    specs: ['LinuxCNC / MACH3 / MACH4', 'Servo Drives Mitsubishi / Delta', 'Mesa FPGA Motion Cards', 'Rétrofit tours, fraiseuses, plasmas', 'Axes A/B/C rotatifs'],
  },
  {
    key: 'energy',
    icon: '⚡',
    specs: ['Analyseurs de réseau Schneider PM', 'Dashboard Grafana temps réel', 'Rapports ISO 50001', 'Alertes dépassement de seuils', 'Compensation énergie réactive'],
  },
  {
    key: 'iot',
    icon: '📡',
    specs: ['Capteurs industriels 4–20 mA / HART', 'Protocoles OPC-UA, MQTT, Modbus TCP', 'Edge computing ESP32 / Raspberry Pi', 'AWS IoT / Azure IoT Hub', 'Alertes SMS/email en temps réel'],
  },
  {
    key: 'textile',
    icon: '🧵',
    specs: ['Comptage pièces par vision / capteur', 'Supervision multi-lignes centralisée', 'Indicateurs OEE et TRS', 'Reporting automatique CSV / Excel', 'Intégration ERP / SAP'],
  },
  {
    key: 'lpg',
    icon: '🔥',
    specs: ['Détecteurs gaz ATEX certifiés', 'Vannes motorisées fail-safe', 'Centrale d\'alarme incendie/gaz', 'Télégestion GSM/4G', 'Conformité ONHYM et AMISOL'],
  },
] as const

export default function SolutionsPage() {
  const t = useTranslations()

  return (
    <>
      <section className="py-20">
        <Container>
          <PageHero
            eyebrow={t('solutions.title')}
            title={t('solutions.title')}
            description={t('solutions.sub')}
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map(({ key, icon, specs }) => (
              <Card key={key} variant="accent" className="flex flex-col">
                <span className="text-3xl" role="img" aria-label={key}>{icon}</span>
                <h2 className="mt-4 font-display text-h2 font-bold text-text-primary">
                  {t(`solutions.items.${key}.title`)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {t(`solutions.items.${key}.desc`)}
                </p>
                <ul className="mt-5 flex-1 space-y-2">
                  {specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-text-muted-2">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-card border border-[var(--accent-bd)] bg-[var(--accent-bg)] p-8 text-center">
            <h3 className="font-display text-h2 font-bold text-text-primary">
              {t('contact.title')}
            </h3>
            <p className="mt-3 text-text-muted-2">{t('contact.sub')}</p>
            <Button size="lg" asChild className="mt-6">
              <Link href="/rfq">{t('contact.cta')}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
