import Link from 'next/link'

import BackButton from '@/components/backButton'
import FoodCard from '@/components/foodCard'
import Navbar from '@/components/navbar'
import { restaurants } from '@/data/restaurants'

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const restaurant = restaurants.find((r) => r.slug === slug)

  if (!restaurant) {
    return <div className="pt-24 text-center">Restaurant not found</div>
  }

  // GET ALL MENU
  const allMenu = Object.values(restaurant.menu || {}).flat()

  // POPULAR MENU
  const popularMenu = allMenu.filter((item: any) => item.popular)

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 pb-20">
        {/* HERO */}
        <section className="relative">
          {/* BANNER */}
          <img src={restaurant.banner} alt={restaurant.name} className="h-72 w-full object-cover" />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* BACK BUTTON */}
          <BackButton />

          {/* INFO */}
          <div className="absolute bottom-5 left-4 text-white">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>

            <div className="mt-2 flex gap-2 text-sm">
              <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">⭐ 4.8</span>

              <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                {restaurant.category}
              </span>
            </div>
          </div>
        </section>

        {/* POPULAR MENU */}
        {popularMenu.length > 0 && (
          <section className="mt-6 px-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Menu Terlaris</h2>

              <p className="text-sm text-gray-500">Pilihan favorit</p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {popularMenu.map((item: any) => (
                <div key={item.id} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                  <img src={item.image} className="h-32 w-full object-cover" />

                  <div className="p-3">
                    <h3 className="line-clamp-1 font-semibold">{item.name}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MENU */}
        <section className="mt-8 px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Menu</h2>

            <p className="text-sm text-slate-500">{allMenu.length} items</p>
          </div>

          {/* CATEGORY */}
          <div className="space-y-8">
            {Object.entries(restaurant.menu).map(([category, items]: any) => (
              <div key={category}>
                {/* CATEGORY TITLE */}
                <h2 className="mb-4 text-xl font-bold capitalize">{category
    .replace(/([A-Z])/g, ' $1')
   .replace(/^./, (str: string) => str.toUpperCase())}</h2>

                {/* MENU LIST */}
                <div className="flex flex-col gap-3">
                  {items.map((item: any) => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
