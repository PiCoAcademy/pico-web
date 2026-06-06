'use client'

import * as React from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/lib/cart'

type Props = {
  product: { id: string; name: string; priceMad: number; slug: string }
  disabled?: boolean
  labelAdd: string
  labelBuy: string
  labelOut: string
}

export function AddToCartButton({ product, disabled, labelAdd, labelBuy, labelOut }: Props) {
  const add = useCart((s) => s.add)
  const [added, setAdded] = React.useState(false)

  function handleAdd() {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (disabled) {
    return (
      <button disabled className="w-full rounded-btn bg-bg-card border border-[var(--border)] py-3 text-sm font-bold text-text-muted cursor-not-allowed">
        {labelOut}
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAdd}
        className="flex flex-1 items-center justify-center gap-2 rounded-btn border border-[var(--accent)] py-3 text-sm font-bold text-[var(--accent)] transition-colors hover:bg-[var(--accent-bg)]"
      >
        {added ? <Check size={16} /> : <ShoppingCart size={16} />}
        {added ? '✓ Ajouté' : labelAdd}
      </button>
      <button
        onClick={handleAdd}
        className="flex flex-1 items-center justify-center gap-2 rounded-btn bg-[var(--accent)] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        {labelBuy}
      </button>
    </div>
  )
}
