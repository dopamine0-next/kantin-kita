export interface VoucherApiResponse {
  id: string
  code: string
  value: number // Always percentage
  description: string
  min_spend?: number
  max_discount?: number
}

export interface Voucher {
  id: string
  code: string
  value: number // Always percentage
  description: string
  minSpend?: number
  maxDiscount?: number
}

// Alias for backwards compatibility if needed, or just use Voucher
export type Promo = Voucher
