'use client'

import { ShoppingCart } from 'lucide-react';
import {restaurants } from '@/data/restaurants';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-slate-800 text-white shadow-lg">
      <div className="flex w-full items-center justify-between px-6 py-6">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-yellow-400" />

          <h1 className="text-lg font-bold">KANTIN UNPAM</h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-base font-bold">
          <Link href="/" className="hover:text-yellow-400">
            Home
          </Link>

          <Link href="/restaurants" className="hover:text-yellow-400">
            Restoran
          </Link>

          <Link href="/checkout" className="rounded-full bg-yellow-400 p-2 text-black">
            <ShoppingCart size={18} />
          </Link>
        </div>
      </div>
    </nav>
  )
}
