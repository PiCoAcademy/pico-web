'use client'

import * as React from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart'

export function StoreNav({ locale }: { locale: string }) {
  const count = useCart((s) => s.count())
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-[200] h-16 border-b border-[var(--border)] bg-[rgba(3,7,18,0.92)] backdrop-blur-[16px] saturate-150">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 xl:px-10">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0 font-display text-lg font-black tracking-tight text-text-primary">
          PICO
          <span className="mx-1.5 text-[var(--accent)]">|</span>
          <span className="font-bold">Store</span>
        </Link>

        {/* Nav links - desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href={`/${locale}/products`} className="text-sm text-text-muted transition-colors hover:text-text-primary">
            {locale === 'fr' ? 'Produits' : 'Products'}
          </Link>
          <Link href={`/${locale}/schools`} className="text-sm text-text-muted transition-colors hover:text-text-primary">
            {locale === 'fr' ? 'Établissements' : 'Schools'}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/account`}
            className="hidden h-9 w-9 items-center justify-center rounded-btn text-text-muted transition-colors hover:text-text-primary md:flex"
            aria-label="Mon compte"
          >
            <User size={18} strokeWidth={1.75} />
          </Link>
          <Link
            href={`/${locale}/cart`}
            className="relative flex h-9 items-center gap-2 rounded-btn border border-[var(--accent-bd)] bg-[var(--accent-bg)] px-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:brightness-110"
          >
            <ShoppingCart size={16} strokeWidth={1.75} />
            {locale === 'fr' ? 'Panier' : 'Cart'}
            {count > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-btn text-text-muted md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-16 z-[199] bg-bg-base md:hidden">
          <nav className="flex flex-col gap-1 p-6">
            <Link href={`/${locale}/products`} onClick={() => setOpen(false)} className="rounded-btn px-4 py-3 text-base text-text-primary hover:bg-bg-card">
              {locale === 'fr' ? 'Produits' : 'Products'}
            </Link>
            <Link href={`/${locale}/schools`} onClick={() => setOpen(false)} className="rounded-btn px-4 py-3 text-base text-text-primary hover:bg-bg-card">
              {locale === 'fr' ? 'Établissements' : 'Schools'}
            </Link>
            <Link href={`/${locale}/account`} onClick={() => setOpen(false)} className="rounded-btn px-4 py-3 text-base text-text-primary hover:bg-bg-card">
              {locale === 'fr' ? 'Mon compte' : 'My Account'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
