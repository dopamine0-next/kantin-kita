import { ArrowLeft, CheckCircle2, Clock, MapPin, ReceiptText } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  return (
    <div className="bg-background flex min-h-screen w-full max-w-md flex-col mx-auto border-x border-muted/50 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 p-4 backdrop-blur-md">
        <Link href="/orders" className="rounded-full bg-muted/50 p-2 hover:bg-muted">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-base font-bold">Detail Pesanan</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="animate-fade-in flex flex-col gap-5 p-4">
        {/* Status Header */}
        <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
          <div className="rounded-full bg-primary/20 p-4 text-primary">
            <ReceiptText className="size-10" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black tracking-tight">Invoice Pesanan</h2>
            <p className="text-muted-foreground text-sm font-medium">ID: {resolvedParams.id.toUpperCase()}</p>
          </div>
          <Badge className="mt-1 px-4 py-1 text-xs">Sedang Diproses</Badge>
        </div>

        {/* Info Card */}
        <Card className="overflow-hidden border-none bg-muted/30 shadow-none">
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-background p-2 shadow-sm">
                <MapPin className="size-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground">Lokasi Ambil</span>
                <span className="text-sm font-bold">Kantin Kita - Blok A</span>
              </div>
            </div>
            <div className="h-px w-full bg-border/50" />
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-background p-2 shadow-sm">
                <Clock className="size-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground">Waktu Pesanan</span>
                <span className="text-sm font-bold">Hari ini, 12:30 WIB</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Summary */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold">Ringkasan Pesanan</h3>
          <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold">
                  2x
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-none">Nasi Goreng Spesial</span>
                  <span className="text-muted-foreground mt-1 text-xs font-medium">Tanpa pedas, ekstra telur</span>
                </div>
              </div>
              <span className="text-sm font-bold">Rp 36.000</span>
            </div>
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold">
                  1x
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-none">Es Teh Manis</span>
                </div>
              </div>
              <span className="text-sm font-bold">Rp 5.000</span>
            </div>

            <div className="my-2 h-px w-full border-t border-dashed" />

            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-muted-foreground">Subtotal</span>
              <span className="font-bold">Rp 41.000</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-muted-foreground">Biaya Layanan</span>
              <span className="font-bold">Rp 2.000</span>
            </div>
            
            <div className="mt-1 flex items-center justify-between rounded-xl bg-primary/10 p-3">
              <span className="font-bold text-primary">Total Bayar</span>
              <span className="text-lg font-black text-primary">Rp 43.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
