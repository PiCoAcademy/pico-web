import * as React from 'react'
import { cn } from '../lib/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'flat' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
}

const variantStyles = {
  default:
    'border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-[0.25s] ease-out',
  accent:
    'border-t-2 border-t-[var(--accent)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-[0.25s] ease-out',
  flat:
    'border border-[var(--border)]',
  interactive:
    'border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-1 cursor-pointer transition-all duration-[0.25s] ease-out',
}

const paddingStyles = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        'rounded-card bg-bg-card',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
