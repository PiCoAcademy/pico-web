import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '../Card'
import { Badge } from '../Badge'
import { cn } from '../../lib/cn'

export interface ProductCardProps {
  slug: string
  name: string
  priceMad: number
  imageUrl: string
  imageAlt?: string
  stockQty?: number
  lowStockAt?: number
  className?: string
}

export function ProductCard({
  slug,
  name,
  priceMad,
  imageUrl,
  imageAlt,
  stockQty,
  lowStockAt = 5,
  className,
}: ProductCardProps) {
  const inStock = stockQty === undefined || stockQty > 0
  const isLow = stockQty !== undefined && stockQty > 0 && stockQty <= lowStockAt

  return (
    <Link href={`/product/${slug}`} className={cn('block', className)}>
      <Card variant="interactive" padding="none" className="overflow-hidden">
        <div className="relative aspect-square bg-bg-card-2">
          <Image
            src={imageUrl}
            alt={imageAlt ?? name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-body text-sm font-semibold leading-snug text-text-primary">
              {name}
            </h3>
            {!inStock && <Badge variant="error" size="xs">Épuisé</Badge>}
            {isLow && <Badge variant="warning" size="xs">Stock limité</Badge>}
          </div>
          <p className="mt-2 font-display text-base font-bold text-[var(--accent)]">
            {priceMad.toFixed(2)} MAD
          </p>
        </div>
      </Card>
    </Link>
  )
}
