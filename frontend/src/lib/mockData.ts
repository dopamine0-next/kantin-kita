export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  variants?: string[]
  rating?: number
  salesCount?: string
  isPopular?: boolean
}

export interface RestaurantDetail {
  id: string
  name: string
  cuisine: string
  rating: number
  reviewsCount: string
  walkTime: number
  distance: string
  isOpen: boolean
  promos: string[]
  image: string
  bannerImage: string
  address: string
  operationalHours: string
  categories: string[]
  menus: MenuItem[]
}

export const MOCK_RESTAURANTS_DETAILS: Record<string, RestaurantDetail> = {
  "stall-1": {
    id: "stall-1",
    name: "Soto & Bakso Mbok Sri",
    cuisine: "Soto Ayam, Bakso Urat, Mie Bakso",
    rating: 4.8,
    reviewsCount: "500+",
    walkTime: 8,
    distance: "50m",
    isOpen: true,
    promos: ["Diskon 20%", "Gratis Ongkir", "Cepat Saji"],
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    address: "Kantin Kita Utama, Stall No. 1, Lantai Dasar",
    operationalHours: "09:00 - 20:00",
    categories: ["Soto & Sup", "Bakso", "Camilan", "Minuman"],
    menus: [
      {
        id: "food-1-1",
        name: "Soto Ayam Campur Nasi",
        description: "Soto ayam dengan kuah kuning aromatik yang gurih, bihun, irisan telur, kol, tauge, taburan koya khas Mbok Sri, lengkap dengan nasi hangat.",
        price: 18000,
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80",
        category: "Soto & Sup",
        variants: ["Standard", "Ekstra Koya", "Ekstra Ceker"],
        rating: 4.9,
        salesCount: "1.2k+ terjual",
        isPopular: true,
      },
      {
        id: "food-1-2",
        name: "Soto Daging Sapi Madura",
        description: "Soto daging sapi empuk khas Madura dengan kuah gurih berempah, taburan daun bawang dan bawang goreng yang melimpah.",
        price: 25000,
        image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&w=300&q=80",
        category: "Soto & Sup",
        variants: ["Standard", "Dengan Nasi", "Tanpa Nasi"],
        rating: 4.8,
        salesCount: "500+ terjual",
      },
      {
        id: "food-1-3",
        name: "Bakso Urat Jumbo Spesial",
        description: "1 Bakso Urat super besar yang sangat bertekstur, 3 bakso halus kecil, disajikan dengan mie kuning, bihun, tahu bakso, kuah kaldu sapi pekat.",
        price: 22000,
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=300&q=80",
        category: "Bakso",
        variants: ["Mie Campur", "Bihun Saja", "Mie Kuning Saja", "Tanpa Mie"],
        rating: 4.9,
        salesCount: "800+ terjual",
        isPopular: true,
      },
      {
        id: "food-1-4",
        name: "Bakso Halus Telur Puyuh",
        description: "Bakso sapi halus premium yang di dalamnya berisi telur puyuh utuh, disajikan dengan kuah bening gurih segar.",
        price: 20000,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80",
        category: "Bakso",
        variants: ["Standard", "Ekstra Tahu"],
        rating: 4.7,
        salesCount: "350+ terjual",
      },
      {
        id: "food-1-5",
        name: "Tempe Mendoan Hangat (isi 3)",
        description: "Tempe lebar dibalur adonan tepung berbumbu kencur dan irisan daun bawang tebal, digoreng setengah matang, disajikan dengan cocolan kecap cabe rawit.",
        price: 10000,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80",
        category: "Camilan",
        rating: 4.8,
        salesCount: "1.5k+ terjual",
        isPopular: true,
      },
      {
        id: "food-1-6",
        name: "Es Teh Manis Selasih",
        description: "Es teh manis segar beraroma melati ditambah dengan biji selasih yang sehat.",
        price: 5000,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80",
        category: "Minuman",
        variants: ["Manis Sedang", "Manis Maksimal", "Tawar"],
        rating: 4.9,
        salesCount: "2k+ terjual",
      },
      {
        id: "food-1-7",
        name: "Es Jeruk Peras Murni",
        description: "Jeruk peras segar alami kaya vitamin C, dipadukan es batu kristal dan gula cair murni.",
        price: 8000,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=300&q=80",
        category: "Minuman",
        rating: 4.8,
        salesCount: "900+ terjual",
      }
    ]
  },
  "stall-2": {
    id: "stall-2",
    name: "Ayam Geprek Gahar",
    cuisine: "Ayam Geprek, Ayam Crispy, Ricebowl Pedas",
    rating: 4.7,
    reviewsCount: "380+",
    walkTime: 12,
    distance: "70m",
    isOpen: true,
    promos: ["Diskon 30%", "Voucher Rp 5rb", "Geprek Spesial"],
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    address: "Kantin Kita Utama, Stall No. 2, Lantai Dasar",
    operationalHours: "10:00 - 21:00",
    categories: ["Paket Geprek", "A la Carte", "Minuman"],
    menus: [
      {
        id: "food-2-1",
        name: "Paket Geprek Gahar Spesial",
        description: "Nasi hangat + Ayam Geprek dada/paha atas yang renyah dan gurih, digeprek dengan sambal korek bawang yang pedas gahar, lengkap dengan lalapan dan es teh manis.",
        price: 23000,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80",
        category: "Paket Geprek",
        variants: ["Level 1 (Sante)", "Level 3 (Gahar)", "Level 5 (Mampus)"],
        rating: 4.8,
        salesCount: "2.4k+ terjual",
        isPopular: true,
      },
      {
        id: "food-2-2",
        name: "Geprek Mozzarella Lumer",
        description: "Ayam geprek crispy premium ditutup dengan keju mozzarella melimpah yang dibakar lumer. Sensasi pedas dan gurih creamy berpadu sempurna.",
        price: 27000,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80",
        category: "Paket Geprek",
        variants: ["Level 1", "Level 2", "Level 3", "Level 4"],
        rating: 4.9,
        salesCount: "1.1k+ terjual",
        isPopular: true,
      },
      {
        id: "food-2-3",
        name: "Nasi Ayam Geprek Sambal Matah",
        description: "Nasi hangat disajikan dengan potongan ayam goreng tepung crispy yang digeprek kasar dan disiram sambal matah khas Bali yang segar aromatik.",
        price: 24000,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80",
        category: "Paket Geprek",
        variants: ["Sambal Matah Pedas", "Sambal Matah Sedang"],
        rating: 4.7,
        salesCount: "800+ terjual",
      },
      {
        id: "food-2-4",
        name: "Kulit Ayam Crispy Garing",
        description: "Kulit ayam gurih berbumbu yang digoreng hingga super crispy, kriuknya tahan lama. Disajikan dengan cocolan sambal bawang terpisah.",
        price: 14000,
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=300&q=80",
        category: "A la Carte",
        rating: 4.8,
        salesCount: "1.8k+ terjual",
        isPopular: true,
      },
      {
        id: "food-2-5",
        name: "Es Timun Selasih Madu",
        description: "Serutan timun segar berpadu dengan selasih, sirup melon berkualitas, perasan jeruk nipis, dan sentuhan madu hutan.",
        price: 9000,
        image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=300&q=80",
        category: "Minuman",
        rating: 4.9,
        salesCount: "600+ terjual",
      }
    ]
  },
  "stall-3": {
    id: "stall-3",
    name: "Kopi & Roti Bakar Kanto",
    cuisine: "Kopi Susu Gula Aren, Toast, Roti Bakar Coklat",
    rating: 4.9,
    reviewsCount: "1.2k+",
    walkTime: 4,
    distance: "15m",
    isOpen: true,
    promos: ["Beli 1 Gratis 1", "Es Kopi Susu Murah", "Cemilan Hemat"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    address: "Kantin Kita Utama, Stall No. 3, Lantai Dasar",
    operationalHours: "08:00 - 22:00",
    categories: ["Coffee", "Toast & Roti", "Non-Coffee"],
    menus: [
      {
        id: "food-3-1",
        name: "Es Kopi Susu Kanto Aren",
        description: "Signature coffee cup! Espresso blend premium arabika dan robusta dipadukan susu creamy segar dan sirup gula aren organik cair asli.",
        price: 15000,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80",
        category: "Coffee",
        variants: ["Less Sweet", "Normal Sweet", "Extra Espresso Shot"],
        rating: 4.9,
        salesCount: "5k+ terjual",
        isPopular: true,
      },
      {
        id: "food-3-2",
        name: "Caramel Macchiato Ice",
        description: "Espresso shot dengan susu vanila creamy, ditutup dengan busa lembut dan siraman saus karamel manis wangi melimpah.",
        price: 22000,
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=300&q=80",
        category: "Coffee",
        variants: ["Standard", "Less Ice"],
        rating: 4.8,
        salesCount: "1.2k+ terjual",
      },
      {
        id: "food-3-3",
        name: "Roti Bakar Choco Cheese Premium",
        description: "Roti tawar tebal panggang mentega dengan isian melimpah parutan coklat meses klasik berkualitas tinggi dan keju cheddar tebal serut.",
        price: 18000,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
        category: "Toast & Roti",
        variants: ["Standard", "Roti Gandum (+Rp3rb)"],
        rating: 4.9,
        salesCount: "2.1k+ terjual",
        isPopular: true,
      },
      {
        id: "food-3-4",
        name: "Smoked Beef & Egg Toast",
        description: "Roti brioche panggang wangi, diisi dengan smoked beef tebal juicy, telur dadar lipat lembut, keju slice, dan saus mayo special Kanto.",
        price: 24000,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80",
        category: "Toast & Roti",
        variants: ["Pedas Sedang", "Sangat Pedas", "Tidak Pedas"],
        rating: 4.8,
        salesCount: "950+ terjual",
        isPopular: true,
      },
      {
        id: "food-3-5",
        name: "Matcha Uji Latte Premium",
        description: "Bubuk matcha asli Uji Kyoto Jepang diseduh dengan air hangat, dicampur susu oat segar berkualitas premium menghasilkan rasa gurih alami matcha.",
        price: 20000,
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=300&q=80",
        category: "Non-Coffee",
        variants: ["Hot", "Iced"],
        rating: 4.9,
        salesCount: "1.4k+ terjual",
      }
    ]
  },
  "stall-4": {
    id: "stall-4",
    name: "Dapur Seafood Selera Rasa",
    cuisine: "Ikan Bakar, Udang Geprek, Cumi Saus Padang",
    rating: 4.6,
    reviewsCount: "120+",
    walkTime: 18,
    distance: "120m",
    isOpen: true,
    promos: ["Diskon Spesial 15%", "Seafood Segar"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    address: "Kantin Kita Utama, Stall No. 4, Lantai Dasar",
    operationalHours: "11:00 - 21:30",
    categories: ["Ikan Bakar", "Seafood Tumis", "Paket Nasi"],
    menus: [
      {
        id: "food-4-1",
        name: "Ikan Nila Bakar Madu Spesial",
        description: "1 ekor ikan nila segar ukuran sedang dibakar merata dibalut bumbu madu manis gurih meresap, disajikan dengan lalapan kol, timun, dan sambal terasi matang.",
        price: 32000,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80",
        category: "Ikan Bakar",
        rating: 4.7,
        salesCount: "300+ terjual",
        isPopular: true,
      },
      {
        id: "food-4-2",
        name: "Cumi Ring Saus Padang Gila",
        description: "Potongan cumi segar kenyal empuk ditumis dengan bawang bombay, cabe merah, saus Padang racikan chef kental berwarna jingga pedas gurih.",
        price: 28000,
        image: "https://images.unsplash.com/photo-1534080391025-aa7c050e19cd?auto=format&fit=crop&w=300&q=80",
        category: "Seafood Tumis",
        variants: ["Pedas Sedang", "Pedas Pol"],
        rating: 4.8,
        salesCount: "450+ terjual",
        isPopular: true,
      },
      {
        id: "food-4-3",
        name: "Udang Goreng Mentega Gurih",
        description: "Udang laut segar digoreng cepat lalu ditumis saus mentega harum bumbu bawang bombay dan kecap inggris premium.",
        price: 30000,
        image: "https://images.unsplash.com/photo-1559742811-82410b51c4c9?auto=format&fit=crop&w=300&q=80",
        category: "Seafood Tumis",
        rating: 4.6,
        salesCount: "250+ terjual",
      }
    ]
  },
  "stall-5": {
    id: "stall-5",
    name: "Mie Ayam Pangsit Pak Dadi",
    cuisine: "Mie Ayam Jamur, Pangsit Rebus, Bakso Kuah",
    rating: 4.9,
    reviewsCount: "240+",
    walkTime: 9,
    distance: "60m",
    isOpen: true,
    promos: ["Diskon 25%", "Pangsit Gratis"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80",
    bannerImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    address: "Kantin Kita Utama, Stall No. 5, Lantai Dasar",
    operationalHours: "08:30 - 19:30",
    categories: ["Mie Ayam", "Bakso & Pangsit", "Minuman"],
    menus: [
      {
        id: "food-5-1",
        name: "Mie Ayam Jamur Pangsit Spesial",
        description: "Mie kenyal buatan Pak Dadi ditabur ayam kecap potong dadu gurih manis, jamur kancing kenyal, daun caisim segar, kuah kaldu harum dipisah, dan 2 buah pangsit rebus lembut.",
        price: 18000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80",
        category: "Mie Ayam",
        variants: ["Mie Pipih", "Mie Bulat Standard", "Mie Lebar"],
        rating: 4.9,
        salesCount: "1.8k+ terjual",
        isPopular: true,
      },
      {
        id: "food-5-2",
        name: "Mie Ayam Rica Pedas Nyengir",
        description: "Bagi pecinta pedas! Mie ayam kenyal dipadukan dengan tumisan daging ayam cincang bumbu rica pedas wangi daun jeruk.",
        price: 19000,
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=300&q=80",
        category: "Mie Ayam",
        variants: ["Level Sedang", "Level Pedas Mampus"],
        rating: 4.8,
        salesCount: "800+ terjual",
      },
      {
        id: "food-5-3",
        name: "Sup Pangsit Rebus isi 5",
        description: "5 Pcs pangsit rebus buatan tangan Pak Dadi dengan isian cincang daging ayam berbumbu tebal wangi minyak wijen, disajikan dalam kuah kaldu sapi bening.",
        price: 15000,
        image: "https://images.unsplash.com/photo-1547928500-3444081efb8f?auto=format&fit=crop&w=300&q=80",
        category: "Bakso & Pangsit",
        rating: 4.9,
        salesCount: "1.2k+ terjual",
        isPopular: true,
      }
    ]
  }
}
