package com.example.demo.service;

import com.example.demo.dto.response.AdminDashboardSummaryResponse;
import com.example.demo.dto.response.AdminOrderTrendResponse;
import com.example.demo.dto.response.AdminRestaurantRankingResponse;
import com.example.demo.dto.response.AdminRevenueResponse;
import com.example.demo.entity.Order;
import com.example.demo.entity.Restaurant;
import com.example.demo.entity.enums.PaymentStatus;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminDashboardService {

    private final RestaurantRepository restaurantRepository;
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final RestaurantReviewRepository restaurantReviewRepository;

    private static final Set<PaymentStatus> PAID_STATUSES = Set.of(PaymentStatus.PAID);

    public AdminDashboardSummaryResponse getSummary() {
        long totalRestaurants = restaurantRepository.count();
        long totalVendors = vendorRepository.count();
        long totalUsers = userRepository.count();

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = LocalDate.now().atTime(LocalTime.MAX);

        List<Order> todayOrdersList = orderRepository.findByCreatedAtBetween(todayStart, todayEnd);
        int todayOrders = todayOrdersList.size();
        double todayRevenue = todayOrdersList.stream()
                .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();

        long totalOrders = orderRepository.count();
        double totalRevenue = orderRepository.findAll().stream()
                .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();

        Double avgRating = restaurantReviewRepository.averageRatingAll();

        return AdminDashboardSummaryResponse.builder()
                .totalRestaurants(totalRestaurants)
                .totalVendors(totalVendors)
                .totalUsers(totalUsers)
                .totalOrders(totalOrders)
                .todayOrders(todayOrders)
                .todayRevenue(todayRevenue)
                .totalRevenue(totalRevenue)
                .averageRating(avgRating)
                .build();
    }

    public List<AdminRestaurantRankingResponse> getRestaurantRankings(String sortBy, int limit) {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        List<Order> allOrders = orderRepository.findAll();
        Map<String, List<Order>> ordersByRestaurant = allOrders.stream()
                .collect(Collectors.groupingBy(o -> o.getRestaurant().getId()));

        return restaurants.stream()
                .map(r -> {
                    List<Order> restOrders = ordersByRestaurant.getOrDefault(r.getId(), List.of());
                    long orderCount = restOrders.size();
                    double revenue = restOrders.stream()
                            .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                            .mapToDouble(Order::getTotalAmount)
                            .sum();
                    Double rating = restaurantReviewRepository.averageRatingByRestaurantId(r.getId());
                    Integer ratingCount = restaurantReviewRepository.countByRestaurantId(r.getId());
                    return AdminRestaurantRankingResponse.builder()
                            .restaurantId(r.getId())
                            .restaurantName(r.getName())
                            .orderCount(orderCount)
                            .revenue(revenue)
                            .rating(rating)
                            .ratingCount(ratingCount)
                            .build();
                })
                .sorted((a, b) -> {
                    int cmp;
                    switch (sortBy != null ? sortBy : "revenue") {
                        case "orders" -> cmp = Long.compare(b.getOrderCount(), a.getOrderCount());
                        case "rating" -> cmp = Double.compare(b.getRating(), a.getRating());
                        default -> cmp = Double.compare(b.getRevenue(), a.getRevenue());
                    }
                    if (cmp == 0) cmp = a.getRestaurantName().compareToIgnoreCase(b.getRestaurantName());
                    return cmp;
                })
                .limit(limit)
                .toList();
    }

    public AdminRevenueResponse getRevenue(LocalDate dateFrom, LocalDate dateTo) {
        LocalDateTime from = dateFrom.atStartOfDay();
        LocalDateTime to = dateTo.atTime(LocalTime.MAX);

        List<Order> orders = orderRepository.findByCreatedAtBetween(from, to);

        Map<LocalDate, List<Order>> grouped = orders.stream()
                .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                .collect(Collectors.groupingBy(o -> o.getCreatedAt().toLocalDate(), TreeMap::new, Collectors.toList()));

        double totalRevenue = 0;
        int totalOrders = 0;
        List<AdminRevenueResponse.AdminRevenueBreakdown> breakdown = new ArrayList<>();

        for (Map.Entry<LocalDate, List<Order>> entry : grouped.entrySet()) {
            double dayRevenue = entry.getValue().stream().mapToDouble(Order::getTotalAmount).sum();
            int dayCount = entry.getValue().size();
            totalRevenue += dayRevenue;
            totalOrders += dayCount;
            breakdown.add(AdminRevenueResponse.AdminRevenueBreakdown.builder()
                    .date(entry.getKey().toString())
                    .revenue(dayRevenue)
                    .orderCount(dayCount)
                    .build());
        }

        return AdminRevenueResponse.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .breakdown(breakdown)
                .build();
    }

    public List<AdminOrderTrendResponse> getOrderTrends(LocalDate dateFrom, LocalDate dateTo) {
        LocalDateTime from = dateFrom.atStartOfDay();
        LocalDateTime to = dateTo.atTime(LocalTime.MAX);

        List<Order> orders = orderRepository.findByCreatedAtBetween(from, to);

        Map<LocalDate, List<Order>> grouped = orders.stream()
                .collect(Collectors.groupingBy(o -> o.getCreatedAt().toLocalDate(), TreeMap::new, Collectors.toList()));

        return grouped.entrySet().stream()
                .map(entry -> {
                    int count = entry.getValue().size();
                    double revenue = entry.getValue().stream()
                            .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                            .mapToDouble(Order::getTotalAmount)
                            .sum();
                    return AdminOrderTrendResponse.builder()
                            .date(entry.getKey().toString())
                            .orderCount(count)
                            .totalRevenue(revenue)
                            .build();
                })
                .toList();
    }
}
