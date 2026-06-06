import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../lib/cn'

// Minimal Slot implementation for asChild pattern
function Slot({ children, ...slotProps }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  if (!React.isValidElement(children)) return <>{children}</>
  const childProps = (children as React.ReactElement<Record<string, unknown>>).props as Record<string, unknown>
  return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ...slotProps,
    ...childProps,
    className: cn(
      (slotProps as { className?: string }).className,
      (childProps as { className?: string }).className
    ),
  })
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  asChild?: boolean
  children?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const variantStyles = {
  primary:
    'bg-[var(--accent)] text-white hover:brightness-110 border border-transparent',
  secondary:
    'bg-bg-card-2 text-text-primary border border-[var(--border)] hover:border-[var(--border-strong)]',
  ghost:
    'bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-bd)] hover:brightness-110',
  danger:
    'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
  link:
    'bg-transparent text-[var(--accent)] border-none hover:underline px-0',
}

const sizeStyles = {
  sm:  'h-8  px-4 text-xs  gap-1.5',
  md:  'h-10 px-5 text-sm  gap-2',
  lg:  'h-12 px-6 text-base gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  asChild = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  const baseClass = cn(
    'inline-flex items-center justify-center rounded-btn font-body font-semibold',
    'transition-all duration-[0.18s] ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  const inner = (
    <>
      {loading && <Loader2 size={16} className="animate-spin" strokeWidth={2} />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  )

  if (asChild) {
    return <Slot className={baseClass}>{children}</Slot>
  }

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={baseClass}
    >
      {loading && <Loader2 size={16} className="animate-spin" strokeWidth={2} />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  )
}
