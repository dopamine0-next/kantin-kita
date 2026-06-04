'use client'

import { useEffect, useState } from 'react'

import { ChevronLeft } from 'lucide-react'

import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { AddonOption, ChoiceOption, MenuItem } from '@/services/restaurant/restaurant.types'
import { CartItem, useCartStore } from '@/store/useCartStore'

import { CustomizationOptions } from './customization-options'
import { FoodVariantFooter } from './food-variant-footer'
import { VariantSelector } from './variant-selector'

interface FoodVariantFormProps {
  item: MenuItem
  initialCartItem?: CartItem
  onBack: () => void
  onClose: () => void
  onAddedToCart: (message: string) => void
}

export function FoodVariantForm({
  item,
  initialCartItem,
  onBack,
  onClose,
  onAddedToCart,
}: FoodVariantFormProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const removeItem = useCartStore((state) => state.removeItem)

  const [qty, setQty] = useState(initialCartItem?.qty || 1)
  const [selectedVariant, setSelectedVariant] = useState<string>(initialCartItem?.variant || '')
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({})
  const [selectedAddons, setSelectedAddons] = useState<Record<string, AddonOption[]>>({})
  const [note, setNote] = useState(initialCartItem?.note || '')

  useEffect(() => {
    if (!initialCartItem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQty(1)
      setSelectedVariant(item.variants && item.variants.length > 0 ? item.variants[0] : '')
      setNote('')
    }

    // Initialize choices and addons from customizations
    const initialChoices: Record<string, string> = {}
    const initialAddons: Record<string, AddonOption[]> = {}

    item.customizations?.forEach((cust) => {
      if (cust.type === 'choice') {
        const savedChoice = initialCartItem?.level
        initialChoices[cust.title] = savedChoice || (cust.options[0] as ChoiceOption).label
      } else {
        const savedAddons =
          initialCartItem?.addons?.filter((a) =>
            cust.options.some((opt) => (opt as AddonOption).name === a.name)
          ) || []
        initialAddons[cust.title] = savedAddons as AddonOption[]
      }
    })

    setSelectedChoices(initialChoices)
    setSelectedAddons(initialAddons)
  }, [item, initialCartItem])

  const handleIncrement = () => setQty((prev) => prev + 1)
  const handleDecrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1))

  const handleToggleAddon = (custTitle: string, addon: AddonOption) => {
    setSelectedAddons((prev) => {
      const current = prev[custTitle] || []
      const exists = current.some((a) => a.name === addon.name)
      if (exists) {
        return { ...prev, [custTitle]: current.filter((a) => a.name !== addon.name) }
      } else {
        return { ...prev, [custTitle]: [...current, addon] }
      }
    })
  }

  const handleSelectChoice = (custTitle: string, label: string) => {
    setSelectedChoices((prev) => ({ ...prev, [custTitle]: label }))
  }

  // Calculate prices
  const choicesPrice = Object.entries(selectedChoices).reduce((sum, [title, label]) => {
    const cust = item.customizations?.find((c) => c.title === title)
    const option = cust?.options.find((o) => (o as ChoiceOption).label === label) as ChoiceOption
    return sum + (option?.price || 0)
  }, 0)

  const addonsPrice = Object.values(selectedAddons)
    .flat()
    .reduce((sum, a) => sum + a.price, 0)

  const singleItemPrice = item.price + choicesPrice + addonsPrice
  const totalPrice = singleItemPrice * qty

  const handleAddToCart = () => {
    const allAddons = Object.values(selectedAddons).flat()

    // If we are editing, remove the old one first
    if (initialCartItem) {
      removeItem(initialCartItem.id)
    }

    addToCart({
      foodId: item.id,
      name: item.name,
      price: singleItemPrice,
      image: item.image,
      restaurantId: item.restaurantId,
      variant: selectedVariant || undefined,
      // For legacy/simple compatibility we take the first choice if available as 'level'
      level: Object.values(selectedChoices)[0],
      levelPrice: choicesPrice,
      addons: allAddons.length > 0 ? allAddons : undefined,
      note: note.trim() || undefined,
      qty,
    })

    const details: string[] = []
    if (selectedVariant) details.push(selectedVariant)
    Object.values(selectedChoices).forEach((c) => details.push(c))
    if (allAddons.length > 0) details.push(`${allAddons.length} Ekstra`)

    const detailsStr = details.length > 0 ? ` (${details.join(', ')})` : ''
    const actionText = initialCartItem ? 'diperbarui' : 'ditambahkan ke keranjang'
    onAddedToCart(`✓ ${qty}x ${item.name}${detailsStr} ${actionText}!`)
    onClose()
  }

  return (
    <div className="no-scrollbar max-h-[85vh] overflow-y-auto px-5 pt-6 pb-8">
      <DialogHeader className="flex flex-row items-center gap-3 space-y-0 px-0 pt-0 text-left">
        <button
          onClick={onBack}
          className="bg-card text-muted-foreground border-muted/30 flex size-8 shrink-0 items-center justify-center rounded-full border shadow-sm"
        >
          <ChevronLeft className="size-4" />
        </button>
        <DialogTitle className="text-foreground text-lg leading-tight font-black tracking-tight">
          Pilihan Varian
        </DialogTitle>
      </DialogHeader>

      <VariantSelector
        variants={item.variants || []}
        selectedVariant={selectedVariant}
        onSelect={setSelectedVariant}
      />

      <CustomizationOptions
        customizations={item.customizations || []}
        selectedChoices={selectedChoices}
        selectedAddons={selectedAddons}
        onSelectChoice={handleSelectChoice}
        onToggleAddon={handleToggleAddon}
      />

      <div className="mt-6">
        <h4 className="text-foreground mb-2 text-xs font-black tracking-wider uppercase">
          Catatan Khusus
        </h4>
        <Textarea
          placeholder="Contoh: Kuah dipisah, tidak pakai bawang..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-card/40 border-muted/30 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/45 min-h-15 resize-none rounded-xl text-xs"
          maxLength={100}
        />
      </div>

      <FoodVariantFooter
        qty={qty}
        totalPrice={totalPrice}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
