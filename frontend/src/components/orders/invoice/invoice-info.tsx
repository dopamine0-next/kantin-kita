'use client'

import { Clock, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface InvoiceInfoProps {
  locationBlock?: string
  createdAt: string
}

export function InvoiceInfo({ locationBlock = 'Kantin Kita - Blok A', createdAt }: InvoiceInfoProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card className="overflow-hidden border-none bg-muted/30 shadow-none">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-background p-2 shadow-sm">
            <MapPin className="size-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-muted-foreground">Lokasi Ambil</span>
            <span className="text-sm font-bold">{locationBlock}</span>
          </div>
        </div>
        <div className="h-px w-full bg-border/50" />
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-background p-2 shadow-sm">
            <Clock className="size-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-muted-foreground">Waktu Pesanan</span>
            <span className="text-sm font-bold">{formattedDate} WIB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
