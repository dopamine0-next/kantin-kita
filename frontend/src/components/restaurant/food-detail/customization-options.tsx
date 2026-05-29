'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MenuCustomization, ChoiceOption, AddonOption } from '@/services/restaurant/restaurant.types'

interface CustomizationOptionsProps {
  customizations: MenuCustomization[]
  selectedChoices: Record<string, string>
  selectedAddons: Record<string, AddonOption[]>
  onSelectChoice: (title: string, label: string) => void
  onToggleAddon: (title: string, addon: AddonOption) => void
}

export function CustomizationOptions({
  customizations,
  selectedChoices,
  selectedAddons,
  onSelectChoice,
  onToggleAddon,
}: CustomizationOptionsProps) {
  if (!customizations || customizations.length === 0) return null

  return (
    <>
      {customizations.map((cust) => (
        <div key={cust.title} className="mt-6">
          <h4 className="text-foreground mb-3 text-xs font-black tracking-wider uppercase">
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
                    onClick={() => onSelectChoice(cust.title, choice.label)}
                    className={cn(
                      'group flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-[0.99]',
                      isSelected ? 'bg-primary/5 border-primary/45' : 'hover:bg-muted/15 border-transparent bg-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                        isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/35 bg-transparent'
                      )}>
                        {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                      </div>
                      <span className={cn(
                        'text-xs font-bold transition-colors',
                        isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      )}>
                        {choice.label}
                      </span>
                    </div>
                    <span className={cn(
                      'rounded-lg border px-2 py-0.5 text-[10px] font-black',
                      choice.price > 0 
                        ? (isSelected ? 'border-amber-500/20 bg-amber-500/10 text-amber-600' : 'bg-muted/60 border-muted text-muted-foreground') 
                        : 'text-muted-foreground/40 border-transparent font-semibold'
                    )}>
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
                    onClick={() => onToggleAddon(cust.title, addon)}
                    className={cn(
                      'group flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-[0.99]',
                      isChecked ? 'bg-primary/5 border-primary/45' : 'hover:bg-muted/15 border-transparent bg-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'flex size-4 shrink-0 items-center justify-center rounded-md border transition-colors',
                        isChecked ? 'border-primary bg-primary text-white' : 'border-muted-foreground/35 bg-transparent'
                      )}>
                        {isChecked && <Check className="size-3 stroke-[4]" />}
                      </div>
                      <span className={cn(
                        'text-xs font-bold transition-colors',
                        isChecked ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      )}>
                        {addon.name}
                      </span>
                    </div>
                    <span className={cn(
                      'rounded-lg border px-2 py-0.5 text-[10px] font-black',
                      isChecked ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted/60 border-muted text-muted-foreground'
                    )}>
                      +Rp {addon.price.toLocaleString('id-ID')}
                    </span>
                  </button>
                )
              }
            })}
          </div>
        </div>
      ))}
    </>
  )
}
