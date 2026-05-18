'use client'

import { useState } from 'react';



import { useCart } from '@/store/cart';



















export default function FoodCard({ item }: any) {
  const [open, setOpen] = useState(false)

  const addToCart = useCart((state) => state.addToCart)

  const [selectedOptions, setSelectedOptions] = useState<any>({})

  const handleSelect = (groupTitle: string, option: any, type: string) => {
    setSelectedOptions((prev: any) => {
      const current = prev[groupTitle] || []

      if (type === 'single') {
        return {
          ...prev,
          [groupTitle]: [option],
        }
      }

      const exists = current.find((x: any) => x.name === option.name)

      return {
        ...prev,
        [groupTitle]: exists
          ? current.filter((x: any) => x.name !== option.name)
          : [...current, option],
      }
    })
  }

  const extras = Object.values(selectedOptions).flat()

  const totalPrice = item.price + extras.reduce((acc: number, i: any) => acc + i.price, 0)

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      addons: extras.map((x: any) => x.name),
      finalPrice: totalPrice,
    })

    setOpen(false)
  }

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md active:scale-[0.99]"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img src={item.image} className="h-20 w-20 rounded-xl object-cover" />

          <div className="flex flex-col">
            <p className="text-m font-semibold text-gray-900">{item.name}</p>

            <p className="text-m text-gray-500">Rp {(item.price ?? 0).toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg text-white">
          +
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
            {/* HEADER */}
            <div className="flex items-start gap-4">
              <img src={item.image} className="h-20 w-20 rounded-2xl object-cover" />

              <div className="flex-1">
                <h2 className="text-lg font-bold">{item.name}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Rp {(item.price ?? 0).toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* OPTIONS */}
            {Object.values(item.options || {}).map((group: any) => (
              <div key={group.title} className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{group.title}</h3>

                  <span className="text-xs text-gray-400">
                    {group.type === 'single' ? 'Choose one' : 'Optional'}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.items.map((option: any) => {
                    const selected = (selectedOptions[group.title] || []).find(
                      (x: any) => x.name === option.name
                    )

                    return (
                      <label
                        key={option.name}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-3 text-sm transition ${
                          selected ? 'border-black bg-gray-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type={group.type === 'single' ? 'radio' : 'checkbox'}
                            name={group.title}
                            checked={!!selected}
                            onChange={() => handleSelect(group.title, option, group.type)}
                          />

                          <span>{option.name}</span>
                        </div>

                        <span className="text-gray-500">
                          {option.price > 0 ? `+Rp ${option.price.toLocaleString('id-ID')}` : 'Rp0'}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* TOTAL */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <span className="font-semibold">Total</span>

              <span className="text-lg font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>

            {/* ACTIONS */}
            <div className="mt-5 space-y-2">
              <button
                onClick={handleAdd}
                className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Add to cart
              </button>

              <button onClick={() => setOpen(false)} className="w-full py-2 text-sm text-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
