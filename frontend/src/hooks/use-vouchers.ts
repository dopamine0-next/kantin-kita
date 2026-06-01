import useSWR from 'swr'

import { getVouchers } from '@/services/voucher/voucher.service'

export function useVouchers() {
  const { data, error, isLoading } = useSWR('vouchers', getVouchers)

  return {
    vouchers: data || [],
    error,
    isLoading,
  }
}
