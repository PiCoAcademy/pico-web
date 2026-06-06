'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Container } from '@pico/ui'
import { useCart } from '@/lib/cart'
import { useParams } from 'next/navigation'

export default function CartPage() {
  const t = useTranslations()
  const { items, remove, setQty, total } = useCart()
  const params = useParams()
  const locale = params.locale as string

  if (items.length === 0) {
    return (
      <section className="py-24">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-7xl">🛒</span>
            <h1 className="font-display text-h1 font-bold text-text-primary">{t('cart.title')}</h1>
            <p className="text-text-muted">{t('cart.empty')}</p>
            <Link
              href={`/${locale}/products`}
              className="rounded-btn bg-[var(--accent)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-20">
      <Container>
        <h1 className="font-display text-h1 font-bold text-text-primary">{t('cart.title')}</h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Items */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-card border border-[var(--border)] bg-bg-card p-4">
                <div className="h-16 w-16 flex-shrink-0 rounded-md bg-bg-base flex items-center justify-center text-3xl">
                  📦
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary truncate">{item.name}</p>
                  <p className="text-sm text-text-muted">{item.priceMad.toFixed(2)} MAD</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty(item.id, Math.max(1, item.qty - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-btn border border-[var(--border)] text-text-muted hover:text-text-primary"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-text-primary">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, item.qty + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-btn border border-[var(--border)] text-text-muted hover:text-text-primary"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <p className="w-24 text-right font-bold text-text-primary">
                  {(item.priceMad * item.qty).toFixed(2)} MAD
                </p>
                <button
                  onClick={() => remove(item.id)}
                  className="text-text-muted hover:text-red-400 transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-card border border-[var(--border)] bg-bg-card p-6 self-start">
            <h2 className="font-display text-h2 font-bold text-text-primary">Récapitulatif</h2>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex justify-between text-sm text-text-muted">
                <span>{t('cart.subtotal')}</span>
                <span className="font-semibold text-text-primary">{total().toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-sm text-text-muted">
                <span>{t('cart.shipping')}</span>
                <span className="font-semibold text-[var(--accent)]">{t('cart.free')}</span>
              </div>
              <div className="my-2 border-t border-[var(--border)]" />
              <div className="flex justify-between font-bold">
                <span className="text-text-primary">{t('cart.total')}</span>
                <span className="font-display text-lg text-[var(--accent)]">{total().toFixed(2)} MAD</span>
              </div>
            </div>
            <Link
              href={`/${locale}/checkout`}
              className="mt-6 block w-full rounded-btn bg-[var(--accent)] py-3 text-center text-sm font-bold text-white hover:opacity-90"
            >
              {t('cart.checkout')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="mt-3 block w-full text-center text-sm text-text-muted hover:text-text-primary"
            >
              ← {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
