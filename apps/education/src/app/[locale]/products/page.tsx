import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { Container, PageHero, Card } from '@pico/ui'
import { sanityClient, PRODUCTS_QUERY } from '@/lib/sanity'

export const revalidate = 3600

type Product = { _id: string; slug: { current: string }; name: string; tagline?: string; imageUrl?: string; priceMad?: number }

export default async function ProductsPage() {
  const products: Product[] = await sanityClient.fetch(PRODUCTS_QUERY).catch(() => [])
  return <Products products={products} />
}

function Products({ products }: { products: Product[] }) {
  const t = useTranslations()

  const fallback = [
    { slug: { current: 'picolab' }, name: 'PiCoLAB', tagline: 'Station Arduino tout-en-un', priceMad: 299 },
    { slug: { current: 'picobot' }, name: 'PiCoBOT', tagline: 'Kit robotique mobile', priceMad: 449 },
    { slug: { current: 'piconano' }, name: 'PiCoNano', tagline: 'Microcontrôleur ultra-compact', priceMad: 89 },
    { slug: { current: 'unocore' }, name: 'UnoCore', tagline: 'Compatible Arduino Uno', priceMad: 129 },
  ]

  const list = products.length > 0 ? products : fallback

  return (
    <section className="py-20">
      <Container>
        <PageHero eyebrow="Catalogue" title={t('products.title')} description={t('products.sub')} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.slug.current} href={`/fr/products/${p.slug.current}`}>
              <Card variant="interactive" padding="none" className="overflow-hidden h-full flex flex-col">
                <div className="flex h-48 items-center justify-center bg-bg-card-2">
                  {(p as Product).imageUrl ? (
                    <Image src={(p as Product).imageUrl!} alt={p.name} width={200} height={150} className="object-contain" />
                  ) : (
                    <span className="text-6xl">📦</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-h3 font-bold text-text-primary">{p.name}</h3>
                  <p className="mt-1 text-sm text-text-muted">{p.tagline}</p>
                  {p.priceMad && (
                    <p className="mt-auto pt-4 font-display text-lg font-bold text-[var(--accent)]">{p.priceMad} MAD</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
