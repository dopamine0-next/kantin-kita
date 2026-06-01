import { TermsApiResponse } from './terms.types'

export const MOCK_TERMS_API_RESPONSE: TermsApiResponse = {
  id: 'terms-v1',
  title: 'Ketentuan Layanan Kantin Kita',
  content: `
# Ketentuan Layanan

Selamat datang di **Kantin Kita**. Dengan menggunakan aplikasi ini, Anda setuju untuk mematuhi ketentuan berikut:

## 1. Penggunaan Layanan
Aplikasi ini hanya dapat digunakan untuk memesan makanan di lingkungan kantin perusahaan.

## 2. Pemesanan dan Pembayaran
- Seluruh harga sudah termasuk pajak layanan.
- Kesalahan pemilihan menu setelah diproses oleh stan tidak dapat dibatalkan.

## 3. Kebijakan Privasi
Kami menjaga kerahasiaan data pesanan Anda dan hanya menggunakannya untuk keperluan transaksi.

## 4. Perubahan Ketentuan
Kami berhak mengubah ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
  `,
}
