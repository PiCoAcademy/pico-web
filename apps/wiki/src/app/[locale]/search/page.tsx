'use client'

import * as React from 'react'
import { Container } from '@pico/ui'
import { Search } from 'lucide-react'

// Full Algolia InstantSearch will be wired once ALGOLIA_APP_ID is configured.
// This page provides the search UI shell with a client-side search input.

export default function SearchPage() {
  const [query, setQuery] = React.useState('')

  return (
    <section className="py-20">
      <Container width="narrow">
        <h1 className="font-display text-h1 font-black leading-tight tracking-[-0.04em] text-text-primary mb-8">
          Recherche
        </h1>

        <div className="relative">
          <Search size={16} strokeWidth={1.75} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="search"
            placeholder="Rechercher dans la documentation…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="h-12 w-full rounded-btn border border-[var(--border)] bg-bg-card-2 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-bg)] transition-colors"
          />
        </div>

        {query.length > 0 && (
          <div className="mt-6 rounded-card border border-[var(--border)] bg-bg-card p-6 text-center text-sm text-text-muted">
            Algolia InstantSearch sera activé une fois les clés API configurées dans Doppler.
          </div>
        )}

        {query.length === 0 && (
          <div className="mt-10">
            <p className="text-sm font-semibold text-text-muted mb-4">Sections populaires</p>
            <div className="flex flex-wrap gap-2">
              {['Pinout PiCoLAB', 'Installer driver CH340', 'PiCoBOT avancer', 'MicroPython ESP32', 'Garantie'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-chip border border-[var(--border)] bg-bg-card px-3 py-1.5 text-xs text-text-muted-2 transition-colors hover:border-[var(--accent-bd)] hover:text-text-primary"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
