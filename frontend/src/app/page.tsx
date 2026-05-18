import Footer from '@/components/Footer'
import BestDeals from '@/components/bestDeals'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import PopularMenu from '@/components/popularMenu'
import Promo from '@/components/promo'
import Restaurants from '@/components/restaurants'
import SearchBar from '@/components/searchBar'

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-100 pb-20">
        <Hero />

        <SearchBar />

        <Restaurants />

        <Promo />

        <BestDeals />

        <PopularMenu />

        <Footer />
      </main>
    </>
  )
}
