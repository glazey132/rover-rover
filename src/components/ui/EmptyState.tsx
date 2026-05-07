import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

interface EmptyStateProps {
  icon: ComponentType<LucideProps>
  title: string
  message: string
}

export function EmptyState({ icon: Icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <Icon className="h-10 w-10 text-text-muted" />
      <div>
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        <p className="mt-1 max-w-sm text-sm text-text-secondary">{message}</p>
      </div>
    </div>
  )
}
