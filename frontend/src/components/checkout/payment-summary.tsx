'use client'

import { BadgePercent } from 'lucide-react'

interface PaymentSummaryProps {
  subtotal: number
  discount: number
  appFee: number
  total: number
  promoCode?: string
}

export function PaymentSummary({
  subtotal,
  discount,
  appFee,
  total,
  promoCode,
}: PaymentSummaryProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-foreground pl-1 text-xs font-semibold">Rincian Pembayaran</h2>

      <div className="bg-card/30 border-muted/20 flex flex-col gap-2.5 rounded-2xl border p-4">
        <div className="text-muted-foreground/90 flex items-center justify-between text-xs font-semibold">
          <span>Subtotal Makanan</span>
          <span className="text-foreground">Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span className="flex items-center gap-1">
              <BadgePercent className="size-4" />
              <span>Diskon Promo ({promoCode})</span>
            </span>
            <span>-Rp {discount.toLocaleString('id-ID')}</span>
          </div>
        )}

        <div className="text-muted-foreground/90 flex items-center justify-between text-xs font-semibold">
          <span>Biaya Aplikasi (Kantin Service)</span>
          <span className="text-foreground">Rp {appFee.toLocaleString('id-ID')}</span>
        </div>

        <div className="border-muted/20 my-1 border-t border-dashed" />

        <div className="text-foreground flex items-center justify-between text-sm font-semibold">
          <span>Total Tagihan</span>
          <span className="text-primary text-base">Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  )
}
