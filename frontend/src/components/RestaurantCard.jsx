import Link from "next/link";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
      <div className="bg-white rounded-3xl shadow hover:scale-[1.03] transition overflow-hidden">
        {/* IMAGE - PORTRAIT STYLE */}
        <img src={restaurant.image} className="w-full h-56 object-cover" />

        {/* CONTENT */}
        <div className="p-4">
          <h2 className="text-lg font-bold">{restaurant.name}</h2>

          <div className="flex justify-between mt-2 text-sm">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              {restaurant.category}
            </span>

            <span>⭐ {restaurant.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
