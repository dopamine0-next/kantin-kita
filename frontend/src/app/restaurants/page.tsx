import Link from 'next/link';



import BackButton from '@/components/backButton';
import Navbar from '@/components/navbar';
import SearchBar from '@/components/searchBar';
import { restaurants } from '@/data/restaurants';

export default function RestaurantsPage() {
  // HERO pakai 1 featured resto (misalnya pertama)
  const featured = restaurants[0]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 pb-20">
        {/* spacing bawah navbar fixed */}
        <div className="pt-20">
          {/* 🔥 HERO FULL IMAGE */}
          <section className="-mx-4 w-screen">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={featured.banner}
                alt={featured.name}
                className="h-full w-full object-cover"
              />
            </div>
          </section>
          <BackButton />

          {/* 🔥 SEARCH BAR */}
          <div className="mt-4 px-4">
            <SearchBar />
          </div>

          {/* 🔥 TITLE */}
          <div className="min-h-screen px-4">
            <h1 className="mt-6 mb-5 text-2xl font-bold">Semua Restoran</h1>

            {/* 🔥 LIST RESTO */}
            <div className="flex w-full flex-col gap-4">
              {restaurants.map((r) => (
                <Link
                  key={r.slug}
                  href={`/restaurants/${r.slug}`}
                  className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]"
                >
                  {/* IMAGE */}
                  <img src={r.banner} alt={r.name} className="h-20 w-20 rounded-xl object-cover" />

                  {/* TEXT */}
                  <div className="flex flex-col">
                    <h2 className="text-base font-semibold">{r.name}</h2>

                    <p className="text-sm text-slate-500">{r.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
