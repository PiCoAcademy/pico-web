import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../lib/cn'

export interface SpinnerProps {
  size?: number
  className?: string
}

export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      strokeWidth={2}
      className={cn('animate-spin text-[var(--accent)]', className)}
    />
  )
}
