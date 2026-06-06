'use client'

import * as React from 'react'
import { cn } from '../../lib/cn'

export interface ProgressRingProps {
  pct: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function ProgressRing({ pct, size = 48, strokeWidth = 4, className }: ProgressRingProps) {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (pct / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      className={cn('rotate-[-90deg]', className)}
      aria-label={`${pct}% complété`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--accent-bg)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  )
}
