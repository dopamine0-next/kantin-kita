'use client'

import { formatRupiah } from '@/lib/utils'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface InvoiceSummaryProps {
  items: OrderItem[]
  totalAmount: number
  discountAmount?: number | null
  appFee?: number | null
}

export function InvoiceSummary({
  items,
  totalAmount,
  discountAmount,
  appFee = 0,
}: InvoiceSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const biayaLayanan = appFee ?? 0

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold">Ringkasan Pesanan</h3>
      <div className="bg-card flex flex-col gap-3 rounded-2xl border p-4 shadow-sm">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold">
                {item.quantity}x
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-none font-bold">{item.name}</span>
              </div>
            </div>
            <span className="text-sm font-bold">{formatRupiah(item.price * item.quantity)}</span>
          </div>
        ))}

        <div className="my-2 h-px w-full border-t border-dashed" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-semibold">Subtotal</span>
          <span className="font-bold">{formatRupiah(subtotal)}</span>
        </div>

        {discountAmount && discountAmount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-green-600">Diskon</span>
            <span className="font-bold text-green-600">-{formatRupiah(discountAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-semibold">Biaya Layanan</span>
          <span className="font-bold">{formatRupiah(biayaLayanan)}</span>
        </div>

        <div className="bg-primary/10 mt-1 flex items-center justify-between rounded-xl p-3">
          <span className="text-primary font-bold">Total Bayar</span>
          <span className="text-primary text-lg font-black">{formatRupiah(totalAmount)}</span>
        </div>
      </div>
    </div>
  )
}
