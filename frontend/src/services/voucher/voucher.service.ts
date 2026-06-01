import { mapVoucher } from './voucher.mapper'
import { MOCK_VOUCHER_API_RESPONSE } from './voucher.mock'
import { Voucher } from './voucher.types'

export async function getVouchers(): Promise<Voucher[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return MOCK_VOUCHER_API_RESPONSE.map(mapVoucher)
}
