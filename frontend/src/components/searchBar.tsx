'use client'

export default function SearchBar() {
  return (
    <div className="mt-2 px-4">
      <input
        type="text"
        placeholder="Cari makanan atau resto..."
        className="w-full rounded-full border px-4 py-2 text-sm"
      />
    </div>
  )
}
