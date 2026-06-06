import * as React from 'react'
import { cn } from '../../lib/cn'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: 'default' | 'narrow' | 'wide'
  children?: React.ReactNode
  className?: string
}

const widthStyles = {
  default: 'max-w-[1280px]',
  narrow:  'max-w-[860px]',
  wide:    'max-w-[1440px]',
}

export function Container({ width = 'default', className, children, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        'mx-auto w-full px-4 sm:px-6 xl:px-10',
        widthStyles[width],
        className
      )}
    >
      {children}
    </div>
  )
}
