import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-lg bg-white/[0.05]', className)} {...props} />
}

export function PhotoSkeleton() {
  return <Skeleton className="aspect-video w-full rounded-xl" />
}
