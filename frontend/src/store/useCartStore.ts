import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Promo } from '@/services/voucher/voucher.types'

export interface CartItem {
  id: string // Unique identifier for this line item
  foodId: string
  name: string
  price: number
  image: string
  qty: number
  restaurantId?: string
  variant?: string
  note?: string
  level?: string
  levelPrice?: number
}

interface CartStore {
  items: CartItem[]
  activeMode: 'dine-in' | 'pickup'
  promoApplied: Promo | null
  setActiveMode: (mode: 'dine-in' | 'pickup') => void
  addToCart: (item: Omit<CartItem, 'id' | 'qty'> & { qty?: number }) => void
  updateQty: (id: string, qty: number) => void
  updateVariant: (id: string, variant: string) => void
  updateNote: (id: string, note: string) => void
  applyPromo: (promo: Promo | null) => void
  clearCart: () => void
  removeItem: (id: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      activeMode: 'dine-in',
      promoApplied: null,

      setActiveMode: (mode) => set({ activeMode: mode }),

      addToCart: (newItem) =>
        set((state) => {
          const qtyToAdd = newItem.qty || 1

          const existingIndex = state.items.findIndex(
            (item) =>
              item.foodId === newItem.foodId &&
              item.variant === newItem.variant &&
              item.note === newItem.note &&
              item.level === newItem.level
          )

          if (existingIndex > -1) {
            const updatedItems = [...state.items]
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              qty: updatedItems[existingIndex].qty + qtyToAdd,
            }
            return { items: updatedItems }
          }

          // If not exists, generate a unique ID and add it
          const uniqueId = `${newItem.foodId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
          return {
            items: [
              ...state.items,
              {
                ...newItem,
                id: uniqueId,
                qty: qtyToAdd,
              },
            ],
          }
        }),

      updateQty: (id, qty) =>
        set((state) => {
          if (qty <= 0) {
            // If qty is 0, remove item from state
            return {
              items: state.items.filter((item) => item.id !== id),
            }
          }

          return {
            items: state.items.map((item) => (item.id === id ? { ...item, qty } : item)),
          }
        }),

      updateVariant: (id, variant) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, variant } : item)),
        })),

      updateNote: (id, note) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, note } : item)),
        })),

      applyPromo: (promo) => set({ promoApplied: promo }),

      clearCart: () => set({ items: [], promoApplied: null }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    { name: 'kantin-kita-cart' }
  )
)
