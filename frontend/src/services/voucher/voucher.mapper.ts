import { Voucher, VoucherApiResponse } from './voucher.types'

export function mapVoucher(data: VoucherApiResponse): Voucher {
  return {
    id: data.id,
    code: data.code,
    value: data.value,
    description: data.description,
    minSpend: data.min_spend,
    maxDiscount: data.max_discount,
  }
}
