'use client'

import { CreditCard } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'

interface CheckoutFooterProps {
  total: number
  isProcessing: boolean
  onPay: () => void
}

export function CheckoutFooter({ total, isProcessing, onPay }: CheckoutFooterProps) {
  return (
    <div className="border-muted/20 bg-background/95 sticky bottom-0 z-20 border-t px-4 pt-3 pb-4 backdrop-blur-md">
      <motion.div whileTap={{ scale: 0.98 }}>
        <Button
          onClick={onPay}
          disabled={isProcessing}
          className="bg-primary shadow-primary/25 hover:bg-primary/95 disabled:bg-muted text-primary-foreground flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-xs font-semibold shadow-lg"
        >
          <CreditCard className="size-4.5" />
          <span>
            {isProcessing
              ? 'Memproses Pembayaran...'
              : `Bayar Sekarang • Rp ${total.toLocaleString('id-ID')}`}
          </span>
        </Button>
      </motion.div>
    </div>
  )
}
