'use client'

import * as React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Container } from '@pico/ui'
import { useCart } from '@/lib/cart'

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-btn border border-[var(--border)] bg-bg-base px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-[var(--accent)] focus:outline-none"
      />
    </label>
  )
}

export default function CheckoutPage() {
  const t = useTranslations()
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string
  const { items, total, clear } = useCart()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const shipping = {
      firstName: fd.get('firstName') as string,
      lastName: fd.get('lastName') as string,
      address: fd.get('address') as string,
      city: fd.get('city') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
    }
    try {
      const { createOrder } = await import('@/app/actions/order')
      const result = await createOrder(items, shipping)
      if (!result.ok) {
        setError(result.error ?? 'An error occurred')
        setLoading(false)
      } else {
        clear()
        router.push(`/${locale}/checkout/success?order=${result.orderId}`)
      }
    } catch {
      setError('An unexpected error occurred.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.replace(`/${locale}/cart`)
    return null
  }

  return (
    <section className="py-20">
      <Container>
        <h1 className="font-display text-h1 font-bold text-text-primary">{t('checkout.title')}</h1>
        <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-8">
            {/* Shipping */}
            <div className="rounded-card border border-[var(--border)] bg-bg-card p-6">
              <h2 className="mb-5 font-display text-h2 font-bold text-text-primary">
                {t('checkout.shipping')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label={t('checkout.firstName')} name="firstName" required autoComplete="given-name" />
                <Field label={t('checkout.lastName')} name="lastName" required autoComplete="family-name" />
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <Field label={t('checkout.address')} name="address" required autoComplete="street-address" />
                <Field label={t('checkout.city')} name="city" required autoComplete="address-level2" />
                <Field label={t('checkout.phone')} name="phone" type="tel" required autoComplete="tel" />
                <Field label={t('checkout.email')} name="email" type="email" required autoComplete="email" />
              </div>
            </div>

            {/* Payment placeholder */}
            <div className="rounded-card border border-[var(--border)] bg-bg-card p-6">
              <h2 className="mb-5 font-display text-h2 font-bold text-text-primary">
                {t('checkout.payment')}
              </h2>
              <div className="rounded-btn border border-dashed border-[var(--border)] p-6 text-center">
                <p className="text-sm text-text-muted">
                  Stripe / CMI intégration — virement bancaire accepté
                </p>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="self-start rounded-card border border-[var(--border)] bg-bg-card p-6">
            <h2 className="mb-4 font-display text-h2 font-bold text-text-primary">Votre commande</h2>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-muted truncate max-w-[180px]">{item.name} ×{item.qty}</span>
                  <span className="font-semibold text-text-primary">{(item.priceMad * item.qty).toFixed(2)} MAD</span>
                </div>
              ))}
            </div>
            <div className="my-4 border-t border-[var(--border)]" />
            <div className="flex justify-between font-bold">
              <span className="text-text-primary">Total</span>
              <span className="font-display text-[var(--accent)]">{total().toFixed(2)} MAD</span>
            </div>
            {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-btn bg-[var(--accent)] py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('checkout.processing') : t('checkout.placeOrder')}
            </button>
          </div>
        </form>
      </Container>
    </section>
  )
}
