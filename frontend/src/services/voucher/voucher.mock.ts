import { VoucherApiResponse } from './voucher.types'

export const MOCK_VOUCHER_API_RESPONSE: VoucherApiResponse[] = [
  {
    id: 'v1',
    code: 'HEMAT20',
    value: 20,
    description: 'Diskon 20% khusus makanan favoritmu (Maks. Rp 15.000)',
    max_discount: 15000,
  },
  {
    id: 'v2',
    code: 'DISKON10',
    value: 10,
    description: 'Potongan harga langsung 10% tanpa min. belanja (Maks. Rp 5.000)',
    max_discount: 5000,
  },
  {
    id: 'v3',
    code: 'DINEIN30',
    value: 30,
    description: 'Hemat 30% khusus Makan di Tempat (Maks. Rp 20.000)',
    max_discount: 20000,
  },
]
