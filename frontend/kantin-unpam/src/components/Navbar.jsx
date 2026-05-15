import { ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-slate-800 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          width={60}
          height={60}
          alt="Logo"
          className="rounded-xl"
        />

        <div>
          <h1 className="font-bold text-xl">Kantin UNPAM</h1>
          <p className="text-xs text-slate-400">Online Food Ordering</p>
        </div>
      </div>

      <div className="hidden md:flex gap-8 font-bold">
        <a href="/">Home</a>
        <a href="/restaurants">Restaurant</a>
        <a href="/order">Order</a>
      </div>

      <div className="flex items-center gap-4 relative">
        <ShoppingCart size={28} />
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 rounded-full">
          {cartCount}
        </span>

        <Menu className="md:hidden" />
      </div>
    </nav>
  );
}
