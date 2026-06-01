'use client'

import { CheckCircle2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/components/ui/button'

interface SuccessModalProps {
  isOpen: boolean
  orderNumber: number
  total: number
  activeMode: 'dine-in' | 'pickup'
  onFinish: () => void
}

export function SuccessModal({
  isOpen,
  orderNumber,
  total,
  activeMode,
  onFinish,
}: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-background border-muted/40 flex w-full max-w-xs flex-col items-center rounded-3xl border p-6 text-center shadow-2xl"
          >
            <div className="mb-4 flex size-16 animate-bounce items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="stroke-background size-9 fill-emerald-500 stroke-2" />
            </div>

            <h3 className="text-foreground text-base font-black tracking-tight">
              Pembayaran Berhasil!
            </h3>

            <p className="text-muted-foreground/80 mt-2 max-w-[200px] text-xs leading-relaxed">
              Pesanan Anda telah diteruskan ke koki kantin. Makanan lezat Anda sedang disiapkan!
            </p>

            <div className="bg-muted/35 border-muted/20 mt-5 flex w-full flex-col gap-2 rounded-xl border p-3.5 text-left">
              <div className="text-muted-foreground/85 flex items-center justify-between text-xs font-bold">
                <span>Metode</span>
                <span className="text-foreground font-black uppercase">Saldo KantinKita</span>
              </div>

              <div className="text-muted-foreground/85 flex items-center justify-between text-xs font-bold">
                <span>Nomor Order</span>
                <span className="text-foreground font-black">#KK-{orderNumber}</span>
              </div>

              <div className="text-muted-foreground/85 flex items-center justify-between text-xs font-bold">
                <span>Tipe Pengambilan</span>
                <span className="text-foreground font-black uppercase">
                  {activeMode === 'dine-in' ? 'Dine-in (Makan di Tempat)' : 'Pickup (Bawa Pulang)'}
                </span>
              </div>

              <div className="border-muted/25 my-0.5 border-t border-dashed" />

              <div className="text-foreground flex items-center justify-between text-xs font-black">
                <span>Total Bayar</span>
                <span className="text-primary font-black">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <Button
              onClick={onFinish}
              className="bg-primary shadow-primary/10 hover:bg-primary/95 text-primary-foreground mt-6 h-11 w-full rounded-xl text-xs font-extrabold shadow-md"
            >
              Kembali ke Beranda
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
