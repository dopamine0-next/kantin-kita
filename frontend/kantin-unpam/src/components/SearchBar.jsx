export default function SearchBar({ search, setSearch }) {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-10">
      <input
        className="w-full p-4 rounded-2xl border"
        placeholder="Cari restoran..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
