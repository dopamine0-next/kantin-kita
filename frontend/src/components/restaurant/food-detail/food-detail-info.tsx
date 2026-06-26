import { Clock, ShoppingBag, Star } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { MenuItem } from '@/services/restaurant/restaurant.types'

interface FoodDetailInfoProps {
  item: MenuItem
  isOpen: boolean
  onProceed: () => void
}

export function FoodDetailInfo({ item, isOpen, onProceed }: FoodDetailInfoProps) {
  const isClosed = !isOpen
  return (
    <div className="no-scrollbar max-h-[85vh] overflow-y-auto pb-8">
      {/* Main Image Header */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image src={item.image} alt={item.name} fill sizes="100vw" className="object-cover" />
        <div className="from-background via-background/10 absolute inset-0 bg-gradient-to-t to-transparent" />

        {/* Price Badge */}
        <div className="bg-primary/95 text-primary-foreground absolute right-4 bottom-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md">
          Rp {item.price.toLocaleString('id-ID')}
        </div>
      </div>

      {isClosed && (
        <div className="bg-destructive/10 mx-5 mt-3 flex items-center gap-2 rounded-xl px-4 py-2.5">
          <Clock className="text-destructive size-4 shrink-0" />
          <span className="text-destructive text-xs font-semibold">
            Restoran sedang tutup. Kamu tidak bisa memesan saat ini.
          </span>
        </div>
      )}

      <div className="px-5 pt-3">
        <DrawerHeader className="px-0 pt-0 text-left">
          <div className="flex items-center justify-between gap-2">
            <DrawerTitle className="text-foreground text-lg leading-tight font-semibold">
              {item.name}
            </DrawerTitle>

            {item.rating && item.ratingCount != null && item.ratingCount >= 10 && (
              <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600">
                <Star className="size-3.5 fill-amber-500 stroke-none" />
                <span>{item.rating}</span>
              </div>
            )}
          </div>
          <DrawerDescription className="text-muted-foreground/85 mt-1 text-xs leading-relaxed font-medium">
            {item.description}
          </DrawerDescription>
        </DrawerHeader>

        <div className="border-muted/30 mt-8 border-t pt-4">
          <motion.div whileTap={isClosed ? undefined : { scale: 0.98 }}>
            <Button
              onClick={isClosed ? undefined : onProceed}
              disabled={isClosed}
              className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 flex h-10.5 w-full items-center justify-center gap-2 rounded-2xl text-xs font-semibold shadow-lg disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isClosed ? (
                <>
                  <Clock className="size-4" />
                  <span>Restoran Sedang Tutup</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" />
                  <span>Pesan Sekarang</span>
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
