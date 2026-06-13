package com.example.demo.service;

import com.example.demo.dto.request.CreateOrderRequest;
import com.example.demo.dto.response.CreateOrderResponse;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.entity.*;
import com.example.demo.entity.enums.OrderMode;
import com.example.demo.entity.enums.OrderStatus;
import com.example.demo.entity.enums.PaymentStatus;
import com.example.demo.repository.*;
import com.xendit.Xendit;
import com.xendit.exception.XenditException;
import com.xendit.model.Invoice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final VoucherRepository voucherRepository;
    private final UserRepository userRepository;
    private final RestaurantReviewRepository restaurantReviewRepository;

    @Value("${xendit.success-redirect-url}")
    private String successRedirectUrl;

    @Value("${xendit.failure-redirect-url}")
    private String failureRedirectUrl;

    public CreateOrderResponse createOrder(CreateOrderRequest request, String userId) {
        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Restaurant not found"));

        if (!Boolean.TRUE.equals(restaurant.getIsOpen())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant is currently closed");
        }

        if (restaurant.getOperationalHours() != null && !restaurant.getOperationalHours().isBlank()) {
            validateOperationalHours(restaurant.getOperationalHours());
        }

        OrderMode mode = OrderMode.fromString(request.getMode());

        List<OrderItem> orderItems = new ArrayList<>();
        double subtotal = 0;

        for (var itemReq : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Menu item not found: " + itemReq.getMenuItemId()));

            double itemPrice = menuItem.getPrice() * itemReq.getQty();
            subtotal += itemPrice;

            OrderItem orderItem = OrderItem.builder()
                    .menuItem(menuItem)
                    .name(menuItem.getName())
                    .quantity(itemReq.getQty())
                    .price(menuItem.getPrice())
                    .imageUrl(menuItem.getImageUrl())
                    .variantName(itemReq.getVariantName())
                    .note(itemReq.getNote())
                    .build();

            orderItems.add(orderItem);
        }

        double discount = 0;
        if (request.getVoucherCode() != null) {
            Voucher voucher = voucherRepository.findByCodeAndIsActiveTrue(
                    request.getVoucherCode().trim().toUpperCase())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid voucher"));

            if (voucher.getMinSpend() != null && subtotal < voucher.getMinSpend()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Minimum spend is Rp " + voucher.getMinSpend().longValue());
            }

            discount = subtotal * voucher.getValue() / 100;
            if (voucher.getMaxDiscount() != null && discount > voucher.getMaxDiscount()) {
                discount = voucher.getMaxDiscount();
            }
        }

        double appFee = subtotal > 0 ? 2000 : 0;
        double totalAmount = Math.max(0, subtotal - discount + appFee);

        User userRef = userRepository.getReferenceById(userId);

        Order order = Order.builder()
                .user(userRef)
                .restaurant(restaurant)
                .status(OrderStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .mode(mode)
                .subtotal(subtotal)
                .discountAmount(discount)
                .appFee(appFee)
                .totalAmount(totalAmount)
                .voucherCode(request.getVoucherCode())
                .items(orderItems)
                .build();

        orderItems.forEach(i -> i.setOrder(order));

        Order savedOrder = orderRepository.save(order);

        String paymentUrl = callXenditInvoice(savedOrder);

        savedOrder.setPaymentUrl(paymentUrl);
        orderRepository.save(savedOrder);

        return CreateOrderResponse.builder()
                .orderId(savedOrder.getId())
                .paymentUrl(paymentUrl)
                .totalAmount(totalAmount)
                .status(OrderStatus.PENDING.name().toLowerCase())
                .build();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders(String userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(OrderResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderDetail(String orderId, String userId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your order");
        }

        return OrderResponse.from(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getUnreviewedOrders(String userId) {
        return orderRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, OrderStatus.COMPLETED)
                .stream()
                .filter(order -> !restaurantReviewRepository.existsByOrderIdAndUserId(order.getId(), userId))
                .map(OrderResponse::from)
                .toList();
    }

    private void validateOperationalHours(String operationalHours) {
        String[] parts = operationalHours.split("\\s*-\\s*");
        if (parts.length != 2) return;

        try {
            LocalTime open = LocalTime.parse(parts[0].trim());
            LocalTime close = LocalTime.parse(parts[1].trim());
            LocalTime now = LocalTime.now(ZoneId.of("Asia/Jakarta"));

            boolean isOpen;
            if (close.isAfter(open)) {
                isOpen = !now.isBefore(open) && !now.isAfter(close);
            } else {
                isOpen = !now.isBefore(open) || !now.isAfter(close);
            }

            if (!isOpen) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Restaurant is closed. Operational hours: " + operationalHours);
            }
        } catch (DateTimeParseException e) {
            log.warn("Unable to parse operational hours: {}", operationalHours);
        }
    }

    private String callXenditInvoice(Order order) {
        if (Xendit.Opt.getApiKey() == null || Xendit.Opt.getApiKey().isBlank()) {
            log.warn("Xendit API key not configured, using mock payment URL");
            return "https://checkout.xendit.co/mock/" + order.getId();
        }

        try {
            Map<String, Object> params = new HashMap<>();
            params.put("external_id", order.getId());
            params.put("amount", order.getTotalAmount());
            params.put("description", "Pembayaran Order " + order.getId());
            params.put("success_redirect_url", successRedirectUrl + order.getId());
            params.put("failure_redirect_url", failureRedirectUrl + order.getId());

            Invoice invoice = Invoice.create(params);
            order.setPaymentExternalId(invoice.getId());
            return invoice.getInvoiceUrl();
        } catch (XenditException e) {
            log.error("Failed to create Xendit invoice: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to create payment: " + e.getMessage());
        }
    }
}
