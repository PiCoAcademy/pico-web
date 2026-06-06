import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { Card } from './Card'
import { Badge } from './Badge'

export interface ArticleCardProps {
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
  coverUrl?: string
  tags?: string[]
  site?: string
  className?: string
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  publishedAt,
  coverUrl,
  tags = [],
  site,
  className,
}: ArticleCardProps) {
  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const href = site === 'industrial' ? `/blog/${slug}` : `/blog/${slug}`

  return (
    <Link href={href} className={className}>
      <Card variant="interactive" padding="none" className="overflow-hidden h-full flex flex-col">
        {coverUrl && (
          <div className="relative aspect-video flex-shrink-0 bg-bg-card-2">
            <Image src={coverUrl} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="neutral" size="xs">{tag}</Badge>
              ))}
            </div>
          )}
          <h3 className="font-display text-h3 font-bold leading-snug tracking-tight text-text-primary">
            {title}
          </h3>
          {excerpt && (
            <p className="flex-1 text-sm leading-relaxed text-text-muted">{excerpt}</p>
          )}
          {date && (
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <CalendarDays size={12} strokeWidth={1.75} />
              {date}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
