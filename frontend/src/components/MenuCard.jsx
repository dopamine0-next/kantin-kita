export default function MenuCard({ item, openMenuModal }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow">
      <img src={item.image} className="w-full h-32 object-cover rounded-xl" />

      <div className="mt-2 flex justify-between items-center">
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p>Rp {item.price.toLocaleString()}</p>
        </div>

        {/* ➕ BUTTON ADD */}
        <button
          onClick={() => openMenuModal(item)}
          className="bg-yellow-400 w-10 h-10 rounded-full text-xl font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}
