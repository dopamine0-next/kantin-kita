import Link from "next/link";

import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-24">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* BRAND */}

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">Kantin UNPAM</h2>

          <p className="mt-4 text-slate-300 leading-relaxed">
            Platform pemesanan makanan kampus modern untuk mahasiswa Universitas
            Pamulang.
          </p>
        </div>

        {/* MENU */}

        <div>
          <h3 className="text-xl font-bold mb-5">Menu</h3>

          <div className="flex flex-col gap-3 text-slate-300">
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>

            <Link
              href="/restaurants"
              className="hover:text-yellow-400 transition"
            >
              Restaurant
            </Link>

            <a href="#checkout" className="hover:text-yellow-400 transition">
              Checkout
            </a>
          </div>
        </div>

        {/* LAYANAN */}

        <div>
          <h3 className="text-xl font-bold mb-5">Layanan</h3>

          <div className="flex flex-col gap-3 text-slate-300">
            <a href="#pickup" className="hover:text-yellow-400 transition">
              Pickup
            </a>

            <a href="#dinein" className="hover:text-yellow-400 transition">
              Dine In
            </a>

            <a
              href="#online-order"
              className="hover:text-yellow-400 transition"
            >
              Online Order
            </a>
          </div>
        </div>

        {/* CONTACT */}

        <div>
          <h3 className="text-xl font-bold mb-5">Contact Us</h3>

          <div className="flex gap-5 text-3xl">
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/628123456789"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              className="hover:text-slate-300 transition"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-slate-400">
          © 2026 Kantin UNPAM. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
