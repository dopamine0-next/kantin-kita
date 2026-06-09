package com.example.demo.seed;

import com.example.demo.entity.*;
import com.example.demo.entity.enums.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    @Value("${app.seed.enabled:false}")
    private boolean seedEnabled;

    private final LocationRepository locationRepository;
    private final CategoryRepository categoryRepository;
    private final MarqueeNodeRepository marqueeNodeRepository;
    private final FAQRepository faqRepository;
    private final TermRepository termRepository;
    private final VoucherRepository voucherRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final BannerRepository bannerRepository;
    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final OrderRepository orderRepository;
    private final RestaurantReviewRepository restaurantReviewRepository;
    private final MenuItemReviewRepository menuItemReviewRepository;
    private final PasswordEncoder passwordEncoder;

    private final Faker faker = new Faker(new Locale("id", "ID"));
    private final Random rand = ThreadLocalRandom.current();

    private static final List<String> RESTAURANT_NAMES = List.of(
            "Warung Bu Ani", "Ayam Geprek Bensu", "Kopi Kenangan",
            "Mie Aceh Jaya", "Sate Pak Haji", "Bakso Mas Giri",
            "Pecel Ayu", "Seblak Mang Udin", "Soto Cak Har",
            "Ikan Bakar Sambal"
    );

    private static final List<String> CUISINES = List.of(
            "Masakan Rumah", "Ayam", "Kopi & Minuman", "Mie",
            "Sate", "Bakso", "Pecel", "Seblak", "Soto", "Ikan Bakar"
    );

    private static final String[] FOOD_NAMES = {
            "Nasi Goreng Spesial", "Ayam Bakar Madu", "Es Teh Manis",
            "Pisang Goreng", "Ayam Geprek Level 5", "Paket Geprek Komplit",
            "Es Jeruk", "Kopi Susu Mantan", "Matcha Latte",
            "Croissant Coklat", "Mie Aceh Original", "Mie Aceh Seafood",
            "Mie Aceh Goreng", "Es Kelapa Muda", "Sate Ayam",
            "Bakso Malang", "Soto Ayam", "Rawon",
            "Pecel Lele", "Ikan Bakar", "Tahu Gejrot",
            "Seblak", "Cilok", "Batagor",
            "Siomay", "Gudeg", "Rendang",
            "Capcay", "Ayam Penyet", "Tempe Orek",
            "Perkedel Jagung", "Sop Iga", "Tongseng",
            "Nasi Uduk", "Nasi Kuning", "Bubur Ayam"
    };

    private static final List<String> CATEGORIES = List.of(
            "Semua", "Nasi", "Mie", "Ayam", "Minuman", "Camilan", "Seafood", "Manis"
    );

    private static final List<String> PROMOS = List.of(
            "Diskon 30%", "Voucher Rp 5rb", "Promo Spesial",
            "Buy 1 Get 1", "Gratis Ongkir", "Paket Hemat"
    );

    private static final List<String> VARIANTS = List.of(
            "Original", "Level 1", "Level 2", "Level 3",
            "Level 4", "Level 5", "Paha", "Dada",
            "Iced", "Hot", "Kecil", "Besar"
    );

    private static final String[] RESTAURANT_IMAGES = {
            "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80"
    };

    private static final String[] BANNER_IMAGES = {
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1612929633738-8fe03f7d0b9c?auto=format&fit=crop&w=1200&q=80"
    };

    private static final String[] FOOD_IMAGES = {
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1598103442097-8b74f2e94f0d?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1555507036-ab1f4038028a?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1552611052-33e04de1b100?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80"
    };

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedEnabled) {
            log.info("Seeder disabled (app.seed.enabled=false)");
            return;
        }

        if (locationRepository.count() > 0) {
            log.info("Database already has data, skipping seed");
            return;
        }

        log.info("Starting data seeding...");

        List<Location> locations = seedLocations();
        List<Category> categories = seedCategories();
        seedMarqueeNodes();
        seedFAQs();
        seedTerms();
        seedVouchers();
        List<Vendor> vendors = seedVendors();
        List<Restaurant> restaurants = seedRestaurants(locations, vendors);
        seedMenuItems(restaurants, categories);
        seedBanners(locations);
        List<User> users = seedUsers(locations);
        Map<String, List<Order>> ordersByUser = seedOrders(users, restaurants);
        seedReviews(users, ordersByUser);

        log.info("Data seeding completed!");
    }

    private List<Vendor> seedVendors() {
        String[][] data = {
                {"Budi Santoso", "budi@kantin.id", "081234567890"},
                {"Siti Rahayu", "siti@kantin.id", "081234567891"},
                {"Agus Wijaya", "agus@kantin.id", "081234567892"},
        };

        List<Vendor> list = new ArrayList<>();
        for (String[] d : data) {
            list.add(vendorRepository.save(Vendor.builder()
                    .name(d[0])
                    .email(d[1])
                    .phone(d[2])
                    .password(passwordEncoder.encode("password"))
                    .build()));
        }
        log.info("Seeded {} vendors", list.size());
        return list;
    }

    private List<Location> seedLocations() {
        String[][] data = {
                {"Kantin Pusat", "Gedung Utama Lt. 1", "-6.2088", "106.8456"},
                {"Kantin Teknik", "Gedung Teknik Lt. Dasar", "-6.2100", "106.8480"},
                {"Kantin Ekonomi", "Gedung Ekonomi Lt. 2", "-6.2075", "106.8430"},
                {"Kantin Kedokteran", "Gedung FK Lt. 1", "-6.2110", "106.8410"},
                {"Kantin FISIP", "Gedung FISIP Lt. Ground", "-6.2065", "106.8465"}
        };

        List<Location> list = new ArrayList<>();
        for (String[] d : data) {
            list.add(locationRepository.save(Location.builder()
                    .name(d[0])
                    .address(d[1])
                    .latitude(Double.parseDouble(d[2]))
                    .longitude(Double.parseDouble(d[3]))
                    .build()));
        }
        log.info("Seeded {} locations", list.size());
        return list;
    }

    private List<Category> seedCategories() {
        List<Category> list = new ArrayList<>();
        for (int i = 0; i < CATEGORIES.size(); i++) {
            list.add(categoryRepository.save(Category.builder()
                    .name(CATEGORIES.get(i))
                    .priority(i == 0 ? 0 : i)
                    .build()));
        }
        log.info("Seeded {} categories", CATEGORIES.size());
        return list;
    }

    private void seedMarqueeNodes() {
        String[][] data = {
                {"Promo spesial setiap hari! Diskon s.d 50%"},
                {"Gratis ongkir untuk area kantin!"},
                {"Ayam Geprek Bensu lagi viral! Coba sekarang"},
                {"Kopi Kenangan buy 1 get 1 setiap jam 10 pagi"},
                {"Pesan sekarang, bayar nanti pake Xendit"}
        };

        for (String[] d : data) {
            marqueeNodeRepository.save(MarqueeNode.builder()
                    .text(d[0])
                    .isActive(true)
                    .build());
        }
        log.info("Seeded {} marquee nodes", data.length);
    }

    private void seedFAQs() {
        String[][] data = {
                {"Bagaimana cara memesan makanan di Kantin Kita?",
                        "Anda dapat memilih stan makanan di halaman utama, memilih menu yang diinginkan, menambahkannya ke keranjang, dan melakukan checkout."},
                {"Metode pembayaran apa saja yang tersedia?",
                        "Saat ini kami mendukung pembayaran melalui Xendit (Virtual Account, E-Wallet, QRIS, dan metode lainnya)."},
                {"Berapa lama waktu penyiapan makanan?",
                        "Waktu penyiapan bervariasi antara 10-20 menit tergantung pada antrean di stan makanan."},
                {"Apakah saya bisa membatalkan pesanan?",
                        "Pesanan hanya dapat dibatalkan sebelum stan makanan mulai menyiapkan pesanan Anda. Silakan hubungi stan terkait segera."}
        };

        for (String[] d : data) {
            faqRepository.save(FAQ.builder()
                    .question(d[0])
                    .answer(d[1])
                    .build());
        }
        log.info("Seeded {} FAQs", data.length);
    }

    private void seedTerms() {
        String content = "# Ketentuan Layanan\n\n"
                + "Selamat datang di **Kantin Kita**. Dengan menggunakan aplikasi ini, Anda setuju untuk mematuhi ketentuan berikut:\n\n"
                + "## 1. Penggunaan Layanan\n"
                + "Aplikasi ini hanya dapat digunakan untuk memesan makanan di lingkungan kantin perusahaan.\n\n"
                + "## 2. Pemesanan dan Pembayaran\n"
                + "- Seluruh harga sudah termasuk pajak layanan.\n"
                + "- Kesalahan pemilihan menu setelah diproses oleh stan tidak dapat dibatalkan.\n"
                + "- Pembayaran dilakukan melalui Xendit dan wajib diselesaikan dalam waktu 24 jam.\n\n"
                + "## 3. Kebijakan Privasi\n"
                + "Kami menjaga kerahasiaan data pesanan Anda dan hanya menggunakannya untuk keperluan transaksi.\n\n"
                + "## 4. Perubahan Ketentuan\n"
                + "Kami berhak mengubah ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.";

        termRepository.save(Term.builder().content(content).build());
        log.info("Seeded terms");
    }

    private void seedVouchers() {
        String[][] data = {
                {"HEMAT20", "20", "Diskon 20% khusus makanan favoritmu (Maks. Rp 15.000)", "15000"},
                {"DISKON10", "10", "Potongan harga langsung 10% tanpa min. belanja (Maks. Rp 5.000)", "5000"},
                {"DINEIN30", "30", "Hemat 30% khusus Makan di Tempat (Maks. Rp 20.000)", "20000"}
        };

        for (String[] d : data) {
            voucherRepository.save(Voucher.builder()
                    .code(d[0])
                    .value(Double.parseDouble(d[1]))
                    .description(d[2])
                    .maxDiscount(Double.parseDouble(d[3]))
                    .isActive(true)
                    .build());
        }
        log.info("Seeded {} vouchers", data.length);
    }

    private List<Restaurant> seedRestaurants(List<Location> locations, List<Vendor> vendors) {
        List<Restaurant> list = new ArrayList<>();

        for (int i = 0; i < 6; i++) {
            List<String> promos = new ArrayList<>();
            promos.add(PROMOS.get(rand.nextInt(PROMOS.size())));
            if (rand.nextBoolean()) {
                promos.add(PROMOS.get(rand.nextInt(PROMOS.size())));
            }

            Location loc = locations.get(rand.nextInt(locations.size()));

            Restaurant restaurant = Restaurant.builder()
                    .name(RESTAURANT_NAMES.get(i))
                    .cuisine(CUISINES.get(i))
                    .isOpen(true)
                    .imageUrl(RESTAURANT_IMAGES[i])
                    .bannerImageUrl(BANNER_IMAGES[rand.nextInt(BANNER_IMAGES.length)])
                    .address("Kantin " + loc.getName() + " Blok " + ((char) ('A' + rand.nextInt(4))))
                    .operationalHours("0" + rand.nextInt(7, 9) + ":00 - " + (rand.nextBoolean() ? "17:00" : "20:00"))
                    .location(loc)
                    .cheapestPrice(rand.nextDouble() * 20000 + 5000)
                    .promos(promos)
                    .vendor(vendors.get(i % vendors.size()))
                    .build();

            list.add(restaurantRepository.save(restaurant));
        }

        log.info("Seeded {} restaurants", list.size());
        return list;
    }

    private void seedMenuItems(List<Restaurant> restaurants, List<Category> categories) {
        int count = 0;

        for (Restaurant restaurant : restaurants) {
            int itemCount = rand.nextInt(3, 6);
            List<String> usedNames = new ArrayList<>();

            for (int j = 0; j < itemCount; j++) {
                String name;
                do {
                    name = FOOD_NAMES[rand.nextInt(FOOD_NAMES.length)];
                } while (usedNames.contains(name));
                usedNames.add(name);

                double price = (rand.nextInt(5, 50)) * 1000.0;
                boolean hasDiscount = rand.nextInt(5) == 0;

                double rating = Math.round((rand.nextDouble() * 1.5 + 3.5) * 10.0) / 10.0;

                Category category = categories.get(rand.nextInt(1, categories.size()));

                List<String> variantNames = new ArrayList<>();
                if (rand.nextBoolean()) {
                    variantNames.add(VARIANTS.get(rand.nextInt(VARIANTS.size())));
                    if (rand.nextBoolean()) {
                        variantNames.add(VARIANTS.get(rand.nextInt(VARIANTS.size())));
                    }
                }

                MenuItem item = MenuItem.builder()
                        .restaurant(restaurant)
                        .name(name)
                        .description(faker.lorem().sentence(rand.nextInt(5, 15)))
                        .price(price)
                        .originalPrice(hasDiscount ? price * (1 + rand.nextDouble() * 0.3 + 0.1) : null)
                        .badgeText(hasDiscount ? "Diskon " + rand.nextInt(10, 50) + "%" : null)
                        .badgeVariant(hasDiscount ? (rand.nextBoolean() ? "destructive" : "secondary") : null)
                        .prepTime(rand.nextInt(3, 20) + "-" + rand.nextInt(20, 30) + " mnt")
                        .imageUrl(FOOD_IMAGES[rand.nextInt(FOOD_IMAGES.length)])
                        .category(category)
                        .rating(rating)
                        .ratingCount(0)
                        .isPopular(rand.nextBoolean())
                        .build();

                if (!variantNames.isEmpty()) {
                    MenuCustomization variantCust = MenuCustomization.builder()
                            .menuItem(item)
                            .title("Variant")
                            .type(CustomizationType.CHOICE)
                            .isRequired(true)
                            .build();
                    List<CustomizationOption> variantOpts = variantNames.stream()
                            .map(v -> CustomizationOption.builder()
                                    .customization(variantCust)
                                    .label(v)
                                    .price(0.0)
                                    .build())
                            .toList();
                    variantCust.setOptions(variantOpts);
                    item.getCustomizations().add(variantCust);
                }

                if (rand.nextBoolean()) {
                    MenuCustomization spicy = MenuCustomization.builder()
                            .menuItem(item)
                            .title("Level Pedas")
                            .type(CustomizationType.CHOICE)
                            .isRequired(true)
                            .build();

                    String[] levels = {"Tidak Pedas", "Level 1", "Level 2", "Level 3"};
                    List<CustomizationOption> spicyOpts = new ArrayList<>();
                    for (String level : levels) {
                        spicyOpts.add(CustomizationOption.builder()
                                .customization(spicy)
                                .label(level)
                                .price(level.contains("Level 2") || level.contains("Level 3") ? (double) rand.nextInt(1, 3) * 1000 : 0.0)
                                .build());
                    }
                    spicy.setOptions(spicyOpts);
                    item.getCustomizations().add(spicy);

                    if (rand.nextBoolean()) {
                        MenuCustomization topping = MenuCustomization.builder()
                                .menuItem(item)
                                .title("Topping")
                                .type(CustomizationType.CHOICE)
                                .isRequired(false)
                                .build();

                        String[][] toppings = {{"Telur", "3000"}, {"Tahu", "2000"}, {"Tempe", "2000"}};
                        List<CustomizationOption> topOpts = new ArrayList<>();
                        for (String[] t : toppings) {
                            topOpts.add(CustomizationOption.builder()
                                    .customization(topping)
                                    .label(t[0])
                                    .price(Double.parseDouble(t[1]))
                                    .build());
                        }
                        topping.setOptions(topOpts);
                        item.getCustomizations().add(topping);
                    }
                }

                menuItemRepository.save(item);
                count++;
            }
        }

        log.info("Seeded {} menu items", count);
    }

    private void seedBanners(List<Location> locations) {
        String[][] data = {
                {"Promo Akhir Bulan!", "/promo", "0"},
                {"Makan Siang Hemat", "/promo", "0"},
                {"Menu Baru! Ayam Geprek Bensu", "/restaurant/rst_002", "1"},
                {"Kopi Spesial Hari Ini", "/restaurant/rst_003", "0"},
                {"Diskon 50% Mie Aceh", "/restaurant/rst_004", "2"},
                {"Sate Pak Haji Promo", "/promo", "3"}
        };

        for (int i = 0; i < data.length; i++) {
            bannerRepository.save(Banner.builder()
                    .imageUrl(BANNER_IMAGES[i % BANNER_IMAGES.length])
                    .title(data[i][0])
                    .linkUrl(data[i][1])
                    .isActive(true)
                    .location(locations.get(Integer.parseInt(data[i][2])))
                    .build());
        }
        log.info("Seeded {} banners", data.length);
    }

    private List<User> seedUsers(List<Location> locations) {
        String[] names = {
                "Ahmad Fauzi", "Siti Nurhaliza", "Budi Santoso",
                "Dewi Lestari", "Rudi Hartono", "Rina Wijaya",
                "Andi Pratama", "Mega Utami", "Doni Kusuma",
                "Indah Permata", "Rizky Ardiansyah", "Citra Dewi"
        };

        List<User> list = new ArrayList<>();
        for (int i = 0; i < names.length; i++) {
            String nim = String.format("%010d", rand.nextInt(1000000000));
            int semester = rand.nextInt(1, 9);

            list.add(userRepository.save(User.builder()
                    .name(names[i])
                    .nim(nim)
                    .password(passwordEncoder.encode("password"))
                    .semester(semester)
                    .location(locations.get(rand.nextInt(locations.size())))
                    .build()));
        }
        log.info("Seeded {} users", list.size());
        return list;
    }

    private Map<String, List<Order>> seedOrders(List<User> users, List<Restaurant> restaurants) {
        OrderStatus[] statuses = {
                OrderStatus.COMPLETED, OrderStatus.COMPLETED, OrderStatus.COMPLETED,
                OrderStatus.PROCESSING, OrderStatus.PROCESSING,
                OrderStatus.READY,
                OrderStatus.PENDING,
                OrderStatus.CANCELLED
        };

        List<MenuItem> allMenuItems = menuItemRepository.findAll();
        Map<String, List<Order>> ordersByUser = new HashMap<>();
        int orderCount = 0;

        for (int i = 0; i < statuses.length; i++) {
            User user = users.get(rand.nextInt(users.size()));
            Restaurant restaurant = restaurants.get(rand.nextInt(restaurants.size()));
            OrderStatus status = statuses[i];

            List<MenuItem> restaurantMenus = allMenuItems.stream()
                    .filter(m -> m.getRestaurant().getId().equals(restaurant.getId()))
                    .toList();

            if (restaurantMenus.isEmpty()) continue;

            int itemCount = rand.nextInt(1, 4);
            List<OrderItem> orderItems = new ArrayList<>();
            double subtotal = 0;

            for (int j = 0; j < itemCount; j++) {
                MenuItem menuItem = restaurantMenus.get(rand.nextInt(restaurantMenus.size()));

                double itemTotal = menuItem.getPrice();

                OrderItem orderItem = OrderItem.builder()
                        .menuItem(menuItem)
                        .name(menuItem.getName())
                        .quantity(rand.nextInt(1, 3))
                        .price(menuItem.getPrice())
                        .imageUrl(menuItem.getImageUrl())
                        .variantName(null)
                        .build();

                orderItems.add(orderItem);
                subtotal += itemTotal * orderItem.getQuantity();
            }

            double discount = status == OrderStatus.COMPLETED && rand.nextBoolean()
                    ? subtotal * rand.nextDouble() * 0.3 : 0;
            double appFee = subtotal > 0 ? 2000 : 0;
            double total = Math.max(0, subtotal - discount + appFee);

            String orderNumber = "#" + String.format("%04d", rand.nextInt(10000));

            Order order = Order.builder()
                    .user(user)
                    .restaurant(restaurant)
                    .orderNumber(orderNumber)
                    .status(status)
                    .paymentStatus(status == OrderStatus.PENDING ? PaymentStatus.UNPAID
                            : status == OrderStatus.CANCELLED ? PaymentStatus.FAILED : PaymentStatus.PAID)
                    .paymentUrl("https://checkout.xendit.co/mock/" + orderCount)
                    .mode(rand.nextBoolean() ? OrderMode.DINE_IN : OrderMode.PICKUP)
                    .subtotal(Math.round(subtotal * 100.0) / 100.0)
                    .discountAmount(discount > 0 ? Math.round(discount * 100.0) / 100.0 : null)
                    .appFee(appFee)
                    .totalAmount(Math.round(total * 100.0) / 100.0)
                    .items(orderItems)
                    .build();

            orderItems.forEach(oi -> oi.setOrder(order));

            Order savedOrder = orderRepository.save(order);
            orderCount++;

            ordersByUser.computeIfAbsent(user.getId(), k -> new ArrayList<>()).add(savedOrder);
        }

        log.info("Seeded {} orders", orderCount);
        return ordersByUser;
    }

    private void seedReviews(List<User> users, Map<String, List<Order>> ordersByUser) {
        int restReviewCount = 0;
        int itemReviewCount = 0;

        for (var entry : ordersByUser.entrySet()) {
            String userId = entry.getKey();
            User user = users.stream().filter(u -> u.getId().equals(userId)).findFirst().orElse(null);
            if (user == null) continue;

            for (Order order : entry.getValue()) {
                if (order.getStatus() != OrderStatus.COMPLETED) continue;

                restaurantReviewRepository.save(RestaurantReview.builder()
                        .user(user)
                        .order(order)
                        .restaurant(order.getRestaurant())
                        .rating(rand.nextInt(3, 6))
                        .build());
                restReviewCount++;

                for (OrderItem item : order.getItems()) {
                    if (item.getMenuItem() == null) continue;

                    menuItemReviewRepository.save(MenuItemReview.builder()
                            .user(user)
                            .order(order)
                            .menuItem(item.getMenuItem())
                            .rating(rand.nextInt(3, 6))
                            .build());
                    itemReviewCount++;
                }
            }
        }

        log.info("Seeded {} restaurant reviews, {} menu item reviews", restReviewCount, itemReviewCount);
    }

}
