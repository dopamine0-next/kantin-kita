package com.example.demo.seed;

import com.example.demo.entity.*;
import com.example.demo.entity.enums.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    @Value("${app.seed.enabled:false}")
    private boolean seedEnabled;

    private final LocationRepository locationRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final RestaurantCategoryRepository restaurantCategoryRepository;
    private final MarqueeNodeRepository marqueeNodeRepository;
    private final FAQRepository faqRepository;
    private final TermRepository termRepository;
    private final VoucherRepository voucherRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final BannerRepository bannerRepository;
    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final AdminRepository adminRepository;
    private final OrderRepository orderRepository;
    private final RestaurantReviewRepository restaurantReviewRepository;
    private final MenuItemReviewRepository menuItemReviewRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String IMG = "/api/v1/uploads/images/";

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
        List<RestaurantCategory> restaurantCategories = seedRestaurantCategories();
        List<MenuCategory> menuCategories = seedMenuCategories();
        seedMarqueeNodes();
        seedFAQs();
        seedTerms();
        seedVouchers();
        seedAdmins();
        List<Vendor> vendors = seedVendors();
        List<Restaurant> restaurants = seedRestaurants(locations, vendors, restaurantCategories);
        seedMenuItems(restaurants, menuCategories);
        seedBanners(locations);
        List<User> users = seedUsers(locations);
        Map<String, List<Order>> ordersByUser = seedOrders(users, restaurants);
        seedReviews(users, ordersByUser);

        log.info("Data seeding completed!");
    }

    private void seedAdmins() {
        adminRepository.save(Admin.builder()
                .name("Admin Utama")
                .email("admin@kantin.id")
                .password(passwordEncoder.encode("password"))
                .build());
        log.info("Seeded admin");
    }

    private List<Vendor> seedVendors() {
        Vendor vendor = vendorRepository.save(Vendor.builder()
                .name("Vendor Utama")
                .email("vendor@kantin.id")
                .phone("081234567890")
                .password(passwordEncoder.encode("password"))
                .build());
        log.info("Seeded 1 vendor");
        return List.of(vendor);
    }

    private List<Location> seedLocations() {
        String[][] data = {
                {"Kantin Viktor", "Gedung Viktor Lt. 1", "-6.2088", "106.8456"},
                {"Kantin Pusat", "Gedung Utama Lt. 1", "-6.2100", "106.8480"},
                {"Kantin Witana", "Gedung Witana Lt. Dasar", "-6.2075", "106.8430"}
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

    private List<RestaurantCategory> seedRestaurantCategories() {
        List<String> names = List.of("Masakan Rumah", "Kopi & Minuman", "Mie");
        List<RestaurantCategory> list = new ArrayList<>();
        for (String name : names) {
            list.add(restaurantCategoryRepository.save(RestaurantCategory.builder().name(name).build()));
        }
        log.info("Seeded {} restaurant categories", list.size());
        return list;
    }

    private List<MenuCategory> seedMenuCategories() {
        String[][] data = {{"Makanan", "1"}, {"Minuman", "2"}};
        List<MenuCategory> list = new ArrayList<>();
        for (String[] d : data) {
            list.add(menuCategoryRepository.save(MenuCategory.builder()
                    .name(d[0]).priority(Integer.parseInt(d[1])).build()));
        }
        log.info("Seeded {} menu categories", list.size());
        return list;
    }

    private void seedMarqueeNodes() {
        List.of(
                "Promo spesial setiap hari! Diskon s.d 50%",
                "Gratis ongkir untuk area kampus!"
        ).forEach(text -> marqueeNodeRepository.save(
                MarqueeNode.builder().text(text).isActive(true).build()));
        log.info("Seeded marquee nodes");
    }

    private void seedFAQs() {
        String[][] data = {
                {"Bagaimana cara memesan makanan di Kantin Kita?",
                        "Pilih stan makanan di halaman utama, pilih menu, tambah ke keranjang, lalu checkout."},
                {"Metode pembayaran apa saja yang tersedia?",
                        "Kami mendukung pembayaran melalui Virtual Account, E-Wallet, QRIS, dan lainnya."}
        };
        for (String[] d : data) {
            faqRepository.save(FAQ.builder().question(d[0]).answer(d[1]).build());
        }
        log.info("Seeded {} FAQs", data.length);
    }

    private void seedTerms() {
        termRepository.save(Term.builder().content(
                "# Ketentuan Layanan\n\n" +
                "Dengan menggunakan aplikasi Kantin Kita, Anda setuju dengan ketentuan yang berlaku.\n\n" +
                "## Pemesanan & Pembayaran\n" +
                "Harga sudah termasuk pajak. Pembayaran dilakukan melalui Xendit.\n\n" +
                "## Privasi\n" +
                "Data pesanan Anda hanya digunakan untuk keperluan transaksi."
        ).build());
        log.info("Seeded terms");
    }

    private void seedVouchers() {
        String[][] data = {
                {"HEMAT20", "20", "Diskon 20% (Maks. Rp 15.000)", "15000"},
                {"DISKON10", "10", "Diskon 10% (Maks. Rp 5.000)", "5000"}
        };
        for (String[] d : data) {
            voucherRepository.save(Voucher.builder()
                    .code(d[0]).value(Double.parseDouble(d[1]))
                    .description(d[2]).maxDiscount(Double.parseDouble(d[3]))
                    .isActive(true).build());
        }
        log.info("Seeded {} vouchers", data.length);
    }

    private List<Restaurant> seedRestaurants(List<Location> locations, List<Vendor> vendors, List<RestaurantCategory> categories) {
        Vendor vendor = vendors.getFirst();

        String[][] data = {
                {"Warung Bu Ani", "0", "0", IMG + "warung-bu-ani.png", "Kantin Viktor Blok A", "07:00 - 17:00", "15000"},
                {"Kopi Kenangan", "1", "1", IMG + "kopi-kenangan.png", "Kantin Pusat Blok B", "08:00 - 20:00", "8000"},
                {"Mie Aceh Jaya", "2", "2", IMG + "mie-aceh-jaya.png", "Kantin Witana Blok C", "09:00 - 18:00", "20000"}
        };

        List<Restaurant> list = new ArrayList<>();
        for (String[] d : data) {
            Location loc = locations.get(Integer.parseInt(d[1]));
            RestaurantCategory cat = categories.get(Integer.parseInt(d[2]));

            list.add(restaurantRepository.save(Restaurant.builder()
                    .name(d[0])
                    .restaurantCategory(cat)
                    .isOpen(true)
                    .imageUrl(d[3])
                    .bannerImageUrl(IMG + "banner-promo.png")
                    .address(d[4])
                    .operationalHours(d[5])
                    .location(loc)
                    .cheapestPrice(Double.parseDouble(d[6]))
                    .vendor(vendor)
                    .build()));
        }
        log.info("Seeded {} restaurants", list.size());
        return list;
    }

    private void seedMenuItems(List<Restaurant> restaurants, List<MenuCategory> categories) {
        MenuCategory makanan = categories.get(0);
        MenuCategory minuman = categories.get(1);

        Object[][] menuData = {
                // {restaurantIndex, name, price, image, category, isPopular, variants[]...}
                {0, "Nasi Goreng Spesial", 15000.0, "nasi-goreng.png", makanan, true,
                        new String[][]{{"Original", "0"}, {"Level 1", "0"}, {"Level 3", "0"}, {"Level 5", "0"}}},
                {0, "Ayam Bakar Madu", 18000.0, "ayam-bakar.png", makanan, true,
                        new String[][]{{"Paha", "0"}, {"Dada", "0"}}},
                {1, "Es Teh Manis", 5000.0, "es-teh.png", minuman, false,
                        new String[][]{{"Kecil", "0"}, {"Besar", "2000"}}},
                {1, "Kopi Susu Mantan", 12000.0, "kopi-susu.png", minuman, true,
                        new String[][]{{"Iced", "0"}, {"Hot", "0"}}},
                {2, "Mie Aceh Original", 20000.0, "mie-original.png", makanan, true,
                        new String[][]{{"Level 1", "0"}, {"Level 3", "0"}, {"Level 5", "0"}}},
                {2, "Mie Aceh Goreng", 22000.0, "mie-goreng.png", makanan, true,
                        new String[][]{{"+Telur", "3000"}, {"+Tahu", "2000"}, {"+Telur+Tahu", "5000"}}}
        };

        int count = 0;
        for (Object[] md : menuData) {
            int restIdx = (int) md[0];
            String name = (String) md[1];
            double price = (double) md[2];
            String image = (String) md[3];
            MenuCategory cat = (MenuCategory) md[4];
            boolean isPopular = (boolean) md[5];
            String[][] variantData = (String[][]) md[6];

            MenuItem item = MenuItem.builder()
                    .restaurant(restaurants.get(restIdx))
                    .name(name)
                    .description(name + " enak dan murah, cocok untuk makan siang.")
                    .price(price)
                    .imageUrl(IMG + image)
                    .category(cat)
                    .isPopular(isPopular)
                    .build();

            if (variantData.length > 0) {
                MenuCustomization variantCust = MenuCustomization.builder()
                        .menuItem(item)
                        .title("Variant")
                        .type(CustomizationType.CHOICE)
                        .isRequired(true)
                        .build();

                List<CustomizationOption> opts = new ArrayList<>();
                for (String[] v : variantData) {
                    opts.add(CustomizationOption.builder()
                            .customization(variantCust)
                            .label(v[0])
                            .price(Double.parseDouble(v[1]))
                            .build());
                }
                variantCust.setOptions(opts);
                item.getCustomizations().add(variantCust);
            }

            menuItemRepository.save(item);
            count++;
        }

        log.info("Seeded {} menu items", count);
    }

    private void seedBanners(List<Location> locations) {
        String[][] data = {
                {"Promo Akhir Bulan!", "/promo", "0"},
                {"Kopi Spesial Hari Ini", "/promo", "1"},
                {"Diskon Mie Aceh", "/promo", "2"}
        };

        for (String[] d : data) {
            bannerRepository.save(Banner.builder()
                    .imageUrl(IMG + "banner-promo.png")
                    .title(d[0])
                    .linkUrl(d[1])
                    .isActive(true)
                    .location(locations.get(Integer.parseInt(d[2])))
                    .build());
        }
        log.info("Seeded {} banners", data.length);
    }

    private List<User> seedUsers(List<Location> locations) {
        User user = userRepository.save(User.builder()
                .name("admin")
                .nim("241011401771")
                .password(passwordEncoder.encode("password"))
                .semester(5)
                .location(locations.get(0))
                .build());
        log.info("Seeded 1 user");
        return List.of(user);
    }

    private Map<String, List<Order>> seedOrders(List<User> users, List<Restaurant> restaurants) {
        List<MenuItem> allMenuItems = menuItemRepository.findAll();
        Map<String, List<Order>> ordersByUser = new HashMap<>();
        int orderCount = 0;

        OrderStatus[] statuses = {OrderStatus.COMPLETED, OrderStatus.PROCESSING, OrderStatus.PENDING};

        for (int i = 0; i < statuses.length; i++) {
            User user = users.getFirst();
            Restaurant restaurant = restaurants.get(i);
            OrderStatus status = statuses[i];

            List<MenuItem> restaurantMenus = allMenuItems.stream()
                    .filter(m -> m.getRestaurant().getId().equals(restaurant.getId()))
                    .toList();

            if (restaurantMenus.isEmpty()) continue;

            List<OrderItem> orderItems = new ArrayList<>();
            double subtotal = 0;

            for (int j = 0; j < restaurantMenus.size(); j++) {
                MenuItem menuItem = restaurantMenus.get(j);
                int qty = 1;
                double itemTotal = menuItem.getPrice() * qty;

                orderItems.add(OrderItem.builder()
                        .menuItem(menuItem)
                        .name(menuItem.getName())
                        .quantity(qty)
                        .price(menuItem.getPrice())
                        .imageUrl(menuItem.getImageUrl())
                        .variantName(null)
                        .build());

                subtotal += itemTotal;
            }

            double appFee = 2000;
            double total = subtotal + appFee;

            Order order = Order.builder()
                    .user(user)
                    .restaurant(restaurant)
                    .status(status)
                    .paymentStatus(status == OrderStatus.PENDING ? PaymentStatus.UNPAID
                            : status == OrderStatus.COMPLETED ? PaymentStatus.PAID : PaymentStatus.PAID)
                    .paymentUrl("https://checkout.xendit.co/mock/" + orderCount)
                    .mode(OrderMode.DINE_IN)
                    .subtotal(Math.round(subtotal * 100.0) / 100.0)
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
            User user = users.getFirst();

            for (Order order : entry.getValue()) {
                if (order.getStatus() != OrderStatus.COMPLETED) continue;

                restaurantReviewRepository.save(RestaurantReview.builder()
                        .user(user)
                        .order(order)
                        .restaurant(order.getRestaurant())
                        .rating(5)
                        .build());
                restReviewCount++;

                for (OrderItem item : order.getItems()) {
                    if (item.getMenuItem() == null) continue;
                    menuItemReviewRepository.save(MenuItemReview.builder()
                            .user(user)
                            .order(order)
                            .menuItem(item.getMenuItem())
                            .rating(5)
                            .build());
                    itemReviewCount++;
                }
            }
        }

        log.info("Seeded {} restaurant reviews, {} menu item reviews", restReviewCount, itemReviewCount);
    }

}
