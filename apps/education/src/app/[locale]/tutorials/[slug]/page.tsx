import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container, Breadcrumb, Badge, Button } from '@pico/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Static tutorial stubs — will be replaced by Sanity/MDX content
const TUTORIAL_CONTENT: Record<string, {
  title: string; product: string; level: string; duration: string
  steps: string[]
}> = {
  'demarrer-picolab': {
    title: 'Démarrer avec PiCoLAB',
    product: 'PiCoLAB',
    level: 'Débutant',
    duration: '30 min',
    steps: [
      'Déballez votre PiCoLAB et vérifiez les composants inclus.',
      'Installez le pilote USB-Série (CH340) depuis le support technique.',
      'Lancez PiCoBlocks et sélectionnez la carte "PiCoLAB".',
      'Cliquez sur "Vérifier" pour tester la connexion.',
      'Chargez l\'exemple "Blink" et téléversez-le.',
      'La LED intégrée clignote — vous êtes prêts !',
    ],
  },
  'premiers-pas-led': {
    title: 'Premiers pas : clignoter une LED',
    product: 'UnoCore',
    level: 'Débutant',
    duration: '20 min',
    steps: [
      'Branchez une LED et une résistance 220Ω sur la broche D13.',
      'Ouvrez PiCoBlocks et faites glisser un bloc "Répéter toujours".',
      'À l\'intérieur : un bloc "Mettre broche D13 à HAUT", délai 1s, "Mettre broche D13 à BAS", délai 1s.',
      'Cliquez Téléverser.',
      'La LED clignote une fois par seconde.',
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(TUTORIAL_CONTENT).map((slug) => ({ slug }))
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const tutorial = TUTORIAL_CONTENT[slug]
  if (!tutorial) notFound()

  const LEVEL_VARIANT = { 'Débutant': 'success', 'Intermédiaire': 'warning', 'Avancé': 'error' } as const

  return (
    <article className="py-12">
      <Container width="narrow">
        <Breadcrumb items={[
          { label: locale === 'fr' ? 'Tutoriels' : 'Tutorials', href: `/${locale}/tutorials` },
          { label: tutorial.title },
        ]} />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Badge variant="neutral" size="xs">{tutorial.product}</Badge>
          <Badge variant={LEVEL_VARIANT[tutorial.level as keyof typeof LEVEL_VARIANT] ?? 'neutral'} size="xs">{tutorial.level}</Badge>
          <span className="text-xs text-text-muted">{tutorial.duration}</span>
        </div>

        <h1 className="mt-4 font-display text-h1 font-black leading-tight tracking-[-0.04em] text-text-primary">
          {tutorial.title}
        </h1>

        <ol className="mt-10 space-y-6">
          {tutorial.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--accent-bg)] text-xs font-bold text-[var(--accent)] border border-[var(--accent-bd)]">
                {i + 1}
              </span>
              <p className="text-text-muted-2 leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex items-center justify-between border-t border-[var(--border)] pt-8">
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/tutorials`}>
              <ArrowLeft size={14} className="mr-1.5" />
              {locale === 'fr' ? 'Tous les tutoriels' : 'All Tutorials'}
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/products/${tutorial.product.toLowerCase().replace('ï', 'i')}`}>
              {locale === 'fr' ? 'Fiche produit' : 'Product Page'}
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </Container>
    </article>
  )
}
