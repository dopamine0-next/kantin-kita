'use client'

import { cn } from '@/lib/utils'
import { ChoiceOption, MenuCustomization } from '@/services/restaurant/restaurant.types'

interface CustomizationOptionsProps {
  customizations: MenuCustomization[]
  selectedChoices: Record<string, string>
  onSelectChoice: (title: string, label: string) => void
}

export function CustomizationOptions({
  customizations,
  selectedChoices,
  onSelectChoice,
}: CustomizationOptionsProps) {
  if (!customizations || customizations.length === 0) return null

  return (
    <>
      {customizations.map((cust) => (
        <div key={cust.title} className="mt-6">
          <h4 className="text-foreground mb-3 text-xs font-semibold">{cust.title}</h4>
          <div className="bg-card/25 border-muted/20 flex flex-col gap-2 rounded-2xl border p-3">
            {cust.options.map((opt) => {
              const choice = opt as ChoiceOption
              const isSelected = selectedChoices[cust.title] === choice.label
              return (
                <button
                  key={choice.label}
                  onClick={() => onSelectChoice(cust.title, choice.label)}
                  className={cn(
                    'group flex items-center justify-between rounded-xl border p-2.5 text-left transition-all duration-300 active:scale-[0.99]',
                    isSelected
                      ? 'bg-primary/5 border-primary/45'
                      : 'hover:bg-muted/15 border-transparent bg-transparent'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                        isSelected
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/35 bg-transparent'
                      )}
                    >
                      {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-semibold transition-colors',
                        isSelected
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    >
                      {choice.label}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'rounded-lg border px-2 py-0.5 text-xs font-semibold',
                      choice.price > 0
                        ? isSelected
                          ? 'border-primary/20 bg-primary/10 text-primary'
                          : 'bg-muted/60 border-muted text-muted-foreground'
                        : 'text-muted-foreground/40 border-transparent font-semibold'
                    )}
                  >
                    {choice.price > 0 ? `+Rp ${choice.price.toLocaleString('id-ID')}` : 'Gratis'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}
