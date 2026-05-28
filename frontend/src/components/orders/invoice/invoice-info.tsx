'use client'

import { Clock, MapPin } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface InvoiceInfoProps {
  locationBlock?: string
  createdAt: string
}

export function InvoiceInfo({
  locationBlock = 'Kantin Kita - Blok A',
  createdAt,
}: InvoiceInfoProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card className="bg-muted/30 overflow-hidden border-none shadow-none">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-background rounded-full p-2 shadow-sm">
            <MapPin className="text-primary size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs font-semibold">Lokasi Ambil</span>
            <span className="text-sm font-bold">{locationBlock}</span>
          </div>
        </div>
        <div className="bg-border/50 h-px w-full" />
        <div className="flex items-center gap-3">
          <div className="bg-background rounded-full p-2 shadow-sm">
            <Clock className="text-primary size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs font-semibold">Waktu Pesanan</span>
            <span className="text-sm font-bold">{formattedDate} WIB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
