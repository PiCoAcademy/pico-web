import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container, Badge, Button, Card } from '@pico/ui'
import { Download, Github, Blocks, Code, WifiOff, Upload } from 'lucide-react'

const FEATURE_ICONS = { blocks: Blocks, arduino: Code, offline: WifiOff, upload: Upload }

const DEVICES = [
  { name: 'PiCoLAB',  desc: 'Station éducative Arduino', supported: true },
  { name: 'UnoCore',  desc: 'Compatbile Arduino Uno',    supported: true },
  { name: 'PiCoBOT',  desc: 'Robot éducatif mobile',     supported: true },
  { name: 'PiCoNano', desc: 'ESP32-S3 compact',          supported: true },
]

export default function PicoblocksPage() {
  const t = useTranslations('picoblocks')

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-28 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(37,99,235,0.12),transparent)]" />
        <Container>
          <Badge variant="accent" size="sm" className="mb-6">{t('eyebrow')}</Badge>
          <h1 className="font-display text-hero font-black leading-none tracking-[-0.04em] text-text-primary">
            {t('headline')}
          </h1>
          <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-text-muted-2">{t('sub')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="https://github.com/PiCoAcademy/PiCoBlocks/releases/latest" target="_blank" rel="noreferrer">
                <Download size={16} className="mr-2" />
                {t('download')}
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="https://github.com/PiCoAcademy/PiCoBlocks" target="_blank" rel="noreferrer">
                <Github size={16} className="mr-2" />
                {t('source')}
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-bg-card py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(['blocks', 'arduino', 'offline', 'upload'] as const).map((k) => {
              const Icon = FEATURE_ICONS[k]
              return (
                <Card key={k} variant="accent" className="flex flex-col gap-3">
                  <Icon size={24} strokeWidth={1.75} className="text-[var(--accent)]" />
                  <h3 className="font-display text-h3 font-bold text-text-primary">{t(`features.${k}.title`)}</h3>
                  <p className="text-sm text-text-muted">{t(`features.${k}.desc`)}</p>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Supported devices */}
      <section className="py-20">
        <Container>
          <h2 className="font-display text-h1 font-black leading-tight tracking-tight text-text-primary">
            Appareils supportés
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEVICES.map((d) => (
              <Card key={d.name} variant="flat" className="flex items-center gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">✓</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{d.name}</p>
                  <p className="text-xs text-text-muted">{d.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Download CTA */}
      <section className="pb-20">
        <Container>
          <Card variant="accent" className="p-10 text-center md:p-16">
            <h2 className="font-display text-h1 font-black text-text-primary">Gratuit & Open Source</h2>
            <p className="mx-auto mt-4 max-w-lg text-body-lg text-text-muted-2">
              PiCoBlocks est entièrement gratuit pour les élèves, les enseignants et les makers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <a href="https://github.com/PiCoAcademy/PiCoBlocks/releases/latest" target="_blank" rel="noreferrer">
                  <Download size={16} className="mr-2" /> Télécharger pour Windows
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="https://github.com/PiCoAcademy/PiCoBlocks/releases/latest" target="_blank" rel="noreferrer">
                  macOS / Linux
                </a>
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </>
  )
}
