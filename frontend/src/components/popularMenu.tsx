import { restaurants } from '@/data/restaurants';

export default function PopularMenu() {
  const menus = restaurants.flatMap((r) => r.menu.map((m) => ({ ...m, resto: r.name })))

  return (
    <div className="mt-6 px-4 pb-20">
      <h2 className="mb-3 font-bold">Menu Terpopuler</h2>

      <div className="grid grid-cols-2 gap-3">
        {menus.map((m) => (
          <div key={`${m.resto}-${m.name}-${m.id}`} className="rounded-xl border p-2">
            <img
              src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
              className="h-28 w-full rounded-lg object-cover"
            />

            <p className="mt-2 text-sm font-medium">{m.name}</p>

            <p className="text-xs text-gray-500">{m.resto}</p>

            <p className="mt-1 text-sm font-semibold">Rp {m.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
