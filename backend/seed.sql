-- =============================================
-- KANTIN KITA - DATA SEEDER
-- =============================================
-- Run: mysql -u root -p kantin_kita < seed.sql
-- =============================================

DROP TABLE IF EXISTS menu_item_reviews;
DROP TABLE IF EXISTS restaurant_reviews;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS customization_options;
DROP TABLE IF EXISTS menu_customizations;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS vouchers;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS terms;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS marquee_nodes;
DROP TABLE IF EXISTS menu_categories;
DROP TABLE IF EXISTS restaurant_categories;
DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    latitude DOUBLE,
    longitude DOUBLE
);

CREATE TABLE menu_categories (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    priority INT
);

CREATE TABLE restaurant_categories (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE marquee_nodes (
    id VARCHAR(10) PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE faqs (
    id VARCHAR(10) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL
);

CREATE TABLE terms (
    id VARCHAR(10) PRIMARY KEY,
    content TEXT NOT NULL
);

CREATE TABLE vouchers (
    id VARCHAR(10) PRIMARY KEY,
    code VARCHAR(255) NOT NULL UNIQUE,
    value DOUBLE NOT NULL,
    description VARCHAR(255),
    min_spend DOUBLE,
    max_discount DOUBLE,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE restaurants (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    restaurant_category_id VARCHAR(10),
    is_open BOOLEAN NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    banner_image_url VARCHAR(255),
    address VARCHAR(255),
    operational_hours VARCHAR(255),
    location_id VARCHAR(10),
    cheapest_price DOUBLE,
    FOREIGN KEY (location_id) REFERENCES locations(id),
    FOREIGN KEY (restaurant_category_id) REFERENCES restaurant_categories(id)
);

CREATE TABLE menu_items (
    id VARCHAR(10) PRIMARY KEY,
    restaurant_id VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL,
    original_price DOUBLE,
    image_url VARCHAR(255),
    category_id VARCHAR(10) NOT NULL,

    is_popular BOOLEAN,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

CREATE TABLE menu_customizations (
    id VARCHAR(10) PRIMARY KEY,
    menu_item_id VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    is_required BOOLEAN NOT NULL,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

CREATE TABLE customization_options (
    id VARCHAR(10) PRIMARY KEY,
    customization_id VARCHAR(10) NOT NULL,
    label VARCHAR(255) NOT NULL,
    price DOUBLE,
    FOREIGN KEY (customization_id) REFERENCES menu_customizations(id)
);

CREATE TABLE banners (
    id VARCHAR(10) PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    link_url VARCHAR(255),
    is_active BOOLEAN NOT NULL,
    location_id VARCHAR(10),
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE users (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nim VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    location_id VARCHAR(10),
    semester INT,
    role VARCHAR(255) NOT NULL,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE orders (
    id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    restaurant_id VARCHAR(10) NOT NULL,
    order_number VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    payment_status VARCHAR(255) NOT NULL,
    payment_url VARCHAR(255),
    payment_external_id VARCHAR(255),
    mode VARCHAR(255) NOT NULL,
    subtotal DOUBLE NOT NULL,
    discount_amount DOUBLE,
    app_fee DOUBLE,
    total_amount DOUBLE NOT NULL,
    voucher_code VARCHAR(255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE order_items (
    id VARCHAR(10) PRIMARY KEY,
    order_id VARCHAR(10) NOT NULL,
    menu_item_id VARCHAR(10),
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    image_url VARCHAR(255),
    variant_name VARCHAR(255),
    note VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

CREATE TABLE restaurant_reviews (
    id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    order_id VARCHAR(10) NOT NULL,
    restaurant_id VARCHAR(10) NOT NULL,
    rating INT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE menu_item_reviews (
    id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10) NOT NULL,
    order_id VARCHAR(10) NOT NULL,
    menu_item_id VARCHAR(10) NOT NULL,
    rating INT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

SET FOREIGN_KEY_CHECKS = 0;

-- =============================================
-- LOCATIONS
-- =============================================
INSERT INTO locations (id, name, address, latitude, longitude) VALUES
('loc_001', 'Kantin Pusat', 'Gedung Utama Lt. 1', -6.2088, 106.8456),
('loc_002', 'Kantin Teknik', 'Gedung Teknik Lt. Dasar', -6.2100, 106.8480),
('loc_003', 'Kantin Ekonomi', 'Gedung Ekonomi Lt. 2', -6.2075, 106.8430);

-- =============================================
-- CATEGORIES
-- =============================================
INSERT INTO restaurant_categories (id, name) VALUES
('rct_001', 'Masakan Rumah'),
('rct_002', 'Ayam'),
('rct_003', 'Kopi & Minuman'),
('rct_004', 'Mie'),
('rct_005', 'Sate'),
('rct_006', 'Bakso'),
('rct_007', 'Pecel'),
('rct_008', 'Seblak'),
('rct_009', 'Soto'),
('rct_010', 'Ikan Bakar');

INSERT INTO menu_categories (id, name, priority) VALUES
('cat_001', 'Nasi', 1),
('cat_002', 'Mie', 2),
('cat_003', 'Ayam', 3),
('cat_004', 'Minuman', 4),
('cat_005', 'Camilan', 5),
('cat_006', 'Seafood', 6),
('cat_007', 'Manis', 7);

-- =============================================
-- MARQUEE NODES
-- =============================================
INSERT INTO marquee_nodes (id, text, is_active) VALUES
('mrq_001', '🍱 Promo spesial setiap hari! Diskon s.d 50%', TRUE),
('mrq_002', '🎉 Gratis ongkir untuk area kantin!', TRUE),
('mrq_003', '🔥 Ayam Geprek Bensu lagi viral! Coba sekarang', TRUE),
('mrq_004', '☕ Kopi Kenangan buy 1 get 1 setiap jam 10 pagi', TRUE),
('mrq_005', '📱 Pesan sekarang, bayar nanti pake Xendit', TRUE);

-- =============================================
-- FAQS
-- =============================================
INSERT INTO faqs (id, question, answer) VALUES
('faq_001', 'Bagaimana cara memesan makanan di Kantin Kita?', 'Anda dapat memilih stan makanan di halaman utama, memilih menu yang diinginkan, menambahkannya ke keranjang, dan melakukan checkout.'),
('faq_002', 'Metode pembayaran apa saja yang tersedia?', 'Saat ini kami mendukung pembayaran melalui Xendit (Virtual Account, E-Wallet, QRIS, dan metode lainnya).'),
('faq_003', 'Berapa lama waktu penyiapan makanan?', 'Waktu penyiapan bervariasi antara 10-20 menit tergantung pada antrean di stan makanan.'),
('faq_004', 'Apakah saya bisa membatalkan pesanan?', 'Pesanan hanya dapat dibatalkan sebelum stan makanan mulai menyiapkan pesanan Anda. Silakan hubungi stan terkait segera.');

-- =============================================
-- TERMS
-- =============================================
INSERT INTO terms (id, content) VALUES
('trm_001', '# Ketentuan Layanan

Selamat datang di **Kantin Kita**. Dengan menggunakan aplikasi ini, Anda setuju untuk mematuhi ketentuan berikut:

## 1. Penggunaan Layanan
Aplikasi ini hanya dapat digunakan untuk memesan makanan di lingkungan kantin perusahaan.

## 2. Pemesanan dan Pembayaran
- Seluruh harga sudah termasuk pajak layanan.
- Kesalahan pemilihan menu setelah diproses oleh stan tidak dapat dibatalkan.
- Pembayaran dilakukan melalui Xendit dan wajib diselesaikan dalam waktu 24 jam.

## 3. Kebijakan Privasi
Kami menjaga kerahasiaan data pesanan Anda dan hanya menggunakannya untuk keperluan transaksi.

## 4. Perubahan Ketentuan
Kami berhak mengubah ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.');

-- =============================================
-- VOUCHERS
-- =============================================
INSERT INTO vouchers (id, code, value, description, max_discount, is_active) VALUES
('vch_001', 'HEMAT20', 20, 'Diskon 20% khusus makanan favoritmu (Maks. Rp 15.000)', 15000, TRUE),
('vch_002', 'DISKON10', 10, 'Potongan harga langsung 10% tanpa min. belanja (Maks. Rp 5.000)', 5000, TRUE),
('vch_003', 'DINEIN30', 30, 'Hemat 30% khusus Makan di Tempat (Maks. Rp 20.000)', 20000, TRUE);

-- =============================================
-- RESTAURANTS
-- =============================================
INSERT INTO restaurants (id, name, restaurant_category_id, rating, rating_count, reviews_count, is_open, image_url, banner_image_url, address, operational_hours, location_id, cheapest_price) VALUES
('rst_001', 'Warung Bu Ani', 'rct_001', 4.8, 0, '1.2rb', TRUE, 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', 'Kantin Pusat Lt. 1, Blok A', '08:00 - 17:00', 'loc_001', 15000),
('rst_002', 'Ayam Geprek Bensu', 'rct_002', 4.6, 0, '890rb', TRUE, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1598103442097-8b74f2e94f0d?auto=format&fit=crop&w=1200&q=80', 'Kantin Teknik Lt. Dasar, Blok C', '09:00 - 20:00', 'loc_002', 18000),
('rst_003', 'Kopi Kenangan', 'rct_003', 4.5, 0, '2.1rb', TRUE, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80', 'Kantin Pusat Lt. 1, Blok B', '07:00 - 18:00', 'loc_001', 12000),
('rst_004', 'Mie Aceh Jaya', 'rct_004', 4.7, 0, '650rb', TRUE, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1612929633738-8fe03f7d0b9c?auto=format&fit=crop&w=1200&q=80', 'Kantin Ekonomi Lt. 2, Blok A', '09:00 - 19:00', 'loc_003', 20000);

-- =============================================
-- MENU ITEMS
-- =============================================
INSERT INTO menu_items (id, restaurant_id, name, description, price, original_price, image_url, category_id, is_popular) VALUES
('mnu_001', 'rst_001', 'Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam suwir, dan kerupuk', 20000, 25000, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80', 'cat_002', TRUE),
('mnu_002', 'rst_001', 'Ayam Bakar Madu', 'Ayam bakar dengan bumbu madu khas Bu Ani', 30000, NULL, 'https://images.unsplash.com/photo-1598103442097-8b74f2e94f0d?auto=format&fit=crop&w=400&q=80', 'cat_004', TRUE),
('mnu_003', 'rst_001', 'Es Teh Manis', 'Teh manis segar dengan es batu', 5000, NULL, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80', 'cat_005', FALSE),
('mnu_004', 'rst_001', 'Pisang Goreng', 'Pisang goreng crispy taburan gula halus', 8000, 10000, 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=400&q=80', 'cat_006', FALSE),
('mnu_005', 'rst_002', 'Ayam Geprek Level 5', 'Ayam geprek super pedas level 5 dengan nasi hangat', 16000, 20000, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80', 'cat_004', TRUE),
('mnu_006', 'rst_002', 'Paket Geprek Komplit', 'Ayam geprek + nasi + telur + tahu + es teh', 35000, NULL, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80', 'cat_004', TRUE),
('mnu_007', 'rst_002', 'Es Jeruk', 'Jeruk peras segar', 5000, NULL, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80', 'cat_005', FALSE),
('mnu_008', 'rst_003', 'Kopi Susu Mantan', 'Kopi susu kekinian dengan rasa caramel', 14000, 18000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80', 'cat_005', TRUE),
('mnu_009', 'rst_003', 'Matcha Latte', 'Latte dengan bubuk matcha premium', 22000, NULL, 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=400&q=80', 'cat_005', TRUE),
('mnu_010', 'rst_003', 'Croissant Coklat', 'Croissant panggang dengan isian coklat leleh', 15000, NULL, 'https://images.unsplash.com/photo-1555507036-ab1f4038028a?auto=format&fit=crop&w=400&q=80', 'cat_008', FALSE),
('mnu_011', 'rst_004', 'Mie Aceh Original', 'Mie Aceh dengan daging sapi dan bumbu khas Aceh', 25000, NULL, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80', 'cat_003', TRUE),
('mnu_012', 'rst_004', 'Mie Aceh Seafood', 'Mie Aceh dengan campuran seafood segar', 28000, 35000, 'https://images.unsplash.com/photo-1552611052-33e04de1b100?auto=format&fit=crop&w=400&q=80', 'cat_007', TRUE),
('mnu_013', 'rst_004', 'Mie Aceh Goreng', 'Mie Aceh versi goreng dengan bumbu spesial', 28000, NULL, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80', 'cat_003', FALSE),
('mnu_014', 'rst_004', 'Es Kelapa Muda', 'Air kelapa muda segar dengan daging kelapa', 8000, NULL, 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80', 'cat_005', FALSE);

-- =============================================
-- MENU CUSTOMIZATIONS
-- =============================================
INSERT INTO menu_customizations (id, menu_item_id, title, type, is_required) VALUES
('cst_001', 'mnu_001', 'Level Pedas', 'CHOICE', TRUE),
('cst_002', 'mnu_002', 'Topping', 'MULTIPLE', FALSE),
('cst_003', 'mnu_005', 'Level Pedas', 'CHOICE', TRUE),
('cst_004', 'mnu_006', 'Level Pedas', 'CHOICE', TRUE),
('cst_005', 'mnu_011', 'Level Pedas', 'CHOICE', TRUE),
('cst_006', 'mnu_011', 'Topping Tambahan', 'MULTIPLE', FALSE),
('cst_007', 'mnu_012', 'Level Pedas', 'CHOICE', TRUE),
('cst_008', 'mnu_013', 'Level Pedas', 'CHOICE', TRUE);

-- =============================================
-- CUSTOMIZATION OPTIONS
-- =============================================
-- Nasi Goreng Spesial -> Level Pedas
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_001', c.id, 'Tidak Pedas', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_001' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_002', c.id, 'Level 1', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_001' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_003', c.id, 'Level 2', 1000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_001' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_004', c.id, 'Level 3', 2000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_001' AND c.title = 'Level Pedas';

-- Ayam Bakar Madu -> Topping
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_005', c.id, 'Telur', 3000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_002' AND c.title = 'Topping';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_006', c.id, 'Tahu', 2000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_002' AND c.title = 'Topping';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_007', c.id, 'Tempe', 2000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_002' AND c.title = 'Topping';

-- Ayam Geprek Level 5 -> Level Pedas
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_008', c.id, 'Level 1', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_005' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_009', c.id, 'Level 2', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_005' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_010', c.id, 'Level 3', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_005' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_011', c.id, 'Level 4', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_005' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_012', c.id, 'Level 5', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_005' AND c.title = 'Level Pedas';

-- Paket Geprek Komplit -> Level Pedas
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_013', c.id, 'Level 1', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_006' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_014', c.id, 'Level 2', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_006' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_015', c.id, 'Level 3', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_006' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_016', c.id, 'Level 4', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_006' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_017', c.id, 'Level 5', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_006' AND c.title = 'Level Pedas';

-- Mie Aceh Original -> Level Pedas
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_018', c.id, 'Tidak Pedas', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_011' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_019', c.id, 'Level 1', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_011' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_020', c.id, 'Level 2', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_011' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_021', c.id, 'Level 3', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_011' AND c.title = 'Level Pedas';

-- Mie Aceh Original -> Topping Tambahan
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_022', c.id, 'Telur', 5000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_011' AND c.title = 'Topping Tambahan';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_023', c.id, 'Bakso', 8000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_011' AND c.title = 'Topping Tambahan';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_024', c.id, 'Udang', 12000 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_011' AND c.title = 'Topping Tambahan';

-- Mie Aceh Seafood -> Level Pedas
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_025', c.id, 'Tidak Pedas', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_012' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_026', c.id, 'Level 1', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_012' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_027', c.id, 'Level 2', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_012' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_028', c.id, 'Level 3', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_012' AND c.title = 'Level Pedas';

-- Mie Aceh Goreng -> Level Pedas
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_029', c.id, 'Tidak Pedas', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_013' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_030', c.id, 'Level 1', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_013' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_031', c.id, 'Level 2', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_013' AND c.title = 'Level Pedas';
INSERT INTO customization_options (id, customization_id, label, price)
SELECT 'opt_032', c.id, 'Level 3', 0 FROM menu_customizations c WHERE c.menu_item_id = 'mnu_013' AND c.title = 'Level Pedas';

-- =============================================
-- BANNERS
-- =============================================
INSERT INTO banners (id, image_url, title, link_url, is_active, location_id) VALUES
('bnr_001', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', 'Promo Akhir Bulan!', '/promo', TRUE, 'loc_001'),
('bnr_002', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80', 'Makan Siang Hemat', '/promo', TRUE, 'loc_001'),
('bnr_003', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', 'Menu Baru! Ayam Geprek Bensu', '/restaurant/rst_002', TRUE, 'loc_002'),
('bnr_004', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80', 'Kopi Spesial Hari Ini', '/restaurant/rst_003', TRUE, 'loc_001');

SET FOREIGN_KEY_CHECKS = 1;
