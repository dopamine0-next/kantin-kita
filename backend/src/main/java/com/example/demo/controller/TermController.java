package com.example.demo.controller;

import com.example.demo.dto.response.TermResponse;
import com.example.demo.service.TermService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/terms")
@RequiredArgsConstructor
public class TermController {

    private final TermService termService;

    @GetMapping
    public ResponseEntity<TermResponse> getTerms() {
        return ResponseEntity.ok(termService.getTerms());
    }
}
