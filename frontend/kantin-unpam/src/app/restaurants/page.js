"use client";

import { use, useState } from "react";
import { restaurants } from "@/data/restaurants";

import RestaurantDetail from "@/components/RestaurantDetail";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";

export default function RestaurantPage({ params }) {
  const { slug } = use(params);

  const restaurant = restaurants.find( (r) => r.slug?.toLowerCase() === slug?.toLowerCase(),);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find( (cartItem) => cartItem.id === item.id && JSON.stringify(cartItem.addons) === JSON.stringify(item.addons),);

    if (existingItem) {
      setCart( cart.map((cartItem) => cartItem === existingItem ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem, ), );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {setCart ( cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item, ), );};

  const decreaseQty = (id) => {
    setCart( cart.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)).filter((item) => item.qty > 0),);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  if (!restaurant) {
    return (
      
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Restaurant Not Found
      </div>
    );
  }

  return (
    <main className="bg-slate-100 min-h-screen">
      <RestaurantDetail restaurant={restaurant} addToCart={addToCart} />

      {cart.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-20 grid lg:grid-cols-2 gap-10">
          <Cart
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
          />
          <Checkout />
        </section>
      )}
    </main>
  );
}
