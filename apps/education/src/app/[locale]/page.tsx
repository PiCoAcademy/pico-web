import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { Badge, Button, Card, Container } from '@pico/ui'
import { sanityClient, PRODUCTS_QUERY } from '@/lib/sanity'

export const revalidate = 3600

const PRODUCTS_STATIC = [
  { slug: 'picolab', name: 'PiCoLAB', tagline: 'Station Arduino tout-en-un', emoji: '🔬', priceMad: 299 },
  { slug: 'picobot', name: 'PiCoBOT', tagline: 'Kit robotique mobile', emoji: '🤖', priceMad: 449 },
  { slug: 'piconano', name: 'PiCoNano', tagline: 'Microcontrôleur ultra-compact', emoji: '📟', priceMad: 89 },
  { slug: 'unocore', name: 'UnoCore', tagline: 'Compatible Arduino Uno', emoji: '🧩', priceMad: 129 },
]

type Product = {
  _id: string
  slug: { current: string }
  name: string
  tagline?: string
  imageUrl?: string
  priceMad?: number
}

export default async function EducationHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const sanityProducts: Product[] = await sanityClient.fetch(PRODUCTS_QUERY).catch(() => [])
  return <EducationHomePage locale={locale} sanityProducts={sanityProducts} />
}

function EducationHomePage({ locale, sanityProducts }: { locale: string; sanityProducts: Product[] }) {
  const t = useTranslations()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-24 pt-28 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.14),transparent)]" />
        <Container>
          <Badge variant="accent" size="sm" className="mb-6">{t('hero.eyebrow')}</Badge>
          <h1 className="max-w-3xl font-display text-hero font-black leading-none tracking-[-0.04em] text-text-primary whitespace-pre-line">
            {t('hero.headline')}
          </h1>
          <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-text-muted-2">{t('hero.sub')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={`/${locale}/products`}>{t('hero.ctaPrimary')}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href={`/${locale}/tutorials`}>{t('hero.ctaSecondary')}</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Products ── */}
      <section className="py-20">
        <Container>
          <h2 className="font-display text-h1 font-black leading-tight tracking-tight text-text-primary">{t('products.title')}</h2>
          <p className="mt-4 text-body-lg text-text-muted-2">{t('products.sub')}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(sanityProducts.length > 0 ? sanityProducts.map((p) => ({
              slug: p.slug.current, name: p.name, tagline: p.tagline, emoji: '📦', priceMad: p.priceMad, imageUrl: p.imageUrl,
            })) : PRODUCTS_STATIC).map((p) => (
              <Link key={p.slug} href={`/${locale}/products/${p.slug}`}>
                <Card variant="interactive" padding="none" className="overflow-hidden h-full flex flex-col">
                  <div className="flex h-40 items-center justify-center bg-bg-card-2">
                    {(p as { imageUrl?: string }).imageUrl ? (
                      <Image src={(p as { imageUrl?: string }).imageUrl!} alt={p.name} width={160} height={120} className="object-contain" />
                    ) : (
                      <span className="text-5xl" role="img">{(p as { emoji?: string }).emoji ?? '📦'}</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="font-display text-sm font-bold text-text-primary">{p.name}</p>
                    <p className="mt-1 text-xs text-text-muted">{p.tagline}</p>
                    {p.priceMad && (
                      <p className="mt-auto pt-3 font-display text-sm font-bold text-[var(--accent)]">{p.priceMad} MAD</p>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PiCoBlocks teaser ── */}
      <section className="bg-bg-card py-20">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Badge variant="accent" size="sm" className="mb-4">{t('picoblocks.eyebrow')}</Badge>
              <h2 className="font-display text-h1 font-black leading-tight tracking-tight text-text-primary">{t('picoblocks.headline')}</h2>
              <p className="mt-4 text-body-lg text-text-muted-2">{t('picoblocks.sub')}</p>
              <div className="mt-8 flex gap-3">
                <Button asChild><Link href={`/${locale}/picoblocks`}>{t('picoblocks.download')}</Link></Button>
                <Button variant="ghost" asChild><Link href={`/${locale}/picoblocks`}>{t('picoblocks.source')}</Link></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(['blocks', 'arduino', 'offline', 'upload'] as const).map((k) => (
                <Card key={k} variant="flat" padding="sm">
                  <p className="font-body text-sm font-semibold text-text-primary">{t(`picoblocks.features.${k}.title`)}</p>
                  <p className="mt-1 text-xs text-text-muted">{t(`picoblocks.features.${k}.desc`)}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <Container>
          <Card variant="accent" className="p-10 text-center md:p-16">
            <h2 className="font-display text-h1 font-black leading-tight tracking-tight text-text-primary">{t('contact.title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-text-muted-2">{t('contact.sub')}</p>
            <Button size="lg" asChild className="mt-8">
              <Link href="mailto:education@pico.ma">{t('contact.cta')}</Link>
            </Button>
          </Card>
        </Container>
      </section>
    </>
  )
}
