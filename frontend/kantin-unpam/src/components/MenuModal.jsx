"use client";

import { useState } from "react";

export default function MenuModal({ item, closeModal, addToCart }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  // SINGLE
  const handleSingleSelect = (groupTitle, option) => {
        setSelectedOptions({...selectedOptions, [groupTitle]: [option],
    });
  };

  // MULTIPLE
  const handleMultipleSelect = (groupTitle, option) => {
    const current = selectedOptions[groupTitle] || [];

    const exists = current.find((item) => item.name === option.name);

    if (exists) {
      setSelectedOptions({ ...selectedOptions, [groupTitle]: current.filter((item) => item.name !== option.name),
      });
    } else {
      setSelectedOptions({...selectedOptions, [groupTitle]: [...current, option],
      });
    }
  };

  const allSelectedOptions = Object.values(selectedOptions).flat();

  const totalPrice = item.price + allSelectedOptions.reduce((acc, option) => acc + option.price, 0);

  const handleAdd = () => {
    addToCart({...item, addons: allSelectedOptions.map((option) => option.name), finalPrice: totalPrice,
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className=" bg-white w-full max-w-md rounded-3xl overflow-hidden">

        {/* IMAGE */}
        <img src={item.image} className=" w-full h-56 object-cover"/>

        <div className="p-6">
          {/* TITLE */}
          <h2 className="text-2xl font-bold">{item.name}</h2>

          <p className="mt-2 text-slate-500">Pilih opsi menu</p>

          {/* OPTIONS */}
          <div className="mt-8 space-y-8">
            {item.options?.map((group) => (
              <div key={group.title}>
                <h3 className="font-bold mb-4">{group.title}</h3>

                <div className="flex flex-col gap-4">
                  {group.items.map((option) => {
                    const selected = (selectedOptions[group.title] || []).find(
                      (item) => item.name === option.name,
                    );

                    return (
                      <label key={option.name} className=" flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input type={ group.type === "multiple" ? "checkbox" : "radio" }
                            name={group.title} checked={!!selected} onChange={() => group.type === "multiple"
                                ? handleMultipleSelect(group.title, option)
                                : handleSingleSelect(group.title, option)
                            }
                          />

                          <span>{option.name}</span>
                        </div>

                        <span>+Rp {option.price.toLocaleString()}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div
            className="mt-10 flex items-center justify-between">

            <div>
              <p className="text-slate-500">Total</p>
              <h2 className="text-2xl font-bold">Rp {totalPrice.toLocaleString()}</h2>
            </div>

            <button onClick={handleAdd} className="bg-yellow-400 px-6 py-3 rounded-2xl font-bold">
              Add
            </button>
          </div>

          {/* CLOSE */}
          <button
            onClick={closeModal}
            className="mt-5 w-full border py-3 rounded-2xl">
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}
