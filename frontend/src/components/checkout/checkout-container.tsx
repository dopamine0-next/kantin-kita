"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useCartStore, CartItem, Promo } from "@/store/useCartStore"
import { MOCK_RESTAURANTS_DETAILS } from "@/lib/mockData"
import {
  ChevronLeft,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Ticket,
  ChevronRight,
  Info,
  CheckCircle2,
  Utensils,
  MapPin,
  FileText,
  BadgePercent,
  X,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const MOCK_PROMOS: Promo[] = [
  {
    code: "HEMAT20",
    discountType: "percentage",
    value: 20,
    description: "Diskon 20% khusus makanan favoritmu (Maks. Rp 15.000)",
  },
  {
    code: "GOCENG",
    discountType: "fixed",
    value: 5000,
    description: "Potongan harga langsung Rp 5.000 tanpa min. belanja",
  },
  {
    code: "DINEIN30",
    discountType: "percentage",
    value: 30,
    description: "Hemat 30% khusus Makan di Tempat (Maks. Rp 20.000)",
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
  const [isPromoDrawerOpen, setIsPromoDrawerOpen] = React.useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false)
  const [isProcessing, setIsProcessing] = React.useState(false)

  // Calculations
  const subtotal = React.useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [items])

  const appFee = subtotal > 0 ? 2000 : 0

  const discount = React.useMemo(() => {
    if (!promoApplied || subtotal === 0) return 0
    if (promoApplied.discountType === "fixed") {
      return Math.min(promoApplied.value, subtotal)
    } else {
      const pctDiscount = (subtotal * promoApplied.value) / 100
      // Caps for percentage discounts
      const cap = promoApplied.code === "DINEIN30" ? 20000 : 15000
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
    router.push("/")
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
    <div className="relative max-w-md w-full min-h-screen bg-background border-x border-muted/50 mx-auto flex flex-col pb-6">
      {/* 1. Header */}
      <div className="px-4 pt-6 pb-3 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-muted/20 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.back()}
          className="size-9 rounded-full bg-muted/40 flex items-center justify-center text-foreground active:bg-muted transition-colors"
          aria-label="Kembali"
        >
          <ChevronLeft className="size-5 mr-0.5" />
        </motion.button>
        
        <h1 className="text-sm font-black text-foreground tracking-tight">
          Konfirmasi Pembayaran
        </h1>
        
        <div className="size-9" /> {/* Spacer */}
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <ShoppingBag className="size-8" />
          </div>
          <h2 className="text-base font-black text-foreground">Keranjang Anda Kosong</h2>
          <p className="text-xs text-muted-foreground/80 mt-2 max-w-[240px] leading-relaxed">
            Silakan pilih menu lezat terlebih dahulu dari kios kantin terdekat Anda.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 text-xs font-black bg-primary text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-primary/95"
          >
            Pesan Sekarang
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-4 py-4 gap-5 overflow-y-auto no-scrollbar">
          
          {/* 2. Dine-In / Pickup Switch Selector (Dribbble Premium Sliding Tabs) */}
          <div className="bg-muted/40 p-1.5 rounded-2xl border border-muted/20 flex relative">
            <button
              onClick={() => setActiveMode("dine-in")}
              className={cn(
                "flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 relative z-10",
                activeMode === "dine-in"
                  ? "text-primary-foreground"
                  : "text-muted-foreground/85 hover:text-foreground"
              )}
            >
              <Utensils className="size-4" />
              <span>Makan di Tempat</span>
              {activeMode === "dine-in" && (
                <motion.div
                  layoutId="activeModeBg"
                  className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md shadow-primary/15"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveMode("pickup")}
              className={cn(
                "flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 relative z-10",
                activeMode === "pickup"
                  ? "text-primary-foreground"
                  : "text-muted-foreground/85 hover:text-foreground"
              )}
            >
              <ShoppingBag className="size-4" />
              <span>Bawa Pulang</span>
              {activeMode === "pickup" && (
                <motion.div
                  layoutId="activeModeBg"
                  className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md shadow-primary/15"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          </div>

          {/* Mode description notice */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex gap-2.5 text-[10px] text-primary/90 font-medium">
            <Info className="size-4 shrink-0 text-primary" />
            <span>
              {activeMode === "dine-in"
                ? "Makanan akan disajikan hangat di meja kantin utama. Harap siapkan nomor meja saat memesan."
                : "Makanan dikemas untuk dibawa pulang. Anda akan menerima notifikasi siap ambil dalam 10-15 menit."}
            </span>
          </div>

          {/* 3. List of Cart Items */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-black text-foreground uppercase tracking-wider pl-1">
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
                    className="p-3 bg-card/40 border border-muted/20 rounded-2xl flex flex-col gap-3"
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-14 rounded-xl object-cover shrink-0"
                      />

                      {/* Info and price */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex flex-col">
                          <h3 className="text-xs font-black text-foreground leading-snug line-clamp-1">
                            {item.name}
                          </h3>
                          
                          {/* Display custom selected level and addons */}
                          {(item.level || (item.addons && item.addons.length > 0)) && (
                            <div className="flex flex-wrap gap-1 mt-1 mb-0.5">
                              {item.level && (
                                <span className="text-[8px] bg-primary/10 text-primary font-black px-1.5 py-0.5 rounded-lg border border-primary/10">
                                  {item.level}
                                </span>
                              )}
                              {item.addons && item.addons.map((addon) => (
                                <span key={addon.name} className="text-[8px] bg-amber-500/10 text-amber-600 font-black px-1.5 py-0.5 rounded-lg border border-amber-500/10">
                                  + {addon.name}
                                </span>
                              ))}
                            </div>
                          )}

                          <span className="text-[10px] text-muted-foreground/60 font-semibold mt-0.5">
                            Rp {item.price.toLocaleString("id-ID")}
                          </span>
                        </div>

                        <div className="text-[10px] font-black text-foreground mt-1">
                          Subtotal: Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1 bg-muted/40 p-0.5 rounded-xl border border-muted/15 h-8 align-middle shrink-0">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="size-7 rounded-lg bg-card shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-foreground">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="size-7 rounded-lg bg-card shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>

                    {/* Inline configuration fields (Variant changer and Note input) */}
                    <div className="border-t border-muted/10 pt-2.5 flex flex-col gap-2">
                      {/* Variant changer if items has variant options */}
                      {variants.length > 0 && (
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] text-muted-foreground/80 font-bold uppercase tracking-wider">
                            Pilih Variasi:
                          </span>
                          
                          <select
                            value={item.variant || ""}
                            onChange={(e) => updateVariant(item.id, e.target.value)}
                            className="bg-muted/40 border border-muted/10 text-[9px] font-bold rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
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
                      <div className="flex items-center bg-muted/30 border border-muted/15 rounded-lg px-2 py-1 gap-1.5">
                        <FileText className="size-3.5 text-muted-foreground/60 shrink-0" />
                        <input
                          type="text"
                          placeholder="Tambah catatan rasa (misal: pedas pol, tanpa kol)..."
                          value={item.note || ""}
                          onChange={(e) => updateNote(item.id, e.target.value)}
                          className="w-full bg-transparent border-none text-[10px] text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-0 py-0.5"
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
              "w-full p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 relative overflow-hidden",
              promoApplied
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600"
                : "bg-card border-muted/20 text-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "size-10 rounded-xl flex items-center justify-center shrink-0",
                promoApplied ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/10 text-primary"
              )}>
                <Ticket className="size-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-black">
                  {promoApplied ? `Promo ${promoApplied.code} Terpasang` : "Pakai Promo Lebih Hemat"}
                </span>
                <span className="text-[9px] text-muted-foreground/80 font-medium">
                  {promoApplied ? promoApplied.description : "Ada voucher diskon s.d 30% menunggu"}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs font-black">
              {promoApplied ? (
                <span className="text-emerald-600">-Rp {discount.toLocaleString("id-ID")}</span>
              ) : (
                <span className="text-primary hover:underline">Pilih</span>
              )}
              <ChevronRight className="size-4 text-muted-foreground/60" />
            </div>
          </motion.button>

          {/* 5. Payment Details Section */}
          <div className="flex flex-col gap-2.5">
            <h2 className="text-xs font-black text-foreground uppercase tracking-wider pl-1">
              Rincian Pembayaran
            </h2>

            {/* Invoice card styled with border subtle receipt style */}
            <div className="bg-card/30 border border-muted/20 rounded-2xl p-4 flex flex-col gap-2.5">
              
              {/* Subtotal */}
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground/90">
                <span>Subtotal Makanan</span>
                <span className="text-foreground">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div className="flex justify-between items-center text-xs font-bold text-emerald-600">
                  <span className="flex items-center gap-1">
                    <BadgePercent className="size-4" />
                    <span>Diskon Promo ({promoApplied?.code})</span>
                  </span>
                  <span>-Rp {discount.toLocaleString("id-ID")}</span>
                </div>
              )}

              {/* App Fee */}
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground/90">
                <span>Biaya Aplikasi (Kantin Service)</span>
                <span className="text-foreground">Rp {appFee.toLocaleString("id-ID")}</span>
              </div>

              {/* Divider line */}
              <div className="border-t border-muted/20 my-1 border-dashed" />

              {/* Total Grand */}
              <div className="flex justify-between items-center font-black text-sm text-foreground">
                <span>Total Tagihan</span>
                <span className="text-primary text-base">Rp {total.toLocaleString("id-ID")}</span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* 6. Bottom Sticky Full-Width Checkout Button */}
      {items.length > 0 && (
        <div className="px-4 pt-3 pb-4 border-t border-muted/20 bg-background/95 backdrop-blur-md sticky bottom-0 z-20">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full h-12.5 rounded-2xl bg-primary text-white font-extrabold text-xs tracking-wider shadow-lg shadow-primary/25 flex items-center justify-center gap-2 hover:bg-primary/95 disabled:bg-muted"
            >
              <CreditCard className="size-4.5" />
              <span>
                {isProcessing
                  ? "Memproses Pembayaran..."
                  : `Bayar Sekarang • Rp ${total.toLocaleString("id-ID")}`}
              </span>
            </Button>
          </motion.div>
        </div>
      )}

      {/* 7. Slide-up Promo Selector Drawer */}
      <Drawer open={isPromoDrawerOpen} onOpenChange={setIsPromoDrawerOpen}>
        <DrawerContent className="max-w-md mx-auto bg-background/95 backdrop-blur-xl border-t border-muted/40 rounded-t-[32px] overflow-hidden outline-none">
          <div className="p-5 pb-8">
            <DrawerHeader className="px-0 pt-0 text-left">
              <DrawerTitle className="text-base font-black text-foreground tracking-tight">
                Voucher & Promo Hemat
              </DrawerTitle>
              <DrawerDescription className="text-xs text-muted-foreground/80 font-medium">
                Pilih voucher diskon terbaik untuk pesanan kantin lezat Anda.
              </DrawerDescription>
            </DrawerHeader>

            {/* List of mock promos */}
            <div className="flex flex-col gap-3 mt-4">
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
                      "w-full p-4 rounded-xl border text-left flex items-start justify-between transition-all duration-300",
                      isSelected
                        ? "bg-emerald-500/5 border-emerald-500/25"
                        : "bg-card/40 border-muted/20 hover:border-primary/15"
                    )}
                  >
                    <div className="flex gap-3">
                      <div className={cn(
                        "size-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                        isSelected ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/10 text-primary"
                      )}>
                        <BadgePercent className="size-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-foreground flex items-center gap-1.5">
                          {promo.code}
                          {isSelected && (
                            <span className="text-[8px] bg-emerald-500 text-white font-extrabold px-1 py-0.2 rounded-sm uppercase tracking-wide">
                              Aktif
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium mt-1 leading-relaxed">
                          {promo.description}
                        </span>
                      </div>
                    </div>

                    <div className="size-5 rounded-full border border-muted-foreground/30 flex items-center justify-center shrink-0 mt-1">
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
                className="w-full h-11 border-muted/30 rounded-xl font-bold text-xs"
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-xs w-full bg-background border border-muted/40 rounded-[32px] p-6 text-center shadow-2xl flex flex-col items-center"
            >
              {/* Success Badge */}
              <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                <CheckCircle2 className="size-9 fill-emerald-500 stroke-background stroke-[2]" />
              </div>

              <h3 className="text-base font-black text-foreground tracking-tight">
                Pembayaran Berhasil!
              </h3>
              
              <p className="text-[10px] text-muted-foreground/80 mt-2 max-w-[200px] leading-relaxed">
                Pesanan Anda telah diteruskan ke koki kantin. Makanan lezat Anda sedang disiapkan!
              </p>

              {/* Receipt info */}
              <div className="w-full bg-muted/35 border border-muted/20 rounded-xl p-3.5 mt-5 flex flex-col gap-2 text-left">
                <div className="flex justify-between items-center text-[9px] font-bold text-muted-foreground/85">
                  <span>Metode</span>
                  <span className="text-foreground font-black uppercase">Saldo KantinKita</span>
                </div>
                
                <div className="flex justify-between items-center text-[9px] font-bold text-muted-foreground/85">
                  <span>Nomor Order</span>
                  <span className="text-foreground font-black">#KK-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>

                <div className="flex justify-between items-center text-[9px] font-bold text-muted-foreground/85">
                  <span>Tipe Pengambilan</span>
                  <span className="text-foreground font-black uppercase">
                    {activeMode === "dine-in" ? "Dine-in (Makan di Tempat)" : "Pickup (Bawa Pulang)"}
                  </span>
                </div>

                <div className="border-t border-muted/25 my-0.5 border-dashed" />

                <div className="flex justify-between items-center text-[10px] font-black text-foreground">
                  <span>Total Bayar</span>
                  <span className="text-primary font-black">Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Back to Home button */}
              <Button
                onClick={handleFinishPayment}
                className="w-full h-11 bg-primary text-white font-extrabold text-xs rounded-xl shadow-md shadow-primary/10 mt-6 hover:bg-primary/95"
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
