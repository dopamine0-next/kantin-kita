'use client'

import { useMemo, useState } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { FoodDetailDrawer } from '@/components/restaurant/food-detail-drawer'
import { useRestaurantsDetails } from '@/hooks/use-restaurants'
import { useVouchers } from '@/hooks/use-vouchers'
import { MenuItem } from '@/services/restaurant/restaurant.types'
import { CartItem, useCartStore } from '@/store/useCartStore'

import { CartItemList } from './cart-item-list'
import { CheckoutFooter } from './checkout-footer'
import { CheckoutHeader } from './checkout-header'
import { EmptyCart } from './empty-cart'
import { ModeSelector } from './mode-selector'
import { PaymentSummary } from './payment-summary'
import { PromoSelector } from './promo-selector'
import { SuccessModal } from './success-modal'

export default function CheckoutContainer() {
  const router = useRouter()
  const {
    items,
    activeMode,
    promoApplied,
    setActiveMode,
    updateQty,
    updateNote,
    applyPromo,
    clearCart,
  } = useCartStore()

  const { restaurants: mockRestaurantsDetails } = useRestaurantsDetails()
  const { vouchers, isLoading: isVouchersLoading } = useVouchers()

  // State local for UI
  const [isPromoDrawerOpen, setIsPromoDrawerOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000))

  // Edit State
  const [selectedCartItem, setSelectedCartItem] = useState<CartItem | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [items])

  const appFee = subtotal > 0 ? 2000 : 0

  const discount = useMemo(() => {
    if (!promoApplied || subtotal === 0) return 0

    const pctDiscount = (subtotal * promoApplied.value) / 100
    // Use maxDiscount from the promo if available, otherwise fallback to old hardcoded logic or no cap
    const cap = promoApplied.maxDiscount || (promoApplied.code === 'DINEIN30' ? 20000 : 15000)
    return Math.min(pctDiscount, cap)
  }, [promoApplied, subtotal])

  const total = Math.max(0, subtotal - discount + appFee)

  const handlePay = () => {
    if (items.length === 0) return
    setIsProcessing(true)

    // Fake progress loading
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccessModalOpen(true)
    }, 1800)
  }

  const handleFinishPayment = () => {
    setIsSuccessModalOpen(false)
    clearCart()
    router.push('/')
  }

  const handleEditItem = (cartItem: CartItem) => {
    // Find the original menu item details
    let foundMenuItem: MenuItem | null = null
    for (const rest of Object.values(mockRestaurantsDetails || {})) {
      const found = rest.menus.find((m) => m.id === cartItem.foodId)
      if (found) {
        foundMenuItem = found
        break
      }
    }

    if (foundMenuItem) {
      setSelectedCartItem(cartItem)
      setSelectedMenuItem(foundMenuItem)
      setIsEditModalOpen(true)
    }
  }

  const handleItemUpdated = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  return (
    <div className="flex flex-1 flex-col pb-6">
      <CheckoutHeader />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="no-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          <ModeSelector activeMode={activeMode} onModeChange={setActiveMode} />

          <CartItemList
            items={items}
            onUpdateQty={updateQty}
            onUpdateNote={updateNote}
            onEditItem={handleEditItem}
          />

          <PromoSelector
            promoApplied={promoApplied}
            discount={discount}
            isDrawerOpen={isPromoDrawerOpen}
            onDrawerOpenChange={setIsPromoDrawerOpen}
            onApplyPromo={applyPromo}
            promos={vouchers}
          />

          <PaymentSummary
            subtotal={subtotal}
            discount={discount}
            appFee={appFee}
            total={total}
            promoCode={promoApplied?.code}
          />
        </div>
      )}

      {items.length > 0 && (
        <CheckoutFooter total={total} isProcessing={isProcessing} onPay={handlePay} />
      )}

      <SuccessModal
        isOpen={isSuccessModalOpen}
        orderNumber={orderNumber}
        total={total}
        activeMode={activeMode}
        onFinish={handleFinishPayment}
      />

      {/* Edit Modal / Drawer reusing FoodDetailDrawer */}
      <FoodDetailDrawer
        item={selectedMenuItem}
        initialCartItem={selectedCartItem || undefined}
        isOpen={isEditModalOpen}
        initialStep="variant"
        onClose={() => setIsEditModalOpen(false)}
        onAddedToCart={handleItemUpdated}
      />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="border-muted/30 bg-card/95 text-foreground fixed right-4 bottom-24 left-4 z-50 mx-auto flex max-w-sm items-center justify-between rounded-xl border px-4 py-3 text-xs font-bold shadow-2xl backdrop-blur-md"
          >
            <span className="flex-1 pr-2 leading-snug">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
