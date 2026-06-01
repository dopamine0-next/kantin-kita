import { FAQApiResponse } from './faq.types'

export const MOCK_FAQ_API_RESPONSE: FAQApiResponse[] = [
  {
    id: '1',
    question: 'Bagaimana cara memesan makanan di Kantin Kita?',
    answer:
      'Anda dapat memilih stan makanan di halaman utama, memilih menu yang diinginkan, menambahkannya ke keranjang, dan melakukan checkout.',
  },
  {
    id: '2',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'Saat ini kami mendukung pembayaran tunai di kasir dan berbagai metode e-wallet populer.',
  },
  {
    id: '3',
    question: 'Berapa lama waktu penyiapan makanan?',
    answer:
      'Waktu penyiapan bervariasi antara 10-20 menit tergantung pada antrean di stan makanan.',
  },
  {
    id: '4',
    question: 'Apakah saya bisa membatalkan pesanan?',
    answer:
      'Pesanan hanya dapat dibatalkan sebelum stan makanan mulai menyiapkan pesanan Anda. Silakan hubungi stan terkait segera.',
  },
]
