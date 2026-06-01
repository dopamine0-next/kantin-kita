import { Info, Star, ShoppingBag } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'
import { MenuItem } from '@/services/restaurant/restaurant.types'

interface FoodDetailInfoProps {
  item: MenuItem
  onProceed: () => void
}

export function FoodDetailInfo({ item, onProceed }: FoodDetailInfoProps) {
  return (
    <div className="no-scrollbar max-h-[85vh] overflow-y-auto pb-8">
      {/* Main Image Header */}
      <div className="relative h-56 w-full overflow-hidden">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        <div className="from-background via-background/10 absolute inset-0 bg-gradient-to-t to-transparent" />

        {/* Price Badge */}
        <div className="bg-primary/95 text-primary-foreground absolute right-4 bottom-4 rounded-full px-4 py-1.5 text-xs font-extrabold shadow-lg backdrop-blur-md">
          Rp {item.price.toLocaleString('id-ID')}
        </div>
      </div>

      <div className="px-5 pt-3">
        <DrawerHeader className="px-0 pt-0 text-left">
          <div className="flex items-center justify-between gap-2">
            <DrawerTitle className="text-foreground text-lg leading-tight font-black tracking-tight">
              {item.name}
            </DrawerTitle>

            {item.rating && (
              <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-0.5 text-xs font-extrabold text-amber-600">
                <Star className="size-3.5 fill-amber-500 stroke-none" />
                <span>{item.rating}</span>
              </div>
            )}
          </div>
          <DrawerDescription className="text-muted-foreground/85 mt-1 text-xs leading-relaxed font-medium">
            {item.description}
          </DrawerDescription>
        </DrawerHeader>

        {item.salesCount && (
          <div className="text-muted-foreground bg-muted/30 border-muted/20 mt-1.5 flex max-w-max items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-bold">
            <Info className="text-muted-foreground/70 size-3" />
            <span>Alternatif Terlaris • {item.salesCount}</span>
          </div>
        )}

        <div className="mt-8 border-t border-muted/30 pt-4">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onProceed}
              className="bg-primary flex h-10.5 w-full items-center justify-center gap-2 rounded-2xl text-xs font-extrabold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30"
            >
              <ShoppingBag className="size-4" />
              <span>Pesan Sekarang</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
