import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'rover' | 'weather' | 'earth' | 'asteroid'

const variants: Record<BadgeVariant, string> = {
  default: 'border-space-border bg-white/[0.06] text-text-secondary',
  success: 'border-status-success/20 bg-status-success/10 text-status-success',
  danger: 'border-status-danger/20 bg-status-danger/10 text-status-danger',
  warning: 'border-status-warning/20 bg-status-warning/10 text-status-warning',
  info: 'border-status-info/20 bg-status-info/10 text-status-info',
  rover: 'border-accent-rover/20 bg-accent-rover/10 text-accent-rover',
  weather: 'border-accent-weather/20 bg-accent-weather/10 text-accent-weather',
  earth: 'border-accent-earth/20 bg-accent-earth/10 text-accent-earth',
  asteroid: 'border-accent-asteroid/20 bg-accent-asteroid/10 text-accent-asteroid',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <span className={cn('inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold', variants[variant], className)} {...props} />
}
