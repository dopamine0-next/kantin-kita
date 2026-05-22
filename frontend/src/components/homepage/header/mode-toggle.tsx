'use client'

import { motion } from 'motion/react'

interface ModeToggleProps {
  activeMode: 'dine-in' | 'pickup'
  setActiveMode: (mode: 'dine-in' | 'pickup') => void
}

export function ModeToggle({ activeMode, setActiveMode }: ModeToggleProps) {
  return (
    <div className="bg-muted/50 border-muted/15 relative flex rounded-xl border p-1">
      {/* Active Highlight Slider */}
      <motion.div
        layoutId="activemode-slider"
        className="bg-card border-muted/10 absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg border shadow-md"
        initial={false}
        animate={{
          left: activeMode === 'pickup' ? 'calc(50% + 2px)' : '4px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />

      <button
        onClick={() => setActiveMode('dine-in')}
        className={`relative z-10 flex-1 rounded-lg py-2 text-center text-[10px] font-black transition-colors duration-300 ${
          activeMode === 'dine-in'
            ? 'text-primary'
            : 'text-muted-foreground/80 hover:text-foreground'
        }`}
      >
        🍽️ Makan di Sini (Dine-In)
      </button>

      <button
        onClick={() => setActiveMode('pickup')}
        className={`relative z-10 flex-1 rounded-lg py-2 text-center text-[10px] font-black transition-colors duration-300 ${
          activeMode === 'pickup'
            ? 'text-primary'
            : 'text-muted-foreground/80 hover:text-foreground'
        }`}
      >
        🛍️ Bawa Pulang (Takeaway)
      </button>
    </div>
  )
}
