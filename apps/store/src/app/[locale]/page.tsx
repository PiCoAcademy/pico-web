import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container } from '@pico/ui'
import { sanityClient, PRODUCTS_QUERY } from '@/lib/sanity'

export const revalidate = 3600

type Product = {
  _id: string
  slug: { current: string }
  title: string
  price: number
  category: string
  imageUrl: string | null
}

const FEATURED_CATEGORIES = [
  { key: 'arduino', icon: '⚡', label: 'Arduino & Microcontrollers' },
  { key: 'raspberry', icon: '🫐', label: 'Raspberry Pi' },
  { key: 'robotics', icon: '🤖', label: 'Robotics' },
  { key: 'sensors', icon: '📡', label: 'Sensors & Modules' },
  { key: '3dprint', icon: '🖨️', label: '3D Printing' },
  { key: 'tools', icon: '🔧', label: 'Tools & Equipment' },
]

export default async function StoreLanding() {
  const products: Product[] = await sanityClient.fetch(PRODUCTS_QUERY).catch(() => [])
  const featured = products.slice(0, 4)
  return <Landing featured={featured} />
}

function Landing({ featured }: { featured: Product[] }) {
  const t = useTranslations()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 40%, rgba(16,185,129,0.14) 0%, transparent 70%)' }}
        />
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-4 max-w-xl whitespace-pre-line font-display text-[clamp(2.5rem,6vw,4rem)] font-black leading-none tracking-tight text-text-primary">
            {t('hero.headline')}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-text-muted">
            {t('hero.sub')}
          </p>
          <Link
            href="./products"
            className="mt-8 inline-flex items-center gap-2 rounded-btn bg-[var(--accent)] px-8 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            {t('hero.cta')} →
          </Link>
        </Container>
      </section>

      {/* Categories */}
      <section className="pb-20">
        <Container>
          <h2 className="font-display text-h2 font-bold text-text-primary">
            {t('products.title')}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {FEATURED_CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href={`./products?category=${cat.key}`}
                className="flex flex-col items-center gap-2 rounded-card border border-[var(--border)] bg-bg-card p-4 text-center transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-bg)]"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-text-primary">{cat.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="pb-24">
          <Container>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-h2 font-bold text-text-primary">Nouveautés</h2>
              <Link href="./products" className="text-sm font-semibold text-[var(--accent)] hover:underline">
                Voir tout →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <Link
                  key={p._id}
                  href={`./product/${p.slug.current}`}
                  className="group rounded-card border border-[var(--border)] bg-bg-card overflow-hidden transition-colors hover:border-[var(--accent)]"
                >
                  <div className="aspect-square bg-bg-base flex items-center justify-center text-6xl">
                    📦
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-muted">{p.category}</p>
                    <h3 className="mt-1 font-semibold text-text-primary line-clamp-2">{p.title}</h3>
                    <p className="mt-2 font-display text-lg font-bold text-[var(--accent)]">
                      {p.price?.toFixed(2)} MAD
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Trust bar */}
      <section className="border-t border-[var(--border)] py-12">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: '🚚', label: 'Livraison gratuite', sub: 'dès 500 MAD' },
              { icon: '🔒', label: 'Paiement sécurisé', sub: 'CB & virement' },
              { icon: '📦', label: 'Stock local', sub: 'Casablanca' },
              { icon: '🎓', label: 'Support pédagogique', sub: '7j/7' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-sm font-semibold text-text-primary">{item.label}</p>
                <p className="text-xs text-text-muted">{item.sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
