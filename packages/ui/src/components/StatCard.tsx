'use client'

import * as React from 'react'
import { cn } from '../lib/cn'

export interface StatCardProps {
  value: number
  suffix?: string
  label: string
  description?: string
  className?: string
}

function useCountUp(target: number, duration = 1100) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const started = React.useRef(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // cubic ease-out: 1 - (1-t)^3
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

export function StatCard({ value, suffix = '', label, description, className }: StatCardProps) {
  const { count, ref } = useCountUp(value)

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="font-display text-h1 font-black leading-none tracking-tight text-text-primary">
        {count.toLocaleString('fr-MA')}
        <span className="text-[var(--accent)]">{suffix}</span>
      </div>
      <div className="mt-1 font-body text-sm font-semibold uppercase tracking-widest text-text-muted">
        {label}
      </div>
      {description && (
        <p className="mt-1 text-xs text-text-muted">{description}</p>
      )}
    </div>
  )
}
