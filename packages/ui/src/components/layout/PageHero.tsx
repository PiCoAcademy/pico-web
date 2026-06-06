import * as React from 'react'
import { cn } from '../../lib/cn'
import { Badge } from '../Badge'
import { Container } from './Container'

export interface PageHeroProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  className,
}: PageHeroProps) {
  return (
    <section className={cn('py-20 md:py-28', className)}>
      <Container>
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          {eyebrow && (
            <Badge variant="accent" size="sm" className="mb-5">
              {eyebrow}
            </Badge>
          )}
          <h1 className="font-display text-hero font-black leading-none tracking-[-0.04em] text-text-primary">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-body-lg leading-relaxed text-text-muted-2">
              {description}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
    </section>
  )
}
