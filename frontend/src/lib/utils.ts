import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num)
}

export const formatReviewCount = (count: number): string => {
  if (count >= 1000) {
    const ribuan = count / 1000
    return ribuan % 1 === 0 ? `${ribuan}rb` : `${ribuan.toFixed(1)}rb`
  }
  return String(count)
}
