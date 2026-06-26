package com.example.demo.controller;

import com.example.demo.dto.request.ValidateVoucherRequest;
import com.example.demo.dto.response.ValidateVoucherResponse;
import com.example.demo.dto.response.VoucherResponse;
import com.example.demo.service.VoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vouchers")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService voucherService;

    @GetMapping
    public ResponseEntity<List<VoucherResponse>> getVouchers() {
        return ResponseEntity.ok(voucherService.getVouchers());
    }

    @PostMapping("/validate")
    public ResponseEntity<ValidateVoucherResponse> validate(@Valid @RequestBody ValidateVoucherRequest request) {
        return ResponseEntity.ok(voucherService.validate(request));
    }
}
