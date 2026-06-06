import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Container, PageHero, Badge } from '@pico/ui'
import { sanityClient, PRODUCTS_QUERY } from '@/lib/sanity'

export const revalidate = 3600

type Product = {
  _id: string
  slug: { current: string }
  title: string
  price: number
  category: string
  inStock: boolean
  imageUrl: string | null
}

const STATIC_PRODUCTS: Product[] = [
  { _id: '1', slug: { current: 'kit-arduino-uno-starter' }, title: 'Kit Arduino UNO Starter', price: 299, category: 'Arduino', inStock: true, imageUrl: null },
  { _id: '2', slug: { current: 'raspberry-pi-4b-4gb' }, title: 'Raspberry Pi 4B 4GB', price: 749, category: 'Raspberry Pi', inStock: true, imageUrl: null },
  { _id: '3', slug: { current: 'kit-robot-bras-6dof' }, title: 'Bras Robot 6 DOF', price: 1290, category: 'Robotics', inStock: false, imageUrl: null },
  { _id: '4', slug: { current: 'capteur-ultrasonic-hc-sr04' }, title: 'Capteur Ultrasons HC-SR04 (x5)', price: 89, category: 'Sensors', inStock: true, imageUrl: null },
  { _id: '5', slug: { current: 'esp32-devkit-v1' }, title: 'ESP32 DevKit V1', price: 149, category: 'Arduino', inStock: true, imageUrl: null },
  { _id: '6', slug: { current: 'shield-picolab-v2' }, title: 'PiCoLAB Shield v2', price: 389, category: 'PICO', inStock: true, imageUrl: null },
  { _id: '7', slug: { current: 'kit-impression-3d-pla' }, title: 'Filament PLA 1kg (blanc)', price: 199, category: '3D Printing', inStock: true, imageUrl: null },
  { _id: '8', slug: { current: 'multimetre-numerique' }, title: 'Multimètre numérique UT61E', price: 349, category: 'Tools', inStock: true, imageUrl: null },
]

export default async function ProductsPage() {
  const fetched: Product[] = await sanityClient.fetch(PRODUCTS_QUERY).catch(() => [])
  const products = fetched.length > 0 ? fetched : STATIC_PRODUCTS
  return <Products products={products} />
}

function Products({ products }: { products: Product[] }) {
  const t = useTranslations()

  return (
    <section className="py-20">
      <Container>
        <PageHero
          eyebrow={t('products.title')}
          title={t('products.title')}
          description={t('products.sub')}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p._id}
              href={`../product/${p.slug.current}`}
              className="group flex flex-col rounded-card border border-[var(--border)] bg-bg-card overflow-hidden transition-colors hover:border-[var(--accent)]"
            >
              <div className="aspect-square bg-bg-base flex items-center justify-center text-6xl">
                📦
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  {p.category}
                </span>
                <h3 className="mt-1 flex-1 font-semibold text-text-primary leading-snug line-clamp-2">
                  {p.title}
                </h3>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-bold text-[var(--accent)]">
                    {p.price?.toFixed(2)} MAD
                  </span>
                  {p.inStock ? (
                    <Badge variant="success" size="xs">En stock</Badge>
                  ) : (
                    <Badge variant="error" size="xs">{t('products.outOfStock')}</Badge>
                  )}
                </div>
                <button
                  disabled={!p.inStock}
                  className="mt-3 w-full rounded-btn bg-[var(--accent)] py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t('products.addToCart')}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
