'use client'
import { useMemo, useState } from 'react'

import {
  BadgePercent,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Info,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Ticket,
  Trash2,
  Utensils,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { MOCK_RESTAURANTS_DETAILS } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import { CartItem, Promo, useCartStore } from '@/store/useCartStore'

const MOCK_PROMOS: Promo[] = [
  {
    code: 'HEMAT20',
    discountType: 'percentage',
    value: 20,
    description: 'Diskon 20% khusus makanan favoritmu (Maks. Rp 15.000)',
  },
  {
    code: 'GOCENG',
    discountType: 'fixed',
    value: 5000,
    description: 'Potongan harga langsung Rp 5.000 tanpa min. belanja',
  },
  {
    code: 'DINEIN30',
    discountType: 'percentage',
    value: 30,
    description: 'Hemat 30% khusus Makan di Tempat (Maks. Rp 20.000)',
  },
]

export default function CheckoutContainer() {
  const router = useRouter()
  const {
    items,
    activeMode,
    promoApplied,
    setActiveMode,
    updateQty,
    updateVariant,
    updateNote,
    applyPromo,
    clearCart,
  } = useCartStore()

  // State local for UI
  const [isPromoDrawerOpen, setIsPromoDrawerOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000))

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [items])

  const appFee = subtotal > 0 ? 2000 : 0

  const discount = useMemo(() => {
    if (!promoApplied || subtotal === 0) return 0
    if (promoApplied.discountType === 'fixed') {
      return Math.min(promoApplied.value, subtotal)
    } else {
      const pctDiscount = (subtotal * promoApplied.value) / 100
      // Caps for percentage discounts
      const cap = promoApplied.code === 'DINEIN30' ? 20000 : 15000
      return Math.min(pctDiscount, cap)
    }
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

  // Get food variants options dynamically from mock database to show in variant changer dropdown
  const getFoodVariants = (foodId: string): string[] => {
    // Traverse details database
    for (const rest of Object.values(MOCK_RESTAURANTS_DETAILS)) {
      const found = rest.menus.find((menu) => menu.id === foodId)
      if (found && found.variants) return found.variants
    }
    return []
  }

  return (
    <div className="flex flex-1 flex-col pb-6">
      {/* 1. Header */}
      <div className="bg-background/95 border-muted/20 sticky top-0 z-30 flex items-center justify-between border-b px-4 pt-6 pb-3 backdrop-blur-md">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.back()}
          className="bg-muted/40 text-foreground active:bg-muted flex size-9 items-center justify-center rounded-full transition-colors"
          aria-label="Kembali"
        >
          <ChevronLeft className="mr-0.5 size-5" />
        </motion.button>
        <h1 className="text-foreground text-sm font-black tracking-tight">Konfirmasi Pembayaran</h1>
        <div className="size-9" /> {/* Spacer */}
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
          <div className="bg-primary/10 text-primary mb-4 flex size-16 items-center justify-center rounded-full">
            <ShoppingBag className="size-8" />
          </div>
          <h2 className="text-foreground text-base font-black">Keranjang Anda Kosong</h2>
          <p className="text-muted-foreground/80 mt-2 max-w-[240px] text-xs leading-relaxed">
            Silakan pilih menu lezat terlebih dahulu dari kios kantin terdekat Anda.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary hover:bg-primary/95 mt-6 rounded-xl px-5 py-2.5 text-xs font-black text-white shadow-md"
          >
            Pesan Sekarang
          </button>
        </div>
      ) : (
        <div className="no-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4">
          {/* 2. Dine-In / Pickup Switch Selector (Dribbble Premium Sliding Tabs) */}
          <div className="bg-muted/40 border-muted/20 relative flex rounded-2xl border p-1.5">
            <button
              onClick={() => setActiveMode('dine-in')}
              className={cn(
                'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all duration-300',
                activeMode === 'dine-in'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground/85 hover:text-foreground'
              )}
            >
              <Utensils className="size-4" />
              <span>Makan di Tempat</span>
              {activeMode === 'dine-in' && (
                <motion.div
                  layoutId="activeModeBg"
                  className="bg-primary shadow-primary/15 absolute inset-0 -z-10 rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveMode('pickup')}
              className={cn(
                'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all duration-300',
                activeMode === 'pickup'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground/85 hover:text-foreground'
              )}
            >
              <ShoppingBag className="size-4" />
              <span>Bawa Pulang</span>
              {activeMode === 'pickup' && (
                <motion.div
                  layoutId="activeModeBg"
                  className="bg-primary shadow-primary/15 absolute inset-0 -z-10 rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          </div>

          {/* Mode description notice */}
          <div className="bg-primary/5 border-primary/10 text-primary/90 flex gap-2.5 rounded-xl border p-3 text-[10px] font-medium">
            <Info className="text-primary size-4 shrink-0" />
            <span>
              {activeMode === 'dine-in'
                ? 'Makanan akan disajikan hangat di meja kantin utama. Harap siapkan nomor meja saat memesan.'
                : 'Makanan dikemas untuk dibawa pulang. Anda akan menerima notifikasi siap ambil dalam 10-15 menit.'}
            </span>
          </div>

          {/* 3. List of Cart Items */}
          <div className="flex flex-col gap-3">
            <h2 className="text-foreground pl-1 text-xs font-black tracking-wider uppercase">
              Daftar Makanan & Minuman
            </h2>

            <div className="flex flex-col gap-3">
              {items.map((item) => {
                const variants = getFoodVariants(item.foodId)
                return (
                  <motion.div
                    key={item.id}
                    layout
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-card/40 border-muted/20 flex flex-col gap-3 rounded-2xl border p-3"
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-14 shrink-0 rounded-xl object-cover"
                      />

                      {/* Info and price */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex flex-col">
                          <h3 className="text-foreground line-clamp-1 text-xs leading-snug font-black">
                            {item.name}
                          </h3>

                          {/* Display custom selected level and addons */}
                          {(item.level || (item.addons && item.addons.length > 0)) && (
                            <div className="mt-1 mb-0.5 flex flex-wrap gap-1">
                              {item.level && (
                                <span className="bg-primary/10 text-primary border-primary/10 rounded-lg border px-1.5 py-0.5 text-[8px] font-black">
                                  {item.level}
                                </span>
                              )}
                              {item.addons &&
                                item.addons.map((addon) => (
                                  <span
                                    key={addon.name}
                                    className="rounded-lg border border-amber-500/10 bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-black text-amber-600"
                                  >
                                    + {addon.name}
                                  </span>
                                ))}
                            </div>
                          )}

                          <span className="text-muted-foreground/60 mt-0.5 text-[10px] font-semibold">
                            Rp {item.price.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <div className="text-foreground mt-1 text-[10px] font-black">
                          Subtotal: Rp {(item.price * item.qty).toLocaleString('id-ID')}
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="bg-muted/40 border-muted/15 flex h-8 shrink-0 items-center gap-1 rounded-xl border p-0.5 align-middle">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="bg-card text-foreground hover:bg-muted flex size-7 items-center justify-center rounded-lg shadow-sm transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-foreground w-6 text-center text-xs font-black">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="bg-card text-foreground hover:bg-muted flex size-7 items-center justify-center rounded-lg shadow-sm transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Inline configuration fields (Variant changer and Note input) */}
                    <div className="border-muted/10 flex flex-col gap-2 border-t pt-2.5">
                      {/* Variant changer if items has variant options */}
                      {variants.length > 0 && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-muted-foreground/80 text-[9px] font-bold tracking-wider uppercase">
                            Pilih Variasi:
                          </span>

                          <select
                            value={item.variant || ''}
                            onChange={(e) => updateVariant(item.id, e.target.value)}
                            className="bg-muted/40 border-muted/10 text-foreground focus:ring-primary rounded-lg border px-2 py-1 text-[9px] font-bold focus:ring-1 focus:outline-none"
                          >
                            {variants.map((v) => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Note writer input */}
                      <div className="bg-muted/30 border-muted/15 flex items-center gap-1.5 rounded-lg border px-2 py-1">
                        <FileText className="text-muted-foreground/60 size-3.5 shrink-0" />
                        <input
                          type="text"
                          placeholder="Tambah catatan rasa (misal: pedas pol, tanpa kol)..."
                          value={item.note || ''}
                          onChange={(e) => updateNote(item.id, e.target.value)}
                          className="text-foreground placeholder:text-muted-foreground/45 w-full border-none bg-transparent py-0.5 text-[10px] focus:ring-0 focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 4. Large Promo Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsPromoDrawerOpen(true)}
            className={cn(
              'relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-300',
              promoApplied
                ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600'
                : 'bg-card border-muted/20 text-foreground'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-xl',
                  promoApplied ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'
                )}
              >
                <Ticket className="size-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black">
                  {promoApplied
                    ? `Promo ${promoApplied.code} Terpasang`
                    : 'Pakai Promo Lebih Hemat'}
                </span>
                <span className="text-muted-foreground/80 text-[9px] font-medium">
                  {promoApplied ? promoApplied.description : 'Ada voucher diskon s.d 30% menunggu'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-black">
              {promoApplied ? (
                <span className="text-emerald-600">-Rp {discount.toLocaleString('id-ID')}</span>
              ) : (
                <span className="text-primary hover:underline">Pilih</span>
              )}
              <ChevronRight className="text-muted-foreground/60 size-4" />
            </div>
          </motion.button>

          {/* 5. Payment Details Section */}
          <div className="flex flex-col gap-2.5">
            <h2 className="text-foreground pl-1 text-xs font-black tracking-wider uppercase">
              Rincian Pembayaran
            </h2>

            {/* Invoice card styled with border subtle receipt style */}
            <div className="bg-card/30 border-muted/20 flex flex-col gap-2.5 rounded-2xl border p-4">
              {/* Subtotal */}
              <div className="text-muted-foreground/90 flex items-center justify-between text-xs font-bold">
                <span>Subtotal Makanan</span>
                <span className="text-foreground">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span className="flex items-center gap-1">
                    <BadgePercent className="size-4" />
                    <span>Diskon Promo ({promoApplied?.code})</span>
                  </span>
                  <span>-Rp {discount.toLocaleString('id-ID')}</span>
                </div>
              )}

              {/* App Fee */}
              <div className="text-muted-foreground/90 flex items-center justify-between text-xs font-bold">
                <span>Biaya Aplikasi (Kantin Service)</span>
                <span className="text-foreground">Rp {appFee.toLocaleString('id-ID')}</span>
              </div>

              {/* Divider line */}
              <div className="border-muted/20 my-1 border-t border-dashed" />

              {/* Total Grand */}
              <div className="text-foreground flex items-center justify-between text-sm font-black">
                <span>Total Tagihan</span>
                <span className="text-primary text-base">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Bottom Sticky Full-Width Checkout Button */}
      {items.length > 0 && (
        <div className="border-muted/20 bg-background/95 sticky bottom-0 z-20 border-t px-4 pt-3 pb-4 backdrop-blur-md">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handlePay}
              disabled={isProcessing}
              className="bg-primary shadow-primary/25 hover:bg-primary/95 disabled:bg-muted flex h-12.5 w-full items-center justify-center gap-2 rounded-2xl text-xs font-extrabold tracking-wider text-white shadow-lg"
            >
              <CreditCard className="size-4.5" />
              <span>
                {isProcessing
                  ? 'Memproses Pembayaran...'
                  : `Bayar Sekarang • Rp ${total.toLocaleString('id-ID')}`}
              </span>
            </Button>
          </motion.div>
        </div>
      )}

      {/* 7. Slide-up Promo Selector Drawer */}
      <Drawer open={isPromoDrawerOpen} onOpenChange={setIsPromoDrawerOpen}>
        <DrawerContent className="bg-background/95 border-muted/40 mx-auto max-w-md overflow-hidden rounded-t-[32px] border-t backdrop-blur-xl outline-none">
          <div className="p-5 pb-8">
            <DrawerHeader className="px-0 pt-0 text-left">
              <DrawerTitle className="text-foreground text-base font-black tracking-tight">
                Voucher & Promo Hemat
              </DrawerTitle>
              <DrawerDescription className="text-muted-foreground/80 text-xs font-medium">
                Pilih voucher diskon terbaik untuk pesanan kantin lezat Anda.
              </DrawerDescription>
            </DrawerHeader>

            {/* List of mock promos */}
            <div className="mt-4 flex flex-col gap-3">
              {MOCK_PROMOS.map((promo) => {
                const isSelected = promoApplied?.code === promo.code
                return (
                  <button
                    key={promo.code}
                    onClick={() => {
                      applyPromo(isSelected ? null : promo)
                      setIsPromoDrawerOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-start justify-between rounded-xl border p-4 text-left transition-all duration-300',
                      isSelected
                        ? 'border-emerald-500/25 bg-emerald-500/5'
                        : 'bg-card/40 border-muted/20 hover:border-primary/15'
                    )}
                  >
                    <div className="flex gap-3">
                      <div
                        className={cn(
                          'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg',
                          isSelected
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-primary/10 text-primary'
                        )}
                      >
                        <BadgePercent className="size-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground flex items-center gap-1.5 text-xs font-black">
                          {promo.code}
                          {isSelected && (
                            <span className="py-0.2 rounded-sm bg-emerald-500 px-1 text-[8px] font-extrabold tracking-wide text-white uppercase">
                              Aktif
                            </span>
                          )}
                        </span>
                        <span className="text-muted-foreground mt-1 text-[10px] leading-relaxed font-medium">
                          {promo.description}
                        </span>
                      </div>
                    </div>

                    <div className="border-muted-foreground/30 mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border">
                      {isSelected && <div className="size-3 rounded-full bg-emerald-500" />}
                    </div>
                  </button>
                )
              })}
            </div>

            <DrawerFooter className="px-0 pt-6">
              <Button
                variant="outline"
                onClick={() => setIsPromoDrawerOpen(false)}
                className="border-muted/30 h-11 w-full rounded-xl text-xs font-bold"
              >
                Tutup
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* 8. Full-screen Payment Success Modal (UI Only, premium animations) */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-background border-muted/40 flex w-full max-w-xs flex-col items-center rounded-[32px] border p-6 text-center shadow-2xl"
            >
              {/* Success Badge */}
              <div className="mb-4 flex size-16 animate-bounce items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="stroke-background size-9 fill-emerald-500 stroke-[2]" />
              </div>

              <h3 className="text-foreground text-base font-black tracking-tight">
                Pembayaran Berhasil!
              </h3>

              <p className="text-muted-foreground/80 mt-2 max-w-[200px] text-[10px] leading-relaxed">
                Pesanan Anda telah diteruskan ke koki kantin. Makanan lezat Anda sedang disiapkan!
              </p>

              {/* Receipt info */}
              <div className="bg-muted/35 border-muted/20 mt-5 flex w-full flex-col gap-2 rounded-xl border p-3.5 text-left">
                <div className="text-muted-foreground/85 flex items-center justify-between text-[9px] font-bold">
                  <span>Metode</span>
                  <span className="text-foreground font-black uppercase">Saldo KantinKita</span>
                </div>

                <div className="text-muted-foreground/85 flex items-center justify-between text-[9px] font-bold">
                  <span>Nomor Order</span>
                  <span className="text-foreground font-black">#KK-{orderNumber}</span>
                </div>

                <div className="text-muted-foreground/85 flex items-center justify-between text-[9px] font-bold">
                  <span>Tipe Pengambilan</span>
                  <span className="text-foreground font-black uppercase">
                    {activeMode === 'dine-in'
                      ? 'Dine-in (Makan di Tempat)'
                      : 'Pickup (Bawa Pulang)'}
                  </span>
                </div>

                <div className="border-muted/25 my-0.5 border-t border-dashed" />

                <div className="text-foreground flex items-center justify-between text-[10px] font-black">
                  <span>Total Bayar</span>
                  <span className="text-primary font-black">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Back to Home button */}
              <Button
                onClick={handleFinishPayment}
                className="bg-primary shadow-primary/10 hover:bg-primary/95 mt-6 h-11 w-full rounded-xl text-xs font-extrabold text-white shadow-md"
              >
                Kembali ke Beranda
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
