import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Container, Breadcrumb, Badge, Button, Card } from '@pico/ui'
import { sanityClient, PRODUCT_QUERY, PRODUCTS_QUERY } from '@/lib/sanity'
import { Download, ExternalLink } from 'lucide-react'

export const revalidate = 3600

type Product = {
  _id: string; name: string; tagline?: string; description?: unknown[]; imageUrl?: string
  gallery?: string[]; sku?: string; priceMad?: number; priceEur?: number; demoVideo?: string
  specs?: Array<{ key: string; value: string }>
  downloads?: Array<{ label?: string; type?: string; file?: { asset?: { url?: string } } }>
  related?: Array<{ slug: { current: string }; name: string; imageUrl?: string; priceMad?: number }>
}

export async function generateStaticParams() {
  const products = await sanityClient.fetch<Array<{ slug: { current: string } }>>(PRODUCTS_QUERY).catch(() => [])
  return products.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product: Product | null = await sanityClient.fetch(PRODUCT_QUERY, { slug }).catch(() => null)
  if (!product) return {}
  return { title: product.name, description: product.tagline }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const product: Product | null = await sanityClient.fetch(PRODUCT_QUERY, { slug }).catch(() => null)
  if (!product) notFound()

  return (
    <article className="py-12">
      <Container>
        <Breadcrumb items={[
          { label: locale === 'fr' ? 'Produits' : 'Products', href: `/${locale}/products` },
          { label: product.name },
        ]} />

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-card bg-bg-card-2">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-8" priority />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl">📦</div>
              )}
            </div>
            {product.gallery && product.gallery.length > 0 && (
              <div className="mt-3 flex gap-2">
                {product.gallery.slice(0, 4).map((url, i) => (
                  <div key={i} className="relative h-16 w-16 overflow-hidden rounded border border-[var(--border)] bg-bg-card-2">
                    <Image src={url} alt="" fill className="object-contain p-1" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.sku && <p className="font-mono text-xs text-[var(--accent)]">SKU: {product.sku}</p>}
            <h1 className="mt-1 font-display text-h1 font-black leading-tight tracking-[-0.04em] text-text-primary">{product.name}</h1>
            {product.tagline && <p className="mt-2 text-body-lg text-text-muted-2">{product.tagline}</p>}

            {product.priceMad && (
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-3xl font-black text-[var(--accent)]">{product.priceMad} MAD</span>
                {product.priceEur && <span className="text-sm text-text-muted">≈ {product.priceEur} €</span>}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`https://store.pico.ma/product/${slug}`} target="_blank">
                  {locale === 'fr' ? 'Commander sur le Store' : 'Order on Store'}
                  <ExternalLink size={14} className="ml-1.5" />
                </Link>
              </Button>
            </div>

            {product.description && (
              <div className="prose-education mt-8">
                <PortableText value={product.description as Parameters<typeof PortableText>[0]['value']} />
              </div>
            )}
          </div>
        </div>

        {/* Specs */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-h2 font-bold text-text-primary">
              {locale === 'fr' ? 'Spécifications' : 'Specifications'}
            </h2>
            <div className="mt-4 divide-y divide-[var(--border)] rounded-card border border-[var(--border)]">
              {product.specs.map((s) => (
                <div key={s.key} className="flex gap-6 px-5 py-3 text-sm">
                  <span className="w-40 flex-shrink-0 text-text-muted">{s.key}</span>
                  <span className="text-text-primary">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Downloads */}
        {product.downloads && product.downloads.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-h2 font-bold text-text-primary">
              {locale === 'fr' ? 'Téléchargements' : 'Downloads'}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.downloads.map((d, i) => (
                <Button key={i} variant="secondary" size="sm" asChild>
                  <a href={d.file?.asset?.url ?? '#'} download>
                    <Download size={14} className="mr-1.5" />
                    {d.label ?? d.type ?? 'File'}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {product.related && product.related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-h2 font-bold text-text-primary">
              {locale === 'fr' ? 'Produits similaires' : 'Related Products'}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.related.map((r) => (
                <Link key={r.slug.current} href={`/${locale}/products/${r.slug.current}`}>
                  <Card variant="interactive" padding="sm">
                    <p className="font-body text-sm font-semibold text-text-primary">{r.name}</p>
                    {r.priceMad && <p className="mt-1 text-xs text-[var(--accent)]">{r.priceMad} MAD</p>}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  )
}
