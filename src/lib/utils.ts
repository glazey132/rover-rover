import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, maximumFractionDigits = 0) {
  return value.toLocaleString(undefined, { maximumFractionDigits })
}

export function toISODate(date: Date) {
  return date.toISOString().split('T')[0] ?? ''
}
