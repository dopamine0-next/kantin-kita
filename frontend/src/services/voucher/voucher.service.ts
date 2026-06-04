import { fetcher } from '@/lib/fetcher'

import { mapVoucher } from './voucher.mapper'
import { Voucher, VoucherApiResponse } from './voucher.types'

export async function getVouchers(): Promise<Voucher[]> {
  const res = await fetcher<VoucherApiResponse[]>('/vouchers')
  return res.map(mapVoucher)
}
