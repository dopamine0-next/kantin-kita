"use client";

import { useState } from "react";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";

export default function OrderPage() {
  const [search, setSearch] = useState("");

  const filtered = restaurants.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()),);

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <input className="w-full p-3 rounded-xl mb-4" placeholder="Cari resto..." value={search} onChange={(e) => setSearch(e.target.value)}/>

      <div className="flex flex-col gap-4"> {filtered.map((r) => (
          <Link key={r.id} href={`/restaurants/${r.slug}`} className="bg-white flex gap-4 p-3 rounded-2xl shadow">
            <img src={r.image} className="w-24 h-24 object-cover rounded-xl" />

            <div>
              <h2 className="font-bold">{r.name}</h2>
              <p className="text-gray-500">{r.category}</p>
              <p className="text-yellow-500">⭐ {r.rating}</p>
            </div>

          </Link>
        ))}
        
      </div>
    </main>
  );
}
