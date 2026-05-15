"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MenuCard from "./MenuCard";
import MenuModal from "./MenuModal";

export default function RestaurantDetail({ restaurant, addToCart }) {
  const router = useRouter();

  const [selectedMenu, setSelectedMenu] = useState(null);

  if (!restaurant) {
    return (
      <div
        className=" min-h-screen flex items-center justify-center text-3xl font-bold">
        Restaurant Not Found
      </div>
    );
  }

  return (
    <main className="bg-slate-100 min-h-screen">

      {/* Hero Resto */}
      <section className="relative w-full h-[320px] md:h-[520px] overflow-hidden">
        <img src={restaurant.image} className="w-full h-full object-cover"/>

        <div className="absolute inset-0 bg-black/50">

          {/* Back Button */}
          <button onClick={() => router.back()}
            className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-2xl hover:bg-white/30 transition z-20">
            ← 
          </button>

          <div className="absolute bottom-0 w-full p-6 md:p-12 text-white">
            <h1 className="text-4xl md:text-6xl font-bold">{restaurant.name}</h1>

            <p className="mt-3 text-lg md:text-2xl">⭐ {restaurant.rating}</p>

            <p className="mt-2 text-white/80 text-sm md:text-lg">{restaurant.category}</p>
          </div>

        </div>

      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">

        {/* Top Seller */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Menu Terlaris
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {restaurant.bestSeller?.map((item) => (
              <MenuCard key={item.id} item={item} small={true} openMenuModal={setSelectedMenu}/>
            ))}
          </div>

        </div>

        {/* All Menu */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Semua Menu</h2>

          {restaurant.categories?.map((category) => (
            <div key={category.name} className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold mb-7">{category.name}</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {category.items?.map((item) => (
                  <MenuCard key={item.id} item={item} openMenuModal={setSelectedMenu}/>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Modal */}

      {selectedMenu && (
        <MenuModal item={selectedMenu} closeModal={() => setSelectedMenu(null)} addToCart={addToCart}/>
      )}

    </main>
  );
}
