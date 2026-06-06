'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, GraduationCap } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function AcademyNav({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-[200] h-16 border-b border-[var(--border)] bg-[rgba(3,7,18,0.92)] backdrop-blur-[16px] saturate-150">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 xl:px-10">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0 font-display text-lg font-black tracking-tight text-text-primary">
          <GraduationCap size={22} className="text-[var(--accent)]" />
          PICO
          <span className="mx-0.5 text-[var(--accent)]">|</span>
          <span className="font-bold">Academy</span>
        </Link>

        {/* Nav links - desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href={`/${locale}/courses`} className="text-sm text-text-muted transition-colors hover:text-text-primary">
            {t('courses')}
          </Link>
          <Link href={`/${locale}/paths`} className="text-sm text-text-muted transition-colors hover:text-text-primary">
            {t('paths')}
          </Link>
          <Link href={`/${locale}/blog`} className="text-sm text-text-muted transition-colors hover:text-text-primary">
            {t('blog')}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/dashboard`}
            className="hidden rounded-btn border border-[var(--border)] px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:flex"
          >
            {t('dashboard')}
          </Link>
          <Link
            href={`/${locale}/courses`}
            className="hidden rounded-btn bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 md:flex"
          >
            {t('courses')}
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

      {open && (
        <div className="fixed inset-0 top-16 z-[199] bg-bg-base md:hidden">
          <nav className="flex flex-col gap-1 p-6">
            {[
              { label: t('courses'), href: `/${locale}/courses` },
              { label: t('paths'), href: `/${locale}/paths` },
              { label: t('blog'), href: `/${locale}/blog` },
              { label: t('dashboard'), href: `/${locale}/dashboard` },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-btn px-4 py-3 text-base text-text-primary hover:bg-bg-card"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
