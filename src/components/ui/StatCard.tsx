import type { ComponentType, ReactNode } from 'react'
import type { LucideProps } from 'lucide-react'
import { DataCard } from '@/components/ui/DataCard'
import { cn } from '@/lib/utils'

const accentClasses = {
  rover: 'border-t-accent-rover text-accent-rover',
  weather: 'border-t-accent-weather text-accent-weather',
  earth: 'border-t-accent-earth text-accent-earth',
  asteroid: 'border-t-accent-asteroid text-accent-asteroid',
  danger: 'border-t-status-danger text-status-danger',
} as const

interface StatCardProps {
  icon: ComponentType<LucideProps>
  value: ReactNode
  label: string
  accent: keyof typeof accentClasses
  children?: ReactNode
  valueClassName?: string
}

export function StatCard({ icon: Icon, value, label, accent, children, valueClassName }: StatCardProps) {
  return (
    <DataCard className={cn('flex flex-col gap-2 border-t-[3px]', accentClasses[accent])}>
      <Icon className={cn('h-5 w-5 opacity-80', accentClasses[accent])} />
      <div className={cn('text-3xl font-bold text-text-primary', valueClassName)}>{value}</div>
      <div className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</div>
      {children ? <div className="pt-1">{children}</div> : null}
    </DataCard>
  )
}
