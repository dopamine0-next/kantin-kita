"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart({ cart, increaseQty, decreaseQty, removeItem }) {
  const total = cart.reduce((acc, item) => acc + item.finalPrice * item.qty, 0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h2 className=" text-3xl font-bold mb-8"> Keranjang </h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id + item.addons} className="border-b pb-5 flex gap-4">
            {/* IMAGE */}

            <img src={item.image} className=" w-24 h-24 object-cover rounded-2xl"/>

            {/* CONTENT */}

            <div className="flex-1">
              <h3
                className="
                font-bold text-lg
              "
              >
                {item.name}
              </h3>

              {/* ADDONS */}

              {item.addons?.length > 0 && (
                <div
                  className="
                  mt-2 flex flex-wrap gap-2
                "
                >
                  {item.addons.map((addon, index) => (
                    <span
                      key={index}
                      className="
                          bg-yellow-100
                          text-yellow-700
                          px-3 py-1
                          rounded-full text-sm
                        "
                    >
                      {addon}
                    </span>
                  ))}
                </div>
              )}

              {/* PRICE */}

              <p
                className="
                mt-3 font-semibold
              "
              >
                Rp {item.finalPrice.toLocaleString()}
              </p>

              {/* QTY */}

              <div
                className="
                flex items-center gap-3
                mt-4
              "
              >
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="
                    bg-slate-200
                    w-8 h-8 rounded-full
                    flex items-center
                    justify-center
                  "
                >
                  <Minus size={16} />
                </button>

                <span className="font-bold">{item.qty}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="
                    bg-slate-900 text-white
                    w-8 h-8 rounded-full
                    flex items-center
                    justify-center
                  "
                >
                  <Plus size={16} />
                </button>

                {/* DELETE */}

                <button
                  onClick={() => removeItem(item.id)}
                  className="
                    ml-4 text-red-500
                  "
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}

      <div
        className="
        mt-8 pt-6 border-t
        flex items-center
        justify-between
        text-2xl font-bold
      "
      >
        <span>Total</span>

        <span>Rp {total.toLocaleString()}</span>
      </div>
    </div>
  );
}
