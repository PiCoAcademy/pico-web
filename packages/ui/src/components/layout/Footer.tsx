import * as React from 'react'
import Link from 'next/link'
import { Container } from './Container'

const units = [
  { label: 'Education', href: 'https://education.pico.ma' },
  { label: 'Industrial', href: 'https://industrial.pico.ma' },
  { label: 'Academy', href: 'https://academy.pico.ma' },
  { label: 'Store', href: 'https://store.pico.ma' },
  { label: 'Wiki', href: 'https://wiki.pico.ma' },
]

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--border)] pb-8 pt-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="font-display text-base font-black tracking-tight text-text-primary">
              PICO Group
            </span>
            <p className="mt-1 text-sm text-text-muted">
              Engineering Ecosystem — Morocco
            </p>
          </div>
          <nav aria-label="Group units" className="flex flex-wrap gap-x-6 gap-y-2">
            {units.map((u) => (
              <Link
                key={u.href}
                href={u.href}
                className="text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {u.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-[var(--border-subtle)] pt-6 text-xs text-text-muted">
          © {new Date().getFullYear()} PICO Group. Tous droits réservés.
        </div>
      </Container>
    </footer>
  )
}
