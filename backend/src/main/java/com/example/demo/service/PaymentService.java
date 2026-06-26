package com.example.demo.service;

import com.example.demo.dto.request.PaymentCallbackRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.enums.OrderStatus;
import com.example.demo.entity.enums.PaymentStatus;
import com.example.demo.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PaymentService {

    private final OrderRepository orderRepository;

    @Value("${xendit.callback-token}")
    private String callbackToken;

    public void handleCallback(PaymentCallbackRequest callback, String xenditCallbackToken) {
        if (callbackToken == null || callbackToken.isBlank()) {
            log.error("xendit.callback-token is not configured! Set XENDIT_CALLBACK_TOKEN in .env");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Callback token not configured on server");
        }
        if (!callbackToken.equals(xenditCallbackToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid callback token");
        }

        Order order = orderRepository.findById(callback.getExternalId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (order.getPaymentStatus() != PaymentStatus.UNPAID || order.getStatus() != OrderStatus.PENDING) {
            log.info("Order {} already processed (status={}, payment={}), ignoring callback",
                    order.getId(), order.getStatus(), order.getPaymentStatus());
            return;
        }

        if (callback.getId() != null) {
            order.setPaymentExternalId(callback.getId());
        }

        switch (callback.getStatus()) {
            case "PAID":
                if (callback.getPaidAmount() != null) {
                    double diff = Math.abs(callback.getPaidAmount().doubleValue() - order.getTotalAmount());
                    if (diff > 1000) {
                        log.warn("Payment amount mismatch for order {}: paid={}, expected={}",
                                order.getId(), callback.getPaidAmount(), order.getTotalAmount());
                    }
                }
                order.setPaymentStatus(PaymentStatus.PAID);
                order.setStatus(OrderStatus.PROCESSING);
                break;
            case "EXPIRED":
                order.setPaymentStatus(PaymentStatus.EXPIRED);
                order.setStatus(OrderStatus.CANCELLED);
                break;
            case "FAILED":
                order.setPaymentStatus(PaymentStatus.FAILED);
                order.setStatus(OrderStatus.CANCELLED);
                break;
            default:
                log.warn("Unhandled callback status: {} for order {}", callback.getStatus(), order.getId());
                return;
        }

        orderRepository.save(order);
        log.info("Order {} updated: status={}, paymentStatus={}",
                order.getId(), order.getStatus(), order.getPaymentStatus());
    }
}
