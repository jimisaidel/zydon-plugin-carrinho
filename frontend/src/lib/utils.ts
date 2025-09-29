import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function to merge class names
 * This is a simplified version for class name utilities
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format currency values
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Format date values
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

/**
 * Calculate time difference in hours
 */
export function getHoursDifference(date1: string | Date, date2: string | Date = new Date()): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60)
}
