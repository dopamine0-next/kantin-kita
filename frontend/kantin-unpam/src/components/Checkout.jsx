export default function Checkout() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <input className="w-full border p-3 mb-3 rounded-xl" placeholder="Nama" />
      <input
        className="w-full border p-3 mb-3 rounded-xl"
        placeholder="No HP"
      />

      <select className="w-full border p-3 mb-3 rounded-xl">
        <option>Pickup</option>
        <option>Dine In</option>
      </select>

      <textarea
        className="w-full border p-3 mb-3 rounded-xl"
        placeholder="Catatan"
      />

      <button className="w-full bg-yellow-400 py-3 rounded-xl font-bold">
        Bayar Sekarang
      </button>
    </div>
  );
}
