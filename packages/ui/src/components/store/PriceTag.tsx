import * as React from 'react'
import { cn } from '../../lib/cn'

export interface PriceTagProps {
  priceMad: number
  priceEur?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeStyles = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
}

export function PriceTag({ priceMad, priceEur, size = 'md', className }: PriceTagProps) {
  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('font-display font-bold text-[var(--accent)]', sizeStyles[size])}>
        {priceMad.toFixed(2)} MAD
      </span>
      {priceEur && (
        <span className="text-sm text-text-muted">≈ {priceEur.toFixed(2)} EUR</span>
      )}
    </div>
  )
}
