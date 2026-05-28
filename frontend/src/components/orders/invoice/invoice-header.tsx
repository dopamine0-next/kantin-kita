'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function InvoiceHeader() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 p-4 backdrop-blur-md">
      <Link href="/orders" className="rounded-full bg-muted/50 p-2 hover:bg-muted">
        <ArrowLeft className="size-5" />
      </Link>
      <h1 className="text-base font-bold">Detail Pesanan</h1>
      <div className="w-9" /> {/* Spacer */}
    </div>
  )
}
