package com.example.demo.controller;

import com.example.demo.dto.request.PaymentCallbackRequest;
import com.example.demo.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/callback")
    public ResponseEntity<Map<String, Object>> handleCallback(
            @RequestBody PaymentCallbackRequest callback,
            @RequestHeader("x-callback-token") String callbackToken
    ) {
        paymentService.handleCallback(callback, callbackToken);
        return ResponseEntity.ok(Map.of("received", true));
    }
}
