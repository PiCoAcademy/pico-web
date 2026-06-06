'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Container } from './Container'
import { Button } from '../Button'

export interface NavLink {
  label: string
  href: string
}

export interface NavProps {
  brand: string
  links?: NavLink[]
  cta?: { label: string; href: string }
  className?: string
}

export function Nav({ brand, links = [], cta, className }: NavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-[200] h-16 border-b border-[var(--border)]',
        'bg-[rgba(3,7,18,0.92)] backdrop-blur-[16px] saturate-150',
        className
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 font-display text-lg font-black tracking-tight text-text-primary">
          PICO
          <span className="mx-1.5 text-[var(--accent)]">|</span>
          <span className="font-bold">{brand}</span>
        </Link>

        {/* Desktop links */}
        {links.length > 0 && (
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition-colors duration-[0.18s] hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {cta && (
            <Button size="sm" asChild>
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          )}
          {/* Hamburger */}
          <button
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-btn text-text-muted transition-colors hover:text-text-primary md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-16 z-[199] bg-bg-base md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-btn px-4 py-3 text-base text-text-primary hover:bg-bg-card"
              >
                {link.label}
              </Link>
            ))}
            {cta && (
              <div className="mt-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href={cta.href} onClick={() => setOpen(false)}>
                    {cta.label}
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
