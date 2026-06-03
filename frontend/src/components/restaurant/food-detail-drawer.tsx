'use client'
import { useState } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { MenuItem } from '@/services/restaurant/restaurant.types'
import { CartItem } from '@/store/useCartStore'

import { FoodDetailInfo } from './food-detail/food-detail-info'
import { FoodVariantForm } from './food-detail/food-variant-form'

interface FoodDetailDrawerProps {
  item: MenuItem | null
  initialCartItem?: CartItem
  isOpen: boolean
  initialStep?: 'info' | 'variant'
  onClose: () => void
  onAddedToCart: (message: string) => void
}

export function FoodDetailDrawer({
  item,
  initialCartItem,
  isOpen,
  initialStep = 'info',
  onClose,
  onAddedToCart,
}: FoodDetailDrawerProps) {
  const [step, setStep] = useState<'info' | 'variant'>(initialStep)

  if (!item) return null

  return (
    <>
      <Drawer
        open={isOpen && step === 'info'}
        onOpenChange={(open) => {
          if (!open && step === 'info') onClose()
        }}
      >
        <DrawerContent className="bg-background/95 border-muted/40 mx-auto max-w-md overflow-hidden rounded-t-3xl border-t backdrop-blur-xl outline-none">
          <FoodDetailInfo item={item} onProceed={() => setStep('variant')} />
        </DrawerContent>
      </Drawer>

      <Dialog
        open={isOpen && step === 'variant'}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent className="bg-background/95 border-muted/40 max-h-[85vh] w-[95%] overflow-y-auto rounded-4xl p-0 backdrop-blur-xl outline-none sm:max-w-md sm:rounded-4xl">
          <FoodVariantForm
            item={item}
            initialCartItem={initialCartItem}
            onBack={() => setStep('info')}
            onClose={onClose}
            onAddedToCart={onAddedToCart}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
