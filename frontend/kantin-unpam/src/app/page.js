"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import RestaurantDetail from "@/components/RestaurantDetail";
import Footer from "@/components/Footer";

import { restaurants } from "@/data/restaurants";

export default function Home() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);

    if (existing) {
      setCart(
        cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)),
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="bg-slate-100 min-h-screen">
      <Navbar cartCount={cart.length} />

      <Hero />

      <SearchBar search={search} setSearch={setSearch} />

      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold mb-6">Restaurant</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              setSelectedRestaurant={setSelectedRestaurant}
            />
          ))}
        </div>
      </section>

      {selectedRestaurant && (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          addToCart={addToCart}
        />
      )}

      {/* MENU TERPOPULER */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-4xl font-bold">Menu Terpopuler</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants
            .flatMap((r) => r.bestSeller)
            .slice(0, 9)
            .map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow p-4">
                <img
                  src={item.image}
                  className="w-full h-32 object-cover rounded-xl"
                />

                <h3 className="mt-3 font-bold">{item.name}</h3>
                <p className="text-yellow-500 font-semibold">
                  Rp {item.price.toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
