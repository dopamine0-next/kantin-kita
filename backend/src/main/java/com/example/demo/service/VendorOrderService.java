package com.example.demo.service;

import com.example.demo.dto.response.VendorOrderResponse;
import com.example.demo.entity.Order;
import com.example.demo.entity.enums.OrderStatus;
import com.example.demo.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VendorOrderService {

    private final VendorRestaurantService vendorRestaurantService;
    private final OrderRepository orderRepository;

    private static final Map<OrderStatus, OrderStatus> VALID_TRANSITIONS = Map.of(
            OrderStatus.PROCESSING, OrderStatus.READY,
            OrderStatus.READY, OrderStatus.COMPLETED
    );

    public List<VendorOrderResponse> listOrders(String vendorId, String restaurantId,
                                                  String status, LocalDate dateFrom, LocalDate dateTo) {
        vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);

        List<Order> orders;
        OrderStatus orderStatus = status != null ? parseStatus(status) : null;

        if (orderStatus != null && dateFrom != null && dateTo != null) {
            orders = orderRepository.findByRestaurantIdAndStatusAndDateRange(
                    restaurantId, orderStatus, dateFrom.atStartOfDay(), dateTo.atTime(LocalTime.MAX));
        } else if (orderStatus != null) {
            orders = orderRepository.findByRestaurantIdAndStatusOrderByCreatedAtDesc(restaurantId, orderStatus);
        } else if (dateFrom != null && dateTo != null) {
            orders = orderRepository.findByRestaurantIdAndDateRange(
                    restaurantId, dateFrom.atStartOfDay(), dateTo.atTime(LocalTime.MAX));
        } else {
            orders = orderRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
        }

        return orders.stream()
                .map(VendorOrderResponse::from)
                .toList();
    }

    public VendorOrderResponse getOrderDetail(String vendorId, String orderId) {
        Order order = findOwnedOrder(vendorId, orderId);
        return VendorOrderResponse.from(order);
    }

    @Transactional
    public VendorOrderResponse updateStatus(String vendorId, String orderId, String newStatus) {
        Order order = findOwnedOrder(vendorId, orderId);
        OrderStatus target = parseStatus(newStatus);

        OrderStatus current = order.getStatus();
        OrderStatus expected = VALID_TRANSITIONS.get(current);

        if (expected == null || expected != target) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot transition from " + current + " to " + target);
        }

        order.setStatus(target);
        order = orderRepository.save(order);
        return VendorOrderResponse.from(order);
    }

    private Order findOwnedOrder(String vendorId, String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        vendorRestaurantService.findOwnedRestaurant(vendorId, order.getRestaurant().getId());
        return order;
    }

    private OrderStatus parseStatus(String status) {
        try {
            return OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status: " + status);
        }
    }
}
