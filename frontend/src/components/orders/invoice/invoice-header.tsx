'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function InvoiceHeader() {
  return (
    <div className="bg-background/80 sticky top-0 z-50 flex items-center justify-between border-b p-4 backdrop-blur-md">
      <Link href="/orders" className="bg-muted/50 hover:bg-muted rounded-full p-2">
        <ArrowLeft className="size-5" />
      </Link>
      <h1 className="text-base font-semibold">Detail Pesanan</h1>
      <div className="w-9" /> {/* Spacer */}
    </div>
  )
}
