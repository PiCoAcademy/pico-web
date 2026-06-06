import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card } from './Card'
import { Badge } from './Badge'
import { cn } from '../lib/cn'

const sectorEmoji: Record<string, string> = {
  textile:     '🧵',
  cnc:         '⚙️',
  lpg:         '🔥',
  parking:     '🅿️',
  water:       '💧',
  agriculture: '🌱',
  energy:      '⚡',
  other:       '🔧',
}

export interface CaseStudyCardProps {
  slug: string
  title: string
  sector: string
  techStack: string[]
  excerpt?: string
  isFeatured?: boolean
  className?: string
}

export function CaseStudyCard({
  slug,
  title,
  sector,
  techStack,
  excerpt,
  isFeatured,
  className,
}: CaseStudyCardProps) {
  const emoji = sectorEmoji[sector] ?? sectorEmoji.other

  return (
    <Link href={`/projects/${slug}`} className={cn('block group', className)}>
      <Card variant={isFeatured ? 'accent' : 'interactive'} className="h-full">
        <div className="flex items-start justify-between gap-4">
          <span className="text-2xl" role="img" aria-label={sector}>{emoji}</span>
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            className="mt-1 flex-shrink-0 text-text-muted transition-transform duration-[0.18s] group-hover:translate-x-1 group-hover:text-[var(--accent)]"
          />
        </div>
        <h3 className="mt-3 font-display text-h3 font-bold leading-snug tracking-tight text-text-primary">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{excerpt}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="neutral" size="xs">{tech}</Badge>
          ))}
        </div>
      </Card>
    </Link>
  )
}
