import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Container, Badge } from '@pico/ui'
import { sanityClient, PRODUCT_QUERY, PRODUCTS_QUERY } from '@/lib/sanity'
import { AddToCartButton } from '@/components/AddToCartButton'

export const revalidate = 3600

type Product = {
  _id: string
  slug: { current: string }
  title: string
  description: string
  price: number
  category: string
  inStock: boolean
  specs?: Record<string, string>
  imageUrl: string | null
}

const STATIC_PRODUCTS: Product[] = [
  {
    _id: '1',
    slug: { current: 'kit-arduino-uno-starter' },
    title: 'Kit Arduino UNO Starter',
    description: 'Le kit parfait pour débuter en électronique et programmation. Inclut carte Arduino UNO, breadboard, résistances, LEDs, capteurs et câbles.',
    price: 299,
    category: 'Arduino',
    inStock: true,
    specs: { 'Microcontrôleur': 'ATmega328P', 'Tension': '5V', 'Broches num.': '14', 'Broches analog.': '6', 'Fréquence': '16 MHz' },
    imageUrl: null,
  },
  {
    _id: '6',
    slug: { current: 'shield-picolab-v2' },
    title: 'PiCoLAB Shield v2',
    description: 'Extension officielle PICO pour projets éducatifs avancés. Compatible Arduino et PiCoBlocks. Intègre capteurs, relais et connecteurs IoT.',
    price: 389,
    category: 'PICO',
    inStock: true,
    specs: { 'Compatibilité': 'Arduino UNO/Mega', 'Capteurs': '8 intégrés', 'Relais': '2×5A', 'Interface': 'Grove + JST' },
    imageUrl: null,
  },
]

export async function generateStaticParams() {
  const products: Product[] = await sanityClient.fetch(PRODUCTS_QUERY).catch(() => [])
  const all = products.length > 0 ? products : STATIC_PRODUCTS
  return all.map((p) => ({ slug: p.slug.current }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const fetched: Product | null = await sanityClient.fetch(PRODUCT_QUERY, { slug }).catch(() => null)
  const product = fetched ?? STATIC_PRODUCTS.find((p) => p.slug.current === slug) ?? null
  if (!product) notFound()
  return <ProductDetail product={product} />
}

function ProductDetail({ product }: { product: Product }) {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
          <Link href="../../" className="hover:text-text-primary">Accueil</Link>
          <span>›</span>
          <Link href="../products" className="hover:text-text-primary">{t('products.title')}</Link>
          <span>›</span>
          <span className="text-text-primary">{product.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-square rounded-card border border-[var(--border)] bg-bg-card flex items-center justify-center text-8xl">
            📦
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Badge variant="neutral" size="sm">{product.category}</Badge>
            <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-black leading-tight text-text-primary">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-[var(--accent)]">
                {product.price.toFixed(2)} MAD
              </span>
              {product.inStock ? (
                <Badge variant="success">{t('product.inStock')}</Badge>
              ) : (
                <Badge variant="error">{t('product.outOfStock')}</Badge>
              )}
            </div>
            <p className="mt-5 leading-relaxed text-text-muted">{product.description}</p>

            {/* Add to cart */}
            <div className="mt-8">
              <AddToCartButton
                product={{
                  id: product._id,
                  name: product.title,
                  priceMad: product.price,
                  slug: product.slug.current,
                }}
                disabled={!product.inStock}
                labelAdd={t('product.addToCart')}
                labelBuy={t('product.buyNow')}
                labelOut={t('product.outOfStock')}
              />
            </div>

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-h2 font-bold text-text-primary">{t('product.specs')}</h2>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key} className="border-b border-[var(--border)]">
                        <td className="py-2.5 pr-4 font-semibold text-text-muted">{key}</td>
                        <td className="py-2.5 text-text-primary">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
