'use client'

import { ChevronLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

export function CheckoutHeader() {
  const router = useRouter()

  return (
    <div className="bg-background/95 border-muted/20 sticky top-0 z-30 flex items-center justify-between border-b px-4 pt-6 pb-3 backdrop-blur-md">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => router.back()}
        className="bg-muted/40 text-foreground active:bg-muted flex size-9 items-center justify-center rounded-full transition-colors"
        aria-label="Kembali"
      >
        <ChevronLeft className="mr-0.5 size-5" />
      </motion.button>
      <h1 className="text-foreground text-sm font-semibold">Konfirmasi Pembayaran</h1>
      <div className="size-9" /> {/* Spacer */}
    </div>
  )
}
