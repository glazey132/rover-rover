import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon'
}

export function Button({ className, variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40',
        variant === 'primary' && 'bg-accent-blue px-4 py-2 text-white hover:bg-blue-500',
        variant === 'ghost' &&
          'border border-space-border bg-transparent px-4 py-2 text-text-secondary hover:border-space-border-strong hover:bg-white/[0.06] hover:text-text-primary',
        variant === 'icon' && 'p-2 text-text-muted hover:bg-white/[0.06] hover:text-text-primary',
        className,
      )}
      {...props}
    />
  )
}
