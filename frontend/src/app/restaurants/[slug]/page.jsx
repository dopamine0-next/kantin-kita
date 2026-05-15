"use client";

import { use } from "react";
import { useState } from "react";
import { restaurants } from "@/data/restaurants";
import RestaurantDetail from "@/components/RestaurantDetail";

export default function Page({ params }) {
  const { slug } = use(params);

  const restaurant = restaurants.find((r) => r.slug === slug);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => { setCart((prev) => [...prev, { ...item, qty: 1 }]);};

  if (!restaurant) {
    return (

      <div className="min-h-screen flex items-center justify-center">
        Restaurant Not Found
      </div>

    );
  }

  return (
    <div>
      <RestaurantDetail restaurant={restaurant} addToCart={addToCart} />
    </div>
    
  );
}
