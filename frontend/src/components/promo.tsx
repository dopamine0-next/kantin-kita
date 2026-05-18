export default function Promo() {
  return (
    <div className="mt-6 px-4">
      <h2 className="mb-2 font-bold">Promo</h2>

      <div className="flex gap-3 overflow-x-auto">
        <div className="h-24 min-w-[220px] rounded-xl bg-red-100 p-3">Diskon 50% Coffee</div>

        <div className="h-24 min-w-[220px] rounded-xl bg-blue-100 p-3">Gratis Es Teh</div>
      </div>
    </div>
  )
}
