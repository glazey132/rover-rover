import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const accentClasses = {
  rover: 'bg-accent-rover',
  weather: 'bg-accent-weather',
  earth: 'bg-accent-earth',
  asteroid: 'bg-accent-asteroid',
  blue: 'bg-accent-blue',
} as const

interface PageHeaderProps {
  title: string
  subtitle: string
  accent: keyof typeof accentClasses
  action?: ReactNode
}

export function PageHeader({ title, subtitle, accent, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-10">
      <div className="flex items-start gap-4">
        <div className={cn('mt-1 h-10 w-[3px] rounded-full', accentClasses[accent])} />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">{title}</h1>
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  )
}
