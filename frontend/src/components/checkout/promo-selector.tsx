'use client'

import { BadgePercent, ChevronRight, Ticket } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { Promo } from '@/services/voucher/voucher.types'

interface PromoSelectorProps {
  promoApplied: Promo | null
  discount: number
  isDrawerOpen: boolean
  onDrawerOpenChange: (open: boolean) => void
  onApplyPromo: (promo: Promo | null) => void
  promos: Promo[]
}

export function PromoSelector({
  promoApplied,
  discount,
  isDrawerOpen,
  onDrawerOpenChange,
  onApplyPromo,
  promos,
}: PromoSelectorProps) {
  return (
    <>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onDrawerOpenChange(true)}
        className={cn(
          'relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-300',
          promoApplied
            ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600'
            : 'bg-card border-muted/20 text-foreground'
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl',
              promoApplied ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'
            )}
          >
            <Ticket className="size-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold">
              {promoApplied ? `Promo ${promoApplied.code} Terpasang` : 'Pakai Promo Lebih Hemat'}
            </span>
            <span className="text-muted-foreground/80 text-xs font-medium">
              {promoApplied ? promoApplied.description : 'Ada voucher diskon s.d 30% menunggu'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold">
          {promoApplied ? (
            <span className="text-emerald-600">-Rp {discount.toLocaleString('id-ID')}</span>
          ) : (
            <span className="text-primary hover:underline">Pilih</span>
          )}
          <ChevronRight className="text-muted-foreground/60 size-4" />
        </div>
      </motion.button>

      <Drawer open={isDrawerOpen} onOpenChange={onDrawerOpenChange}>
        <DrawerContent className="bg-background/95 border-muted/40 mx-auto max-w-md overflow-hidden rounded-t-3xl border-t backdrop-blur-xl outline-none">
          <div className="p-5 pb-8">
            <DrawerHeader className="px-0 pt-0 text-left">
              <DrawerTitle className="text-foreground text-base font-semibold">
                Voucher & Promo Hemat
              </DrawerTitle>
              <DrawerDescription className="text-muted-foreground/80 text-xs font-medium">
                Pilih voucher diskon terbaik untuk pesanan kantin lezat Anda.
              </DrawerDescription>
            </DrawerHeader>

            <div className="mt-4 flex flex-col gap-3">
              {promos.map((promo) => {
                const isSelected = promoApplied?.code === promo.code
                return (
                  <button
                    key={promo.code}
                    onClick={() => {
                      onApplyPromo(isSelected ? null : promo)
                      onDrawerOpenChange(false)
                    }}
                    className={cn(
                      'flex w-full items-start justify-between rounded-xl border p-4 text-left transition-all duration-300',
                      isSelected
                        ? 'border-emerald-500/25 bg-emerald-500/5'
                        : 'bg-card/40 border-muted/20 hover:border-primary/15'
                    )}
                  >
                    <div className="flex gap-3">
                      <div
                        className={cn(
                          'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg',
                          isSelected
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-primary/10 text-primary'
                        )}
                      >
                        <BadgePercent className="size-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground flex items-center gap-1.5 text-xs font-semibold">
                          {promo.code}
                          {isSelected && (
                            <span className="text-primary-foreground rounded-sm bg-emerald-500 px-1 py-0.5 text-xs font-semibold">
                              Aktif
                            </span>
                          )}
                        </span>
                        <span className="text-muted-foreground mt-1 text-xs leading-relaxed font-medium">
                          {promo.description}
                        </span>
                      </div>
                    </div>

                    <div className="border-muted-foreground/30 mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border">
                      {isSelected && <div className="size-3 rounded-full bg-emerald-500" />}
                    </div>
                  </button>
                )
              })}
            </div>

            <DrawerFooter className="px-0 pt-6">
              <Button
                variant="outline"
                onClick={() => onDrawerOpenChange(false)}
                className="border-muted/30 h-11 w-full rounded-xl text-xs font-semibold"
              >
                Tutup
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
