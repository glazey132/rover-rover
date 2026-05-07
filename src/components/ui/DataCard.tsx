import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface DataCardProps extends HTMLAttributes<HTMLDivElement> {
  clickable?: boolean
}

export function DataCard({ className, clickable, ...props }: DataCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-space-border bg-space-surface p-6',
        clickable && 'cursor-pointer transition-colors duration-200 hover:border-space-border-strong',
        className,
      )}
      {...props}
    />
  )
}
