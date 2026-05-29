'use client'
import { useEffect, useMemo, useState } from 'react'

import { Check, Info, Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Textarea } from '@/components/ui/textarea'
import { MenuItem } from '@/services/restaurant/restaurant.types'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'

interface FoodDetailDrawerProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onAddedToCart: (message: string) => void
}

const SUGAR_LEVELS = [
  { label: 'Less Sugar (70%)', price: 0 },
  { label: 'Normal Sugar (100%)', price: 0 },
  { label: 'Extra Sugar', price: 2000 },
]

const SPICY_LEVELS = [
  { label: 'Level 0 (Tidak Pedas)', price: 0 },
  { label: 'Level 1 (Sedang)', price: 0 },
  { label: 'Level 2 (Pedas)', price: 0 },
  { label: 'Level 3 (Extra Pedas)', price: 2000 },
]

const DRINK_ADDONS = [
  { name: 'Extra Espresso Shot', price: 5000 },
  { name: 'Cincau / Grass Jelly', price: 2000 },
  { name: 'Boba Pearls', price: 3000 },
  { name: 'Extra Creamer', price: 3000 },
]

const FOOD_ADDONS = [
  { name: 'Nasi Putih Ekstra', price: 5000 },
  { name: 'Tahu & Tempe Goreng', price: 3000 },
  { name: 'Telor Ceplok Setengah Matang', price: 4000 },
  { name: 'Kerupuk Udang Renyah', price: 2000 },
]

export function FoodDetailDrawer({ item, isOpen, onClose, onAddedToCart }: FoodDetailDrawerProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const router = useRouter()

  const [qty, setQty] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([])
  const [note, setNote] = useState('')

  // Determine if it is a beverage or sweet toast
  const isBeverage = useMemo(() => {
    if (!item) return false
    const name = item.name.toLowerCase()
    const category = item.category.toLowerCase()
    return (
      category.includes('minuman') ||
      category.includes('kopi') ||
      category.includes('teh') ||
      category.includes('toast') ||
      category.includes('roti') ||
      name.includes('kopi') ||
      name.includes('es teh') ||
      name.includes('teh') ||
      name.includes('jus') ||
      name.includes('avocado') ||
      name.includes('americano') ||
      name.includes('latte')
    )
  }, [item])

  // Reset state when drawer is opened with a new item
  useEffect(() => {
    if (item) {
      setQty(1)
      setSelectedVariant(item.variants && item.variants.length > 0 ? item.variants[0] : '')
      setSelectedLevel(isBeverage ? 'Normal Sugar (100%)' : 'Level 1 (Sedang)')
      setSelectedAddons([])
      setNote('')
    }
  }, [item, isOpen, isBeverage])

  if (!item) return null

  const handleIncrement = () => setQty((prev) => prev + 1)
  const handleDecrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1))

  // Toggle addons
  const handleToggleAddon = (addon: { name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.name === addon.name)
      if (exists) {
        return prev.filter((a) => a.name !== addon.name)
      } else {
        return [...prev, addon]
      }
    })
  }

  const activeLevels = isBeverage ? SUGAR_LEVELS : SPICY_LEVELS
  const activeAddons = isBeverage ? DRINK_ADDONS : FOOD_ADDONS

  // Calculate dynamic pricing
  const levelPrice = activeLevels.find((l) => l.label === selectedLevel)?.price || 0
  const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0)
  const singleItemPrice = item.price + levelPrice + addonsPrice
  const totalPrice = singleItemPrice * qty

  const handleAddToCart = () => {
    addToCart({
      foodId: item.id,
      name: item.name,
      price: singleItemPrice, // save combined price as the item's purchase price
      image: item.image,
      variant: selectedVariant || undefined,
      level: selectedLevel || undefined,
      levelPrice: levelPrice || undefined,
      addons: selectedAddons.length > 0 ? selectedAddons : undefined,
      note: note.trim() || undefined,
      qty,
    })

    const details: string[] = []
    if (selectedVariant) details.push(selectedVariant)
    if (selectedLevel) details.push(selectedLevel)
    if (selectedAddons.length > 0) details.push(`${selectedAddons.length} Ekstra`)

    const detailsStr = details.length > 0 ? ` (${details.join(', ')})` : ''
    onAddedToCart(`✓ ${qty}x ${item.name}${detailsStr} ditambahkan ke keranjang!`)
    onClose()
    router.push('/checkout')
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-background/95 border-muted/40 mx-auto max-w-md overflow-hidden rounded-t-[32px] border-t backdrop-blur-xl outline-none">
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
                  <div className="gap-0.8 flex shrink-0 items-center rounded-lg bg-amber-500/10 px-2 py-0.5 text-[10px] font-extrabold text-amber-600">
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
              <div className="text-muted-foreground bg-muted/30 border-muted/20 mt-1.5 flex max-w-max items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[9px] font-bold">
                <Info className="text-muted-foreground/70 size-3" />
                <span>Alternatif Terlaris • {item.salesCount}</span>
              </div>
            )}

            {/* 1. Base Variants (Chips selection if any) */}
            {item.variants && item.variants.length > 0 && (
              <div className="mt-5.5">
                <h4 className="text-foreground mb-2.5 text-[11px] font-black tracking-wider uppercase">
                  Pilih Ukuran / Porsi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.variants.map((variant) => {
                    const isSelected = selectedVariant === variant
                    return (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={cn(
                          'rounded-xl border px-3.5 py-2 text-xs font-bold transition-all duration-300 active:scale-95',
                          isSelected
                            ? 'bg-primary border-primary text-primary-foreground shadow-primary/10 shadow-md'
                            : 'bg-card border-muted/30 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                        )}
                      >
                        {variant}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 2. Sugar / Spicy Level (Radio style with pricing) */}
            <div className="mt-5.5">
              <h4 className="text-foreground mb-2.5 text-[11px] font-black tracking-wider uppercase">
                {isBeverage ? 'Tingkat Kemanisan (Sugar Level)' : 'Tingkat Kepedasan (Spicy Level)'}
              </h4>
              <div className="bg-card/25 border-muted/20 flex flex-col gap-2 rounded-2xl border p-3">
                {activeLevels.map((lvl) => {
                  const isSelected = selectedLevel === lvl.label
                  return (
                    <button
                      key={lvl.label}
                      onClick={() => setSelectedLevel(lvl.label)}
                      className={cn(
                        'group flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-[0.99]',
                        isSelected
                          ? 'bg-primary/5 border-primary/45'
                          : 'hover:bg-muted/15 border-transparent bg-transparent'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom Radio Circle */}
                        <div
                          className={cn(
                            'flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors',
                            isSelected
                              ? 'border-primary bg-primary'
                              : 'border-muted-foreground/35 bg-transparent'
                          )}
                        >
                          {isSelected && <div className="size-2 rounded-full bg-white" />}
                        </div>
                        <span
                          className={cn(
                            'text-xs font-bold transition-colors',
                            isSelected
                              ? 'text-primary'
                              : 'text-muted-foreground group-hover:text-foreground'
                          )}
                        >
                          {lvl.label}
                        </span>
                      </div>

                      {/* Price Tag */}
                      <span
                        className={cn(
                          'rounded-lg border px-2 py-0.5 text-[10px] font-black',
                          lvl.price > 0
                            ? isSelected
                              ? 'border-amber-500/20 bg-amber-500/10 text-amber-600'
                              : 'bg-muted/60 border-muted text-muted-foreground'
                            : 'text-muted-foreground/40 border-transparent font-semibold'
                        )}
                      >
                        {lvl.price > 0 ? `+Rp ${lvl.price.toLocaleString('id-ID')}` : 'Gratis'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Extra Add-ons (Checkbox style) */}
            <div className="mt-5.5">
              <h4 className="text-foreground mb-2.5 text-[11px] font-black tracking-wider uppercase">
                Tambahan Ekstra (Add-ons)
              </h4>
              <div className="bg-card/25 border-muted/20 flex flex-col gap-2 rounded-2xl border p-3">
                {activeAddons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.name === addon.name)
                  return (
                    <button
                      key={addon.name}
                      onClick={() => handleToggleAddon(addon)}
                      className={cn(
                        'group flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-[0.99]',
                        isChecked
                          ? 'bg-primary/5 border-primary/45'
                          : 'hover:bg-muted/15 border-transparent bg-transparent'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom Checkbox Box */}
                        <div
                          className={cn(
                            'flex size-4.5 shrink-0 items-center justify-center rounded-md border transition-colors',
                            isChecked
                              ? 'border-primary bg-primary text-white'
                              : 'border-muted-foreground/35 bg-transparent'
                          )}
                        >
                          {isChecked && <Check className="size-3.5 stroke-[4]" />}
                        </div>
                        <span
                          className={cn(
                            'text-xs font-bold transition-colors',
                            isChecked
                              ? 'text-primary'
                              : 'text-muted-foreground group-hover:text-foreground'
                          )}
                        >
                          {addon.name}
                        </span>
                      </div>

                      {/* Price Tag */}
                      <span
                        className={cn(
                          'rounded-lg border px-2 py-0.5 text-[10px] font-black',
                          isChecked
                            ? 'bg-primary/10 border-primary/20 text-primary'
                            : 'bg-muted/60 border-muted text-muted-foreground'
                        )}
                      >
                        +Rp {addon.price.toLocaleString('id-ID')}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. Note Area Section */}
            <div className="mt-5.5">
              <h4 className="text-foreground mb-2 text-[11px] font-black tracking-wider uppercase">
                Catatan Khusus Koki (Opsional)
              </h4>
              <Textarea
                placeholder="Contoh: Kuah dipisah, sendok plastik, tidak pakai bawang..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-card/40 border-muted/30 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/45 min-h-[60px] resize-none rounded-xl text-xs"
                maxLength={100}
              />
              <div className="text-muted-foreground/50 mt-1 text-right text-[8px] font-medium">
                {note.length}/100 karakter
              </div>
            </div>

            {/* 5. Bottom Controls Area (Qty & Add) */}
            <div className="border-muted/30 mt-6 flex items-center justify-between gap-4 border-t pt-4">
              {/* Quantity Selector with subtle bounces */}
              <div className="bg-muted/40 border-muted/20 flex shrink-0 items-center gap-1.5 rounded-2xl border p-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDecrement}
                  className="bg-card text-foreground active:bg-muted flex size-8.5 items-center justify-center rounded-xl shadow-sm transition-colors"
                  aria-label="Kurangi jumlah"
                >
                  <Minus className="size-3.5" />
                </motion.button>

                <span className="text-foreground w-8 text-center text-xs font-black">{qty}</span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleIncrement}
                  className="bg-card text-foreground active:bg-muted flex size-8.5 items-center justify-center rounded-xl shadow-sm transition-colors"
                  aria-label="Tambah jumlah"
                >
                  <Plus className="size-3.5" />
                </motion.button>
              </div>

              {/* Add to Cart Button */}
              <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={handleAddToCart}
                  className="bg-primary shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 flex h-10.5 w-full items-center justify-center gap-2 rounded-2xl text-xs font-extrabold tracking-wide text-white shadow-lg"
                >
                  <ShoppingBag className="size-4" />
                  <span>Masukkan • Rp {totalPrice.toLocaleString('id-ID')}</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
