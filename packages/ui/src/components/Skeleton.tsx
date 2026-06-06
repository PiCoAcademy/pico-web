import * as React from 'react'
import { cn } from '../lib/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={cn('animate-pulse rounded bg-bg-card-2', className)}
    />
  )
}
