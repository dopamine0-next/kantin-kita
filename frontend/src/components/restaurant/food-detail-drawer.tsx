'use client'
import { useEffect, useState } from 'react'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { MenuItem } from '@/services/restaurant/restaurant.types'
import { FoodDetailInfo } from './food-detail/food-detail-info'
import { FoodVariantForm } from './food-detail/food-variant-form'

interface FoodDetailDrawerProps {
  item: MenuItem | null
  isOpen: boolean
  initialStep?: 'info' | 'variant'
  onClose: () => void
  onAddedToCart: (message: string) => void
}

export function FoodDetailDrawer({ 
  item, 
  isOpen, 
  initialStep = 'info',
  onClose, 
  onAddedToCart 
}: FoodDetailDrawerProps) {
  const [step, setStep] = useState<'info' | 'variant'>(initialStep)

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep)
    }
  }, [isOpen, initialStep])

  if (!item) return null

  return (
    <>
      <Drawer 
        open={isOpen && step === 'info'} 
        onOpenChange={(open) => {
          if (!open && step === 'info') onClose()
        }}
      >
        <DrawerContent className="bg-background/95 border-muted/40 mx-auto max-w-md overflow-hidden rounded-t-[32px] border-t backdrop-blur-xl outline-none">
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
        <DialogContent className="max-h-[85vh] overflow-y-auto w-[95%] sm:max-w-md rounded-[32px] sm:rounded-[32px] bg-background/95 backdrop-blur-xl border-muted/40 outline-none p-0">
          <FoodVariantForm 
            item={item} 
            onBack={() => setStep('info')} 
            onClose={onClose} 
            onAddedToCart={onAddedToCart} 
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
