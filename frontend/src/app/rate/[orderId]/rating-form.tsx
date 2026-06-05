'use client'

import { useState } from 'react'

import { ArrowLeft, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { StarRating } from '@/components/review/star-rating'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrder } from '@/hooks/use-orders'
import { formatRupiah } from '@/lib/utils'
import { createMenuItemReview, createRestaurantReview } from '@/services/review/review.service'

interface RatingFormProps {
  orderId: string
}

export function RatingForm({ orderId }: RatingFormProps) {
  const router = useRouter()
  const { order, isLoading } = useOrder(orderId)
  const [restaurantRating, setRestaurantRating] = useState(0)
  const [itemRatings, setItemRatings] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState(false)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
        <p className="text-muted-foreground text-sm font-medium">Pesanan tidak ditemukan</p>
        <Link href="/profile" className="text-primary text-sm font-semibold">
          Kembali
        </Link>
      </div>
    )
  }

  const allRated =
    restaurantRating > 0 && order.items.every((item) => (itemRatings[item.id] || 0) > 0)

  const handleSubmit = async () => {
    if (!allRated || submitting) return
    setSubmitting(true)

    try {
      await createRestaurantReview({
        orderId,
        rating: restaurantRating,
      })

      for (const item of order.items) {
        await createMenuItemReview({
          orderId,
          menuItemId: item.menuItemId || item.id,
          rating: itemRatings[item.id],
        })
      }

      toast.success('Rating berhasil dikirim!')
      router.push('/profile')
    } catch {
      toast.error('Gagal mengirim rating, coba lagi')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="animate-fade-in flex min-h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="hover:bg-muted/40 rounded-full p-1 transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-lg font-semibold">Beri Rating</h1>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-4 pb-8">
        {/* Restaurant */}
        <div className="bg-card/50 border-muted/30 flex flex-col gap-3 rounded-2xl border p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={order.restaurant_image || '/placeholder.svg'}
                alt={order.restaurant_name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{order.restaurant_name}</span>
              <span className="text-muted-foreground text-xs font-medium">
                {order.items.length} item &middot; {formatRupiah(order.total_amount)}
              </span>
            </div>
          </div>

          <div className="border-muted/20 flex items-center justify-between border-t pt-3">
            <span className="text-xs font-semibold">Rating Restoran</span>
            <StarRating value={restaurantRating} onChange={setRestaurantRating} />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3">
          <h3 className="text-muted-foreground text-xs font-semibold">Rating Menu</h3>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="bg-card/50 border-muted/30 flex items-center justify-between gap-3 rounded-2xl border p-3 shadow-sm"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="line-clamp-1 text-xs font-semibold">{item.name}</span>
                  <span className="text-muted-foreground text-[10px] font-medium">
                    {item.quantity}x {formatRupiah(item.price)}
                  </span>
                </div>
              </div>
              <StarRating
                value={itemRatings[item.id] || 0}
                onChange={(v) => setItemRatings((prev) => ({ ...prev, [item.id]: v }))}
                size={4}
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-auto flex flex-col gap-2 pt-4">
          {!allRated && (
            <p className="text-muted-foreground/60 text-center text-xs font-medium">
              Beri rating restoran dan semua menu untuk mengirim
            </p>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!allRated || submitting}
            className="w-full rounded-xl py-5 text-sm font-semibold"
          >
            {submitting ? 'Mengirim...' : 'Kirim Rating'}
          </Button>
        </div>
      </div>
    </div>
  )
}
