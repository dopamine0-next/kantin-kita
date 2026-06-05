package com.example.demo.service;

import com.example.demo.dto.response.*;
import com.example.demo.entity.Order;
import com.example.demo.entity.Restaurant;
import com.example.demo.entity.enums.OrderStatus;
import com.example.demo.entity.enums.PaymentStatus;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
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
public class VendorAnalyticsService {

    private final VendorRestaurantService vendorRestaurantService;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    private static final Set<PaymentStatus> PAID_STATUSES = Set.of(PaymentStatus.PAID);

    public VendorAnalyticsSummaryResponse getSummary(String vendorId, String restaurantId) {
        Restaurant restaurant = vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = LocalDate.now().atTime(LocalTime.MAX);

        List<Order> todayOrders = orderRepository.findByRestaurantIdAndDateRange(restaurantId, todayStart, todayEnd);
        int todayCount = todayOrders.size();
        double todayRevenue = todayOrders.stream()
                .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();

        List<Order> allOrders = orderRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
        int pendingCount = (int) allOrders.stream()
                .filter(o -> o.getStatus() == OrderStatus.PENDING)
                .count();
        int processingCount = (int) allOrders.stream()
                .filter(o -> o.getStatus() == OrderStatus.PROCESSING)
                .count();

        double avgRating = restaurant.getRating() != null ? restaurant.getRating() : 0.0;

        return VendorAnalyticsSummaryResponse.builder()
                .todayOrders(todayCount)
                .todayRevenue(todayRevenue)
                .pendingOrders(pendingCount)
                .processingOrders(processingCount)
                .averageRating(avgRating)
                .build();
    }

    public VendorRevenueResponse getRevenue(String vendorId, String restaurantId,
                                             LocalDate dateFrom, LocalDate dateTo) {
        vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);

        LocalDateTime from = dateFrom.atStartOfDay();
        LocalDateTime to = dateTo.atTime(LocalTime.MAX);

        List<Order> orders = orderRepository.findByRestaurantIdAndDateRange(restaurantId, from, to);

        Map<LocalDate, List<Order>> grouped = orders.stream()
                .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                .collect(Collectors.groupingBy(o -> o.getCreatedAt().toLocalDate(), TreeMap::new, Collectors.toList()));

        double totalRevenue = 0;
        int totalOrders = 0;
        List<VendorRevenueResponse.RevenueBreakdown> breakdown = new ArrayList<>();

        for (Map.Entry<LocalDate, List<Order>> entry : grouped.entrySet()) {
            double dayRevenue = entry.getValue().stream().mapToDouble(Order::getTotalAmount).sum();
            int dayCount = entry.getValue().size();
            totalRevenue += dayRevenue;
            totalOrders += dayCount;
            breakdown.add(VendorRevenueResponse.RevenueBreakdown.builder()
                    .date(entry.getKey().toString())
                    .revenue(dayRevenue)
                    .orderCount(dayCount)
                    .build());
        }

        return VendorRevenueResponse.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(totalOrders)
                .breakdown(breakdown)
                .build();
    }

    public List<VendorTopItemResponse> getTopItems(String vendorId, String restaurantId,
                                                     LocalDate dateFrom, LocalDate dateTo) {
        vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);

        LocalDateTime from = dateFrom.atStartOfDay();
        LocalDateTime to = dateTo.atTime(LocalTime.MAX);

        List<Object[]> results = orderItemRepository.findTopItemsByRestaurantIdAndDateRange(restaurantId, from, to);

        return results.stream()
                .map(row -> VendorTopItemResponse.builder()
                        .menuItemId((String) row[0])
                        .name((String) row[1])
                        .imageUrl((String) row[2])
                        .totalQuantity(((Number) row[3]).longValue())
                        .totalRevenue(((Number) row[4]).doubleValue())
                        .build())
                .toList();
    }

    public List<VendorOrderTrendResponse> getOrderTrends(String vendorId, String restaurantId,
                                                           LocalDate dateFrom, LocalDate dateTo) {
        vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);

        LocalDateTime from = dateFrom.atStartOfDay();
        LocalDateTime to = dateTo.atTime(LocalTime.MAX);

        List<Order> orders = orderRepository.findByRestaurantIdAndDateRange(restaurantId, from, to);

        Map<LocalDate, List<Order>> grouped = orders.stream()
                .collect(Collectors.groupingBy(o -> o.getCreatedAt().toLocalDate(), TreeMap::new, Collectors.toList()));

        return grouped.entrySet().stream()
                .map(entry -> {
                    int count = entry.getValue().size();
                    double revenue = entry.getValue().stream()
                            .filter(o -> PAID_STATUSES.contains(o.getPaymentStatus()))
                            .mapToDouble(Order::getTotalAmount)
                            .sum();
                    return VendorOrderTrendResponse.builder()
                            .date(entry.getKey().toString())
                            .orderCount(count)
                            .totalRevenue(revenue)
                            .build();
                })
                .toList();
    }
}
