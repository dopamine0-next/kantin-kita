'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronLeft, Minus, Plus, ShoppingBag } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { MenuItem, MenuCustomization, ChoiceOption, AddonOption } from '@/services/restaurant/restaurant.types'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'

interface FoodVariantFormProps {
  item: MenuItem
  onBack: () => void
  onClose: () => void
  onAddedToCart: (message: string) => void
}

export function FoodVariantForm({ item, onBack, onClose, onAddedToCart }: FoodVariantFormProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const router = useRouter()

  const [qty, setQty] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({})
  const [selectedAddons, setSelectedAddons] = useState<Record<string, AddonOption[]>>({})
  const [note, setNote] = useState('')

  useEffect(() => {
    setQty(1)
    setSelectedVariant(item.variants && item.variants.length > 0 ? item.variants[0] : '')
    
    // Initialize choices and addons from customizations
    const initialChoices: Record<string, string> = {}
    const initialAddons: Record<string, AddonOption[]> = {}
    
    item.customizations?.forEach(cust => {
      if (cust.type === 'choice') {
        initialChoices[cust.title] = (cust.options[0] as ChoiceOption).label
      } else {
        initialAddons[cust.title] = []
      }
    })
    
    setSelectedChoices(initialChoices)
    setSelectedAddons(initialAddons)
    setNote('')
  }, [item])

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
    setSelectedChoices(prev => ({ ...prev, [custTitle]: label }))
  }

  // Calculate prices
  const choicesPrice = Object.entries(selectedChoices).reduce((sum, [title, label]) => {
    const cust = item.customizations?.find(c => c.title === title)
    const option = cust?.options.find(o => (o as ChoiceOption).label === label) as ChoiceOption
    return sum + (option?.price || 0)
  }, 0)

  const addonsPrice = Object.values(selectedAddons).flat().reduce((sum, a) => sum + a.price, 0)
  
  const singleItemPrice = item.price + choicesPrice + addonsPrice
  const totalPrice = singleItemPrice * qty

  const handleAddToCart = () => {
    const allAddons = Object.values(selectedAddons).flat()
    
    addToCart({
      foodId: item.id,
      name: item.name,
      price: singleItemPrice,
      image: item.image,
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
    Object.values(selectedChoices).forEach(c => details.push(c))
    if (allAddons.length > 0) details.push(`${allAddons.length} Ekstra`)

    const detailsStr = details.length > 0 ? ` (${details.join(', ')})` : ''
    onAddedToCart(`✓ ${qty}x ${item.name}${detailsStr} ditambahkan ke keranjang!`)
    onClose()
    router.push('/checkout')
  }

  return (
    <div className="no-scrollbar max-h-[85vh] overflow-y-auto px-5 pb-8 pt-6">
      <DialogHeader className="px-0 pt-0 flex flex-row items-center gap-3 space-y-0 text-left">
        <button 
          onClick={onBack} 
          className="bg-card text-muted-foreground flex shrink-0 size-8 items-center justify-center rounded-full border border-muted/30 shadow-sm"
        >
          <ChevronLeft className="size-4" />
        </button>
        <DialogTitle className="text-foreground text-lg leading-tight font-black tracking-tight">
          Pilihan Varian
        </DialogTitle>
      </DialogHeader>

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

      {/* Dynamic Customizations */}
      {item.customizations?.map((cust) => (
        <div key={cust.title} className="mt-5.5">
          <h4 className="text-foreground mb-2.5 text-[11px] font-black tracking-wider uppercase">
            {cust.title}
          </h4>
          <div className="bg-card/25 border-muted/20 flex flex-col gap-2 rounded-2xl border p-3">
            {cust.options.map((opt) => {
              if (cust.type === 'choice') {
                const choice = opt as ChoiceOption
                const isSelected = selectedChoices[cust.title] === choice.label
                return (
                  <button
                    key={choice.label}
                    onClick={() => handleSelectChoice(cust.title, choice.label)}
                    className={cn(
                      'group flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-[0.99]',
                      isSelected ? 'bg-primary/5 border-primary/45' : 'hover:bg-muted/15 border-transparent bg-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors', isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/35 bg-transparent')}>
                        {isSelected && <div className="size-2 rounded-full bg-white" />}
                      </div>
                      <span className={cn('text-xs font-bold transition-colors', isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')}>
                        {choice.label}
                      </span>
                    </div>
                    <span className={cn('rounded-lg border px-2 py-0.5 text-[10px] font-black', choice.price > 0 ? (isSelected ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' : 'bg-muted/60 border-muted text-muted-foreground') : 'text-muted-foreground/40 border-transparent font-semibold')}>
                      {choice.price > 0 ? `+Rp ${choice.price.toLocaleString('id-ID')}` : 'Gratis'}
                    </span>
                  </button>
                )
              } else {
                const addon = opt as AddonOption
                const isChecked = selectedAddons[cust.title]?.some(a => a.name === addon.name)
                return (
                  <button
                    key={addon.name}
                    onClick={() => handleToggleAddon(cust.title, addon)}
                    className={cn(
                      'group flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-[0.99]',
                      isChecked ? 'bg-primary/5 border-primary/45' : 'hover:bg-muted/15 border-transparent bg-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('flex size-4.5 shrink-0 items-center justify-center rounded-md border transition-colors', isChecked ? 'border-primary bg-primary text-white' : 'border-muted-foreground/35 bg-transparent')}>
                        {isChecked && <Check className="size-3.5 stroke-[4]" />}
                      </div>
                      <span className={cn('text-xs font-bold transition-colors', isChecked ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')}>
                        {addon.name}
                      </span>
                    </div>
                    <span className={cn('rounded-lg border px-2 py-0.5 text-[10px] font-black', isChecked ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted/60 border-muted text-muted-foreground')}>
                      +Rp {addon.price.toLocaleString('id-ID')}
                    </span>
                  </button>
                )
              }
            })}
          </div>
        </div>
      ))}

      <div className="mt-5.5">
        <h4 className="text-foreground mb-2 text-[11px] font-black tracking-wider uppercase">
          Catatan Khusus
        </h4>
        <Textarea
          placeholder="Contoh: Kuah dipisah, tidak pakai bawang..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="bg-card/40 border-muted/30 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/45 min-h-[60px] resize-none rounded-xl text-xs"
          maxLength={100}
        />
      </div>

      <div className="border-muted/30 mt-6 flex flex-col gap-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black tracking-wider uppercase text-foreground">Jumlah Pesanan</span>
          <div className="bg-muted/40 border-muted/20 flex shrink-0 items-center gap-1.5 rounded-2xl border p-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleDecrement} className="bg-card text-foreground active:bg-muted flex size-8.5 items-center justify-center rounded-xl shadow-sm transition-colors">
              <Minus className="size-3.5" />
            </motion.button>
            <span className="text-foreground w-8 text-center text-xs font-black">{qty}</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleIncrement} className="bg-card text-foreground active:bg-muted flex size-8.5 items-center justify-center rounded-xl shadow-sm transition-colors">
              <Plus className="size-3.5" />
            </motion.button>
          </div>
        </div>

        <motion.div whileTap={{ scale: 0.98 }} className="w-full">
          <Button onClick={handleAddToCart} className="bg-primary flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-xs font-extrabold tracking-wide text-white shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30">
            <ShoppingBag className="size-4" />
            <span>Masukkan • Rp {totalPrice.toLocaleString('id-ID')}</span>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
