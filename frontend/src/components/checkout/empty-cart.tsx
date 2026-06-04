'use client'

import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EmptyCart() {
  const router = useRouter()

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      <div className="bg-primary/10 text-primary mb-4 flex size-16 items-center justify-center rounded-full">
        <ShoppingBag className="size-8" />
      </div>
      <h2 className="text-foreground text-base font-semibold">Keranjang Anda Kosong</h2>
      <p className="text-muted-foreground/80 mt-2 max-w-[240px] text-xs leading-relaxed">
        Silakan pilih menu lezat terlebih dahulu dari kios kantin terdekat Anda.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-primary hover:bg-primary/95 text-primary-foreground mt-6 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-md"
      >
        Pesan Sekarang
      </button>
    </div>
  )
}
