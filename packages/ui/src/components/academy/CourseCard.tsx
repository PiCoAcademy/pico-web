import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Signal } from 'lucide-react'
import { Card } from '../Card'
import { Badge } from '../Badge'

export interface CourseCardProps {
  slug: string
  title: string
  level: 'beginner' | 'intermediate' | 'advanced'
  durationMin: number
  imageUrl?: string
  priceMad?: number
  className?: string
}

const levelLabel = {
  beginner:     { label: 'Débutant',     variant: 'success'  as const },
  intermediate: { label: 'Intermédiaire', variant: 'warning' as const },
  advanced:     { label: 'Avancé',        variant: 'error'   as const },
}

export function CourseCard({
  slug,
  title,
  level,
  durationMin,
  imageUrl,
  priceMad,
  className,
}: CourseCardProps) {
  const { label, variant } = levelLabel[level]
  const hours = Math.floor(durationMin / 60)
  const mins = durationMin % 60
  const duration = hours > 0 ? `${hours}h${mins > 0 ? mins : ''}` : `${mins}min`

  return (
    <Link href={`/course/${slug}`} className={className}>
      <Card variant="interactive" padding="none" className="overflow-hidden">
        {imageUrl && (
          <div className="relative aspect-video bg-bg-card-2">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2">
            <Badge variant={variant} size="xs">{label}</Badge>
          </div>
          <h3 className="mt-2 font-body text-sm font-semibold leading-snug text-text-primary">
            {title}
          </h3>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Clock size={12} strokeWidth={1.75} />
              {duration}
            </span>
            <span className="font-display text-sm font-bold text-[var(--accent)]">
              {priceMad === 0 ? 'Gratuit' : priceMad ? `${priceMad} MAD` : ''}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
