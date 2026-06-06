import * as React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} className="text-text-muted" strokeWidth={1.75} />}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-text-primary' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
