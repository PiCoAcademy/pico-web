import * as React from 'react'
import { cn } from '../lib/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md'
  pill?: boolean
  children?: React.ReactNode
  className?: string
}

const variantStyles = {
  accent:  'bg-[var(--accent-bg)] text-[var(--accent-lt)] border border-[var(--accent-bd)]',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  error:   'bg-red-500/10 text-red-400 border border-red-500/20',
  neutral: 'bg-white/5 text-text-muted-2 border border-white/10',
}

const sizeStyles = {
  xs: 'text-[10px] px-1.5 py-0.5',
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
}

export function Badge({
  variant = 'neutral',
  size = 'sm',
  pill = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center font-body font-semibold uppercase tracking-wider',
        pill ? 'rounded-pill' : 'rounded-chip',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}
